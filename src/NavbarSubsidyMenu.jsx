import React, { useState, useEffect, useRef } from 'react';
import { T } from './content/T.js';
import './NavbarSubsidyMenu.css';

const I = (d) => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
const ICONS = {
  solar: I(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  wind: I(<><circle cx="12" cy="10" r="1.6" /><path d="M12 8.4V2.5M10.6 10.8L5.5 13.7M13.4 10.8l5.1 2.9M12 11.6V22M9 22h6" /></>),
  biogas: I(<><path d="M5 20c0-8 5-14 15-15 0 9-5 15-13 15" /><path d="M5 20c2-5 5-8 9-10" /></>),
  water: I(<path d="M12 3s6 6.2 6 10.5a6 6 0 0 1-12 0C6 9.2 12 3 12 3z" />),
  agri: I(<><path d="M12 22V9" /><path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5zM12 10c0-3 2-5 5-5 0 3-2 5-5 5z" /><path d="M5 22h14" /></>),
};
const ITEMS = [
  { k: 'solar', icon: 'solar', label: T("nav.201", "Solar Subsidy") },
  { k: 'wind', icon: 'wind', label: T("nav.202", "Wind Subsidy") },
  { k: 'biogas', icon: 'biogas', label: T("nav.203", "Biogas Subsidy") },
  { k: 'water', icon: 'water', label: T("nav.204", "Water Treatment Subsidy") },
  { k: 'agri', icon: 'agri', label: T("nav.205", "Agriculture Subsidy") },
];

export default function SubsidyMenu({ active, label, onGo }) {
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  useEffect(() => {
    if (!open) return;
    const away = (e) => box.current && !box.current.contains(e.target) && setOpen(false);
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', away); document.addEventListener('touchstart', away); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('touchstart', away); document.removeEventListener('keydown', esc); };
  }, [open]);
  const pick = (p) => { setOpen(false); onGo(p); };
  return (
    <span className="sdWrap" ref={box}>
      <a href="/subsidy" className={(active ? 'on ' : '') + (open ? 'sdOpen' : '')} aria-haspopup="true" aria-expanded={open}
        onClick={(e) => { e.preventDefault(); setOpen(!open); }}>{label}<i className="sdCaret" aria-hidden="true" /></a>
      {open && (
        <div className="sdPanel" role="menu">
          <div className="sdHead">
            <span className="sdLeaf"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20c0-8 5-14 15-15 0 9-5 15-13 15" /><path d="M5 20c2-5 5-8 9-10" /></svg></span>
            <div><b>{T("nav.206", "Government Subsidies & Incentives")}</b><small>{T("nav.207", "Support for a cleaner, greener tomorrow")}</small></div>
          </div>
          <ul>
            {ITEMS.map((it) => (
              <li key={it.k}><a role="menuitem" href={'/subsidy?c=' + it.k} onClick={(e) => { e.preventDefault(); pick('/subsidy?c=' + it.k); }}>
                <span className="sdIc">{ICONS[it.icon]}</span><span className="sdTx">{it.label}</span><span className="sdAr" aria-hidden="true">›</span>
              </a></li>
            ))}
          </ul>
          <a className="sdAll" role="menuitem" href="/subsidy" onClick={(e) => { e.preventDefault(); pick('/subsidy'); }}>{T("nav.208", "View All Subsidies")} →</a>
        </div>
      )}
    </span>
  );
}
