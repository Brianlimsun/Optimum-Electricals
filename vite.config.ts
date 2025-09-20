import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use root path for custom domain compatibility
  // The React Router will handle the basename dynamically
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        '404': './404.html'
      }
    }
  },
  server: {
    port: 3000
  }
})
