"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import styles from './Leadership.module.css';

const Leadership = () => {
  return (
    <section id="leadership" className={styles.leadershipSection} data-aos="fade-up">
      <div className="container">
        {/* Header Block */}
        <div className={styles.header}>
          <h2 className={styles.sectionHeader} data-aos="fade-up" data-aos-duration="600">
            Community
          </h2>
          <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100" data-aos-duration="600">
            Helping developers build real things and ship them.
          </p>
        </div>

        {/* Mockup-Aligned Premium Card Container */}
        <div 
          className={styles.ambassadorCard}
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="800"
        >
          {/* Left Column: Visual branding, Role Title, Badge (Centered) */}
          <div className={styles.leftColumn}>
            {/* Large Google G Logo */}
            <div className={styles.logoWrapper}>
              <img
                src="/assets/icons/tech/Google_Favicon_2025.svg"
                alt="Google Logo"
                className={styles.googleBigLogo}
              />
            </div>

            {/* Name/Role Title */}
            <h3 className={styles.roleTitle}>
              Student<br />Ambassador
            </h3>

            {/* Google Developer Program Badge */}
            <div className={styles.programBadge}>
              <span>Google Developer Program</span>
            </div>
          </div>

          {/* Right Column: Three Activity Rows divided by horizontal lines */}
          <div className={styles.rightColumn}>
            <div className={styles.activityLog}>
              {/* Row 1 */}
              <div className={styles.logRow}>
                <span className={styles.logLabel}>Gemini Initiative</span>
                <p className={styles.logText}>
                  Conducted 5+ peer interviews gathering student feedback on AI tool adoption for Google’s Gemini ambassador initiative.
                </p>
              </div>

              {/* Row 2 */}
              <div className={styles.logRow}>
                <span className={styles.logLabel}>Developer Demos</span>
                <p className={styles.logText}>
                  Led Gemini demos at CHARUSAT University, covering AI-assisted debugging, documentation workflows, and modern developer tooling.
                </p>
              </div>

              {/* Row 3 */}
              <div className={styles.logRow}>
                <span className={styles.logLabel}>Cloud Study Jams</span>
                <p className={styles.logText}>
                  Ran Google Study Jams that helped 9+ students earn official Google Cloud skills badges and hands-on cloud experience.
                </p>
              </div>
            </div>

            {/* Clickable Solid Verify Button with ShieldCheck Icon */}
            <div className={styles.actionWrapper}>
              <a
                href="https://www.linkedin.com/posts/nirjxr_googleindia-googlestudentambassador-gsa2026-share-7465325984406204416-x-d6/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGOK1LUBycBiOJtYGid75GOM2SOr-NxkL58"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.verifyBtn}
              >
                <ShieldCheck size={14} className={styles.verifyIcon} />
                <span>Verify Google Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
