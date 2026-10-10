import React, { useEffect, useRef, useState } from 'react';
import { go } from './common.jsx';
import './homeSolarPopup.css';

/* Opened only from the Home page "Solar Energy" card: openHomeSolar() */
export const openHomeSolar = () => dispatchEvent(new CustomEvent('igo:homesolar'));

const Sun = () => <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
const Folder = () => <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
const Box = () => <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" /></svg>;
const Gear = () => <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M12 2.8l1.6 2.3 2.7-.7.9 2.7 2.7.9-.7 2.7 2.3 1.6-2.3 1.6.7 2.7-2.7.9-.9 2.7-2.7-.7L12 21.2l-1.6-2.3-2.7.7-.9-2.7-2.7-.9.7-2.7L2.5 12l2.3-1.6-.7-2.7 2.7-.9.9-2.7 2.7.7z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
const Arr = () => <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export default function HomeSolarPopup() {
  const [open, setOpen] = useState(false);
  const first = useRef(null);
  useEffect(() => {
    const h = () => setOpen(true);
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
  const to = (p) => { setOpen(false); go(p); window.scrollTo(0, 0); };
  return (
    <div className="hspOv" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="hspBox" role="dialog" aria-modal="true" aria-labelledby="hsp-t">
        <button type="button" className="hspX" aria-label="Close" onClick={() => setOpen(false)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg></button>
        <span className="hspRing"><Sun /></span>
        <h2 id="hsp-t">Explore Solar Energy</h2>
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
