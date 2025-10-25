"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Optimum Electricals transformed our home's electrical system completely. Their team was professional, punctual, and the quality of work exceeded our expectations. Highly recommended!",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face",
    name: "Priya Sharma",
    role: "Homeowner",
  },
  {
    text: "We had an emergency electrical issue at 2 AM, and Optimum Electricals responded immediately. Their 24/7 service saved us from a potential disaster. Truly reliable!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    name: "Rajesh Kumar",
    role: "Business Owner",
  },
  {
    text: "The team installed new power points throughout our office and the work was flawless. Clean, efficient, and completed on time. Great value for money!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    name: "Anita Das",
    role: "Office Manager",
  },
  {
    text: "Optimum Electricals upgraded our entire lighting system and the difference is amazing. Modern, energy-efficient, and beautifully installed. Very satisfied!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    name: "Suresh Mehta",
    role: "Property Manager",
  },
  {
    text: "Their safety inspection was thorough and professional. They identified several issues we weren't aware of and fixed them promptly. Peace of mind guaranteed!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    name: "Deepika Singh",
    role: "Homeowner",
  },
  {
    text: "From consultation to completion, Optimum Electricals provided excellent service. Their electricians are skilled, courteous, and always on time. Five stars!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
    name: "Vikram Patel",
    role: "Restaurant Owner",
  },
  {
    text: "We needed complete home wiring for our new house. Optimum Electricals delivered exactly what they promised - quality work at competitive prices. Highly recommended!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    name: "Arjun Thapa",
    role: "New Homeowner",
  },
  {
    text: "Their online booking system made it so easy to schedule our electrical repairs. Professional service from start to finish. Will definitely use them again!",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
    name: "Meera Joshi",
    role: "Customer",
  },
  {
    text: "Optimum Electricals fixed our power issues quickly and efficiently. Their team is knowledgeable, trustworthy, and the pricing is very reasonable. Excellent service!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
    name: "Rohit Agarwal",
    role: "Shop Owner",
  },
];

// Create extended arrays for seamless looping
const createExtendedTestimonials = (testimonialsArray: typeof testimonials) => {
  return [...testimonialsArray, ...testimonialsArray, ...testimonialsArray, ...testimonialsArray];
};

const firstColumn = createExtendedTestimonials(testimonials.slice(0, 3));
const secondColumn = createExtendedTestimonials(testimonials.slice(3, 6));
const thirdColumn = createExtendedTestimonials(testimonials.slice(6, 9));

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="testimonials-header"
        >
          
          <h2 className="testimonials-title">What our users say</h2>
          <p className="testimonials-subtitle">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="testimonials-grid">
          {/* First Column - Always visible */}
          <div className="testimonials-column">
            <motion.div
              className="testimonials-marquee"
              animate={{
                y: [0, "-50%"],
              }}
              transition={{
                duration: 80,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {firstColumn.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-avatar"
                    />
                    <div className="testimonial-info">
                      <div className="testimonial-name">{testimonial.name}</div>
                      <div className="testimonial-role">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Second Column - Hidden on mobile, visible on tablet and desktop */}
          <div className="testimonials-column tablet-and-up">
            <motion.div
              className="testimonials-marquee"
              animate={{
                y: ["-50%", 0],
              }}
              transition={{
                duration: 90,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {secondColumn.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-avatar"
                    />
                    <div className="testimonial-info">
                      <div className="testimonial-name">{testimonial.name}</div>
                      <div className="testimonial-role">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Third Column - Hidden on mobile and tablet, visible only on desktop */}
          <div className="testimonials-column desktop-only">
            <motion.div
              className="testimonials-marquee"
              animate={{
                y: [0, "-50%"],
              }}
              transition={{
                duration: 100,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {thirdColumn.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-avatar"
                    />
                    <div className="testimonial-info">
                      <div className="testimonial-name">{testimonial.name}</div>
                      <div className="testimonial-role">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
