import React, { useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

interface Service {
  name: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    name: "Home Wiring",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
        <path d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4"/>
        <path d="M12 3v18"/>
        <path d="M8 3v18"/>
        <path d="M16 3v18"/>
      </svg>
    )
  },
  {
    name: "Power Points",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <circle cx="12" cy="9" r="2"/>
      </svg>
    )
  },
  {
    name: "Lighting",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z"/>
        <path d="M12 3c-4.97 0-9 4.03-9 9v6h18v-6c0-4.97-4.03-9-9-9z"/>
        <path d="M12 1v2"/>
        <path d="M12 21v2"/>
        <path d="M4.22 4.22l1.42 1.42"/>
        <path d="M18.36 18.36l1.42 1.42"/>
        <path d="M1 12h2"/>
        <path d="M21 12h2"/>
        <path d="M4.22 19.78l1.42-1.42"/>
        <path d="M18.36 5.64l1.42-1.42"/>
      </svg>
    )
  },
  {
    name: "Safety Inspections",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4"/>
        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
        <path d="M13 12h3a2 2 0 012 2v1"/>
        <path d="M5 12H2a2 2 0 00-2 2v1"/>
        <path d="M13 12v3a2 2 0 01-2 2H9a2 2 0 01-2-2v-3"/>
        <path d="M5 12v3a2 2 0 002 2h2a2 2 0 002-2v-3"/>
      </svg>
    )
  },
  {
    name: "Emergency Repairs",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
        <path d="M12 2v20"/>
        <path d="M2 7l10 5 10-5"/>
      </svg>
    )
  },
  {
    name: "Smart Home",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
        <circle cx="12" cy="8" r="2"/>
        <path d="M8 15h8"/>
        <path d="M8 19h8"/>
      </svg>
    )
  }
];

const ServicesScroll: React.FC = () => {
  // Add scroll reveal effect with very low threshold to ensure it triggers
  const scrollRef = useScrollReveal({ threshold: 0.05 });
  
  // Fallback: ensure element becomes visible after a delay if scroll reveal doesn't trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = scrollRef.current;
      if (element && !element.classList.contains('revealed')) {
        element.classList.add('revealed');
      }
    }, 1000); // 1 second fallback

    return () => clearTimeout(timer);
  }, [scrollRef]);
  
  // Duplicate services for seamless loop
  const duplicatedServices = [...services, ...services, ...services];

  return (
    <div className="services-scroll-container scroll-reveal scroll-reveal-delay-3" ref={scrollRef as React.RefObject<HTMLDivElement>}>
      <div className="services-scroll">
        {duplicatedServices.map((service, index) => (
          <div key={index} className="service-item">
            <div className="service-icon">
              {service.icon}
            </div>
            <span className="service-name">{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesScroll;
