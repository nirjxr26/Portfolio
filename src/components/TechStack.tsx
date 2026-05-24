"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './TechStack.module.css';

const techIcons = [
  { name: "AWS", icon: "/assets/icons/tech/aws_logo.svg" },
  { name: "Terraform", icon: "/assets/icons/tech/HashiCorp Terraform.svg" },
  { name: "Linux", icon: "/assets/icons/tech/linux.svg" },
  { name: "Bash", icon: "/assets/icons/tech/Bash.svg" },
  { name: "Nginx", icon: "/assets/icons/tech/nginx.svg" },
  { name: "Docker", icon: "/assets/icons/tech/docker.svg" },
  { name: "Kubernetes", icon: "/assets/icons/tech/kubernetes.svg" },
  { name: "ArgoCD", icon: "/assets/icons/tech/argo.svg" },
  { name: "Jenkins", icon: "/assets/icons/tech/jenkins.svg" },
  { name: "GitHub Actions", icon: "/assets/icons/tech/github-actions.svg" },
  { name: "GitHub", icon: "/assets/icons/tech/github.svg" },
  { name: "GitLab", icon: "/assets/icons/tech/gitlab.svg" },
  { name: "Git", icon: "/assets/icons/tech/git.svg" },
  { name: "Grafana", icon: "/assets/icons/tech/grafana.svg" },
  { name: "Go", icon: "/assets/icons/tech/go.svg" },
  { name: "Python", icon: "/assets/icons/tech/python.svg" },
  { name: "TypeScript", icon: "/assets/icons/tech/typescript.svg" },
  { name: "JavaScript", icon: "/assets/icons/tech/javascript.svg" },
  { name: "PostgreSQL", icon: "/assets/icons/tech/postgresql.svg" },
  { name: "MySQL", icon: "/assets/icons/tech/MySQL.svg" }
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
            Technologies, frameworks and tools I use to build and deploy scalable applications.
          </p>
        </div>

        <div className={styles.gradientWrapper}>
          <div className={styles.centeredContainer}>
            <div className={styles.uniformGrid}>
              {techIcons.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={styles.skillCard}
                  title={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.02 }}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.04, 
                    rotate: index % 2 === 0 ? 1.5 : -1.5,
                    transition: { duration: 0.15, ease: "easeOut" }
                  }}
                >
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className={`${styles.skillIcon} ${
                      (tech.name === "GitHub" || tech.name === "Go") ? styles.scaleUp : ""
                    }`} 
                  />
                  <span className={styles.cardTooltip}>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
