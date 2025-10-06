import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'services',
    question: 'What electrical services do you offer?',
    answer: 'We provide comprehensive electrical services including home wiring, electrical repairs, power point installation, lighting solutions, electrical safety inspections, and emergency electrical services. From small repairs to complete electrical installations, we handle all your electrical needs safely and efficiently.'
  },
  {
    id: 'booking',
    question: 'How do I book an electrical service?',
    answer: 'Booking is simple! Fill out our online form with your contact details, describe your electrical issue, select your preferred date and time slot, and upload photos if possible. We\'ll confirm your booking and arrive at the scheduled time with all necessary tools and equipment.'
  },
  {
    id: 'pricing',
    question: 'What are your service charges?',
    answer: 'Our standard service charge is ₹300 for most localities, with special rates of ₹200 for Rilbong and ₹100 for other areas. Same-day bookings have an additional ₹50 urgent fee. We provide transparent pricing with no hidden charges - you\'ll know the cost before we start any work.'
  },
  {
    id: 'emergency',
    question: 'Do you provide emergency electrical services?',
    answer: 'Yes! We offer emergency electrical services for urgent issues like power outages, electrical faults, or safety concerns. Our team is available for same-day bookings with priority scheduling. Emergency services ensure your electrical problems are resolved quickly and safely.'
  },
  {
    id: 'safety',
    question: 'Are your electricians certified and insured?',
    answer: 'Absolutely! All our electricians are fully certified, licensed, and insured. We follow strict safety protocols and use only high-quality materials. Your safety and satisfaction are our top priorities, and we guarantee professional, reliable electrical work.'
  },
  {
    id: 'timing',
    question: 'What are your service hours?',
    answer: 'We operate Monday to Saturday from 9:00 AM to 6:00 PM, with emergency services available outside these hours. Our flexible scheduling allows you to book appointments that fit your schedule, including same-day services for urgent electrical issues.'
  },
  {
    id: 'warranty',
    question: 'Do you provide warranty on your work?',
    answer: 'Yes! We provide a comprehensive warranty on all our electrical work. Our warranty covers both materials and labor, giving you peace of mind. We stand behind our work and will return to fix any issues covered under warranty at no additional cost.'
  },
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept multiple payment methods including cash, UPI, bank transfers, and digital payments. Payment is due upon completion of work. We provide detailed receipts for all transactions and can accommodate various payment preferences for your convenience.'
  },
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const headerRef = useScrollReveal({ threshold: 0.2 });
  const contentRef = useScrollReveal({ threshold: 0.1 });

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header scroll-reveal" ref={headerRef as React.RefObject<HTMLDivElement>}>
          <h2 className="faq-title">Questions?</h2>
          <h3 className="faq-subtitle">
            <span className="faq-subtitle-text">We got</span>
            <span className="faq-subtitle-accent"> answers.</span>
          </h3>
        </div>
        
        <div className="faq-content scroll-reveal scroll-reveal-delay-1" ref={contentRef as React.RefObject<HTMLDivElement>}>
          {faqData.map((item) => (
            <div key={item.id} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => toggleItem(item.id)}
                aria-expanded={openItems.has(item.id)}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-icon">
                  {openItems.has(item.id) ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              {openItems.has(item.id) && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
