import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    'import.meta.env.VITE_INVITATION_URL': JSON.stringify('../?desde=sombrero#tu-casa'),
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        invitation: resolve(import.meta.dirname, 'index.html'),
        hat: resolve(import.meta.dirname, 'sombrero/index.html'),
      },
    },
  },
  test: { environment: 'node', include: ['sombrero/src/**/*.test.ts'] },
});
