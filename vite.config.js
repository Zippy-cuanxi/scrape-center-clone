import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// GitHub Pages serves project sites from /<repo>/, so the workflow passes
// BASE_PATH. Local dev keeps "/" and `npm run preview` works as before.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
  },
});
