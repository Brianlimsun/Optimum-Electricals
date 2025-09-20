import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // For custom domain, we need to build with root base path
  // For GitHub Pages, we use the repository path
  const isCustomDomain = process.env.VITE_CUSTOM_DOMAIN === 'true'
  
  return {
    // Use root path for custom domain, repository path for GitHub Pages
    base: isCustomDomain ? '/' : '/Optimum-Electricals/',
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
  }
})
