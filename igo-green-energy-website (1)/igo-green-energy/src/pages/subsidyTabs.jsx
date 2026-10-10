import React from 'react';
import './subsidyTabs.css';

const D = {
  solar: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>,
  wind: <><circle cx="12" cy="10" r="1.6" /><path d="M12 8.4V2M10.6 10.8 5 14M13.4 10.8 19 14M12 11.6V22M9 22h6" /></>,
  biogas: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
  water: <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />,
};
const TABS = [['solar', 'Solar'], ['wind', 'Wind'], ['biogas', 'Biogas'], ['water', 'Water Treatment']];

export function SubsidyTabs({ active, onSelect }) {
  return (
    <div className="sbtBar">
      <div className="sbtTabs" role="tablist" aria-label="Subsidy categories">
        {TABS.map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={active === k} className={'sbtTab' + (active === k ? ' on' : '')} onClick={() => onSelect(k)}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{D[k]}</svg><span>{l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
