"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Menu, Sun, Moon } from "lucide-react";
import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/Stagger";
import { useTheme } from "@/components/ThemeProvider";

export default function HomeClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { theme, toggleTheme, mounted } = useTheme();

  const [showAllWorks, setShowAllWorks] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId.replace("#", ""));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 50 && currentScrollY > lastScrollY.current) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const projects = [
    {
      title: "Bastion",
      category: "Identity & Access Management",
      year: "2025 - 2026",
      description: "It gives teams enterprise-grade access control without handing user data to a third party — auth, policy enforcement, MFA, session control, and audit logging in a single self-hosted stack.",
      link: "https://github.com/nirjxr26/AegisMesh-IAM"
    },
    {
      title: "HookDrop",
      category: "Webhook Receiver & Streamer",
      year: "2025",
      description: "HookDrop is a mock webhook receiver written in Go. POST anything to a bucket URL; HookDrop catches, stores, and streams it live. The real project is the pipeline around it — ECR, container hardening, GitOps.",
      link: "https://github.com/nirjxr26/HookDrop"
    },
    {
      title: "DeployLens",
      category: "Deployment Insights",
      year: "2026",
      description: "GitHub Actions and AWS CodeDeploy don't talk to each other. It ties both into a single timeline, so you can see exactly what a commit did on both sides.",
      link: "https://github.com/nirjxr26/DeployLens"
    },
    {
      title: "SmartFlow",
      category: "Workflow Automation",
      year: "2025 - 2026",
      description: "A platform that unifies task workflows, approval pipelines, and system resource insights into a streamlined operations dashboard.",
      link: "https://github.com/nirjxr26/SmartFlow"
    },
    {
      title: "BlamLess",
      category: "GitHub Action",
      year: "2026",
      description: "GitHub Actions fails. Sometimes it's your code. Sometimes it's GitHub. Blameless figures out which — and retries automatically if it's GitHub's fault.",
      link: "https://github.com/nirjxr26/Blamless"
    },
    {
      title: "Code Humanizer",
      category: "Skill File",
      year: "2026",
      description: "Most AI code explanations restate what you can already read. This one tells you why it exists, what breaks it, and what the person who wrote it was thinking with modes.",
      link: "https://github.com/nirjxr26/code-humanizer"
    },
    {
      title: "VaultLock",
      category: "Offline Password Manager",
      year: "2024",
      description: "VaultLock is an offline password manager. Credentials stay on your machine — AES-256 encrypted, no cloud sync, no external servers. The desktop UI works without a connection.",
      link: "https://github.com/nirjxr26/VaultLock-Password-Manager"
    }
  ];

  const services = [
    {
      title: "Cloud Architecture",
      desc: "Environments built with Terraform — compute, networking, IAM, storage. Designed once, provisioned on demand. Not patched together over time.",
      image: "/illustrations/stamping-white.png",
      paddingClass: "md:p-4 lg:p-0"
    },
    {
      title: "Developer Operations",
      desc: "CI/CD pipelines that get code to production without ceremonies. Automated, tested, and fast enough that deploys stop being an event.",
      image: "/illustrations/developer-operations.png",
      paddingClass: ""
    },
    {
      title: "Pipeline Security",
      desc: "Problems get caught in the pipeline, not in a postmortem. Static analysis, container scanning, and runtime detection run before code ships, not after something breaks in production.",
      image: "/illustrations/pipeline-security.png",
      paddingClass: ""
    },
    {
      title: "Observability & MLOps",
      desc: "Metrics, logs, traces, and alerts that tell you what's wrong — including an ML risk model feeding signals back into the system it watches.",
      image: "/illustrations/observability-mlops.png",
      paddingClass: ""
    }
  ];

  const skillsList = [
    { name: "Linux", id: "linux" },
    { name: "AWS", id: "aws" },
    { name: "Terraform", id: "terraform" },
    { name: "Ansible", id: "ansible" },
    { name: "Docker", id: "docker" },
    { name: "Kubernetes", id: "kubernetes" },
    { name: "Helm", id: "helm" },
    { name: "ArgoCD", id: "argocd" },
    { name: "GitHub Actions", id: "githubactions" },
    { name: "GitLab", id: "gitlab" },
    { name: "Jenkins", id: "jenkins" },
    { name: "Trivy", id: "trivy" },
    { name: "Falco", id: "falco" },
    { name: "CrowdSec", id: "crowdsec" },
    { name: "SonarQube Cloud", id: "sonarqubecloud" },
    { name: "Nginx", id: "nginx" },
    { name: "Prometheus", id: "prometheus" },
    { name: "Grafana", id: "grafana" },
    { name: "Datadog", id: "datadog" },
    { name: "Redis", id: "redis" },
    { name: "MLflow", id: "mlflow" },
    { name: "Go Lang", id: "go" },
    { name: "Python", id: "py" },
    { name: "TypeScript", id: "ts" },
    { name: "Next.js", id: "nextjs" }
  ];

  const localIcons: Record<string, string> = {
    argocd: "/icons/argocd.svg",
    helm: "/icons/helm.svg",
    ansible: "/icons/ansible.svg",
    datadog: "/icons/datadog.svg",
    sonarqubecloud: "/icons/sonarqubecloud.svg",
    trivy: "/icons/trivy.svg",
    falco: "/icons/falco.svg",
    crowdsec: "/icons/crowdsec.svg",
    mlflow: "/icons/mlflow.svg",
    redis: "/icons/redis-logo-svgrepo-com.svg",
  };

  const getSkillIconSrc = (skillId: string) =>
    localIcons[skillId] || `https://skillicons.dev/icons?i=${skillId}&theme=dark`;

  return (
    <div ref={containerRef} className="w-full min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-foreground/10 selection:text-foreground">

      {/* Navigation Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: showHeader ? 0 : -100, opacity: 1 }}
        transition={{
          y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 ${isScrolled
          ? "py-3 bg-background/95 backdrop-blur-md"
          : "py-6 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[4px]"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div />

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 text-[13px] font-normal tracking-wide">
            <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="text-secondary hover:text-foreground transition-colors duration-300 link-underline">
              What I do
            </a>
            <a href="#work" onClick={(e) => handleScrollTo(e, "#work")} className="text-secondary hover:text-foreground transition-colors duration-300 link-underline">
              Recent Work
            </a>
            <Link href="/works/bastion" className="text-secondary hover:text-foreground transition-colors duration-300 link-underline">
              Bastion
            </Link>
            <a href="#skills" onClick={(e) => handleScrollTo(e, "#skills")} className="text-secondary hover:text-foreground transition-colors duration-300 link-underline">
              The stack
            </a>
            <a href="#track-record" onClick={(e) => handleScrollTo(e, "#track-record")} className="text-secondary hover:text-foreground transition-colors duration-300 link-underline">
              Track record
            </a>
            <a href="#approach" onClick={(e) => handleScrollTo(e, "#approach")} className="text-secondary hover:text-foreground transition-colors duration-300 link-underline">
              Approach
            </a>
            <a href="#insights" onClick={(e) => handleScrollTo(e, "#insights")} className="text-secondary hover:text-foreground transition-colors duration-300 link-underline">
              Engineering notes
            </a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="text-secondary hover:text-foreground transition-colors duration-300 link-underline">
              Contact
            </a>
          </nav>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-2 z-50">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-secondary hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-md pt-28 px-6 pb-12 flex flex-col justify-between md:hidden"
          >
            <nav className="flex flex-col space-y-6 text-2xl font-light tracking-wide">
              <a
                href="#services"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollTo(e, "#services");
                }}
                className="text-foreground hover:text-secondary transition-colors"
              >
                What I do
              </a>
              <a
                href="#work"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollTo(e, "#work");
                }}
                className="text-foreground hover:text-secondary transition-colors"
              >
                Recent Work
              </a>
              <Link
                href="/works/bastion"
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:text-secondary transition-colors"
              >
                Bastion
              </Link>
              <a
                href="#skills"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollTo(e, "#skills");
                }}
                className="text-foreground hover:text-secondary transition-colors"
              >
                The stack
              </a>
              <a
                href="#track-record"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollTo(e, "#track-record");
                }}
                className="text-foreground hover:text-secondary transition-colors"
              >
                Track record
              </a>
              <a
                href="#approach"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollTo(e, "#approach");
                }}
                className="text-foreground hover:text-secondary transition-colors"
              >
                Approach
              </a>
              <a
                href="#insights"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollTo(e, "#insights");
                }}
                className="text-foreground hover:text-secondary transition-colors"
              >
                Engineering notes
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollTo(e, "#contact");
                }}
                className="text-foreground hover:text-secondary transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="border-t border-foreground/5 pt-8 flex flex-col space-y-8">
              <div className="flex flex-col space-y-3">
                <a
                  href="mailto:nirjargoswami2626@gmail.com"
                  className="text-lg font-light text-foreground hover:text-foreground/80 transition-colors underline underline-offset-8 decoration-foreground/20 hover:decoration-foreground w-fit"
                >
                  nirjargoswami2626@gmail.com
                </a>
                <a
                  href="tel:+918799142626"
                  className="text-base font-light text-foreground hover:text-foreground/80 transition-colors underline underline-offset-8 decoration-foreground/20 hover:decoration-foreground w-fit"
                >
                  +91 87991 42626
                </a>
                <div className="text-xs text-secondary font-light">
                  Ahmedabad, Gujarat
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary pt-2">
                <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
                <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
                <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
                <a href="https://blog.nirjar.me/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Blogs</a>
                <a href="/nirjar_resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Resume</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto pt-40 pb-10 md:pt-35 md:pb-16">
        <div className="relative z-10 pt-4 pb-4">
          <StaggerContainer delay={0.15} staggerStep={0.2}>
            <StaggerItem>
              <h1 className="text-[38px] sm:text-[48px] md:text-[60px] lg:text-[76px] font-normal tracking-normal leading-[1.05] mb-8 font-sans max-w-6xl max-[420px]:text-[36px] max-[400px]:text-[32px]">
                <TextReveal
                  as="span"
                  className="block text-foreground"
                  text="Building systems"
                  delay={0}
                />
                <TextReveal
                  as="span"
                  className="block text-secondary -mt-1 sm:-mt-1.5"
                  text="meant to be forgotten."
                  delay={0.15}
                  muted
                />
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-lg md:text-[20px] text-secondary max-w-2xl leading-relaxed mb-8 font-normal font-sans tracking-[-0.01em]">
                Nirjar Goswami. Cloud and DevOps Engineer. I help teams build and operate infrastructure so they ship faster without 2am pages.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="border-t border-foreground/5 py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-4 md:mb-6">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans mb-1 lg:mb-0"
              text="What I do."
            />
            <TextReveal
              as="p"
              className="text-xl sm:text-2xl md:text-2xl lg:text-[32px] font-normal leading-[1.3] tracking-tight max-w-4xl text-secondary"
              text="Good infrastructure is invisible. here's how."
              highlightText="invisible"
              highlightClass="text-accent"
              delay={0.15}
              muted
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`py-8 md:py-12 border-b border-foreground/5 last:border-b-0 ${
                  idx % 2 === 0
                    ? "md:pr-12 lg:pr-16 md:border-r border-foreground/5"
                    : "md:pl-12 lg:pl-16"
                } ${idx >= 2 ? "md:border-b-0" : ""}`}
              >
                <h4 className="text-xl md:text-2xl lg:text-[30px] font-normal text-foreground mb-3 md:mb-4 font-sans tracking-tight">
                  {service.title}
                </h4>
                <p className="text-secondary text-base sm:text-lg leading-relaxed font-normal max-w-lg">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Selected Work Section */}
      <section id="work" className="border-t border-foreground/5 py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-4 md:mb-6">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1]"
              text="Recent Work."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <AnimatePresence initial={false}>
              {(showAllWorks ? projects : projects.slice(0, 4)).map((proj, idx) => {
                const totalVisible = showAllWorks ? projects.length : 4;
                const isLastRowMd = idx >= totalVisible - (totalVisible % 2 === 0 ? 2 : 1);
                return (
                  <motion.div
                    layout
                    key={proj.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`py-8 md:py-10 border-b border-foreground/5 flex flex-col justify-between min-h-[240px] last:border-b-0 md:last:border-b-0 ${
                      idx % 2 === 0
                        ? "md:pr-12 lg:pr-16 md:border-r border-foreground/5"
                        : "md:pl-12 lg:pl-16"
                    } ${isLastRowMd ? "md:border-b-0" : ""}`}
                  >
                    <div>
                      <h4 className="text-xl md:text-2xl lg:text-[30px] font-md text-foreground mb-1 font-sans tracking-tight">
                        {proj.title}
                      </h4>
                      <span className="text-xs text-secondary capitalize tracking-[0.03em] mb-4 block font-medium">
                        {proj.category}
                      </span>
                      <p className="text-secondary text-sm sm:text-base leading-relaxed font-normal max-w-lg mb-6">
                        {proj.description}
                      </p>
                    </div>
                    <div className="flex items-end justify-between w-full pt-8">
                      <div className="flex items-center gap-4">
                        {proj.title === "Bastion" && (
                          <Link
                            href="/works/bastion"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer w-fit"
                          >
                            Read Case <ArrowUpRight className="w-4 h-4 text-accent" />
                          </Link>
                        )}
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-foreground transition-colors cursor-pointer w-fit"
                        >
                          Explore Case <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                      <span className="text-xs text-secondary font-mono leading-none">{proj.year}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAllWorks(!showAllWorks)}
              className="btn-outlined px-6 py-1.5 rounded-full text-xs font-medium tracking-wide flex items-center gap-2 cursor-pointer"
            >
              {showAllWorks ? "View less" : "View more works"}
              {showAllWorks ? <X className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
            </motion.button>
          </div>
        </ScrollReveal>
      </section>

      {/* Skillset Section */}
      <section id="skills" className="border-t border-foreground/5 py-8 md:py-16">
        <ScrollReveal delay={0.1}>
          <div className="px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto mb-4 md:mb-6">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans mb-1 lg:mb-0"
              text="The stack."
            />
            <TextReveal
              as="p"
              className="text-xl sm:text-2xl md:text-2xl lg:text-[32px] font-normal leading-[1.3] tracking-tight max-w-4xl text-secondary"
              text="Technologies behind the work."
              highlightText="Technologies"
              highlightClass="text-accent"
              delay={0.15}
              muted
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="relative w-full overflow-hidden py-4">
            <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="marquee-container flex overflow-hidden select-none">
              <div className="animate-marquee flex gap-2 md:gap-8 items-center">
                {skillsList.map((skill, index) => (
                  <div key={index} className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getSkillIconSrc(skill.id)}
                      alt={skill.name}
                      className="w-12 h-12 md:w-16 md:h-16 object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
                {skillsList.map((skill, index) => (
                  <div key={`dup-${index}`} className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getSkillIconSrc(skill.id)}
                      alt={skill.name}
                      className="w-12 h-12 md:w-16 md:h-16 object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="track-record" className="border-t border-foreground/5 w-full bg--background py-12 md:py-28">
        <div className="px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
          <div className="max-w-4xl">
              <ScrollReveal delay={0.1}>
                <div className="mb-4 md:mb-6">
                  <TextReveal
                    as="h3"
                    className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
                    text="Systems built to stand."
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-[1.5] text-secondary">
                  <span className="text-foreground">6</span> projects shipped, all still running.{" "}
                  <span className="text-foreground"><span className="text-secondary">Actively </span>maintained <span className="text-secondary">with </span>98.9% uptime. </span>{" "}
                  Deploys in <span className="text-foreground">~2 minutes</span> — pushed, tested, live with <span className="text-foreground">zero</span> manual intervention.
                  <br /> <br />
                  <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-[1.5] text-secondary">
                    <span className="text-foreground">Terraform</span> from scratch. <span className="text-foreground">Security gates</span> live in the pipeline, not a ticket filed after the deploy. <span className="text-foreground">Costs </span> are predictable because the infra is code, not memory.{" "}
                  </p>
                </div>
                <br />

                <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-[1.5] text-secondary">
                  If you need infrastructure that scales with your business — <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="underline underline-offset-4 text-secondary hover:text-foreground transition-colors cursor-pointer">let&apos;s talk</a>.
                </p>
              </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="approach" className="border-t border-foreground/5 py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-4 md:mb-6">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
              text="Approach."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-[1.5] max-w-4xl">
            <span className="text-secondary"> <span className="text-foreground">I&apos;m early in my career,</span> but the projects are real, the pipelines run in production, and the <span className="text-foreground">decisions</span> were mine.  </span>
            <br /> <br />
            <span className="text-secondary">I&apos;ve built cloud infrastructure, deployment pipelines, and security systems that <span className="text-foreground">prevent problems</span> before they happen. </span>
            <span className="text-secondary">Now I want to build it somewhere it actually matters.</span>
          </p>
        </ScrollReveal>
      </section>

      {/* Engineering Notes Section */}
      <section id="insights" className="border-t border-foreground/5 py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-4 md:mb-6">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
              text="Engineering notes."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
              {[
                {
                  title: "Why AI can't just rewrite windows.",
                  link: "https://blog.nirjar.me/why-ai-can-t-just-rewrite-windows",
                },
                {
                  title: "Sonarqube had notes.",
                  link: "https://blog.nirjar.me/sonarqube",
                }
              ].map((article, idx) => (
                <div
                  key={idx}
                  className="py-4 md:py-6 flex flex-col"
                >
                  {article.title === "Why AI can't just rewrite windows." ? (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex flex-col justify-between w-full aspect-auto xl:aspect-[16/9] min-h-[220px] md:min-h-[240px] lg:min-h-[260px] xl:min-h-0 overflow-hidden rounded-xl mb-2 md:mb-4 bg-[#121216] select-none group/poster cursor-pointer text-[#d4d4d8]"
                    >
                      <div className="absolute top-[-30%] right-[-15%] w-[80%] aspect-square rounded-full border border-foreground/[0.04] pointer-events-none" />
                      <div className="absolute bottom-[-35%] left-[-15%] w-[50%] aspect-square rounded-full border border-foreground/[0.04] pointer-events-none" />

                      <div className="relative z-10 flex flex-col justify-between flex-grow">
                        <div className="p-4 sm:p-5 md:p-6 xl:p-8 pb-0 sm:pb-0 md:pb-0 xl:pb-0">
                          <h3 className="text-[27px] sm:text-3xl md:text-[34px] lg:text-[38px] xl:text-[46px] font-normal text-[#d4d4d8] leading-[1.45] md:leading-[1.3] tracking-wide md:tracking-normal font-serif max-w-xl">
                            Why AI can&apos;t <span className="text-[#6b6b70] italic lowercase font-serif px-1 translate-y-[0.02em] inline-block">just</span> <br /> rewrite windows.
                          </h3>
                        </div>
                      </div>
                    </a>
                  ) : article.title === "Sonarqube had notes." ? (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex flex-col justify-between w-full aspect-auto xl:aspect-[16/9] min-h-[220px] md:min-h-[240px] lg:min-h-[260px] xl:min-h-0 overflow-hidden rounded-xl mb-2 md:mb-4 bg-[#121216] select-none group/poster cursor-pointer text-[#d4d4d8]"
                    >
                      <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-[0.015]">
                        <div className="border-r border-foreground h-full" />
                        <div className="border-r border-foreground h-full" />
                        <div className="border-r border-foreground h-full" />
                        <div className="border-r border-foreground h-full" />
                        <div className="border-r border-foreground h-full" />
                        <div className="h-full" />
                      </div>

                      <div className="relative z-10 flex flex-col justify-between flex-grow">
                        <div className="p-4 sm:p-5 md:p-6 xl:p-8 pb-0 sm:pb-0 md:pb-0 xl:pb-0">
                          <h3 className="text-[27px] sm:text-3xl md:text-[34px] lg:text-[38px] xl:text-[46px] font-normal text-[#d4d4d8] leading-[1.45] md:leading-[1.3] tracking-wide md:tracking-normal font-serif max-w-xl">
                            <span className="text-[#F97316]">872</span> Issues. 30 Days. <br /><span className="text-[#6b6b70] italic font-serif px-1 translate-y-[0.02em] inline-block">SonarQube</span> analysis.
                          </h3>
                        </div>
                      </div>
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex justify-center mt-16">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://blog.nirjar.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outlined px-6 py-1.5 rounded-full text-xs font-medium tracking-wide flex items-center gap-2 cursor-pointer"
            >
              View more notes <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </ScrollReveal>
      </section>

      <section id="contact" className="border-t border-foreground/5 py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:items-end">
          <ScrollReveal delay={0.1}>
            <div>
              {/* <h2 className="text-xs text-secondary uppercase tracking-widest mb-3">Get in Touch</h2> */}
              <h3 className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-none mb-6">
                <TextReveal
                  as="span"
                  className="block text-foreground"
                  text="Ready to ship"
                />
                <TextReveal
                  as="span"
                  className="block text-foreground mt-[-4px]"
                  text="something that holds."
                  delay={0.15}
                />
              </h3>
              <p className="text-secondary font-light leading-relaxed text-sm md:text-base max-w-sm">
                Currently open to new projects and roles. If something&apos;s broken, needs to be built, or you want a second opinion — my inbox is open.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="flex flex-col space-y-8 md:items-end w-full md:text-right">
              <div className="flex flex-col space-y-3 md:items-end">
                <a
                  href="mailto:nirjargoswami2626@gmail.com"
                  className="text-lg min-[360px]:text-xl sm:text-xl md:text-lg lg:text-2xl font-light text-foreground hover:text-foreground/80 transition-colors underline underline-offset-8 decoration-foreground/20 hover:decoration-foreground w-fit"
                >
                  nirjargoswami2626@gmail.com
                </a>

                <a
                  href="tel:+918799142626"
                  className="text-base sm:text-lg md:text-lg lg:text-xl font-light text-foreground hover:text-foreground/80 transition-colors underline underline-offset-8 decoration-foreground/20 hover:decoration-foreground w-fit"
                >
                  +91 87991 42626
                </a>

                <div className="text-sm text-secondary font-light">
                  Ahmedabad, Gujarat
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary pt-2">
                <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors link-underline">GitHub</a>
                <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors link-underline">LinkedIn</a>
                <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors link-underline">Twitter</a>
                <a href="https://blog.nirjar.me/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors link-underline">Blogs</a>
                <a href="/nirjar_resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors link-underline">Resume</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <footer className="w-full px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto pt-16 pb-12">
        <div className="w-full overflow-hidden mb-8">
          <h2 className="text-[22vw] md:text-[14vw] font-normal text-secondary uppercase tracking-[-0.06em] md:tracking-[-0.08em] text-center select-none leading-[0.85] font-sans">
            NIRJAR
          </h2>
        </div>
      </footer>
    </div>
  );
}
