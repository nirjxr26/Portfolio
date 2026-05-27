"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import styles from './Leadership.module.css';

// Google Developer Ambassador custom sketch visual frame
const AmbassadorEmblem = () => {
  return (
    <div className={styles.logoWrapper}>
      <img
        src="/assets/icons/ui/nirjar_sketch.jpg"
        alt="Nirjar Goswami Sketch"
        className={styles.sketchImage}
      />
    </div>
  );
};

const Leadership = () => {
  return (
    <section id="leadership" className={styles.leadershipSection} data-aos="fade-up">
      <div className="container">
        {/* Header Block */}
        <div className={styles.header}>
          <h2 className={styles.sectionHeader} data-aos="fade-up" data-aos-duration="600">
            Leadership & Community
          </h2>
          <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100" data-aos-duration="600">
            Helping developers build real things and actually ship them.
          </p>
        </div>

        {/* Ambient background blur colors */}
        <div className={styles.glowBackground}>
          <div className={styles.glowBlue} />
          <div className={styles.glowRed} />
          <div className={styles.glowYellow} />
          <div className={styles.glowGreen} />
        </div>

        {/* Glassmorphic Ambassador Card */}
        <div 
          className={styles.ambassadorCard}
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="800"
        >
          {/* Left Column: Visual branding and ID Tag */}
          <div className={styles.visualColumn}>
            <AmbassadorEmblem />
            
            {/* <div className={styles.idTag}>
              <div className={styles.idDot} />
              <span>Ambassador GID: 8629</span>
            </div> */}
          </div>

          {/* Right Column: Detailed Credentials and Achievements */}
          <div className={styles.contentColumn}>
            <h3 className={styles.roleTitle}>
              Google Student Ambassador
            </h3>
            
            <p className={styles.programName}>
              Google Developer Groups & Communities
            </p>

            <div className={styles.middleContent}>
              {/* Core Impact Pillars */}
              <div className={styles.pillarList}>
                {/* Pillar 1 */}
                <div className={styles.pillarItem}>
                  <div className={styles.pillarText}>
                    <h4 className={styles.pillarTitle}>Gemini Ambassador Initiative</h4>
                    <p className={styles.pillarDesc}>
                      Conducted 5+ peer interviews gathering student feedback on AI tool adoption for Google’s Gemini ambassador initiative.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className={styles.pillarItem}>
                  <div className={styles.pillarText}>
                    <h4 className={styles.pillarTitle}>Developer Demos</h4>
                    <p className={styles.pillarDesc}>
                      Led Gemini demos at CHARUSAT University, covering AI-assisted debugging, docs, and dev workflows.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className={styles.pillarItem}>
                  <div className={styles.pillarText}>
                    <h4 className={styles.pillarTitle}>Google Study Jams</h4>
                    <p className={styles.pillarDesc}>
                      Ran Google Study Jams that got 9+ students their official Cloud skills badges.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clickable Verification Button */}
            <a
              href="https://www.linkedin.com/posts/nirjxr_googleindia-googlestudentambassador-gsa2026-share-7465325984406204416-x-d6/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGOK1LUBycBiOJtYGid75GOM2SOr-NxkL58"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.verifyBtn}
            >
              <ShieldCheck size={18} />
              <span>Verify Google Profile</span>
              {/* <ExternalLink size={14} style={{ opacity: 0.8 }} /> */}
            </a>
          </div>

          {/* Subtle GID Watermark */}
          <div className={styles.gidWatermark}>
            8629
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
