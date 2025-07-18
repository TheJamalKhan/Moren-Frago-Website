import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Keep this line if you're using TailwindCSS Vite plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // Ensure plugins are correctly listed
  server: {
    port: 5173, // Your frontend development port
    proxy: {    // <-- THIS IS THE MISSING PART
      '/api': { // Any request starting with /api will be intercepted
        target: 'http://localhost:5000', // Forward them to your backend server
        changeOrigin: true, // Needed for virtual hosting sites
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Keeps the /api prefix when forwarding
        secure: false, // Use false if your backend is not HTTPS (common for local development)
      },
    },
  },
});