import React, { useEffect, useMemo, useState } from 'react';
import './admin.css';
import { AdminProvider, Icon } from './ui.jsx';
import { NAV, SETTINGS_FIELDS } from './schema.js';
import { getSession, signIn, signOut, DEMO_LOGIN } from './auth.js';
import { useCms, useCmsLog } from './store.js';
import { Dashboard, HomeManager, ListManager, DocEditor, ContactManager, nav } from './modules.jsx';

const MODS = {
  dashboard: { t: 'Dashboard' },
  home: { t: 'Home' }, about: { t: 'About Us' }, services: { t: 'Services' }, projects: { t: 'Projects' }, testimonials: { t: 'Clients / Testimonials' },
  partners: { t: 'Partners' }, certificates: { t: 'Certificates' }, blogs: { t: 'Blogs' }, careers: { t: 'Careers' }, contact: { t: 'Contact Us' }, faq: { t: 'FAQ' }, settings: { t: 'Website Settings' }
};
const SUBS = {
  about: 'Company story, mission, vision, values and statistics.', services: 'Solar, Wind, Biogas and Water Treatment service pages.', projects: 'Projects shown on the Projects page.',
  testimonials: 'Client testimonials. Names, photos and logos are optional.', partners: 'Partner logos and details.', certificates: 'Certifications and compliance documents.', blogs: 'Articles shown on the Blogs page.',
  careers: 'Job and opportunity listings.', faq: 'Questions and answers on the FAQ page.'
};

function Login({ onIn }) {
  const [email, setEmail] = useState(''), [pw, setPw] = useState(''), [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  const submit = async (e) => { e.preventDefault(); setBusy(true); setErr(''); try { onIn(await signIn(email, pw)); } catch (x) { setErr(x.message); } setBusy(false); };
  return (
    <div className="admLogin">
      <form className="admLoginCard" onSubmit={submit}>
        <img src="/logo.png" alt="Green Energy" />
        <h1>Admin Login</h1>
        <p>Sign in to manage your website content.</p>
        <label>Email<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" autoComplete="current-password" required value={pw} onChange={(e) => setPw(e.target.value)} /></label>
        {err && <div className="admErr" role="alert">{err}</div>}
        <button className="admBtn primary full" disabled={busy}><Icon n="lock" /> {busy ? 'Signing in…' : 'Sign in'}</button>
        <div className="admDemo"><b>Temporary demo login</b><span>{DEMO_LOGIN.email}</span><span>{DEMO_LOGIN.password}</span><small>Replace with Firebase Authentication when you connect it.</small></div>
      </form>
    </div>
  );
}

function Shell({ user, onOut }) {
  const [path, setPath] = useState(location.pathname.replace(/\/+$/, '') || '/admin');
  const [open, setOpen] = useState(false), [bell, setBell] = useState(false), [prof, setProf] = useState(false), [q, setQ] = useState('');
  useEffect(() => { const f = () => { setPath(location.pathname.replace(/\/+$/, '') || '/admin'); setOpen(false); window.scrollTo(0, 0); }; addEventListener('popstate', f); return () => removeEventListener('popstate', f); }, []);
  const id = (NAV.find((n) => n.path === path) || (path !== '/admin' && NAV.find((n) => n.path !== '/admin' && path.startsWith(n.path))) || NAV[0]).id;
  const log = useCmsLog();
  const data = { projects: useCms('projects'), blogs: useCms('blogs'), testimonials: useCms('testimonials'), partners: useCms('partners'), faq: useCms('faq'), careers: useCms('careers'), services: useCms('services'), certificates: useCms('certificates') };
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase(); if (t.length < 2) return [];
    return Object.entries(data).flatMap(([k, arr]) => arr.map((x) => [k, x.title || x.name || x.question || x.text || ''])).filter(([, s]) => String(s).toLowerCase().includes(t)).slice(0, 8);
  }, [q, ...Object.values(data)]);
  const settings = useCms('settings');

  let page;
  switch (id) {
    case 'dashboard': page = <Dashboard />; break;
    case 'home': page = <HomeManager />; break;
    case 'contact': page = <ContactManager />; break;
    case 'settings': page = <DocEditor docKey="settings" fields={SETTINGS_FIELDS} title="Website Settings" sub="Brand, colours, footer, SEO and analytics." />; break;
    default: page = <ListManager key={id} cfgKey={id} title={MODS[id].t} sub={SUBS[id]} />;
  }
  return (
    <div className="admApp">
      <aside className={'admSide' + (open ? ' open' : '')}>
        <div className="admSideTop"><img src={settings.logo || '/logo.png'} alt="Green Energy" /><button className="admIcoBtn mob" aria-label="Close menu" onClick={() => setOpen(false)}><Icon n="x" /></button></div>
        <nav>{NAV.map((n) => <a key={n.id} href={n.path} className={n.id === id ? 'on' : ''} onClick={(e) => { e.preventDefault(); nav(n.path); }}><Icon n={n.icon} /> {n.label}</a>)}</nav>
        <div className="admSideBot">
          <div className="admProf"><span className="admAv">{user.name[0]}</span><div><b>{user.name}</b><small>{user.email}</small></div></div>
          <button className="admBtn ghost full" onClick={onOut}><Icon n="logout" /> Logout</button>
        </div>
      </aside>
      {open && <div className="admScrim" onClick={() => setOpen(false)} />}
      <div className="admMain">
        <header className="admTop">
          <button className="admIcoBtn mob" aria-label="Open menu" onClick={() => setOpen(true)}><Icon n="menu" size={22} /></button>
          <img className="admTopLogo" src={settings.logo || '/logo.png'} alt="Green Energy" />
          <h2>{MODS[id].t}</h2>
          <div className="admTopRight">
            <div className="admSearchTop">
              <label className="admSearch"><Icon n="search" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search content…" aria-label="Search content" /></label>
              {hits.length > 0 && <div className="admDrop wide">{hits.map(([k, s], i) => <button key={i} onClick={() => { setQ(''); nav('/admin/' + k); }}><small>{MODS[k].t}</small>{String(s).replace(/<[^>]+>/g, '').slice(0, 70)}</button>)}</div>}
            </div>
            <div className="admPop">
              <button className="admIcoBtn" aria-label="Notifications" onClick={() => { setBell(!bell); setProf(false); }}><Icon n="bell" size={20} />{log.length > 0 && <i className="admDot" />}</button>
              {bell && <div className="admDrop"><h4>Recent activity</h4>{log.length === 0 ? <p className="admMute">No activity yet.</p> : log.slice(0, 6).map((l, i) => <div key={i} className="admNote"><b>{l.what}</b><small>{new Date(l.when).toLocaleString('en-IN')}</small></div>)}</div>}
            </div>
            <div className="admPop">
              <button className="admUser" aria-label="Admin menu" onClick={() => { setProf(!prof); setBell(false); }}><span className="admAv">{user.name[0]}</span><span className="admUserName">{user.name}</span><Icon n="down" size={14} /></button>
              {prof && <div className="admDrop"><div className="admNote"><b>{user.name}</b><small>{user.email}</small></div><a className="admDropLink" href="/" target="_blank" rel="noreferrer"><Icon n="ext" /> View website</a><button className="admDropLink" onClick={onOut}><Icon n="logout" /> Logout</button></div>}
            </div>
          </div>
        </header>
        <main className="admContent">{page}</main>
      </div>
    </div>
  );
}

export default function AdminApp() {
  const [user, setUser] = useState(getSession());
  useEffect(() => { const t = document.title; document.title = 'Admin | Green Energy'; return () => { document.title = t; }; }, []);
  useEffect(() => { document.documentElement.classList.add('admRoot'); return () => document.documentElement.classList.remove('admRoot'); }, []);
  if (!user) return <AdminProvider><div className="adm"><Login onIn={setUser} /></div></AdminProvider>;
  return <AdminProvider><div className="adm"><Shell user={user} onOut={() => { signOut(); setUser(null); nav('/admin'); }} /></div></AdminProvider>;
}
