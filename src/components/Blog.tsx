"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './Blog.module.css';

const blogPosts = [
  {
    id: 7,
    tag: "AI & SYSTEMS",
    readTime: "6 MIN READ",
    badgeTitle: "Beyond code.",
    badgeDesc: "The hidden complexity behind Windows",
    title: "Why AI can't just rewrite Windows",
    description: "AI can generate apps. Windows is different. Decades of quirks, compatibility requirements, and interactions nobody has fully mapped — not one engineer, not a model.",
    date: "Jun 2026",
    footer: "7 takeways",
    gradientClass: styles.gradientMicrosoft,
    articleUrl: "https://blog.nirjar.me/why-ai-cant-just-rewrite-windows"
  },
  {
    id: 4,
    tag: "DEVSECOPS",
    readTime: "5 MIN READ",
    badgeTitle: "872 issues. Day one.",
    badgeDesc: "What SonarQube found in codebase",
    title: "SonarQube had notes.",
    description: "The codebase was growing — more services and more auth logic. I had no way to tell if the codebase was getting better or just bigger. So I added SonarQube and looked.",
    date: "May 2026",
    footer: "4 takeaways",
    gradientClass: styles.gradientPurple,
    articleUrl: "https://blog.nirjar.me/sonarqube"
  },
  {
    id: 5,
    tag: "INFRASTRUCTURE",
    readTime: "5 MIN READ",
    badgeTitle: "Zero environment drift",
    badgeDesc: "When local matches production",
    title: "I avoided Docker for months. That was the mistake.",
    description: "Containerizing AegisMesh with Docker, Kubernetes, and Jenkins. How a \"few hours\" turned into a week, and what I'd do differently.",
    date: "Apr 2026",
    footer: "3 takeaways",
    gradientClass: styles.gradientWarm,
    articleUrl: "https://blog.nirjar.me/containerized-aegismesh"
  },
  {
    id: 3,
    tag: "GIT WORKFLOW",
    readTime: "4 MIN READ",
    badgeTitle: "Never lose a line",
    badgeDesc: "How version control saved my sanity",
    title: "How GitHub changed my workflow",
    description: "I put off GitHub longer than made sense. Learning the commands was fine. What got me was figuring out how much work I'd already lost without knowing it.",
    date: "Apr 2026",
    footer: "3 takeaways",
    gradientClass: styles.gradientGreen,
    articleUrl: "https://blog.nirjar.me/how-github-changed-my-workflow"
  },
  {
    id: 1,
    tag: "OBSERVABILITY",
    readTime: "6 MIN READ",
    badgeTitle: "Is it live yet?",
    badgeDesc: "Connecting commits to production status",
    title: "Building DeployLens Exposed My Deployment Blind Spots",
    description: "I built a CI/CD visibility tool and couldn't answer a basic question: what's actually running in production right now?",
    date: "Apr 2026",
    footer: "3 takeaways",
    gradientClass: styles.gradientBlue,
    articleUrl: "https://blog.nirjar.me/ci-cd-blind-spots"
  }
];

const Blog = () => {
  return (
    <section id="blog" className={styles.blogSection} data-aos="fade-up">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionHeader} data-aos="fade-up" data-aos-duration="600">Engineering Notes</h2>
          <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100" data-aos-duration="600">Articles on what I’ve experienced.</p>
        </div>

        <div className={styles.blogGrid}>
          {blogPosts.slice(0, 2).map((post, index) => (
            <div
              key={post.id}
              className={styles.blogCard}
              data-aos="fade-up"
              data-aos-delay={(index * 100) + 100}
              data-aos-duration="600"
            >
              <div className={`${styles.cardHeader} ${post.gradientClass}`}>
                <div className={styles.tagGroup}>
                  <span className={styles.tag}>{post.tag}</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>

                <div className={styles.badgeBox}>
                  <h4 className={styles.badgeTitle}>{post.badgeTitle}</h4>
                  <p className={styles.badgeDesc}>{post.badgeDesc}</p>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardDescription}>{post.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.footerInfo}>
                    <span className={styles.date}>{post.date}</span>
                    <span className={styles.takeaways}>{post.footer}</span>
                  </div>
                  <a
                    className={styles.readButton}
                    href={post.articleUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Read article: ${post.title}`}
                  >
                    Read article
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewMoreContainer} data-aos="fade-up" data-aos-delay="200" data-aos-duration="600">
          <a
            href="https://blog.nirjar.me/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewMoreButton}
          >
            <span>Engineering Notes</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
