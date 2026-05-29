"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Send,
  ArrowRight,
  Instagram,
  Twitter,
  Linkedin,
  Ghost,
  Github,
  Mail,
  Phone,
  MapPin,
  Download,
  BookOpen
} from 'lucide-react';
import styles from './Contact.module.css';

const HashnodeIcon = ({ size = 28, className }: { size?: number, className?: string }) => (
  <img
    src="/assets/icons/social/hashnode.svg"
    width={size}
    height={size}
    alt="Hashnode"
    className={className}
    style={{ display: 'block' }}
  />
);

const GithubIcon = ({ size = 28, className }: { size?: number, className?: string }) => (
  <img
    src="/assets/icons/social/github.svg"
    width={size * 2.2}
    height={size * 2.2}
    alt="GitHub"
    className={className}
    style={{ display: 'block', transform: 'scale(1.25)' }}
  />
);

const Contact = () => {
  const [showLocation, setShowLocation] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xpqjwgek", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert("Thanks for your message! I'll get back to you soon.");
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form.");
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.96, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const leftItemVariants: Variants = {
    hidden: { opacity: 0, x: -20, scale: 0.96, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="contact" className={styles.contactSection} data-aos="fade-up">
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.indicator}>
            <h2
              className={styles.indicatorText}
              data-aos="fade-up"
              data-aos-duration="600"
            >
              Get in Touch
            </h2>
            <p
              className={styles.description}
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="600"
            >
              Please contact me directly at <a href="mailto:nirjargoswami2626@gmail.com" className={styles.mailLink}>nirjargoswami2626@gmail.com</a> or through this form.
            </p>
            <p
              className={styles.description}
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="700"
            >
              Building cloud-native applications, IAM systems, and secure backend architectures. Looking to work on problems that actually ship.
            </p>

            <motion.div
              className={styles.indicatorLine}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="600"
          >
            <div className={styles.inputGroup}>
              <label className={styles.label}>Your name</label>
              <input type="text" name="name" className={styles.input} placeholder="Jane Doe" required suppressHydrationWarning />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Company</label>
                <input type="text" name="company" className={styles.input} placeholder="Your company" suppressHydrationWarning />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <input type="email" name="email" className={styles.input} placeholder="you@gmail.com" required suppressHydrationWarning />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Phone</label>
              <input type="text" name="phone" className={styles.input} placeholder="+91 98765 43210" suppressHydrationWarning />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Message</label>
              <textarea
                className={styles.textarea}
                name="message"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <div className={styles.submitContainer}>
              <button type="submit" className={styles.submitBtn} suppressHydrationWarning>
                Send Message
                <ArrowRight size={18} />
              </button>
              <span className={styles.privacyText}>No spam. Your details stay private.</span>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.socialSection} data-aos="fade-up" data-aos-delay="500" data-aos-duration="700">
        <div className="container">
          <div className={styles.socialSubheader}>
            <h3 className={styles.socialTitle}>Socials</h3>
            <p className={styles.socialSubtitle}>Prefer not using the form? Reach me here.</p>
          </div>
          <div className={styles.socialGrid}>
            <div className={styles.socialRowsWrapper}>
              {/* Main Social Profiles */}
              <div className={styles.socialGrid}>
                {[
                  { icon: Instagram, name: "Instagram", href: "https://www.instagram.com/nirjar_goswami/" },
                  { icon: Twitter, name: "X", href: "https://x.com/nirjxrgoswami" },
                  { icon: Linkedin, name: "LinkedIn", href: "https://www.linkedin.com/in/nirjxr" },
                  { icon: Ghost, name: "Snapchat", href: "https://www.snapchat.com/@nirjxr26" },
                  { icon: GithubIcon, name: "GitHub", href: "https://github.com/nirjxr26/" },
                  { icon: HashnodeIcon, name: "Hashnode", href: "https://nirjar.hashnode.dev/" }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    aria-label={`Visit Nirjar's ${item.name}`}
                    className={styles.socialItem}
                    target="_blank"
                    rel="noopener noreferrer me"
                    whileTap={{ scale: 0.9 }}
                    data-aos="fade-up"
                    data-aos-delay={400 + (index * 50)}
                    data-aos-duration="600"
                  >
                    <item.icon className={styles.socialIconImg} size={28} />
                  </motion.a>
                ))}
              </div>

              {/* Direct Contact Methods */}
              <div className={styles.contactGrid}>
                {[
                  { icon: Mail, name: "Email", href: "mailto:nirjargoswami2626@gmail.com", type: 'action' },
                  { icon: Phone, name: "Phone", href: "tel:+918799142626", type: 'action' },
                  { icon: MapPin, name: "Location", type: 'location' }
                ].map((item, index) => (
                  <div key={index} className={styles.socialWrapper}>
                    {item.type === 'location' ? (
                      <div className={styles.locationContainer}>
                        <motion.button
                          className={styles.socialItem}
                          aria-label="Show Location"
                          onClick={() => setShowLocation(!showLocation)}
                          data-aos="fade-up"
                          data-aos-delay={1200 + (index * 100)}
                          data-aos-duration="700"
                        >
                          <MapPin className={styles.socialIconImg} size={28} />
                        </motion.button>
                        <AnimatePresence>
                          {showLocation && (
                            <motion.div
                              className={styles.locationPopup}
                              initial={{ opacity: 0, x: -15, scale: 0.96 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: -15, scale: 0.96 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                              Ahmedabad, Gujarat
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.a
                        href={item.href}
                        className={styles.socialItem}
                        aria-label={`Contact via ${item.name}`}
                        target="_blank"
                        rel="noopener noreferrer me"
                        data-aos="fade-up"
                        data-aos-delay={700 + (index * 50)}
                        data-aos-duration="600"
                      >
                        <item.icon className={styles.socialIconImg} size={28} />
                      </motion.a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.resumeContainer}>
            <motion.a
              href="/assets/docs/Nirjar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              download="Nirjar_Goswami_Resume.pdf"
              data-aos="fade-up"
              data-aos-delay="1000"
              data-aos-duration="600"
            >
              <Download size={20} />
              <span>Download Resume</span>
            </motion.a>
          </div>

          <div
            className={styles.copyright}
            data-aos="fade-up"
            data-aos-delay="900"
            data-aos-duration="600"
          >
            © {new Date().getFullYear()} Nirjar Goswami. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
