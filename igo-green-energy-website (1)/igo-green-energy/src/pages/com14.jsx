import React, { useEffect, useRef, useState } from 'react';

export const go = (p) => { history.pushState(null, '', p); dispatchEvent(new PopStateEvent('popstate')); };
export const Link = ({ to, className, children, ...r }) => (
  <a href={to} className={className} {...r} onClick={(e) => { e.preventDefault(); r.onClick && r.onClick(e); go(to); }}>{children}</a>
);

/* reveal-on-scroll */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current; if (!root) return;
    const els = root.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  });
  return ref;
}

const P = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M4 12h15M13 6l6 6-6 6',
  sun: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2',
  wind: 'M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3M3 12h8',
  leaf: 'M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19c3-5 6-8 10-10',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z',
  tool: 'M14 6a4 4 0 0 0 5 5l-9 9-3-3 9-9a4 4 0 0 0-2-2zM4 20l3-3',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  msg: 'M4 5h16v11H9l-5 4z',
  pin: 'M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11zM12 7.500a2.500 2.500 0 1 0 0 5 2.500 2.500 0 0 0 0-5z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
  plus: 'M12 5v14M5 12h14',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  shield: 'M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  home: 'M3 11l9-8 9 8M5 10v10h14V10',
  build: 'M4 21V7l8-4 8 4v14M9 21v-6h6v6M8 10h2M14 10h2',
  factory: 'M3 21V10l6 4V10l6 4V6h4v15zM7 17h2M12 17h2',
  gov: 'M3 10l9-6 9 6M5 10v9M9 10v9M15 10v9M19 10v9M3 21h18',
};
export const Ic = ({ n, size = 22, ...r }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...r}><path d={P[n] || P.check} /></svg>
);

export const Head = ({ eyebrow, title, em, text, center }) => (
  <div className={'pgHead rv' + (center ? ' ctr' : '')}>
    {eyebrow && <p className="pgEye">{eyebrow}</p>}
    <h2>{title} {em && <em>{em}</em>}</h2>
    {text && <p className="pgSub">{text}</p>}
  </div>
);

export const Sec = ({ id, cls = '', children }) => <div id={id} className={'pgs ' + cls}><div className="pgw">{children}</div></div>;

/* split hero used by the four service pages */
export function ServiceHero({ eyebrow, title, em, text, img, alt, fx, onQuote, extra, plain }) {
  return (
    <div className="pgHero split">
      <div className="pgw heroGrid">
        <div className="heroCopy">
          <p className="pgEye">{eyebrow}</p>
          <h1>{title} <em>{em}</em></h1>
          <p className="heroText">{text}</p>
          <div className="heroBtns">
            <button className="pgBtn" onClick={onQuote}>Get a Smart Quote <Ic n="arrow" size={18} /></button>
            {extra}
          </div>
        </div>
        <div className={'heroVis' + (plain ? ' plain' : '')}>
          <img src={img} alt={alt} loading="eager" />
          {!plain && <div className={'fx ' + fx} aria-hidden="true">{fx === 'fxWind' ? <Turbine /> : fx === 'fxSolar' ? <i className="sunDisc" /> : fx === 'fxWater' ? <><i /><i /><i /></> : <><i /><i /><i /><i /><i /><i /></>}</div>}
        </div>
      </div>
    </div>
  );
}
export const Turbine = () => (
  <svg className="turb" viewBox="0 0 120 120" aria-hidden="true"><g className="blades"><path d="M60 60L56 6q4-4 8 0z" /><path d="M60 60L110 88q1 5-4 6z" transform="rotate(0)" /><path d="M60 60L14 92q-4-2-3-6z" /></g><circle cx="60" cy="60" r="5" /></svg>
);

export const Cta = ({ eyebrow, title, em, text, label, onClick, to, tone }) => (
  <div className={'pgCta rv ' + (tone || '')}>
    <div><p className="pgEye">{eyebrow}</p><h2>{title} {em && <em>{em}</em>}</h2>{text && <p>{text}</p>}</div>
    {to ? <Link to={to} className="pgBtn">{label} <Ic n="arrow" size={18} /></Link> : <button className="pgBtn" onClick={onClick}>{label} <Ic n="arrow" size={18} /></button>}
  </div>
);

/* tool / feature card (placeholder tools: no invented numbers) */
export const ToolCard = ({ icon, title, text, label, onClick, soon }) => (
  <div className="toolCard rv">
    <span className="toolIc"><Ic n={icon} size={26} /></span>
    <h3>{title}{soon && <small>Coming soon</small>}</h3>
    <p>{text}</p>
    <button className="pgLink" onClick={onClick}>{label} <Ic n="arrow" size={16} /></button>
  </div>
);

export const Check = ({ items, cols }) => (
  <ul className={'pgChecks' + (cols ? ' c' + cols : '')}>{items.map((t) => <li key={t} className="rv"><Ic n="check" size={18} />{t}</li>)}</ul>
);

/* process flows - each service page uses its own variant */
export function Flow({ steps, variant }) {
  const [on, setOn] = useState(0);
  if (variant === 'tabs') {
    return (
      <div className="flowTabs rv">
        <div className="ftRail" role="tablist">
          {steps.map((s, i) => (
            <button key={s.t} role="tab" aria-selected={on === i} className={i === on ? 'on' : i < on ? 'done' : ''} onClick={() => setOn(i)}>
              <b>{String(i + 1).padStart(2, '0')}</b><span>{s.t}</span>
            </button>
          ))}
          <i className="ftBar" style={{ width: `${((on + 1) / steps.length) * 100}%` }} />
        </div>
        <div className="ftPanel" key={on}><span className="ftNum">{on + 1}</span><div><h3>{steps[on].t}</h3><p>{steps[on].d}</p></div>
          <div className="ftNav"><button disabled={on === 0} onClick={() => setOn(on - 1)} aria-label="Previous step">←</button><button disabled={on === steps.length - 1} onClick={() => setOn(on + 1)} aria-label="Next step">→</button></div>
        </div>
      </div>
    );
  }
  return (
    <ol className={'flow ' + variant}>
      {steps.map((s, i) => (
        <li key={s.t} className="rv" style={{ '--i': i }}><span className="fNum">{i + 1}</span><h3>{s.t}</h3>{s.d && <p>{s.d}</p>}</li>
      ))}
    </ol>
  );
}
