import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5001,
    open: true,
    origin: 'http://127.0.0.1:5001',
  },
  preview: {
    host: '0.0.0.0',
    port: 3333,
  },
});
