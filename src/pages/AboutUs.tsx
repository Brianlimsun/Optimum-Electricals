import { useEffect } from 'react'
import Navbar from '../components/Navbar'

function AboutUs() {

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
            <h1 className="privacy-title">About Optimum Electricals</h1>
            <p className="privacy-intro">
              Your trusted electrical solutions partner in Shillong, Meghalaya. We combine decades of expertise with modern technology to deliver safe, reliable, and efficient electrical services for homes and businesses across the region.
            </p>
          </div>

          <div className="privacy-content">
            <section className="privacy-section">
              <h2 className="section-title">Who We Are</h2>
              <p>Optimum Electricals is a locally-owned and operated electrical services company based in Shillong, Meghalaya. Founded with a commitment to excellence and safety, we have been serving the electrical needs of our community with dedication and expertise.</p>
              <p>Our team consists of licensed and certified electricians who bring years of hands-on experience to every project. We understand the unique electrical challenges faced by homes and businesses in our region, from traditional wiring systems to modern smart home installations.</p>
              <p>What sets us apart is our dual approach: we not only provide professional electrical services but also operate a convenient online store where customers can purchase quality electrical products and components. This integrated approach ensures you get both the expertise and the materials needed for any electrical project.</p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">Our Mission & Vision</h2>
              <p><strong>Our Mission:</strong> To provide safe, reliable, and efficient electrical solutions that power homes and businesses while ensuring the highest standards of quality and customer satisfaction. We are committed to making electrical services accessible, convenient, and trustworthy for everyone in Shillong and surrounding areas.</p>
              <p><strong>Our Vision:</strong> To become the leading electrical services provider in Meghalaya, known for our innovation, reliability, and customer-centric approach. We envision a future where every home and business has access to safe, modern electrical systems that enhance their daily lives and operations.</p>
              <p>We believe that electricity is the backbone of modern living, and our role is to ensure that backbone is strong, safe, and reliable for every customer we serve.</p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">Services We Offer</h2>
              <p>At Optimum Electricals, we provide comprehensive electrical solutions tailored to meet your specific needs:</p>
              <ul className="privacy-list">
                <li><strong>Home Wiring Services:</strong> Complete electrical wiring installation, upgrades, and repairs for residential properties</li>
                <li><strong>Power Point Installation:</strong> Professional installation and repair of electrical outlets, switches, and power points</li>
                <li><strong>Lighting Solutions:</strong> Indoor and outdoor lighting design, installation, and maintenance services</li>
                <li><strong>Safety Inspections:</strong> Comprehensive electrical safety assessments to ensure your property meets safety standards</li>
                <li><strong>Emergency Repairs:</strong> 24/7 emergency electrical services for urgent situations and power outages</li>
                <li><strong>Smart Home Integration:</strong> Modern smart home electrical systems and automation solutions</li>
                <li><strong>Commercial Electrical Services:</strong> Electrical solutions for businesses, offices, and commercial properties</li>
                <li><strong>Online Electrical Store:</strong> Convenient online shopping for electrical products, components, and accessories</li>
              </ul>
              <p>Our online booking system allows you to schedule services based on your location and our availability, making it easy to get the electrical help you need when you need it.</p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">Why Choose Optimum Electricals?</h2>
              <p>When you choose Optimum Electricals, you're choosing more than just electrical services – you're choosing a partner committed to your safety and satisfaction:</p>
              <ul className="privacy-list">
                <li><strong>Licensed & Certified Professionals:</strong> All our electricians are fully licensed and certified, ensuring the highest quality workmanship</li>
                <li><strong>Local Expertise:</strong> Deep understanding of local electrical codes, weather conditions, and building requirements in Meghalaya</li>
                <li><strong>Safety First Approach:</strong> We prioritize safety in every project, using proper safety protocols and quality materials</li>
                <li><strong>Convenient Online Booking:</strong> Easy-to-use online platform for booking services based on your location and our availability</li>
                <li><strong>24/7 Emergency Service:</strong> Round-the-clock availability for urgent electrical repairs and emergencies</li>
                <li><strong>Quality Products:</strong> Our online store offers genuine electrical products with warranty and quality assurance</li>
                <li><strong>Transparent Pricing:</strong> Clear, upfront pricing with no hidden costs or surprise charges</li>
                <li><strong>Customer Satisfaction Guarantee:</strong> We stand behind our work and are committed to your complete satisfaction</li>
                <li><strong>Modern Technology:</strong> We stay updated with the latest electrical technologies and smart home solutions</li>
                <li><strong>Community Focus:</strong> As a local business, we're invested in the success and safety of our community</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">Our Commitment to You</h2>
              <p>At Optimum Electricals, we understand that electrical work is not just about fixing wires and installing outlets – it's about ensuring the safety and comfort of your home or business. Every project we undertake is approached with the same level of care and attention to detail that we would want for our own families.</p>
              <p>We believe in building lasting relationships with our customers through trust, reliability, and exceptional service. Whether you need a simple power point installation, a complete home rewiring, or emergency electrical repairs, we're here to provide the expertise and support you need.</p>
              <p>Our online platform makes it easier than ever to access our services. You can browse our electrical products, book appointments, and even request urgent repairs – all from the comfort of your home. We're committed to making electrical services accessible and convenient for everyone in our community.</p>
            </section>

            
          </div>
        </div>
      </main>
    </div>
  )
}

export default AboutUs
