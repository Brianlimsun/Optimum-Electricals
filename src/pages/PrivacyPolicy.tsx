import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function PrivacyPolicy() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
  }, [])

  return (
    <div className="page-container">
      <Navbar />

      {/* Main Content */}
      <main className="privacy-policy">
        <div className="privacy-container">
          <div className="privacy-header">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-intro">
              At Optimum Electricals, your privacy and data security are our top priorities. This Privacy Policy explains how we collect, use, store, and protect the personal information of our customers and website visitors.
            </p>
          </div>

          <div className="privacy-content">
            <section className="privacy-section">
              <h2 className="section-title">1. Information We Collect</h2>
              <p>We may collect the following personal information from you when you interact with us, place orders, or request services:</p>
              <ul className="privacy-list">
                <li>Name, address, and contact details (phone number, email)</li>
                <li>Payment information for transactions</li>
                <li>Details about services requested or purchased</li>
              </ul>
              <p>This information is collected solely for providing our products and services efficiently.</p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">2. How We Use Your Information</h2>
              <p>Your personal information is used for:</p>
              <ul className="privacy-list">
                <li>Processing orders and service requests</li>
                <li>Generating invoices and receipts</li>
                <li>Scheduling installations, repairs, or maintenance</li>
                <li>Communicating important updates or service-related information</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">3. How We Protect Your Information</h2>
              <p>We implement strict security measures to ensure your information remains safe:</p>
              <ul className="privacy-list">
                <li><strong>Digital data:</strong> Stored securely with access limited to authorized staff only. Sensitive information, such as payment details, is encrypted when transmitted online.</li>
                <li><strong>Physical records:</strong> Invoices, service reports, and other documents are stored in locked cabinets with restricted access.</li>
                <li><strong>Staff training:</strong> All employees handling customer information are trained on privacy policies and safe data handling practices.</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">4. Sharing of Information</h2>
              <p>We do not share your personal data with third parties, except:</p>
              <ul className="privacy-list">
                <li>When required for authorized service delivery (e.g., third-party contractors for installation or repair)</li>
                <li>When legally obligated to comply with government regulations or legal processes</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="privacy-list">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or outdated information</li>
                <li>Request deletion of your personal data, subject to legal and contractual obligations</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">6. Cookies and Online Tracking (if applicable)</h2>
              <p>Our website may use cookies or tracking technologies to enhance your browsing experience. These are not used to collect personal data without your consent.</p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">7. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The "Effective Date" at the top of this page will indicate the latest version.</p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or your personal data, please contact us:</p>
              <div className="contact-info">
                <p><strong>Optimum Electricals</strong></p>
                <p>Jitbhumi Compound, Rilbong Junction Road, Shillong, 793004</p>
                <p><a href="tel:+916033389808" className="contact-link">6033389808</a></p>
                <p><a href="mailto:optimumbriansun@gmail.com" className="contact-link">optimumbriansun@gmail.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PrivacyPolicy
