import { Routes, Route, Navigate } from 'react-router-dom'
import LeadCapture from './pages/LeadCapture'
import BookingForm from './pages/BookingForm'
import PaymentConfirmation from './pages/PaymentConfirmation'
import MyBookings from './pages/MyBookings'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LeadCapture />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/payment" element={<PaymentConfirmation />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
