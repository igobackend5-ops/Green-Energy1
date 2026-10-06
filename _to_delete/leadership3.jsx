import React, { useEffect, useState } from 'react';
import { useReveal, Ic } from './common.jsx';
import { TIER_LABELS, LEADERS } from './leadershipData.js';
import './leadership.css';

/* All names, roles, descriptions, tiers and photos come from leadershipData.js,
   which was migrated verbatim from the igo-group-website repository (leadership.html).
   Photos live in /public/leadership (copied from the same repository). */
const STATS = [['26+', 'Brands'], ['18+', 'Divisions'], ['2000+', 'Team Strength'], ['28', 'States'], ['700+', 'Districts']];
const byTier = (t) => LEADERS.filter((l) => l.tier === t);
const splitTier = (s) => { const [a, ...b] = s.split(/\s+—\s+/); return [a, b.join(' — ')]; };
const bullet = (t) => { const i = t.indexOf(':'); return i > 0 && i < 40 ? [t.slice(0, i), t.slice(i + 1).trim()] : [null, t]; };

function Card({ p, size = 'md', i = 0, onOpen }) {
  return (
    <button type="button" className={'ldCard ld-' + size + ' rv'} style={{ '--d': (i % 6) * 60 + 'ms' }} onClick={() => onOpen(p)} aria-label={'View profile: ' + p.name}>
      <div className="ldPhoto"><img src={p.img} alt={p.fullName} loading="lazy" decoding="async" /></div>
      <div className="ldInfo"><h3>{p.name}</h3><p>{p.role}</p><span className="ldMore">View profile <Ic n="arrow" size={14} /></span></div>
    </button>
  );
}

function Modal({ p, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', k); const o = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', k); document.body.style.overflow = o; };
  }, [onClose]);
  return (
    <div className="ldModalBg" onClick={onClose} role="dialog" aria-modal="true" aria-label={p.fullName}>
      <div className="ldModal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="ldClose" onClick={onClose} aria-label="Close">×</button>
        <div className="ldModalTop">
          <img src={p.img} alt={p.fullName} />
          <div><p className="ldEye">{p.title}</p><h2>{p.fullName}</h2></div>
        </div>
        <p className="ldDesc">{p.desc}</p>
        <ul className="ldBul">{p.bullets.map((b) => { const [k, v] = bullet(b); return <li key={b}>{k && <b>{k}: </b>}{v}</li>; })}</ul>
      </div>
    </div>
  );
}

const Tier = ({ idx, children, cls = '' }) => {
  const [lab, sub] = splitTier(TIER_LABELS[idx - 1]);
  return (
    <section className={'ldTier ' + cls} aria-label={sub}>
      <div className="ldTierHead rv"><span className="ldNo">{lab.toUpperCase()}</span><h2>{sub}</h2></div>
      {children}
    </section>
  );
};

export function LeadershipPage() {
  const ref = useReveal();
  const [open, setOpen] = useState(null);
  const t4 = byTier(4), rows = [...new Set(t4.map((l) => l.row))];
  let n = 0;
  return (
    <div ref={ref} className="pg ldr">
      <header className="ldHero">
        <div className="ldWrap">
          <p className="ldEye rv">OUR LEADERSHIP</p>
          <h1 className="rv">The Minds Behind <em>IGO</em></h1>
          <p className="ldLead rv">Meet the leaders driving India's fastest-growing farming ecosystem — from executive vision to department excellence.</p>
        </div>
        <div className="ldWrap ldHeroImgWrap rv"><img className="ldHeroImg" src="/leadership/leadership-core-managers.webp" alt="IGO Group Leadership Team" decoding="async" /></div>
      </header>

      <div className="ldWrap ldChart">
        <div className="ldGroup rv"><span /><div><h2>IGO Group of Companies</h2><small>Hierarchy Chart</small></div><span /></div>

        <Tier idx={1} cls="ld1"><div className="ldRow">{byTier(1).map((p) => <Card key={p.name} p={p} size="xl" onOpen={setOpen} />)}</div></Tier>
        <Tier idx={2} cls="ld2"><div className="ldRow">{byTier(2).map((p) => <Card key={p.name} p={p} size="lg" onOpen={setOpen} />)}</div></Tier>
        <Tier idx={3} cls="ld3"><div className="ldGrid g3">{byTier(3).map((p, i) => <Card key={p.name} p={p} size="md" i={i} onOpen={setOpen} />)}</div></Tier>
        <Tier idx={4} cls="ld4">
          <div className="ldDept">{rows.map((r) => (
            <div className="ldGrid g4" key={r}>{t4.filter((l) => l.row === r).map((p) => <Card key={p.name} p={p} size="sm" i={n++} onOpen={setOpen} />)}</div>
          ))}</div>
        </Tier>
        <Tier idx={5} cls="ld5"><div className="ldGrid g4">{byTier(5).map((p, i) => <Card key={p.name} p={p} size="sm" i={i} onOpen={setOpen} />)}</div></Tier>
      </div>

      <section className="ldStats">
        <div className="ldWrap">
          <ul className="ldStatRow">{STATS.map(([v, l]) => <li key={l} className="rv"><b>{v}</b><span>{l}</span></li>)}</ul>
          <p className="ldStatTxt rv">A diversified farming-tech conglomerate connecting farms, food, fintech and technology across India.</p>
          <address className="ldAddr rv"><Ic n="pin" size={20} /><span><strong>Head Office</strong>No. 17, Kovalan Street,<br />2nd Main Road, Uthandi Kanathur,<br />Chennai – 600119, India</span></address>
        </div>
      </section>
      {open && <Modal p={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
