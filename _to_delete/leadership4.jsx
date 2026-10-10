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
  const [zoom, setZoom] = useState(null);

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
    const k = (e) => { if (e.key === 'Escape') { setZoom(null); setOpen(null); } };
    addEventListener('keydown', k);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [open]);

  const pick = (e) => {
    const n = e.target.closest('.org-node'); if (!n || !root.current.contains(n)) return;
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault(); setOpen(LEADERS[+n.dataset.i]);
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

      <div className={'modal-overlay' + (open ? ' active' : '')} onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
        {open && (
          <div className="modal-content" role="dialog" aria-modal="true" aria-label={open.fullName}>
            <div className="modal-header">
              <img className="modal-avatar" src={open.img} alt={open.fullName} style={{ display: 'block' }} onClick={() => setZoom(open)} />
              <div><h2 className="modal-title">{open.fullName}</h2><div className="modal-subtitle">{open.title}</div></div>
              <button type="button" className="modal-close" onClick={() => setOpen(null)} aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>
            </div>
            <div className="modal-body">
              <p>{open.desc}</p>
              <h3>Highlights</h3>
              <div className="modal-features">{open.bullets.map((b) => { const [t, d] = feat(b); return <div className="modal-feature-item" key={b}>{t ? <><div className="modal-feature-title">{t}</div><div className="modal-feature-desc">{d}</div></> : b}</div>; })}</div>
            </div>
            <div className="modal-actions"><button type="button" className="btn btn-outline" onClick={() => setOpen(null)}>Close</button></div>
          </div>
        )}
      </div>
      <div className={'img-lightbox-overlay' + (zoom ? ' active' : '')} onClick={() => setZoom(null)}>
        {zoom && <><button type="button" className="img-lightbox-close" onClick={() => setZoom(null)} aria-label="Close">×</button><img className="img-lightbox-img" src={zoom.img} alt={zoom.fullName} /></>}
      </div>
    </div>
  );
}
