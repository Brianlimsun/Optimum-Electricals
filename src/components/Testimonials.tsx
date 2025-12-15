"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Optimum Electricals transformed our home's electrical system completely. Their team was professional, punctual, and the quality of work exceeded our expectations. Highly recommended!",
    name: "Priya Sharma",
    role: "Homeowner",
  },
  {
    text: "We had an emergency electrical issue at 2 AM, and Optimum Electricals responded immediately. Their 24/7 service saved us from a potential disaster. Truly reliable!",
    name: "Rajesh Kumar",
    role: "Business Owner",
  },
  {
    text: "The team installed new power points throughout our office and the work was flawless. Clean, efficient, and completed on time. Great value for money!",
    name: "Anita Das",
    role: "Office Manager",
  },
  {
    text: "Optimum Electricals upgraded our entire lighting system and the difference is amazing. Modern, energy-efficient, and beautifully installed. Very satisfied!",
    name: "Suresh Mehta",
    role: "Property Manager",
  },
  {
    text: "Their safety inspection was thorough and professional. They identified several issues we weren't aware of and fixed them promptly. Peace of mind guaranteed!",
    name: "Deepika Singh",
    role: "Homeowner",
  },
  {
    text: "From consultation to completion, Optimum Electricals provided excellent service. Their electricians are skilled, courteous, and always on time. Five stars!",
    name: "Vikram Patel",
    role: "Restaurant Owner",
  },
  {
    text: "We needed complete home wiring for our new house. Optimum Electricals delivered exactly what they promised - quality work at competitive prices. Highly recommended!",
    name: "Arjun Thapa",
    role: "New Homeowner",
  },
  {
    text: "Their online booking system made it so easy to schedule our electrical repairs. Professional service from start to finish. Will definitely use them again!",
    name: "Meera Joshi",
    role: "Customer",
  },
  {
    text: "Optimum Electricals fixed our power issues quickly and efficiently. Their team is knowledgeable, trustworthy, and the pricing is very reasonable. Excellent service!",
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

          <h2 className="testimonials-title">Testimonials</h2>
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
                    <div className="testimonial-info" style={{ marginLeft: 0 }}>
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
                    <div className="testimonial-info" style={{ marginLeft: 0 }}>
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
                    <div className="testimonial-info" style={{ marginLeft: 0 }}>
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
