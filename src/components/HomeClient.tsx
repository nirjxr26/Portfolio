"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/Stagger";
import * as Icons from "@/components/Icons";

export default function HomeClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [showAllWorks, setShowAllWorks] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWorksDropdownOpen, setIsWorksDropdownOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("up");

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
      const delta = currentScrollY - lastScrollY.current;
      setIsScrolled(currentScrollY > 50);
      if (Math.abs(delta) < 10) { lastScrollY.current = currentScrollY; return; }
      const goingDown = delta > 0;
      if (goingDown && currentScrollY > 50 && scrollDirection.current !== "down") {
        setShowHeader(false);
        scrollDirection.current = "down";
      } else if (!goingDown && scrollDirection.current !== "up") {
        setShowHeader(true);
        scrollDirection.current = "up";
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
      link: "https://github.com/nirjxr26/Bastion",
      projectLink: "/works/bastion"
    },
    {
      title: "Kost",
      category: "Kubernetes Cost Intelligence",
      year: "2026",
      description: "Finds over-provisioned workloads and hands you the fix command. Waste detection, right-sizing, and Slack alerts, all from one pod. No dashboard to check, no database, no bill.",
      link: "https://github.com/nirjxr26/Kost"
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
      image: "/illustrations/stamping-white.webp",
      paddingClass: "md:p-4 lg:p-0"
    },
    {
      title: "Developer Operations",
      desc: "CI/CD pipelines that get code to production without ceremonies. Automated, tested, and fast enough that deploys stop being an event.",
      image: "/illustrations/developer-operations.webp",
      paddingClass: ""
    },
    {
      title: "Pipeline Security",
      desc: "Problems get caught in the pipeline, not in a postmortem. Static analysis, container scanning, and runtime detection run before code ships, not after something breaks.",
      image: "/illustrations/pipeline-security.webp",
      paddingClass: ""
    },
    {
      title: "Observability & MLOps",
      desc: "Metrics, logs, traces, and alerts that tell you what's wrong — including an ML risk model feeding signals back into the system it watches.",
      image: "/illustrations/observability-mlops.webp",
      paddingClass: ""
    }
  ];

  return (
    <main
      ref={containerRef}
      className="w-full min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-foreground/10 selection:text-foreground"
      style={{
        color: "#D4D4D8",
        ["--foreground" as any]: "#D4D4D8",
        ["--secondary" as any]: "#6B6B70",
      }}
    >
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} ${isScrolled
          ? "py-3 bg-background/95 backdrop-blur-md"
          : "py-6 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[4px]"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          <div className="flex items-center">
          </div>

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

              {isWorksDropdownOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-[#17150E]/98 backdrop-blur-md border border-white/[0.08] rounded-[8px] p-1.5 shadow-2xl z-50 overflow-hidden transition-all duration-200"
                  style={{ opacity: isWorksDropdownOpen ? 1 : 0, transform: `translateY(${isWorksDropdownOpen ? 0 : 8}px)` }}
                >
                  <Link
                    href="/works/bastion"
                    className="px-3 py-2 text-foreground hover:bg-white/[0.04] transition-all duration-200 block rounded-[6px] group/item"
                  >
                    <div className="font-sans font-medium text-[12px] tracking-wide text-foreground group-hover/item:text-accent transition-colors flex items-center gap-1">
                      Bastion <Icons.ArrowUpRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-all" />
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <a href="#insights" onClick={(e) => handleScrollTo(e, "#insights")} className="text-secondary hover:text-foreground transition-colors duration-300">
              Notes
            </a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="text-secondary hover:text-foreground transition-colors duration-300">
              Contact
            </a>
          </nav>

          <div className="flex md:hidden items-center space-x-2 z-50">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-secondary hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/98 backdrop-blur-md pt-28 px-6 pb-12 flex flex-col justify-between md:hidden transition-all duration-300"
          style={{ opacity: mobileMenuOpen ? 1 : 0, transform: mobileMenuOpen ? "translateY(0)" : "translateY(-20px)" }}
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

            <Link
              href="/works/bastion"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-secondary hover:text-foreground transition-colors ml-4 flex items-center gap-1.5"
            >
              Bastion <Icons.ArrowUpRight className="w-3 h-3" />
            </Link>

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
                Ahmedabad, Gujarat, India
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
      )}

      <section className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto pt-40 pb-10 md:pt-35 md:pb-16">
        <div className="relative z-10 pt-4 pb-4">
          <StaggerContainer delay={0.15} staggerStep={0.2}>
            <StaggerItem>
              <h1 className="text-[38px] sm:text-[44px] md:text-[52px] lg:text-[64px] font-normal tracking-normal leading-[1.05] mb-8 font-sans max-w-6xl max-[420px]:text-[36px] max-[400px]:text-[32px]">
                <span className="block text-foreground">
                  Building systems
                </span>
                <span className="block text-secondary -mt-1.5 sm:-mt-1.2">
                  meant to be forgotten.
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[15px] md:text-[20px] text-secondary max-w-2xl  mb-8 font-normal font-sans tracking-[-0.01em]">
                Nirjar Goswami, a Cloud and DevOps engineer who helps teams build infrastructure that ships faster and doesn't page anyone at 2am.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto mb-8 md:mb-16">
        <ScrollReveal delay={0.2}>
          <img
            src="/icons/hero.svg"
            alt="Cloud infrastructure diagram showing system architecture"
            className="w-full h-auto object-contain block rounded-[8px]"
          />
        </ScrollReveal>
      </section>

      <section id="services" className="py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h2"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-normal leading-[1.1] font-sans"
              text="What I do."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="pt-4 pb-4 px-5 md:p-5 flex flex-col rounded-[8px] bg-[#17150E] border border-white/[0.04]"
              >
                <h4 className="text-[18px] md:text-[20px] font-normal text-foreground mb-1 font-sans tracking-tight">
                  {service.title}
                </h4>
                <p className="text-secondary text-[15px] md:text-[16px] leading-relaxed font-normal max-w-lg">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section id="work" className="py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h2"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-normal leading-[1.1]"
              text="Recent Work."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(showAllWorks ? projects : projects.slice(0, 4)).map((proj, idx) => {
              return (
                <div
                  key={proj.title}
                  className="p-4 px-5 md:p-5 flex flex-col justify-between items-start min-h-[240px] rounded-[8px] bg-[#17150E] border border-white/[0.04]"
                >
                  <div>
                    <h4 className="text-lg md:text-xl lg:text-[24px] font-md text-foreground mb-0 font-sans tracking-tight">
                      {proj.title}
                    </h4>
                    <span className="text-xs text-secondary capitalize tracking-[0.03em] mb-4 block font-medium">
                      {proj.category}
                    </span>
                    <p className="text-secondary text-[15px] sm:text-base leading-relaxed font-normal max-w-lg mb-6">
                      {proj.description}
                    </p>
                  </div>
                  <div className="flex items-end justify-between w-full pt-8">
                    <div className="flex items-center gap-2 max-[400px]:flex-col max-[400px]:items-start">
                      {proj.title === "Bastion" && (
                        <Link
                          href="/works/bastion"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer w-fit"
                        >
                          Learn more <Icons.ArrowUpRight className="w-4 h-4 text-accent" />
                        </Link>
                      )}
                      {(proj.projectLink && proj.title !== "Bastion") ? (
                        <a
                          href={proj.projectLink}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-foreground transition-colors cursor-pointer w-fit"
                        >
                          Explore Case <Icons.ArrowUpRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-foreground transition-colors cursor-pointer w-fit"
                        >
                          Explore Case <Icons.ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <span className="text-xs text-secondary font-mono leading-none">{proj.year}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAllWorks(!showAllWorks)}
              className="btn-outlined px-6 py-1.5 rounded-full text-xs font-medium tracking-wide flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-105 transition-transform"
            >
              {showAllWorks ? "View less" : "View more works"}
              {showAllWorks ? <Icons.X className="w-4 h-4" /> : <Icons.ArrowUpRight className="w-4 h-4" />}
            </button>
          </div>
        </ScrollReveal>
      </section>

      <section id="insights" className="py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h2"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-normal leading-[1.1] font-sans"
              text="Articles."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
              <a href="https://blog.nirjar.me/why-ai-can-t-just-rewrite-windows" target="_blank" rel="noopener noreferrer" className="rounded-[8px] bg-[#17150E] border border-white/[0.04] overflow-hidden block">
                <img
                  src="/icons/a1.svg"
                  alt="Why AI can't rewrite Windows article thumbnail"
                  className="w-full h-auto object-contain block"
                />
              </a>
              <a href="https://blog.nirjar.me/sonarqube" target="_blank" rel="noopener noreferrer" className="rounded-[8px] bg-[#17150E] border border-white/[0.04] overflow-hidden block">
                <img
                  src="/icons/a-2.svg"
                  alt="SonarQube article thumbnail"
                  className="w-full h-auto object-contain block"
                />
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex justify-center mt-16">
            <a
              href="https://blog.nirjar.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outlined px-6 py-1.5 rounded-full text-xs font-medium tracking-wide flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-105 transition-transform"
            >
              View more<Icons.ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      <section className="w-full bg-[#17150E] py-16 md:py-24">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-normal leading-[1.2] text-foreground">
                I&apos;ve built cloud infrastructure, deployment pipelines, and security systems that prevent problems before they happen. Now I want to build it somewhere it actually matters.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto py-6 border-t border-white/[0.04]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-secondary font-light md:text-left text-center">
            © {new Date().getFullYear()} Nirjar Goswami. All rights reserved.
          </p>
          <div className="flex items-center justify-center md:justify-end gap-3 flex-wrap">
            <div className="bg-[#17150E] rounded-full px-5 py-2.5 flex items-center gap-5">
              <a href="mailto:nirjargoswami2626@gmail.com" aria-label="Email" className="text-secondary/60 hover:text-foreground transition-colors">
                <Icons.Mail className="w-4 h-4" />
              </a>
              <a href="tel:+918799142626" aria-label="Phone" className="text-secondary/60 hover:text-foreground transition-colors">
                <Icons.Phone className="w-4 h-4" />
              </a>
              <span aria-label="Ahmedabad, Gujarat, India" className="text-secondary/60 cursor-pointer">
                <Icons.MapPin className="w-4 h-4" />
              </span>
              <span className="text-secondary/20 select-none">|</span>
              <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-secondary/60 hover:text-foreground transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-secondary/60 hover:text-foreground transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" aria-label="Twitter" className="text-secondary/60 hover:text-foreground transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://blog.nirjar.me/" target="_blank" rel="noreferrer" aria-label="Blog" className="text-secondary/60 hover:text-foreground transition-colors">
                <Icons.FileText className="w-4 h-4" />
              </a>
            </div>
            <a href="/nirjar_resume.pdf" target="_blank" rel="noreferrer" className="bg-white rounded-full px-4 py-2 text-xs text-[#0C0A05] font-medium hover:bg-white/90 transition-colors">
              Resume
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
