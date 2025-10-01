import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Squares from './Squares'
import RotatingText from './RotatingText'

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
  }, [])

  // Function to handle smooth scroll to lead capture card
  const scrollToLeadCard = () => {
    const formElement = document.getElementById('booking-form')
    if (formElement) {
      // Get the lead capture card container
      const leadCard = formElement.closest('.lead-capture')
      if (leadCard) {
        // Calculate position relative to the lead capture card
        const cardRect = leadCard.getBoundingClientRect()
        const cardTop = cardRect.top + window.scrollY
        
        // Dynamic offset based on screen size
        const isMobile = window.innerWidth <= 768
        const offset = isMobile ? 100 : 100
        
        // Ensure we don't scroll past the top of the page
        const targetPosition = Math.max(0, cardTop - offset)
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      } else {
        // Fallback to form element if lead card not found
        formElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  return (
    <section className="hero"
      style={{ 
        background: '#0c0a12',
        position: 'relative'
      }}
    >
      <Squares 
        speed={0.2} 
        squareSize={40}
        direction='diagonal' 
        borderColor='rgba(255,255,255,0.1)'
        hoverFillColor='rgba(255,255,255,0.05)'
        className="hero-squares"
      />
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      }}>
      <div className="hero-inner">
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

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line-1">
              <RotatingText
                texts={[
                  "Reliable",
                  "Fast", 
                  "Affordable",
                  "Quality",
                  "Trusted"
                ]}
                mainClassName="rotating-word"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />{' '}<span className="electrical-text">Electrical</span>
            </span>
            <span className="title-line-2">Services Without <br />the Wait</span>
          </h1>
          <div className="hero-actions">
            <a 
              href="#booking-form" 
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToLeadCard()
              }}
            >
              Book Now
            </a>
            <Link to="/privacy-policy" className="btn btn-ghost">Learn More</Link>
          </div>
        </div>

      </div>
      </div>
    </section>
  )
}

export default Hero


