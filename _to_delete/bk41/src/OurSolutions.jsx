import React, { useEffect, useRef } from 'react';
import './ourSolutions.css';

import { T } from './content/T.js';
/* ---------- small inline icons (stroke icons, no external assets) ---------- */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Icon = {
  sprout: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><path d="M12 21v-9" /><path d="M12 13c0-4.2 3-7 8-7 0 5-3 8-8 8z" /><path d="M12 15.5c0-3-2.4-5.5-7-5.5 0 4 2.4 6.5 7 6.5z" /></svg>),
  leaves: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><path d="M4 20c0-6.5 3.2-10.5 9.5-11.5C13.5 15 10.3 19 4 20z" /><path d="M11.5 20c0-5.2 2.2-8.4 7.5-9.3 0 5.2-2.2 8.4-7.5 9.3z" /><path d="M4 20c3-3 5-5.5 7-8.5" /></svg>),
  gear: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><circle cx="12" cy="12" r="9" strokeWidth="3" strokeDasharray="2.35 2.35" /><circle cx="12" cy="12" r="6.2" /><circle cx="12" cy="12" r="2.4" /></svg>),
  globe: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><circle cx="12" cy="12" r="9.2" /><ellipse cx="12" cy="12" rx="4" ry="9.2" /><path d="M2.8 12h18.4M4.2 7.4h15.6M4.2 16.6h15.6" /></svg>),
  sun: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" /></svg>),
  wind: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><path d="M12 10.2V22" /><path d="M12 10.2V2.4" /><path d="M12 10.2l-6.6 4" /><path d="M12 10.2l6.6 4" /><circle cx="12" cy="10.2" r="1.3" /></svg>),
  drop: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><path d="M12 3c4 4.8 6.2 8 6.2 11.2a6.2 6.2 0 0 1-12.4 0C5.8 11 8 7.8 12 3z" /></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" {...S} strokeWidth="2.2" {...p}><path d="M5 12h13M13 6l6 6-6 6" /></svg>)
};

/* ---------- data ---------- */
const STRIP = [
  { label: T("home.solutions.001", "Cleaner Energy"), icon: 'sprout' },
  { label: T("home.solutions.002", "Greener Communities"), icon: 'leaves' },
  { label: T("home.solutions.003", "Smarter Solutions"), icon: 'gear' },
  { label: T("home.solutions.004", "Brighter Tomorrow"), icon: 'globe' }
];

export const SOLUTIONS = [
  {
    key: 'solar', no: '01', tag: T("home.solutions.005", "SOLAR"), icon: 'sun', title: [T("home.solutions.006", "Solar"), T("home.solutions.007", "Energy")],
    text: T("home.solutions.008", "Clean and reliable solar power solutions for homes, businesses and industries."),
    cta: T("home.solutions.009", "Explore Solar"), image: T("home.solutions.010", "/solutions/solar.jpg"), alt: T("home.solutions.011", "Solar farm with photovoltaic panels, mountains and a warm sunset sky")
  },
  {
    key: 'wind', no: '02', tag: T("home.solutions.012", "WIND"), icon: 'wind', title: [T("home.solutions.013", "Wind"), T("home.solutions.014", "Energy")],
    text: T("home.solutions.015", "Harnessing natural wind resources to generate efficient and sustainable power."),
    cta: T("home.solutions.016", "Explore Wind"), image: T("home.solutions.017", "/solutions/wind.jpg"), alt: T("home.solutions.018", "Wind turbines on green hills under a blue sky")
  },
  {
    key: 'biogas', no: '03', tag: T("home.solutions.019", "BIOGAS"), icon: 'sprout', title: [T("home.solutions.020", "Biogas"), T("home.solutions.021", "Solutions")],
    text: T("home.solutions.022", "Converting organic waste into renewable energy while supporting a circular economy."),
    cta: T("home.solutions.023", "Explore Biogas"), image: T("home.solutions.024", "/solutions/biogas.jpg"), alt: T("home.solutions.025", "Green biogas digesters on agricultural land")
  },
  {
    key: 'water', no: '04', tag: T("home.solutions.026", "WATER"), icon: 'drop', title: [T("home.solutions.027", "Water"), T("home.solutions.028", "Treatment")],
    text: T("home.solutions.029", "Smart and sustainable water treatment solutions for cleaner water and healthier communities."),
    cta: T("home.solutions.030", "Explore Water"), image: T("home.solutions.031", "/solutions/water.jpg"), alt: T("home.solutions.032", "Modern water treatment facility with clean blue water")
  }
];

function SolutionCard({ item, index, onExplore }) {
  const I = Icon[item.icon];
  return (
    <article className={`sCard sCard--${item.key}${item.key === 'wind' ? ' sCard--go' : ''}`} style={{ '--i': index }}{...(item.key === 'wind' ? { onClick: (e) => { if (!e.target.closest('.sBtn')) onExplore && onExplore(item.key); }, role: 'link', tabIndex: 0, onKeyDown: (e) => { if (e.key === 'Enter' && !e.target.closest('.sBtn')) onExplore && onExplore(item.key); } } : {})}>
      <div className="sPhoto">
        <img src={item.image} alt={item.alt} loading="lazy" decoding="async" draggable="false" />
      </div>
      <div className="sShade" aria-hidden="true" />
      <div className="sTop">
        <span className="sNum"><b>{item.no}</b><small>{item.tag}</small></span>
        <span className="sIcon" aria-hidden="true"><I /></span>
      </div>
      <div className="sBody">
        <span className="sRule" aria-hidden="true" />
        <h3>{item.title[0]} <em>{item.title[1]}</em></h3>
        <p>{item.text}</p>
        <button type="button" className="sBtn" onClick={() => onExplore && onExplore(item.key)}>
          <span>{item.cta}</span>
          <span className="sArrow" aria-hidden="true"><Icon.arrow /></span>
        </button>
      </div>
    </article>
  );
}

export default function OurSolutions({ onExplore }) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current; if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in'); return;
    }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="solutions" className="oSol" ref={root} aria-labelledby="oSolTitle">
      <div className="oSolBg" aria-hidden="true" />
      <div className="oSolInner">
        <header className="oSolHead rv" style={{ '--i': 0 }}>
          <p className="oSolEyebrow"><span /> {T("home.solutions.033", "OUR SOLUTIONS")} <span /></p>
          <h2 id="oSolTitle">{T("home.solutions.034", "One Partner.")} <em>{T("home.solutions.035", "Four Green Solutions.")}</em></h2>
          <p className="oSolSub">{T("home.solutions.036", "Complete, end-to-end solutions for a cleaner planet and a more sustainable future.")}</p>
        </header>
        <ul className="oSolStrip rv" style={{ '--i': 1 }}>
          {STRIP.map((s) => { const I = Icon[s.icon]; return (<li key={s.label}><I /><span>{s.label}</span></li>); })}
        </ul>
        <div className="oSolGrid">
          {SOLUTIONS.map((item, i) => <SolutionCard key={item.key} item={item} index={i} onExplore={onExplore} />)}
        </div>
      </div>
    </section>
  );
}
