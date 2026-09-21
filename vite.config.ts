import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
// base: ganti 'portofolio' dengan nama repo GitHub-mu kalau berbeda.
// Repo saat ini: anggchr1/portofolio -> base '/portofolio/' (sudah benar).
export default defineConfig({
  base: '/portofolio/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
