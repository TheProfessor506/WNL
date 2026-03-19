import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Clipboard, CheckCircle, DollarSign, FileText, CreditCard, Shield } from 'lucide-react';
import './App.css';

const textContent = {
  en: {
    heroTitle: "Worldnet Logistic",
    heroSubtitle: "We manage the operational processing, commercial administration, and release of goods within airport cargo terminals, ensuring a controlled, transparent flow that complies with applicable regulations.",
    scrollDown: "Scroll down",
    whoWeAreTitle: "Who We Are",
    whoWeAreText: "We are the entity responsible for the commercial and administrative coordination of cargo services at the destination. We ensure the integration of handling operations, documentary management, and financial processes, offering a single point of contact for all beneficiaries of terminal services. Our activity covers the entire administrative cycle of the goods, from arrival to release to the consignee.",
    whatWeDoTitle: "What We Do",
    whatWeDoText: "We ensure the commercial management of the destination cargo flow, including documentary processing, service billing, and the controlled release of goods in the terminal.",
    services: [
      { title: "Handling Administration", desc: "Administering handling services provided in the terminal", icon: Clipboard },
      { title: "Operation Validation", desc: "Validating and recording performed operations", icon: CheckCircle },
      { title: "Tariff Application", desc: "Applying the tariff structure according to contracts and regulations", icon: DollarSign },
      { title: "Invoice Management", desc: "Issuing and managing invoices", icon: FileText },
      { title: "Service Payments", desc: "Collection of related services payments", icon: CreditCard },
      { title: "Goods Release", desc: "Authorizing the release of goods after completing formalities", icon: Shield },
    ],
    contactTitle: "Contact Us",
    headquarters: "Headquarters",
    emailUs: "Email Us",
    callUs: "Call Us",
    contactIntro: "placeholder"
  },
  ro: {
    heroTitle: "Worldnet Logistic",
    heroSubtitle: "Gestionăm procesarea operațională, administrarea comercială și eliberarea mărfurilor în cadrul terminalelor cargo aeroportuare, asigurând un flux controlat, transparent și conform reglementărilor aplicabile.",
    scrollDown: "Derulează în jos",
    whoWeAreTitle: "Cine Suntem",
    whoWeAreText: "Suntem entitatea responsabilă de coordonarea comercială și administrativă a serviciilor cargo desfășurate la destinație. Asigurăm integrarea dintre operațiunile de handling, gestionarea documentară și procesul financiar, oferind un punct unic de contact pentru toți beneficiarii serviciilor din terminal. Activitatea noastră acoperă întregul ciclu administrativ al mărfii, de la sosire până la eliberarea către destinatar.",
    whatWeDoTitle: "Ce Oferim",
    whatWeDoText: "Asigurăm managementul comercial al fluxului cargo la destinație, incluzând procesarea documentară, facturarea serviciilor și eliberarea controlată a mărfurilor în terminal.",
    services: [
      { title: "Administrarea Handling-ului", desc: "Administrarea serviciilor de handling prestate în terminal", icon: Clipboard },
      { title: "Validarea Operațiunilor", desc: "Validarea și înregistrarea operațiunilor efectuate", icon: CheckCircle },
      { title: "Aplicarea Tarifelor", desc: "Aplicarea structurii tarifare conform contractelor și regulamentelor", icon: DollarSign },
      { title: "Gestionarea Facturilor", desc: "Emiterea și gestionarea facturilor", icon: FileText },
      { title: "Încasarea Serviciilor", desc: "Încasarea serviciilor aferente", icon: CreditCard },
      { title: "Eliberarea Mărfurilor", desc: "Autorizarea eliberării mărfurilor după îndeplinirea formalităților", icon: Shield },
    ],
    contactTitle: "Contact",
    headquarters: "Sediu Central",
    emailUs: "E-mail",
    callUs: "Ne Puteți Suna",
    contactIntro: "placeholder"
  }
};

function App() {
  const containerRef = useRef(null);
  const [lang, setLang] = useState('en');
  const t = textContent[lang];

  // Track scroll position for hero fade out
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // When scrolling the first half, affect the hero section
  const heroOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.8]);
  const heroY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const textBlur = useTransform(smoothProgress, [0, 0.6], ["blur(0px)", "blur(10px)"]);

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

      {/* Language Toggle Fixed at Top Right */}
      <div className="language-toggle">
        <button
          className={`language-btn ${lang === 'ro' ? 'active' : ''}`}
          onClick={() => setLang('ro')}
        >
          RO
        </button>
        <span className="lang-separator">|</span>
        <button
          className={`language-btn ${lang === 'en' ? 'active' : ''}`}
          onClick={() => setLang('en')}
        >
          EN
        </button>
      </div>

      {/* Hero Section */}
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
            {t.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="subtitle"
          >
            {t.heroSubtitle}
          </motion.p>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p>{t.scrollDown}</p>
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

      {/* About Section */}
      <section className="about-section">
        <motion.div
          className="about-card glass-panel"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="about-header" variants={itemVariants}>
            <h2>{t.whoWeAreTitle}</h2>
            <p className="about-text">
              {t.whoWeAreText}
            </p>
          </motion.div>

          <motion.div className="services-header" variants={itemVariants}>
            <h2>{t.whatWeDoTitle}</h2>
            <p className="about-text">
              {t.whatWeDoText}
            </p>
          </motion.div>

          <motion.div className="services-grid" variants={containerVariants}>
            {t.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={index} className="service-item" variants={itemVariants}>
                  <div className="icon-wrapper">
                    <Icon className="service-icon" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
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
            {t.contactTitle}
          </motion.h2>

          <motion.p
            className="contact-intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.contactIntro}
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
                <h3>{t.headquarters}</h3>
                <p>Str. Drumul Gării Balotești,  58-62<br />Otopeni, Ilfov, Romania</p>
              </div>
            </motion.div>

            <motion.div className="contact-item" variants={itemVariants}>
              <div className="icon-wrapper">
                <Mail className="contact-icon" />
              </div>
              <div>
                <h3>{t.emailUs}</h3>
                <p>placeholder<br />placeholder</p>
              </div>
            </motion.div>

            <motion.div className="contact-item" variants={itemVariants}>
              <div className="icon-wrapper">
                <Phone className="contact-icon" />
              </div>
              <div>
                <h3>{t.callUs}</h3>
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
