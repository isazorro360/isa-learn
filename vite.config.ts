import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/isa-learn/',
  server: {
    port: 4170,
    host: true,
  },
});
