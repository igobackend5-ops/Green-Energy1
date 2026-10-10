/* Placeholder admin sign-in. NOT secure (client-side only) - replace the three
   functions with Firebase Auth (signInWithEmailAndPassword / signOut / onAuthStateChanged). */
const SK = 'ge_admin_session';
export const DEMO_LOGIN = { email: 'admin@greenenergy.com', password: 'Admin@12345', name: 'Admin' };
export const getSession = () => { try { return JSON.parse(sessionStorage.getItem(SK)); } catch { return null; } };
export async function signIn(email, password) {
  if (email.trim().toLowerCase() === DEMO_LOGIN.email && password === DEMO_LOGIN.password) {
    const u = { email: DEMO_LOGIN.email, name: DEMO_LOGIN.name };
    sessionStorage.setItem(SK, JSON.stringify(u)); return u;
  }
  throw new Error('Invalid email or password.');
}
export const signOut = () => sessionStorage.removeItem(SK);
