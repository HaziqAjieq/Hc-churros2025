// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react() ,tailwindcss()],
  base: '/', // if hosted at root
  build: {
    outDir: 'dist', // <-- This is key
    emptyOutDir: true,
  },
});
