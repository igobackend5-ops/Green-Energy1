import React, { useEffect, useRef } from 'react';
import './industries.css';

import { T } from './content/T.js';
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Icon = {
  home: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><path d="M3.5 11.2 12 4l8.5 7.2" /><path d="M5.8 9.8V20h12.4V9.8" /><path d="M10 20v-5.4h4V20" /></svg>),
  building: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><path d="M5 20.5V4.5h9v16" /><path d="M14 9.5h5v11" /><path d="M8 8h3M8 11.5h3M8 15h3M16 13h1.4M16 16.5h1.4M3.5 20.5h17" /></svg>),
  factory: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><path d="M3.5 20.5V10l5.5 3.4V10l5.5 3.4V6h3.5v14.5z" /><path d="M7 17h1.5M11.5 17H13M16 17h1.5" /></svg>),
  leaf: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><path d="M12 21v-8" /><path d="M12 14c0-4.2 3-7 8-7 0 5-3 8-8 8z" /><path d="M12 16.5c0-3-2.4-5.5-7-5.5 0 4 2.4 6.5 7 6.5z" /></svg>),
  institution: (p) => (<svg viewBox="0 0 24 24" {...S} {...p}><path d="M3.5 9.5 12 4l8.5 5.5z" /><path d="M5.5 9.5v0M6.5 11v6.5M10 11v6.5M14 11v6.5M17.5 11v6.5M4 20.5h16M4.5 18h15" /></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" {...S} strokeWidth="2.2" {...p}><path d="M5 12h13M13 6l6 6-6 6" /></svg>)
};

export const INDUSTRIES = [
  { key: 'residential', no: '01', icon: 'home', title: T("home.industries.001", "Residential"), text: T("home.industries.002", "Homes, apartments and housing societies."), image: T("home.industries.003", "/solutions/ind-residential.jpg"), alt: T("home.industries.004", "Modern home with rooftop solar panels"), pos: 'center' },
  { key: 'commercial', no: '02', icon: 'building', title: T("home.industries.005", "Commercial"), text: T("home.industries.006", "Offices, malls, hotels, hospitals and schools."), image: T("home.industries.007", "/solutions/ind-commercial.jpg"), alt: T("home.industries.008", "Modern glass commercial office building"), pos: 'center' },
  { key: 'industrial', no: '03', icon: 'factory', title: T("home.industries.009", "Industrial"), text: T("home.industries.010", "Factories, manufacturing units and food processing plants."), image: T("home.industries.011", "/solutions/ind-industrial.jpg"), alt: T("home.industries.012", "Industrial processing plant with tall towers"), pos: 'center' },
  { key: 'agriculture', no: '04', icon: 'leaf', title: T("home.industries.013", "Agriculture & Dairy"), text: T("home.industries.014", "Farms, dairies and agro-based businesses."), image: T("home.industries.015", "/solutions/ind-agriculture.jpg"), alt: T("home.industries.016", "Farmland with a tractor, grazing cows and silos"), pos: 'center' },
  { key: 'government', no: '05', icon: 'institution', title: T("home.industries.017", "Government & Institutions"), text: T("home.industries.018", "Public sector bodies, educational and community institutions."), image: T("home.industries.019", "/solutions/ind-government.jpg"), alt: T("home.industries.020", "Large institutional government building"), pos: 'center' }
];

function IndustryCard({ item, index, onSelect }) {
  const I = Icon[item.icon];
  return (
    <article className="iCard" style={{ '--i': index }}>
      <div className="iPhoto">
        <img src={item.image} alt={item.alt} loading="lazy" decoding="async" draggable="false" style={{ objectPosition: item.pos }} />
        <span className="iNo">{item.no}</span>
      </div>
      <span className="iIcon" aria-hidden="true"><I /></span>
      <div className="iBody">
        <h3>{item.title}</h3>
        <div className="iFoot">
          <p>{item.text}</p>
          <button type="button" className="iArrow" aria-label={`Enquire about ${item.title}`} onClick={() => onSelect && onSelect(item.key)}><Icon.arrow /></button>
        </div>
      </div>
    </article>
  );
}

export default function Industries({ onSelect }) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current; if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { el.classList.add('in'); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id="industries" className="ind" ref={root} aria-labelledby="indTitle">
      <div className="indInner">
        <header className="indHead">
          <p className="indEyebrow"><span /> {T("home.industries.021", "INDUSTRIES WE SERVE")} <span /></p>
          <h2 id="indTitle">{T("home.industries.022", "Clean Energy & Water Solutions for")} <em>{T("home.industries.023", "Every Sector")}</em></h2>
          <p className="indSub">{T("home.industries.024", "Tailored solutions for different industries to build a cleaner, greener and more sustainable tomorrow.")}</p>
        </header>
        <div className="indGrid">
          {INDUSTRIES.map((it, i) => <IndustryCard key={it.key} item={it} index={i} onSelect={onSelect} />)}
        </div>
      </div>
    </section>
  );
}
