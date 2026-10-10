import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development the website runs on Vite and talks to the Green Energy server on :8787.
export default defineConfig({
  plugins: [react()],
  server: { port: 5174, proxy: { '/api': 'http://localhost:8787', '/uploads': 'http://localhost:8787' } },
  preview: { proxy: { '/api': 'http://localhost:8787', '/uploads': 'http://localhost:8787' } }
});
