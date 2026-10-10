import React, { useState, useMemo, useEffect } from 'react';
import { useCms } from '../admin/store.js';
import { Link, go, useReveal, Ic, Head, Sec, Cta } from './common.jsx';

import './blogsTopics.css';
import { T } from '../content/T.js';
import { useEnquiry, HONEY } from '../useEnquiry.js';
const SV = { solar: 'Solar', wind: 'Wind', biogas: 'Biogas', water: 'Water Treatment' };
const IMG = { solar: '/solutions/solar.jpg', wind: '/solutions/wind.jpg', biogas: '/solutions/biogas.jpg', water: '/solutions/water.jpg' };

/* ============================== PROJECTS ============================== */
/* No verified project data exists yet. Each entry is a clearly-labelled placeholder. */
const PROJECTS = [
  { k: 'solar', s: 'Project details coming soon', n: 'Solar project details will be added as projects are delivered.' },
  { k: 'solar', s: 'Project details coming soon', n: 'Solar project details will be added as projects are delivered.' },
  { k: 'wind', s: 'Project details coming soon', n: 'Wind project details will be added as projects are delivered.' },
  { k: 'wind', s: 'Project details coming soon', n: 'Wind project details will be added as projects are delivered.' },
  { k: 'biogas', s: 'Confidential', n: 'Details of completed biogas projects are confidential and cannot be shared.' },
  { k: 'water', s: 'Confidential', n: 'Details of completed water treatment projects are confidential and cannot be shared.' },
];
export function ProjectsPage({ onQuote }) {
  const ref = useReveal();
  const [f, setF] = useState('all');
  const cp = useCms('projects');
  const PR = (Array.isArray(cp) ? cp : []).filter((x) => x.status === 'published').map((x) => ({ k: IMG[x.category] ? x.category : 'solar', s: x.title, n: x.description, loc: x.location, cap: x.capacity, img: x.image }));
  const list = PR.filter((p) => f === 'all' || p.k === f);
  return (
    <div ref={ref} className="pg pgProjects">
      <div className="prjHero">
        <h1 className="sr">{T("site.001", "Powering a Sustainable Tomorrow")}</h1>
        <img src={T("site.002", "/projects-hero.png")} width="2048" height="768" alt={T("site.003", "Powering a Sustainable Tomorrow. Clean energy, cleaner tomorrow: wind turbines over green hills and a river at sunrise.")} fetchpriority="high" />
      </div>
      <Sec>
        <div className="filters" role="tablist" aria-label="Filter projects by service">
          {[['all', 'All'], ['solar', 'Solar'], ['wind', 'Wind'], ['biogas', 'Biogas'], ['water', 'Water Treatment']].map(([k, l]) => (
            <button key={k} role="tab" aria-selected={f === k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{l}</button>
          ))}
        </div>
        <div className="projGrid" key={f}>
          {list.map((p, i) => (
            <article className="projCard" key={p.k + i} style={{ '--d': i * 70 + 'ms' }}>
              <div className="projImg"><img src={p.img || IMG[p.k]} alt="" loading="lazy" /><span className="projTag">{SV[p.k]}</span><span className="projStock">{T("site.004", "Illustrative visual")}</span></div>
              <div className="projBody">
                <h3>{p.s}</h3><p>{p.n}</p>
                <dl>{['Project Type', 'Service', 'Location', 'Capacity', 'Scope of Work'].map((l) => <div key={l}><dt>{l}</dt><dd>{l === 'Service' ? SV[p.k] : l === 'Location' && p.loc ? p.loc : l === 'Capacity' && p.cap ? p.cap : 'Coming soon'}</dd></div>)}</dl>
              </div>
            </article>
          ))}
        </div>
      </Sec>
      <Sec cls="alt"><Cta eyebrow={T("site.005", "PROJECT INQUIRY")} title={T("site.006", "Discuss your")} em={T("site.007", "project")} text={T("site.008", "Tell us what you're planning, and our team will respond.")} label={T("site.009", "Discuss Your Project")} to="/contact" /></Sec>
      <Sec><Cta eyebrow={T("site.010", "SITE SURVEY")} title={T("site.011", "Start with a")} em={T("site.012", "Smart Quote")} label={T("site.013", "Request a Site Survey")} onClick={onQuote} tone="dark" /></Sec>
    </div>
  );
}

/* ============================== TESTIMONIALS ============================== */
export function TestimonialsPage({ onQuote }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg pgTesti">
      <div className="prjHero tstHero">
        <h1 className="sr">{T("site.014", "Trusted by customers who go green")}</h1>
        <img src={T("site.015", "/testimonials-hero.png")} width="2048" height="682" alt={T("site.016", "Testimonials and clients: trusted by customers who go green. Solar panels, wind turbines and a water-treatment plant at sunset.")} fetchpriority="high" />
      </div>
      <Sec><Head eyebrow={T("site.017", "TRUSTED BY")} title={T("site.018", "Our")} em={T("site.019", "Clients")} center />
        <div className="logoWall rv">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="logoSlot"><Ic n="build" size={22} /><span>{T("site.020", "Client logo")}</span></div>)}</div>
        <p className="emptyNote">{T("site.021", "Our client logos will appear here.")}</p></Sec>
      <Sec cls="alt"><Head eyebrow={T("site.022", "CLIENT STORIES")} title={T("site.023", "In their")} em={T("site.024", "own words")} center />
        <div className="carousel rv"><div className="emptyState"><span className="bigQuote sm" aria-hidden="true">“</span><h3>{T("site.025", "Client stories coming soon")}</h3><p>{T("site.026", "We're gathering feedback from our first customers. Their stories will be shared here.")}</p></div></div></Sec>
    </div>
  );
}

/* ============================== BLOGS ============================== */
const CATS = ['Solar', 'Wind', 'Biogas', 'Water Treatment', 'Sustainability', 'Energy Efficiency'];
const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
const TOPICS = [
  { k: 'featured', t: 'Featured Articles', i: <><path d="M5 4h11v16H7a2 2 0 0 1-2-2zM16 8h3v10a2 2 0 0 1-2 2" {...P} /><path d="M8 8h5M8 12h5M8 16h3" {...P} /></> },
  { k: 'latest', t: 'Latest Articles', i: <><path d="M6 3h9l4 4v14H6z" {...P} /><path d="M9 11h7M9 15h7M9 7h3" {...P} /></> },
  { k: 'cats', t: 'Green Energy Categories & Trends', i: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" {...P} /></> },
  { k: 'insights', t: 'IGO Insights', i: <><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" {...P} /></> },
  { k: 'stories', t: 'Client Stories & Case Studies', i: <><circle cx="12" cy="7" r="3" {...P} /><circle cx="5" cy="10" r="2" {...P} /><circle cx="19" cy="10" r="2" {...P} /><path d="M6.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5M1.5 18c0-2 1.5-3.5 3.5-3.5M22.5 18c0-2-1.5-3.5-3.5-3.5" {...P} /></> },
];
export function BlogsPage() {
  const ref = useReveal();
  const [cat, setCat] = useState('All'), [q, setQ] = useState(''), [mail, setMail] = useState(''), [done, setDone] = useState(false);
  const [newsSt, sendNews] = useEnquiry();
  const cb = useCms('blogs'), today = new Date().toISOString().slice(0, 10);
  const ARTICLES = (Array.isArray(cb) ? cb : []).filter((x) => x.status === 'published' || (x.status === 'scheduled' && x.publishDate && x.publishDate <= today)).map((x) => ({ cat: x.category, img: x.image, date: x.publishDate || today, title: x.title, desc: x.shortDesc, to: x.link || '/blogs', feat: x.featured === 'Yes', sec: x.section }));
  const fmtDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const sorted = [...ARTICLES].sort((x, y) => String(y.date).localeCompare(String(x.date)));
  const feat = sorted.some((a) => a.feat) ? sorted.filter((a) => a.feat) : sorted.slice(0, 3);
  const insights = sorted.filter((a) => a.sec === 'IGO Insights');
  const stories = sorted.filter((a) => a.sec === 'Client Stories & Case Studies');
  const [topic, setTopic] = useState('all');
  const pick = (k) => { setTopic(k); setTimeout(() => document.querySelector('.blgTopics')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30); };
  const ALL = [
    { k: 'featured', t: 'Featured Articles', list: feat, more: sorted.length > feat.length },
    { k: 'latest', t: 'Latest Articles', list: sorted, more: true },
    { k: 'cats', t: 'Green Energy Categories & Trends', list: sorted, more: true },
    { k: 'insights', t: 'IGO Insights', list: insights, more: insights.length > 0 },
    { k: 'stories', t: 'Client Stories & Case Studies', list: stories, more: stories.length > 0 },
  ];
  const sections = topic === 'all' ? ALL : ALL.filter((x) => x.k === topic).map((x) => (x.k === 'featured' ? { ...x, list: feat } : x));
  const card = (list) => (
    <div className="blgGrid">
      {list.map((a, i) => (
        <article className="blgCard" key={a.title + i}>
          <div className="blgImg"><img src={a.img} alt="" loading="lazy" /><span className="blgTag">{a.cat}</span></div>
          <div className="blgBody">
            <time dateTime={a.date}>{fmtDate(a.date)}</time>
            <h3>{a.title}</h3>
            <p>{a.desc}</p>
            <Link to={a.to} className="blgMore">{T("site.034", "Read More")} <Ic n="arrow" size={17} /></Link>
          </div>
        </article>
      ))}
    </div>
  );
  return (
    <div ref={ref} className="pg pgBlogs">
      <div className="prjHero blgHero">
        <h1 className="sr">{T("site.027", "Ideas for a greener tomorrow")}</h1>
        <img src={T("site.028", "/blogs-hero.png")} width="2048" height="768" alt={T("site.029", "Blogs and news: ideas for a greener tomorrow. Wind turbines, solar panels and a water-treatment plant over a lake at sunrise, with books on clean energy.")} fetchpriority="high" />
      </div>
      <Sec cls="blgTop">
        <div className="blgTopics" role="tablist" aria-label="Blog topics">
          {TOPICS.map((t) => (
            <button key={t.k} type="button" role="tab" aria-selected={topic === t.k} className={'blgTopic' + (topic === t.k ? ' on' : '')} onClick={() => pick(t.k)}>
              <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">{t.i}</svg><span>{t.t}</span>
            </button>
          ))}
        </div>
        {topic !== 'all' && <div className="blgBar"><h2>{TOPICS.find((t) => t.k === topic).t}</h2><button type="button" className="blgAll" onClick={() => pick('all')}>View All Articles <Ic n="arrow" size={16} /></button></div>}
        {sections.map((sec) => (
          <section className="blgSec" key={sec.k}>
            {topic === 'all' && <div className="blgBar"><h2>{sec.t}</h2>{sec.k !== 'latest' && sec.more && <button type="button" className="blgAll sm" onClick={() => pick(sec.k)}>View All <Ic n="arrow" size={14} /></button>}{sec.k === 'latest' && <button type="button" className="blgAll sm" onClick={() => pick('latest')}>View All <Ic n="arrow" size={14} /></button>}</div>}
            {sec.k === 'cats' ? (
              sec.list.length ? CATS.filter((c) => sec.list.some((a) => a.cat === c)).map((c) => (
                <div key={c} className="blgGroup"><h3 className="blgGH">{c}</h3>{card(sec.list.filter((a) => a.cat === c))}</div>
              )) : <p className="emptyNote">No articles in this topic yet. New articles will be published here.</p>
            ) : sec.list.length ? card(sec.list) : <p className="emptyNote">No articles in this topic yet. New articles will be published here.</p>}
          </section>
        ))}
      </Sec>
      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow={T("site.036", "RESOURCES")} title={T("site.037", "Downloads —")} em={T("site.038", "Brochures & Catalogues")} text={T("site.039", "Our brochures and catalogues will be available to download here.")} /><span className="pill"><Ic n="doc" size={16} />{T("site.040", "Coming soon")}</span></div>
        <form className="news rv" onSubmit={async (e) => { e.preventDefault(); if (mail && (await sendNews({ type: 'newsletter', email: mail, message: 'Blog page newsletter sign-up', website: e.currentTarget.website.value }))) setDone(true); }}>
          <h3>{T("site.041", "Get updates")}</h3><p>{T("site.042", "Be the first to hear when new articles are published.")}</p>
          {done ? <p className="ok"><Ic n="check" size={18} /> {T("site.043", "Thanks, you're on the list.")}</p> : <>{newsSt.err && <small className="formErr">{newsSt.err}</small>}<input {...HONEY} /><input type="email" required value={mail} onChange={(e) => setMail(e.target.value)} placeholder={T("site.044", "Your email address")} aria-label="Email address" /><button className="pgBtn">{T("site.045", "Subscribe")} <Ic n="arrow" size={18} /></button></>}
        </form>
      </div></Sec>
    </div>
  );
}

/* ============================== CONTACT ============================== */
export function ContactPage() {
  const ref = useReveal();
  const [svc, setSvc] = useState('');
  const [st, send] = useEnquiry();
  const sent = st.ok;
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    send({ type: 'contact', name: f.get('name'), company: f.get('company'), email: f.get('email'), phone: f.get('phone'), subject: f.get('service'), message: f.get('message'), website: f.get('website'), extra: { 'Service': f.get('service'), 'Project type': f.get('ptype'), 'Location': f.get('location') } });
  };
  return (
    <div ref={ref} className="pg pgContact">
      <div className="prjHero cntHero">
        <h1 className="sr">{T("site.046", "Let's build a cleaner tomorrow")}</h1>
        <img src={T("site.047", "/contact-hero.png")} width="2048" height="768" alt={T("site.048", "Contact us: let's build a cleaner tomorrow. A modern terrace workspace with a laptop and notebook overlooking a lake and green hills at sunset.")} fetchpriority="high" />
      </div>
      <Sec><div className="contactGrid">
        <aside className="cInfo rv">
          <h3>{T("site.049", "Contact information")}</h3><p>{T("site.050", "Our contact details will be published here shortly. In the meantime, send us your requirement using the form.")}</p>
          <h4>{T("site.051", "Choose a service")}</h4>
          <div className="svcPick">{Object.entries(SV).map(([k, l]) => <button type="button" key={k} className={svc === l ? 'on' : ''} onClick={() => setSvc(svc === l ? '' : l)}>{l}</button>)}</div>
          <button type="button" className="chatCard" onClick={() => dispatchEvent(new Event('igo-chat'))}><Ic n="msg" size={26} /><span><b>{T("site.052", "Chat with us")}</b><small>{T("site.053", "AI assistant · WhatsApp connection")}</small></span><Ic n="arrow" size={18} /></button>
        </aside>
        <form className="cForm rv" onSubmit={submit}>
          <p className="pgEye">{T("site.054", "SMART QUOTE / SITE SURVEY")}</p><h2>{T("site.055", "Tell us about your project")}</h2>
          {sent ? <div className="ok big"><Ic n="check" size={26} /><div><b>{T("site.056", "Thank you.")}</b><p>{T("site.057", "Thank you for your enquiry. Our team will get back to you.")}</p></div></div> : <>
            <div className="fGrid">
              <label>{T("site.058", "Name")}<input required name="name" autoComplete="name" /></label>
              <label>{T("site.059", "Company")}<input name="company" autoComplete="organization" /></label>
              <label>{T("site.060", "Email")}<input required type="email" name="email" autoComplete="email" /></label>
              <label>{T("site.061", "Phone")}<input type="tel" name="phone" autoComplete="tel" /></label>
              <label>{T("site.062", "Service Interested In")}<select name="service" value={svc} onChange={(e) => setSvc(e.target.value)} required><option value="">{T("site.063", "Select a service")}</option>{Object.values(SV).map((l) => <option key={l}>{l}</option>)}</select></label>
              <label>{T("site.064", "Project Type")}<select name="ptype" defaultValue=""><option value="">{T("site.065", "Select type")}</option>{['Residential', 'Commercial', 'Industrial', 'Agriculture and Dairy', 'Government and Institutions'].map((l) => <option key={l}>{l}</option>)}</select></label>
              <label className="full">{T("site.066", "Location")}<input name="location" /></label>
              <label className="full">{T("site.067", "Requirement / Message")}<textarea name="message" rows="4" /></label>
            </div>
            {st.err && <p className="formErr" role="alert">{st.err}</p>}
            <input {...HONEY} />
            <button className="pgBtn" disabled={st.busy}>{st.busy ? 'Sending…' : T("site.068", "Request a Consultation")} <Ic n="arrow" size={18} /></button></>}
        </form>
      </div></Sec>
    </div>
  );
}

/* ============================== FAQ ============================== */
export function FaqPage({ onQuote }) {
  const ref = useReveal();
  const cf = useCms('faq');
  const FAQ = useMemo(() => { const o = {}; (Array.isArray(cf) ? cf : []).filter((x) => x.status === 'published').forEach((x) => { const c = x.category || 'General'; (o[c] = o[c] || []).push([x.question, x.answer]); }); return o; }, [cf]);
  const [cat0, setCat] = useState('General'), [q, setQ] = useState(''), [open, setOpen] = useState(null);
  const cat = FAQ[cat0] ? cat0 : Object.keys(FAQ)[0];
  const rows = useMemo(() => { const t = q.trim().toLowerCase(); if (t) return Object.entries(FAQ).flatMap(([c, l]) => l.filter(([a, b]) => (a + b).toLowerCase().includes(t)).map((x) => [c, ...x])); return (FAQ[cat] || []).map((x) => [cat, ...x]); }, [cat, q, FAQ]);
  return (
    <div ref={ref} className="pg pgFaq">
      <div className="prjHero faqHero">
        <h1 className="sr">{T("site.069", "Frequently Asked Questions")}</h1>
        <img src={T("site.070", "/faq-hero.png")} width="2048" height="768" alt={T("site.071", "Frequently asked questions. Wooden blocks with question marks on a terrace overlooking a lake and green hills at sunset.")} fetchpriority="high" />
      </div>
      <Sec>
        <div className="faqSearch"><label className="search c"><Ic n="search" size={18} /><input value={q} onChange={(e) => { setQ(e.target.value); setOpen(null); }} placeholder={T("site.072", "Search questions")} aria-label="Search questions" /></label></div>
        {!q && <div className="catRow ctr">{Object.keys(FAQ).map((c) => <button key={c} className={cat === c ? 'on' : ''} onClick={() => { setCat(c); setOpen(null); }}>{c}</button>)}</div>}
        <div className="acc">
          {rows.length === 0 && <p className="emptyNote">{T("site.073", "No questions match your search.")}</p>}
          {rows.map(([c, a, b], i) => { const id = c + i; const on = open === id; return (
            <div className={'accItem' + (on ? ' on' : '')} key={id}>
              <button aria-expanded={on} onClick={() => setOpen(on ? null : id)}><span>{q && <small>{c}</small>}{a}</span><Ic n="plus" size={20} /></button>
              <div className="accBody"><div><p>{b}</p></div></div>
            </div>); })}
        </div>
      </Sec>
      <Sec cls="alt"><Cta eyebrow={T("site.074", "STILL HAVE QUESTIONS?")} title={T("site.075", "Talk to")} em={T("site.076", "our team")} label={T("site.077", "Contact Us")} to="/contact" /></Sec>
    </div>
  );
}

/* ============================== GLOBAL CHAT / WHATSAPP ============================== */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const ct = useCms('contact') || {};
  const wa = String(ct.whatsapp || '').replace(/[^0-9]/g, '');
  const [st, send] = useEnquiry();
  const [cb, setCb] = useState({ name: '', phone: '' });
  useEffect(() => { const f = () => setOpen(true); addEventListener('igo-chat', f); return () => removeEventListener('igo-chat', f); }, []);
  return (
    <div className="chatFab">
      {open && <div className="chatPanel" role="dialog" aria-label="Chat with iGo Green Energy">
        <header><b>{T("site.078", "iGo Assistant")}</b><button onClick={() => setOpen(false)} aria-label="Close chat">×</button></header>
        <div className="chatBody"><p>{T("site.079", "Hello! Our AI assistant and WhatsApp connection will be available here soon.")}</p><p>{T("site.080", "Meanwhile, you can")} <Link to="/contact" onClick={() => setOpen(false)}>{T("site.081", "send us your requirement")}</Link>.</p></div>
        <form className="chatCb" onSubmit={async (e) => { e.preventDefault(); if (await send({ type: 'callback', name: cb.name, phone: cb.phone, message: 'Callback requested from chat widget', website: e.currentTarget.website.value })) setCb({ name: '', phone: '' }); }}>
          {st.ok ? <p className="ok">{T("site.206", "Thanks! We will call you back shortly.")}</p> : <>
            <b>{T("site.201", "Request a callback")}</b>
            <input required placeholder={T("site.202", "Your name")} value={cb.name} onChange={(e) => setCb({ ...cb, name: e.target.value })} aria-label="Your name" />
            <input required type="tel" placeholder={T("site.203", "Phone number")} value={cb.phone} onChange={(e) => setCb({ ...cb, phone: e.target.value })} aria-label="Phone number" />
            <input {...HONEY} />
            {st.err && <small className="formErr">{st.err}</small>}
            <button disabled={st.busy}>{st.busy ? T("site.205", "Sending…") : T("site.204", "Call me back")}</button></>}
        </form>
        <div className="chatBtns">{wa ? <a className="chatWa" href={'https://wa.me/' + wa + '?text=' + encodeURIComponent(T("site.207", "Hello iGo Green Energy, I would like to know more about your solutions."))} target="_blank" rel="noopener noreferrer"><Ic n="msg" size={16} /> {T("site.082b", "Chat on WhatsApp")}</a> : <button disabled><Ic n="msg" size={16} /> {T("site.082", "WhatsApp (coming soon)")}</button>}</div>
      </div>}
      <button className="chatBtn" onClick={() => setOpen(!open)} aria-label="Open chat"><Ic n={open ? 'plus' : 'msg'} size={26} style={open ? { transform: 'rotate(45deg)' } : null} /></button>
    </div>
  );
}
