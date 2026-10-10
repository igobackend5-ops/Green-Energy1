import React, { useEffect, useState } from 'react';
import { useEnquiry, HONEY } from '../useEnquiry.js';
import './projectForms.css';

const SV = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const ICO = {
  roi: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 18v-3M12 18v-6M16 18v-4" /></>,
  visit: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></>,
  quote: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" /></>,
};
const Icon = ({ n, s = 26 }) => <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true" {...SV}>{ICO[n]}</svg>;
const PTYPES = ['Residential', 'Commercial', 'Industrial', 'Agriculture and Dairy', 'Government and Institutions'];
const SERVICES = ['Solar', 'Wind', 'Bio Gas', 'Water Treatment'];

export const FORMS = {
  roi: { ic: 'roi', title: 'Project ROI / Request', desc: 'Get a detailed estimate and ROI for your renewable energy project.', btn: 'Submit Request',
    fields: [['ptype', 'Project Type', 'select', PTYPES, 'Select project type'], ['capacity', 'Estimated Capacity / Load', 'text', null, 'Enter estimated capacity (e.g., 10 kW)', true], ['details', 'Additional Details', 'area', null, 'Tell us more about your project requirements...', false]] },
  visit: { ic: 'visit', title: 'Book for Site Visit', desc: 'Schedule a site visit and let our experts assess your requirements.', btn: 'Book Site Visit',
    fields: [['ptype', 'Project Type', 'select', PTYPES, 'Select project type'], ['date', 'Preferred Date', 'date', null, '', true], ['location', 'Location / Address', 'area', null, 'Enter your location or address', true]] },
  quote: { ic: 'quote', title: 'Get Smart Quote', desc: 'Share your project details and receive a customized quote.', btn: 'Get Quote',
    fields: [['service', 'Select Service', 'select', SERVICES, 'Choose a service'], ['size', 'Project Size / Requirement', 'text', null, 'Enter project size or requirement', true], ['details', 'Additional Information', 'area', null, 'Tell us about your requirements...', false]] },
};

export function ProjectSidebar({ onOpen }) {
  return (
    <aside className="pfSide" aria-label="Project enquiries">
      {Object.entries(FORMS).map(([k, f]) => (
        <button key={k} type="button" className="pfCard" onClick={() => onOpen(k)}>
          <span className="pfIc"><Icon n={f.ic} /></span>
          <span className="pfTx"><b>{f.title}</b><small>{f.desc}</small></span>
          <svg className="pfArr" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...SV} strokeWidth="2"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
        </button>
      ))}
    </aside>
  );
}

export function ProjectFormModal({ kind, onClose }) {
  const f = FORMS[kind];
  const [st, send] = useEnquiry();
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); };
    addEventListener('keydown', k);
    const b = document.body, pb = b.style.overflow; b.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', k); b.style.overflow = pb; };
  }, [onClose]);
  const today = new Date().toISOString().slice(0, 10);
  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const extra = {};
    f.fields.forEach(([n, l]) => { if (d.get(n)) extra[l] = d.get(n); });
    send({ type: 'quote', name: d.get('name'), email: d.get('email'), phone: d.get('phone'), subject: f.title, message: d.get('details') || d.get('location') || '', website: d.get('website'), extra: { Form: f.title, ...extra }, source: '/projects' });
  };
  return (
    <div className="pfOv" onClick={onClose}>
      <form className="pfModal" role="dialog" aria-modal="true" aria-label={f.title} onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <button type="button" className="pfX" aria-label="Close" onClick={onClose}>×</button>
        <div className="pfHd"><span className="pfIc"><Icon n={f.ic} /></span><div><h2>{f.title}</h2><p>{f.desc}</p></div></div>
        {st.ok ? (
          <div className="pfOk"><h3>Thank you!</h3><p>We have received your request. Our team will contact you shortly.</p><button type="button" className="pfSubmit" onClick={onClose}>Close</button></div>
        ) : (
          <>
            <label>Full Name <i>*</i><input name="name" required placeholder="Enter your full name" /></label>
            <div className="pfRow">
              <label>Email Address <i>*</i><input name="email" type="email" required placeholder="Enter your email" /></label>
              <label>Phone Number <i>*</i><input name="phone" type="tel" required pattern="[0-9+()\- ]{7,20}" title="Enter a valid phone number" placeholder="Enter your phone number" /></label>
            </div>
            {f.fields.map(([n, l, t, opts, ph, req = true]) => (
              <label key={n}>{l} {req && <i>*</i>}
                {t === 'select' ? <select name={n} required defaultValue=""><option value="" disabled>{ph}</option>{opts.map((o) => <option key={o}>{o}</option>)}</select>
                  : t === 'area' ? <textarea name={n} required={req} rows="3" placeholder={ph} />
                  : <input name={n} type={t} required={req} placeholder={ph} min={t === 'date' ? today : undefined} />}
              </label>
            ))}
            <input {...HONEY} />
            {st.err && <p className="pfErr" role="alert">{st.err}</p>}
            <button className="pfSubmit" disabled={st.busy}>{st.busy ? 'Sending…' : f.btn}</button>
          </>
        )}
      </form>
    </div>
  );
}

export function useProjectForms() {
  const [open, setOpen] = useState(null);
  return [open, setOpen];
}
