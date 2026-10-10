/* ---------------------------------------------------------------------------
   CMS data layer.
   All admin + public-site reads/writes go through `cms` below. Today it is backed
   by localStorage; to move to Firebase, re-implement ONLY the adapter functions
   (load / persist / remoteSubscribe) – no screen needs to change.
--------------------------------------------------------------------------- */
import { useSyncExternalStore } from 'react';
import { DEFAULTS } from './defaults.js';

const KEY = 'ge_cms_v1';
const subs = new Set();
const NOLOG = [];
let state = load();

/* ---- adapter (swap for Firestore) ---- */
function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } }
function persist(next) { localStorage.setItem(KEY, JSON.stringify(next)); }
function remoteSubscribe(cb) { const f = (e) => { if (e.key === KEY || e.key === null) cb(); }; addEventListener('storage', f); return () => removeEventListener('storage', f); }
/* -------------------------------------- */

const emit = () => subs.forEach((f) => f());
remoteSubscribe(() => { state = load(); emit(); });

export const cms = {
  get: (k) => (k in state ? state[k] : DEFAULTS[k]),
  getDefault: (k) => DEFAULTS[k],
  isModified: (k) => k in state,
  set(k, v) { const next = { ...state, [k]: v }; persist(next); state = next; emit(); },
  reset(k) { const { [k]: _x, ...rest } = state; persist(rest); state = rest; emit(); },
  subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  log(what, status = 'Saved') {
    const l = (state.__log || []).slice(0, 29);
    const next = { ...state, __log: [{ when: new Date().toISOString(), what, status, admin: 'Admin' }, ...l] };
    try { persist(next); state = next; emit(); } catch { /* log is best-effort */ }
  },
  logs: () => state.__log || NOLOG
};

export function useCms(k) {
  return useSyncExternalStore(cms.subscribe, () => cms.get(k), () => DEFAULTS[k]);
}
export function useCmsLog() {
  return useSyncExternalStore(cms.subscribe, () => cms.logs(), () => NOLOG);
}

export const uid = (p = 'id') => p + '-' + Math.random().toString(36).slice(2, 8);
