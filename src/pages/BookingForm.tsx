import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, Camera, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import DatePicker from '../components/DatePicker'
import CustomDropdown from '../components/CustomDropdown'

type ImageItem = {
  id: string
  file?: File
  previewUrl: string
  dataUrl?: string
}

// Do not auto-fill name/phone across sessions; require manual entry

const MAX_IMAGES = 6

function compressImage(file: File, maxSize = 800, quality = 0.6): Promise<string> {
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

export default function BookingForm() {
  const navigate = useNavigate()
  const { user, profile } = useAuth()

  // Use profile data if available, otherwise form state
  // const [name, setName] = useState('') // REMOVED
  // const [phone, setPhone] = useState('') // REMOVED

  const [locality, setLocality] = useState('')
  const [landmark, setLandmark] = useState('')
  const [address, setAddress] = useState('')
  const [problem, setProblem] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [images, setImages] = useState<ImageItem[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Redirect logic: Enforce Authentication
  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: '/booking' } });
      return;
    }

    // If authenticated but no profile, redirect to complete profile
    if (profile === null) {
      navigate('/complete-profile');
    }
  }, [user, profile, navigate]);


  const localityOptions = [
    { name: 'Bara Bazar', fee: 300 },
    { name: 'Dhankheti', fee: 300 },
    { name: 'Happy Valley', fee: 300 },
    { name: 'Jalupara', fee: 300 },
    { name: 'Kench Trace', fee: 300 },
    { name: 'Laban', fee: 300 },
    { name: 'Laitumkhrah', fee: 300 },
    { name: 'Lapalang', fee: 300 },
    { name: 'Lawsohtun', fee: 300 },
    { name: 'Malki', fee: 300 },
    { name: 'Mawlai', fee: 300 },
    { name: 'Mawbah', fee: 300 },
    { name: 'Mawprem', fee: 300 },
    { name: 'Nongthymmai', fee: 300 },
    { name: 'Police Bazaar', fee: 300 },
    { name: 'Polo', fee: 300 },
    { name: 'Rilbong', fee: 300 },
    { name: 'Rynjah', fee: 300 },
    { name: 'Other', fee: 300 }
  ]

  // Custom dropdown options for locality
  const localityDropdownOptions = localityOptions.map(option => ({
    value: option.name,
    label: option.name,
    emoji: ''
  }))

  const allTimeSlots = [
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
  ]

  // Custom dropdown options for time slots with availability status
  const timeSlotDropdownOptions = allTimeSlots.map(slot => {
    const isAvailable = availableTimeSlots.includes(slot)
    const isBooked = !isAvailable && !!bookingDate
    return {
      value: slot,
      label: `${slot} ${isBooked ? '(Booked)' : isAvailable ? '(Available)' : ''}`,
      disabled: isBooked,
      color: isBooked ? '#ff6b6b' : isAvailable ? '#51cf66' : '#868e96'
    }
  })

  // Function to check available time slots from Google Sheets
  const checkAvailableTimeSlots = async (date: string) => {
    if (!date) {
      console.log('No date provided, showing all slots')
      setAvailableTimeSlots(allTimeSlots)
      return
    }

    setLoadingTimeSlots(true)
    console.log('🔍 Checking time slots for date:', date)

    try {
      // Get webhook URL from environment
      const webhookUrl = import.meta.env.VITE_APPS_SCRIPT_WEBHOOK
      console.log('🌐 Webhook URL configured:', !!webhookUrl)
      console.log('🔗 Webhook URL:', webhookUrl)

      if (!webhookUrl) {
        console.error('❌ Google Apps Script Webhook URL is not configured')
        console.log('📋 Falling back to showing all slots as available')
        setAvailableTimeSlots(allTimeSlots)
        return
      }

      const apiUrl = `${webhookUrl}?action=getAvailableTimeSlots&date=${encodeURIComponent(date)}`
      console.log('🚀 Making API call to:', apiUrl)

      // Fetch available time slots from Google Sheets
      const response = await fetch(apiUrl)
      console.log('📡 Response status:', response.status, response.statusText)

      const data = await response.json()
      console.log('📊 API Response:', data)

      if (data.success) {
        console.log('✅ Successfully fetched time slots:', data.availableTimeSlots)
        setAvailableTimeSlots(data.availableTimeSlots || [])

        // If current selection is no longer available, clear it
        if (timeSlot && !data.availableTimeSlots.includes(timeSlot)) {
          setTimeSlot('')
        }
      } else {
        console.error('❌ API returned error:', data.error)
        console.log('📋 Falling back to showing all slots as available')
        // Fallback to showing all slots if API fails
        setAvailableTimeSlots(allTimeSlots)
      }
    } catch (error) {
      console.error('❌ Error checking time slots:', error)
      console.log('📋 Falling back to showing all slots as available')
      // Fallback to showing all slots if API fails
      setAvailableTimeSlots(allTimeSlots)
    } finally {
      setLoadingTimeSlots(false)
    }
  }



  // Check available time slots when booking date changes
  useEffect(() => {
    checkAvailableTimeSlots(bookingDate)
  }, [bookingDate])

  const canAddMore = useMemo(() => images.length < MAX_IMAGES, [images.length])

  const isToday = useMemo(() => {
    if (!bookingDate) return false
    // Get today's date in local timezone (YYYY-MM-DD format)
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const todayString = `${year}-${month}-${day}`

    console.log('Booking date:', bookingDate)
    console.log('Today string:', todayString)
    console.log('Is today?', bookingDate === todayString)

    return bookingDate === todayString
  }, [bookingDate])

  const totalFee = useMemo(() => {
    const localityFee = 300 // Standard fee for all localities
    const urgentFee = isToday ? 50 : 0
    const baseTotal = localityFee + urgentFee

    // Apply discounts
    let discount = 0
    if (locality === 'Rilbong') {
      discount = 200 // Special discount for Rilbong
    } else if (locality) {
      discount = 100 // Standard discount for all other localities
    }

    return Math.max(0, baseTotal - discount) // Ensure total doesn't go below 0
  }, [locality, isToday])

  function validate(): string | null {
    if (!locality.trim()) return 'Locality is required'
    if (!address.trim()) return 'Full address is required'
    if (!problem.trim()) return 'Problem description is required'
    if (!timeSlot) return 'Please choose a preferred time slot'
    if (!bookingDate) return 'Please select a booking date'
    return null
  }

  async function handleFiles(selected: FileList | null) {
    if (!selected) return
    const remaining = MAX_IMAGES - images.length
    const files = Array.from(selected).slice(0, remaining)
    const compressed = await Promise.all(
      files.map(async (file) => {
        const dataUrl = await compressImage(file)
        return {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file,
          previewUrl: URL.createObjectURL(file),
          dataUrl,
        } satisfies ImageItem
      })
    )
    setImages((prev) => [...prev, ...compressed])
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }


  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setSubmitting(true)
    try {
      // Guard against undefined files to satisfy TypeScript
      const imageData = await Promise.all(
        images
          .filter((img) => !!img.file)
          .map(async (img) => ({
            name: (img.file as File).name,
            data: await fileToBase64(img.file as File),
          }))
      )

      const submissionData = {
        customerName: profile?.name || '',
        customerPhone: profile?.phone || '',
        userId: user?.uid || 'GUEST',
        locality: locality,
        landmark: landmark,
        fullAddress: address,
        problemDescription: problem,
        preferredTimeSlot: timeSlot,
        bookingDate: bookingDate,
        isUrgent: isToday,
        totalFee: totalFee,
        images: imageData,
        timestamp: new Date().toISOString(),
      }

      // Store booking data in sessionStorage for payment page
      try {
        sessionStorage.setItem('bookingData', JSON.stringify(submissionData))
      } catch (error) {
        // If storage quota exceeded, try with smaller images
        console.warn('Storage quota exceeded, retrying with smaller images')
        const smallerImageData = await Promise.all(
          images
            .filter((img) => !!img.file)
            .map(async (img) => {
              const compressed = await compressImage(img.file as File, 400, 0.4)
              return {
                name: (img.file as File).name,
                data: compressed,
              }
            })
        )
        const smallerSubmissionData = {
          ...submissionData,
          images: smallerImageData,
        }
        sessionStorage.setItem('bookingData', JSON.stringify(smallerSubmissionData))
      }

      // Navigate to payment page using React Router
      navigate('/payment')
    } catch (err: any) {
      setError(err?.message || 'Failed to prepare booking. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="page-container">
      <Navbar />

      <div className="booking-form">
        <div className="booking-header">
          <button onClick={() => navigate('/')} className="back-link">←</button>
          <div className="header-content">
            <h1>
              <span className="book-text">Book</span>
              <span className="service-text"> Your Service</span>
            </h1>
          </div>
        </div>

        {success && (
          <div className="success-message">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle className="w-5 h-5" />
              <span style={{ fontWeight: '500' }}>Booking submitted successfully!</span>
            </div>
            <p style={{ marginTop: '4px', fontSize: '14px' }}>We'll contact you shortly to confirm your appointment.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="booking-form-content">
          <div>
            <h3 className="section-title">
              <MapPin className="icon" />
              <span>Location Details</span>
            </h3>
            <div className="form-group">
              <label>Locality *</label>
              <CustomDropdown
                options={localityDropdownOptions}
                value={locality}
                onChange={setLocality}
                placeholder="Select locality"
              />
              {locality && (
                <div className="selected-locality">
                  Selected: {locality} - ₹300
                </div>
              )}
              {/* Contact Details - Loading State */}
              {user && profile === undefined && (
                <div className="form-group" style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px dashed var(--border)' }}>
                  Loading your contact details...
                </div>
              )}


            </div>

            <div className="form-group">
              <label>Landmark (Optional)</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="E.g., Near St. Mary's School"
              />
            </div>

            <div className="form-group">
              <label>Full Address *</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="House No., Street, Building..."
              />
            </div>

            <div className="form-group">
              <label>Problem Description *</label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                rows={4}
                placeholder="Describe your electrical issue..."
              />
            </div>

            {/* Booking Date */}
            <div className="form-group">
              <h3 className="section-title">
                <Clock className="icon" />
                <span>Booking Date *</span>
              </h3>
              <div
                className="date-input-field"
                onClick={() => setShowDatePicker(true)}
              >
                <span className="date-display">
                  {bookingDate ? new Date(bookingDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Select a date'}
                </span>
              </div>
              {isToday && (
                <div className="urgent-badge">
                  <span className="urgent-icon">⚡</span>
                  <span>Urgent - Same Day Booking (+₹50)</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <h3 className="section-title">
                <Clock className="icon" />
                <span>Preferred Time Slot *</span>
              </h3>
              <CustomDropdown
                options={timeSlotDropdownOptions}
                value={timeSlot}
                onChange={setTimeSlot}
                placeholder={
                  loadingTimeSlots
                    ? 'Checking availability...'
                    : availableTimeSlots.length === 0
                      ? 'No slots available for this date'
                      : 'Select preferred time'
                }
              />
              {bookingDate && availableTimeSlots.length === 0 && (
                <div className="no-slots-message">
                  <p>All time slots are booked for this date. Please choose a different date.</p>
                </div>
              )}
            </div>

            <div className="form-group">
              <h3 className="section-title">
                <Camera className="icon" />
                <span>Upload Photos of Issue (Optional - Max {MAX_IMAGES})</span>
              </h3>
              <div className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                  disabled={!canAddMore}
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="upload-content">
                  <Camera className="icon" />
                  <div className="upload-text">
                    <span>Upload image(s) of the electrical issue or take a photo</span>
                    <span className="file-types">PNG, JPG</span>
                  </div>
                </label>
              </div>

              {images.length > 0 && (
                <div className="image-previews">
                  {images.map((img) => (
                    <div key={img.id} className="image-preview">
                      <img src={img.previewUrl} alt="Upload preview" />
                      <button type="button" onClick={() => removeImage(img.id)} className="remove-image">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* Total Fee Display */}
            {totalFee > 0 && (
              <div className="total-fee-section">
                <div className="fee-breakdown">
                  <div className="fee-item">
                    <span>Locality Fee ({locality})</span>
                    <span>₹300</span>
                  </div>
                  {isToday && (
                    <div className="fee-item urgent-fee">
                      <span>Urgent Same Day</span>
                      <span>₹50</span>
                    </div>
                  )}
                  {locality && (
                    <div className="fee-item discount">
                      <span>Discount ({locality === 'Rilbong' ? 'Special' : 'Standard'})</span>
                      <span>-₹{locality === 'Rilbong' ? '200' : '100'}</span>
                    </div>
                  )}
                  <div className="fee-total">
                    <span>Total Amount</span>
                    <span>₹{totalFee}</span>
                  </div>
                </div>
              </div>
            )}

            <button type="submit" disabled={submitting} className="submit-btn">
              {submitting ? 'Processing…' : `Proceed to Payment${totalFee > 0 ? ` - ₹${totalFee}` : ''}`}
            </button>
          </div>
        </form>

        {/* Custom DatePicker Modal */}
        {showDatePicker && (
          <DatePicker
            value={bookingDate}
            onChange={setBookingDate}
            onClose={() => setShowDatePicker(false)}
            minDate={new Date().toISOString().split('T')[0]}
          />
        )}
      </div>
    </div>
  )
}
