import React, { useState, useEffect } from 'react'
import { CheckCircle, Upload, CreditCard } from 'lucide-react'

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

function PaymentConfirmation() {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  // Compress an image file to a data URL (JPEG) for faster uploads
  function compressImage(file: File, maxSize = 1200, quality = 0.7): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')!
          const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
          const w = Math.round(img.width * scale)
          const h = Math.round(img.height * scale)
          canvas.width = w
          canvas.height = h
          ctx.drawImage(img, 0, 0, w, h)
          const dataUrl = canvas.toDataURL('image/jpeg', quality)
          resolve(dataUrl)
        }
        img.onerror = reject
        img.src = reader.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleCopyUpi = async () => {
    const upi = 'nathpuhil21@oksbi'
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(upi)
        setCopied(true)
        return
      }
    } catch (e) {
      console.warn('Clipboard API unavailable, falling back', e)
    }
    // Fallback for iOS/Safari and insecure contexts
    try {
      const input = document.createElement('input')
      input.value = upi
      document.body.appendChild(input)
      input.select()
      input.setSelectionRange(0, upi.length)
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
    } catch (e) {
      console.error('Fallback copy failed', e)
      setCopied(true) // still show copied to give user feedback
    }
  }


  useEffect(() => {
    // Get payment data from sessionStorage (passed from booking form)
    const storedData = sessionStorage.getItem('bookingData')
    if (storedData) {
      setPaymentData(JSON.parse(storedData))
    }
  }, [])

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPaymentScreenshot(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setScreenshotPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeScreenshot = () => {
    setPaymentScreenshot(null)
    setScreenshotPreview(null)
  }

  const handleFinalSubmit = async () => {
    if (!paymentScreenshot) {
      setError('Please upload payment screenshot to confirm your booking')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      // Compress screenshot to speed up upload
      const screenshotData = await compressImage(paymentScreenshot)

      // Prepare final submission data
      const finalData = {
        ...paymentData,
        paymentScreenshot: {
          name: paymentScreenshot.name || 'payment-screenshot.jpg',
          data: screenshotData,
        },
        paymentConfirmedAt: new Date().toISOString(),
        status: 'payment_confirmed',
      }

      // Submit to Google Apps Script in background (fire-and-forget)
      const webhookUrl = import.meta.env.VITE_APPS_SCRIPT_WEBHOOK
      if (!webhookUrl) {
        console.error('Google Apps Script Webhook URL is not configured. Please check your environment variables.')
        // Don't throw error - let the booking continue even if Google Sheets fails
        // This ensures the payment confirmation still works locally
      } else {
        console.log('Submitting to Google Sheets (background):', finalData)
        // Don't await; let it run in background to make UI instant
        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData),
        }).catch((fetchError) => {
          console.error('Background submit error:', fetchError)
        })
      }

      // Persist booking for later access by the client
      try {
        const STORAGE_KEY = 'optimum:bookings'
        const existing = localStorage.getItem(STORAGE_KEY)
        const list = existing ? JSON.parse(existing) : []
        const record = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          savedAt: new Date().toISOString(),
          ...finalData,
        }
        list.push(record)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
      } catch (e) {
        console.warn('Failed to save booking locally:', e)
      }

      // Instantly show success
      setSuccess(true)
      sessionStorage.removeItem('bookingData')
    } catch (err) {
      console.error('Payment confirmation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to confirm payment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!paymentData) {
    return (
      <div className="payment-confirmation">
        <div className="error-message">
          <p>No booking data found. Please complete the booking form first.</p>
          <a href="./booking" className="back-link">← Back to Booking</a>
        </div>
      </div>
    )
  }

  if (success) {
    return (
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
          <a href="./" className="home-link">← Back to Home</a>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-confirmation">
      <div className="payment-header">
        <a href="./booking" className="back-link">←</a>
        <div className="header-content">
          <h1>
            <span className="payment-text">Payment</span>
            <span className="confirm-text"> Confirmation</span>
          </h1>
          <p className="greeting">Hi {paymentData.customerName}! Please complete your payment to confirm your booking.</p>
        </div>
      </div>

      <div className="payment-content">
        <div className="booking-summary">
          <h3>
            <CheckCircle className="icon" />
            <span>Booking Summary</span>
          </h3>
          <div className="summary-details">
            <div className="summary-item">
              <span className="label">Service Date:</span>
              <span className="value">{paymentData.bookingDate}</span>
            </div>
            <div className="summary-item">
              <span className="label">Time Slot:</span>
              <span className="value">{paymentData.preferredTimeSlot}</span>
            </div>
            <div className="summary-item">
              <span className="label">Location:</span>
              <span className="value">{paymentData.locality}</span>
            </div>
            <div className="summary-item">
              <span className="label">Problem:</span>
              <span className="value">{paymentData.problemDescription}</span>
            </div>
          </div>
        </div>

        <div className="payment-section">
          <h3>
            <CreditCard className="icon" />
            <span>Payment Details</span>
          </h3>
          
          <div className="amount-display">
            <div className="amount-breakdown">
              <div className="amount-item">
                <span>Locality Fee ({paymentData.locality})</span>
                <span>₹{paymentData.totalFee - (paymentData.isUrgent ? 100 : 0)}</span>
              </div>
              {paymentData.isUrgent && (
                <div className="amount-item urgent">
                  <span>Urgent Same Day</span>
                  <span>₹100</span>
                </div>
              )}
              <div className="amount-total">
                <span>Total Amount</span>
                <span>₹{paymentData.totalFee}</span>
              </div>
            </div>
          </div>

          <div className="qr-payment">
            <h4>Scan QR Code to Pay</h4>
            <div className="qr-container">
              <div className="qr-code">
                <img src="./qrcode.png" alt="UPI Payment QR Code" className="qr-image" />
              </div>
              <div className="upi-details">
                <div className="upi-id-row">
                  <span className="upi-id">UPI: nathpuhil21@oksbi</span>
                  <button type="button" className="copy-upi-btn" onClick={handleCopyUpi} aria-label="Copy UPI ID">
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="payment-note">Please pay the exact amount: ₹{paymentData.totalFee}</p>
              </div>
            </div>
          </div>

          <div className="screenshot-upload">
            <h4>
              <Upload className="icon" />
              <span>Upload Payment Screenshot</span>
            </h4>
            <p className="upload-instruction">
              Upload payment screenshot after payment.
            </p>
            
            {!screenshotPreview ? (
              <div className="upload-area">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleScreenshotUpload}
                  id="screenshot-upload"
                />
                <label htmlFor="screenshot-upload" className="upload-label">
                  <Upload className="upload-icon" />
                  <span>Upload or take payment screenshot</span>
                  <span className="file-types">PNG, JPG</span>
                </label>
              </div>
            ) : (
              <div className="screenshot-preview">
                <img src={screenshotPreview} alt="Payment screenshot" />
                <button type="button" onClick={removeScreenshot} className="remove-screenshot">
                  Remove
                </button>
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            onClick={handleFinalSubmit} 
            disabled={submitting || !paymentScreenshot}
            className="confirm-payment-btn"
          >
            {submitting ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentConfirmation
