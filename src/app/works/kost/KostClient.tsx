"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/Stagger";
import * as Icons from "@/components/Icons";

export default function KostClient() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nirjar.me" },
      { "@type": "ListItem", "position": 2, "name": "Works", "item": "https://nirjar.me" },
      { "@type": "ListItem", "position": 3, "name": "Kost", "item": "https://nirjar.me/works/kost" }
    ]
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("up");

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

  const features = [
    {
      title: "Over-Provisioning",
      desc: "Spots pods that request more CPU or memory than they actually use, and shows exactly what it's costing you every month.",
      img: "/icons/kost/k-1.svg",
      alt: "terminal output showing flagged workloads with waste amounts",
      bg: "bg-[#252118]",
      wide: true
    },
    {
      title: "The fix, ready",
      desc: "Every finding comes with a ready kubectl set resources command — copy, paste, apply, no digging through YAML to figure out the fix.",
      img: "/icons/kost/k-2.svg",
      alt: "CLI output showing JSON findings with fix commands",
      bg: "bg-[#201E18]",
      wide: true,
      compact: true
    },
    // {
    //   title: "Built-In HTML Dashboard",
    //   desc: "Dark-themed dashboard served from the pod on port 8080. Shows monthly waste total, per-workload breakdown with requested vs actual CPU/memory, fix commands, and a rolling history of the last 200 reports.",
    //   img: "",
    //   alt: "screenshot of dashboard with waste cards and findings table",
    //   bg: "bg-[#4A443B]"
    // },
    // {
    //   title: "Prometheus Metrics",
    //   desc: "Exposes kost_over_provisioned_count and kost_waste_dollars gauges on /metrics. Plug it into Grafana, Prometheus, or whatever you already run.",
    //   img: "",
    //   alt: "metrics endpoint output showing gauge values",
    //   bg: "bg-[#4A443B]"
    // },
    {
      title: "Slack Alerts",
      desc: "Wire up a webhook and waste notifications land straight in your team channel. Push over pull — you don't go check a dashboard, the alert comes to you.",
      img: "/icons/kost/k-3-new.svg",
      alt: "Slack message showing a waste alert",
      bg: "bg-[#23201C]",
      short: true
    }
  ];

  return (
    <main className="w-full min-h-screen relative bg-background text-foreground selection:bg-foreground/10 selection:text-foreground">

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} ${isScrolled
          ? "py-3 bg-background/95 backdrop-blur-md"
          : "py-6 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[4px]"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#6B6B70] font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Icons.ChevronRight className="w-3 h-3 text-[#6B6B70]/60" />
            <span className="text-foreground font-medium font-sans">Kost</span>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#6B6B70] hover:text-foreground transition-colors cursor-pointer md:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-md pt-28 px-6 pb-12 flex flex-col justify-between md:hidden transition-all duration-300"
          style={{ opacity: mobileMenuOpen ? 1 : 0, transform: mobileMenuOpen ? "translateY(0)" : "translateY(-20px)" }}
        >
          <nav className="flex flex-col space-y-6 text-2xl font-light tracking-wide">
            <Link href="/" className="text-foreground hover:text-[#6B6B70] transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/works/kost" className="text-foreground hover:text-[#6B6B70] transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Kost
            </Link>
          </nav>
          <div className="border-t border-foreground/5 pt-8 flex flex-col space-y-8">
            <div className="text-xs text-[#6B6B70] font-light">
              Ahmedabad, Gujarat, India
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#6B6B70]">
              <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
              <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto pt-32 md:pt-40 pb-[45px]">
        <StaggerContainer delay={0.1} staggerStep={0.15}>
          <StaggerItem>
            <div className="flex flex-col items-start text-left">
              <h1 className="text-[22px] md:text-[30px] lg:text-[34px] font-normal tracking-tight leading-[1.05] font-sans max-w-5xl">
                Kost
              </h1>
              <p className="text-[17px] md:text-[20px] lg:text-[22px] text-[#6B6B70] max-w-2xl leading-[1.2] mt-2 text-left font-sans">
                Go agent that flags over-provisioned<br />pods and hands you the kubectl fix.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* What it does */}
      <section className="relative z-10 py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto bg-background">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h2"
              className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
              text="Find the waste."
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <ScrollReveal key={feature.title} delay={0.15 + idx * 0.05}>
              <div className="w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-4 md:p-6 flex flex-col items-start gap-6 md:gap-6 overflow-hidden">
                <div className="w-full text-left flex flex-col justify-start items-start">
                  <h3 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                    {feature.title}
                  </h3>
                  <p className="text-[#6B6B70] text-sm md:text-base leading-[1.4] max-w-2xl font-sans">
                    {feature.desc}
                  </p>
                </div>
                <div className="w-full flex justify-center items-center self-stretch">
                  <div className={`w-full ${feature.short ? "min-h-[320px] sm:min-h-[480px] md:min-h-[560px] lg:h-[620px]" : feature.compact ? "min-h-[320px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[520px]" : "min-h-[320px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[620px]"} ${feature.bg} rounded-[8px] self-stretch flex items-center justify-start sm:justify-center p-6 sm:p-6 md:p-8 overflow-hidden relative`}>
                  {feature.img ? (
                    <img src={feature.img} alt={feature.alt} loading="lazy" className={`${feature.short ? "w-[180%] max-w-none h-full sm:h-auto sm:max-w-full lg:max-w-full lg:w-5/6 lg:max-h-[500px]" : feature.wide ? `${idx === 0 ? "w-[180%] sm:w-5/6 max-w-none sm:max-w-[600px] lg:max-w-[700px]" : "w-[180%] sm:w-full max-w-none sm:max-w-[700px] lg:max-w-[800px]"} h-full sm:h-auto` : "w-full max-w-[900px] h-auto max-h-full"} object-contain block relative select-none pointer-events-none`} />
                  ) : (
                    <span className="text-[#6B6B70] text-xs sm:text-sm font-mono text-center">
                      [{feature.alt}]
                    </span>
                  )}
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px] text-center">
            <TextReveal
              as="h2"
              className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans text-center"
              text="One agent, on a loop."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-3">
            {[
              {
                subtitle: "Every pod, actual usage.",
                description: "Live CPU and memory from the Metrics API — not what was requested.",
                svg: "/icons/kost/kh-1.svg",
              },
              {
                subtitle: "Only flags what's wasted.",
                description: "Compares requests against real usage — nothing gets flagged without clearing both thresholds.",
                svg: "/icons/kost/kh-2.svg",
              },
              {
                subtitle: "One finding, four destinations.",
                description: "Same JSON, sent to stdout, Prometheus, the dashboard, and Slack.",
                svg: "/icons/kost/kh-3.svg",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="pt-4 pb-6 px-5 md:pt-5 md:pb-5 flex flex-col rounded-[8px] bg-[#17150E] border border-white/[0.04]"
              >
                <div className="flex-grow flex flex-col justify-start">
                  <h3 className="text-[15px] md:text-[16px] font-normal text-foreground mb-0 font-sans tracking-normal">
                    {card.subtitle}
                  </h3>
                  <p className="text-[#6B6B70] text-[15px] md:text-[16px] leading-[1.3] font-normal max-w-lg mb-6">
                    {card.description}
                  </p>
                  <img
                    src={card.svg}
                    alt={card.subtitle}
                    loading="lazy"
                    className="w-full h-auto mx-auto block mt-auto select-none pointer-events-none rounded-[6px] overflow-hidden"
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>



      {/* Security details: 3 cards */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px] text-center">
            <TextReveal
              as="h2"
              className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans text-center"
              text="Security & Isolation."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-3">
            {[
              {
                subtitle: "Nothing leaves your cluster.",
                description: "Zero third-party API calls. Slack webhook is the only outbound, and it's optional.",
                svg: "/icons/kost/kd-1.svg",
              },
              {
                subtitle: "Runs as non-root.",
                description: "runAsNonRoot: true, UID 65534. No path to root inside the pod.",
                svg: "/icons/kost/kd-2.svg",
              },
              {
                subtitle: "Read-only by design.",
                description: "ClusterRole grants only get/list/watch — pods, nodes, PVCs, Metrics API. No write, no exec, no secrets.",
                svg: "/icons/kost/kd-3.svg",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="pt-4 pb-6 px-5 md:pt-5 md:pb-5 flex flex-col rounded-[8px] bg-[#17150E] border border-white/[0.04]"
              >
                <div className="flex-grow flex flex-col justify-start">
                  <h3 className="text-[15px] md:text-[16px] font-normal text-foreground mb-0 font-sans tracking-normal">
                    {card.subtitle}
                  </h3>
                  <p className="text-[#6B6B70] text-[15px] md:text-[16px] leading-[1.3] font-normal max-w-lg mb-6">
                    {card.description}
                  </p>
                  <img
                    src={card.svg}
                    alt={card.subtitle}
                    className="w-full h-auto mx-auto block mt-auto select-none pointer-events-none rounded-[6px] overflow-hidden"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>



      {/* CTA */}
      <section className="w-full py-10 md:py-16 bg-[#17150E] flex flex-col items-center">
        <ScrollReveal delay={0.15}>
          <div className="w-full max-w-2xl mx-auto text-center">
            <TextReveal
              as="h2"
              className="text-[30px] sm:text-[44px] md:text-[50px] lg:text-[58px] font-normal text-foreground tracking-tight leading-[1.1] font-sans text-center mb-0"
              text="Try Kost now."
            />

            <div className="mt-4 mb-4">
              <a
                href="https://github.com/nirjxr26/Kost"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#EDECEC] hover:bg-[#EDECEC]/90 text-[#0C0A05] sm:text-[12px] md:text-[18px] font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg cursor-pointer font-sans"
              >
                View on GitHub
              </a>
            </div>

          </div>
        </ScrollReveal>
      </section>



      {/* Footer */}
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
