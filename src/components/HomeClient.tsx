"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/Stagger";
import * as Icons from "@/components/Icons";
import { projects } from "@/lib/projects";

const PROJECT_LINKS: Record<string, { href: string; isExternal?: boolean }> = {
  Bastion: { href: "/works/bastion" },
  HookDrop: { href: "/works/hookdrop" },
  Kost: { href: "/works/kost" },
  DeployLens: { href: "https://github.com/nirjxr26/DeployLens", isExternal: true },
  VaultLock: { href: "https://github.com/nirjxr26/VaultLock-Password-Manager", isExternal: true },
  BlameLess: { href: "https://github.com/nirjxr26/Blamless", isExternal: true },
  Blamless: { href: "https://github.com/nirjxr26/Blamless", isExternal: true },
};

function FormattedBulletText({ text }: { text: string }) {
  const parts = text.split(/(<u>.*?<\/u>)/g);

  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith("<u>") && part.endsWith("</u>")) {
          const name = part.slice(3, -4);
          const linkInfo = PROJECT_LINKS[name] || { href: "/works" };

          if (linkInfo.isExternal) {
            return (
              <a
                key={index}
                href={linkInfo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-accent/70 underline-offset-4 hover:decoration-accent text-foreground hover:text-accent font-medium transition-colors inline-flex items-center gap-0.5 cursor-pointer"
              >
                {name}
                <Icons.ArrowUpRight className="w-3.5 h-3.5 text-accent inline shrink-0" />
              </a>
            );
          }
          return (
            <Link
              key={index}
              href={linkInfo.href}
              className="underline decoration-accent/70 underline-offset-4 hover:decoration-accent text-foreground hover:text-accent font-medium transition-colors cursor-pointer"
            >
              {name}
            </Link>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

export interface FrameDetail {
  number: string;
  tag: string;
  title: string;
  desc: string;
  tagline: string;
  achievements: string[];
  techStack: string[];
}

export default function HomeClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const frameCarouselRef = useRef<HTMLDivElement>(null);

  const mainStyle: CSSProperties & Record<"--foreground" | "--secondary", string> = {
    color: "#D4D4D8",
    "--foreground": "#D4D4D8",
    "--secondary": "#6B6B70",
  };

  const [showAllWorks, setShowAllWorks] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollFrameLeft, setCanScrollFrameLeft] = useState(false);
  const [canScrollFrameRight, setCanScrollFrameRight] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<FrameDetail | null>(null);

  useEffect(() => {
    if (selectedFrame) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedFrame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedFrame(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const updateCarouselArrows = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const tolerance = 2;
    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance);
  }, []);

  const updateFrameCarouselArrows = useCallback(() => {
    const el = frameCarouselRef.current;
    if (!el) return;
    const tolerance = 2;
    setCanScrollFrameLeft(el.scrollLeft > tolerance);
    setCanScrollFrameRight(el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance);
  }, []);

  const scrollCarousel = useCallback(
    (dir: 1 | -1) => {
      const el = carouselRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "16");
      const maxScroll = el.scrollWidth - el.clientWidth;
      const currentIndex = Math.round(el.scrollLeft / step);
      const targetIndex = Math.max(0, Math.min(currentIndex + dir, Math.ceil(maxScroll / step)));
      const target = Math.min(targetIndex * step, maxScroll);
      el.scrollTo({ left: target, behavior: "smooth" });
      setTimeout(updateCarouselArrows, 400);
    },
    [updateCarouselArrows]
  );

  const scrollFrameCarousel = useCallback(
    (dir: 1 | -1) => {
      const el = frameCarouselRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "20");
      const maxScroll = el.scrollWidth - el.clientWidth;
      const currentIndex = Math.round(el.scrollLeft / step);
      const targetIndex = Math.max(0, Math.min(currentIndex + dir, Math.ceil(maxScroll / step)));
      const target = Math.min(targetIndex * step, maxScroll);
      el.scrollTo({ left: target, behavior: "smooth" });
      setTimeout(updateFrameCarouselArrows, 400);
    },
    [updateFrameCarouselArrows]
  );

  useEffect(() => {
    updateCarouselArrows();
    updateFrameCarouselArrows();
    const el = carouselRef.current;
    const frameEl = frameCarouselRef.current;

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(delta) < 10) return;

      e.preventDefault();
      if (isScrolling) return;

      isScrolling = true;
      const dir = delta > 0 ? 1 : -1;
      scrollCarousel(dir);

      setTimeout(() => {
        isScrolling = false;
      }, 500);
    };

    if (el) {
      el.addEventListener("scroll", updateCarouselArrows, { passive: true });
      el.addEventListener("wheel", handleWheel, { passive: false });
    }
    if (frameEl) {
      frameEl.addEventListener("scroll", updateFrameCarouselArrows, { passive: true });
    }

    window.addEventListener("resize", updateCarouselArrows);
    window.addEventListener("resize", updateFrameCarouselArrows);

    return () => {
      if (el) {
        el.removeEventListener("scroll", updateCarouselArrows);
        el.removeEventListener("wheel", handleWheel);
      }
      if (frameEl) {
        frameEl.removeEventListener("scroll", updateFrameCarouselArrows);
      }
      window.removeEventListener("resize", updateCarouselArrows);
      window.removeEventListener("resize", updateFrameCarouselArrows);
    };
  }, [updateCarouselArrows, updateFrameCarouselArrows, scrollCarousel]);

  const frames: FrameDetail[] = [
    {
      number: "01",
      tag: "DevOps",
      title: "Ship faster, break less.",
      desc: "CI/CD and infrastructure built for repeatable, predictable deployments.",
      tagline: "Pipelines that don't page you at 2am.",
      achievements: [
        "Zero-touch GitOps pipelines that eliminate manual deploys — built for <u>Bastion</u> with GitHub Actions and ArgoCD reconciliation.",
        "Signed, scanned delivery pipelines that hold production latency under load — built for <u>HookDrop</u>, sub-35ms SSE at scale.",
        "Deployment tracking that ties every release back to its exact commit — built for <u>DeployLens</u> with real-time SHA correlation."
      ],
      techStack: ["GitHub Actions", "Docker", "Kubernetes", "Helm", "ArgoCD", "AWS ECR", "Terraform"]
    },
    {
      number: "02",
      tag: "Cybersecurity",
      title: "Security in every layer.",
      desc: "Identity, least privilege, and secure defaults — from the ground up.",
      tagline: "Deny by default, verify always.",
      achievements: [
        "Deny-first IAM with real-time login risk scoring — cut flagged security issues 87.4% when applied to <u>Bastion</u>.",
        "Admission-layer defense that blocks unsigned workloads before they run — built for <u>HookDrop</u> with Kyverno and NetworkPolicies.",
        "Local-only credential storage with no cloud trust dependency — built for <u>VaultLock</u> on Argon2id and AES-256-GCM."
      ],
      techStack: ["RBAC", "MFA", "OAuth", "Argon2id", "AES-256-GCM", "Kyverno", "Falco"]
    },
    {
      number: "03",
      tag: "Monitoring",
      title: "Know before it breaks.",
      desc: "Metrics, logs, and alerts that surface real signal, not noise.",
      tagline: "See the failure before your users do.",
      achievements: [
        "Full-stack tracing that turns failures into alerts instead of tickets — built for <u>HookDrop</u> with OpenTelemetry, Prometheus, and Grafana.",
        "Unified telemetry that connects an anomaly to its cause in one view — built for <u>Bastion</u> via Datadog APM.",
        "Usage-based cost alerting that flags waste before it hits the bill — built for <u>Kost</u> with automated Slack reporting."
      ],
      techStack: ["OpenTelemetry", "Prometheus", "Grafana", "Loki", "Tempo", "Datadog"]
    },
    {
      number: "04",
      tag: "Code Security",
      title: "Catch it before it ships.",
      desc: "Static analysis, dependency, and container scanning wired into the development workflow.",
      tagline: "Catch it in the PR, not in prod.",
      achievements: [
        "CI-gated static and dependency analysis — dropped open issues from 872 to 479 in 30 days on <u>Bastion</u>, security score 6.5 to 8.5.",
        "Signature-verified image admission that blocks unverified containers — built for <u>HookDrop</u> with Cosign and Kyverno."
      ],
      techStack: ["SonarCloud", "CodeQL", "Trivy", "Cosign", "Kyverno"]
    },
    {
      number: "05",
      tag: "Automation",
      title: "Less manual, more scale.",
      desc: "Deployments and operations that run themselves, end to end.",
      tagline: "Fewer runbooks, more running itself.",
      achievements: [
        "Infra-aware CI retries that stop false failures from blocking merges — shipped as <u>BlamLess</u>, live on GitHub Marketplace.",
        "Cost audits that output ready-to-run fixes, not just reports — built for <u>Kost</u> with scheduled kubectl remediation.",
        "Self-updating ML models with no manual retrain step — built for <u>Bastion</u> using Kubernetes CronJobs."
      ],
      techStack: ["GitHub Actions", "Kubernetes CronJobs", "ArgoCD", "GitOps"]
    }
  ];

  const services = [
    {
      title: "Security",
      highlight: "Built secure from the start.",
      desc: "I build systems with least privilege, defense in depth, secure authentication, and continuous security validation from day one."
    },
    {
      title: "Cloud & Infrastructure",
      highlight: "Built to survive real workloads.",
      desc: "Cost-efficient, reliable, scalable, resilient, and automated cloud solutions from development to deployment."
    },
    {
      title: "Automation First",
      highlight: "If it repeats, automate it.",
      desc: "CI/CD, Infrastructure as Code, testing, deployment, and operational workflows designed to reduce manual work and human error."
    },
    {
      title: "Continuous Visibility",
      highlight: "You can't secure what you can't see.",
      desc: "Logs, metrics, traces, security events, and monitoring that turn infrastructure into observable, actionable systems."
    }
  ];

  const articles = [
    {
      title: "Why AI can't rewrite Windows ?",
      category: "Generative AI",
      date: "Jun 4, 2026",
      readTime: "4 min read",
      desc: "50M lines. 41 years and decades of decisions. ",
      link: "https://blog.nirjar.me/why-ai-can-t-just-rewrite-windows"
    },
    {
      title: "SonarQube analysis",
      category: "Observability",
      date: "May 25, 2026",
      readTime: "5 min read",
      desc: "872 hidden issues. One scan. 30 days to fix what I couldn't see before.",
      link: "https://blog.nirjar.me/sonarqube"
    },
    {
      title: "How Git changed the way I work",
      category: "Developer Tools",
      // date: "Apr 16, 2026",
      readTime: "3 min read",
      desc: "Not just a code host. A place that quietly reshaped how I build.",
      link: "https://blog.nirjar.me/how-github-changed-my-workflow"
    },
    {
      title: "VaultLock's logo fetching problem",
      category: "Security",
      date: "Apr 8, 2026",
      readTime: "2 min read",
      desc: "Getting the right brand logo, every time, without breaking the UI.",
      link: "https://blog.nirjar.me/vaultlock-logo-fetching"
    }
  ];

  return (
    <main
      ref={containerRef}
      className="w-full min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-foreground/10 selection:text-foreground"
      style={mainStyle}
    >
      <Navbar variant="home" />

      <section className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto pt-36 pb-4 md:pt-35 md:pb-8">
        <div className="relative z-10 pt-4 pb-4">
          <StaggerContainer delay={0.15} staggerStep={0.2}>
            <StaggerItem>
              <h1 className="text-[40px] sm:text-[48px] md:text-[52px] lg:text-[70px] font-normal tracking-tight leading-[1.15] sm:leading-[1.05] mb-8 font-display max-w-6xl">
                <span className="block text-foreground">
                  Building systems
                </span>
                <span className="block text-secondary">
                  meant to be forgotten.
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[15px] md:text-[20px] text-secondary max-w-2xl  mb-8 font-normal font-sans tracking-[-0.01em]">
                Nirjar Goswami, a Cloud and DevOps engineer who helps teams build infrastructure that ships faster and doesn&apos;t page anyone at 2am.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/nirjar_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-action-btn"
                >
                  View Resume
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </a>
                <a
                  href="/works"
                  className="hero-action-btn-outlined"
                >
                  View Works
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section id="services" className="py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h2"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-display"
              text="What I do."
            />
          </div>
        </ScrollReveal>

        {/* <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="p-5 md:p-[22px] flex flex-col items-start rounded-[8px] bg-[var(--surface-card)] border border-white/[0.04]"
              >
                <h4 className="text-[18px] md:text-[22px] font-normal font-display tracking-[-0.01em] mb-1.5 text-foreground">
                  {service.title}
                </h4>
                <p className="text-secondary text-[15px] sm:text-base leading-relaxed font-normal max-w-lg">
                  <span className="text-[#A98A61]">{service.highlight} </span>
                  <span>{service.desc}</span>
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal> */}

        {/* Carousel inside What I do section container */}
        <ScrollReveal delay={0.25}>
          <div className="w-full relative">
            <div
              ref={frameCarouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 xl:-mx-16 min-[1536px]:[margin-left:calc(50%-50vw)] min-[1536px]:[margin-right:calc(50%-50vw)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-[1536px]:px-[calc(50vw-704px)] scroll-px-4 sm:scroll-px-6 md:scroll-px-8 lg:scroll-px-12 xl:scroll-px-16 min-[1536px]:scroll-pl-[calc(50vw-704px)]"
            >
              {frames.map((frame) => (
                <div
                  key={frame.title}
                  onClick={() => setSelectedFrame(frame)}
                  className="w-[310px] sm:w-[340px] md:w-[360px] min-h-[300px] p-5 md:p-[22px] rounded-[12px] bg-[var(--surface-card)] border border-white/[0.04] flex flex-col justify-between shrink-0 snap-start shadow-none cursor-pointer"
                >
                  <div>
                    <span className="text-xs text-secondary/70 font-sans tracking-[0.03em] mb-2 block font-medium">
                      {frame.tag}
                    </span>
                    <h3 className="text-[18px] md:text-[22px] font-normal font-display tracking-[-0.01em] mb-1.5 text-foreground">
                      {frame.title}
                    </h3>
                    <p className="text-secondary text-[15px] sm:text-base leading-relaxed font-normal">
                      {frame.desc}
                    </p>
                  </div>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFrame(frame);
                    }}
                    aria-label={`View details for ${frame.tag}`}
                    className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-foreground/80 self-end ml-auto mt-4 cursor-pointer"
                  >
                    <Icons.Plus className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Blurred Backdrop Detail Modal */}
      {selectedFrame && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xl flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedFrame(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] bg-[#17150E]/95 backdrop-blur-md border-none rounded-[16px] p-5 sm:p-8 md:p-10 lg:p-12 shadow-2xl overflow-y-auto no-scrollbar my-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-display font-normal text-foreground tracking-tight leading-snug pr-2">
                {selectedFrame.tagline}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedFrame(null)}
                className="p-1.5 sm:p-2 rounded-full text-secondary hover:text-foreground bg-white/[0.05] hover:bg-white/[0.12] transition-colors cursor-pointer shrink-0"
                aria-label="Close detail modal"
              >
                <Icons.X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Achievements with Arrow icons & Secondary Font Color */}
            <div className="border-t border-white/[0.06] pt-4 sm:pt-6 md:pt-7">
              <ul className="space-y-3.5 sm:space-y-5 md:space-y-6 lg:space-y-7">
                {selectedFrame.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3.5 md:gap-4 lg:gap-5 text-[13px] sm:text-base md:text-lg lg:text-[19px] leading-[1.5] sm:leading-[1.6] text-secondary font-sans">
                    <Icons.ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0 mt-0.5 sm:mt-1 -ml-3 sm:-ml-5 md:-ml-6 lg:-ml-7" />
                    <div>
                      <FormattedBulletText text={achievement} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <section id="work" className="py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h2"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-display"
              text="Recent Work."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(showAllWorks ? projects : projects.slice(0, 4)).map((proj) => {
              return (
                <div
                  key={proj.title}
                  className="h-full min-h-[240px] p-5 md:p-[22px] flex flex-col items-start rounded-[12px] bg-[var(--surface-card)] border border-white/[0.04]"
                >
                  <div>
                    <h4 className="text-[18px] md:text-[22px] font-normal text-foreground mb-0 font-display tracking-[-0.01em]">
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
                      {proj.projectLink ? (
                        <Link
                          href={proj.projectLink}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors cursor-pointer w-fit"
                        >
                          Learn more <Icons.ArrowUpRight className="w-4 h-4 text-accent" />
                        </Link>
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
              className="btn-outlined px-6 py-1.5 rounded-full text-xs font-medium tracking-normal flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-105 transition-transform text-[#F54E00]/90"
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
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-display"
              text="Articles."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="w-full relative">
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 xl:-mx-16 min-[1536px]:[margin-left:calc(50%-50vw)] min-[1536px]:[margin-right:calc(50%-50vw)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-[1536px]:px-[calc(50vw-704px)] scroll-px-4 sm:scroll-px-6 md:scroll-px-8 lg:scroll-px-12 xl:scroll-px-16 min-[1536px]:scroll-pl-[calc(50vw-704px)]"
            >
              {articles.map((art) => (
                <a
                  key={art.title}
                  href={art.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[310px] sm:w-[360px] md:w-[440px] lg:w-[400px] min-h-[300px] p-5 md:p-[22px] rounded-[12px] bg-[var(--surface-card)] border border-white/[0.04] flex flex-col justify-between shrink-0 snap-start shadow-none cursor-pointer group"
                >
                  <div>
                    <span className="text-xs text-secondary/70 font-sans tracking-[0.03em] mb-2 block font-medium">
                      {art.category}
                    </span>
                    <h3 className="text-[18px] md:text-[22px] font-normal font-display tracking-[-0.01em] mb-1.5 text-foreground leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-secondary text-[15px] sm:text-base leading-relaxed font-normal">
                      {art.desc}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-foreground/80 self-end ml-auto mt-4">
                    <Icons.ArrowUpRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex justify-center mt-16">
            <a
              href="https://blog.nirjar.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outlined px-6 py-1.5 rounded-full text-xs font-medium tracking-normal flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-105 transition-transform text-[#F54E00]/90"
            >
              View more<Icons.ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      <section id="contact" className="w-full bg-[var(--surface-card)] py-16 md:py-24">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-normal leading-[1.25] text-foreground">
                Every project I&apos;ve built has solved a real problem I&apos;ve encountered.
                Each feature exists for a reason and every decision is driven by a real need.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
