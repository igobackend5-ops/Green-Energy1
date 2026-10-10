import React, { useState } from 'react';
import './serviceTabs.css';

const ICONS = {
  solar: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>,
  wind: <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /></>,
  biogas: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
  water: <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />,
};
const LABEL = { solar: 'Solar', wind: 'Wind', biogas: 'Biogas', water: 'Water Treatment' };
const ORDER = ['solar', 'wind', 'biogas', 'water'];

const qcat = () => { const c = new URLSearchParams(window.location.search).get('c'); return ['solar', 'wind', 'biogas', 'water'].includes(c) ? c : null; };
export function ServiceTabs({ cards, children }) {
  const [sel, setSel] = useState(qcat() || 'solar'); // only the selected service is shown
  const active = sel || 'solar';
  const byKey = Object.fromEntries(cards.map((c) => [c.k, c]));
  return (
    <>
      <div id="overview" className="stabsWrap">
        <div className="stabs" role="tablist" aria-label="Services">
          {ORDER.map((k) => (
            <button key={k} type="button" role="tab" aria-selected={active === k} className={'stab' + (active === k ? ' on' : '')} onClick={() => setSel(k)}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[k]}</svg>
              <span>{LABEL[k]}</span>
            </button>
          ))}
        </div>
      </div>
      {ORDER.filter((k) => !sel || sel === k).map((k) => (
        <div key={k} className="stabSec" id={'svc-' + k}>
          {k !== 'solar' && (
            <div className="stabIntro">
              <h2>{byKey[k]?.t}</h2>
              <p>{byKey[k]?.d}</p>
            </div>
          )}
          {children[k]}
        </div>
      ))}
    </>
  );
}
