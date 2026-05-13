import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import electricityBillImg from '../assets/electricityBill.jpg';

// ─── Blog metadata ────────────────────────────────────────────────────────────
// To add a new blog: append a new entry to this array.
// The `slug` must match the route path segment in App.tsx.
export const blogPosts = [
  {
    slug: 'blog1',
    title: "Why Your Electricity Bill Can Increase Even When You Don't Use Too Many Appliances",
    excerpt:
      'Learn how sanctioned load, overloaded circuits, heavy appliances, and old wiring can silently increase electricity usage and create safety issues at home.',
    category: 'Electrical Safety',
    date: 'May 2025',
    readTime: '6 min read',
    image: electricityBillImg,
  },
  // Future entries go here ↓
];

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Blog card ────────────────────────────────────────────────────────────────
const BlogCard: React.FC<(typeof blogPosts)[0]> = ({ slug, title, excerpt, category, date, readTime, image }) => (
  <motion.article
    className="bl-card"
    variants={fadeUp}
    whileHover={{ y: -6 }}
    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
  >
    <Link to={`/blog/${slug}`} className="bl-card-link">
      {/* Image */}
      <div className="bl-card-img-wrap">
        <img src={image} alt={title} className="bl-card-img" />
        <span className="bl-card-category">{category}</span>
      </div>

      {/* Body */}
      <div className="bl-card-body">
        <div className="bl-card-meta">
          <span>{date}</span>
          <span className="bl-card-meta-dot" />
          <span>{readTime}</span>
        </div>

        <h2 className="bl-card-title">{title}</h2>
        <p className="bl-card-excerpt">{excerpt}</p>

        <div className="bl-card-cta">
          Read article
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  </motion.article>
);

// ─── Blog index page ──────────────────────────────────────────────────────────
const Blog: React.FC = () => (
  <div className="bl-page">
    <Navbar />

    {/* Hero */}
    <section className="bl-hero">
      <motion.div className="bl-hero-inner" initial="hidden" animate="visible" variants={stagger}>
        <motion.span className="bl-pill" variants={fadeUp}>Journal</motion.span>
        <motion.h1 className="bl-hero-title" variants={fadeUp}>
          Electrical Awareness Blogs
        </motion.h1>
        <motion.p className="bl-hero-subtitle" variants={fadeUp}>
          Practical electrical safety, energy awareness, and smart home guidance.
        </motion.p>
        <motion.div className="bl-hero-divider" variants={fadeUp} />
      </motion.div>
    </section>

    {/* Posts grid */}
    <section className="bl-grid-section">
      <motion.div
        className="bl-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
      >
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </motion.div>

      {/* Empty state placeholder — rendered only when there is exactly one post to show a "More coming" card */}
      {blogPosts.length === 1 && (
        <motion.div
          className="bl-placeholder-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bl-placeholder-inner">
            <div className="bl-placeholder-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <p className="bl-placeholder-text">More articles are on the way.</p>
          </div>
        </motion.div>
      )}
    </section>
  </div>
);

export default Blog;
