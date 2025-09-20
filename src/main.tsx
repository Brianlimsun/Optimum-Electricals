import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Determine basename based on the current domain
const getBasename = () => {
  const hostname = window.location.hostname
  
  // Debug logging
  console.log('Current hostname:', hostname)
  
  // If we're on the custom domain (including www subdomain), use root path
  if (hostname === 'optimumelectricals.com' || hostname === 'www.optimumelectricals.com') {
    console.log('Using custom domain basename: /')
    return '/'
  }
  // If we're on GitHub Pages, use the repository path
  if (hostname === 'brianlimsun.github.io') {
    console.log('Using GitHub Pages basename: /Optimum-Electricals/')
    return '/Optimum-Electricals/'
  }
  // For local development, use root path
  console.log('Using default basename: /')
  return '/'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
