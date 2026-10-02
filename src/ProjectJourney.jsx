import React, { useEffect, useRef } from 'react';
import './projectJourney.css';

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Icon = {
  consult: (p) => (<svg viewBox="0 0 48 48" {...S} {...p}><path d="M13 7h22a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H25l-5 4v-4h-7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z" /><path d="M17 13h14M17 17h8" /><circle cx="12" cy="34" r="3" /><circle cx="24" cy="34" r="3" /><circle cx="36" cy="34" r="3" /><path d="M6 43c0-4 2.5-6 6-6s6 2 6 6M18 43c0-4 2.5-6 6-6s6 2 6 6M30 43c0-4 2.5-6 6-6s6 2 6 6" /></svg>),
  design: (p) => (<svg viewBox="0 0 48 48" {...S} {...p}><path d="M10 5h19l9 9v13" /><path d="M10 5v38h16" /><path d="M29 5v9h9" /><path d="M16 21h12M16 27h7M16 33h6" /><circle cx="34" cy="35" r="6" /><path d="m38.5 39.5 5 5" /></svg>),
  approve: (p) => (<svg viewBox="0 0 48 48" {...S} {...p}><path d="M10 5h19l9 9v10" /><path d="M10 5v38h14" /><path d="M29 5v9h9" /><path d="M16 20h12M16 26h8M16 32h5" /><circle cx="35" cy="35" r="8" /><path d="m31.5 35 2.8 2.8 5-5.2" /></svg>),
  procure: (p) => (<svg viewBox="0 0 48 48" {...S} {...p}><circle cx="16" cy="16" r="5" /><path d="M16 5v3M16 24v3M5 16h3M24 16h3M8.2 8.2l2.1 2.1M21.7 21.7l2.1 2.1M23.8 8.2l-2.1 2.1M10.3 21.7l-2.1 2.1" /><path d="M26 28l9-4 9 4v11l-9 4-9-4z" /><path d="M26 28l9 4 9-4M35 32v11" /></svg>),
  install: (p) => (<svg viewBox="0 0 48 48" {...S} {...p}><path d="M14 17a10 10 0 0 1 20 0z" /><path d="M11 17h26M24 7v10" /><circle cx="24" cy="25" r="5" /><path d="M10 43c0-8 5-12 14-12" /><circle cx="35" cy="37" r="4" /><path d="M35 30v3M35 41v3M28 37h3M39 37h3M30 32l2 2M38 40l2 2M40 32l-2 2M32 40l-2 2" /></svg>),
  test: (p) => (<svg viewBox="0 0 48 48" {...S} {...p}><rect x="9" y="8" width="26" height="35" rx="3" /><path d="M17 8V5h10v3" /><path d="m14 19 2 2 4-4M14 28l2 2 4-4M24 20h7M24 29h5" /><circle cx="36" cy="36" r="7" /><path d="m32.5 36 2.5 2.5 4.5-5" /></svg>),
  operate: (p) => (<svg viewBox="0 0 48 48" {...S} {...p}><circle cx="19" cy="18" r="6" /><path d="M19 5v4M19 27v4M6 18h4M28 18h4M9.8 8.8l2.8 2.8M25.4 24.4l2.8 2.8M28.2 8.8l-2.8 2.8M12.6 24.4l-2.8 2.8" /><path d="M5 43V33M13 43V28M21 43V35" /><rect x="29" y="30" width="5" height="13" rx="1" /><rect x="37" y="22" width="5" height="21" rx="1" /></svg>),
  support: (p) => (<svg viewBox="0 0 48 48" {...S} {...p}><path d="M9 28v-6a15 15 0 0 1 30 0v6" /><rect x="6" y="26" width="7" height="12" rx="3" /><rect x="35" y="26" width="7" height="12" rx="3" /><path d="M38 38c0 4-4 6-9 6h-3" /><rect x="22" y="41" width="6" height="5" rx="2.5" /></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" {...S} strokeWidth="2.4" {...p}><path d="M5 12h13M13 6l6 6-6 6" /></svg>)
};

export const JOURNEY = [
  { no: '01', icon: 'consult', title: 'Consultation & Planning', text: 'Understanding client needs, site conditions and sustainability goals to create the right solution.' },
  { no: '02', icon: 'design', title: 'Design & Engineering', text: 'Creating efficient, reliable and customized solutions with the latest technology.' },
  { no: '03', icon: 'approve', title: 'Approvals & Regulatory', text: 'Handling permits, clearances and compliance with all regulatory requirements.' },
  { no: '04', icon: 'procure', title: 'Procurement & Supply Chain', text: 'Sourcing high-quality equipment and materials from trusted partners.' },
  { no: '05', icon: 'install', title: 'Installation & Construction', text: 'Expert installation and construction by a skilled and experienced team.' },
  { no: '06', icon: 'test', title: 'Testing & Commissioning', text: 'Rigorous testing to ensure optimal performance, safety and reliability.' },
  { no: '07', icon: 'operate', title: 'Operation & Maintenance', text: 'Continuous monitoring and maintenance for long-term efficiency.' },
  { no: '08', icon: 'support', title: 'Ongoing Support', text: 'Dedicated support to ensure uninterrupted and sustainable operations.' }
];

export default function ProjectJourney({ id = 'process' }) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current; if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { el.classList.add('in'); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} className="pj" ref={root} aria-labelledby="pjTitle">
      <div className="pjLand" aria-hidden="true" />
      <div className="pjInner">
        <header className="pjHead">
          <div className="pjHeadL">
            <p className="pjEyebrow"><span /> OUR PROCESS <span /></p>
            <h2 id="pjTitle">Our Complete <em>Project Journey</em></h2>
            <p className="pjKicker">FROM VISION TO A SUSTAINABLE TOMORROW</p>
          </div>
          <p className="pjLead">The same structured process for Solar, Wind, Biogas and Water Treatment. From initial consultation to long-term support, we ensure a seamless and successful project delivery.</p>
        </header>
        <ol className="pjSteps">
          {JOURNEY.map((s, i) => {
            const I = Icon[s.icon];
            return (
              <li className="pjStep" key={s.no} style={{ '--i': i }}>
                <div className="pjIconWrap">
                  <span className="pjIcon"><I /></span>
                  <span className="pjNo">{s.no}</span>
                </div>
                {i < JOURNEY.length - 1 && <span className="pjLink" aria-hidden="true"><span className="pjArrow"><Icon.arrow /></span></span>}
                <div className="pjText">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
