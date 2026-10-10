import React, { useCallback, useState } from 'react';
import { useReveal } from './common.jsx';
import { useCms } from '../admin/store.js';
import { ResumeModal } from './careerResume.jsx';
import { T } from '../content/T.js';
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

export function CareersPage() {
  const ref = useReveal();
  const cj = useCms('careers');
  const jobs = (Array.isArray(cj) ? cj : []).filter((x) => x.status === 'published');
  const plain = (h) => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);   // null | { pos }
  const openForm = (pos) => setModal({ pos: pos || '' });
  const closeForm = useCallback(() => setModal(null), []);
  return (
    <div ref={ref} className="pg crPage">
      <section className="crHero">
        <img className="crHeroImg" src="/careers/hero.jpg" alt="IGO team members in front of solar panels and wind turbines" />
        <div className="crW crHeroIn">
          <p className="crEye">{T('careers.101', 'CAREERS AT GREEN ENERGY')}<i /></p>
          <h1>{T('careers.102', 'Build Your Career.')}<br />{T('careers.103', 'Power a Greener Future.')}</h1>
          <p className="crLead">{T('careers.104', 'Join Green Energy and grow with a team focused on renewable energy, innovation, engineering and sustainability.')}</p>
          <button className="crBtn" onClick={() => jump('cr-current')}>{T('careers.140', 'Join Our Team')} <Arr /></button>
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
        <div className="crCard crCur" id="cr-current" onClick={() => setOpen((o) => !o)}><span className="crRing sm"><I n="brief" s={22} /></span>
          <div><h3>{T('careers.124', 'Current Openings')}</h3><p>{T('careers.125', 'Explore our latest vacancies and apply for the right position.')}</p>
            <button type="button" className={'crBtn sm crTog' + (open ? ' on' : '')} aria-expanded={open} aria-controls="cr-jobs">{open ? T('careers.141', 'Hide Openings') : T('careers.105', 'View Openings')} <svg className="crChev" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button></div>
          <span className="crDeco"><I n="doc" s={64} /></span></div>
        <div className="crCard"><span className="crRing sm"><I n="grad" s={22} /></span>
          <div><h3>{T('careers.126', 'Internships')}</h3><p>{T('careers.127', 'Gain practical experience in Solar, Engineering, Agriculture, R&D, Projects and Business.')}</p>
            <button className="crBtn sm" onClick={() => openForm()}>{T('careers.128', 'Apply for Internship')} <Arr /></button></div>
          <span className="crDeco"><I n="leaf" s={64} /></span></div>
      </div>
        <div id="cr-jobs" className={'crColl' + (open ? ' open' : '')} aria-hidden={!open}><div className="crCollIn">
        {jobs.length === 0 ? <p className="crW crNone">There are no open positions at the moment. Please check back soon.</p> : <div className="crW crJobs">
          {jobs.map((job, i) => (
            <article className="crJob" key={job.id || i}>
              <span className="crJobNo">{String(i + 1).padStart(2, '0')}</span>
              <h3>{job.title}</h3>
              {job.qualification && <p className="crJobQ"><b>Qualification</b>{job.qualification}</p>}
              {job.responsibilities && <><b className="crJobH">Daily Job Roles</b><ul>{String(job.responsibilities).split('\n').map((r) => r.trim()).filter(Boolean).map((r) => <li key={r}>{r}</li>)}</ul></>}
              {plain(job.description) && <p className="crJobD"><b>JD</b>{plain(job.description)}</p>}
              <button type="button" className="crBtn sm" tabIndex={open ? 0 : -1} onClick={() => openForm(job.title)}>Apply Now <Arr /></button>
            </article>
          ))}
        </div>}
        </div></div>
      </section>

      <section><div className="crW"><div className="crLearn">
        <img src="/careers/learn.jpg" alt="" loading="lazy" />
        <span className="crRing big"><I n="book" s={34} /></span>
        <div className="crLearnT"><h2>{T('careers.129', 'Learning & Growth')}</h2><b>{T('careers.130', 'Learn Today. Lead Tomorrow.')}</b><p>{T('careers.131', 'Develop your technical, professional and leadership skills.')}</p></div>
      </div></div></section>

      <section id="cr-apply" className="crApplySec"><div className="crW crApply closed">
        <aside className="crSide">
          <div className="crSideTop"><span className="crRing sm"><I n="user" s={24} /></span><div><h3>{T('careers.132', 'Apply Now')}</h3><p>{T('careers.133', 'Ready to join Green Energy?')}</p></div></div>
          <button className="crBtn sm" onClick={() => openForm()}>{T('careers.134', 'Submit Your Resume')} <Arr /></button>
        </aside>
      </div></section>
      {modal && <ResumeModal position={modal.pos} onClose={closeForm} />}
    </div>
  );
}
