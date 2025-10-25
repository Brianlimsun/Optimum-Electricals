import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LeadCapture from './pages/LeadCapture'
import Hero from './components/Hero'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import BookingForm from './pages/BookingForm'
import PaymentConfirmation from './pages/PaymentConfirmation'
import ConfirmedPayment from './pages/ConfirmedPayment'
import MyBookings from './pages/MyBookings'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import AboutUs from './pages/AboutUs'
import Blog from './pages/Blog'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

function App() {
  const location = useLocation()
  const showFooter = location.pathname === '/' || location.pathname === '/privacy-policy' || location.pathname === '/terms-of-service' || location.pathname === '/about-us'

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
                <Testimonials />
                <FAQ />
              </div>
            }
          />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/payment" element={<PaymentConfirmation />} />
          <Route path="/confirmed-payment" element={<ConfirmedPayment />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {/* Modern Footer - Only show on homepage and privacy policy */}
      {showFooter && <Footer />}
    </div>
  )
}

export default App
