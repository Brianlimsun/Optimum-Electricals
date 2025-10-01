import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, ClipboardList } from 'lucide-react'

// Do not persist name/phone; require manual entry each time

function LeadCapture() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [hasBookings, setHasBookings] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('optimum:bookings')
      const list = raw ? JSON.parse(raw) : []
      setHasBookings(Array.isArray(list) && list.length > 0)
    } catch {}
  }, [])

  function validate(): boolean {
    const newErrors: { name?: string; phone?: string } = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    const digits = phone.replace(/\D/g, '')
    if (digits.length !== 10) newErrors.phone = 'Enter a 10-digit phone number'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    try {
      sessionStorage.setItem('lead', JSON.stringify({ name, phone }))
    } catch {}
    navigate('/booking')
  }

  return (
    <div className="page-container">
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

      <div id="lead" className="lead-capture">
        <div className="icon" style={{ width: 80, height: 80, background: 'transparent', boxShadow: 'none', padding: 0 }}>
          <img
            src="/logo.png"
            alt="Optimum Electricals"
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      <h1>Optimum Electricals</h1>
      <p className="tagline">Professional electrician services at your doorstep</p>

      <form id="booking-form" onSubmit={handleContinue} noValidate className="lead-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            inputMode="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        <button type="submit" className="continue-btn">
          <span>Continue to Booking</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {hasBookings && (
        <div style={{ marginTop: 16 }}>
          <button onClick={() => navigate('/my-bookings')} className="home-link">
            <ClipboardList className="w-5 h-5" /> View My Bookings
          </button>
        </div>
      )}

      <div className="trust-elements">
        <div className="trust-element">
          <CheckCircle className="check-icon" />
          <span>Licensed</span>
        </div>
        <div className="trust-element">
          <CheckCircle className="check-icon" />
          <span>Trusted</span>
        </div>
        <div className="trust-element">
          <CheckCircle className="check-icon" />
          <span>Experienced</span>
        </div>
      </div>
      </div>
    </div>
  )
}

export default LeadCapture


