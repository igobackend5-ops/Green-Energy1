import React, { useCallback, useEffect, useState } from 'react';
import { api } from './api.js';
import { cms, useCms, useCmsLog } from './store.js';
import { Icon, useAdmin } from './ui.jsx';
import { PageHead, nav, Form } from './modules.jsx';

const fmt = (s) => { try { return new Date(String(s).replace(' ', 'T') + 'Z').toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return s; } };
export const TYPE_LABEL = { quote: 'Smart Quote', contact: 'Contact form', callback: 'Callback request', newsletter: 'Newsletter', career: 'Career application' };
const STATUSES = ['new', 'contacted', 'qualified', 'closed', 'spam'];
const CAREER_STATUSES = ['new', 'reviewing', 'shortlisted', 'interview', 'selected', 'rejected'];
const STAT_CLS = { new: 'draft', contacted: 'scheduled', qualified: 'published', closed: 'closed', spam: 'closed' };
const SBadge = ({ s }) => <span className={'admBadge enq-' + s}>{s[0].toUpperCase() + s.slice(1)}</span>;
const csvCell = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';

/* ---------- Enquiries inbox ---------- */
export function Enquiries({ user, initialType = 'all' }) {
  const { notify, ask } = useAdmin();
  const [rows, setRows] = useState(null), [err, setErr] = useState('');
  const [type, setType] = useState(initialType), [status, setStatus] = useState('all'), [q, setQ] = useState(''), [sel, setSel] = useState(null);
  const load = useCallback(() => {
    const p = new URLSearchParams({ type, status, q }).toString();
    api('/enquiries?' + p).then((r) => { setRows(r); setErr(''); }).catch((e) => setErr(e.message));
  }, [type, status, q]);
  useEffect(() => { const t = setTimeout(load, q ? 250 : 0); return () => clearTimeout(t); }, [load]);
  const upd = async (id, patch) => {
    try { const r = await api('/enquiries/' + id, { method: 'PATCH', body: patch }); setRows((c) => c.map((x) => (x.id === id ? r : x))); setSel((c) => (c && c.id === id ? r : c)); notify('Enquiry updated.'); }
    catch (e) { notify(e.message, 'err'); }
  };
  const del = async (r) => { if (!(await ask({ title: 'Delete this enquiry?', text: 'This permanently removes it from the database.' }))) return; try { await api('/enquiries/' + r.id, { method: 'DELETE' }); setRows((c) => c.filter((x) => x.id !== r.id)); setSel(null); notify('Enquiry deleted.'); } catch (e) { notify(e.message, 'err'); } };
  
  const exportCsv = () => {
    const head = ['ID', 'Date', 'Type', 'Name', 'Email', 'Phone', 'Company', 'Subject', 'Message', 'Details', 'Page', 'Status', 'Notes'];
    const lines = [head.map(csvCell).join(',')].concat((rows || []).map((r) => [r.id, r.created_at, TYPE_LABEL[r.type], r.name, r.email, r.phone, r.company, r.subject, r.message, Object.entries(r.extra || {}).map(([k, v]) => k + ': ' + v).join('; '), r.source, r.status, r.notes].map(csvCell).join(',')));
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' })); a.download = 'enquiries-' + new Date().toISOString().slice(0, 10) + '.csv'; a.click(); URL.revokeObjectURL(a.href);
  };
  const types = ['all', 'quote', 'contact', 'callback', 'career', 'newsletter'];
  return (
    <div>
      <PageHead title="Enquiries" sub="Every quote request, contact message, callback request, career application and newsletter sign-up from the website, stored in the database.">
        <button className="admBtn" onClick={load}><Icon n="undo" /> Refresh</button>
        <button className="admBtn" disabled={!rows?.length} onClick={exportCsv}><Icon n="upload" /> Export CSV</button>
      </PageHead>
      <div className="admCard enqBar">
        <div className="admTabs">{types.map((t) => <button key={t} className={type === t ? 'on' : ''} onClick={() => setType(t)}>{t === 'all' ? 'All' : TYPE_LABEL[t]}</button>)}</div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status"><option value="all">All statuses</option>{(type === 'career' ? CAREER_STATUSES : STATUSES).map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}</select>
        <label className="admSearch"><Icon n="search" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, email, message…" aria-label="Search enquiries" /></label>
      </div>
      {err && <div className="admErr" role="alert">{err}</div>}
      <div className="admCard enqList">
        {!rows ? <p className="admMute">Loading…</p> : rows.length === 0 ? <div className="enqEmpty"><Icon n="inbox" size={34} /><b>No enquiries found</b><span>New submissions from the website forms will appear here automatically.</span></div> : (
          <div className="enqTable" role="table">
            <div className="enqHead" role="row"><span>Received</span><span>Type</span><span>Contact</span><span>Message</span><span>Status</span></div>
            {rows.map((r) => (
              <button key={r.id} className={'enqRow' + (r.status === 'new' ? ' isnew' : '')} onClick={() => setSel(r)} role="row">
                <span>{fmt(r.created_at)}</span><span><b>{TYPE_LABEL[r.type] || r.type}</b></span>
                <span><b>{r.name || r.email}</b><small>{[r.phone, r.name ? r.email : ''].filter(Boolean).join(' · ')}</small></span>
                <span className="enqMsg">{r.subject ? <b>{r.subject}. </b> : null}{r.message || Object.values(r.extra || {}).filter(Boolean).slice(0, 3).join(' · ')}</span>
                <span><SBadge s={r.status} /></span>
              </button>
            ))}
          </div>
        )}
      </div>
      {sel && (
        <div className="admOverlay" onClick={() => setSel(null)}>
          <aside className="enqDrawer" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="admRow between"><h3>{TYPE_LABEL[sel.type]} #{sel.id}</h3><button className="admIcoBtn" aria-label="Close" onClick={() => setSel(null)}><Icon n="x" /></button></div>
            <small className="admMute">Received {fmt(sel.created_at)}{sel.source ? ' · from ' + sel.source : ''}</small>
            <dl className="enqDl">
              {[['Name', sel.name], ['Phone', sel.phone && <a href={'tel:' + sel.phone}>{sel.phone}</a>], ['Email', sel.email && <a href={'mailto:' + sel.email}>{sel.email}</a>], ['Company', sel.company], ['Subject', sel.subject]].filter(([, v]) => v).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              {Object.entries(sel.extra || {}).filter(([k, v]) => v && k !== 'resume_file' && k !== 'submission_id').map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              {sel.extra && sel.extra.resume_file && <div className="full"><dt>Resume</dt><dd><a className="admBtn sm" href={'/api/applications/' + sel.id + '/resume'}>Download resume</a></dd></div>}
              {sel.message && <div className="full"><dt>Message</dt><dd style={{ whiteSpace: 'pre-wrap' }}>{sel.message}</dd></div>}
            </dl>
            <div className="admRow wrap">
              {sel.phone && <a className="admBtn" href={'tel:' + sel.phone}><Icon n="phone" /> Call</a>}
              {sel.email && <a className="admBtn" href={'mailto:' + sel.email + '?subject=' + encodeURIComponent('Re: ' + (sel.subject || 'Your enquiry to Green Energy'))}><Icon n="mail" /> Reply by email</a>}
            </div>
            <div className="admField"><label>Status</label>
              <div className="admTabs">{(sel.type === 'career' ? CAREER_STATUSES : STATUSES).map((s) => <button key={s} className={sel.status === s ? 'on' : ''} onClick={() => upd(sel.id, { status: s })}>{s[0].toUpperCase() + s.slice(1)}</button>)}</div></div>
            <NoteBox key={sel.id} value={sel.notes} onSave={(v) => upd(sel.id, { notes: v })} />
            {user.role === 'admin' && <button className="admBtn danger" onClick={() => del(sel)}><Icon n="trash" /> {sel.type === 'career' ? 'Delete application' : 'Delete enquiry'}</button>}
          </aside>
        </div>
      )}
    </div>
  );
}
function NoteBox({ value, onSave }) {
  const [v, setV] = useState(value || '');
  return <div className="admField"><label>Internal notes (not visible to customers)</label><textarea rows={4} value={v} onChange={(e) => setV(e.target.value)} placeholder="Call outcome, quote sent, follow-up date…" /><div className="admRow" style={{ marginTop: 8 }}><button className="admBtn sm" disabled={v === (value || '')} onClick={() => onSave(v)}>Save note</button></div></div>;
}

/* ---------- Dashboard ---------- */
export function Dashboard({ user }) {
  const [st, setSt] = useState(null), [err, setErr] = useState('');
  useEffect(() => { api('/enquiries/stats').then(setSt).catch((e) => setErr(e.message)); }, []);
  const log = useCmsLog();
  const proj = useCms('projects'), blogs = useCms('blogs'), tst = useCms('testimonials'), faq = useCms('faq'), jobs = useCms('careers'), leaders = useCms('leadership') || [];
  const lead = [['New enquiries', st?.new ?? '–', 'inbox', '/admin/enquiries'], ['Received today', st?.today ?? '–', 'bell', '/admin/enquiries'], ['Last 7 days', st?.last7 ?? '–', 'mail', '/admin/enquiries'], ['Total enquiries', st?.total ?? '–', 'users', '/admin/enquiries']];
  const content = [['Projects', proj.length], ['Blogs', blogs.length], ['Testimonials', tst.length], ['FAQs', faq.length], ['Job openings', jobs.length], ['Leadership', leaders.length]];
  const quick = [['Edit page content', '/admin/content', 'layers'], ['View enquiries', '/admin/enquiries', 'inbox'], ['Add project', '/admin/projects', 'folder'], ['Write a blog', '/admin/blogs', 'doc'], ['Media library', '/admin/media', 'img'], ['Contact details', '/admin/contact', 'phone']];
  return (
    <div>
      <PageHead title={'Welcome, ' + user.name.split(' ')[0]} sub="Customer enquiries and website content at a glance."><a className="admBtn" href="/" target="_blank" rel="noreferrer"><Icon n="ext" /> View website</a></PageHead>
      {err && <div className="admErr" role="alert">{err}</div>}
      <div className="admStats">{lead.map(([l, v, ic, p]) => <button className="admStat dashLink" key={l} onClick={() => nav(p)}><Icon n={ic} /><b>{v}</b><span>{l}</span></button>)}</div>
      <div className="admCols">
        <div className="admCard"><h3>Latest enquiries</h3>
          {!st ? <p className="admMute">Loading…</p> : st.recent.length === 0 ? <p className="admMute">No enquiries yet. They appear here as soon as a visitor submits a form.</p> :
            <div className="admTable">{st.recent.map((r) => <div key={r.id} className="dashEnq" onClick={() => nav('/admin/enquiries')}><span><b>{r.name || r.email}</b><small className="admMute"> · {TYPE_LABEL[r.type]}</small></span><span>{fmt(r.created_at)}</span><span>{r.phone || r.email}</span><span><SBadge s={r.status} /></span></div>)}</div>}
          {st && st.total > 0 && <div className="admRow" style={{ marginTop: 14, flexWrap: 'wrap' }}>{Object.entries(st.byType).map(([t, c]) => <span key={t} className="admChip">{TYPE_LABEL[t]}: <b>{c}</b></span>)}</div>}
        </div>
        <div className="admCard"><h3>Quick actions</h3>
          <div className="admQuick">{quick.map(([l, p, ic]) => <button key={l} onClick={() => nav(p)}><Icon n={ic} /> {l}</button>)}</div>
          <h3 style={{ marginTop: 22 }}>Content</h3>
          <div className="admRow wrap">{content.map(([l, v]) => <span key={l} className="admChip">{l}: <b>{v}</b></span>)}</div>
        </div>
      </div>
      <div className="admCard" style={{ marginTop: 18 }}><h3>Recent activity</h3>
        {log.length === 0 ? <p className="admMute">No activity yet.</p> : <div className="admTable">{log.slice(0, 8).map((l, i) => <div key={i}><span><b>{l.what}</b></span><span>{fmt(String(l.when).replace('T', ' ').replace('Z', ''))}</span><span>{l.admin}</span><span /></div>)}</div>}
      </div>
    </div>
  );
}

/* ---------- Media library ---------- */
export function Media() {
  const { notify, ask } = useAdmin();
  const [items, setItems] = useState(null), [busy, setBusy] = useState(false);
  const load = () => api('/uploads').then(setItems).catch((e) => notify(e.message, 'err'));
  useEffect(() => { load(); }, []);
  const add = async (e) => {
    const files = [...e.target.files]; e.target.value = ''; setBusy(true);
    const { uploadFile } = await import('./api.js');
    for (const f of files) { try { await uploadFile(f); } catch (x) { notify(f.name + ': ' + x.message, 'err'); } }
    setBusy(false); load();
  };
  const del = async (it) => { if (!(await ask({ title: 'Delete file?', text: 'Anywhere this file is used on the website will show a broken image until you choose another one.' }))) return; try { await api('/uploads/' + it.filename, { method: 'DELETE' }); load(); } catch (e) { notify(e.message, 'err'); } };
  const copy = (u) => { navigator.clipboard?.writeText(location.origin + u); notify('Link copied.'); };
  return (
    <div>
      <PageHead title="Media Library" sub="All images and documents uploaded through the admin. Use the Upload buttons in any editor to replace an image on the site.">
        <label className="admBtn primary" style={{ cursor: 'pointer' }}><Icon n="upload" /> {busy ? 'Uploading…' : 'Upload files'}<input type="file" multiple hidden accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" onChange={add} /></label>
      </PageHead>
      {!items ? <p className="admMute">Loading…</p> : items.length === 0 ? <div className="admCard enqEmpty"><Icon n="img" size={34} /><b>No uploads yet</b><span>Images you upload in any editor are stored here.</span></div> : (
        <div className="mediaGrid">{items.map((it) => (
          <div className="mediaItem" key={it.filename}>
            <div className="mediaThumb">{it.mime === 'application/pdf' ? <Icon n="doc" size={36} /> : <img src={'/uploads/' + it.filename} alt={it.original} loading="lazy" />}</div>
            <b title={it.original}>{it.original}</b><small>{(it.size / 1024).toFixed(0)} KB · {fmt(it.created_at)}</small>
            <div className="admRow"><button className="admBtn sm" onClick={() => copy('/uploads/' + it.filename)}><Icon n="copy" /> Copy link</button><button className="admIcoBtn danger" aria-label="Delete" onClick={() => del(it)}><Icon n="trash" /></button></div>
          </div>))}</div>
      )}
    </div>
  );
}

/* ---------- Users ---------- */
export function Users({ me }) {
  const { notify, ask } = useAdmin();
  const [rows, setRows] = useState(null), [f, setF] = useState(null);
  const load = () => api('/users').then(setRows).catch((e) => notify(e.message, 'err'));
  useEffect(() => { load(); }, []);
  const save = async (ev) => {
    ev.preventDefault();
    try {
      if (f.id) await api('/users/' + f.id, { method: 'PATCH', body: { name: f.name, role: f.role, active: f.active, password: f.password || undefined } });
      else await api('/users', { method: 'POST', body: f });
      setF(null); load(); notify('User saved.');
    } catch (e) { notify(e.message, 'err'); }
  };
  const del = async (u) => { if (!(await ask({ title: 'Delete user?', text: u.email + ' will no longer be able to sign in.' }))) return; try { await api('/users/' + u.id, { method: 'DELETE' }); load(); } catch (e) { notify(e.message, 'err'); } };
  return (
    <div>
      <PageHead title="Users & Roles" sub="Admins can do everything. Editors can change content and handle enquiries but cannot manage users or delete enquiries.">
        <button className="admBtn primary" onClick={() => setF({ name: '', email: '', role: 'editor', password: '', active: true })}><Icon n="plus" /> Add user</button>
      </PageHead>
      <div className="admCard">{!rows ? 'Loading…' : <div className="admTable usrTable">{rows.map((u) => (
        <div key={u.id}><span><b>{u.name}</b><small className="admMute"> {u.email}</small></span><span>{u.role === 'admin' ? 'Admin' : 'Editor'}</span><span>{u.last_login ? 'Last login ' + fmt(u.last_login) : 'Never signed in'}</span>
          <span className="admRow"><span className={'admBadge ' + (u.active ? 'published' : 'draft')}>{u.active ? 'Active' : 'Disabled'}</span><button className="admIcoBtn" aria-label="Edit" onClick={() => setF({ ...u, active: !!u.active, password: '' })}><Icon n="edit" /></button>{u.id !== me.id && <button className="admIcoBtn danger" aria-label="Delete" onClick={() => del(u)}><Icon n="trash" /></button>}</span></div>))}</div>}</div>
      {f && (
        <div className="admOverlay" onClick={() => setF(null)}>
          <form className="admModal" onClick={(e) => e.stopPropagation()} onSubmit={save}>
            <h3>{f.id ? 'Edit user' : 'Add user'}</h3>
            <div className="admField"><label>Full name</label><input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
            <div className="admField"><label>Email</label><input type="email" required disabled={!!f.id} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
            <div className="admField"><label>Role</label><select value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })}><option value="editor">Editor</option><option value="admin">Admin</option></select></div>
            <div className="admField"><label>{f.id ? 'New password (leave blank to keep)' : 'Password (min 8 characters)'}</label><input type="password" autoComplete="new-password" required={!f.id} minLength={f.id && !f.password ? 0 : 8} value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></div>
            {f.id && <div className="admRow"><input id="uact" type="checkbox" checked={f.active} onChange={(e) => setF({ ...f, active: e.target.checked })} /><label htmlFor="uact">Account active</label></div>}
            <div className="admRow end"><button type="button" className="admBtn ghost" onClick={() => setF(null)}>Cancel</button><button className="admBtn primary">Save</button></div>
          </form>
        </div>
      )}
    </div>
  );
}

export function ChangePassword({ onClose }) {
  const { notify } = useAdmin();
  const [a, setA] = useState(''), [b, setB] = useState('');
  const go = async (e) => { e.preventDefault(); try { await api('/me/password', { method: 'POST', body: { current: a, next: b } }); notify('Password changed.'); onClose(); } catch (x) { notify(x.message, 'err'); } };
  return (
    <div className="admOverlay" onClick={onClose}><form className="admModal" onClick={(e) => e.stopPropagation()} onSubmit={go}>
      <h3>Change password</h3>
      <div className="admField"><label>Current password</label><input type="password" required autoComplete="current-password" value={a} onChange={(e) => setA(e.target.value)} /></div>
      <div className="admField"><label>New password (min 8 characters)</label><input type="password" required minLength={8} autoComplete="new-password" value={b} onChange={(e) => setB(e.target.value)} /></div>
      <div className="admRow end"><button type="button" className="admBtn ghost" onClick={onClose}>Cancel</button><button className="admBtn primary">Update</button></div>
    </form></div>
  );
}

/* ---------- Leadership team ---------- */
const LFIELDS = [
  { k: 'name', label: 'Name on the card', t: 'text', req: true }, { k: 'role', label: 'Role on the card', t: 'text' },
  { k: 'img', label: 'Photo', t: 'image', rec: '600 × 750 px (portrait)' },
  { g: 'Profile pop-up (opens when the card is clicked)' },
  { k: 'fullName', label: 'Full name', t: 'text' }, { k: 'title', label: 'Title', t: 'text' }, { k: 'desc', label: 'About', t: 'textarea', rows: 6 },
  { k: 'bullets', label: 'Key points', t: 'lines', help: 'One point per line. Use "Label: text" for a bold label.' }
];
const TIERS = ['Tier 1 — Founder & Group CEO', 'Tier 2 — Directors', 'Tier 3 — General Manager, National Sales Head & National Heads', 'Tier 4 — Core Managers & Department Heads', 'Tier 5 — Area Managers, Agri Dpt'];
export function LeadershipManager() {
  const { notify } = useAdmin();
  const list = useCms('leadership');
  const [ix, setIx] = useState(null);
  const defaults = cms.getDefault('leadership');
  if (ix != null) {
    const l = list[ix], d = defaults[ix];
    return <Form title={'Edit · ' + l.name} crumb="Leadership › Team member" fields={LFIELDS}
      initial={{ ...l, bullets: (l.bullets || []).join('\n') }} defaults={d && { ...d, bullets: (d.bullets || []).join('\n') }}
      onSave={(v) => { const n = list.map((x, i) => (i === ix ? { ...x, ...v, bullets: String(v.bullets || '').split('\n').map((t) => t.trim()).filter(Boolean) } : x)); cms.set('leadership', n); cms.log('Leadership updated: ' + v.name); notify('Saved.'); setIx(null); }}
      onCancel={() => setIx(null)} />;
  }
  return (
    <div>
      <PageHead title="Leadership Team" sub="Edit the name, role, photo and profile of every leader shown on the Leadership page. Page headings are under Page Content › Leadership page.">
        <a className="admBtn" href="/leadership" target="_blank" rel="noreferrer"><Icon n="ext" /> View page</a>
      </PageHead>
      {TIERS.map((t, ti) => (
        <div className="admCard" key={t} style={{ marginBottom: 14 }}>
          <h3 className="admGroup">{t}</h3>
          <div className="mediaGrid">{list.map((l, i) => l.tier === ti + 1 && (
            <button key={i} className="mediaItem leadItem" onClick={() => setIx(i)}><div className="mediaThumb"><img src={l.img} alt="" loading="lazy" /></div><b>{l.name}</b><small>{l.role}</small></button>))}</div>
        </div>))}
    </div>
  );
}
