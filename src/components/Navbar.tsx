import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="hero-nav">
      <div className="nav-pill">
        <a 
          href="/" 
          className="brand-pill"
          onClick={(e) => {
            e.preventDefault()
            if (window.location.pathname === '/') {
              window.location.reload()
            } else {
              window.location.href = '/'
            }
          }}
        >
          <img src="/logo.png" alt="Optimum Electricals" className="brand-icon" />
          <span className="brand-text">Optimum Electricals</span>
        </a>
        <nav className="nav-links">
          <Link to="/privacy-policy" className="nav-link">Privacy Policy</Link>
        </nav>
        <button className="hamburger" aria-label="Open Menu" onClick={() => setMenuOpen((v) => !v)}>
          <span />
          <span />
          <span />
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <Link to="/privacy-policy" className="mobile-link">Privacy Policy</Link>
        </div>
      )}
    </header>
  )
}

export default Navbar
