import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Squares from './Squares'
import RotatingText from './RotatingText'
import Navbar from './Navbar'
import ServicesScroll from './ServicesScroll'
import useScrollReveal from '../hooks/useScrollReveal'

function Hero() {
  const titleRef = useScrollReveal({ threshold: 0.2 })
  const subheadingRef = useScrollReveal({ threshold: 0.2 })
  const buttonsRef = useScrollReveal({ threshold: 0.2 })
  const servicesHeadingRef = useScrollReveal({ threshold: 0.05 })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
  }, [])

  // Fallback: ensure services heading becomes visible after a delay if scroll reveal doesn't trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = servicesHeadingRef.current;
      if (element && !element.classList.contains('revealed')) {
        element.classList.add('revealed');
      }
    }, 1200); // 1.2 second fallback (after other elements)

    return () => clearTimeout(timer);
  }, [servicesHeadingRef])

  // Function to handle smooth scroll to lead capture card
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
    <section className="hero"
      style={{ 
        background: '#000000',
        position: 'relative'
      }}
    >
      <Squares 
        speed={0.2} 
        squareSize={40}
        direction='diagonal' 
        borderColor='rgba(255,255,255,0.1)'
        hoverFillColor='rgba(255,255,255,0.05)'
        className="hero-squares"
      />
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      }}>
      <div className="hero-inner">
        <Navbar />

        <div className="hero-content">
          <h1 className="hero-title scroll-reveal-fade" ref={titleRef as React.RefObject<HTMLHeadingElement>}>
            <span className="title-line-1">
              <RotatingText
                texts={[
                  "Reliable",
                  "Fast", 
                  "Affordable",
                  "Quality",
                  "Trusted"
                ]}
                mainClassName="rotating-word"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />{' '}<span className="electrical-text">Electrical</span>
            </span>
            <span className="title-line-2">Services Without <br/>The Wait</span>
          </h1>
          <div className="hero-subheading scroll-reveal-fade scroll-reveal-delay-1" ref={subheadingRef as React.RefObject<HTMLDivElement>}>
            <p>
            From small home repairs to full solutions, done safely and fast
            </p>
          </div>
          <div className="hero-actions scroll-reveal-scale scroll-reveal-delay-2" ref={buttonsRef as React.RefObject<HTMLDivElement>}>
            <a 
              href="#booking-form" 
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToLeadCard()
              }}
            >
              Book Now
            </a>
            <Link to="/privacy-policy" className="btn btn-ghost">Learn More</Link>
          </div>
          
          <div className="services-section">
            <h3 className="services-heading scroll-reveal-fade scroll-reveal-delay-3" ref={servicesHeadingRef as React.RefObject<HTMLHeadingElement>}>Our Services</h3>
            <ServicesScroll />
          </div>
        </div>

      </div>
      </div>
    </section>
  )
}

export default Hero


