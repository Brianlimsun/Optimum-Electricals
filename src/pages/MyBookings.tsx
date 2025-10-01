import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type StoredBooking = {
  id: string
  savedAt: string
  customerName: string
  customerPhone: string
  locality: string
  fullAddress: string
  problemDescription: string
  preferredTimeSlot: string
  bookingDate: string
  isUrgent: boolean
  totalFee: number
}

const STORAGE_KEY = 'optimum:bookings'

function MyBookings() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<StoredBooking[]>([])
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const list = JSON.parse(raw) as StoredBooking[]
        // newest first
        setBookings([...list].reverse())
      }
    } catch (e) {
      console.error('Failed to read bookings:', e)
    }
  }, [])

  if (!bookings.length) {
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
              <a 
                href="/privacy-policy" 
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = '/privacy-policy'
                }}
              >
                Privacy Policy
              </a>
            </nav>
            <button className="hamburger" aria-label="Open Menu" onClick={() => setMenuOpen((v) => !v)}>
              <span />
              <span />
              <span />
            </button>
          </div>
          {menuOpen && (
            <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
              <a 
                href="/privacy-policy" 
                className="mobile-link"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = '/privacy-policy'
                }}
              >
                Privacy Policy
              </a>
            </div>
          )}
        </header>

        <div className="booking-form">
          <div className="booking-header">
            <button onClick={() => navigate('/')} className="back-link">←</button>
            <div className="header-content">
              <h1>
                <span className="book-text">My</span>
                <span className="service-text"> Bookings</span>
              </h1>
              <p className="greeting">No bookings saved yet.</p>
            </div>
          </div>
          <button onClick={() => navigate('/booking')} className="home-link">Book a Service</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <header className="hero-nav">
        <div className="nav-pill">
          <div className="brand-pill">
            <img src="public/logo.png" alt="Optimum Electricals" className="brand-icon" />
            <span className="brand-text">Optimum Electricals</span>
          </div>
          <nav className="nav-links">
            <a className="nav-link" href="#">Privacy Policy</a>
          </nav>
          <button className="hamburger" aria-label="Open Menu" onClick={() => setMenuOpen((v) => !v)}>
            <span />
            <span />
            <span />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
            <a className="mobile-link" href="#">Privacy Policy</a>
          </div>
        )}
      </header>

      <div className="booking-form">
        <div className="booking-header">
          <button onClick={() => navigate('/')} className="back-link">←</button>
          <div className="header-content">
            <h1>
              <span className="book-text">My</span>
              <span className="service-text"> Bookings</span>
            </h1>
            <p className="greeting">View details of your saved bookings.</p>
          </div>
        </div>

      {bookings.map((b) => (
        <div className="confirmation-details" key={b.id} style={{ marginBottom: 16 }}>
          <div className="detail-item"><span className="label">Saved</span><span className="value">{new Date(b.savedAt).toLocaleString()}</span></div>
          <div className="detail-item"><span className="label">Customer</span><span className="value">{b.customerName} ({b.customerPhone})</span></div>
          <div className="detail-item"><span className="label">Locality</span><span className="value">{b.locality}</span></div>
          <div className="detail-item"><span className="label">Address</span><span className="value">{b.fullAddress}</span></div>
          <div className="detail-item"><span className="label">Problem</span><span className="value">{b.problemDescription}</span></div>
          <div className="detail-item"><span className="label">Date & Time</span><span className="value">{b.bookingDate} - {b.preferredTimeSlot}</span></div>
          <div className="detail-item"><span className="label">Urgent</span><span className="value">{b.isUrgent ? 'Yes (+₹50)' : 'No'}</span></div>
          <div className="detail-item"><span className="label">Total</span><span className="value">₹{b.totalFee}</span></div>
        </div>
      ))}

        <button onClick={() => navigate('/')} className="home-link">← Make another booking</button>
      </div>
    </div>
  )
}

export default MyBookings


