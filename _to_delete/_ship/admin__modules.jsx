import React, { useMemo, useRef, useState } from 'react';
import { cms, useCms, useCmsLog, uid } from './store.js';
import { LISTS, HERO_FIELDS, CONTACT_FIELDS, SETTINGS_FIELDS, NAV } from './schema.js';
import { Icon, Badge, Toggle, Field, useAdmin } from './ui.jsx';

export const nav = (p) => { history.pushState(null, '', p); dispatchEvent(new PopStateEvent('popstate')); };
const fmt = (iso) => { try { return new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return iso; } };
const strip = (h) => String(h ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const slugify = (t) => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const blank = (fields) => Object.fromEntries(fields.filter((f) => f.k).map((f) => [f.k, f.t === 'gallery' ? [] : f.t === 'toggle' ? true : f.t === 'select' ? (Array.isArray(f.opts[0]) ? f.opts[0][0] : f.opts[0]) : '']));

/* ---------- page header ---------- */
export const PageHead = ({ title, sub, children }) => (
  <div className="admPageHead"><div><h1>{title}</h1>{sub && <p>{sub}</p>}</div><div className="admRow wrap">{children}</div></div>
);

/* ---------- form with sticky Save / Cancel / Reset ---------- */
export function Form({ title, crumb, fields, initial, defaults, onSave, onCancel, extraHead }) {
  const { notify, ask } = useAdmin();
  const [d, setD] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const change = (k, v) => { setD((c) => ({ ...c, [k]: v })); setDirty(true); };
  const save = () => {
    for (const f of fields) if (f.req && !String(d[f.k] ?? '').trim()) { notify('“' + f.label + '” is required.', 'err'); document.getElementById('f_' + f.k)?.focus(); return; }
    try { onSave(d); setDirty(false); } catch (e) { notify('Could not save: browser storage is full or unavailable. Try smaller images.', 'err'); }
  };
  const cancel = async () => { if (dirty && !(await ask({ title: 'Discard changes?', text: 'You have unsaved changes. Leave without saving?', okLabel: 'Discard' }))) return; onCancel(); };
  const reset = async () => { if (await ask({ title: 'Reset to default?', text: 'The form will be restored to its default content. Click Save Changes afterwards to apply it.', okLabel: 'Reset', danger: false })) { setD(defaults ? { ...defaults } : initial); setDirty(true); notify('Form reset to default. Click Save Changes to apply.'); } };
  let group = null;
  return (
    <div className="admForm">
      <PageHead title={title} sub={crumb}>{extraHead}</PageHead>
      <div className="admCard">
        <div className="admGrid">
          {fields.map((f, i) => {
            if (f.g) { group = f.g; return <h3 className="admGroup" key={'g' + i}>{f.g}</h3>; }
            return <Field key={f.k} f={f} value={d[f.k]} onChange={change} defaults={defaults} />;
          })}
        </div>
      </div>
      <div className="admBar">
        <button className="admBtn primary" onClick={save}><Icon n="check" /> Save Changes</button>
        <button className="admBtn ghost" onClick={cancel}>Cancel</button>
        <button className="admBtn ghost right" onClick={reset}><Icon n="undo" /> Reset to Default</button>
      </div>
    </div>
  );
}

/* ---------- single-document editor (hero, contact, settings) ---------- */
export function DocEditor({ docKey, fields, title, sub, onDone }) {
  const { notify } = useAdmin();
  const val = useCms(docKey);
  return (
    <Form title={title} crumb={sub} fields={fields} initial={val} defaults={cms.getDefault(docKey)}
      onSave={(d) => { cms.set(docKey, d); cms.log(title + ' updated'); notify('Changes saved successfully.'); onDone && onDone(); }}
      onCancel={() => onDone ? onDone() : null} />
  );
}

/* ---------- reorderable item list ---------- */
function useDnd(items, commit) {
  const from = useRef(null);
  const [over, setOver] = useState(null);
  const bind = (i) => ({
    draggable: true,
    onDragStart: (e) => { from.current = i; e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', String(i)); } catch { /* */ } },
    onDragOver: (e) => { e.preventDefault(); setOver(i); },
    onDragLeave: () => setOver((o) => (o === i ? null : o)),
    onDrop: (e) => { e.preventDefault(); const a = from.current; setOver(null); if (a == null || a === i) return; const n = [...items]; const [m] = n.splice(a, 1); n.splice(i, 0, m); commit(n); from.current = null; },
    onDragEnd: () => { from.current = null; setOver(null); }
  });
  return { bind, over };
}

/* ---------- generic collection manager ---------- */
export function ListManager({ cfgKey, title, sub, subtitle }) {
  const cfg = LISTS[cfgKey];
  const { notify, ask } = useAdmin();
  const items = useCms(cfg.coll);
  const defaults = cms.getDefault(cfg.coll);
  const [edit, setEdit] = useState(null);       // {item, isNew}
  const [view, setView] = useState(null);
  const [q, setQ] = useState(''), [st, setSt] = useState('all');
  const commit = (next, msg) => { try { cms.set(cfg.coll, next); if (msg) { cms.log(msg); } } catch { notify('Could not save: browser storage is full. Use smaller images.', 'err'); return false; } return true; };
  const dnd = useDnd(items, (n) => commit(n, cfg.singular + ' order updated') && notify('Order saved.'));
  const shown = items.map((it, i) => [it, i]).filter(([it]) => (st === 'all' || it.status === st) && (!q || (strip(it[cfg.title]) + ' ' + cfg.sub.map((k) => it[k]).join(' ')).toLowerCase().includes(q.toLowerCase())));
  const label = (it) => strip(it[cfg.title]).slice(0, 90) || 'Untitled';

  const del = async (it) => { if (await ask({ title: 'Delete ' + cfg.singular.toLowerCase() + '?', text: 'Are you sure you want to delete this content?' })) { if (commit(items.filter((x) => x.id !== it.id), cfg.singular + ' deleted: ' + label(it))) notify(cfg.singular + ' deleted.'); } };
  const dup = (it) => { const c = { ...it, id: uid(cfg.coll.slice(0, 3)), [cfg.title]: it[cfg.title] + (cfg.title === 'text' ? '' : ' (copy)'), status: 'draft' }; if (commit([...items.slice(0, items.indexOf(it) + 1), c, ...items.slice(items.indexOf(it) + 1)], cfg.singular + ' duplicated: ' + label(it))) notify('Duplicated as a draft.'); };
  const setStatus = (it, s) => { if (commit(items.map((x) => (x.id === it.id ? { ...x, status: s } : x)), cfg.singular + ' ' + s + ': ' + label(it))) notify(s === 'published' ? 'Published. Visible on the website.' : s === 'closed' ? 'Position closed.' : 'Set to ' + s + '. Hidden from the website.'); };
  const move = (i, d) => { const j = i + d; if (j < 0 || j >= items.length) return; const n = [...items]; [n[i], n[j]] = [n[j], n[i]]; commit(n, cfg.singular + ' order updated'); };
  const restore = async () => { if (await ask({ title: 'Restore default content?', text: 'This replaces ALL ' + cfg.singular.toLowerCase() + ' entries with the original website defaults. Your edits will be lost.', okLabel: 'Restore', danger: false })) { cms.reset(cfg.coll); cms.log(cfg.singular + ' defaults restored'); notify('Default content restored.'); } };
  const save = (d) => {
    const row = { ...d }; if (cfg.fields.some((f) => f.k === 'slug') && !row.slug) row.slug = slugify(row.title);
    const next = edit.isNew ? [...items, row] : items.map((x) => (x.id === row.id ? row : x));
    if (commit(next, cfg.singular + (edit.isNew ? ' created: ' : ' updated: ') + label(row))) { notify('Changes saved successfully.'); setEdit(null); }
  };

  if (edit) {
    const dflt = defaults.find((x) => x.id === edit.item.id);
    return <Form title={(edit.isNew ? 'Add ' : 'Edit ') + cfg.singular} crumb={title} fields={cfg.fields} initial={edit.item} defaults={dflt || edit.item} onSave={save} onCancel={() => setEdit(null)} />;
  }
  const statuses = ['all', ...new Set([...cfg.fields.find((f) => f.k === 'status').opts.map((o) => o[0])])];
  return (
    <div>
      <PageHead title={title} sub={sub}>
        <button className="admBtn ghost" onClick={restore}><Icon n="undo" /> Restore defaults</button>
        <button className="admBtn primary" onClick={() => setEdit({ item: { ...blank(cfg.fields), id: uid(cfg.coll.slice(0, 3)), status: 'draft' }, isNew: true })}><Icon n="plus" /> Add {cfg.singular}</button>
      </PageHead>
      <div className="admToolbar">
        <label className="admSearch"><Icon n="search" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={'Search ' + title.toLowerCase()} aria-label="Search" /></label>
        <div className="admTabs" role="tablist">{statuses.map((s) => <button key={s} className={st === s ? 'on' : ''} onClick={() => setSt(s)}>{s === 'all' ? 'All' : s[0].toUpperCase() + s.slice(1)}</button>)}</div>
        <span className="admMute">{shown.length} of {items.length}</span>
      </div>
      <div className="admList">
        {shown.length === 0 && <div className="admEmpty">Nothing here yet. Use “Add {cfg.singular}” to create one.</div>}
        {shown.map(([it, i]) => {
          const img = cfg.img && it[cfg.img];
          return (
            <div className={'admItem' + (dnd.over === i ? ' over' : '')} key={it.id} {...dnd.bind(i)}>
              <span className="admGrip" title="Drag to reorder"><Icon n="drag" /></span>
              {cfg.img !== null && <div className="admThumb">{img && !/^data:application\/pdf/.test(img) ? <img src={img} alt="" loading="lazy" /> : <Icon n={img ? 'doc' : 'folder'} size={22} />}</div>}
              <div className="admItemMain">
                <b>{label(it)}</b>
                <span>{cfg.sub.map((k) => it[k]).filter(Boolean).map((v) => strip(v).slice(0, 70)).join(' · ') || ' '}</span>
              </div>
              <Badge s={it.status} />
              <div className="admActs">
                <button className="admIcoBtn" title="Move up" aria-label="Move up" onClick={() => move(i, -1)}><Icon n="up" size={16} /></button>
                <button className="admIcoBtn" title="Move down" aria-label="Move down" onClick={() => move(i, 1)}><Icon n="down" size={16} /></button>
                <button className="admIcoBtn" title="Preview" aria-label="Preview" onClick={() => setView(it)}><Icon n="eye" size={16} /></button>
                <button className="admIcoBtn" title="Edit" aria-label="Edit" onClick={() => setEdit({ item: it, isNew: false })}><Icon n="edit" size={16} /></button>
                <button className="admIcoBtn" title="Duplicate" aria-label="Duplicate" onClick={() => dup(it)}><Icon n="copy" size={16} /></button>
                {it.status === 'published'
                  ? <button className="admBtn sm ghost" onClick={() => setStatus(it, cfg.fields.find((f) => f.k === 'status').opts.some((o) => o[0] === 'closed') ? 'closed' : 'draft')}>{cfg.coll === 'careers' ? 'Close' : 'Unpublish'}</button>
                  : <button className="admBtn sm" onClick={() => setStatus(it, 'published')}>Publish</button>}
                <button className="admIcoBtn danger" title="Delete" aria-label="Delete" onClick={() => del(it)}><Icon n="trash" size={16} /></button>
              </div>
            </div>
          );
        })}
      </div>
      {view && (
        <div className="admOverlay" onClick={() => setView(null)}>
          <div className="admModal wide" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="admRow between"><h3>Preview · {label(view)}</h3><button className="admIcoBtn" aria-label="Close" onClick={() => setView(null)}><Icon n="x" /></button></div>
            <div className="admPrev">
              {cfg.fields.filter((f) => view[f.k] && view[f.k].length !== 0 && f.k !== 'status').map((f) => (
                <div key={f.k}><small>{f.label}</small>
                  {f.t === 'image' || f.t === 'file' ? <img src={view[f.k]} alt="" /> : f.t === 'gallery' ? <div className="admGal">{view[f.k].map((u, i) => <div className="admGalItem" key={i}><img src={u} alt="" /></div>)}</div> : f.t === 'rich' ? <div className="admRichOut" dangerouslySetInnerHTML={{ __html: view[f.k] }} /> : <p>{String(view[f.k])}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Home sections ---------- */
export function HomeManager() {
  const { notify, ask } = useAdmin();
  const items = useCms('homeSections');
  const defaults = cms.getDefault('homeSections');
  const [edit, setEdit] = useState(null);
  const commit = (n, msg) => { try { cms.set('homeSections', n.map((x, i) => ({ ...x, order: i }))); if (msg) cms.log(msg); return true; } catch { notify('Could not save: browser storage is full.', 'err'); return false; } };
  const dnd = useDnd(items, (n) => commit(n, 'Home section order updated') && notify('Section order saved. The public Home page now follows this order.'));
  const patch = (id, p, msg) => commit(items.map((x) => (x.id === id ? { ...x, ...p } : x)), msg);

  if (edit === 'hero') return <DocEditor docKey="hero" fields={HERO_FIELDS} title="Hero Banner" sub="Home › Hero Banner" onDone={() => setEdit(null)} />;
  if (edit) {
    const dflt = defaults.find((x) => x.id === edit.id);
    const fields = [{ k: 'title', label: 'Section name (admin label)', t: 'text', req: true }, ...LISTS.homeSectionsEdit, { k: 'status', label: 'Status', t: 'select', opts: [['published', 'Published'], ['draft', 'Draft']] }];
    return <Form title={'Edit · ' + edit.title} crumb="Home › Sections" fields={fields} initial={edit} defaults={dflt}
      onSave={(d) => { if (commit(items.map((x) => (x.id === d.id ? d : x)), 'Home section updated: ' + d.title)) { notify('Changes saved successfully.'); setEdit(null); } }} onCancel={() => setEdit(null)} />;
  }
  const remove = async (s) => { if (await ask({ title: 'Remove this section from the website?', text: 'Are you sure you want to delete this content? Default website sections are not destroyed: “' + s.title + '” is hidden and can be restored at any time.', okLabel: 'Delete' })) { patch(s.id, { enabled: false, status: 'draft' }, 'Home section removed from display: ' + s.title) && notify('Section removed from display. You can restore it.'); } };
  const restoreOne = async (s) => { const d = defaults.find((x) => x.id === s.id); if (d && (await ask({ title: 'Restore default?', text: 'Restore “' + s.title + '” to its default content and show it again?', okLabel: 'Restore', danger: false }))) { commit(items.map((x) => (x.id === s.id ? { ...d } : x)), 'Home section restored: ' + s.title) && notify('Default restored.'); } };
  const restoreAll = async () => { if (await ask({ title: 'Restore all Home sections?', text: 'Order, visibility and content of every Home section return to the website defaults.', okLabel: 'Restore all', danger: false })) { cms.reset('homeSections'); cms.reset('hero'); cms.log('Home page defaults restored'); notify('Home page defaults restored.'); } };
  const move = (i, d) => { const j = i + d; if (j < 0 || j >= items.length) return; const n = [...items]; [n[i], n[j]] = [n[j], n[i]]; commit(n, 'Home section order updated'); };
  return (
    <div>
      <PageHead title="Home Page" sub="Every section of the public Home page. Drag to reorder, switch off to hide.">
        <button className="admBtn ghost" onClick={restoreAll}><Icon n="undo" /> Restore all defaults</button>
        <a className="admBtn" href="/" target="_blank" rel="noreferrer"><Icon n="ext" /> View website</a>
      </PageHead>
      <div className="admList">
        {items.map((s, i) => (
          <div className={'admItem sec' + (dnd.over === i ? ' over' : '') + (s.enabled ? '' : ' off')} key={s.id} {...dnd.bind(i)}>
            <span className="admGrip" title="Drag to reorder"><Icon n="drag" /></span>
            <div className="admNum">{String(i + 1).padStart(2, '0')}</div>
            {s.image && <div className="admThumb"><img src={s.image} alt="" loading="lazy" /></div>}
            <div className="admItemMain">
              <b>{s.title}</b>
              <span>{s.linked ? 'Live on the website' : 'Not on the public Home page yet (content saved)'}{s.description ? ' · ' + s.description : ''}</span>
            </div>
            <Badge s={s.enabled ? s.status : 'draft'} />
            <div className="admSw"><Toggle on={s.enabled} label={'Show ' + s.title} onChange={(v) => patch(s.id, { enabled: v, status: v ? 'published' : 'draft' }, 'Home section ' + (v ? 'enabled' : 'disabled') + ': ' + s.title) && notify(v ? 'Section enabled.' : 'Section hidden from the website.')} /></div>
            <div className="admActs">
              <button className="admIcoBtn" aria-label="Move up" onClick={() => move(i, -1)}><Icon n="up" size={16} /></button>
              <button className="admIcoBtn" aria-label="Move down" onClick={() => move(i, 1)}><Icon n="down" size={16} /></button>
              <button className="admBtn sm" onClick={() => setEdit(s.id === 'hero' ? 'hero' : s)}><Icon n="edit" size={15} /> Edit</button>
              <button className="admIcoBtn" title="Reset to default" aria-label="Reset to default" onClick={() => restoreOne(s)}><Icon n="undo" size={16} /></button>
              <button className="admIcoBtn danger" title="Delete" aria-label="Delete" onClick={() => remove(s)}><Icon n="trash" size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Contact (+ inquiries notice) ---------- */
export function ContactManager() {
  return (
    <div>
      <DocEditor docKey="contact" fields={CONTACT_FIELDS} title="Contact Us" sub="Company contact details shown on the website footer and Contact page." />
      <div className="admCard admInquiry">
        <h3>Contact / inquiry submissions</h3>
        <p>Form submissions will be listed here once a backend (Firebase) is connected. The current website contact form has no storage behind it, so there are no submissions to show yet.</p>
      </div>
    </div>
  );
}

/* ---------- Dashboard ---------- */
export function Dashboard() {
  const home = useCms('homeSections'), proj = useCms('projects'), blogs = useCms('blogs'), tst = useCms('testimonials'), par = useCms('partners'), faq = useCms('faq');
  const log = useCmsLog();
  const pubd = home.filter((s) => s.enabled && s.status === 'published').length;
  const cards = [['Website sections', home.length], ['Published sections', pubd], ['Draft sections', home.length - pubd], ['Projects', proj.length], ['Blogs', blogs.length], ['Testimonials', tst.length], ['Partners', par.length], ['FAQs', faq.length]];
  const quick = [['Edit Home Page', '/admin/home', 'home'], ['Add Project', '/admin/projects', 'folder'], ['Add Blog', '/admin/blogs', 'doc'], ['Add Testimonial', '/admin/testimonials', 'quote'], ['Add FAQ', '/admin/faq', 'help'], ['Update Contact Details', '/admin/contact', 'mail']];
  return (
    <div>
      <PageHead title="Dashboard" sub="Overview of your Green Energy website content."><a className="admBtn" href="/" target="_blank" rel="noreferrer"><Icon n="ext" /> View website</a></PageHead>
      <div className="admStats">{cards.map(([l, v]) => <div className="admStat" key={l}><b>{v}</b><span>{l}</span></div>)}</div>
      <div className="admCols">
        <div className="admCard">
          <h3>Quick actions</h3>
          <div className="admQuick">{quick.map(([l, p, ic]) => <button key={l} onClick={() => nav(p)}><Icon n={ic} /> {l}</button>)}</div>
        </div>
        <div className="admCard">
          <h3>Recent content updates</h3>
          {log.length === 0 ? <p className="admMute">No edits yet. Changes you save will appear here.</p> : (
            <div className="admTable">{log.slice(0, 8).map((l, i) => <div key={i}><span><b>{l.what}</b></span><span>{fmt(l.when)}</span><span>{l.admin}</span><span><Badge s={l.status === 'Saved' ? 'published' : 'draft'} /></span></div>)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
export { NAV };
