import React from 'react';
import { T } from '../content/T.js';
import './windSolutions.css';

const P = {
  team: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.3" /><path d="M16 14.2c2.9.2 5 2.4 5 5.3" /></>,
  site: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l5 5M11 8v6M8 11h6" /></>,
  epc: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  tools: <><path d="M14.7 6.3a4 4 0 0 0 5 5L21 12.6 12.6 21 3 11.4 11.4 3z" /><path d="M7 17l-2 2" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5L15.5 10" /></>,
};
const CARDS = [
  { ic: 'team', img: '/wind-consult.jpg', t: T("windsol.004", "Wind Energy Consultation"), d: T("windsol.005", "Expert guidance on project planning, technology selection, and returns."), go: 1 },
  { ic: 'site', img: '/wind-site.jpg', t: T("windsol.006", "Site Assessment and Feasibility Studies"), d: T("windsol.007", "Wind resource evaluation and technical and financial feasibility analysis."), go: 3 },
  { ic: 'epc', img: '/wind-epc.jpg', t: T("windsol.008", "Wind Project EPC"), d: T("windsol.009", "Engineering, procurement, and construction managed from start to finish."), go: 4 },
  { ic: 'tools', img: '/wind-install.jpg', t: T("windsol.010", "Wind Turbine Installation"), d: T("windsol.011", "Safe, professional installation and commissioning of wind turbines."), go: 5 },
  { ic: 'shield', img: '/wind-om.jpg', t: T("windsol.012", "Maintenance and O&M Services"), d: T("windsol.013", "Operation and maintenance to maximize uptime and energy output."), go: 5 },
];
const Leaf = () => <svg viewBox="0 0 64 64" className="wsLeafSvg" aria-hidden="true"><path d="M8 58C8 28 26 8 58 6c0 30-18 50-44 50" fill="currentColor" opacity=".9" /><path d="M10 56C22 40 34 28 50 16" stroke="#fff" strokeWidth="2" fill="none" opacity=".7" /></svg>;

export function WindSolutions() {
  const go = (e, n) => { let s = e.currentTarget.closest('.wsSec'); for (let i = 0; i < n && s; i++) s = s.nextElementSibling; s && s.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return (
    <section className="wsSec">
      <span className="wsFloat f1" aria-hidden="true" /><span className="wsFloat f2" aria-hidden="true" /><span className="wsFloat f3" aria-hidden="true" /><span className="wsFloat f4" aria-hidden="true" />
      <div className="wsIn">
        <p className="wsEye">{T("windsol.001", "WIND ENERGY SOLUTIONS")}<i /></p>
        <h2>{T("windsol.002", "End-to-end")} <em>{T("windsol.014", "wind energy")}</em> {T("windsol.015", "services")}</h2>
        <p className="wsSub">{T("windsol.003", "From planning and assessment to installation and maintenance, we provide complete wind energy solutions to help you achieve clean, reliable and sustainable energy.")}</p>
        <div className="wsGrid">
          {CARDS.map((c) => (
            <article key={c.ic} className="wsCard" role="link" tabIndex={0} onClick={(e) => go(e, c.go)} onKeyDown={(e) => e.key === 'Enter' && go(e, c.go)}>
              <div className="wsPh"><img src={c.img} alt="" loading="lazy" /></div>
              <span className="wsIc"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{P[c.ic]}</svg></span>
              <h3>{c.t}</h3><p>{c.d}</p>
              <span className="wsMore">{T("windsol.016", "Learn more")} <b>→</b></span>
              <Leaf />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
