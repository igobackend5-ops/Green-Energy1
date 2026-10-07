import React, { useEffect, useMemo, useRef, useState } from 'react';
import { T } from '../content/T.js';
import { useCms } from '../admin/store.js';
import { LEADERS } from './leadershipData.js';
import { LEAD_HTML, LEAD_SPRITE } from './leadershipMarkup.js';
import './leadership.css';

/* Faithful port of https://igogroups.in/leadership. The markup (leadershipMarkup.js) and styles (leadership.css)
   come from that page; names/roles/photos come from the igo-group-website repository. Profile pop-up text
   (leadershipData.js) is the same text the original page passes to its openModal(). */
const esc = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function patchHtml(html, leaders) {
  let h = html;
  const rep = (a, b) => { if (a !== b) h = h.split(a).join(b); };
  rep('src="/leadership/leadership-core-managers.webp"', 'src="' + esc(T('leadership.001', '/leadership/leadership-core-managers.webp')) + '"');
  rep('>OUR LEADERSHIP<', '>' + esc(T('leadership.002', 'OUR LEADERSHIP')) + '<');
  rep('<h1>The Minds Behind IGO</h1>', '<h1>' + esc(T('leadership.003', 'The Minds Behind IGO')) + '</h1>');
  rep("<p>Meet the leaders driving India's fastest-growing farming ecosystem — from executive vision to department excellence.</p>", '<p>' + esc(T('leadership.004', "Meet the leaders driving India's fastest-growing farming ecosystem — from executive vision to department excellence.")) + '</p>');
  rep('<h2>IGO Group of Companies</h2>', '<h2>' + esc(T('leadership.005', 'IGO Group of Companies')) + '</h2>');
  rep('>Hierarchy Chart<', '>' + esc(T('leadership.006', 'Hierarchy Chart')) + '<');
  (leaders || []).forEach((l, i) => {
    const d = LEADERS[i]; if (!d || JSON.stringify([l.img, l.name, l.role]) === JSON.stringify([d.img, d.name, d.role])) return;
    h = h.replace(new RegExp('(<div class="org-node" data-i="' + i + '"[^>]*>\\s*<img class="org-avatar" src=")[^"]*(" alt=")[^"]*(")([^>]*>\\s*<p class="org-name">)[^<]*(</p>\\s*<p class="org-role">)[^<]*(</p>)'),
      (_m, a, b, c, d2, e, f) => a + esc(l.img) + b + esc(l.name) + c + d2 + esc(l.name) + e + esc(l.role) + f);
  });
  return h;
}
const feat = (t) => { const i = t.indexOf(':'); return i > -1 ? [t.slice(0, i).trim(), t.slice(i + 1).trim()] : [null, t]; };

export function LeadershipPage() {
  const root = useRef(null);
  const leaders = useCms('leadership') || LEADERS;
  const html = useMemo(() => patchHtml(LEAD_HTML, leaders), [leaders]);
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
    e.preventDefault(); setOpen(leaders[+n.dataset.i] || LEADERS[+n.dataset.i]); requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  };

  return (
    <div ref={root} className="igoLead" onClick={pick} onKeyDown={pick}>
      <span dangerouslySetInnerHTML={{ __html: LEAD_SPRITE }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <section className="content-section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ maxWidth: 640, margin: '0 auto 1.1rem', color: 'var(--muted)' }}>{T('leadership.007', 'A diversified farming-tech conglomerate connecting farms, food, fintech and technology across India.')}</p>
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
