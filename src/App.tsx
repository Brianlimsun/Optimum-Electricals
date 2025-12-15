import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import Login from './pages/Login'
import Signup from './pages/Signup'
import CompleteProfile from './pages/CompleteProfile'
import MyProfile from './pages/MyProfile'
import { AuthProvider } from './contexts/AuthContext'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

function App() {
  const location = useLocation()
  const showFooter = location.pathname === '/' || location.pathname === '/privacy-policy' || location.pathname === '/terms-of-service' || location.pathname === '/about-us'

  return (
    <AuthProvider>
      <div className="app-container">
        <ScrollToTop />
        <main className="app-main" style={{ padding: 0 }}>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Hero />

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
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Modern Footer - Only show on homepage and privacy policy */}
        {showFooter && <Footer />}
      </div>
    </AuthProvider>
  )
}

export default App
