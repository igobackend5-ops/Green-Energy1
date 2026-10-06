import React, { useEffect, useRef, useState } from 'react';
import { LEADERS } from './leadershipData.js';
import { LEAD_HTML, LEAD_SPRITE } from './leadershipMarkup.js';
import './leadership.css';

/* Faithful port of https://igogroups.in/leadership. The markup (leadershipMarkup.js) and styles (leadership.css)
   come from that page; names/roles/photos come from the igo-group-website repository. Profile pop-up text
   (leadershipData.js) is the same text the original page passes to its openModal(). */
const feat = (t) => { const i = t.indexOf(':'); return i > -1 ? [t.slice(0, i).trim(), t.slice(i + 1).trim()] : [null, t]; };

export function LeadershipPage() {
  const root = useRef(null);
  const [open, setOpen] = useState(null);
  const [shown, setShown] = useState(false);
  const close = () => { setShown(false); setZoom(null); setTimeout(() => setOpen(null), 260); };
  const [zoom, setZoom] = useState(null);
  const zoomRef = useRef(null); zoomRef.current = zoom;

  useEffect(() => {
    const el = root.current; if (!el) return;
    const items = [...el.querySelectorAll('[data-reveal]')];
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    items.forEach((n) => n.classList.add('reveal-pending'));
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.remove('reveal-pending'); io.unobserve(e.target); } }), { threshold: 0.08 });
    items.forEach((n) => io.observe(n));
    return () => { io.disconnect(); items.forEach((n) => n.classList.remove('reveal-pending')); };
  }, []);

  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') { if (zoomRef.current) setZoom(null); else if (open) close(); } };
    addEventListener('keydown', k);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [open, zoom]);

  const pick = (e) => {
    const n = e.target.closest('.org-node'); if (!n || !root.current.contains(n)) return;
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault(); setOpen(LEADERS[+n.dataset.i]); requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  };

  return (
    <div ref={root} className="igoLead" onClick={pick} onKeyDown={pick}>
      <span dangerouslySetInnerHTML={{ __html: LEAD_SPRITE }} />
      <div dangerouslySetInnerHTML={{ __html: LEAD_HTML }} />
      <section className="content-section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ maxWidth: 640, margin: '0 auto 1.1rem', color: 'var(--muted)' }}>A diversified farming-tech conglomerate connecting farms, food, fintech and technology across India.</p>
          <p style={{ color: 'var(--muted)', fontSize: '.95rem' }}><strong style={{ color: 'var(--forest)', letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '.8rem' }}>Head Office</strong><br />No. 17, Kovalan Street,<br />2nd Main Road, Uthandi Kanathur,<br />Chennai – 600119, India</p>
        </div>
      </section>

      {open && (
        <div className={'pf' + (shown ? ' pf-in' : '')} role="dialog" aria-modal="true" aria-label={open.fullName}>
          <header className="pf-head">
            <div className="pf-head-in">
              <img className="pf-avatar" src={open.img} alt={open.fullName} onClick={() => setZoom(open)} />
              <div className="pf-id">
                <h2 className="pf-name">{open.fullName}</h2>
                <div className="pf-title"><span>{open.title}</span></div>
              </div>
              <button type="button" className="pf-close" onClick={close} aria-label="Close profile"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>
            </div>
          </header>
          <div className="pf-scroll">
            <div className="pf-body">
              <section className="pf-about"><p>{open.desc}</p></section>
              {open.bullets.length > 0 && (
                <section className="pf-hl"><h3>Highlights</h3>
                  <div className="pf-grid">{open.bullets.map((b) => { const [t, d] = feat(b); return <div className="pf-item" key={b}>{t ? <><div className="pf-item-t">{t}</div><div className="pf-item-d">{d}</div></> : b}</div>; })}</div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
      <div className={'img-lightbox-overlay' + (zoom ? ' active' : '')} onClick={() => setZoom(null)}>
        {zoom && <><button type="button" className="img-lightbox-close" onClick={() => setZoom(null)} aria-label="Close">×</button><img className="img-lightbox-img" src={zoom.img} alt={zoom.fullName} /></>}
      </div>
    </div>
  );
}
