import React, { useState, useMemo, useEffect } from 'react';
import { useCms } from '../admin/store.js';
import { Link, go, useReveal, Ic, Head, Sec, Cta } from './common.jsx';

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
        <h1 className="sr">Powering a Sustainable Tomorrow</h1>
        <img src="/projects-hero.png" width="2048" height="768" alt="Powering a Sustainable Tomorrow. Clean energy, cleaner tomorrow: wind turbines over green hills and a river at sunrise." fetchpriority="high" />
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
              <div className="projImg"><img src={p.img || IMG[p.k]} alt="" loading="lazy" /><span className="projTag">{SV[p.k]}</span><span className="projStock">Illustrative visual</span></div>
              <div className="projBody">
                <h3>{p.s}</h3><p>{p.n}</p>
                <dl>{['Project Type', 'Service', 'Location', 'Capacity', 'Scope of Work'].map((l) => <div key={l}><dt>{l}</dt><dd>{l === 'Service' ? SV[p.k] : l === 'Location' && p.loc ? p.loc : l === 'Capacity' && p.cap ? p.cap : 'Coming soon'}</dd></div>)}</dl>
              </div>
            </article>
          ))}
        </div>
      </Sec>
      <Sec cls="alt"><Cta eyebrow="PROJECT INQUIRY" title="Discuss your" em="project" text="Tell us what you're planning, and our team will respond." label="Discuss Your Project" to="/contact" /></Sec>
      <Sec><Cta eyebrow="SITE SURVEY" title="Start with a" em="Smart Quote" label="Request a Site Survey" onClick={onQuote} tone="dark" /></Sec>
    </div>
  );
}

/* ============================== TESTIMONIALS ============================== */
export function TestimonialsPage({ onQuote }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg pgTesti">
      <div className="prjHero tstHero">
        <h1 className="sr">Trusted by customers who go green</h1>
        <img src="/testimonials-hero.png" width="2048" height="682" alt="Testimonials and clients: trusted by customers who go green. Solar panels, wind turbines and a water-treatment plant at sunset." fetchpriority="high" />
      </div>
      <Sec><Head eyebrow="TRUSTED BY" title="Our" em="Clients" center />
        <div className="logoWall rv">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="logoSlot"><Ic n="build" size={22} /><span>Client logo</span></div>)}</div>
        <p className="emptyNote">Our client logos will appear here.</p></Sec>
      <Sec cls="alt"><Head eyebrow="CLIENT STORIES" title="In their" em="own words" center />
        <div className="carousel rv"><div className="emptyState"><span className="bigQuote sm" aria-hidden="true">“</span><h3>Client stories coming soon</h3><p>We're gathering feedback from our first customers. Their stories will be shared here.</p></div></div></Sec>
    </div>
  );
}

/* ============================== BLOGS ============================== */
const CATS = ['Solar', 'Wind', 'Biogas', 'Water Treatment', 'Sustainability', 'Energy Efficiency'];
export function BlogsPage() {
  const ref = useReveal();
  const [cat, setCat] = useState('All'), [q, setQ] = useState(''), [mail, setMail] = useState(''), [done, setDone] = useState(false);
  const cb = useCms('blogs'), today = new Date().toISOString().slice(0, 10);
  const ARTICLES = (Array.isArray(cb) ? cb : []).filter((x) => x.status === 'published' || (x.status === 'scheduled' && x.publishDate && x.publishDate <= today)).map((x) => ({ cat: x.category, img: x.image, date: x.publishDate || today, title: x.title, desc: x.shortDesc, to: x.link || '/blogs' }));
  const fmtDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const shown = ARTICLES.filter((a) => (cat === 'All' || a.cat === cat) && a.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <div ref={ref} className="pg pgBlogs">
      <div className="prjHero blgHero">
        <h1 className="sr">Ideas for a greener tomorrow</h1>
        <img src="/blogs-hero.png" width="2048" height="768" alt="Blogs and news: ideas for a greener tomorrow. Wind turbines, solar panels and a water-treatment plant over a lake at sunrise, with books on clean energy." fetchpriority="high" />
      </div>
      <Sec>
        <div className="catRow">{['All', ...CATS].map((c) => <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}</div>
        <div className="blgHead">
          <p className="pgEye">GREEN JOURNAL</p>
          <h2>Latest from Our <em>Green Journal</em></h2>
          <p>Guides, explainers and ideas on solar, wind, biogas and water treatment, written to help you plan a cleaner, more resilient future.</p>
        </div>
        {shown.length > 0 ? (
          <div className="blgGrid">
            {shown.map((a, i) => (
              <article className="blgCard rv" key={a.title + i} style={{ '--d': i * 90 + 'ms' }}>
                <div className="blgImg"><img src={a.img} alt="" loading="lazy" /><span className="blgTag">{a.cat}</span></div>
                <div className="blgBody">
                  <time dateTime={a.date}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>{fmtDate(a.date)}</time>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                  <Link to={a.to} className="blgMore">Read More <Ic n="arrow" size={17} /></Link>
                </div>
              </article>
            ))}
          </div>
        ) : <p className="emptyNote">No articles in this category yet. New articles will be published here.</p>}
      </Sec>
      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow="RESOURCES" title="Downloads —" em="Brochures & Catalogues" text="Our brochures and catalogues will be available to download here." /><span className="pill"><Ic n="doc" size={16} />Coming soon</span></div>
        <form className="news rv" onSubmit={(e) => { e.preventDefault(); if (mail) setDone(true); }}>
          <h3>Get updates</h3><p>Be the first to hear when new articles are published.</p>
          {done ? <p className="ok"><Ic n="check" size={18} /> Thanks, you're on the list.</p> : <><input type="email" required value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Your email address" aria-label="Email address" /><button className="pgBtn">Subscribe <Ic n="arrow" size={18} /></button></>}
        </form>
      </div></Sec>
    </div>
  );
}

/* ============================== CONTACT ============================== */
export function ContactPage() {
  const ref = useReveal();
  const [svc, setSvc] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div ref={ref} className="pg pgContact">
      <div className="prjHero cntHero">
        <h1 className="sr">Let's build a cleaner tomorrow</h1>
        <img src="/contact-hero.png" width="2048" height="768" alt="Contact us: let's build a cleaner tomorrow. A modern terrace workspace with a laptop and notebook overlooking a lake and green hills at sunset." fetchpriority="high" />
      </div>
      <Sec><div className="contactGrid">
        <aside className="cInfo rv">
          <h3>Contact information</h3><p>Our contact details will be published here shortly. In the meantime, send us your requirement using the form.</p>
          <h4>Choose a service</h4>
          <div className="svcPick">{Object.entries(SV).map(([k, l]) => <button type="button" key={k} className={svc === l ? 'on' : ''} onClick={() => setSvc(svc === l ? '' : l)}>{l}</button>)}</div>
          <button type="button" className="chatCard" onClick={() => dispatchEvent(new Event('igo-chat'))}><Ic n="msg" size={26} /><span><b>Chat with us</b><small>AI assistant · WhatsApp connection</small></span><Ic n="arrow" size={18} /></button>
        </aside>
        <form className="cForm rv" onSubmit={submit}>
          <p className="pgEye">SMART QUOTE / SITE SURVEY</p><h2>Tell us about your project</h2>
          {sent ? <div className="ok big"><Ic n="check" size={26} /><div><b>Thank you.</b><p>Thank you for your enquiry. Our team will get back to you.</p></div></div> : <>
            <div className="fGrid">
              <label>Name<input required name="name" autoComplete="name" /></label>
              <label>Company<input name="company" autoComplete="organization" /></label>
              <label>Email<input required type="email" name="email" autoComplete="email" /></label>
              <label>Phone<input type="tel" name="phone" autoComplete="tel" /></label>
              <label>Service Interested In<select name="service" value={svc} onChange={(e) => setSvc(e.target.value)} required><option value="">Select a service</option>{Object.values(SV).map((l) => <option key={l}>{l}</option>)}</select></label>
              <label>Project Type<select name="ptype" defaultValue=""><option value="">Select type</option>{['Residential', 'Commercial', 'Industrial', 'Agriculture and Dairy', 'Government and Institutions'].map((l) => <option key={l}>{l}</option>)}</select></label>
              <label className="full">Location<input name="location" /></label>
              <label className="full">Requirement / Message<textarea name="message" rows="4" /></label>
            </div>
            <button className="pgBtn">Request a Consultation <Ic n="arrow" size={18} /></button></>}
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
        <h1 className="sr">Frequently Asked Questions</h1>
        <img src="/faq-hero.png" width="2048" height="768" alt="Frequently asked questions. Wooden blocks with question marks on a terrace overlooking a lake and green hills at sunset." fetchpriority="high" />
      </div>
      <Sec>
        <div className="faqSearch"><label className="search c"><Ic n="search" size={18} /><input value={q} onChange={(e) => { setQ(e.target.value); setOpen(null); }} placeholder="Search questions" aria-label="Search questions" /></label></div>
        {!q && <div className="catRow ctr">{Object.keys(FAQ).map((c) => <button key={c} className={cat === c ? 'on' : ''} onClick={() => { setCat(c); setOpen(null); }}>{c}</button>)}</div>}
        <div className="acc">
          {rows.length === 0 && <p className="emptyNote">No questions match your search.</p>}
          {rows.map(([c, a, b], i) => { const id = c + i; const on = open === id; return (
            <div className={'accItem' + (on ? ' on' : '')} key={id}>
              <button aria-expanded={on} onClick={() => setOpen(on ? null : id)}><span>{q && <small>{c}</small>}{a}</span><Ic n="plus" size={20} /></button>
              <div className="accBody"><div><p>{b}</p></div></div>
            </div>); })}
        </div>
      </Sec>
      <Sec cls="alt"><Cta eyebrow="STILL HAVE QUESTIONS?" title="Talk to" em="our team" label="Contact Us" to="/contact" /></Sec>
    </div>
  );
}

/* ============================== GLOBAL CHAT / WHATSAPP ============================== */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setOpen(true); addEventListener('igo-chat', f); return () => removeEventListener('igo-chat', f); }, []);
  return (
    <div className="chatFab">
      {open && <div className="chatPanel" role="dialog" aria-label="Chat with iGo Green Energy">
        <header><b>iGo Assistant</b><button onClick={() => setOpen(false)} aria-label="Close chat">×</button></header>
        <div className="chatBody"><p>Hello! Our AI assistant and WhatsApp connection will be available here soon.</p><p>Meanwhile, you can <Link to="/contact" onClick={() => setOpen(false)}>send us your requirement</Link>.</p></div>
        <div className="chatBtns"><button disabled><Ic n="msg" size={16} /> WhatsApp (coming soon)</button></div>
      </div>}
      <button className="chatBtn" onClick={() => setOpen(!open)} aria-label="Open chat"><Ic n={open ? 'plus' : 'msg'} size={26} style={open ? { transform: 'rotate(45deg)' } : null} /></button>
    </div>
  );
}
