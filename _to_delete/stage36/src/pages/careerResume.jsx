import React, { useEffect, useRef, useState } from 'react';
import { api } from '../admin/api.js';
import { checkFile, toDataUrl } from './careerApply.jsx';
import './careerApply.css';

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,200}\.[^\s@]{2,}$/;
const PHONE = /^[0-9+()\-.\s]{7,20}$/;
const URLRE = /^(https?:\/\/)?[^\s/]+\.[^\s]{2,}$/i;
const uid = () => (window.crypto?.randomUUID ? window.crypto.randomUUID() : 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10));
const EMPTY = { name: '', email: '', phone: '', job: '', qualification: '', experience: '', location: '', linkedin: '', portfolio: '', message: '' };

export function ResumeModal({ position = '', onClose }) {
  const [v, setV] = useState({ ...EMPTY, job: position });
  const [file, setFile] = useState(null);
  const [fileErr, setFileErr] = useState('');
  const [touched, setTouched] = useState({});
  const [busy, setBusy] = useState(false);
  const [sub, setSub] = useState({ s: 'idle', m: '' });
  const [drag, setDrag] = useState(false);
  const sid = useRef(uid()); const lock = useRef(false); const input = useRef(null);

  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape' && !busy) onClose(); };
    addEventListener('keydown', k);
    const b = document.body, h = document.documentElement, pb = b.style.overflow, ph = h.style.overflow;
    b.style.overflow = 'hidden'; h.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', k); b.style.overflow = pb; h.style.overflow = ph; };
  }, [onClose, busy]);

  const set = (k) => (e) => setV((c) => ({ ...c, [k]: e.target.value }));
  const blur = (k) => () => setTouched((c) => ({ ...c, [k]: true }));
  const t = (k) => v[k].trim();
  const errs = {
    name: !t('name') && 'Please enter your full name.',
    email: !t('email') ? 'Please enter your email address.' : !EMAIL.test(t('email')) && 'Please enter a valid email address.',
    phone: !t('phone') ? 'Please enter your phone number.' : (!PHONE.test(t('phone')) || t('phone').replace(/\D/g, '').length < 7) && 'Please enter a valid phone number.',
    job: !t('job') && 'Please enter the position you are applying for.',
    qualification: !t('qualification') && 'Please enter your highest qualification.',
    experience: !t('experience') && 'Please enter your total experience (e.g. Fresher, 2 years).',
    location: !t('location') && 'Please enter your current location.',
    linkedin: t('linkedin') && !URLRE.test(t('linkedin')) && 'Please enter a valid link.',
    portfolio: t('portfolio') && !URLRE.test(t('portfolio')) && 'Please enter a valid link.',
  };
  const take = (f) => {
    if (!f) return;
    const m = checkFile(f);
    if (m) { setFile(null); setFileErr(m); return; }
    setFile(f); setFileErr('');
  };
  const submit = async (e) => {
    e.preventDefault();
    if (lock.current) return;
    setTouched(Object.fromEntries(Object.keys(errs).map((k) => [k, 1])));
    if (Object.values(errs).some(Boolean)) { setSub({ s: 'err', m: 'Please correct the highlighted fields.' }); return; }
    if (!file) { setFileErr('Please upload your resume (PDF, DOC or DOCX).'); setSub({ s: 'err', m: 'Please upload your resume.' }); return; }
    lock.current = true; setBusy(true); setSub({ s: 'load', m: '' });
    try {
      const dataUrl = await toDataUrl(file);
      await api('/applications', { method: 'POST', body: { job: t('job'), submissionId: sid.current, source: '/careers', fields: { name: v.name, email: v.email, phone: v.phone, qualification: v.qualification, experience: v.experience, location: v.location, linkedin: v.linkedin, portfolio: v.portfolio, message: v.message }, resume: { name: file.name, dataUrl } } });
      setSub({ s: 'ok', m: '' });
    } catch (er) {
      setSub({ s: 'err', m: er.offline ? 'We could not reach the server. Your details are still here, please try again.' : (er.message || 'Something went wrong. Please try again.') });
      lock.current = false;
    }
    setBusy(false);
  };
  const F = (k, label, o = {}) => {
    const e = touched[k] && errs[k];
    const c = { id: 'rm-' + k, value: v[k], onChange: set(k), onBlur: blur(k), placeholder: o.ph, 'aria-invalid': !!e };
    return (
      <label className={'apmF' + (o.wide ? ' wide' : '') + (e ? ' bad' : '')} htmlFor={'rm-' + k}>
        <span>{label}{o.req ? ' *' : ''}</span>
        {o.area ? <textarea rows={3} {...c} /> : <input type={o.type || 'text'} {...c} />}
        {e ? <em role="alert">{e}</em> : null}
      </label>
    );
  };
  const done = sub.s === 'ok';
  return (
    <div className="apmOv" onClick={() => !busy && onClose()}>
      <div className="apmCard" role="dialog" aria-modal="true" aria-labelledby="rm-t" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="apmX" aria-label="Close" onClick={onClose} disabled={busy}>×</button>
        <div className="apmHd"><p className="apmEye">CAREERS</p><h2 id="rm-t">Submit Your Resume</h2></div>
        <div className="apmBody">
          {done ? (
            <div className="apmDone">
              <span className="apmTick"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <h3>Thank you for applying.</h3>
              <p>Your application has been submitted successfully.</p>
              <button type="button" className="apmBtn" onClick={onClose}>Close</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="apmGrid">
                {F('name', 'Full Name', { req: 1 })}{F('email', 'Email Address', { req: 1, type: 'email' })}
                {F('phone', 'Phone Number', { req: 1, type: 'tel' })}{F('job', 'Position / Job Role Applying For', { req: 1 })}
                {F('qualification', 'Highest Qualification', { req: 1 })}{F('experience', 'Total Experience', { req: 1, ph: 'e.g. Fresher, 2 years' })}
                {F('location', 'Current Location', { req: 1, wide: 1 })}
                {F('linkedin', 'LinkedIn Profile (Optional)', { type: 'url', ph: 'https://' })}{F('portfolio', 'Portfolio / Website (Optional)', { type: 'url', ph: 'https://' })}
                {F('message', 'Cover Letter / Message (Optional)', { wide: 1, area: 1 })}
              </div>
              <div className={'apmF wide' + (fileErr ? ' bad' : '')} style={{ marginTop: 10 }}>
                <span>Resume Upload *</span>
                <div className={'apmDrop' + (drag ? ' on' : '')} style={{ padding: 14 }} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files?.[0]); }}>
                  <input ref={input} type="file" hidden accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => { take(e.target.files?.[0]); e.target.value = ''; }} />
                  {file ? (
                    <div className="apmFile" style={{ width: '100%', marginBottom: 0 }}><div><b>{file.name}</b><small>{file.size > 1048576 ? (file.size / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(file.size / 1024)) + ' KB'}</small></div><button type="button" className="apmLink" onClick={() => { setFile(null); setFileErr(''); }}>Remove File</button></div>
                  ) : (
                    <><span>Drag and drop here, or</span><button type="button" className="apmBtn" onClick={() => input.current?.click()}>Browse File</button><small>PDF, DOC or DOCX · max 5 MB</small></>
                  )}
                </div>
                {fileErr && <em role="alert">{fileErr}</em>}
              </div>
              {sub.m && <p className={'apmErr' + (sub.s === 'err' ? '' : ' ok')} role="alert">{sub.m}</p>}
              <div className="apmAct"><button type="button" className="apmGhost" onClick={onClose} disabled={busy}>Cancel</button><button className="apmBtn" type="submit" disabled={busy}>{busy ? 'Submitting…' : 'Submit Application'}</button></div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
