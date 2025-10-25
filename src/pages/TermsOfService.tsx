import { useEffect } from 'react'
import Navbar from '../components/Navbar'

function TermsOfService() {

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
            <h1 className="privacy-title">Terms of Service</h1>
            <p className="privacy-intro">
              Welcome to Optimum Electricals. These Terms of Service ("Terms") govern your use of our website and services. By accessing our website or requesting our electrical services, you agree to be bound by these Terms.
            </p>
          </div>

          <div className="privacy-content">
            <section className="privacy-section">
              <h2 className="section-title">1. Introduction and Acceptance of Terms</h2>
              <p>Optimum Electricals ("we," "us," or "our") provides professional electrical services including home wiring, power point installation, lighting solutions, safety inspections, and emergency repairs throughout Shillong, Meghalaya.</p>
              <p>By using our website, booking our services, or engaging with our team, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our services.</p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">2. Description of Services</h2>
              <p>Optimum Electricals specializes in comprehensive electrical solutions for residential and commercial properties. Our services include:</p>
              <ul className="privacy-list">
                <li><strong>Home Wiring:</strong> Complete electrical wiring installation and upgrades</li>
                <li><strong>Power Points:</strong> Installation and repair of electrical outlets and switches</li>
                <li><strong>Lighting Solutions:</strong> Indoor and outdoor lighting installation and maintenance</li>
                <li><strong>Safety Inspections:</strong> Comprehensive electrical safety assessments</li>
                <li><strong>Emergency Repairs:</strong> 24/7 emergency electrical services</li>
                <li><strong>Maintenance Services:</strong> Regular electrical system maintenance and upgrades</li>
              </ul>
              <p>All services are performed by licensed and certified electricians in accordance with local electrical codes and safety standards.</p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">3. User Responsibilities and Conduct</h2>
              <p>When using our services, you agree to:</p>
              <ul className="privacy-list">
                <li>Provide accurate and complete information when booking services</li>
                <li>Ensure safe access to work areas for our technicians</li>
                <li>Follow all safety instructions provided by our team</li>
                <li>Pay for services as agreed upon in our service contracts</li>
                <li>Notify us immediately of any safety concerns or issues</li>
                <li>Comply with all applicable local laws and regulations</li>
              </ul>
              <p>You are prohibited from:</p>
              <ul className="privacy-list">
                <li>Attempting to perform electrical work yourself after our assessment</li>
                <li>Interfering with our technicians while they are working</li>
                <li>Providing false or misleading information</li>
                <li>Using our services for illegal or unauthorized purposes</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">4. Service Booking and Account Information</h2>
              <p>When you book our services through our website or contact us directly:</p>
              <ul className="privacy-list">
                <li>You must provide accurate contact information including your name, address, phone number, and email</li>
                <li>Service appointments are subject to availability and confirmation</li>
                <li>We may require additional information to properly assess your electrical needs</li>
                <li>You are responsible for maintaining the confidentiality of any account information</li>
                <li>We reserve the right to refuse service if we determine it may be unsafe or illegal</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">5. Intellectual Property Rights</h2>
              <p>All content on our website, including text, graphics, logos, images, and software, is the property of Optimum Electricals and is protected by copyright and other intellectual property laws.</p>
              <p>You may not:</p>
              <ul className="privacy-list">
                <li>Copy, modify, or distribute our website content without permission</li>
                <li>Use our trademarks or logos without written consent</li>
                <li>Reverse engineer or attempt to extract source code from our website</li>
                <li>Use our content for commercial purposes without authorization</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">6. Payment and Refund Policy</h2>
              <p><strong>Payment Terms:</strong></p>
              <ul className="privacy-list">
                <li>Payment is due upon completion of services unless other arrangements are made</li>
                <li>We accept cash, bank transfers, and digital payment methods</li>
                <li>For larger projects, we may require a deposit before work begins</li>
                <li>All prices are subject to change without notice</li>
              </ul>
              <p><strong>Refund Policy:</strong></p>
              <ul className="privacy-list">
                <li>Refunds are considered on a case-by-case basis</li>
                <li>If you are not satisfied with our work, please contact us within 7 days</li>
                <li>Refunds may be subject to inspection and verification of issues</li>
                <li>Materials and parts already installed may not be eligible for full refunds</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">7. Prohibited Activities</h2>
              <p>You may not use our services or website for:</p>
              <ul className="privacy-list">
                <li>Any illegal activities or purposes</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Transmitting viruses, malware, or other harmful code</li>
                <li>Harassing or threatening our staff or other customers</li>
                <li>Providing false or misleading information</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">8. Limitation of Liability</h2>
              <p>While we strive to provide the highest quality electrical services, Optimum Electricals' liability is limited as follows:</p>
              <ul className="privacy-list">
                <li>Our liability is limited to the cost of the services provided</li>
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>We are not responsible for damage to existing electrical systems that were not properly maintained</li>
                <li>Our liability is limited to the extent permitted by applicable law</li>
                <li>We carry appropriate insurance coverage for our work</li>
              </ul>
              <p>This limitation does not affect your statutory rights as a consumer.</p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">9. Termination of Access</h2>
              <p>We reserve the right to terminate or suspend your access to our services at any time, without notice, for any reason, including:</p>
              <ul className="privacy-list">
                <li>Violation of these Terms of Service</li>
                <li>Non-payment for services rendered</li>
                <li>Inappropriate or unsafe behavior</li>
                <li>Providing false information</li>
                <li>Any other reason we deem necessary for safety or business purposes</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">10. Changes to the Terms</h2>
              <p>We may update these Terms of Service from time to time to reflect changes in our services, legal requirements, or business practices. When we make changes:</p>
              <ul className="privacy-list">
                <li>We will update the "Effective Date" at the top of this page</li>
                <li>Significant changes will be communicated to existing customers</li>
                <li>Continued use of our services after changes constitutes acceptance of the new Terms</li>
                <li>We encourage you to review these Terms periodically</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TermsOfService
