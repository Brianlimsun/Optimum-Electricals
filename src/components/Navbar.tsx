import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (menuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger')) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [menuOpen])

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
        <button 
          className="hamburger" 
          aria-label={menuOpen ? "Close Menu" : "Open Menu"} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <Link 
            to="/privacy-policy" 
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            Privacy Policy
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar
