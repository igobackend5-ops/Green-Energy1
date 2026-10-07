/* Boot: load the website content from the server first, then start the app. */
import { loadContent } from './admin/store.js';
loadContent().finally(() => import('./main.jsx'));
