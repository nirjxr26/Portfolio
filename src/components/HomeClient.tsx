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
  const [isWorksDropdownOpen, setIsWorksDropdownOpen] = useState(false);

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
      link: "https://github.com/nirjxr26/Bastion"
    },
    {
      title: "HookDrop",
      category: "Webhook Receiver & Streamer",
      year: "2025",
      description: "HookDrop is a mock webhook receiver in Go — POST to a bucket URL, it catches, stores, and streams it live. The real work is the pipeline around it: ECR, hardening, GitOps.",
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
      desc: "Problems get caught in the pipeline, not in a postmortem. Static analysis, container scanning, and runtime detection run before code ships, not after something breaks.",
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

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-foreground/10 selection:text-foreground"
      style={{
        color: "#D4D4D8",
        ["--foreground" as any]: "#D4D4D8",
        ["--secondary" as any]: "#6B6B70",
      }}
    >

      {/* Navigation Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: showHeader ? 0 : -100, opacity: 1 }}
        transition={{
          y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }}
        className={`fixed top-0 left-0 right-0 z-50 ${isScrolled
          ? "py-3 bg-background/95 backdrop-blur-md"
          : "py-6 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[4px]"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="transition-opacity hover:opacity-80 block">
              <img
                src="/icons/nirjxr.svg"
                alt="nirjxr logo"
                className="h-12 w-auto block"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 text-[13px] font-normal tracking-wide">
            <div
              className="relative py-2"
              onMouseEnter={() => setIsWorksDropdownOpen(true)}
              onMouseLeave={() => setIsWorksDropdownOpen(false)}
            >
              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, "#work")}
                className="text-secondary hover:text-foreground transition-colors duration-300 block"
              >
                Works
              </a>

              <AnimatePresence>
                {isWorksDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 mt-2 w-60 bg-[#17150E]/98 backdrop-blur-md border border-white/[0.08] rounded-[8px] p-2 shadow-2xl z-50 overflow-hidden"
                  >
                    <Link
                      href="/works/bastion"
                      className="px-4 py-3 text-foreground hover:bg-white/[0.04] transition-all duration-200 block rounded-[6px] group/item"
                    >
                      <div className="font-sans font-medium text-[13px] tracking-wide text-foreground group-hover/item:text-accent transition-colors flex items-center gap-1.5">
                        Bastion <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transition-all" />
                      </div>

                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#insights" onClick={(e) => handleScrollTo(e, "#insights")} className="text-secondary hover:text-foreground transition-colors duration-300">
              Notes
            </a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="text-secondary hover:text-foreground transition-colors duration-300">
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
                href="#work"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollTo(e, "#work");
                }}
                className="text-foreground hover:text-secondary transition-colors"
              >
                Works
              </a>

              <a
                href="#insights"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleScrollTo(e, "#insights");
                }}
                className="text-foreground hover:text-secondary transition-colors"
              >
                Notes
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
      <section className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto pt-40 pb-10 md:pt-35 md:pb-16">
        <div className="relative z-10 pt-4 pb-4">
          <StaggerContainer delay={0.15} staggerStep={0.2}>
            <StaggerItem>
              <h1 className="text-[38px] sm:text-[44px] md:text-[52px] lg:text-[64px] font-normal tracking-normal leading-[1.05] mb-8 font-sans max-w-6xl max-[420px]:text-[36px] max-[400px]:text-[32px]">
                <TextReveal
                  as="span"
                  className="block text-foreground"
                  text="Building systems"
                  delay={0}
                />
                <TextReveal
                  as="span"
                  className="block text-secondary -mt-1 sm:-mt-1.2"
                  text="meant to be forgotten."
                  delay={0.15}
                  muted
                />
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-lg md:text-[20px] text-secondary max-w-2xl leading-relaxed mb-8 font-normal font-sans tracking-[-0.01em]">
                Nirjar Goswami, a Cloud and DevOps engineer who helps teams build infrastructure that ships faster and doesn't page anyone at 2am.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Main Illustration Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto mb-8 md:mb-16">
        <ScrollReveal delay={0.2}>
          <img
            src="/icons/mainsvg.svg"
            alt="Main system illustration"
            className="w-full h-auto object-contain block rounded-[8px]"
          />
        </ScrollReveal>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
              text="What I do."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="pt-4 pb-6 px-5 md:pt-5 md:pb-8 md:px-7 flex flex-col rounded-[8px] bg-[#17150E] border border-white/[0.04]"
              >
                <h4 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-3 md:mb-4 font-sans tracking-tight">
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
      <section id="work" className="py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1]"
              text="Recent Work."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence initial={false}>
              {(showAllWorks ? projects : projects.slice(0, 4)).map((proj, idx) => {
                return (
                  <motion.div
                    layout
                    key={proj.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-4 pb-6 px-5 md:pt-5 md:pb-8 md:px-7 flex flex-col justify-between items-start min-h-[240px] rounded-[8px] bg-[#17150E] border border-white/[0.04]"
                  >
                    <div>
                      <h4 className="text-lg md:text-xl lg:text-[24px] font-md text-foreground mb-1 font-sans tracking-tight">
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

      {/* Engineering Notes Section */}
      <section id="insights" className="py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
              text="Articles."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
              {[
                {
                  title: "Why AI can't just rewrite windows.",
                  link: "https://blog.nirjar.me/why-ai-can-t-just-rewrite-windows",
                },
                {
                  title: "Sonarqube had notes.",
                  link: "https://blog.nirjar.me/sonarqube",
                }
              ].map((article, idx) => {
                return article.title === "Why AI can't just rewrite windows." ? (
                  <a
                    key={idx}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-full aspect-auto xl:aspect-[16/9] min-h-[220px] md:min-h-[350px] lg:min-h-[400px] xl:min-h-0 overflow-hidden rounded-[8px] bg-[#17150E] cursor-pointer"
                  >
                    <div className="bg-[#13110B] rounded-[8px] w-[92%] h-[85%] overflow-hidden relative z-10 flex flex-col justify-start items-start">
                      <img
                        src="/icons/windowssvg.svg"
                        alt="Why AI cant just rewrite windows ?"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[8px]"
                      />
                      <div className="relative z-30 pt-4 pb-6 px-5 md:pt-5 md:pb-8 md:px-7 flex flex-col justify-start items-start w-full h-full">
                        <h4 className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-normal text-foreground font-sans tracking-normal leading-snug text-left">
                          Why AI cant just <br />rewrite windows ?
                        </h4>
                      </div>
                    </div>
                  </a>
                ) : article.title === "Sonarqube had notes." ? (
                  <a
                    key={idx}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-full aspect-auto xl:aspect-[16/9] min-h-[220px] md:min-h-[350px] lg:min-h-[400px] xl:min-h-0 overflow-hidden rounded-[8px] bg-[#17150E] cursor-pointer"
                  >
                    <div className="bg-[#13110B] rounded-[8px] w-[92%] h-[85%] overflow-hidden relative z-10 flex flex-col justify-start items-start">
                      <img
                        src="/icons/sonarqubenote.svg"
                        alt="872 Issues. 30 Days. SonarQube analysis."
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[8px]"
                      />
                      <div className="relative z-30 pt-4 pb-6 px-5 md:pt-5 md:pb-8 md:px-7 flex flex-col justify-start items-start w-full h-full">
                        <h4 className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-normal text-foreground font-sans tracking-normal leading-snug text-left">
                          872 Issues. 30 Days. <br />SonarQube analysis.
                        </h4>
                      </div>
                    </div>
                  </a>
                ) : null;
              })}
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
              View more<ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </ScrollReveal>
      </section>

      {/* Quote/Mission Section */}
      <section className="w-full bg-[#17150E] py-16 md:py-24">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-normal leading-[1.35] text-foreground">
                I&apos;ve built cloud infrastructure, deployment pipelines, and security systems that prevent problems before they happen. Now I want to build it somewhere it actually matters.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="contact" className="pt-12 pb-6 md:pt-16 md:pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col space-y-5 items-start w-full">
            <div className="flex flex-col space-y-1.5">
              <a
                href="mailto:nirjargoswami2626@gmail.com"
                className="text-lg min-[360px]:text-xl sm:text-xl md:text-lg lg:text-2xl font-light text-foreground w-fit cursor-default"
              >
                nirjargoswami2626@gmail.com
              </a>

              <a
                href="tel:+918799142626"
                className="text-base sm:text-lg md:text-lg lg:text-xl font-light text-foreground w-fit cursor-default"
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
        </ScrollReveal>
      </section>

      <footer className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto pt-6 pb-12 text-left border-t border-white/[0.04]">
        <p className="text-xs text-secondary font-light">
          © {new Date().getFullYear()} Nirjar Goswami. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
