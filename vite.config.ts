import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use relative paths so the app works on GitHub Pages
  base: './',
  plugins: [react()],
})
