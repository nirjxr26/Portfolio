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

export default function HomeClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const mainStyle: CSSProperties & Record<"--foreground" | "--secondary", string> = {
    color: "#D4D4D8",
    "--foreground": "#D4D4D8",
    "--secondary": "#6B6B70",
  };

  const [showAllWorks, setShowAllWorks] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateCarouselArrows = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const tolerance = 2;
    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance);
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

  useEffect(() => {
    updateCarouselArrows();
    const el = carouselRef.current;
    if (!el) return;

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

    el.addEventListener("scroll", updateCarouselArrows, { passive: true });
    el.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", updateCarouselArrows);
    return () => {
      el.removeEventListener("scroll", updateCarouselArrows);
      el.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", updateCarouselArrows);
    };
  }, []);

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
      date: "Apr 16, 2026",
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
              <h1 className="text-[40px] sm:text-[48px] md:text-[52px] lg:text-[70px] font-medium tracking-tight leading-[1.15] sm:leading-[1.05] mb-8 font-display max-w-6xl">
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

        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </ScrollReveal>
      </section>

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
                  className="h-full min-h-[240px] p-5 md:p-[22px] flex flex-col items-start rounded-[8px] bg-[var(--surface-card)] border border-white/[0.04]"
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
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {articles.map((art) => (
              <a
                key={art.title}
                href={art.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-[8px] bg-[var(--surface-card)] border border-white/[0.04] p-5 md:p-[22px] flex flex-col justify-between min-h-[200px] w-[84%] shrink-0 snap-center snap-always [scroll-snap-stop:always] sm:snap-start sm:w-[420px] lg:w-[455px]"
              >
                <div>
                  <h4 className="text-[18px] md:text-[22px] font-normal text-foreground font-display tracking-[-0.01em] leading-snug mb-2">
                    {art.title}
                  </h4>
                  <p className="text-secondary text-[15px] sm:text-base leading-relaxed font-normal">
                    {art.desc}
                  </p>
                </div>

                <div className="pt-2 mt-3 flex items-center justify-between text-xs text-secondary/70 font-sans">
                  <span>{art.date}</span>
                  <span className="text-foreground/90 font-medium">{art.category}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                aria-label="Scroll articles left"
                disabled={!canScrollLeft}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${canScrollLeft ? "border-white/[0.08] bg-[var(--surface-card)] text-secondary hover:text-foreground hover:border-white/20 cursor-pointer active:scale-95" : "border-white/[0.04] bg-[var(--surface-card)] text-secondary/30 cursor-not-allowed"}`}
              >
                <Icons.ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel(1)}
                aria-label="Scroll articles right"
                disabled={!canScrollRight}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${canScrollRight ? "border-white/[0.08] bg-[var(--surface-card)] text-secondary hover:text-foreground hover:border-white/20 cursor-pointer active:scale-95" : "border-white/[0.04] bg-[var(--surface-card)] text-secondary/30 cursor-not-allowed"}`}
              >
                <Icons.ChevronRight className="w-4 h-4" />
              </button>
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
