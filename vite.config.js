import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import resolve from './resolve';

export default defineConfig({
  define: { 'process.env': {} },
  resolve,
  server: {
    port: 3000,
    open: true,
  },
  clearScreen: false,
  plugins: [react()],
  babel: {
    requireConfigFile: false,
  },
});
