/* Thin client for the Green Energy API (same origin; Vite proxies /api in development). */
export async function api(path, { method = 'GET', body, signal } = {}) {
  let res;
  try {
    res = await fetch('/api' + path, { method, credentials: 'same-origin', signal, headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined, body: body !== undefined ? JSON.stringify(body) : undefined });
  } catch {
    const e = new Error('Cannot reach the server. Please check that the Green Energy server is running.'); e.offline = true; throw e;
  }
  let data = null; try { data = await res.json(); } catch { /* non-JSON */ }
  if (!res.ok) { const e = new Error((data && data.error) || 'Request failed (' + res.status + ').'); e.status = res.status; throw e; }
  return data;
}

/* Upload a File to the server; resolves to the public URL (e.g. /uploads/photo-ab12cd34.jpg). */
export function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(new Error('Could not read the file.'));
    r.onload = () => api('/upload', { method: 'POST', body: { name: file.name, dataUrl: String(r.result) } }).then((d) => resolve(d.url), reject);
    r.readAsDataURL(file);
  });
}

/* Public form submission (Quote, Contact, Newsletter, Callback, Career). */
export const submitEnquiry = (payload) => api('/enquiries', { method: 'POST', body: { ...payload, source: location.pathname } });
