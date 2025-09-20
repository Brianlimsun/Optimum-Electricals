import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, Camera, CheckCircle } from 'lucide-react'

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

function BookingForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
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

  const localityOptions = [
    { name: 'Rilbong', fee: 100 },
    { name: 'Police Bazaar', fee: 200 },
    { name: 'Laitumkhrah', fee: 200 },
    { name: 'Other', fee: 200 }
  ]

  useEffect(() => {
    // Pre-fill from LeadCapture if available
    try {
      const raw = sessionStorage.getItem('lead')
      if (raw) {
        const lead = JSON.parse(raw) as { name?: string; phone?: string }
        if (lead?.name) setName(lead.name)
        if (lead?.phone) setPhone(lead.phone)
      }
    } catch {}
  }, [])

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
    const localityFee = localityOptions.find(opt => opt.name === locality)?.fee || 0
    const urgentFee = isToday ? 100 : 0
    return localityFee + urgentFee
  }, [locality, isToday])

  function validate(): string | null {
    const phoneDigits = phone.replace(/\D/g, '')
    if (!name.trim()) return 'Name is required'
    if (phoneDigits.length !== 10) return 'Enter a 10-digit phone number'
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
        customerName: name,
        customerPhone: phone,
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
    <div className="booking-form">
      <div className="booking-header">
        <button onClick={() => navigate('/')} className="back-link">←</button>
        <div className="header-content">
          <h1>
            <span className="book-text">Book</span>
            <span className="service-text"> Your Service</span>
          </h1>
          <p className="greeting">Hi {name || 'there'}! Let's get your electrical issue resolved.</p>
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
                <select 
                  value={locality} 
                  onChange={(e) => setLocality(e.target.value)}
                  className="locality-select"
                >
                  <option value="">Select locality</option>
                  {localityOptions.map((option) => (
                    <option key={option.name} value={option.name}>
                      {option.name} - ₹{option.fee}
                    </option>
                  ))}
                </select>
                {locality && (
                  <div className="selected-locality">
                    Selected: {locality} - ₹{localityOptions.find(opt => opt.name === locality)?.fee}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Landmark</label>
                <input 
                  value={landmark} 
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g., Near City Mall"
                />
              </div>
              <div className="form-group">
                <label>Full Address *</label>
                <textarea 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  rows={3}
                  placeholder="House/flat number, street, area..."
                />
              </div>
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
          <label className="section-title">
            <Clock className="icon" />
            <span>Booking Date *</span>
          </label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          {isToday && (
            <div className="urgent-badge">
              <span className="urgent-icon">⚡</span>
              <span>Urgent - Same Day Booking (+₹100)</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="section-title">
            <Clock className="icon" />
            <span>Preferred Time Slot *</span>
          </label>
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
            <option value="">Select preferred time</option>
            <option value="8:00-10:00">8:00 - 10:00</option>
            <option value="10:00-12:00">10:00 - 12:00</option>
            <option value="12:00-14:00">12:00 - 14:00</option>
            <option value="14:00-16:00">14:00 - 16:00</option>
            <option value="16:00-18:00">16:00 - 18:00</option>
            <option value="18:00-20:00">18:00 - 20:00</option>
          </select>
        </div>

        <div className="form-group">
          <label className="section-title">
            <Camera className="icon" />
            <span>Upload Photos of Issue (Optional - Max {MAX_IMAGES})</span>
          </label>
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
                <span>₹{localityOptions.find(opt => opt.name === locality)?.fee || 0}</span>
              </div>
              {isToday && (
                <div className="fee-item urgent-fee">
                  <span>Urgent Same Day</span>
                  <span>₹100</span>
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
      </form>

    </div>
  )
}

export default BookingForm


