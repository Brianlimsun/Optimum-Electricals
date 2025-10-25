import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  // Function to handle smooth scroll to lead capture card (same as Hero component)
  const scrollToLeadCard = () => {
    const formElement = document.getElementById('booking-form')
    if (formElement) {
      // Get the lead capture card container
      const leadCard = formElement.closest('.lead-capture')
      if (leadCard) {
        // Calculate position relative to the lead capture card
        const cardRect = leadCard.getBoundingClientRect()
        const cardTop = cardRect.top + window.scrollY
        
        // Dynamic offset based on screen size
        const isMobile = window.innerWidth <= 768
        const offset = isMobile ? 100 : 100
        
        // Ensure we don't scroll past the top of the page
        const targetPosition = Math.max(0, cardTop - offset)
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      } else {
        // Fallback to form element if lead card not found
        formElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  return (
    <footer className="modern-footer">
      <div className="footer-container">
        {/* Company Information Section */}
        <div className="footer-company">
          <div className="company-brand">
            <div className="company-logo">
              <img src="/logo.png" alt="Optimum Electricals" className="footer-logo-img" />
            </div>
            <h3 className="company-name">Optimum Electricals</h3>
          </div>
          
          <div className="company-address">
            <p>Jitbhumi Compound</p>
            <p>Rilbong Junction Road</p>
            <p>Shillong, Meghalaya 793004</p>
            <p>India</p>
          </div>
          
          <div className="company-contact">
            <div className="contact-row">
              <div className="contact-item">
                <span className="contact-label">Phone number</span>
                <a href="tel:+916033389808" className="contact-value">+91 60333 89808</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <a href="mailto:optimumbriansun@gmail.com" className="contact-value">optimumbriansun@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="footer-links">
          <div className="footer-column">
            <h4 className="footer-heading">Quick links</h4>
            <ul className="footer-list">
              <li><a href="#booking-form" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToLeadCard(); }}>Book Service</a></li>
              <li><Link to="/my-bookings" className="footer-link">My Bookings</Link></li>
              <li><Link to="/blog" className="footer-link">Blog</Link></li>
              <li><a href="mailto:optimumbriansun@gmail.com" className="footer-link">Contact us</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-list">
              <li><Link to="/privacy-policy" className="footer-link">Privacy policy</Link></li>
              <li><Link to="/terms-of-service" className="footer-link">Terms of service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <p>© 2025 Optimum Electricals.</p>
      </div>
    </footer>
  );
};

export default Footer;
