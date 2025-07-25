import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 3000,      // Try port 3000 first
    strictPort: false // Allow trying other ports if 3000 is taken
  },
});
