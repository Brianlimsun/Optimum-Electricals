import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface NavbarProps {
  hideUserMenu?: boolean;
}

function Navbar({ hideUserMenu = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, profile } = useAuth()

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
          <Link to="/about-us" className="nav-link">About Us</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          {user ? (
            !hideUserMenu && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link to="/my-profile" style={{ color: '#E5E7EB', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>
                    {profile?.name ? profile.name.charAt(0).toUpperCase() : (user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U')}
                  </div>
                  <span>{profile?.name?.split(' ')[0] || user.displayName?.split(' ')[0] || 'User'}</span>
                </Link>
              </div>
            )
          ) : (
            <Link to="/login" className="nav-button">Login</Link>
          )}
        </nav>
        <button
          className="hamburger"
          aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <Link
            to="/about-us"
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/blog"
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          {user ? (
            <Link
              to="/my-profile"
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              My Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar
