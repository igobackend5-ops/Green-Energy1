import { useState } from 'react';
import { submitEnquiry } from './admin/api.js';

/* Shared submit state for every public form: { busy, ok, err } + send(payload). */
export function useEnquiry() {
  const [st, setSt] = useState({ busy: false, ok: false, err: '' });
  const send = async (payload) => {
    setSt({ busy: true, ok: false, err: '' });
    try { await submitEnquiry(payload); setSt({ busy: false, ok: true, err: '' }); return true; }
    catch (e) { setSt({ busy: false, ok: false, err: e.message || 'Could not send. Please try again or call us.' }); return false; }
  };
  return [st, send, () => setSt({ busy: false, ok: false, err: '' })];
}
export const HONEY = { name: 'website', tabIndex: -1, autoComplete: 'off', 'aria-hidden': true, style: { position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 } };
