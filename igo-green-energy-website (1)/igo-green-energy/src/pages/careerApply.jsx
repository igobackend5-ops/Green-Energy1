import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { api } from '../admin/api.js';
import './careerApply.css';

const MAX = 5 * 1024 * 1024;
const OKEXT = ['pdf', 'doc', 'docx'];
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,200}\.[^\s@]{2,}$/;
const PHONE = /^[0-9+()\-.\s]{7,20}$/;
const EMPTY = { name: '', email: '', phone: '', location: '', qualification: '', college: '', experience: '', skills: '', company: '', jobTitle: '', linkedin: '', portfolio: '', level: '', message: '' };
const uid = () => (window.crypto?.randomUUID ? window.crypto.randomUUID() : 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10));
const size = (n) => (n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB');
export const toDataUrl = (file) => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = () => no(new Error('The file could not be read.')); r.readAsDataURL(file); });
const Chk = () => <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function checkFile(f) {
  const ext = (f.name.split('.').pop() || '').toLowerCase();
  if (!OKEXT.includes(ext)) return 'Unsupported file type. Please upload a PDF, DOC or DOCX file.';
  if (f.size === 0) return 'This file is empty. Please choose another file.';
  if (f.size > MAX) return 'This file is ' + size(f.size) + '. The maximum allowed size is 5 MB.';
  return '';
}

const Ctx = createContext(null);
function F({ k, label, req, type = 'text', ph, wide, area }) {
  const { v, set, blur, touched, errs } = useContext(Ctx);
  const e = touched[k] && errs[k];
  const common = { id: 'apm-' + k, value: v[k], onChange: set(k), onBlur: blur(k), placeholder: ph, 'aria-invalid': !!e, 'aria-required': !!req };
  return (
    <label className={'apmF' + (wide ? ' wide' : '') + (e ? ' bad' : '')} htmlFor={'apm-' + k}>
      <span>{label}{req ? ' *' : ''}</span>
      {area ? <textarea rows={3} {...common} /> : <input type={type} {...common} />}
      {e ? <em role="alert">{e}</em> : null}
    </label>
  );
}

export function ApplyModal({ job, onClose }) {
  const [step, setStep] = useState(1);              // 1 upload · 2 reading resume · 3 review & submit
  const [file, setFile] = useState(null);           // { name, size, dataUrl }
  const [err, setErr] = useState('');
  const [note, setNote] = useState('');             // parsing info/warning
  const [v, setV] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [busy, setBusy] = useState(false);
  const [sub, setSub] = useState({ s: 'idle', m: '' });
  const [drag, setDrag] = useState(false);
  const sid = useRef(uid());
  const input = useRef(null);
  const lock = useRef(false);

  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape' && !busy) onClose(); };
    addEventListener('keydown', k);
    const b = document.body, h = document.documentElement, pb = b.style.overflow, ph = h.style.overflow;
    b.style.overflow = 'hidden'; h.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', k); b.style.overflow = pb; h.style.overflow = ph; };
  }, [onClose, busy]);

  const set = (k) => (e) => setV((c) => ({ ...c, [k]: e.target.value }));
  const blur = (k) => () => setTouched((c) => ({ ...c, [k]: true }));

  const take = async (f) => {
    if (!f) return;
    const bad = checkFile(f);
    if (bad) { setErr(bad); return; }
    setErr(''); setNote('');
    let dataUrl;
    try { dataUrl = await toDataUrl(f); } catch (e) { setErr(e.message); return; }
    setFile({ name: f.name, size: f.size, dataUrl });
    setStep(2);
    try {
      const r = await api('/resume/parse', { method: 'POST', body: { resume: { name: f.name, dataUrl } } });
      if (r.parsed && r.found) {
        // only fill fields that are still empty, so anything the applicant typed is never overwritten
        setV((c) => { const n = { ...c }; Object.entries(r.fields).forEach(([k, val]) => { if (k in EMPTY && !n[k] && val) n[k] = val; }); return n; });
        setNote('We filled in ' + r.found + ' detail' + (r.found === 1 ? '' : 's') + ' from your resume. Please review them and complete anything that is missing.');
      } else setNote(r.message || 'We could not find details in this resume. Please fill in the form below.');
    } catch (e) {
      setNote(e.offline ? 'We could not reach the server to read your resume. You can still fill in the form below.' : (e.message || 'We could not read your resume.') + ' You can still fill in the form below.');
    }
    setStep(3);
  };

  const errs = {
    name: !v.name.trim() && 'Please enter your full name.',
    email: !v.email.trim() ? 'Please enter your email address.' : !EMAIL.test(v.email.trim()) && 'Please enter a valid email address.',
    phone: !v.phone.trim() ? 'Please enter your phone number.' : (!PHONE.test(v.phone.trim()) || v.phone.replace(/\D/g, '').length < 7) && 'Please enter a valid phone number.',
    level: !v.level && 'Please choose Fresher or Experienced.'
  };
  const hasErr = Object.values(errs).some(Boolean);

  const submit = async (e) => {
    e.preventDefault();
    if (lock.current) return;
    setTouched({ name: 1, email: 1, phone: 1, level: 1 });
    if (hasErr) { setSub({ s: 'err', m: 'Please correct the highlighted fields.' }); return; }
    if (!file) { setSub({ s: 'err', m: 'Please upload your resume first.' }); return; }
    lock.current = true; setBusy(true); setSub({ s: 'load', m: '' });
    try {
      await api('/applications', { method: 'POST', body: { job: job.title, submissionId: sid.current, source: '/careers', fields: v, resume: { name: file.name, dataUrl: file.dataUrl } } });
      setSub({ s: 'ok', m: '' });
    } catch (er) {
      setSub({ s: 'err', m: er.message || 'Something went wrong. Please try again.' });
      lock.current = false;
    }
    setBusy(false);
  };

  const done = sub.s === 'ok';
  return (
    <div className="apmOv" onClick={() => !busy && onClose()}>
      <div className="apmCard" role="dialog" aria-modal="true" aria-labelledby="apm-t" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="apmX" aria-label="Close" onClick={onClose} disabled={busy}>×</button>
        <div className="apmHd">
          <p className="apmEye">APPLYING FOR</p>
          <h2 id="apm-t">{job.title}</h2>
          {!done && <ol className="apmSteps" aria-label="Application steps">
            {['Upload Resume', 'Read Details', 'Review & Submit'].map((t, i) => <li key={t} className={step === i + 1 ? 'on' : step > i + 1 ? 'dn' : ''}><b>{step > i + 1 ? <Chk /> : i + 1}</b><span>{t}</span></li>)}
          </ol>}
        </div>
        <div className="apmBody">
          {done ? (
            <div className="apmDone">
              <span className="apmTick"><Chk /></span>
              <h3>Application submitted</h3>
              <p>Thank you for applying for <b>{job.title}</b>. We have received your application and resume, and our team will contact you if your profile matches the role.</p>
              <button type="button" className="apmBtn" onClick={onClose}>Close</button>
            </div>
          ) : step === 1 ? (
            <>
              <div className={'apmDrop' + (drag ? ' on' : '')} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files?.[0]); }}>
                <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true"><path d="M12 16V5M7.5 9.5 12 5l4.5 4.5M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <b>Upload your resume first</b>
                <span>Drag and drop your file here, or</span>
                <button type="button" className="apmBtn" onClick={() => input.current?.click()}>Browse File</button>
                <small>PDF, DOC or DOCX · up to 5 MB</small>
                <input ref={input} type="file" hidden accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => { take(e.target.files?.[0]); e.target.value = ''; }} />
              </div>
              {err && <p className="apmErr" role="alert">{err}</p>}
              <p className="apmHint">We will read your resume to fill in the form for you. You can review and edit everything before submitting.</p>
            </>
          ) : step === 2 ? (
            <div className="apmProc" role="status" aria-live="polite"><i className="apmSpin" /><b>Reading your resume…</b><span>{file?.name}</span></div>
          ) : (
            <Ctx.Provider value={{ v, set, blur, touched, errs }}><form onSubmit={submit} noValidate>
              <div className="apmFile"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 3h8l5 5v13H6zM14 3v5h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg><div><b>{file?.name}</b><small>{file ? size(file.size) : ''} · attached to your application</small></div><button type="button" className="apmLink" onClick={() => { setStep(1); setSub({ s: 'idle', m: '' }); }} disabled={busy}>Replace</button></div>
              {note && <p className="apmNote" role="status">{note}</p>}
              <div className="apmGrid">
                <F k="name" label="Full Name" req /><F k="email" label="Email Address" req type="email" />
                <F k="phone" label="Phone Number" req type="tel" /><F k="location" label="Current Location" />
                <F k="qualification" label="Educational Qualification" /><F k="college" label="College / University" />
                <F k="experience" label="Total Work Experience" ph="e.g. 3 years" />
                <label className={'apmF' + (touched.level && errs.level ? ' bad' : '')} htmlFor="apm-level"><span>Fresher / Experienced *</span>
                  <select id="apm-level" value={v.level} onChange={set('level')} onBlur={blur('level')} aria-invalid={!!(touched.level && errs.level)}><option value="">Select</option><option>Fresher</option><option>Experienced</option></select>
                  {touched.level && errs.level ? <em role="alert">{errs.level}</em> : null}</label>
                <F k="jobTitle" label="Current Job Title" /><F k="company" label="Previous Company" />
                <F k="skills" label="Relevant Skills" wide ph="Separate skills with commas" />
                <F k="linkedin" label="LinkedIn Profile" /><F k="portfolio" label="Portfolio / Website" />
                <F k="message" label="Cover Note (optional)" wide area ph="Tell us anything else you would like us to know" />
              </div>
              {sub.m && <p className={'apmErr' + (sub.s === 'err' ? '' : ' ok')} role="alert">{sub.m}</p>}
              <div className="apmAct">
                <button type="button" className="apmGhost" onClick={onClose} disabled={busy}>Cancel</button>
                <button type="submit" className="apmBtn" disabled={busy}>{busy ? 'Submitting…' : 'Submit Application'}</button>
              </div>
            </form></Ctx.Provider>
          )}
        </div>
      </div>
    </div>
  );
}
