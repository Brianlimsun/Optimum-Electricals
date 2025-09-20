import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Determine basename based on the current domain
const getBasename = () => {
  // If we're on the custom domain, use root path
  if (window.location.hostname === 'optimumelectricals.com') {
    return '/'
  }
  // If we're on GitHub Pages, use the repository path
  return '/Optimum-Electricals/'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
