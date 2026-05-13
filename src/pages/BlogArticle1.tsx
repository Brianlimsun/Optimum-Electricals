import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import electricityBillImg from '../assets/electricityBill.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const safeAppliances = [
  { label: 'Lights', watt: '≤ 60W' },
  { label: 'Ceiling Fans', watt: '≤ 75W' },
  { label: 'Television', watt: '≤ 150W' },
  { label: 'Mobile Charging', watt: '≤ 25W' },
  { label: 'Refrigerator', watt: '≤ 200W' },
  { label: 'Basic Usage', watt: 'Low load' },
];

const heavyAppliances = [
  { label: 'Geyser', watt: '2000W' },
  { label: 'Room Heater', watt: '1500W' },
  { label: 'Induction Cooker', watt: '2000W' },
  { label: 'Electric Iron', watt: '1000W' },
  { label: 'Washing Machine', watt: '500W' },
  { label: 'Water Pump', watt: '750W' },
];

const warningSigns = [
  'Plug tops become hot to the touch',
  'Burning smell from switches or sockets',
  'Lights dim noticeably when heavy appliances start',
  'Frequent MCB tripping without clear reason',
  'Extension boards overloaded with multiple devices',
  'Electricity bill increasing without change in habits',
];

const consequences = [
  { title: 'MCB Trips Repeatedly', desc: 'The circuit breaker keeps cutting power to protect the system.' },
  { title: 'Wires and Plugs Overheat', desc: 'Insulation deteriorates, raising the risk of fire or shock.' },
  { title: 'Voltage Fluctuation', desc: 'Appliances receive inconsistent power, affecting lifespan.' },
  { title: 'Wiring Stress', desc: 'Sustained overload weakens the electrical infrastructure.' },
  { title: 'Bill Creep', desc: 'Inefficient circuits draw more energy for the same output.' },
];

const oldWiringIssues = [
  { title: 'Loose Connections', desc: 'Cause arcing, heat buildup, and intermittent faults.' },
  { title: 'Insulation Degradation', desc: 'Aged insulation cracks, exposing live conductors.' },
  { title: 'Current Leakage', desc: 'Silent drain on your bill and a shock hazard.' },
  { title: 'Increased Resistance', desc: 'Corroded contacts waste energy as heat.' },
];

const BlogArticle1: React.FC = () => {
  const [ctaHover, setCtaHover] = useState<string | null>(null);

  return (
    <div className="blog-article-page">
      <Navbar />

      <section className="ba-hero">
        <motion.div className="ba-hero-inner" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.span className="ba-pill" variants={fadeUp}>Electrical Awareness</motion.span>
          <motion.h1 className="ba-hero-title" variants={fadeUp}>
            Why Your Electricity Bill Can Increase Even When You Don't Use Too Many Appliances
          </motion.h1>
          <motion.p className="ba-hero-meta" variants={fadeUp}>
            A practical guide to understanding sanctioned load, overloading risks, and what to do about it.
          </motion.p>
          <motion.div className="ba-divider" variants={fadeUp} />
        </motion.div>
      </section>

      <article className="ba-article">

        <motion.section className="ba-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="ba-lead">
            Many homes slowly add more and more electrical appliances over time. A TV here, a geyser there — and before long, the home is drawing far more than its connection was designed for.
          </p>
          <p className="ba-body">
            But one important thing most people never check is whether the home connection is actually designed to handle that much load. This can create a chain of problems that build quietly over months before becoming obvious.
          </p>
          <motion.ul className="ba-issue-list" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {['High electricity bills', 'Heating wires and plugs', 'Repeated MCB tripping', 'Stress on appliances', 'Unsafe wiring conditions'].map((item) => (
              <motion.li key={item} variants={cardVariant} className="ba-issue-item">
                <span className="ba-issue-dot" />{item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        <motion.section className="ba-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <h2 className="ba-section-title">What is sanctioned load?</h2>
          <p className="ba-body">
            Sanctioned load simply means the maximum electrical load approved for your home connection by the electricity provider. It is set at the time of connection and defines the capacity you are legally and safely permitted to draw.
          </p>
          <p className="ba-body">
            If your electricity bill shows <strong>2kW (2000 W)</strong>, it means the connection is designed for basic household electrical usage — a range that covers lights, fans, a TV, and a refrigerator comfortably. Not a geyser and induction cooker running at the same time.
          </p>
          <div className="ba-bill-wrapper">
            <div className="ba-bill-card">
              <div className="ba-bill-label">Your electricity bill — what to look for</div>
              <div className="ba-bill-image-wrap">
                <img src={electricityBillImg} alt="Electricity bill showing sanctioned load" className="ba-bill-img" />
                <motion.div
                  className="ba-bill-highlight"
                  animate={{ boxShadow: ['0 0 0px 0px rgba(250, 204, 20, 0)', '0 0 20px 6px rgba(250, 204, 20, 0.55)', '0 0 0px 0px rgba(250, 204, 20, 0)'] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="ba-highlight-text">C. Demand / Load → 2kW</span>
                  <motion.div className="ba-highlight-pointer" animate={{ x: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
                    ← look here
                  </motion.div>
                </motion.div>
              </div>
              <p className="ba-bill-caption">The "Demand / Load" field in your bill shows the sanctioned load. If it reads 2kW, that is your approved limit.</p>
            </div>
          </div>
        </motion.section>

        <motion.section className="ba-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <h2 className="ba-section-title">The real issue most people overlook</h2>
          <div className="ba-quote-block">
            <p className="ba-quote-text">"Higher monthly units means I am overloading the system."</p>
            <div className="ba-quote-divider" />
            <p className="ba-quote-refute">
              That is not always the case. The actual risk comes from how many heavy appliances are running <em>at the same moment</em> — not how much you use over a month.
            </p>
          </div>
          <p className="ba-body">
            Monthly units (kWh) measure energy consumed over time. Sanctioned load, on the other hand, measures the power drawn at any single instant. These are different things, and confusing them is how most homes end up overloading their circuits.
          </p>
        </motion.section>

        <motion.section className="ba-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <h2 className="ba-section-title">What a 2 kW connection handles comfortably</h2>
          <p className="ba-body">Within this range, the following appliances can generally run without stressing the wiring:</p>
          <motion.div className="ba-appliance-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {safeAppliances.map((a) => (
              <motion.div key={a.label} className="ba-appliance-card safe" variants={cardVariant}>
                <span className="ba-appliance-name">{a.label}</span>
                <span className="ba-appliance-badge safe-badge">{a.watt}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section className="ba-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <h2 className="ba-section-title">Where problems begin</h2>
          <p className="ba-body">Problems usually start when multiple high-wattage appliances are switched on together. Each of these individually draws a large portion of a 2 kW connection:</p>
          <motion.div className="ba-appliance-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {heavyAppliances.map((a) => (
              <motion.div key={a.label} className="ba-appliance-card heavy" variants={cardVariant}>
                <span className="ba-appliance-name">{a.label}</span>
                <span className="ba-appliance-badge heavy-badge">{a.watt}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section className="ba-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <h2 className="ba-section-title">A real-world example</h2>
          <p className="ba-body">Imagine a typical morning — someone runs the geyser while another person uses the induction cooker, and someone else irons clothes. Here is what happens to the numbers:</p>
          <div className="ba-calc-card">
            <div className="ba-calc-title">Live Load Calculation</div>
            <div className="ba-calc-rows">
              {[{ label: 'Geyser', watt: 2000 }, { label: 'Electric Iron', watt: 1000 }, { label: 'Induction Cooker', watt: 2000 }].map((row, i) => (
                <div key={i} className="ba-calc-row">
                  <span className="ba-calc-label">{row.label}</span>
                  <span className="ba-calc-watt">{row.watt.toLocaleString()} W</span>
                </div>
              ))}
              <div className="ba-calc-divider" />
              <div className="ba-calc-row total">
                <span className="ba-calc-label">Total simultaneous load</span>
                <span className="ba-calc-watt highlight">5,000 W</span>
              </div>
            </div>
            <div className="ba-calc-warning">A 2 kW connection is being asked to carry 5 kW — more than twice its designed capacity.</div>
          </div>
        </motion.section>

        <motion.section className="ba-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <h2 className="ba-section-title">What this leads to</h2>
          <motion.div className="ba-consequence-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {consequences.map((c) => (
              <motion.div key={c.title} className="ba-consequence-card" variants={cardVariant}>
                <div className="ba-consequence-title">{c.title}</div>
                <div className="ba-consequence-desc">{c.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section className="ba-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <h2 className="ba-section-title">The compounding problem: old wiring</h2>
          <p className="ba-body">Even a home with a correctly sized connection can face serious issues if the internal wiring is old or poorly maintained. Wiring that has not been inspected in a decade behaves differently from new wiring under the same load.</p>
          <motion.div className="ba-info-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {oldWiringIssues.map((item) => (
              <motion.div key={item.title} className="ba-info-card" variants={cardVariant}>
                <div className="ba-info-card-title">{item.title}</div>
                <div className="ba-info-card-desc">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section className="ba-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <h2 className="ba-section-title">Signs your home may need checking</h2>
          <p className="ba-body">These are not always dramatic. Often they start subtle and worsen gradually:</p>
          <motion.div className="ba-warning-list" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {warningSigns.map((sign, i) => (
              <motion.div key={i} className="ba-warning-item" variants={cardVariant}>
                <span className="ba-warning-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="ba-warning-text">{sign}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section className="ba-section ba-cta-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <div className="ba-cta-inner">
            <h2 className="ba-cta-title">Is your home wiring due for a check?</h2>
            <p className="ba-cta-body">
              If your home uses many appliances, has older wiring, or you have noticed any of the signs above, a proper inspection is the safest next step. A qualified electrician can identify overloaded circuits, unsafe wiring, and hidden issues before they become costly or dangerous.
            </p>
            <div className="ba-cta-actions">
              <a href="tel:+916033389808" className={`ba-cta-btn primary ${ctaHover === 'contact' ? 'hovered' : ''}`} onMouseEnter={() => setCtaHover('contact')} onMouseLeave={() => setCtaHover(null)}>
                Contact an Electrician
              </a>
              <a href="mailto:optimumbriansun@gmail.com" className={`ba-cta-btn secondary ${ctaHover === 'inspect' ? 'hovered' : ''}`} onMouseEnter={() => setCtaHover('inspect')} onMouseLeave={() => setCtaHover(null)}>
                Request an Inspection
              </a>
            </div>
          </div>
        </motion.section>

      </article>
    </div>
  );
};

export default BlogArticle1;
