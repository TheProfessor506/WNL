import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import './App.css';

function App() {
  const containerRef = useRef(null);

  // Track scroll position for hero fade out
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // When scrolling the first half, affect the hero section
  // Note: Since .hero-section is sticky, scrollY progress tracks the container height nicely
  const heroOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.8]);
  const heroY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const textBlur = useTransform(smoothProgress, [0, 0.6], ["blur(0px)", "blur(10px)"]);

  // Variants for contact items stagger effect based on 'whileInView'
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div className="app-container" ref={containerRef}>
      {/* Hero Section stays fixed/sticky relative to the container */}
      <motion.section
        className="hero-section"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
          filter: textBlur
        }}
      >
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="logo-badge"
          >
            <Globe className="logo-icon" />
            <span>placeholder</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Worldnet Logistic
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="subtitle"
          >
            placeholder
          </motion.p>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p>Scroll down</p>
            <motion.div
              className="scroll-line"
              animate={{
                height: ["0px", "40px", "0px"],
                y: [0, 40, 80],
                opacity: [0, 1, 0]
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* Dynamic Background */}
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </motion.section>

      {/* Contact Section slides over the hero section */}
      <section className="contact-section">
        <motion.div
          className="contact-card glass-panel"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </motion.h2>

          <motion.p
            className="contact-intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            placeholder
          </motion.p>

          <motion.div
            className="contact-grid"
            variants={containerVariants}
          >
            <motion.div className="contact-item" variants={itemVariants}>
              <div className="icon-wrapper">
                <MapPin className="contact-icon" />
              </div>
              <div>
                <h3>Headquarters</h3>
                <p>Str. Drumul Gării Balotești,  58-62<br />Otopeni, Ilfov, Romania</p>
              </div>
            </motion.div>

            <motion.div className="contact-item" variants={itemVariants}>
              <div className="icon-wrapper">
                <Mail className="contact-icon" />
              </div>
              <div>
                <h3>Email Us</h3>
                <p>placeholder<br />placeholder</p>
              </div>
            </motion.div>

            <motion.div className="contact-item" variants={itemVariants}>
              <div className="icon-wrapper">
                <Phone className="contact-icon" />
              </div>
              <div>
                <h3>Call Us</h3>
                <p>placeholder<br />placeholder</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default App;
