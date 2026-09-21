import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
// base: ganti 'portfolio' dengan nama repo GitHub-mu kalau berbeda.
// Contoh: repo anggchr1/portfolio -> base '/portfolio/' (sudah benar).
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
