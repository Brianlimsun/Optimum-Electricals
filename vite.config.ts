import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use relative paths so the app works on GitHub Pages
  base: '/Optimum-Electricals/',
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
