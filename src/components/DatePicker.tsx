import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  onClose: () => void
  minDate?: string
  maxDate?: string
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  onClose,
  minDate,
  maxDate
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hoveredDate, setHoveredDate] = useState<number | null>(null)
  const [tempSelectedDate, setTempSelectedDate] = useState<string | null>(value || null)
  const datePickerRef = useRef<HTMLDivElement>(null)

  const today = new Date()

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  // Get days from previous month
  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Handle date selection (temporary selection only)
  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    // Fix timezone issue by using local date
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const dayStr = String(selectedDate.getDate()).padStart(2, '0')
    const dateString = `${year}-${month}-${dayStr}`
    setTempSelectedDate(dateString)
  }

  // Handle final date confirmation
  const handleChooseDate = () => {
    if (tempSelectedDate) {
      onChange(tempSelectedDate)
    }
    onClose()
  }

  // Check if date is disabled
  const isDateDisabled = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    // Fix timezone issue by using local date
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const dayStr = String(date.getDate()).padStart(2, '0')
    const dateString = `${year}-${month}-${dayStr}`

    if (minDate && dateString < minDate) return true
    if (maxDate && dateString > maxDate) return true

    // Compare with today's date (local)
    const todayString = today.toISOString().split('T')[0]
    if (dateString < todayString) return true

    return false
  }

  // Check if date is selected (use temp selection)
  const isDateSelected = (day: number) => {
    if (!tempSelectedDate) return false
    const tempDate = new Date(tempSelectedDate)
    return tempDate.getDate() === day &&
      tempDate.getMonth() === currentDate.getMonth() &&
      tempDate.getFullYear() === currentDate.getFullYear()
  }

  // Check if date is today
  const isToday = (day: number) => {
    return today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
  }

  // Format selected date for display
  const formatSelectedDate = () => {
    if (!tempSelectedDate) return 'Select a date'
    const tempDate = new Date(tempSelectedDate)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }
    return tempDate.toLocaleDateString('en-US', options)
  }

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div className="date-picker-overlay">
      <div className="date-picker-container" ref={datePickerRef}>
        {/* Date Input Display */}
        <div className="date-input-display">
          <div className="selected-date-text">
            {formatSelectedDate() || 'Select a date'}
          </div>
          <ChevronUp className="date-picker-arrow" />
        </div>

        {/* Calendar */}
        <div className="calendar-card">
          {/* Calendar Header */}
          <div className="calendar-header">
            <button
              className="calendar-nav-btn"
              onClick={goToPreviousMonth}
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <h3 className="calendar-month-year">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              className="calendar-nav-btn"
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day Headers */}
          <div className="calendar-day-headers">
            {dayNames.map((day) => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid">
            {/* Previous month days */}
            {Array.from({ length: firstDayWeekday }, (_, i) => {
              const day = daysInPrevMonth - firstDayWeekday + i + 1
              return (
                <div key={`prev-${day}`} className="calendar-day prev-month-day">
                  {day}
                </div>
              )
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const isSelected = isDateSelected(day)
              const isHovered = hoveredDate === day
              const disabled = isDateDisabled(day)
              const isTodayDate = isToday(day)

              return (
                <button
                  key={day}
                  className={`calendar-day ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''} ${disabled ? 'disabled' : ''} ${isTodayDate ? 'today' : ''}`}
                  onClick={() => !disabled && handleDateClick(day)}
                  onMouseEnter={() => !isDateSelected(day) && setHoveredDate(day)}
                  onMouseLeave={() => setHoveredDate(null)}
                  disabled={disabled}
                >
                  {day}
                </button>
              )
            })}

            {/* Next month days */}
            {Array.from({ length: 42 - firstDayWeekday - daysInMonth }, (_, i) => {
              const day = i + 1
              return (
                <div key={`next-${day}`} className="calendar-day next-month-day">
                  {day}
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="calendar-actions">
            <button className="calendar-btn cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className="calendar-btn choose-btn"
              onClick={handleChooseDate}
              disabled={!tempSelectedDate}
            >
              Choose Date
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatePicker
