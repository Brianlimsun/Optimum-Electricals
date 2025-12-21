"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Rewired our whole place and the difference is huge. They showed up on time and didn't leave a mess.",
    name: "Rynjah Marbaniang",
    role: "Homeowner",
  },
  {
    text: "Called at 2 AM when the power died and they actually came out. Had it fixed pretty fast. Lifesavers.",
    name: "Priya Sharma",
    role: "Business Owner",
  },
  {
    text: "Put in a few new outlets for us. Quick, clean work, and the price was fair.",
    name: "Laitphar Lyngdoh",
    role: "Office Manager",
  },
  {
    text: "The new lighting setup looks awesome. It's way brighter in here and saves on energy too.",
    name: "Suresh Mehta",
    role: "Property Manager",
  },
  {
    text: "Did a safety check and found some stuff I completely missed. Glad we caught it before it became a real problem.",
    name: "Pynskhem Khongwir",
    role: "Resident",
  },
  {
    text: "The electrician was super polite and clearly knew his stuff. Just a really smooth experience.",
    name: "Anita Das",
    role: "Homeowner",
  },
  {
    text: "Wired up the new house exactly how we asked. Everything works great and didn't break the bank.",
    name: "Merina Lyngdoh",
    role: "Store Manager",
  },
  {
    text: "Booking online was effortless. The technician was respectful and got the job done without any fuss.",
    name: "Banalari Marbaniang",
    role: "Local Resident",
  },
  {
    text: "Figured out why our power kept tripping and fixed it. Knew exactly what to look for.",
    name: "Phyrnai Nongrum",
    role: "Customer",
  },
  {
    text: "You can tell they care about the details. They even cleaned up the dust after drilling. really appreciated that.",
    name: "Aarav Khanna",
    role: "Architect",
  },
  {
    text: "I liked that the price they quoted was the price I paid. No hidden fees or surprises at the end.",
    name: "Nikhil Bansal",
    role: "Project Manager",
  },
  {
    text: "Really solid work. The guys were respectful of my home and got everything working perfect.",
    name: "Aditya Rao",
    role: "Homeowner",
  },
];

// Create extended arrays for seamless looping
const createExtendedTestimonials = (testimonialsArray: typeof testimonials) => {
  return [...testimonialsArray, ...testimonialsArray, ...testimonialsArray, ...testimonialsArray];
};

const firstColumn = createExtendedTestimonials(testimonials.slice(0, 4));
const secondColumn = createExtendedTestimonials(testimonials.slice(4, 8));
const thirdColumn = createExtendedTestimonials(testimonials.slice(8, 12));

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
                  <p className="testimonial-text" style={{ fontSize: '14px' }}>{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="testimonial-info" style={{ marginLeft: 0, textAlign: 'left', alignItems: 'flex-start' }}>
                      <div className="testimonial-name" style={{ textAlign: 'left' }}>{testimonial.name}</div>
                      <div className="testimonial-role" style={{ textAlign: 'left' }}>{testimonial.role}</div>
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
                  <p className="testimonial-text" style={{ fontSize: '14px' }}>{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="testimonial-info" style={{ marginLeft: 0, textAlign: 'left', alignItems: 'flex-start' }}>
                      <div className="testimonial-name" style={{ textAlign: 'left' }}>{testimonial.name}</div>
                      <div className="testimonial-role" style={{ textAlign: 'left' }}>{testimonial.role}</div>
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
                  <p className="testimonial-text" style={{ fontSize: '14px' }}>{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="testimonial-info" style={{ marginLeft: 0, textAlign: 'left', alignItems: 'flex-start' }}>
                      <div className="testimonial-name" style={{ textAlign: 'left' }}>{testimonial.name}</div>
                      <div className="testimonial-role" style={{ textAlign: 'left' }}>{testimonial.role}</div>
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
