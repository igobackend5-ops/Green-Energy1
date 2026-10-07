import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { db, UPLOAD_DIR } from './db.js';
import { attachUser, requireAuth, requireAdmin, rateLimit, hashPassword, verifyPassword, makeToken, setSessionCookie, clearSessionCookie, seedAdmin } from './auth.js';
import { notifyEnquiry } from './mail.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(express.json({ limit: '14mb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});
app.use(attachUser);
seedAdmin();

const api = express.Router();
const clip = (v, n) => (v == null ? '' : String(v).trim().slice(0, n));
const audit = (user, what, status = 'Saved') => db.prepare('INSERT INTO activity (what,status,admin) VALUES (?,?,?)').run(clip(what, 300), status, user ? user.name : 'System');

/* =============================== AUTH =============================== */
api.post('/login', rateLimit('login', 10, 15 * 60e3), (req, res) => {
  const email = clip(req.body.email, 200).toLowerCase(), pw = String(req.body.password || '');
  const u = db.prepare('SELECT * FROM admins WHERE email=?').get(email);
  if (!u || !u.active || !verifyPassword(pw, u.password_hash)) return res.status(401).json({ error: 'Invalid email or password.' });
  db.prepare("UPDATE admins SET last_login=datetime('now') WHERE id=?").run(u.id);
  setSessionCookie(res, req, makeToken(u));
  res.json({ user: { id: u.id, email: u.email, name: u.name, role: u.role } });
});
api.post('/logout', (_req, res) => { clearSessionCookie(res); res.json({ ok: true }); });
api.get('/me', (req, res) => res.json({ user: req.user || null }));
api.post('/me/password', requireAuth, rateLimit('pw', 10, 15 * 60e3), (req, res) => {
  const { current, next } = req.body || {};
  const u = db.prepare('SELECT * FROM admins WHERE id=?').get(req.user.id);
  if (!verifyPassword(String(current || ''), u.password_hash)) return res.status(400).json({ error: 'Current password is incorrect.' });
  if (String(next || '').length < 8) return res.status(400).json({ error: 'New password must be at least 8 characters.' });
  db.prepare('UPDATE admins SET password_hash=? WHERE id=?').run(hashPassword(String(next)), u.id);
  audit(req.user, 'Password changed');
  res.json({ ok: true });
});

/* ============================== CONTENT ============================== */
const KEY = /^[A-Za-z0-9_]{1,64}$/;
// Public: every content document the website needs (the website reads this once at start-up).
api.get('/content', (_req, res) => {
  const out = {};
  for (const r of db.prepare("SELECT doc_key,json FROM content_docs WHERE doc_key NOT LIKE '\\_\\_%' ESCAPE '\\'").all()) { try { out[r.doc_key] = JSON.parse(r.json); } catch { /* skip bad row */ } }
  res.setHeader('Cache-Control', 'no-cache');
  res.json(out);
});
api.put('/content/:key', requireAuth, (req, res) => {
  const k = req.params.key;
  if (!KEY.test(k)) return res.status(400).json({ error: 'Invalid key.' });
  if (!('value' in (req.body || {}))) return res.status(400).json({ error: 'Missing value.' });
  const json = JSON.stringify(req.body.value);
  if (json.length > 3 * 1024 * 1024) return res.status(413).json({ error: 'Content is too large.' });
  db.prepare(`INSERT INTO content_docs (doc_key,json,updated_by) VALUES (?,?,?)
              ON CONFLICT(doc_key) DO UPDATE SET json=excluded.json, updated_at=datetime('now'), updated_by=excluded.updated_by`).run(k, json, req.user.email);
  res.json({ ok: true });
});
api.delete('/content/:key', requireAuth, (req, res) => {
  if (!KEY.test(req.params.key)) return res.status(400).json({ error: 'Invalid key.' });
  db.prepare('DELETE FROM content_docs WHERE doc_key=?').run(req.params.key);
  res.json({ ok: true });
});
api.get('/activity', requireAuth, (_req, res) => res.json(db.prepare('SELECT what,status,admin,created_at AS "when" FROM activity ORDER BY id DESC LIMIT 40').all()));
api.post('/activity', requireAuth, (req, res) => { audit(req.user, req.body.what, clip(req.body.status, 20) || 'Saved'); res.json({ ok: true }); });

/* ============================== ENQUIRIES ============================== */
const TYPES = ['quote', 'contact', 'newsletter', 'callback', 'career'];
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,200}\.[^\s@]{2,}$/;
const PHONE = /^[0-9+()\-.\s]{7,20}$/;
// Public: forms on the website post here.
api.post('/enquiries', rateLimit('enq', 12, 10 * 60e3), (req, res) => {
  const b = req.body || {};
  if (b.website) return res.json({ ok: true });                         // honeypot: bots fill hidden "website" field
  const type = TYPES.includes(b.type) ? b.type : 'contact';
  const name = clip(b.name, 120), email = clip(b.email, 200).toLowerCase(), phone = clip(b.phone, 30);
  const message = clip(b.message, 4000), subject = clip(b.subject, 200), company = clip(b.company, 160);
  if (type === 'newsletter') { if (!EMAIL.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' }); }
  else {
    if (!name) return res.status(400).json({ error: 'Please enter your name.' });
    if (!email && !phone) return res.status(400).json({ error: 'Please enter a phone number or email so we can reach you.' });
    if (email && !EMAIL.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
    if (phone && !PHONE.test(phone)) return res.status(400).json({ error: 'Please enter a valid phone number.' });
  }
  if (type === 'newsletter' && db.prepare("SELECT 1 FROM enquiries WHERE type='newsletter' AND email=?").get(email)) return res.json({ ok: true, duplicate: true });
  let extra = {};
  if (b.extra && typeof b.extra === 'object') for (const [k, v] of Object.entries(b.extra).slice(0, 12)) extra[clip(k, 40)] = clip(v, 300);
  const info = db.prepare('INSERT INTO enquiries (type,name,email,phone,company,subject,message,extra,source,ip) VALUES (?,?,?,?,?,?,?,?,?,?)')
    .run(type, name, email, phone, company, subject, message, JSON.stringify(extra), clip(b.source, 200), req.ip || '');
  notifyEnquiry({ id: info.lastInsertRowid, type, name, email, phone, company, subject, message, extra, source: clip(b.source, 200) });
  res.json({ ok: true, id: info.lastInsertRowid });
});
const rowOut = (r) => ({ ...r, extra: (() => { try { return JSON.parse(r.extra || '{}'); } catch { return {}; } })(), ip: undefined });
api.get('/enquiries', requireAuth, (req, res) => {
  const { type, status, q } = req.query;
  const where = [], args = [];
  if (type && type !== 'all') { where.push('type=?'); args.push(String(type)); }
  if (status && status !== 'all') { where.push('status=?'); args.push(String(status)); }
  if (q) { where.push('(name LIKE ? OR email LIKE ? OR phone LIKE ? OR company LIKE ? OR message LIKE ? OR subject LIKE ?)'); const l = '%' + String(q).slice(0, 80) + '%'; args.push(l, l, l, l, l, l); }
  const rows = db.prepare('SELECT * FROM enquiries' + (where.length ? ' WHERE ' + where.join(' AND ') : '') + ' ORDER BY id DESC LIMIT 2000').all(...args);
  res.json(rows.map(rowOut));
});
api.get('/enquiries/stats', requireAuth, (_req, res) => {
  const byStatus = Object.fromEntries(db.prepare('SELECT status, COUNT(*) c FROM enquiries GROUP BY status').all().map((r) => [r.status, r.c]));
  const byType = Object.fromEntries(db.prepare('SELECT type, COUNT(*) c FROM enquiries GROUP BY type').all().map((r) => [r.type, r.c]));
  const last7 = db.prepare("SELECT COUNT(*) c FROM enquiries WHERE created_at >= datetime('now','-7 days')").get().c;
  const today = db.prepare("SELECT COUNT(*) c FROM enquiries WHERE date(created_at)=date('now')").get().c;
  const newOnes = db.prepare("SELECT COUNT(*) c FROM enquiries WHERE status='new' AND type!='newsletter'").get().c;
  const recent = db.prepare('SELECT * FROM enquiries ORDER BY id DESC LIMIT 6').all().map(rowOut);
  res.json({ byStatus, byType, last7, today, new: newOnes, total: db.prepare('SELECT COUNT(*) c FROM enquiries').get().c, recent });
});
api.patch('/enquiries/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id); const { status, notes } = req.body || {};
  const cur = db.prepare('SELECT * FROM enquiries WHERE id=?').get(id);
  if (!cur) return res.status(404).json({ error: 'Not found.' });
  const st = ['new', 'contacted', 'qualified', 'closed', 'spam'].includes(status) ? status : cur.status;
  const nt = notes === undefined ? cur.notes : clip(notes, 4000);
  db.prepare("UPDATE enquiries SET status=?, notes=?, updated_at=datetime('now') WHERE id=?").run(st, nt, id);
  if (st !== cur.status) audit(req.user, `Enquiry #${id} marked ${st}`);
  res.json(rowOut(db.prepare('SELECT * FROM enquiries WHERE id=?').get(id)));
});
api.delete('/enquiries/:id', requireAuth, requireAdmin, (req, res) => {
  db.prepare('DELETE FROM enquiries WHERE id=?').run(Number(req.params.id));
  audit(req.user, `Enquiry #${req.params.id} deleted`);
  res.json({ ok: true });
});

/* ============================== UPLOADS ============================== */
const MIME = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'application/pdf': 'pdf' };
const MAX_UPLOAD = 8 * 1024 * 1024;
api.post('/upload', requireAuth, (req, res) => {
  const { name, dataUrl } = req.body || {};
  const m = /^data:([a-z/+.-]+);base64,([A-Za-z0-9+/=\s]+)$/.exec(String(dataUrl || ''));
  if (!m || !MIME[m[1]]) return res.status(400).json({ error: 'Unsupported file. Use JPG, PNG, WEBP, GIF or PDF.' });
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > MAX_UPLOAD) return res.status(413).json({ error: 'File is larger than 8 MB.' });
  const isPng = buf.slice(0, 4).toString('hex') === '89504e47', isJpg = buf.slice(0, 3).toString('hex') === 'ffd8ff', isWebp = buf.slice(8, 12).toString() === 'WEBP', isGif = buf.slice(0, 3).toString() === 'GIF', isPdf = buf.slice(0, 4).toString() === '%PDF';
  const ok = { 'image/png': isPng, 'image/jpeg': isJpg, 'image/webp': isWebp, 'image/gif': isGif, 'application/pdf': isPdf }[m[1]];
  if (!ok) return res.status(400).json({ error: 'File content does not match its type.' });
  const base = clip(name, 80).replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'file';
  const filename = `${base}-${crypto.randomBytes(4).toString('hex')}.${MIME[m[1]]}`;
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buf);
  db.prepare('INSERT INTO uploads (filename,original,mime,size,uploaded_by) VALUES (?,?,?,?,?)').run(filename, clip(name, 200), m[1], buf.length, req.user.email);
  res.json({ url: '/uploads/' + filename, filename, size: buf.length });
});
api.get('/uploads', requireAuth, (_req, res) => res.json(db.prepare('SELECT filename,original,mime,size,uploaded_by,created_at FROM uploads ORDER BY id DESC LIMIT 500').all().map((r) => ({ ...r, url: '/uploads/' + r.filename }))));
api.delete('/uploads/:filename', requireAuth, (req, res) => {
  const f = path.basename(req.params.filename);
  db.prepare('DELETE FROM uploads WHERE filename=?').run(f);
  try { fs.unlinkSync(path.join(UPLOAD_DIR, f)); } catch { /* already gone */ }
  res.json({ ok: true });
});

/* ============================== USERS (admin only) ============================== */
api.get('/users', requireAuth, requireAdmin, (_req, res) => res.json(db.prepare('SELECT id,email,name,role,active,created_at,last_login FROM admins ORDER BY id').all()));
api.post('/users', requireAuth, requireAdmin, (req, res) => {
  const email = clip(req.body.email, 200).toLowerCase(), name = clip(req.body.name, 100), role = req.body.role === 'admin' ? 'admin' : 'editor', pw = String(req.body.password || '');
  if (!EMAIL.test(email) || !name || pw.length < 8) return res.status(400).json({ error: 'Name, a valid email and a password of 8+ characters are required.' });
  if (db.prepare('SELECT 1 FROM admins WHERE email=?').get(email)) return res.status(409).json({ error: 'A user with this email already exists.' });
  db.prepare('INSERT INTO admins (email,name,role,password_hash) VALUES (?,?,?,?)').run(email, name, role, hashPassword(pw));
  audit(req.user, 'User created: ' + email);
  res.json({ ok: true });
});
api.patch('/users/:id', requireAuth, requireAdmin, (req, res) => {
  const id = Number(req.params.id), u = db.prepare('SELECT * FROM admins WHERE id=?').get(id);
  if (!u) return res.status(404).json({ error: 'Not found.' });
  const role = req.body.role ? (req.body.role === 'admin' ? 'admin' : 'editor') : u.role;
  const active = req.body.active === undefined ? u.active : req.body.active ? 1 : 0;
  if (id === req.user.id && (role !== 'admin' || !active)) return res.status(400).json({ error: 'You cannot remove your own admin access.' });
  db.prepare('UPDATE admins SET role=?, active=?, name=? WHERE id=?').run(role, active, clip(req.body.name, 100) || u.name, id);
  if (req.body.password) { if (String(req.body.password).length < 8) return res.status(400).json({ error: 'Password must be 8+ characters.' }); db.prepare('UPDATE admins SET password_hash=? WHERE id=?').run(hashPassword(String(req.body.password)), id); }
  audit(req.user, 'User updated: ' + u.email);
  res.json({ ok: true });
});
api.delete('/users/:id', requireAuth, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (id === req.user.id) return res.status(400).json({ error: 'You cannot delete your own account.' });
  db.prepare('DELETE FROM admins WHERE id=?').run(id);
  res.json({ ok: true });
});

api.use((_req, res) => res.status(404).json({ error: 'Not found.' }));
app.use('/api', api);
const SITE_PATHS = ['/', '/about', '/services', '/services/solar', '/services/wind', '/services/biogas', '/services/water', '/projects', '/subsidy', '/blogs', '/leadership', '/faq', '/careers', '/learnerships', '/contact', '/privacy-policy', '/terms', '/sitemap'];
const origin = (req) => (process.env.PUBLIC_URL || (req.protocol + '://' + req.get('host'))).replace(/\/+$/, '');
app.get('/robots.txt', (req, res) => res.type('text/plain').send('User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ' + origin(req) + '/sitemap.xml\n'));
app.get('/sitemap.xml', (req, res) => {
  const o = origin(req);
  res.type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + SITE_PATHS.map((p) => '  <url><loc>' + o + p + '</loc></url>').join('\n') + '\n</urlset>\n');
});
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d', index: false, setHeaders: (r) => r.setHeader('Content-Disposition', 'inline') }));

// Serve the built website (npm run build) with SPA fallback.
const DIST = path.join(here, '..', 'dist');
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST, { maxAge: '1h', index: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(DIST, 'index.html')));
}
app.use((err, _req, res, _next) => { console.error(err); res.status(err.status || 500).json({ error: err.type === 'entity.too.large' ? 'Upload is too large.' : 'Server error.' }); });

const PORT = Number(process.env.PORT) || 8787;
app.listen(PORT, () => console.log(`Green Energy server running on http://localhost:${PORT}`));
