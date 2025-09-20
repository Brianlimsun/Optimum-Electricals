import { useNavigate } from 'react-router-dom'

function PrivacyPolicy() {
  const navigate = useNavigate()

  return (
    <div className="privacy-policy">
      <div className="container">
        <button onClick={() => navigate('/')} className="back-link">← Back to Home</button>
        
        <div className="privacy-content">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: September 20, 2025</p>
          
          <p>
            At Optimum Electricals, your privacy and data security are our top priorities. 
            This Privacy Policy explains how we collect, use, store, and protect the personal 
            information of our customers and website visitors.
          </p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>We may collect the following personal information from you when you interact with us, place orders, or request services:</p>
            <ul>
              <li>Name, address, and contact details (phone number, email)</li>
              <li>Payment information for transactions</li>
              <li>Details about services requested or purchased</li>
            </ul>
            <p>This information is collected solely for providing our products and services efficiently.</p>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>Your personal information is used for:</p>
            <ul>
              <li>Processing orders and service requests</li>
              <li>Generating invoices and receipts</li>
              <li>Scheduling installations, repairs, or maintenance</li>
              <li>Communicating important updates or service-related information</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Protect Your Information</h2>
            <p>We implement strict security measures to ensure your information remains safe:</p>
            <ul>
              <li><strong>Digital data:</strong> Stored securely with access limited to authorized staff only. Sensitive information, such as payment details, is encrypted when transmitted online.</li>
              <li><strong>Physical records:</strong> Invoices, service reports, and other documents are stored in locked cabinets with restricted access.</li>
              <li><strong>Staff training:</strong> All employees handling customer information are trained on privacy policies and safe data handling practices.</li>
            </ul>
          </section>

          <section>
            <h2>4. Sharing of Information</h2>
            <p>We do not share your personal data with third parties, except:</p>
            <ul>
              <li>When required for authorized service delivery (e.g., third-party contractors for installation or repair)</li>
              <li>When legally obligated to comply with government regulations or legal processes</li>
            </ul>
          </section>

          <section>
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or outdated information</li>
              <li>Request deletion of your personal data, subject to legal and contractual obligations</li>
            </ul>
          </section>

          <section>
            <h2>6. Cookies and Online Tracking (if applicable)</h2>
            <p>
              Our website may use cookies or tracking technologies to enhance your browsing experience. 
              These are not used to collect personal data without your consent.
            </p>
          </section>

          <section>
            <h2>7. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
              The "Effective Date" at the top of this page will indicate the latest version.
            </p>
          </section>

          <section>
            <h2>8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or your personal data, please contact us:</p>
            <div className="contact-info">
              <p><strong>Optimum Electricals</strong></p>
              <p>Jitbhumi Compound, Rilbong Junction Road</p>
              <p>Shillong, 793004</p>
              <p>Phone: 6033389808</p>
              <p>Email: optimumbriansun@gmail.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
