import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LeadCapture from './pages/LeadCapture'
import Hero from './components/Hero'
import BookingForm from './pages/BookingForm'
import PaymentConfirmation from './pages/PaymentConfirmation'
import MyBookings from './pages/MyBookings'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

function App() {
  const location = useLocation()
  const showFooter = location.pathname === '/' || location.pathname === '/privacy-policy'

  return (
    <div className="app-container">
      <ScrollToTop />
      <main className="app-main" style={{ padding: 0 }}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Hero />
                <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
                  <LeadCapture />
                </div>
              </div>
            }
          />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/payment" element={<PaymentConfirmation />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {/* Website Footer - Only show on homepage and privacy policy */}
      {showFooter && (
        <footer className="website-footer">
          <div className="footer-content">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <a href="tel:+916033389808" className="contact-link">
                <span className="contact-label">Call Us</span>
                <span className="contact-value">+91 60333 89808</span>
              </a>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <a href="mailto:optimumbriansun@gmail.com" className="contact-link">
                <span className="contact-label">Email Us</span>
                <span className="contact-value">optimumbriansun@gmail.com</span>
              </a>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="contact-link">
                <span className="contact-label">Visit Us</span>
                <span className="contact-value">Jitbhumi Compound, Rilbong Junction Road, Shillong, Meghalaya 793004, India</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App
