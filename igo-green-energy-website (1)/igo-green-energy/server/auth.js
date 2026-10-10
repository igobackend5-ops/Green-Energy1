import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { db, DATA_DIR } from './db.js';

/* ---- signing secret (env, or generated once and stored beside the database) ---- */
function secret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  const f = path.join(DATA_DIR, 'session.secret');
  if (!fs.existsSync(f)) fs.writeFileSync(f, crypto.randomBytes(48).toString('hex'), { mode: 0o600 });
  return fs.readFileSync(f, 'utf8').trim();
}
const SECRET = secret();
const TTL_MS = 12 * 60 * 60 * 1000;

/* ---- passwords: scrypt ---- */
export function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  const h = crypto.scryptSync(pw, salt, 64);
  return 's1$' + salt.toString('hex') + '$' + h.toString('hex');
}
export function verifyPassword(pw, stored) {
  try {
    const [v, s, h] = String(stored).split('$');
    if (v !== 's1') return false;
    const test = crypto.scryptSync(pw, Buffer.from(s, 'hex'), 64);
    return crypto.timingSafeEqual(test, Buffer.from(h, 'hex'));
  } catch { return false; }
}

/* ---- session tokens: base64url(payload).hmac ---- */
const b64 = (b) => Buffer.from(b).toString('base64url');
const sign = (p) => crypto.createHmac('sha256', SECRET).update(p).digest('base64url');
export function makeToken(user) {
  const p = b64(JSON.stringify({ id: user.id, exp: Date.now() + TTL_MS }));
  return p + '.' + sign(p);
}
export function readToken(tok) {
  if (!tok || !tok.includes('.')) return null;
  const [p, s] = tok.split('.');
  const good = sign(p);
  if (s.length !== good.length || !crypto.timingSafeEqual(Buffer.from(s), Buffer.from(good))) return null;
  try { const o = JSON.parse(Buffer.from(p, 'base64url').toString()); return o.exp > Date.now() ? o : null; } catch { return null; }
}
export const COOKIE = 'ge_admin';
export function parseCookies(req) {
  const out = {};
  String(req.headers.cookie || '').split(';').forEach((c) => { const i = c.indexOf('='); if (i > 0) out[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim()); });
  return out;
}
export function setSessionCookie(res, req, token) {
  const secure = process.env.COOKIE_SECURE === '1' || req.secure || req.headers['x-forwarded-proto'] === 'https';
  res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${TTL_MS / 1000}${secure ? '; Secure' : ''}`);
}
export const clearSessionCookie = (res) => res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);

/* ---- middleware ---- */
export function attachUser(req, _res, next) {
  const t = readToken(parseCookies(req)[COOKIE]);
  if (t) {
    const u = db.prepare('SELECT id,email,name,role,active FROM admins WHERE id=?').get(t.id);
    if (u && u.active) req.user = u;
  }
  next();
}
export const requireAuth = (req, res, next) => (req.user ? next() : res.status(401).json({ error: 'Please sign in.' }));
export const requireAdmin = (req, res, next) => (req.user && req.user.role === 'admin' ? next() : res.status(403).json({ error: 'Administrator access required.' }));

/* ---- first-run admin ---- */
export function seedAdmin() {
  const n = db.prepare('SELECT COUNT(*) c FROM admins').get().c;
  if (n) return;
  const email = (process.env.ADMIN_EMAIL || 'admin@greenenergy.com').toLowerCase();
  const generated = !process.env.ADMIN_PASSWORD;
  const password = process.env.ADMIN_PASSWORD || crypto.randomBytes(9).toString('base64url');
  db.prepare('INSERT INTO admins (email,name,role,password_hash) VALUES (?,?,?,?)').run(email, 'Administrator', 'admin', hashPassword(password));
  console.log('\n================ FIRST ADMIN CREATED ================');
  console.log(' Email   :', email);
  console.log(' Password:', password, generated ? '(randomly generated - change it after login)' : '');
  console.log('=====================================================\n');
  if (generated) fs.writeFileSync(path.join(DATA_DIR, 'first-admin-login.txt'), `Email: ${email}\nPassword: ${password}\nChange this password after your first login, then delete this file.\n`);
}

/* ---- tiny in-memory rate limiter ---- */
const buckets = new Map();
export function rateLimit(name, max, windowMs) {
  return (req, res, next) => {
    const key = name + ':' + (req.ip || req.socket.remoteAddress) + (req.body && req.body.email ? ':' + String(req.body.email).toLowerCase() : '');
    const now = Date.now();
    const b = (buckets.get(key) || []).filter((t) => now - t < windowMs);
    if (b.length >= max) return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    b.push(now); buckets.set(key, b); next();
  };
}
setInterval(() => { const now = Date.now(); for (const [k, v] of buckets) if (!v.some((t) => now - t < 3600e3)) buckets.delete(k); }, 600e3).unref();
