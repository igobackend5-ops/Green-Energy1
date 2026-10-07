import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { uploadFile } from './api.js';

/* ---------- toast + confirm context ---------- */
const Ctx = createContext(null);
export const useAdmin = () => useContext(Ctx);

export function AdminProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const t = useRef(0);
  const notify = (msg, kind = 'ok') => { setToast({ msg, kind, id: ++t.current }); const id = t.current; setTimeout(() => setToast((c) => (c && c.id === id ? null : c)), 3600); };
  const ask = (o) => new Promise((res) => setConfirm({ ...o, res }));
  const close = (v) => { confirm.res(v); setConfirm(null); };
  return (
    <Ctx.Provider value={{ notify, ask }}>
      {children}
      {toast && <div className={'admToast ' + toast.kind} role="status">{toast.kind === 'ok' ? <Icon n="check" /> : <Icon n="alert" />}<span>{toast.msg}</span></div>}
      {confirm && (
        <div className="admOverlay" onClick={() => close(false)}>
          <div className="admModal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3>{confirm.title || 'Are you sure?'}</h3>
            <p>{confirm.text}</p>
            <div className="admRow end">
              <button className="admBtn ghost" onClick={() => close(false)}>Cancel</button>
              <button className={'admBtn ' + (confirm.danger === false ? 'primary' : 'danger')} onClick={() => close(true)}>{confirm.okLabel || 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

/* ---------- icons ---------- */
const IC = {
  dash: 'M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z', home: 'M3 11l9-8 9 8M5 10v10h14V10', info: 'M12 8h.01M11 12h1v5h1M12 3a9 9 0 100 18 9 9 0 000-18z',
  tool: 'M14 6a4 4 0 005 5l-9 9-3-3 9-9a4 4 0 00-2-2zM4 20l3-3', folder: 'M3 6h6l2 2h10v11H3z', quote: 'M5 17c0-5 2-8 5-9M13 17c0-5 2-8 5-9', link: 'M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1',
  cert: 'M12 3l2.5 2 3-.5.8 3L21 9.5l-1.700 2.700L20 15l-3 .8-1 3L12 17l-4 1.800-1-3L4 15l.7-2.800L3 9.500l2.700-1L6.500 5.500l3 .5z', doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6', brief: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  mail: 'M3 6h18v13H3zM3 7l9 7 9-7', help: 'M12 17h.01M9.500 9a2.500 2.500 0 115 0c0 1.500-2.500 2-2.500 4M12 3a9 9 0 100 18 9 9 0 000-18z', gear: 'M12 9a3 3 0 100 6 3 3 0 000-6zM19 12l2-1-1-3-2.200.3-1.300-1.800.5-2.200-3-1-1 2h-2l-1-2-3 1 .5 2.200L5.700 8.300 3.500 8l-1 3 2 1v2l-2 1 1 3 2.200-.3 1.300 1.800-.5 2.200 3 1 1-2h2l1 2 3-1-.5-2.200 1.300-1.800 2.200.3 1-3-2-1z',
  logout: 'M9 4H5v16h4M16 8l4 4-4 4M20 12H9', menu: 'M4 6h16M4 12h16M4 18h16', x: 'M6 6l12 12M18 6L6 18', search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5', bell: 'M6 16V11a6 6 0 0112 0v5l2 2H4zM10 20a2 2 0 004 0',
  plus: 'M12 5v14M5 12h14', edit: 'M4 20h4L19 9l-4-4L4 16zM13 7l4 4', trash: 'M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13', copy: 'M9 9h11v11H9zM5 15V4h11', eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 100 6 3 3 0 000-6z',
  drag: 'M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01', check: 'M5 12.500l4.500 4.500L19 7.500', alert: 'M12 8v5M12 17h.01M12 3l10 18H2z', up: 'M6 14l6-6 6 6', down: 'M6 10l6 6 6-6', upload: 'M12 16V4M7 9l5-5 5 5M4 20h16',
  undo: 'M9 14L4 9l5-5M4 9h10a6 6 0 010 12h-3', ext: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6', globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18', lock: 'M6 11h12v9H6zM8 11V8a4 4 0 018 0v3', users: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 11a2.500 2.500 0 100-5M18 15c2 .5 3 2 3 5', inbox: 'M3 13l3-8h12l3 8v6H3zM3 13h5l1 3h6l1-3h5', img: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 9h.01', phone: 'M5 4h4l2 5-2.500 1.500a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z', list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01', layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5'
};
export const Icon = ({ n, size = 18 }) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={IC[n] || IC.doc} /></svg>);

/* ---------- small pieces ---------- */
export const Badge = ({ s }) => <span className={'admBadge ' + (s || 'draft')}>{s === 'published' ? 'Published' : s === 'draft' ? 'Draft' : s === 'scheduled' ? 'Scheduled' : s === 'closed' ? 'Closed' : s || 'Draft'}</span>;
export const Toggle = ({ on, onChange, label }) => (
  <button type="button" role="switch" aria-checked={!!on} aria-label={label} className={'admSwitch' + (on ? ' on' : '')} onClick={() => onChange(!on)}><i /></button>
);

/* ---------- image / file field ---------- */
const OK_IMG = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX = 8 * 1024 * 1024;
export function ImageField({ value, onChange, defaultValue = '', rec = '', accept = 'image', label }) {
  const { notify } = useAdmin();
  const ref = useRef(null);
  const types = accept === 'file' ? [...OK_IMG, 'application/pdf'] : OK_IMG;
  const [busy, setBusy] = useState(false);
  const pick = async (e) => {
    const f = e.target.files?.[0]; e.target.value = '';
    if (!f) return;
    if (!types.includes(f.type)) { notify('Unsupported file. Use ' + (accept === 'file' ? 'JPG, PNG, WEBP, GIF or PDF.' : 'JPG, PNG, WEBP or GIF.'), 'err'); return; }
    if (f.size > MAX) { notify('File is too large (' + (f.size / 1048576).toFixed(1) + ' MB). Maximum is 8 MB.', 'err'); return; }
    setBusy(true);
    try { onChange(await uploadFile(f)); notify('File uploaded.'); } catch (x) { notify('Upload failed: ' + x.message, 'err'); }
    setBusy(false);
  };
  const isPdf = /^data:application\/pdf/.test(value || '') || /\.pdf$/i.test(value || '');
  return (
    <div className="admImg">
      <div className="admImgBox">
        {value ? (isPdf ? <div className="admPdf"><Icon n="doc" size={34} /><span>PDF document</span></div> : <img src={value} alt={label || 'Preview'} />) : <div className="admNoImg"><Icon n="upload" size={26} /><span>No file</span></div>}
      </div>
      <div className="admImgSide">
        <div className="admRow wrap">
          <button type="button" className="admBtn" onClick={() => ref.current.click()}><Icon n="upload" /> {busy ? 'Uploading…' : value ? 'Replace' : 'Upload'}</button>
          {value && <button type="button" className="admBtn ghost" onClick={() => onChange('')}><Icon n="trash" /> Remove</button>}
          {value && <a className="admBtn ghost" href={value} target="_blank" rel="noreferrer"><Icon n="eye" /> Preview</a>}
          <button type="button" className="admBtn ghost" onClick={() => onChange(defaultValue)} disabled={value === defaultValue}><Icon n="undo" /> Reset</button>
        </div>
        <small>{rec && 'Recommended: ' + rec + '. '}JPG, PNG or WEBP{accept === 'file' ? ' or PDF' : ''}, max 8 MB. Shown at its original aspect ratio (no cropping).</small>
        <input ref={ref} type="file" hidden accept={types.join(',')} onChange={pick} />
      </div>
    </div>
  );
}

export function GalleryField({ value = [], onChange, rec }) {
  const { notify } = useAdmin();
  const ref = useRef(null);
  const add = async (e) => {
    const files = [...(e.target.files || [])]; e.target.value = '';
    for (const f of files) {
      if (!OK_IMG.includes(f.type)) { notify(f.name + ': unsupported type.', 'err'); continue; }
      if (f.size > MAX) { notify(f.name + ': larger than 8 MB.', 'err'); continue; }
      try { const u = await uploadFile(f); onChange((cur) => [...cur, u]); } catch (x) { notify(f.name + ': ' + x.message, 'err'); }
    }
  };
  return (
    <div className="admGal">
      {value.map((u, i) => (<div className="admGalItem" key={i}><img src={u} alt="" /><button type="button" aria-label="Remove image" onClick={() => onChange(value.filter((_, j) => j !== i))}><Icon n="x" size={14} /></button></div>))}
      <button type="button" className="admGalAdd" onClick={() => ref.current.click()}><Icon n="plus" size={22} /><span>Add images</span></button>
      <input ref={ref} type="file" multiple hidden accept={OK_IMG.join(',')} onChange={add} />
      {rec && <small className="admGalHint">Recommended: {rec}. JPG/PNG/WEBP, max 8 MB each.</small>}
    </div>
  );
}

/* ---------- rich text ---------- */
const clean = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/\son\w+="[^"]*"/gi, '').replace(/javascript:/gi, '');
export function RichText({ value, onChange }) {
  const el = useRef(null);
  useEffect(() => { if (el.current && el.current.innerHTML !== (value || '')) el.current.innerHTML = value || ''; }, [value]);
  const run = (c, a) => { el.current.focus(); document.execCommand(c, false, a); onChange(clean(el.current.innerHTML)); };
  const link = () => { const u = prompt('Link URL (https://…)'); if (u) run('createLink', u); };
  const B = ({ c, a, t, l }) => <button type="button" className="admRtBtn" title={t} onMouseDown={(e) => e.preventDefault()} onClick={() => run(c, a)}>{l}</button>;
  return (
    <div className="admRt">
      <div className="admRtBar">
        <B c="bold" t="Bold" l={<b>B</b>} /><B c="italic" t="Italic" l={<i>I</i>} /><B c="underline" t="Underline" l={<u>U</u>} />
        <B c="formatBlock" a="h2" t="Heading" l="H2" /><B c="formatBlock" a="h3" t="Subheading" l="H3" /><B c="formatBlock" a="p" t="Paragraph" l="¶" />
        <B c="insertUnorderedList" t="Bullet list" l="• List" /><B c="insertOrderedList" t="Numbered list" l="1. List" />
        <button type="button" className="admRtBtn" title="Link" onMouseDown={(e) => e.preventDefault()} onClick={link}>Link</button>
        <B c="removeFormat" t="Clear formatting" l="Clear" />
      </div>
      <div ref={el} className="admRtBody" contentEditable suppressContentEditableWarning onInput={() => onChange(clean(el.current.innerHTML))} />
    </div>
  );
}

/* ---------- generic field renderer ---------- */
export function Field({ f, value, onChange, defaults }) {
  const id = 'f_' + f.k;
  const set = (v) => onChange(f.k, v);
  let ctl;
  switch (f.t) {
    case 'textarea': ctl = <textarea id={id} rows={f.rows || 4} value={value ?? ''} placeholder={f.ph} onChange={(e) => set(e.target.value)} />; break;
    case 'lines': ctl = <textarea id={id} rows={f.rows || 5} value={value ?? ''} placeholder={f.ph || 'One item per line'} onChange={(e) => set(e.target.value)} />; break;
    case 'rich': ctl = <RichText value={value} onChange={set} />; break;
    case 'image': ctl = <ImageField value={value} onChange={set} defaultValue={defaults?.[f.k] ?? ''} rec={f.rec} label={f.label} />; break;
    case 'file': ctl = <ImageField value={value} onChange={set} defaultValue={defaults?.[f.k] ?? ''} rec={f.rec} accept="file" label={f.label} />; break;
    case 'gallery': ctl = <GalleryField value={value || []} onChange={(v) => set(typeof v === 'function' ? v(value || []) : v)} rec={f.rec} />; break;
    case 'toggle': ctl = <div className="admRow"><Toggle on={value} onChange={set} label={f.label} /><span className="admMute">{value ? 'On' : 'Off'}</span></div>; break;
    case 'select': ctl = <select id={id} value={value ?? ''} onChange={(e) => set(e.target.value)}>{f.opts.map((o) => { const [v, l] = Array.isArray(o) ? o : [o, o]; return <option key={v} value={v}>{l}</option>; })}</select>; break;
    case 'date': ctl = <input id={id} type="date" value={value ?? ''} onChange={(e) => set(e.target.value)} />; break;
    case 'number': ctl = <input id={id} type="number" value={value ?? ''} min={f.min} max={f.max} step={f.step} onChange={(e) => set(e.target.value === '' ? '' : Number(e.target.value))} />; break;
    case 'range': ctl = <div className="admRow"><input id={id} type="range" min={f.min} max={f.max} step={f.step || 1} value={value ?? 0} onChange={(e) => set(Number(e.target.value))} /><span className="admMute">{value}{f.unit}</span></div>; break;
    case 'color': ctl = <div className="admRow"><input id={id} type="color" value={value || '#1d7a37'} onChange={(e) => set(e.target.value)} className="admColor" /><input type="text" value={value ?? ''} onChange={(e) => set(e.target.value)} className="admColorTxt" aria-label={f.label + ' hex'} /></div>; break;
    case 'url': ctl = <input id={id} type="text" inputMode="url" value={value ?? ''} placeholder={f.ph || 'https://…  or  /page'} onChange={(e) => set(e.target.value)} />; break;
    case 'email': ctl = <input id={id} type="email" value={value ?? ''} onChange={(e) => set(e.target.value)} />; break;
    default: ctl = <input id={id} type="text" value={value ?? ''} placeholder={f.ph} onChange={(e) => set(e.target.value)} />;
  }
  return (
    <div className={'admField' + (f.wide || ['rich', 'image', 'file', 'gallery', 'textarea', 'lines'].includes(f.t) ? ' wide' : '')}>
      <label htmlFor={id}>{f.label}{f.req && <em>*</em>}</label>
      {ctl}
      {f.help && <small>{f.help}</small>}
    </div>
  );
}
