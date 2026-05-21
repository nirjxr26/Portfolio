"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './TechStack.module.css';

interface TechIcon {
  name: string;
  icon: string;
  isLarger?: boolean;
  isExtraLarge?: boolean;
}

const techIcons: TechIcon[] = [
  // Cloud & Infrastructure
  { name: "AWS", icon: "/assets/icons/tech/aws_logo.svg" },
  { name: "Linux", icon: "/assets/icons/tech/linux.svg" },
  { name: "Bash", icon: "/assets/icons/tech/Bash.svg" },
  { name: "Nginx", icon: "/assets/icons/tech/nginx.svg" },

  // Containerization & Orchestration
  { name: "Docker", icon: "/assets/icons/tech/docker.svg" },
  { name: "Kubernetes", icon: "/assets/icons/tech/kubernetes.svg" },
  { name: "ArgoCD", icon: "/assets/icons/tech/argo.svg", isLarger: true },

  // CI/CD & VCS
  { name: "Jenkins", icon: "/assets/icons/tech/jenkins.svg", isLarger: true },
  { name: "GitHub Actions", icon: "/assets/icons/tech/github-actions.svg" },
  { name: "GitHub", icon: "/assets/icons/tech/github.svg", isLarger: true },
  { name: "GitLab", icon: "/assets/icons/tech/gitlab.svg" },
  { name: "Git", icon: "/assets/icons/tech/git.svg" },

  // Monitoring
  { name: "Grafana", icon: "/assets/icons/tech/grafana.svg" },
  // { name: "Datadog", icon: "/assets/icons/tech/datadog.svg" },

  // Languages
  { name: "Go", icon: "/assets/icons/tech/go.svg", isLarger: true },
  { name: "Python", icon: "/assets/icons/tech/python.svg" },
  { name: "TypeScript", icon: "/assets/icons/tech/typescript.svg" },
  { name: "JavaScript", icon: "/assets/icons/tech/javascript.svg" },
  { name: "Java", icon: "/assets/icons/tech/java.svg" },

  // Databases
  { name: "PostgreSQL", icon: "/assets/icons/tech/postgresql.svg" },
  { name: "MySQL", icon: "/assets/icons/tech/MySQL.svg" },
];

const TechStack = () => {
  return (
    <section id="tech-stack" className={styles.techStackSection} data-aos="fade-up">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.headerLabel} data-aos="fade-up" data-aos-duration="600">
            Stack
          </h2>
          <p className={styles.headerSubtitle} data-aos="fade-up" data-aos-delay="100" data-aos-duration="600">
            Technologies, frameworks and tools I use to build applications.
          </p>
        </div>
        <div className={styles.centeredContainer}>
          <div className={styles.iconsContainer}>
            {techIcons.map((tech, index) => (
              <motion.div
                key={index}
                className={styles.iconBox}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                whileHover={{
                  scale: 1.1,
                }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className={`
                    ${styles.iconImg} 
                    ${tech.isLarger ? styles.largerIcon : ''} 
                    ${tech.isExtraLarge ? styles.extraLargeIcon : ''}
                  `}
                />
                <span className={styles.iconName}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
