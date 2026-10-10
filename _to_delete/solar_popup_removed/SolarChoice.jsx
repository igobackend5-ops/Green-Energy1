import React, { useEffect, useRef, useState } from 'react';
import { Ic, go } from './common.jsx';
import { SOLAR_PRODUCTS, SOLAR_PROJECTS, countItems } from './solarData.js';
import './solarChoice.css';

/* open the Solar chooser from anywhere: openSolarChoice() or openSolarChoice('products' | 'projects') */
export const openSolarChoice = (view) => dispatchEvent(new CustomEvent('igo:solar', { detail: { view } }));

const Groups = ({ data, cta, onCta }) => (
  <div className="scGroups">
    {data.map((g) => (
      <section className="scGroup" key={g.key}>
        <h3><span className="scGi"><Ic n={g.icon} size={20} /></span>{g.title}<small>{g.items.length}</small></h3>
        <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
      </section>
    ))}
    {cta && <button type="button" className="scQuote" onClick={onCta}>{cta} <Ic n="arrow" size={18} /></button>}
  </div>
);
export const SolarProductsList = (p) => <Groups data={SOLAR_PRODUCTS} {...p} />;
export const SolarProjectsList = (p) => <Groups data={SOLAR_PROJECTS} {...p} />;

export default function SolarChoice({ onQuote }) {
  const [view, setView] = useState(null); // null | 'choose' | 'products' | 'projects'
  const [shown, setShown] = useState(false);
  const back = useRef(null);
  const open = (v) => { setView(v || 'choose'); requestAnimationFrame(() => requestAnimationFrame(() => setShown(true))); };
  const close = () => { setShown(false); setTimeout(() => setView(null), 220); };

  useEffect(() => {
    const h = (e) => open(e.detail && e.detail.view);
    addEventListener('igo:solar', h);
    return () => removeEventListener('igo:solar', h);
  }, []);
  useEffect(() => {
    if (!view) return;
    const k = (e) => { if (e.key === 'Escape') close(); };
    addEventListener('keydown', k);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', k); document.body.style.overflow = prev; };
  }, [view]);
  useEffect(() => { back.current && back.current.focus(); }, [view]);

  if (!view) return null;
  const title = view === 'products' ? 'Solar Products' : view === 'projects' ? 'Solar Projects & Solutions' : 'Solar Energy';
  const quote = () => { close(); setTimeout(() => onQuote && onQuote(), 240); };
  return (
    <div className={'sc' + (shown ? ' on' : '')} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="scBox" role="dialog" aria-modal="true" aria-label={title}>
        <header className="scHead">
          {view !== 'choose' && <button type="button" ref={back} className="scBack" onClick={() => setView('choose')} aria-label="Back"><Ic n="arrow" size={18} style={{ transform: 'rotate(180deg)' }} /> Back</button>}
          <div><p className="scEye">SOLAR VERTICAL</p><h2>{title}</h2></div>
          <button type="button" className="scX" onClick={close} aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg></button>
        </header>
        <div className="scBody">
          {view === 'choose' && (
            <>
              <p className="scLead">What would you like to explore?</p>
              <div className="scPick">
                <button type="button" className="scOpt" onClick={() => setView('products')}>
                  <span className="scOi"><Ic n="tool" size={30} /></span><b>Products</b>
                  <small>{SOLAR_PRODUCTS.length} categories · {countItems(SOLAR_PRODUCTS)} products</small>
                  <span className="scGo">View products <Ic n="arrow" size={16} /></span>
                </button>
                <button type="button" className="scOpt" onClick={() => setView('projects')}>
                  <span className="scOi"><Ic n="sun" size={30} /></span><b>Projects</b>
                  <small>{countItems(SOLAR_PROJECTS)} project solutions offered</small>
                  <span className="scGo">View projects <Ic n="arrow" size={16} /></span>
                </button>
              </div>
              <button type="button" className="scFull" onClick={() => { close(); go('/services/solar'); }}>Open the full Solar page <Ic n="arrow" size={16} /></button>
            </>
          )}
          {view === 'products' && <SolarProductsList cta="Request a product quote" onCta={quote} />}
          {view === 'projects' && <SolarProjectsList cta="Discuss a solar project" onCta={quote} />}
        </div>
      </div>
    </div>
  );
}
