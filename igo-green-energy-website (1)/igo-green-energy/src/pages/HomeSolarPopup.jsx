import React, { useEffect, useRef, useState } from 'react';
import { go } from './common.jsx';
import './homeSolarPopup.css';

/* Opened only from the Home page "Solar Energy" card: openHomeSolar() */
export const openHomeSolar = (svc = 'solar') => dispatchEvent(new CustomEvent('igo:homesolar', { detail: { svc } }));

const Sun = () => <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
const IconWind = () => <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="1.6" /><path d="M12 8.4V2M10.6 10.8 5 14M13.4 10.8 19 14M12 11.6V22M9 22h6" /></svg>;
const IconLeaf = () => <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>;
const IconDrop = () => <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /></svg>;
const SVC = { solar: ['Explore Solar Energy', Sun], wind: ['Explore Wind Energy', IconWind], biogas: ['Explore Biogas', IconLeaf], water: ['Explore Water Treatment', IconDrop] };
const Folder = () => <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
const Box = () => <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" /></svg>;
const Gear = () => <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M12 2.8l1.6 2.3 2.7-.7.9 2.7 2.7.9-.7 2.7 2.3 1.6-2.3 1.6.7 2.7-2.7.9-.9 2.7-2.7-.7L12 21.2l-1.6-2.3-2.7.7-.9-2.7-2.7-.9.7-2.7L2.5 12l2.3-1.6-.7-2.7 2.7-.9.9-2.7 2.7.7z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
const Arr = () => <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export default function HomeSolarPopup() {
  const [open, setOpen] = useState(false);
  const [svc, setSvc] = useState('solar');
  const first = useRef(null);
  useEffect(() => {
    const h = (e) => { const k = e && e.detail && e.detail.svc; setSvc(SVC[k] ? k : 'solar'); setOpen(true); };
    addEventListener('igo:homesolar', h);
    return () => removeEventListener('igo:homesolar', h);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', k);
    const b = document.body, pb = b.style.overflow; b.style.overflow = 'hidden';
    first.current && first.current.focus();
    return () => { removeEventListener('keydown', k); b.style.overflow = pb; };
  }, [open]);
  if (!open) return null;
  const [title, SvcIcon] = SVC[svc];
  const to = (p) => { setOpen(false); go(svc === 'solar' ? p : p + '?c=' + svc); window.scrollTo(0, 0); };
  return (
    <div className="hspOv" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="hspBox" role="dialog" aria-modal="true" aria-labelledby="hsp-t">
        <button type="button" className="hspX" aria-label="Close" onClick={() => setOpen(false)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg></button>
        <span className="hspRing"><SvcIcon /></span>
        <h2 id="hsp-t">{title}</h2>
        <div className="hspPick">
          <button type="button" ref={first} className="hspOpt" onClick={() => to('/projects')}>
            <span className="hspOi"><Folder /></span><b>Projects</b><span className="hspGo">View Projects <Arr /></span>
          </button>
          <button type="button" className="hspOpt" onClick={() => to('/products')}>
            <span className="hspOi"><Box /></span><b>Products</b><span className="hspGo">View Products <Arr /></span>
          </button>
          <button type="button" className="hspOpt" onClick={() => to('/services')}>
            <span className="hspOi"><Gear /></span><b>Services</b><span className="hspGo">View Services <Arr /></span>
          </button>
        </div>
      </div>
    </div>
  );
}
