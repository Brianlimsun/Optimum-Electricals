import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Calendar, Clock, MapPin, Home } from 'lucide-react'
import Navbar from '../components/Navbar'
import confetti from 'canvas-confetti'

interface PaymentData {
    customerName: string
    bookingDate: string
    preferredTimeSlot: string
    locality: string
    totalFee: number
    problemDescription: string
    timestamp: string // booking creation time
    paymentConfirmedAt?: string
}

function ConfirmedPayment() {
    const navigate = useNavigate()
    const [data, setData] = useState<PaymentData | null>(null)

    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0)

        // Load data
        const stored = sessionStorage.getItem('confirmedPaymentData')
        if (stored) {
            setData(JSON.parse(stored))
            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            })
        } else {
            // If no data, redirect home after a short delay or show error
            // Ideally redirect to avoid empty state
            // navigate('/') 
        }
    }, [navigate])

    if (!data) {
        return (
            <div className="page-container">
                <Navbar />
                <div className="confirmed-payment-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <h2>No booking details found</h2>
                    <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '20px' }}>
                        Go Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="page-container">
            <Navbar />

            <div className="confirmed-payment-content" style={{
                maxWidth: '600px',
                margin: '40px auto',
                padding: '30px 20px',
                textAlign: 'center'
            }}>
                <div className="success-icon-wrapper" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '24px'
                }}>
                    <CheckCircle size={80} color="#10B981" />
                </div>

                <h1 style={{ fontSize: '2rem', marginBottom: '16px', color: '#1F2937' }}>
                    Booking Confirmed!
                </h1>

                <p style={{ color: '#6B7280', marginBottom: '32px', fontSize: '1.1rem' }}>
                    Thank you, <strong>{data.customerName}</strong>. Your electrician has been booked successfully.
                </p>

                <div className="booking-card" style={{
                    backgroundColor: '#F3F4F6',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'left',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <h3 style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '12px', marginBottom: '16px', fontSize: '1.1rem', color: '#374151' }}>
                        Booking Details
                    </h3>

                    <div className="detail-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: '#4B5563' }}>
                        <Calendar size={18} style={{ marginRight: '10px' }} />
                        <span>{data.bookingDate}</span>
                    </div>

                    <div className="detail-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: '#4B5563' }}>
                        <Clock size={18} style={{ marginRight: '10px' }} />
                        <span>{data.preferredTimeSlot}</span>
                    </div>

                    <div className="detail-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', color: '#4B5563' }}>
                        <MapPin size={18} style={{ marginRight: '10px' }} />
                        <span>{data.locality}</span>
                    </div>

                    <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#111827' }}>
                        <span>Amount Paid</span>
                        <span>₹{data.totalFee}</span>
                    </div>
                </div>

                <p style={{ marginTop: '24px', color: '#6B7280', fontSize: '0.95rem' }}>
                    We will contact you shortly to confirm the exact arrival time.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="btn btn-primary"
                    style={{
                        marginTop: '32px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '12px 24px',
                        backgroundColor: '#2563EB',
                        color: 'white',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    <Home size={18} style={{ marginRight: '8px' }} />
                    Back to Home
                </button>
            </div>
        </div>
    )
}

export default ConfirmedPayment
