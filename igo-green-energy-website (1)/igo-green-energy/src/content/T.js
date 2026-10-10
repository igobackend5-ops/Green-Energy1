/* T(key, default): returns the admin-edited value for `key` if there is one, otherwise the
   default text/image written in the code. Edited values are stored in the "content" document. */
import { cms } from '../admin/store.js';

export function T(key, def) {
  const c = cms.get('content');
  const v = c && c[key];
  return typeof v === 'string' && v !== '' ? v : def;
}
