import React, { useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

interface Service {
  name: string;
}

const services: Service[] = [
  {
    name: "Home Wiring"
  },
  {
    name: "Power Points"
  },
  {
    name: "Lighting"
  },
  {
    name: "Safety Inspections"
  },
  {
    name: "Emergency Repairs"
  },
  {
    name: "Smart Home"
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
    <div className="services-scroll-container scroll-reveal-fade scroll-reveal-delay-4" ref={scrollRef as React.RefObject<HTMLDivElement>}>
      <div className="services-scroll">
        {duplicatedServices.map((service, index) => (
          <div key={index} className="service-item">
            <span className="service-name">{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesScroll;
