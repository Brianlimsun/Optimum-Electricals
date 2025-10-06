import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'

interface PaymentData {
  customerName: string
  customerPhone: string
  locality: string
  landmark: string
  fullAddress: string
  problemDescription: string
  preferredTimeSlot: string
  bookingDate: string
  isUrgent: boolean
  totalFee: number
  images: any[]
  timestamp: string
}

function ConfirmedPayment() {
  const navigate = useNavigate()
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)

  useEffect(() => {
    // Scroll to top immediately when component mounts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
    
    // Get payment data from sessionStorage (passed from payment confirmation)
    const storedData = sessionStorage.getItem('confirmedPaymentData')
    if (storedData) {
      setPaymentData(JSON.parse(storedData))
    }
  }, [])

  if (!paymentData) {
    return (
      <div className="page-container">
        <Navbar />

        <div className="payment-confirmation">
          <div className="error-container">
            <div className="error-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <h2 className="error-title">No Payment Data Found</h2>
            <p className="error-description">
              It looks like you haven't completed a payment yet. Please complete your booking and payment first.
            </p>
            <div className="error-actions">
              <button onClick={() => navigate('/booking')} className="btn btn-primary">
                Start Booking
              </button>
              <button onClick={() => navigate('/')} className="btn btn-secondary">
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Navbar />

      <div className="payment-confirmation">
        <div className="success-container">
          <div className="success-icon">
            <CheckCircle className="w-16 h-16" />
          </div>
          <h1>Payment Confirmed!</h1>
          <p className="success-message">
            Thank you for your payment! Your booking has been confirmed.
          </p>
          <div className="confirmation-details">
            <h3>Booking Details:</h3>
            <div className="detail-item">
              <span className="label">Customer:</span>
              <span className="value">{paymentData.customerName}</span>
            </div>
            <div className="detail-item">
              <span className="label">Phone:</span>
              <span className="value">{paymentData.customerPhone}</span>
            </div>
            <div className="detail-item">
              <span className="label">Location:</span>
              <span className="value">{paymentData.locality}, {paymentData.fullAddress}</span>
            </div>
            <div className="detail-item">
              <span className="label">Date & Time:</span>
              <span className="value">{paymentData.bookingDate} - {paymentData.preferredTimeSlot}</span>
            </div>
            <div className="detail-item">
              <span className="label">Amount Paid:</span>
              <span className="value">₹{paymentData.totalFee}</span>
            </div>
          </div>
          <div className="next-steps">
            <h3>What's Next?</h3>
            <p>Our team will contact you shortly to confirm your appointment and provide any additional details.</p>
            <p>You can expect a call within 30 minutes during business hours.</p>
          </div>
          <button onClick={() => navigate('/')} className="home-link">← Back to Home</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmedPayment
