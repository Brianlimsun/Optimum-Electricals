import React, { useEffect, useState } from 'react'

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
  const [bookings, setBookings] = useState<StoredBooking[]>([])

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
      <div className="booking-form">
        <div className="booking-header">
          <a href="/" className="back-link">←</a>
          <div className="header-content">
            <h1>
              <span className="book-text">My</span>
              <span className="service-text"> Bookings</span>
            </h1>
            <p className="greeting">No bookings saved yet.</p>
          </div>
        </div>
        <a href="/booking" className="home-link">Book a Service</a>
      </div>
    )
  }

  return (
    <div className="booking-form">
      <div className="booking-header">
        <a href="/" className="back-link">←</a>
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
          <div className="detail-item"><span className="label">Urgent</span><span className="value">{b.isUrgent ? 'Yes (+₹100)' : 'No'}</span></div>
          <div className="detail-item"><span className="label">Total</span><span className="value">₹{b.totalFee}</span></div>
        </div>
      ))}

      <a href="/" className="home-link">← Make another booking</a>
    </div>
  )
}

export default MyBookings


