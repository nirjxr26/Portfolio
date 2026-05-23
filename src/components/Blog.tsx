"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './Blog.module.css';

const blogPosts = [
  {
    id: 4,
    tag: "",
    readTime: "",
    badgeTitle: "Containerization",
    badgeDesc: "Docker & K8s",
    title: "Containerizing AegisMesh",
    description: "Containerizing AegisMesh with Docker, Kubernetes, and Jenkins. How a \"few hours\" turned into a week, and what I'd do differently.",
    date: "Apr 2026",
    footer: "3 takeaways",
    gradientClass: styles.gradientDockerJenkins,
    articleUrl: "https://blog.nirjar.me/containerized-aegismesh"
  },
  {
    id: 3,
    tag: "",
    readTime: "",
    badgeTitle: "Git Workflow",
    badgeDesc: "Tracking Changes",
    title: "How GitHub changed my workflow",
    description: "I put off GitHub longer than made sense. Learning the commands was fine. What got me was figuring out how much work I'd already lost without knowing it.",
    date: "Apr 2026",
    footer: "3 takeaways",
    gradientClass: styles.gradientGreen,
    articleUrl: "https://blog.nirjar.me/how-github-changed-my-workflow"
  },
  {
    id: 1,
    tag: "",
    readTime: "",
    badgeTitle: "Blind Spots",
    badgeDesc: "CI/CD visibility",
    title: "Building DeployLens Exposed My Deployment Blind Spots",
    description: "I built a CI/CD visibility tool and couldn't answer a basic question: what's actually running in production right now?",
    date: "Apr 2026",
    footer: "3 takeaways",
    gradientClass: styles.gradientBlue,
    articleUrl: "https://blog.nirjar.me/ci-cd-blind-spots"
  }
];

const Blog = () => {
  // Render exactly the first (Docker) and middle (Git) cards
  const activePosts = blogPosts.filter(post => post.id === 4 || post.id === 3);

  const renderCardArt = (postId: number) => {
    switch (postId) {
      case 4: // Containerization (Docker)
        return (
          <div className={`${styles.artWrapper} ${styles.dockerArt}`}>
            <div className={styles.logoGroup}>
              <img
                src="/assets/icons/tech/docker.svg"
                alt="Docker Logo"
                className={styles.groupIcon}
              />
              <img
                src="/assets/icons/tech/kubernetes.svg"
                alt="Kubernetes Logo"
                className={styles.groupIcon}
              />
              <img
                src="/assets/icons/tech/HashiCorp Terraform.svg"
                alt="Terraform Logo"
                className={styles.groupIcon}
              />
            </div>
          </div>
        );
      case 3: // Git Workflow
      default:
        return (
          <div className={`${styles.artWrapper} ${styles.gitArt}`}>
            <img
              src="/assets/icons/tech/git.svg"
              alt="Git Logo"
              className={styles.logoIcon}
            />
          </div>
        );
    }
  };

  return (
    <section id="blog" className={styles.blogSection} data-aos="fade-up">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionHeader} data-aos="fade-up" data-aos-duration="600">Engineering Notes</h2>
          <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100" data-aos-duration="600">Articles on what I’ve experienced.</p>
        </div>

        <div className={styles.blogGrid}>
          {activePosts.map((post, index) => (
            <a
              key={post.id}
              className={styles.blogCard}
              href={post.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay={(index * 150) + 100}
              data-aos-duration="800"
            >
              {renderCardArt(post.id)}

              <h3 className={styles.cardTitle}>{post.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
