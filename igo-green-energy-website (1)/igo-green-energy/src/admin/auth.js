/* Admin sign-in against the server (HTTP-only session cookie, scrypt-hashed passwords). */
import { api } from './api.js';
export async function getSession() { try { return (await api('/me')).user; } catch { return null; } }
export async function signIn(email, password) { return (await api('/login', { method: 'POST', body: { email, password } })).user; }
export const signOut = () => api('/logout', { method: 'POST' }).catch(() => {});
