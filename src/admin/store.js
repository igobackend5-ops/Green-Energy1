/* ---------------------------------------------------------------------------
   CMS data layer, backed by the Green Energy SQL server (/api/content).
   The website calls loadContent() once before it renders; admin edits are saved
   straight to the database with cms.set(). Missing keys fall back to DEFAULTS, so
   the site still renders if the server is offline.
--------------------------------------------------------------------------- */
import { useSyncExternalStore } from 'react';
import { DEFAULTS } from './defaults.js';
import { api } from './api.js';

const subs = new Set();
const NOLOG = [];
let state = {};
let logs = NOLOG;
let status = { online: true, saving: 0, error: '' };
const errSubs = new Set();

const emit = () => subs.forEach((f) => f());
const fail = (msg) => { status = { ...status, error: msg }; errSubs.forEach((f) => f(msg)); };

export async function loadContent() {
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 3500);
  try { state = (await api('/content', { signal: ac.signal })) || {}; status = { ...status, online: true }; }
  catch { state = {}; status = { ...status, online: false }; }
  clearTimeout(t); emit();
}

export const cms = {
  get: (k) => (k in state ? state[k] : DEFAULTS[k]),
  getDefault: (k) => DEFAULTS[k],
  isModified: (k) => k in state,
  /* Optimistic: UI updates at once, the save is sent to the server; a failure raises onError. */
  set(k, v) {
    state = { ...state, [k]: v }; emit();
    status.saving++;
    return api('/content/' + k, { method: 'PUT', body: { value: v } })
      .catch((e) => { fail('Could not save to the server: ' + e.message); throw e; })
      .finally(() => { status.saving--; });
  },
  reset(k) {
    const { [k]: _x, ...rest } = state; state = rest; emit();
    return api('/content/' + k, { method: 'DELETE' }).catch((e) => fail('Could not reset on the server: ' + e.message));
  },
  subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  onError(fn) { errSubs.add(fn); return () => errSubs.delete(fn); },
  log(what, st = 'Saved') {
    api('/activity', { method: 'POST', body: { what, status: st } }).then(() => cms.loadLogs()).catch(() => {});
  },
  async loadLogs() { try { logs = (await api('/activity')).map((l) => ({ what: l.what, status: l.status, admin: l.admin, when: l.when.replace(' ', 'T') + 'Z' })); emit(); } catch { /* ignore */ } },
  logs: () => logs,
  status: () => status
};

export function useCms(k) {
  return useSyncExternalStore(cms.subscribe, () => cms.get(k), () => DEFAULTS[k]);
}
export function useCmsLog() {
  return useSyncExternalStore(cms.subscribe, () => cms.logs(), () => NOLOG);
}

export const uid = (p = 'id') => p + '-' + Math.random().toString(36).slice(2, 8);
