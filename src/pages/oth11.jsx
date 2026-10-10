import React, { useState, useMemo, useEffect } from 'react';
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
  const list = PROJECTS.filter((p) => f === 'all' || p.k === f);
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
              <div className="projImg"><img src={IMG[p.k]} alt="" loading="lazy" /><span className="projTag">{SV[p.k]}</span><span className="projStock">Illustrative visual</span></div>
              <div className="projBody">
                <h3>{p.s}</h3><p>{p.n}</p>
                <dl>{['Project Type', 'Service', 'Location', 'Capacity', 'Scope of Work'].map((l) => <div key={l}><dt>{l}</dt><dd>{l === 'Service' ? SV[p.k] : 'Coming soon'}</dd></div>)}</dl>
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
      <Sec><Cta eyebrow="JOIN US" title="Become Our Next" em="Success Story" label="Get a Smart Quote" onClick={onQuote} /></Sec>
    </div>
  );
}

/* ============================== BLOGS ============================== */
const CATS = ['Solar', 'Wind', 'Biogas', 'Water Treatment', 'Sustainability', 'Energy Efficiency'];
export function BlogsPage() {
  const ref = useReveal();
  const [cat, setCat] = useState('All'), [q, setQ] = useState(''), [mail, setMail] = useState(''), [done, setDone] = useState(false);
  const ARTICLES = [
    { cat: 'Solar', img: '/solutions/solar.jpg', date: '2026-09-28', title: 'How Solar Energy Can Reduce Your Electricity Costs', desc: 'Solar panels turn sunlight into electricity, reducing how much power you draw from the grid. Learn how homes and businesses cut monthly bills and build long-term energy savings.', to: '/services/solar' },
    { cat: 'Wind', img: '/solutions/wind.jpg', date: '2026-09-21', title: 'Why Wind Energy Matters for a Sustainable Future', desc: 'Wind turbines convert moving air into clean electricity without burning fuel. See how wind power helps reduce dependence on conventional energy sources.', to: '/services/wind' },
    { cat: 'Biogas', img: '/solutions/biogas.jpg', date: '2026-09-14', title: 'Turning Organic Waste into Clean Energy with Biogas', desc: 'Organic waste breaks down without oxygen to produce biogas for cooking, heat and power. Discover how it supports cleaner energy and a circular economy.', to: '/services/biogas' },
    { cat: 'Water Treatment', img: '/solutions/water.jpg', date: '2026-09-07', title: 'Smart Water Treatment for a Cleaner Tomorrow', desc: 'Treatment makes water safe, and reuse keeps it in circulation. Explore why cleaner water systems and sustainable management matter for communities and industry.', to: '/services/water' },
  ];
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
              <article className="blgCard rv" key={a.title} style={{ '--d': i * 90 + 'ms' }}>
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
      <div className="pgHero ctrHero"><div className="pgw"><p className="pgEye">CONTACT US</p><h1>Let's build a <em>cleaner future</em> together</h1>
        <p className="heroText">Request a Smart Quote or Site Survey and tell us about your requirement.</p></div></div>
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
const FAQ = {
  General: [['What solutions does IGO Green Energy provide?', 'Solar energy, wind energy, biogas solutions and water treatment, all under one roof.'], ['What makes IGO Green Energy different?', 'It is one of the few companies offering solar, wind, biogas, and water treatment solutions together, giving customers a single trusted partner with no need to manage multiple vendors.'], ['Who does IGO Green Energy serve?', 'Residential, commercial, industrial, agriculture and dairy, and government and institutional customers.']],
  Solar: [['Do you provide residential, commercial and industrial solar?', 'Yes. IGO Green Energy provides solar solutions for all three segments.'], ['What system types and capacities do you offer?', 'On-grid, off-grid and hybrid systems, from 1 kW to 5 MW and above.'], ['Do you provide design and consultation?', 'Yes: site assessment, energy-needs analysis, and system design.'], ['Do you provide installation and commissioning?', 'Yes, carried out by certified installation partners and managed by our project team from start to finish.'], ['Do you provide AMC?', 'Yes. We offer both one-time maintenance and annual maintenance contracts.'], ['Do you help with subsidies?', 'Yes. We assist with subsidy applications, net metering, approvals and documentation. Availability and eligibility depend on current government policy and customer category.'], ['What equipment do you use?', 'Tier-1 certified equipment from leading manufacturers, including solar panels, inverters, batteries, and mounting and electrical components.'], ['What warranty is provided?', 'Manufacturer warranties on major components plus our own workmanship warranty. Warranty periods and terms vary by product and are shared with every quotation.']],
  Wind: [['Do you provide wind EPC?', 'Yes. We deliver complete turnkey EPC (Engineering, Procurement, and Construction) for wind projects, from design to commissioning.'], ['Do you provide O&M?', 'Yes: preventive maintenance, corrective maintenance and full O&M contracts.'], ['What turbine capacity ranges do you support?', 'Small wind turbines up to 100 kW and utility-scale turbines from 1 MW to 3 MW and above.'], ['Do you provide feasibility studies?', 'Yes: wind resource assessment, site evaluation, and technical and financial feasibility.'], ['Which regions do you serve?', 'Pan-India, in all states with good wind potential.']],
  Biogas: [['What plant capacities do you handle?', 'From 1–10 m³/day up to large-scale CBG above 1,000 m³/day.'], ['Do you provide design and engineering?', 'Yes. Design and engineering are delivered through technical partners.'], ['Do you provide turnkey installation?', 'Yes. Full turnkey installation and commissioning.'], ['Do you provide AMC?', 'Yes. Operation and maintenance services are provided through annual maintenance contracts.'], ['Which industries can use biogas?', 'Agriculture and dairy farms, food processing and distilleries, municipal and urban waste, hotels, hospitals and institutions, and poultry and meat processing.'], ['What warranty and after-sales support are provided?', 'Warranty and after-sales terms will be provided once finalized.']],
  'Water Treatment': [['What water treatment systems do you provide?', 'Reverse Osmosis (RO) and demineralization systems.'], ['Do you provide RO?', 'Yes.'], ['Do you provide demineralization?', 'Yes.'], ['What project scale do you handle?', 'Medium-scale projects, from 10 to 100 KLD.'], ['Do you provide customized solutions?', 'Yes. Solutions are customized based on water quality analysis.'], ['Do you provide installation and maintenance?', 'Yes. Design, installation, commissioning and maintenance are all provided.']],
  Projects: [['Can I see your completed projects?', 'IGO Green Energy is a newly launched brand. Completed solar and wind project details will be added as projects are delivered. Details of completed biogas and water treatment projects are confidential and cannot be shared.'], ['Can I filter projects by service?', 'Yes. The Projects page has filters for Solar, Wind, Biogas and Water Treatment.']],
  'Testimonials / Clients': [['Do you have customer testimonials?', 'Client stories will be shared on the Testimonials / Clients page once they are ready.']],
  Services: [['Do you have separate pages for each service?', 'Yes. Solar, Wind, Biogas and Water Treatment each have their own page.'], ['How does the process start?', 'With a consultation or site survey. Request a Smart Quote and our team will take it from there.']],
};
export function FaqPage({ onQuote }) {
  const ref = useReveal();
  const [cat, setCat] = useState('General'), [q, setQ] = useState(''), [open, setOpen] = useState(null);
  const rows = useMemo(() => { const t = q.trim().toLowerCase(); if (t) return Object.entries(FAQ).flatMap(([c, l]) => l.filter(([a, b]) => (a + b).toLowerCase().includes(t)).map((x) => [c, ...x])); return FAQ[cat].map((x) => [cat, ...x]); }, [cat, q]);
  return (
    <div ref={ref} className="pg pgFaq">
      <div className="pgHero ctrHero"><div className="pgw"><p className="pgEye">FAQ</p><h1>Frequently asked <em>questions</em></h1>
        <label className="search c"><Ic n="search" size={18} /><input value={q} onChange={(e) => { setQ(e.target.value); setOpen(null); }} placeholder="Search questions" aria-label="Search questions" /></label></div></div>
      <Sec>
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
      {open && <div className="chatPanel" role="dialog" aria-label="Chat with IGO Green Energy">
        <header><b>IGO Assistant</b><button onClick={() => setOpen(false)} aria-label="Close chat">×</button></header>
        <div className="chatBody"><p>Hello! Our AI assistant and WhatsApp connection will be available here soon.</p><p>Meanwhile, you can <Link to="/contact" onClick={() => setOpen(false)}>send us your requirement</Link>.</p></div>
        <div className="chatBtns"><button disabled><Ic n="msg" size={16} /> WhatsApp (coming soon)</button></div>
      </div>}
      <button className="chatBtn" onClick={() => setOpen(!open)} aria-label="Open chat"><Ic n={open ? 'plus' : 'msg'} size={26} style={open ? { transform: 'rotate(45deg)' } : null} /></button>
    </div>
  );
}
