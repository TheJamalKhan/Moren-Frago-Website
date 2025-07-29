import { defineConfig } from 'vite'; // ✅ Fixes the ReferenceError
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Keep if using TailwindCSS

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // 📦 Split vendor dependencies
        },
      },
    },
    chunkSizeWarningLimit: 1000, // 🚫 Avoids the chunk size warning
  },
});