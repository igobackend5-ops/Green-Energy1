// Career applications: resume parsing (nothing is stored at parse time) and private resume storage.
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { DATA_DIR } from './db.js';

const require = createRequire(import.meta.url);
export const RESUME_DIR = process.env.RESUME_DIR || path.join(DATA_DIR, 'resumes');   // never served statically
fs.mkdirSync(RESUME_DIR, { recursive: true });

const MAX = 5 * 1024 * 1024;
const EXT = { pdf: 'application/pdf', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,200}\.[^\s@]{2,}$/;
const PHONE = /^[0-9+()\-.\s]{7,20}$/;

/* ---- file validation: extension + real content signature ---- */
export function readResume(r) {
  const name = String(r?.name || '');
  const ext = (name.split('.').pop() || '').toLowerCase();
  if (!EXT[ext]) throw new Error('Please upload a PDF, DOC or DOCX resume.');
  const m = /^data:[^;,]*;base64,([A-Za-z0-9+/=\s]+)$/.exec(String(r?.dataUrl || ''));
  if (!m) throw new Error('The resume file could not be read. Please try again.');
  const buf = Buffer.from(m[1], 'base64');
  if (!buf.length) throw new Error('The resume file is empty.');
  if (buf.length > MAX) throw new Error('The resume is larger than 5 MB.');
  const head = buf.slice(0, 8).toString('hex');
  const ok = ext === 'pdf' ? buf.slice(0, 5).toString() === '%PDF-' : ext === 'docx' ? head.startsWith('504b0304') : head.startsWith('d0cf11e0a1b11ae1');
  if (!ok) throw new Error('The file content does not match its type. Please upload a genuine PDF, DOC or DOCX file.');
  return { buf, ext, name: name.slice(0, 160) };
}

/* ---- text extraction ---- */
async function toText({ buf, ext }) {
  if (ext === 'pdf') { const pdf = require('pdf-parse/lib/pdf-parse.js'); return (await pdf(buf)).text || ''; }
  if (ext === 'docx') { const mammoth = require('mammoth'); return (await mammoth.extractRawText({ buffer: buf })).value || ''; }
  const WordExtractor = require('word-extractor'); return (await new WordExtractor().extract(buf)).getBody() || '';
}

/* ---- field extraction: only values really found in the text; anything else stays blank ---- */
const HEAD = /^(experience|work experience|professional experience|employment|education|educational qualifications?|academic|skills|technical skills|key skills|projects|certifications?|summary|objective|profile|declaration|achievements|languages|interests|references|personal (details|information))\b[:\s]*$/i;
const DEGREE = /\b(b\.?\s?e\.?|b\.?\s?tech|b\.?\s?sc|b\.?\s?com|b\.?\s?a\b|bca|bba|m\.?\s?e\.?|m\.?\s?tech|m\.?\s?sc|m\.?\s?com|mba|mca|diploma|polytechnic|i\.?t\.?i\.?|bachelor|master|ph\.?d|hsc|ssc)\b/i;
const ORG = /\b(university|college|institute|polytechnic|school of|academy)\b/i;
const COMPANY = /\b(pvt\.?|private|ltd\.?|limited|llp|inc\.?|corp|technologies|solutions|industries|enterprises|energy|power|systems|engineering|constructions?)\b/i;
const TITLE = /\b(engineer|designer|manager|executive|developer|analyst|technician|supervisor|intern|consultant|officer|associate|architect|draughtsman|draftsman|coordinator|lead|head|director|assistant|trainee)\b/i;
const clean = (s, n = 200) => String(s || '').replace(/\s+/g, ' ').replace(/^[\s•\-–—*·:|]+|[\s|]+$/g, '').slice(0, n);

export function extractFields(text) {
  const lines = String(text).split(/\r?\n/).map((l) => l.replace(/ /g, ' ').trim()).filter(Boolean);
  const flat = lines.join('\n');
  const out = {};
  const email = flat.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  if (email) out.email = email[0];
  for (const m of flat.matchAll(/(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{3,5}\)?[\s.-]?)?\d{3,5}[\s.-]?\d{3,5}/g)) {
    const d = m[0].replace(/\D/g, '');
    if (d.length >= 10 && d.length <= 13 && !/^(19|20)\d{2}/.test(d.slice(0, 4)) || (d.length >= 10 && d.length <= 13 && m[0].includes('+'))) { out.phone = clean(m[0], 20); break; }
  }
  const li = flat.match(/(?:https?:\/\/)?(?:[a-z]{2,3}\.)?linkedin\.com\/[^\s),;|]+/i);
  if (li) out.linkedin = (/^https?:/i.test(li[0]) ? '' : 'https://') + li[0].replace(/[.,;]+$/, '');
  const urls = [...flat.matchAll(/\b(?:https?:\/\/|www\.)[^\s),;|]+/gi)].map((m) => m[0].replace(/[.,;]+$/, '')).filter((u) => !/linkedin\.com/i.test(u) && !u.includes('@'));
  if (urls[0]) out.portfolio = /^https?:/i.test(urls[0]) ? urls[0] : 'https://' + urls[0];
  // name: a short alphabetic line near the top
  for (const l of lines.slice(0, 8)) {
    if (/[\d@:/]/.test(l) || /resume|curriculum|vitae|\bcv\b|profile|objective|summary|address|contact|email|phone/i.test(l)) continue;
    const w = l.split(/\s+/);
    if (w.length >= 2 && w.length <= 4 && w.every((x) => /^[A-Za-z.'-]+$/.test(x))) { out.name = clean(l.replace(/\s+/g, ' '), 80).replace(/\b([A-Za-z])([A-Za-z]*)\b/g, (_, a, b) => (b === b.toLowerCase() && a === a.toLowerCase() && l === l.toLowerCase() ? a.toUpperCase() + b : a + b)); break; }
  }
  // location: labelled line, or a line carrying a 6-digit pincode
  const loc = lines.slice(0, 40).find((l) => /^(current\s+)?(location|city|address)\b[:\s-]/i.test(l));
  if (loc) out.location = clean(loc.replace(/^(current\s+)?(location|city|address)\b[:\s-]*/i, ''), 100);
  else { const p = lines.slice(0, 15).find((l) => /\b\d{6}\b/.test(l) && !/@/.test(l) && l.length < 120); if (p) out.location = clean(p, 100); }
  // sections
  const idx = (re) => lines.findIndex((l) => re.test(l) && l.length < 40);
  const section = (re, max = 12) => { const i = idx(re); if (i < 0) return []; const r = []; for (let k = i + 1; k < lines.length && r.length < max; k++) { if (HEAD.test(lines[k])) break; r.push(lines[k]); } return r; };
  const edu = section(/^(education|educational qualifications?|academic)/i, 14);
  const eduLine = edu.find((l) => DEGREE.test(l)) || lines.find((l) => DEGREE.test(l) && l.length < 120);
  if (eduLine) out.qualification = clean(eduLine, 120);
  const orgLine = edu.find((l) => ORG.test(l)) || lines.find((l) => ORG.test(l) && l.length < 120);
  if (orgLine) out.college = clean(orgLine, 120);
  const exp = flat.match(/(\d+(?:\.\d+)?)\s*\+?\s*(years?|yrs?)(?:\s*(?:and|&)?\s*(\d+)\s*months?)?\s*(?:of\s*)?(?:total\s*|relevant\s*|work\s*|professional\s*)*experience/i) || flat.match(/experience\s*(?:of|:)?\s*(\d+(?:\.\d+)?)\s*\+?\s*(years?|yrs?)/i);
  if (exp) out.experience = clean(exp[1] + ' years' + (exp[3] ? ' ' + exp[3] + ' months' : ''), 40);
  const sk = section(/^(technical\s+|key\s+|core\s+)?skills/i, 8);
  if (sk.length) { const items = sk.join(',').split(/[,•·|;]|\s{2,}|\s-\s/).map((x) => clean(x.replace(/^[A-Za-z ]{2,20}:\s*/, ''), 40)).filter((x) => x && x.length > 1); if (items.length) out.skills = [...new Set(items)].slice(0, 25).join(', '); }
  const ex = section(/^(work experience|professional experience|experience|employment)/i, 14);
  const t = ex.find((l) => TITLE.test(l) && l.length < 90);
  if (t) out.jobTitle = clean(t.split(/\s[-–|@,]\s|\sat\s/i).find((x) => TITLE.test(x)) || t, 80);
  const c = ex.find((l) => COMPANY.test(l) && l.length < 100) || ex.map((l) => (/\sat\s(.+)/i.exec(l) || [])[1]).find(Boolean);
  if (c) out.company = clean(c.split(/\s[-–|]\s|\(|,\s*(?=[A-Za-z]{3,15}\s*$)/)[0], 80);
  return out;
}

export function registerCareers(api, { db, requireAuth, rateLimit, clip, notifyEnquiry }) {
  api.post('/resume/parse', rateLimit('rparse', 20, 10 * 60e3), async (req, res) => {
    let file; try { file = readResume(req.body?.resume || req.body); } catch (e) { return res.status(400).json({ error: e.message }); }
    try {
      const text = await toText(file);
      if (!text || text.replace(/\s/g, '').length < 30) return res.json({ ok: true, parsed: false, fields: {}, message: 'No readable text was found in this resume (it may be a scanned image). Please fill in the details manually.' });
      const fields = extractFields(text);
      res.json({ ok: true, parsed: true, fields, found: Object.keys(fields).length });
    } catch (e) {
      console.error('resume parse failed:', e.message);
      res.json({ ok: true, parsed: false, fields: {}, message: 'We could not read details from this file. Please fill in the form manually.' });
    }
  });

  api.post('/applications', rateLimit('apply', 8, 10 * 60e3), (req, res) => {
    const b = req.body || {};
    if (b.website) return res.json({ ok: true });                                    // honeypot
    const f = b.fields || {};
    const job = clip(b.job, 120), name = clip(f.name, 120), email = clip(f.email, 200).toLowerCase(), phone = clip(f.phone, 30);
    if (!job) return res.status(400).json({ error: 'Please choose the job you are applying for.' });
    if (!name) return res.status(400).json({ error: 'Please enter your full name.' });
    if (!EMAIL.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
    if (!PHONE.test(phone) || phone.replace(/\D/g, '').length < 7) return res.status(400).json({ error: 'Please enter a valid phone number.' });
    if (f.level && !['Fresher', 'Experienced'].includes(f.level)) return res.status(400).json({ error: 'Please choose Fresher or Experienced.' });
    let file; try { file = readResume(b.resume); } catch (e) { return res.status(400).json({ error: e.message }); }
    const sid = clip(b.submissionId, 64).replace(/[^a-zA-Z0-9-]/g, '');
    if (sid) { const dup = db.prepare("SELECT id FROM enquiries WHERE type='career' AND extra LIKE ?").get('%"submission_id":"' + sid + '"%'); if (dup) return res.json({ ok: true, id: dup.id, duplicate: true }); }
    const stored = crypto.randomBytes(12).toString('hex') + '.' + file.ext;
    fs.writeFileSync(path.join(RESUME_DIR, stored), file.buf, { mode: 0o600 });
    const extra = { job, level: clip(f.level, 20), location: clip(f.location, 100), qualification: clip(f.qualification, 120), college: clip(f.college, 120), experience: clip(f.experience, 40), skills: clip(f.skills, 300), previous_company: clip(f.company, 100), current_title: clip(f.jobTitle, 100), linkedin: clip(f.linkedin, 200), portfolio: clip(f.portfolio, 200), resume_name: file.name, resume_file: stored, submission_id: sid };
    let info;
    try { info = db.prepare('INSERT INTO enquiries (type,name,email,phone,company,subject,message,extra,source,ip) VALUES (?,?,?,?,?,?,?,?,?,?)').run('career', name, email, phone, extra.previous_company, 'Career application: ' + job, clip(f.message, 2000), JSON.stringify(extra), clip(b.source, 200) || '/careers', req.ip || ''); }
    catch (e) { try { fs.unlinkSync(path.join(RESUME_DIR, stored)); } catch { /* ignore */ } console.error('application save failed:', e.message); return res.status(500).json({ error: 'We could not save your application. Please try again.' }); }
    try { const { resume_file, submission_id, ...pub } = extra; notifyEnquiry({ id: info.lastInsertRowid, type: 'career', name, email, phone, company: extra.previous_company, subject: 'Career application: ' + job, message: clip(f.message, 2000), extra: pub, source: '/careers' }); } catch { /* mail is best-effort */ }
    res.json({ ok: true, id: info.lastInsertRowid });
  });

  // Resumes are private: only signed-in admin users can download them.
  api.get('/applications/:id/resume', requireAuth, (req, res) => {
    const row = db.prepare("SELECT extra FROM enquiries WHERE id=? AND type='career'").get(Number(req.params.id));
    let x = {}; try { x = JSON.parse(row?.extra || '{}'); } catch { /* ignore */ }
    const f = path.basename(String(x.resume_file || ''));
    const p = path.join(RESUME_DIR, f);
    if (!row || !f || !fs.existsSync(p)) return res.status(404).json({ error: 'Resume not found.' });
    res.setHeader('Content-Disposition', 'attachment; filename="' + String(x.resume_name || f).replace(/[^\w.\- ]/g, '_') + '"');
    res.setHeader('Cache-Control', 'private, no-store');
    res.sendFile(p);
  });
}
