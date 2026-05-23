"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Shield, Rocket, Lock, Layers, X, Cpu, Globe, Database, Cog, Box, FileCode, Activity, ArrowRight } from 'lucide-react';
import { useLenis } from 'lenis/react';
import styles from './Works.module.css';

interface TechStack {
  category: string;
  items: string[];
}

interface Project {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  securityPills: string[];
  links: {
    github?: string;
    gitlab?: string;
    live?: string;
    marketplace?: string;
  };
  icon: React.ReactNode;
  techStack: TechStack[];
  badge?: string;
  titleLogos?: { src: string; alt: string }[];
}

const projects: Project[] = [
  {
    title: "AegisMesh",
    subtitle: "Identity and Access Management",
    description: "Most teams end up splitting auth, permissions, and audit logs across separate tools. AegisMesh keeps it in one place — MFA, OAuth, session control, RBAC, and audit logs, all from a single admin console. Containerized with Docker, runs on Kubernetes, deploys cleanly across environments.",
    features: [
      "Token-Based Auth", "TOTP MFA", "Federated Identity", "Enterprise RBAC"
    ],
    securityPills: ["CI pipeline", "CodeQL Advance", "Dependabot"],
    links: { github: "https://github.com/nirjxr26/AegisMesh-IAM", live: "#" },
    icon: <Shield size={24} />,
    techStack: [
      { category: "Frontend", items: ["React 19", "Tailwind CSS 4", "TanStack Query"] },
      { category: "Backend", items: ["Node.js", "Express.js", "JWT Auth", "Prisma ORM"] },
      { category: "Database", items: ["PostgreSQL"] },
      { category: "Containerization", items: ["Docker", "Kubernetes"] },
      { category: "CI/CD", items: ["Jenkins"] },
      { category: "Monitoring", items: ["Grafana"] },
      { category: "Infrastructure", items: ["Terraform"] }
    ],
    titleLogos: [
      { src: "/assets/icons/tech/docker.svg", alt: "Docker" },
      { src: "/assets/icons/tech/kubernetes.svg", alt: "Kubernetes" },
      { src: "/assets/icons/tech/grafana.svg", alt: "Grafana" },
      { src: "/assets/icons/tech/HashiCorp Terraform.svg", alt: "Terraform" }
    ]
  },
  {
    title: "HookDrop",
    subtitle: "Webhook Receiver & Streamer",
    description: "HookDrop is a mock webhook receiver written in Go. POST anything to a bucket URL; HookDrop catches, stores, and streams it live. The app is small on purpose — the real project is the CI/CD pipeline, container hardening, and GitOps loop built around it using ECR.",
    features: [
      "Mock Webhook Receiver", "Live Data Streaming", "Container Hardening", "GitOps Workflow"
    ],
    securityPills: ["Container Hardening", "GitOps Loop"],
    links: { github: "https://github.com/nirjxr26/HookDrop" },
    icon: <Activity size={24} />,
    techStack: [
      { category: "Backend", items: ["Go"] },
      { category: "Infrastructure", items: ["Docker", "Kubernetes", "ArgoCD", "Trivy"] },
      { category: "CI/CD", items: ["GitHub Actions"] }
    ],
    titleLogos: [
      { src: "/assets/icons/tech/go.svg", alt: "Go" },
      { src: "/assets/icons/tech/argo.svg", alt: "ArgoCD" },
      { src: "/assets/icons/tech/Helm.svg", alt: "Helm" }
    ]
  },
  {
    title: "DeployLens",
    subtitle: "Deployment Insights",
    description: "GitHub Actions and AWS CodeDeploy don't talk to each other. A workflow runs, a CodeDeploy execution fires, and whether a specific commit reached production is something you piece together yourself. DeployLens connects both into one timeline — one dashboard, no tab-switching.",
    features: [
      "SHA Join Engine", "Real-time WebSockets", "CodeDeploy SDK"
    ],
    securityPills: ["CodeQL", "Dependabot"],
    links: { github: "https://github.com/nirjxr26/DeployLens", live: "#" },
    icon: <Rocket size={24} />,
    techStack: [
      { category: "Frontend", items: ["React 19", "TypeScript", "Zustand", "Socket.io"] },
      { category: "Backend", items: ["Node.js 20", "Express", "Prisma ORM", "AWS SDK v3"] },
      { category: "Integrations", items: ["GitHub Actions", "GitHub API", "AWS CodeDeploy", "AWS SNS", "EventBridge"] },
      { category: "Database", items: ["PostgreSQL 15"] }
    ],
  },
  {
    title: "Code Humanizer",
    subtitle: "Skill file",
    description: "Most AI code explanations restate what you can already read. This one tells you why it exists, what breaks it, and what the person who wrote it was thinking with modes.",
    features: [
      "/dev mode", "/student mode", "/interview mode", "/smell mode", "/failures mode"
    ],
    securityPills: [],
    links: { github: "https://github.com/nirjxr26/code-humanizer" },
    icon: <FileCode size={24} />,
    techStack: [
      { category: "Modes", items: ["/dev", "/student", "/interview", "/smell", "/failures"] }
    ],
    titleLogos: [
      { src: "/assets/icons/tech/claudecolor.svg", alt: "Claude" }
    ]
  },
  {
    title: "BlamLess",
    subtitle: "GitHub Action",
    description: "GitHub Actions fails. Sometimes it's your code. Sometimes it's GitHub. Blameless figures out which — and retries automatically if it's GitHub's fault.",
    features: [
      "Auto-Retry Engine", "Failure Categorization", "Infrastructure Health Check", "Workflow Integration"
    ],
    securityPills: ["GitHub Actions", "Failure Analysis"],
    links: { marketplace: "https://github.com/marketplace/actions/blamless" },
    icon: <Activity size={24} />,
    techStack: [
      { category: "Infrastructure", items: ["GitHub Actions", "YML (config)", "TypeScript"] }
    ]
  },
  {
    title: "VaultLock",
    subtitle: "Offline Password Manager",
    description: "VaultLock is an offline password manager. Credentials stay on your machine — AES-256 encrypted, no cloud sync, no external servers. The desktop UI works without a connection.",
    features: [
      "Zero Knowledge", "AES Encryption", "Argon2 Hashing"
    ],
    securityPills: ["CodeQL", "Dependabot", "Gitleaks"],
    links: { gitlab: "https://gitlab.com/nirjxr26/VaultLock-Password-Manager", live: "#" },
    icon: <Lock size={24} />,
    techStack: [
      { category: "Frontend", items: ["PyQt6", "QML"] },
      { category: "Backend", items: ["Python 3.10+", "AES-256", "Argon2id"] },
      { category: "Database", items: ["SQLite"] }
    ]
  },
  {
    title: "SmartFlow",
    subtitle: "Resource Manager",
    description: "SmartFlow is a team operations platform, tasks, approvals, resource planning, and reporting. Most teams run these across separate tools. Work gets tracked, but the overall picture doesn't. SmartFlow puts it all under one roof.",
    features: [
      "Task Engine", "Approval Flow", "Resource Tracking"
    ],
    securityPills: [],
    links: { github: "https://gitlab.com/nirjxr26/VaultLock-Password-Manager/", live: "#" },
    icon: <Layers size={24} />,
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", items: ["PHP 8.2"] },
      { category: "Database", items: ["MySQL 8.0"] }
    ],
    badge: "Academic Project"
  }
];

const Works = () => {
  const [activeStackProject, setActiveStackProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (activeStackProject) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    return () => {
      lenis?.start();
    };
  }, [activeStackProject, lenis]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend': return <Globe size={18} />;
      case 'backend': return <Cpu size={18} />;
      case 'database': return <Database size={18} />;
      case 'integrations': return <Layers size={18} />;
      case 'infrastructure': return <Database size={18} />;
      case 'containerization': return <Box size={18} />;
      case 'ci/cd': return <Rocket size={18} />;
      case 'monitoring': return <Activity size={18} />;
      default: return <Cog size={18} />;
    }
  };

  const allTags = (project: Project) => {
    return project.techStack.flatMap(stack => stack.items).slice(0, 5);
  };

  return (
    <>
      <section id="works" className={styles.worksSection} data-aos="fade-up">
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.headerLabel} data-aos="fade-up" data-aos-duration="600">Works</h2>
            <p className={styles.headerSubtitle} data-aos="fade-up" data-aos-delay="100" data-aos-duration="600">Projects I worked on. Each of them containing its own case study.</p>
          </div>

          <div className={styles.projectsGrid}>
            <AnimatePresence>
              {(showAll ? projects : projects.slice(0, 4)).map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  key={project.title}
                  className={`
                    ${styles.projectCard} 
                    ${project.title === 'Code Humanizer' ? styles.humanizerCard : ''}
                    ${project.title === 'BlamLess' ? styles.blamlessCard : ''}
                    ${project.title === 'HookDrop' ? styles.hookdropCard : ''}
                  `}
                  data-aos={index < 4 ? "fade-up" : undefined}
                  data-aos-delay={index < 4 ? (index * 100) + 100 : undefined}
                  data-aos-duration="600"
                >
                  <div className={styles.cardInfo}>
                    <div className={`${styles.titleGroup} ${project.title === 'Code Humanizer' ? styles.humanizerHeader : ''}`}>
                      {project.title === 'Code Humanizer' ? (
                        <div className={styles.humanizerHeaderLayout}>
                          <div className={styles.humanizerTitleStack}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.projectSubtitle}>{project.subtitle}</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className={styles.titleWithBadge}>
                            <div className={styles.titleMain}>
                              <h3 className={styles.projectTitle}>{project.title}</h3>
                            </div>
                            <div className={styles.rightGroup}>
                              {project.badge && (
                                <span className={styles.institutionBadge}>
                                  {project.badge}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className={styles.projectSubtitle}>{project.subtitle}</p>
                        </>
                      )}
                    </div>

                    <p className={styles.projectDescription}>
                      {project.description}
                    </p>

                    {project.title === 'Code Humanizer' ? (
                      <div className={styles.modesSection}>
                        <span className={styles.modesLabel}>Modes</span>
                        <div className={styles.techTags}>
                          {allTags(project).map((tag) => (
                            <span key={tag} className={`${styles.techTag} ${styles.glassTag}`}>
                              {tag}
                            </span>
                          ))}
                          {project.techStack.flatMap(s => s.items).length > 5 && (
                            <button
                              onClick={() => setActiveStackProject(project)}
                              className={styles.moreTags}
                              aria-label={`View full technology stack for ${project.title}`}
                              suppressHydrationWarning
                            >
                              + View Full Stack
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.techTags}>
                        {allTags(project).map((tag) => (
                          <span key={tag} className={`${styles.techTag} ${(project.title === 'BlamLess' || project.title === 'HookDrop') ? styles.glassTag : ''}`}>
                            {tag}
                          </span>
                        ))}
                        {project.techStack.flatMap(s => s.items).length > 5 && (
                          <button
                            onClick={() => setActiveStackProject(project)}
                            className={styles.moreTags}
                            aria-label={`View full technology stack for ${project.title}`}
                            suppressHydrationWarning
                          >
                            + View Full Stack
                          </button>
                        )}
                      </div>
                    )}

                    <div className={styles.cardActions}>
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          className={styles.previewButton}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <Github size={16} />
                          <span>Github</span>
                        </a>
                      )}
                      {project.links.marketplace && (
                        <a
                          href={project.links.marketplace}
                          className={styles.previewButton}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub Marketplace`}
                        >
                          <Box size={16} />
                          <span> GitHub Marketplace</span>
                        </a>
                      )}
                      {project.links.gitlab && (
                        <a
                          href={project.links.gitlab}
                          className={styles.previewButton}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code on GitLab`}
                        >
                          <img src="/assets/icons/tech/gitlab.svg" alt="GitLab" style={{ width: 16, height: 16 }} />
                          <span>GitLab</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {project.titleLogos && (
                    <div className={styles.blendedLogos}>
                      {project.titleLogos.map((logo) => (
                        <img
                          key={logo.alt}
                          src={logo.src}
                          alt={logo.alt}
                          className={`
                          ${styles.blendedLogo} 
                          ${(logo.alt === 'Docker' || logo.alt === 'GitHub Actions' || logo.alt === 'ArgoCD' || logo.alt === 'Helm' || logo.alt === 'Go') ? styles.blendedLarge : ''}
                          ${logo.alt === 'AWS CodeDeploy' ? styles.blendedAWS : ''}
                          ${logo.alt === 'GitLab' ? styles.blendedGitLab : ''}
                          ${logo.alt === 'Go' ? styles.blendedGo : ''}
                          ${logo.alt === 'ArgoCD' ? styles.blendedArgo : ''}
                          ${logo.alt === 'Helm' ? styles.blendedHelm : ''}
                        `}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {projects.length > 4 && (
            <div className={styles.viewMoreContainer} data-aos="fade-up">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.currentTarget.blur(); // Remove focus to prevent browser scroll anchoring
                  if (showAll) {
                    if (lenis) {
                      lenis.scrollTo('#works', { offset: -50, duration: 0.8 });
                    } else {
                      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                  setShowAll(!showAll);
                }}
                className={styles.viewMoreButton}
                suppressHydrationWarning
              >
                <span>{showAll ? 'View less projects' : 'View more projects'}</span>
                <ArrowRight
                  size={18}
                  style={{
                    transform: showAll ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {activeStackProject && (
          <motion.div
            className={styles.modalOverlay}
            onClick={() => setActiveStackProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <button className={styles.modalClose} onClick={() => setActiveStackProject(null)}>
                <X size={20} />
              </button>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>{activeStackProject.title}</h3>
                <p className={styles.modalSubtitle}>Full Technology Infrastructure</p>
              </div>

              <div className={styles.modalScrollArea} data-lenis-prevent>
                <div className={styles.stackGrid}>
                  {activeStackProject.features.length > 0 && (
                    <div className={styles.stackCategory}>
                      <div className={styles.categoryHeader}>
                        <Rocket size={18} />
                        <h4>Core Features</h4>
                      </div>
                      <div className={styles.stackItems}>
                        {activeStackProject.features.map((item) => (
                          <span key={item} className={styles.stackItem}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStackProject.securityPills.length > 0 && (
                    <div className={styles.stackCategory}>
                      <div className={styles.categoryHeader}>
                        <Github size={18} />
                        <h4>GitHub Actions</h4>
                      </div>
                      <div className={styles.stackItems}>
                        {activeStackProject.securityPills.map((item) => (
                          <span key={item} className={`${styles.stackItem} ${styles.ghActionItem}`}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStackProject.techStack.map((category) => (
                    <div key={category.category} className={styles.stackCategory}>
                      <div className={styles.categoryHeader}>
                        {getCategoryIcon(category.category)}
                        <h4>{category.category}</h4>
                      </div>
                      <div className={styles.stackItems}>
                        {category.items.map((item) => (
                          <span key={item} className={`${styles.stackItem} ${category.category.toLowerCase() === 'containerization' ? styles.containerItem : ''}`}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Works;
