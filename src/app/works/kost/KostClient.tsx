"use client";

import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/Stagger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

  const features = [
    {
      title: "Over-Provisioning",
      desc: "Spots pods that request more CPU or memory than they actually use, and shows exactly what it's costing you every month.",
      img: "/icons/kost/k-1.svg",
      alt: "terminal output showing flagged workloads with waste amounts",
      bg: "bg-[var(--surface-warm-2)]",
      wide: true,
      mainCardClass: "min-[1025px]:p-8",
      desktopContainerClass: "min-[1025px]:min-h-[520px] min-[1025px]:h-[520px] min-[1025px]:p-8",
      desktopImgClass: "min-[1025px]:max-h-[460px] min-[1025px]:w-full min-[1025px]:max-w-full min-[1025px]:scale-105"
    },
    {
      title: "The fix, ready",
      desc: "Every finding comes with a ready kubectl set resources command — copy, paste, apply, no digging through YAML to figure out the fix.",
      img: "/icons/kost/k-2.svg",
      alt: "CLI output showing JSON findings with fix commands",
      bg: "bg-[var(--surface-warm-7)]",
      wide: true,
      compact: true,
      desktopContainerClass: "min-[1025px]:min-h-[440px] min-[1025px]:h-[440px]",
      desktopImgClass: "min-[1025px]:max-h-[340px] min-[1025px]:w-[82%]"
    },
    {
      title: "Slack Alerts",
      desc: "Wire up a webhook and waste notifications land straight in your team channel. Push over pull — you don't go check a dashboard, the alert comes to you.",
      img: "/icons/kost/k-3-new.svg",
      alt: "Slack message showing a waste alert",
      bg: "bg-[var(--surface-warm-8)]",
      short: true,
      mainCardClass: "min-[1025px]:p-6",
      desktopContainerClass: "min-[1025px]:min-h-[400px] min-[1025px]:h-[400px]",
      desktopImgClass: "min-[1025px]:max-h-[340px] min-[1025px]:w-[80%] min-[1025px]:scale-120"
    }
  ];

  return (
    <main className="w-full min-h-screen relative bg-background text-foreground selection:bg-foreground/10 selection:text-foreground">

      <Navbar variant="project" title="Kost" />

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
              <div className={`w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-4 md:p-6 ${feature.mainCardClass || "min-[1025px]:p-8"} flex flex-col ${idx % 2 === 1 ? "min-[1025px]:flex-row-reverse" : "min-[1025px]:flex-row"} items-start min-[1025px]:items-center justify-between gap-6 md:gap-6 min-[1025px]:gap-8 overflow-hidden`}>
                <div className="w-full min-[1025px]:w-[32%] min-[1025px]:shrink-0 text-left flex flex-col justify-start items-start">
                  <h3 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                    {feature.title}
                  </h3>
                  <p className="text-[#6B6B70] text-sm md:text-base leading-[1.4] max-w-2xl font-sans">
                    {feature.desc}
                  </p>
                  <a
                    href="https://github.com/nirjxr26/Kost#readme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-[#F54E00] text-sm md:text-base font-normal font-sans inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                  >
                    Learn more <span className="text-lg leading-none">→</span>
                  </a>
                </div>
                <div className="w-full min-[1025px]:w-[65%] min-[1025px]:shrink-0 flex justify-center items-center self-stretch">
                  <div className={`w-full ${feature.short ? "min-h-[320px] sm:min-h-[480px] md:min-h-[560px] max-[1024px]:lg:h-[620px]" : feature.compact ? "min-h-[320px] sm:min-h-[480px] md:min-h-[560px] max-[1024px]:lg:min-h-[520px]" : "min-h-[320px] sm:min-h-[480px] md:min-h-[560px] max-[1024px]:lg:min-h-[620px]"} ${feature.desktopContainerClass || "min-[1025px]:min-h-[500px] min-[1025px]:h-[500px]"} ${feature.bg} rounded-[8px] self-stretch flex items-center justify-start sm:justify-center p-6 sm:p-6 md:p-8 min-[1025px]:p-8 overflow-hidden relative`}>
                  {feature.img ? (
                    <img src={feature.img} alt={feature.alt} loading="lazy" className={`${feature.short ? "w-[180%] max-w-none h-full sm:h-auto sm:max-w-full max-[1024px]:lg:max-w-full max-[1024px]:lg:w-5/6 max-[1024px]:lg:max-h-[500px]" : feature.wide ? `${idx === 0 ? "w-[180%] sm:w-5/6 max-w-none sm:max-w-[600px] max-[1024px]:lg:max-w-[700px]" : "w-[180%] sm:w-full max-w-none sm:max-w-[700px] max-[1024px]:lg:max-w-[800px]"}` : "w-full max-w-[900px] h-auto max-h-full"} ${feature.desktopImgClass || "min-[1025px]:max-h-[440px]"} object-contain block relative select-none pointer-events-none`} />
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
      <section className="w-full py-12 md:py-20 bg-[#17150E] flex flex-col items-center">
        <ScrollReveal delay={0.15}>
          <div className="w-full max-w-xl mx-auto text-center px-4">
            <TextReveal
              as="h2"
              className="text-[28px] sm:text-[32px] md:text-[36px] font-normal text-foreground tracking-tight leading-[1.15] font-sans text-center mb-3"
              text="Try Kost now."
            />

            <p className="text-[#6B6B70] text-[14px] sm:text-[15px] md:text-[16px] leading-normal max-w-md mx-auto mb-4 font-sans">
            The project&apos;s open and ready for contributors — dig into the code or open an issue anytime.
            </p>

            <a
              href="https://github.com/nirjxr26/Kost"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
            >
              View on GitHub
            </a>

          </div>
        </ScrollReveal>
      </section>



      <Footer />

    </main>
  );
}
