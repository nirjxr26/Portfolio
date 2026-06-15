"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus, X, Menu, Sun, Moon } from "lucide-react";
import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import { useLenis } from "lenis/react";

// Technology SVG Icons (imported from src/icons/tech)
import awsIcon from "@/icons/tech/aws.svg";
import terraformIcon from "@/icons/tech/HashiCorp Terraform.svg";
import dockerIcon from "@/icons/tech/docker.svg";
import kubernetesIcon from "@/icons/tech/kubernetes.svg";
import argoIcon from "@/icons/tech/argo.svg";
import datadogIcon from "@/icons/tech/datadog-svgrepo-com.svg";
import grafanaIcon from "@/icons/tech/grafana.svg";
import githubActionsIcon from "@/icons/tech/github-actions.svg";
import k3sIcon from "@/icons/tech/kubernetes.svg";
import ecrIcon from "@/icons/tech/ecr.svg";
import falcoIcon from "@/icons/tech/falco.svg";
import crowdsecIcon from "@/icons/tech/crowdsec.svg";
import trivyIcon from "@/icons/tech/trivy.webp";
import sonarIcon from "@/icons/tech/sonar.svg";
import mlflowIcon from "@/icons/tech/mlflow.svg";
import prometheusIcon from "@/icons/tech/prometheus.svg";
import windowsPoster from "@/icons/blogs/image.png";
import sonarPoster from "@/icons/blogs/image copy.png";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const lenis = useLenis();

  // States for services modal or dropdown
  const [activeService, setActiveService] = useState<number | null>(null);
  const [showAllWorks, setShowAllWorks] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // nice easeOutExpo
      });
    } else {
      const targetElement = document.getElementById(targetId.replace("#", ""));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled beyond 50px
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine scrolling direction and visibility
      if (currentScrollY > 50 && currentScrollY > lastScrollY.current) {
        // Scrolling down and scrolled past 50px -> hide
        setShowHeader(false);
      } else {
        // Scrolling up or near top -> show
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen, lenis]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Entrance Animations
    const ctx = gsap.context(() => {
      // Header slides down
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.1,
          onComplete: () => {
            if (headerRef.current) {
              gsap.set(headerRef.current, { clearProps: "y" });
            }
          }
        }
      );

      // Subtitle fade-in
      gsap.fromTo(
        heroSubRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8 }
      );



      // Scroll animations for sections
      const sections = gsap.utils.toArray(".scroll-section");
      sections.forEach((sec: any) => {
        gsap.fromTo(
          sec,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const projects = [
    {
      title: "AegisMesh",
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
      title: "Cloud Infrastructure",
      desc: "Environments built with Terraform — compute, networking, IAM, storage. Designed once, provisioned on demand. Not patched together over time.",
      skills: [
        { name: "AWS", icon: awsIcon },
        { name: "Terraform", icon: terraformIcon },
        { name: "k3s", icon: k3sIcon }
      ]
    },
    {
      title: "Developer Operations",
      desc: "CI/CD pipelines that get code to production without ceremonies. Automated, tested, and fast enough that deploys stop being an event.",
      skills: [
        { name: "GitHub Actions", icon: githubActionsIcon },
        { name: "Docker", icon: dockerIcon },
        { name: "Kubernetes", icon: kubernetesIcon },
        { name: "ArgoCD", icon: argoIcon }
      ]
    },
    {
      title: "Security Engineering",
      desc: "Security in the pipeline, not bolted on afterward. Static analysis, container scanning, runtime detection — issues caught before they ship, not after.",
      skills: [
        { name: "Trivy", icon: trivyIcon },
        { name: "Falco", icon: falcoIcon },
        { name: "CrowdSec", icon: crowdsecIcon },
        { name: "SonarQube Cloud", icon: sonarIcon }
      ]
    },
    {
      title: "Observability & MLOps",
      desc: "Metrics, logs, traces, and alerts that tell you what's actually wrong — not just that something is. Distributed systems that you can see into.",
      skills: [
        { name: "Prometheus", icon: prometheusIcon },
        { name: "Grafana", icon: grafanaIcon },
        { name: "Datadog", icon: datadogIcon },
        { name: "MLflow", icon: mlflowIcon }
      ]
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
    { name: "MLflow", id: "mlflow" },
    { name: "Go Lang", id: "go" },
    { name: "Python", id: "py" },
    { name: "TypeScript", id: "ts" },
    { name: "Next.js", id: "nextjs" }
  ];

  const getSkillIconSrc = (skillId: string) => {
    if (skillId === "argocd") {
      return "/icons/argocd.svg";
    }
    if (skillId === "helm") {
      return "/icons/helm.svg";
    }
    if (skillId === "ansible") {
      return "/icons/ansible.svg";
    }
    if (skillId === "datadog") {
      return "/icons/datadog.svg";
    }
    if (skillId === "sonarqubecloud") {
      return "/icons/sonarqubecloud.svg";
    }
    if (skillId === "trivy") {
      return "/icons/trivy.svg";
    }
    if (skillId === "falco") {
      return "/icons/falco.svg";
    }
    if (skillId === "crowdsec") {
      return "/icons/crowdsec.svg";
    }
    if (skillId === "mlflow") {
      return "/icons/mlflow.svg";
    }
    return `https://skillicons.dev/icons?i=${skillId}&theme=${theme === "light" ? "light" : "dark"}`;
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-foreground/10 selection:text-foreground">

      {/* Navigation Header */}
      <header
        ref={headerRef}
        className={`opacity-0 fixed top-0 left-0 right-0 z-50 px-6 md:px-8 lg:px-24 xl:px-32 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
          ? "py-3 bg-background/95 backdrop-blur-md"
          : "py-6 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[4px]"
          } ${showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          {/* Logo Monogram Removed */}
          <div />

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 text-[13px] font-medium tracking-wide">
            <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="text-secondary hover:text-foreground transition-colors duration-300">
              What I do
            </a>
            <a href="#work" onClick={(e) => handleScrollTo(e, "#work")} className="text-secondary hover:text-foreground transition-colors duration-300">
              Recent Work
            </a>
            <a href="#skills" onClick={(e) => handleScrollTo(e, "#skills")} className="text-secondary hover:text-foreground transition-colors duration-300">
              The stack
            </a>
            <a href="#track-record" onClick={(e) => handleScrollTo(e, "#track-record")} className="text-secondary hover:text-foreground transition-colors duration-300">
              Track record
            </a>
            <a href="#approach" onClick={(e) => handleScrollTo(e, "#approach")} className="text-secondary hover:text-foreground transition-colors duration-300">
              Approach
            </a>
            <a href="#insights" onClick={(e) => handleScrollTo(e, "#insights")} className="text-secondary hover:text-foreground transition-colors duration-300">
              Engineering notes
            </a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="text-secondary hover:text-foreground transition-colors duration-300">
              Contact
            </a>
            {/* <button
              onClick={toggleTheme}
              className="p-1.5 text-secondary hover:text-foreground transition-colors cursor-pointer flex items-center ml-2"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button> */}
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
      </header>

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
      <section className="flex flex-col px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto pt-40 pb-4 md:pt-35 md:pb-6">

        {/* Content Area */}
        <div className="relative z-10 pt-4 pb-4">

          {/* Title */}
          <h1 className="text-[34px] min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight leading-[0.9] mb-8 font-sans max-w-6xl">
            <TextReveal
              as="span"
              className="block text-foreground"
              text="Building systems"
              delay={0.3}
            />
            <TextReveal
              as="span"
              className="block text-secondary mt-[-0.15em] sm:mt-[-0.18em] lg:mt-[-0.22em]"
              text="meant to be forgotten."
              delay={0.45}
              muted
            />
          </h1>

          {/* Subtitle */}
          <p
            ref={heroSubRef}
            className="opacity-0 text-lg md:text-[20px] text-secondary max-w-2xl leading-relaxed mb-8 font-normal font-sans tracking-[-0.01em]"
          >
            Nirjar Goswami. Cloud and DevOps Engineer. I help teams build and operate infrastructure so they ship faster without 2am pages.
          </p>
        </div>


      </section>

      {/* Services Section */}
      <section id="services" className="scroll-section opacity-0 py-12 md:py-24 px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto border-t border-foreground/5">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <TextReveal
            as="h3"
            className="text-[30px] md:text-[36px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans mb-0"
            text="What I do."
          />
          <TextReveal
            as="p"
            className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-normal leading-[1.3] tracking-tight max-w-4xl text-secondary -mt-2"
            text="Good infrastructure is invisible. here's how."
            highlightText="invisible"
            highlightClass="text-blue-500 dark:text-blue-400"
            delay={0.15}
            muted
          />
        </div>

        {/* Capabilities Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`py-8 md:py-10 border-b border-foreground/5 last:border-b-0 md:last:border-b-0 ${idx % 2 === 0 ? "md:pr-12 lg:pr-16 md:border-r border-foreground/5" : "md:pl-12 lg:pl-16"
                  } ${idx === 2 ? "md:border-b-0" : ""
                  }`}
              >
                <h4 className="text-xl md:text-2xl lg:text-[30px] font-md text-foreground mb-2 md:mb-4 font-sans tracking-tight">
                  {service.title}
                </h4>
                <p className="text-secondary text-base sm:text-lg leading-relaxed font-normal max-w-lg">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section id="work" className="scroll-section opacity-0 py-12 md:py-24 px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto border-t border-foreground/5">
        <div className="mb-4 md:mb-6">
          <TextReveal
            as="h3"
            className="text-[30px] md:text-[36px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1]"
            text="Recent Work."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
          <AnimatePresence initial={false}>
            {(showAllWorks ? projects : projects.slice(0, 4)).map((proj, idx) => {
              const isLeftColumn = idx % 2 === 0;
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
                  className={`py-8 md:py-10 border-b border-foreground/5 flex flex-col justify-between min-h-[240px] transition-all duration-300 last:border-b-0 md:last:border-b-0 ${isLeftColumn ? "md:pr-12 lg:pr-16 md:border-r border-foreground/5" : "md:pl-12 lg:pl-16"
                    } ${isLastRowMd ? "md:border-b-0" : ""
                    }`}
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
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-foreground transition-colors cursor-pointer w-fit"
                    >
                      Explore Case <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <span className="text-xs text-secondary font-mono leading-none">{proj.year}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAllWorks(!showAllWorks)}
            className="btn-outlined px-6 py-2 rounded-full text-xs font-medium tracking-wide flex items-center gap-2 cursor-pointer"
          >
            {showAllWorks ? "View less" : "View more works"}
            {showAllWorks ? <X className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
          </button>
        </div>
      </section>

      {/* Skillset Section */}
      <section id="skills" className="scroll-section opacity-0 py-12 md:py-24 border-t border-foreground/5">
        {/* Header */}
        <div className="px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto mb-4 md:mb-6">
          <TextReveal
            as="h3"
            className="text-[30px] md:text-[36px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans mb-0"
            text="The stack."
          />
          <TextReveal
            as="p"
            className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-normal leading-[1.3] tracking-tight max-w-4xl text-secondary -mt-2"
            text="Technologies behind the work."
            highlightText="Technologies"
            highlightClass="text-blue-500 dark:text-blue-400"
            delay={0.15}
            muted
          />
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Gradient overlays on the left and right for smooth fading edges */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="marquee-container flex overflow-hidden select-none">
            <div className="animate-marquee flex gap-2 md:gap-8 items-center">
              {/* First set of icons */}
              {skillsList.map((skill, index) => (
                <div key={index} className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer">
                  <img
                    src={getSkillIconSrc(skill.id)}
                    alt={skill.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Duplicate set of icons for seamless looping */}
              {skillsList.map((skill, index) => (
                <div key={`dup-${index}`} className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer">
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
      </section>

      <section id="track-record" className="scroll-section opacity-0 w-full bg--background py-12 md:py-28 border-t border-foreground/5">
        <div className="px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
          <div className="mb-4 md:mb-6">
            <TextReveal
              as="h3"
              className="text-[30px] md:text-[36px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
              text="Systems built to stand."
            />
          </div>
          <div className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-[1.5] max-w-4xl text-secondary">
            <span className="text-foreground">6</span> projects shipped, all still running.{" "}
            <span className="text-foreground">98.9%</span> uptime.{" "}
            Deploys in <span className="text-foreground">~2 minutes</span> — pushed, tested, live with <span className="text-foreground">zero</span> manual intervention, ever.
            <br /> <br />
            <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-[1.5] max-w-4xl text-secondary">
              <span className="text-foreground">Terraform</span> from scratch — no ClickOps, no drift, no config that only exists because someone clicked through the console once and never wrote it down.{" "}
              <span className="text-foreground">Security gates</span> in the pipeline, not a ticket filed after the deploy.{" "}
              Costs are predictable because the <span className="text-foreground"> infra is code</span>, not memory.
            </p>
            <br />
            <a
              href="https://www.linkedin.com/posts/nirjxr_googlestudentambassador-gsa2026-teamgemini-share-7465741996729491456-hVqR/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGOK1LUBycBiOJtYGid75GOM2SOr-NxkL58"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              Google Student Ambassador. <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <br />

          <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-[1.5] max-w-4xl text-secondary">
            If you need infrastructure that scales with your business — <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="underline underline-offset-4 text-secondary hover:text-foreground transition-colors cursor-pointer">let's talk</a>.
          </p>
        </div>
      </section>
      {/* About Section */}
      <section id="approach" className="scroll-section opacity-0 py-12 md:py-24 px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto border-t border-foreground/5">
        <div className="mb-4 md:mb-6">
          <TextReveal
            as="h3"
            className="text-[30px] md:text-[36px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
            text="Approach."
          />
        </div>
        <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-[1.5] max-w-4xl">
          <span className="text-secondary"> <span className="text-foreground">I'm early in my career,</span> but the projects are real, the pipelines run in production, and the <span className="text-foreground">decisions</span> were mine.  </span>
          <br /> <br />
          <span className="text-secondary">I've built cloud infrastructure, deployment pipelines, and security systems that <span className="text-foreground">prevent problems</span> before they happen. </span>
          <span className="text-secondary">Now I want to build it somewhere it actually matters.</span>
        </p>
      </section>









      {/* Engineering Notes Section */}
      <section id="insights" className="scroll-section opacity-0 py-12 md:py-24 px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto border-t border-foreground/5">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <TextReveal
            as="h3"
            className="text-[30px] md:text-[36px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
            text="Engineering notes."
          />
        </div>

        {/* Articles Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
            {[
              {
                lead: "",
                title: "Why AI can't just rewrite windows.",
                link: "https://blog.nirjar.me/why-ai-can-t-just-rewrite-windows",
                poster: windowsPoster
              },
              {
                lead: "",
                title: "Sonarqube had notes.",
                link: "https://blog.nirjar.me/sonarqube",
                poster: sonarPoster
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
                    className="relative flex flex-col justify-between w-full aspect-auto xl:aspect-[16/9] min-h-[220px] md:min-h-[240px] lg:min-h-[260px] xl:min-h-0 overflow-hidden rounded-xl mb-2 md:mb-4 bg-[#121216] border border-foreground/5 select-none group/poster cursor-pointer"
                  >
                    {/* Background Circles */}
                    <div className="absolute top-[-30%] right-[-15%] w-[80%] aspect-square rounded-full border border-foreground/[0.04] pointer-events-none" />
                    <div className="absolute bottom-[-35%] left-[-15%] w-[50%] aspect-square rounded-full border border-foreground/[0.04] pointer-events-none" />

                    <div className="relative z-10 flex flex-col justify-between flex-grow">
                      {/* Top Title */}
                      <div className="p-4 sm:p-5 md:p-6 xl:p-8 pb-0 sm:pb-0 md:pb-0 xl:pb-0">
                        <h3 className="text-[27px] sm:text-3xl md:text-[34px] lg:text-[38px] xl:text-[46px] font-normal text-foreground leading-[1.45] md:leading-[1.3] tracking-wide md:tracking-normal font-serif max-w-xl">
                          Why AI can&apos;t <span className="text-secondary italic lowercase font-serif px-1 translate-y-[0.02em] inline-block">just</span> <br /> rewrite windows.
                        </h3>
                      </div>

                      {/* Bottom Stats Grid */}
                      <div className="border-t border-foreground/[0.08] grid grid-cols-3">
                        {/* Stat 1 */}
                        <div className="py-3 sm:py-3 md:py-4 xl:py-5 pl-4 sm:pl-5 md:pl-6 xl:pl-8 pr-3 sm:pr-4 md:pr-5 xl:pr-6">
                          <div className="text-xl sm:text-lg md:text-xl lg:text-[22px] xl:text-[26px] font-mono font-medium text-foreground leading-none mb-1 md:mb-2">
                            50M
                          </div>
                          <div className="text-[10px] sm:text-[10px] md:text-xs text-secondary leading-tight font-light font-sans">
                            lines of code
                          </div>
                        </div>
                        {/* Stat 2 */}
                        <div className="py-3 sm:py-3 md:py-4 xl:py-5 pl-3 sm:pl-4 md:pl-5 xl:pl-6 pr-3 sm:pr-4 md:pr-5 xl:pr-6 border-l border-foreground/[0.08]">
                          <div className="text-xl sm:text-lg md:text-xl lg:text-[22px] xl:text-[26px] font-mono font-medium text-foreground leading-none mb-1 md:mb-2">
                            41 yrs
                          </div>
                          <div className="text-[10px] sm:text-[10px] md:text-xs text-secondary leading-tight font-light font-sans">
                            of decisions
                          </div>
                        </div>
                        {/* Stat 3 */}
                        <div className="py-3 sm:py-3 md:py-4 xl:py-5 pl-3 sm:pl-4 md:pl-5 xl:pl-6 pr-4 sm:pr-5 md:pr-6 xl:pr-8 border-l border-foreground/[0.08]">
                          <div className="text-xl sm:text-lg md:text-xl lg:text-[22px] xl:text-[26px] font-mono font-medium text-foreground leading-none mb-1 md:mb-2">
                            330+
                          </div>
                          <div className="text-[10px] sm:text-[10px] md:text-xs text-secondary leading-tight font-light font-sans">
                            years to rewrite
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ) : article.title === "Sonarqube had notes." ? (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex flex-col justify-between w-full aspect-auto xl:aspect-[16/9] min-h-[220px] md:min-h-[240px] lg:min-h-[260px] xl:min-h-0 overflow-hidden rounded-xl mb-2 md:mb-4 bg-[#121216] border border-foreground/5 select-none group/poster cursor-pointer"
                  >
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-[0.015]">
                      <div className="border-r border-foreground h-full" />
                      <div className="border-r border-foreground h-full" />
                      <div className="border-r border-foreground h-full" />
                      <div className="border-r border-foreground h-full" />
                      <div className="border-r border-foreground h-full" />
                      <div className="h-full" />
                    </div>

                    <div className="relative z-10 flex flex-col justify-between flex-grow">
                      {/* Top Title */}
                      <div className="p-4 sm:p-5 md:p-6 xl:p-8 pb-0 sm:pb-0 md:pb-0 xl:pb-0">
                        <h3 className="text-[27px] sm:text-3xl md:text-[34px] lg:text-[38px] xl:text-[46px] font-normal text-foreground leading-[1.45] md:leading-[1.3] tracking-wide md:tracking-normal font-serif max-w-xl">
                          <span className="text-[#F97316]">872</span> Issues. 30 Days. <br /> SonarQube <span className="text-secondary italic lowercase font-serif px-1 translate-y-[0.02em] inline-block">analysis.</span>
                        </h3>
                      </div>

                      {/* Stats Grid */}
                      <div className="border-t border-foreground/[0.08] grid grid-cols-3">
                        {/* Stat 1 */}
                        <div className="py-3 sm:py-3 md:py-4 xl:py-5 pl-4 sm:pl-5 md:pl-6 xl:pl-8 pr-3 sm:pr-4 md:pr-5 xl:pr-6">
                          <div className="text-xl sm:text-lg md:text-xl lg:text-[22px] xl:text-[26px] font-mono font-medium text-[#FF5A60] leading-none mb-1 md:mb-2">
                            872
                          </div>
                          <div className="text-[10px] sm:text-[10px] md:text-xs text-secondary leading-tight font-light font-sans">
                            day 1 issues
                          </div>
                        </div>
                        {/* Stat 2 */}
                        <div className="py-3 sm:py-3 md:py-4 xl:py-5 pl-3 sm:pl-4 md:pl-5 xl:pl-6 pr-3 sm:pr-4 md:pr-5 xl:pr-6 border-l border-foreground/[0.08]">
                          <div className="text-xl sm:text-lg md:text-xl lg:text-[22px] xl:text-[26px] font-mono font-medium text-[#10B981] leading-none mb-1 md:mb-2">
                            65
                          </div>
                          <div className="text-[10px] sm:text-[10px] md:text-xs text-secondary leading-tight font-light font-sans">
                            day 30 issues
                          </div>
                        </div>
                        {/* Stat 3 */}
                        <div className="py-3 sm:py-3 md:py-4 xl:py-5 pl-3 sm:pl-4 md:pl-5 xl:pl-6 pr-4 sm:pr-5 md:pr-6 xl:pr-8 border-l border-foreground/[0.08]">
                          <div className="text-xl sm:text-lg md:text-xl lg:text-[22px] xl:text-[26px] font-mono font-medium text-[#FBBF24] leading-none mb-1 md:mb-2">
                            0.0%
                          </div>
                          <div className="text-[10px] sm:text-[10px] md:text-xs text-secondary leading-tight font-light font-sans">
                            hotspots left
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ) : article.poster && (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full aspect-[16/9] overflow-hidden rounded-xl mb-2 md:mb-4 relative group/poster cursor-pointer"
                  >
                    <img
                      src={article.poster.src}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/poster:scale-105"
                      alt={article.title}
                    />
                  </a>
                )}
                {article.title !== "Why AI can't just rewrite windows." && article.title !== "Sonarqube had notes." && (
                  <>
                    <h4 className="text-lg sm:text-[22px] font-md text-foregrond mb-1 font-sans tracking-tight">
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-secondary transition-colors cursor-pointer"
                      >
                        {article.title}
                      </a>
                    </h4>
                    {article.lead && (
                      <p className="text-sm font-medium text-secondary mb-4 italic">
                        {article.lead}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="https://blog.nirjar.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outlined px-6 py-2 rounded-full text-xs font-medium tracking-wide flex items-center gap-2 cursor-pointer"
          >
            View more notes <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section id="contact" className="scroll-section opacity-0 py-12 md:py-24 px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto border-t border-foreground/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:items-end">
          <div>
            {/* <h2 className="text-xs text-secondary uppercase tracking-widest mb-3">Get in Touch</h2> */}
            <h3 className="text-[30px] md:text-[36px] lg:text-[48px] font-normal text-foreground tracking-tight leading-none mb-6">
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
              Currently open to new projects and roles. If something's broken, needs to be built, or you want a second opinion — my inbox is short.
            </p>
          </div>

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
              <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
              <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="https://blog.nirjar.me/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Blogs</a>
              <a href="/nirjar_resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Resume</a>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto pt-16 pb-12 border-t border-foreground/5">
        <div className="w-full overflow-hidden mb-8">
          <h2 className="text-[22vw] md:text-[14vw] font-normal text-secondary uppercase tracking-[-0.06em] md:tracking-[-0.08em] text-center select-none leading-[0.85] font-sans">
            NIRJAR
          </h2>
        </div>
        <div className="border-t border-foreground/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-secondary font-sans font-light">
          <span>&copy; 2026 Nirjar Goswami</span>
          <div />
        </div>
      </footer>
    </div>
  );
}
