import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Base should be '/' for hash routing to ensure assets load correctly
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist', // default, can be changed if needed
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
  },
});
