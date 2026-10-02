import React, { useEffect, useRef } from 'react';
import './ourSolutions.css';

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
  { label: 'Cleaner Energy', icon: 'sprout' },
  { label: 'Greener Communities', icon: 'leaves' },
  { label: 'Smarter Solutions', icon: 'gear' },
  { label: 'Brighter Tomorrow', icon: 'globe' }
];

export const SOLUTIONS = [
  {
    key: 'solar', no: '01', tag: 'SOLAR', icon: 'sun', title: ['Solar', 'Energy'],
    text: 'Clean and reliable solar power solutions for homes, businesses and industries.',
    cta: 'Explore Solar', image: '/solutions/solar.jpg', alt: 'Solar farm with photovoltaic panels, mountains and a warm sunset sky'
  },
  {
    key: 'wind', no: '02', tag: 'WIND', icon: 'wind', title: ['Wind', 'Energy'],
    text: 'Harnessing natural wind resources to generate efficient and sustainable power.',
    cta: 'Explore Wind', image: '/solutions/wind.jpg', alt: 'Wind turbines on green hills under a blue sky'
  },
  {
    key: 'biogas', no: '03', tag: 'BIOGAS', icon: 'sprout', title: ['Biogas', 'Solutions'],
    text: 'Converting organic waste into renewable energy while supporting a circular economy.',
    cta: 'Explore Biogas', image: '/solutions/biogas.jpg', alt: 'Green biogas digesters on agricultural land'
  },
  {
    key: 'water', no: '04', tag: 'WATER', icon: 'drop', title: ['Water', 'Treatment'],
    text: 'Smart and sustainable water treatment solutions for cleaner water and healthier communities.',
    cta: 'Explore Water', image: '/solutions/water.jpg', alt: 'Modern water treatment facility with clean blue water'
  }
];

function SolutionCard({ item, index, onExplore }) {
  const I = Icon[item.icon];
  return (
    <article className={`sCard sCard--${item.key}`} style={{ '--i': index }}>
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
          <p className="oSolEyebrow"><span /> OUR SOLUTIONS <span /></p>
          <h2 id="oSolTitle">One Partner. <em>Four Green Solutions.</em></h2>
          <p className="oSolSub">Complete, end-to-end solutions for a cleaner planet and a more sustainable future.</p>
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
