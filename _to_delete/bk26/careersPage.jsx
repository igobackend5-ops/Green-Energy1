import React, { useState } from 'react';
import { useReveal } from './common.jsx';
import { T } from '../content/T.js';
import { submitEnquiry } from '../admin/api.js';
import './careersPage.css';

const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
const IC = {
  leaf: <><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" {...P} /><path d="M5 19c3-5 6-8 10-10" {...P} /></>,
  gear: <><circle cx="12" cy="12" r="3" {...P} /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" {...P} /></>,
  chart: <><path d="M5 20V12M10 20V8M15 20v-6M20 20V4" {...P} /></>,
  bulb: <><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" {...P} /></>,
  team: <><circle cx="9" cy="8" r="3" {...P} /><circle cx="17" cy="9" r="2.4" {...P} /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15.5 14.4c3 0 5.5 2 5.5 5.6" {...P} /></>,
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" {...P} />,
  brief: <><rect x="3" y="7" width="18" height="13" rx="2" {...P} /><path d="M9 7V5h6v2M3 13h18" {...P} /></>,
  sales: <><path d="M4 20V10M10 20V4M16 20v-8" {...P} /><path d="M3 20h18" {...P} /></>,
  agri: <><path d="M12 21V9M12 13c-4 0-6-2-6-6 4 0 6 2 6 6zM12 11c0-3 2-5 6-5 0 4-2 5-6 5z" {...P} /></>,
  flask: <><path d="M9 3h6M10 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4A1.5 1.5 0 0 0 19 19l-5-10V3" {...P} /></>,
  screen: <><rect x="3" y="4" width="18" height="12" rx="2" {...P} /><path d="M8 20h8M12 16v4" {...P} /></>,
  cog: <><circle cx="12" cy="12" r="3.2" {...P} /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2 2M16.7 16.7l2 2M18.7 5.3l-2 2M7.3 16.7l-2 2" {...P} /></>,
  grad: <><path d="m2 9 10-5 10 5-10 5z" {...P} /><path d="M6 11.5V16c3 2.5 9 2.5 12 0v-4.5" {...P} /></>,
  book: <><path d="M12 6c-2-1.5-5-2-9-2v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v14" {...P} /></>,
  user: <><circle cx="12" cy="8" r="4" {...P} /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" {...P} /></>,
  doc: <><path d="M6 3h8l5 5v13H6z" {...P} /><path d="M14 3v5h5M9 13h7M9 17h5" {...P} /></>,
};
const I = ({ n, s = 22 }) => <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">{IC[n]}</svg>;
const Arr = () => <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const WHY = [['leaf', 'Meaningful Work'], ['gear', 'Real Project Exposure'], ['chart', 'Learning & Growth'], ['bulb', 'Innovation & R&D'], ['team', 'Supportive Team Culture'], ['star', 'Career Opportunities']];
const OPP = [['gear', 'Engineering'], ['brief', 'Projects'], ['sales', 'Sales'], ['agri', 'Agriculture'], ['flask', 'R&D'], ['screen', 'Digital'], ['cog', 'Operations']];

function Field({ label, req, children, cls = '' }) {
  return <label className={'crF ' + cls}><span>{label}{req ? ' *' : ''}</span>{children}</label>;
}

export function CareersPage() {
  const ref = useReveal();
  const [v, setV] = useState({});
  const [files, setFiles] = useState({});
  const [st, setSt] = useState({ s: 'idle', m: '' });
  const set = (k) => (e) => setV((c) => ({ ...c, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    if (!v.ok) return setSt({ s: 'err', m: 'Please confirm the information provided is accurate.' });
    setSt({ s: 'load', m: '' });
    try {
      await submitEnquiry({
        type: 'career', name: v.name, email: v.email, phone: v.phone, subject: 'Career application: ' + (v.pos || ''),
        message: v.msg || '',
        extra: { city: v.city, qualification: v.qual, specialization: v.spec, graduation: v.year, position: v.pos, department: v.dept, level: v.lvl, experience: v.exp, resume: files.cv || '', portfolio: v.port || files.pf || '', skills: v.skills, preferred: v.pref },
        website: v.website,
      });
      setSt({ s: 'ok', m: 'Thank you! Your application has been received. We will contact you soon.' });
      setV({}); setFiles({}); e.target.reset();
    } catch (err) { setSt({ s: 'err', m: err.message || 'Something went wrong. Please try again.' }); }
  };
  return (
    <div ref={ref} className="pg crPage">
      <section className="crHero">
        <img className="crHeroImg" src="/careers/hero.jpg" alt="IGO team members in front of solar panels and wind turbines" />
        <div className="crW crHeroIn">
          <p className="crEye">{T('careers.101', 'CAREERS AT GREEN ENERGY')}<i /></p>
          <h1>{T('careers.102', 'Build Your Career.')}<br />{T('careers.103', 'Power a Greener Future.')}</h1>
          <p className="crLead">{T('careers.104', 'Join Green Energy and grow with a team focused on renewable energy, innovation, engineering and sustainability.')}</p>
          <button className="crBtn" onClick={() => jump('cr-openings')}>{T('careers.105', 'View Openings')} <Arr /></button>
        </div>
      </section>

      <section className="crTint"><div className="crW crWhy">
        <div><h2>{T('careers.106', 'Why Green Energy')}</h2>
          <div className="crWhyG">{WHY.map(([ic, t], i) => <div className="crWi" key={t}><span className="crRing"><I n={ic} s={24} /></span><b>{T('careers.11' + i, t)}</b></div>)}</div></div>
        <div className="crImg crWhyImg"><img src="/careers/why.jpg" alt="Hands holding a young plant" loading="lazy" /></div>
      </div></section>

      <section><div className="crW crLife">
        <div className="crImg"><img src="/careers/life.jpg" alt="IGO team collaborating around a laptop" loading="lazy" /></div>
        <div className="crLifeT"><h2>{T('careers.120', 'Life at Green Energy')}</h2>
          <p className="crWords"><span>Learn</span><em>•</em><span>Collaborate</span><em>•</em><span>Innovate</span><em>•</em><span>Grow</span></p>
          <p className="crP">{T('careers.121', 'Experience real projects, teamwork, training, site exposure and a culture of continuous learning.')}</p></div>
      </div></section>

      <section className="crTint"><div className="crW crOpp">
        <div><h2>{T('careers.122', 'Career Opportunities')}</h2>
          <div className="crChips">{OPP.map(([ic, t]) => <span className="crChip" key={t}><I n={ic} s={20} />{t}</span>)}</div>
          <p className="crP sm">{T('careers.123', 'Find opportunities that match your skills and interests.')}</p></div>
        <div className="crImg crOppImg"><img src="/careers/opp.jpg" alt="IGO engineer at a solar and wind site" loading="lazy" /></div>
      </div></section>

      <section id="cr-openings"><div className="crW crTwo">
        <div className="crCard"><span className="crRing sm"><I n="brief" s={22} /></span>
          <div><h3>{T('careers.124', 'Current Openings')}</h3><p>{T('careers.125', 'Explore our latest vacancies and apply for the right position.')}</p>
            <button className="crBtn sm" onClick={() => jump('cr-apply')}>{T('careers.105', 'View Openings')} <Arr /></button></div>
          <span className="crDeco"><I n="doc" s={64} /></span></div>
        <div className="crCard"><span className="crRing sm"><I n="grad" s={22} /></span>
          <div><h3>{T('careers.126', 'Internships')}</h3><p>{T('careers.127', 'Gain practical experience in Solar, Engineering, Agriculture, R&D, Projects and Business.')}</p>
            <button className="crBtn sm" onClick={() => jump('cr-apply')}>{T('careers.128', 'Apply for Internship')} <Arr /></button></div>
          <span className="crDeco"><I n="leaf" s={64} /></span></div>
      </div></section>

      <section><div className="crW"><div className="crLearn">
        <img src="/careers/learn.jpg" alt="" loading="lazy" />
        <span className="crRing big"><I n="book" s={34} /></span>
        <div className="crLearnT"><h2>{T('careers.129', 'Learning & Growth')}</h2><b>{T('careers.130', 'Learn Today. Lead Tomorrow.')}</b><p>{T('careers.131', 'Develop your technical, professional and leadership skills.')}</p></div>
      </div></div></section>

      <section id="cr-apply" className="crApplySec"><div className="crW crApply">
        <aside className="crSide">
          <div className="crSideTop"><span className="crRing sm"><I n="user" s={24} /></span><div><h3>{T('careers.132', 'Apply Now')}</h3><p>{T('careers.133', 'Ready to join Green Energy?')}</p></div></div>
          <button className="crBtn sm" onClick={() => jump('cr-form')}>{T('careers.134', 'Submit Your Resume')} <Arr /></button>
          <hr />
          <p className="crQuote">{T('careers.135', 'Your Energy. Your Ideas.')}<br />{T('careers.136', 'Your Future.')}</p>
          <img src="/careers/apply.jpg" alt="Solar panels with wind turbines" loading="lazy" />
        </aside>
        <form className="crForm" id="cr-form" onSubmit={submit} noValidate={false}>
          <h3><I n="user" s={18} /> {T('careers.137', 'Applicant Details')}</h3>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="crHp" onChange={set('website')} />
          <h4>Personal Information</h4>
          <div className="crG4">
            <Field label="Full Name" req><input required value={v.name || ''} onChange={set('name')} /></Field>
            <Field label="Email Address" req><input required type="email" value={v.email || ''} onChange={set('email')} /></Field>
            <Field label="Mobile Number" req><input required type="tel" value={v.phone || ''} onChange={set('phone')} /></Field>
            <Field label="Location / City" req><input required value={v.city || ''} onChange={set('city')} /></Field>
          </div>
          <h4>Education</h4>
          <div className="crG3">
            <Field label="Highest Qualification" req><select required value={v.qual || ''} onChange={set('qual')}><option value="" /><option>Diploma</option><option>ITI</option><option>Bachelor's Degree</option><option>Master's Degree</option><option>Other</option></select></Field>
            <Field label="Specialization"><input value={v.spec || ''} onChange={set('spec')} /></Field>
            <Field label="Year of Graduation"><input inputMode="numeric" value={v.year || ''} onChange={set('year')} /></Field>
          </div>
          <h4>Career Details</h4>
          <div className="crG4">
            <Field label="Position Applied For" req><input required value={v.pos || ''} onChange={set('pos')} /></Field>
            <Field label="Department" req><select required value={v.dept || ''} onChange={set('dept')}><option value="" />{OPP.map(([, t]) => <option key={t}>{t}</option>)}</select></Field>
            <Field label="Fresher / Experienced" req><select required value={v.lvl || ''} onChange={set('lvl')}><option value="">Select</option><option>Fresher</option><option>Experienced</option></select></Field>
            <Field label="Total Experience"><input value={v.exp || ''} onChange={set('exp')} /></Field>
          </div>
          <h4>Documents</h4>
          <div className="crG2">
            <Field label="Upload Resume / CV" req><span className="crFile"><input required type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFiles((c) => ({ ...c, cv: e.target.files[0]?.name }))} /></span></Field>
            <Field label="Portfolio / LinkedIn (Optional)"><span className="crFile"><input type="file" onChange={(e) => setFiles((c) => ({ ...c, pf: e.target.files[0]?.name }))} /></span></Field>
          </div>
          <h4>Additional Information</h4>
          <div className="crG3 last">
            <Field label="Key Skills"><input placeholder="Enter your skills" value={v.skills || ''} onChange={set('skills')} /></Field>
            <Field label="Preferred Location"><select value={v.pref || ''} onChange={set('pref')}><option value="">Select Location</option><option>Chennai</option><option>Coimbatore</option><option>Any location</option></select></Field>
            <Field label="Short Message / Cover Note"><textarea rows={3} placeholder="Tell us about yourself..." value={v.msg || ''} onChange={set('msg')} /></Field>
          </div>
          <div className="crSub">
            <label className="crChk"><input type="checkbox" checked={!!v.ok} onChange={(e) => setV((c) => ({ ...c, ok: e.target.checked }))} /> I confirm that the information provided is accurate.</label>
            <button className="crBtn" type="submit" disabled={st.s === 'load'}>{st.s === 'load' ? 'Submitting…' : 'Submit Application'} <Arr /></button>
          </div>
          {st.m && <p className={'crMsg ' + st.s} role="status">{st.m}</p>}
        </form>
      </div></section>
    </div>
  );
}
