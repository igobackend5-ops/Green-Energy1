import React, { useEffect, useMemo, useState } from 'react';
import './admin.css';
import { AdminProvider, Icon } from './ui.jsx';
import { NAV, NAV_GROUPS, SETTINGS_FIELDS } from './schema.js';
import { getSession, signIn, signOut } from './auth.js';
import { cms, useCms, useCmsLog } from './store.js';
import { api } from './api.js';
import { HomeManager, ListManager, DocEditor, nav } from './modules.jsx';
import { PageContent } from './PageContent.jsx';
import { Dashboard, Enquiries, Media, Users, ChangePassword, LeadershipManager } from './Ops.jsx';
import { CONTACT_FIELDS } from './schema.js';

const SUBS = {
  projects: 'Projects shown on the Projects page.', testimonials: 'Client testimonials. Names, photos and logos are optional.', partners: 'Partner logos and details.', certificates: 'Certifications and compliance documents.',
  blogs: 'Articles shown on the Blogs page.', careers: 'Job and opportunity listings.', faq: 'Questions and answers on the FAQ page.'
};

function Login({ onIn }) {
  const [email, setEmail] = useState(''), [pw, setPw] = useState(''), [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  const submit = async (e) => { e.preventDefault(); setBusy(true); setErr(''); try { onIn(await signIn(email, pw)); } catch (x) { setErr(x.message || 'Could not sign in.'); } setBusy(false); };
  return (
    <div className="admLogin">
      <form className="admLoginCard" onSubmit={submit}>
        <img src="/logo.png" alt="Green Energy" />
        <h1>Admin Login</h1>
        <p>Sign in to manage your website content and customer enquiries.</p>
        <label>Email<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" autoComplete="current-password" required value={pw} onChange={(e) => setPw(e.target.value)} /></label>
        {err && <div className="admErr" role="alert">{err}</div>}
        <button className="admBtn primary full" disabled={busy}><Icon n="lock" /> {busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}

function Shell({ user, onOut }) {
  const [path, setPath] = useState(location.pathname.replace(/\/+$/, '') || '/admin');
  const [open, setOpen] = useState(false), [bell, setBell] = useState(false), [prof, setProf] = useState(false), [q, setQ] = useState(''), [pw, setPw] = useState(false), [badge, setBadge] = useState(0), [offline, setOffline] = useState('');
  useEffect(() => { const f = () => { setPath(location.pathname.replace(/\/+$/, '') || '/admin'); setOpen(false); window.scrollTo(0, 0); }; addEventListener('popstate', f); return () => removeEventListener('popstate', f); }, []);
  useEffect(() => cms.onError(setOffline), []);
  useEffect(() => { cms.loadLogs(); const t = () => api('/enquiries/stats').then((s) => setBadge(s.new)).catch(() => {}); t(); const i = setInterval(t, 30000); return () => clearInterval(i); }, [path]);
  const cur = NAV.find((n) => n.path === path) || NAV.find((n) => n.path !== '/admin' && path.startsWith(n.path)) || NAV[0];
  const id = cur.id;
  const log = useCmsLog();
  const data = { projects: useCms('projects'), blogs: useCms('blogs'), testimonials: useCms('testimonials'), partners: useCms('partners'), faq: useCms('faq'), careers: useCms('careers'), certificates: useCms('certificates') };
  const NAME = { projects: 'Projects', blogs: 'Blogs', testimonials: 'Testimonials', partners: 'Partners', faq: 'FAQs', careers: 'Job Openings', certificates: 'Certificates' };
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase(); if (t.length < 2) return [];
    return Object.entries(data).flatMap(([k, arr]) => (arr || []).map((x) => [k, x.title || x.name || x.question || x.text || ''])).filter(([, s]) => String(s).toLowerCase().includes(t)).slice(0, 8);
  }, [q, ...Object.values(data)]);
  const settings = useCms('settings');
  const admin = user.role === 'admin';

  let page;
  switch (id) {
    case 'dashboard': page = <Dashboard user={user} />; break;
    case 'enquiries': page = <Enquiries user={user} />; break;
    case 'content': page = <PageContent />; break;
    case 'home': page = <HomeManager />; break;
    case 'leadership': page = <LeadershipManager />; break;
    case 'media': page = <Media />; break;
    case 'users': page = admin ? <Users me={user} /> : <div className="admCard"><b>Only admins can manage users.</b></div>; break;
    case 'contact': page = <DocEditor docKey="contact" fields={CONTACT_FIELDS} title="Contact Details" sub="Company contact details used on the website footer and Contact page." />; break;
    case 'settings': page = <DocEditor docKey="settings" fields={SETTINGS_FIELDS} title="Website Settings" sub="Brand, colours, footer, SEO and analytics." />; break;
    default: page = <ListManager key={id} cfgKey={id} title={cur.label} sub={SUBS[id]} />;
  }
  return (
    <div className="admApp">
      <aside className={'admSide' + (open ? ' open' : '')}>
        <div className="admSideTop"><img src={settings.logo || '/logo.png'} alt="Green Energy" /><button className="admIcoBtn mob" aria-label="Close menu" onClick={() => setOpen(false)}><Icon n="x" /></button></div>
        <nav>{NAV_GROUPS.map(([g, items]) => (
          <div key={g} className="admNavGroup"><small>{g}</small>
            {items.filter((n) => n.id !== 'users' || admin).map((n) => <a key={n.id} href={n.path} className={n.id === id ? 'on' : ''} onClick={(e) => { e.preventDefault(); nav(n.path); }}><Icon n={n.icon} /> {n.label}{n.id === 'enquiries' && badge > 0 && <i className="admCount">{badge}</i>}</a>)}
          </div>))}</nav>
        <div className="admSideBot">
          <div className="admProf"><span className="admAv">{user.name[0]}</span><div><b>{user.name}</b><small>{user.email} · {admin ? 'Admin' : 'Editor'}</small></div></div>
          <button className="admBtn ghost full" onClick={onOut}><Icon n="logout" /> Logout</button>
        </div>
      </aside>
      {open && <div className="admScrim" onClick={() => setOpen(false)} />}
      <div className="admMain">
        <header className="admTop">
          <button className="admIcoBtn mob" aria-label="Open menu" onClick={() => setOpen(true)}><Icon n="menu" size={22} /></button>
          <img className="admTopLogo" src={settings.logo || '/logo.png'} alt="Green Energy" />
          <h2>{cur.label}</h2>
          <div className="admTopRight">
            <div className="admSearchTop">
              <label className="admSearch"><Icon n="search" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, blogs, FAQs…" aria-label="Search content" /></label>
              {hits.length > 0 && <div className="admDrop wide">{hits.map(([k, s], i) => <button key={i} onClick={() => { setQ(''); nav('/admin/' + k); }}><small>{NAME[k]}</small>{String(s).replace(/<[^>]+>/g, '').slice(0, 70)}</button>)}</div>}
            </div>
            <div className="admPop">
              <button className="admIcoBtn" aria-label="Notifications" onClick={() => { setBell(!bell); setProf(false); }}><Icon n="bell" size={20} />{badge > 0 && <i className="admDot" />}</button>
              {bell && <div className="admDrop"><h4>Notifications</h4>
                <button onClick={() => { setBell(false); nav('/admin/enquiries'); }}><Icon n="inbox" /> {badge > 0 ? badge + ' new enquir' + (badge === 1 ? 'y' : 'ies') + ' waiting' : 'No new enquiries'}</button>
                {log.slice(0, 4).map((l, i) => <div className="admNote" key={i}><b>{l.what}</b><small>{l.admin}</small></div>)}</div>}
            </div>
            <div className="admPop">
              <button className="admUser" onClick={() => { setProf(!prof); setBell(false); }} aria-label="Account menu"><span className="admAv">{user.name[0]}</span><span className="admUserName">{user.name}</span><Icon n="down" size={14} /></button>
              {prof && <div className="admDrop"><button onClick={() => { setProf(false); setPw(true); }}><Icon n="lock" /> Change password</button><a className="admDropLink" href="/" target="_blank" rel="noreferrer"><Icon n="ext" /> View website</a><button onClick={onOut}><Icon n="logout" /> Logout</button></div>}
            </div>
          </div>
        </header>
        {offline && <div className="admErr admBanner" role="alert">{offline} <button className="admBtn sm" onClick={() => { setOffline(''); location.reload(); }}>Reload</button></div>}
        <main className="admContent">{page}</main>
      </div>
      {pw && <ChangePassword onClose={() => setPw(false)} />}
    </div>
  );
}

export default function AdminApp() {
  const [user, setUser] = useState(undefined);
  useEffect(() => { getSession().then(setUser); }, []);
  useEffect(() => { const t = document.title; document.title = 'Admin | Green Energy'; return () => { document.title = t; }; }, []);
  useEffect(() => { document.documentElement.classList.add('admRoot'); return () => document.documentElement.classList.remove('admRoot'); }, []);
  if (user === undefined) return <div className="adm"><div className="admLogin"><p className="admMute">Loading…</p></div></div>;
  if (!user) return <AdminProvider><div className="adm"><Login onIn={setUser} /></div></AdminProvider>;
  return <AdminProvider><div className="adm"><Shell user={user} onOut={() => { signOut(); setUser(null); nav('/admin'); }} /></div></AdminProvider>;
}
