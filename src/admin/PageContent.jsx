import React, { useMemo, useState } from 'react';
import { cms, useCms } from './store.js';
import { Icon, ImageField, useAdmin } from './ui.jsx';
import { buildPages } from '../content/pages.js';
import { PageHead } from './modules.jsx';

const PAGES = buildPages();
const looksImg = (e) => e.kind === 'image';

function FieldRow({ e, val, set }) {
  const cur = val ?? e.def; const changed = val != null && val !== e.def;
  const long = String(e.def).length > 70 || /\n/.test(e.def);
  const label = e.key.split('.').slice(-1)[0];
  return (
    <div className={'admField wide pcRow' + (changed ? ' mod' : '')}>
      <label>{looksImg(e) ? 'Image' : 'Text'} <code>{label}</code>{changed && <em className="pcMod">edited</em>}</label>
      {looksImg(e)
        ? <ImageField value={cur} onChange={(v) => set(e.key, v)} defaultValue={e.def} label="Image" />
        : <div className="admRow" style={{ alignItems: 'flex-start' }}>
            {long ? <textarea rows={Math.min(8, Math.ceil(String(cur).length / 80) + 1)} value={cur} onChange={(x) => set(e.key, x.target.value)} />
              : <input type="text" value={cur} onChange={(x) => set(e.key, x.target.value)} />}
            <button type="button" className="admBtn ghost" title="Reset to original" disabled={!changed} onClick={() => set(e.key, null)}><Icon n="undo" /></button>
          </div>}
    </div>
  );
}

export function PageContent() {
  const { notify } = useAdmin();
  const saved = useCms('content') || {};
  const [pi, setPi] = useState(0), [draft, setDraft] = useState(null), [q, setQ] = useState(''), [sec, setSec] = useState(null);
  const work = draft || saved;
  const page = PAGES[pi];
  const set = (k, v) => setDraft((d) => { const n = { ...(d || saved) }; if (v == null || v === '') delete n[k]; else n[k] = v; return n; });
  const dirty = !!draft;
  const editedCount = (p) => p.sections.reduce((n, s) => n + s.items.filter((e) => (draft || saved)[e.key] != null).length, 0);
  const term = q.trim().toLowerCase();
  const results = useMemo(() => !term ? null : PAGES.flatMap((p) => p.sections.flatMap((s) => s.items.filter((e) => (e.def + ' ' + (work[e.key] || '')).toLowerCase().includes(term)).map((e) => ({ p, s, e })))).slice(0, 60), [term, work]);
  const go = (i) => { if (dirty && !confirm('You have unsaved changes on this page. Discard them?')) return; setDraft(null); setPi(i); setSec(null); setQ(''); };
  const save = async () => {
    try { await cms.set('content', draft); cms.log('Page content updated (' + page.name + ')'); setDraft(null); notify('Saved. Refresh the website to see the changes.'); }
    catch { notify('Could not save to the server.', 'err'); }
  };
  const sections = page.sections;
  const cur = sec == null ? null : sections.find((s) => s.title === sec);
  return (
    <div className="admForm">
      <PageHead title="Page Content" sub="Edit every heading, paragraph, button label and image on the website. Pick a page, then a section.">
        <a className="admBtn ghost" href={page.url} target="_blank" rel="noreferrer"><Icon n="ext" /> View page</a>
      </PageHead>
      <div className="admCard pcTop">
        <label className="admSearch wideSearch"><Icon n="search" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search all website text…" aria-label="Search website text" /></label>
        <div className="pcTabs" role="tablist">{PAGES.map((p, i) => <button key={p.name} role="tab" aria-selected={i === pi && !term} className={i === pi && !term ? 'on' : ''} onClick={() => go(i)}>{p.name}{editedCount(p) > 0 && <i>{editedCount(p)}</i>}</button>)}</div>
      </div>
      {results ? (
        <div className="admCard"><h3 className="admGroup">{results.length} match{results.length === 1 ? '' : 'es'}{results.length === 60 ? ' (first 60)' : ''}</h3>
          {results.map(({ p, s, e }) => <div key={e.key}><small className="admMute">{p.name} › {s.title}</small><FieldRow e={e} val={work[e.key]} set={set} /></div>)}</div>
      ) : (
        <div className="pcLayout">
          <div className="admCard pcSecs"><h3 className="admGroup">{page.name} · sections</h3>
            {sections.map((s) => <button key={s.title} className={s.title === sec ? 'on' : ''} onClick={() => setSec(s.title)}>{s.title}<small>{s.items.length}</small></button>)}
          </div>
          <div className="admCard pcFields">
            {!cur ? <p className="admMute">Choose a section on the left to edit its text and images. Each section lists every editable item exactly as it appears on the website.</p>
              : <><h3 className="admGroup">{cur.title}</h3>{cur.items.map((e) => <FieldRow key={e.key} e={e} val={work[e.key]} set={set} />)}</>}
          </div>
        </div>
      )}
      <div className="admBar">
        <button className="admBtn primary" disabled={!dirty} onClick={save}><Icon n="check" /> Save Changes</button>
        <button className="admBtn ghost" disabled={!dirty} onClick={() => setDraft(null)}>Discard</button>
        <span className="admMute">{dirty ? 'Unsaved changes' : 'All changes saved'}</span>
      </div>
    </div>
  );
}
