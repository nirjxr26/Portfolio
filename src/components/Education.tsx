"use client";

import React from 'react';
import { Award, GraduationCap, BookOpen } from 'lucide-react';
import styles from './Education.module.css';

const Education = () => {
  return (
    <section id="education" className={styles.educationSection} data-aos="fade-up">
      <div className="container">
        {/* Header Block */}
        <div className={styles.header}>
          <h2 className={styles.sectionHeader} data-aos="fade-up" data-aos-duration="600">
            Education
          </h2>
          <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100" data-aos-duration="600">
            Learning the fundamentals, one layer at a time.
          </p>
        </div>

        {/* Education Grid Container */}
        <div className={styles.grid}>
          {/* Card 1: GLS University */}
          <div 
            className={`${styles.card} ${styles.cardGls}`}
            data-aos="fade-up"
            data-aos-delay="150"
            data-aos-duration="800"
          >
            {/* Corner Decorative Effect */}
            <div className={styles.cornerEffect}>
              <div className={styles.cornerBg}></div>
              <div className={styles.cornerIconWrapper}>
                <BookOpen className={styles.cornerIcon} size={20} />
              </div>
            </div>

            <div className={styles.content}>

              {/* Degree Title */}
              <h3 className={styles.degreeTitle}>
                Master of Science<br /><span className={styles.highlightText}>(Cyber Security)</span>
              </h3>

              {/* Institution and Location */}
              <div className={styles.institutionRow}>
                <span>Gujarat Law Society (GLS)</span>
                <span className={styles.dot}>•</span>
                <span>Ahmedabad, Gujarat</span>
              </div>

              {/* Divider Line */}
              <div className={styles.divider}></div>

              {/* Course Highlights */}
              <p className={styles.details}>
Advanced studies in information security, cryptography, threat intelligence, and secure cloud architecture.
              </p>
            </div>

            {/* Pursuing Status Badge */}
            <div className={styles.footerRow}>
              <div className={styles.pursuingBadge}>
                <span>Pursuing</span>
              </div>
              <span className={styles.duration}>
                2026 – 2028
              </span>
            </div>
          </div>

          {/* Card 2: CHARUSAT University */}
          <div 
            className={`${styles.card} ${styles.cardCharusat}`}
            data-aos="fade-up"
            data-aos-delay="250"
            data-aos-duration="800"
          >
            {/* Corner Decorative Effect */}
            <div className={styles.cornerEffect}>
              <div className={styles.cornerBg}></div>
              <div className={styles.cornerIconWrapper}>
                <GraduationCap className={styles.cornerIcon} size={20} />
              </div>
            </div>

            <div className={styles.content}>

              {/* Degree Title */}
              <h3 className={styles.degreeTitle}>
                Bachelor of<br /><span className={styles.highlightText}>Computer Applications</span>
              </h3>

              {/* Institution and Location */}
              <div className={styles.institutionRow}>
                <span>CHARUSAT</span>
                <span className={styles.dot}>•</span>
                <span>Nadiad, Gujarat</span>
              </div>

              {/* Divider Line */}
              <div className={styles.divider}></div>

              {/* Course Highlights */}
              <p className={styles.details}>
                Built a strong foundation in databases, software engineering, networking, and modern web technologies.
              </p>
            </div>

            {/* GPA Badge */}
            <div className={styles.footerRow}>
              <div className={styles.gradeBadge}>
                <span>CGPA: 8.9 / 10</span>
              </div>
              <span className={styles.duration}>
                2023 – 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
