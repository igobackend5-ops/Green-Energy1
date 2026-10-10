import React from 'react';
import { Head } from './common.jsx';
import { T } from '../content/T.js';
import './solarCustomers.css';

const sv = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Sun = () => <g {...sv} strokeWidth="1.5"><circle cx="19" cy="6" r="2" /><path d="M19 1.6v1M19 9.4v1M14.6 6h1M22.4 6h1M15.9 2.9l.7.7M21.4 8.4l.7.7M22.1 2.9l-.7.7M16.6 8.4l-.7.7" /></g>;
const ICONS = {
  home: <><path d="M3 15 12 7l9 8M6 13v8h12v-8" {...sv} /><path d="M10 21v-5h4v5" {...sv} /><Sun /></>,
  build: <><path d="M5 21V8h9v13M3 21h18M8 11h3M8 14h3M8 17h3M14 12h5v9" {...sv} /><Sun /></>,
  factory: <><path d="M3 21V11l6 3v-3l6 3V6h4v15zM3 21h18M7 17h2M12 17h2M17 17h1" {...sv} /><Sun /></>
};
const META = [
  { k: 'res', ic: 'home', img: '/solutions/ind-residential.jpg', alt: 'Modern home with rooftop solar panels' },
  { k: 'com', ic: 'build', img: '/solutions/ind-commercial.jpg', alt: 'Commercial building with rooftop solar panels' },
  { k: 'ind', ic: 'factory', img: '/solutions/ind-industrial.jpg', alt: 'Industrial facility with solar panels' }
];
const Leaf = () => <svg className="scLeaf" viewBox="0 0 48 64" aria-hidden="true"><path d="M24 62V26M24 40c-8 0-13-5-13-14 8 0 13 5 13 14zM24 32c0-8 5-13 13-13 0 8-5 13-13 13zM24 50c-7 0-11-4-11-11M24 46c0-6 4-10 11-10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function SolarCustomers({ items, onQuote }) {
  return (
    <section className="scSec">
      <span className="scGlow" aria-hidden="true" />
      <svg className="scBgLeaf scBgL1" viewBox="0 0 120 160" aria-hidden="true"><path d="M10 150C5 90 40 30 110 10c4 70-30 130-100 140z" fill="currentColor" /></svg>
      <svg className="scBgLeaf scBgL2" viewBox="0 0 120 160" aria-hidden="true"><path d="M10 150C5 90 40 30 110 10c4 70-30 130-100 140z" fill="currentColor" /></svg>
      <div className="scW">
        <div className="scHdr">
          <Head eyebrow={T("services.092", "BY CUSTOMER TYPE")} title={T("services.093", "Solar for")} em={T("services.094", "every kind of customer")} text={T("services.901", "Clean energy solutions designed for homes, businesses and industries — because a sustainable future benefits everyone.")} />
        </div>
        <div className="scGrid">
          {items.map(([t, , d], i) => {
            const m = META[i % 3];
            return (
              <article className={'scCard rv sc-' + m.k} style={{ '--d': i * 90 + 'ms' }} key={t}>
                <div className="scImg"><img src={m.img} alt={m.alt} loading="lazy" /></div>
                <span className="scIcon"><svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">{ICONS[m.ic]}</svg></span>
                <div className="scTxt">
                  <h3>{t}</h3>
                  <p>{d}</p>
                  <button type="button" className="scBtn" onClick={onQuote}>{T("services.902", "Learn More")} <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                </div>
                <Leaf />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
