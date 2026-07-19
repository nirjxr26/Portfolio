"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/Stagger";
import * as Icons from "@/components/Icons";

export default function HomeClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [showAllWorks, setShowAllWorks] = useState(false);

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
      link: "https://github.com/nirjxr26/Kost",
      projectLink: "/works/kost"
    },
    {
      title: "HookDrop",
      category: "Webhook Receiver & Streamer",
      year: "2025",
      description: "HookDrop is a mock webhook receiver in Go — POST to a bucket URL, it catches, stores, and streams it live. The real work is the pipeline around it: ECR, hardening, GitOps.",
      link: "https://github.com/nirjxr26/HookDrop",
      projectLink: "/works/hookdrop"
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
      <Navbar variant="home" />

      <section className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto pt-40 pb-4 md:pt-35 md:pb-8">
        <div className="relative z-10 pt-4 pb-4">
          <StaggerContainer delay={0.15} staggerStep={0.2}>
            <StaggerItem>
              <h1 className="text-[38px] sm:text-[44px] md:text-[52px] lg:text-[64px] font-normal tracking-tight leading-[1.05] mb-8 font-sans max-w-6xl max-[420px]:text-[36px] max-[400px]:text-[32px]">
                <span className="block text-foreground text-nowrap">
                  Building systems
                </span>
                <span className="block text-secondary -mt-1.5 sm:-mt-1.2 text-nowrap">
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
            src="/icons/home/hero.svg"
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
              className="btn-outlined px-6 py-1.5 rounded-full text-xs font-medium tracking-wide flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-105 transition-transform text-[#F54E00]/90"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://blog.nirjar.me/why-ai-can-t-just-rewrite-windows"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[10px] bg-[#17150E] border border-white/[0.06] p-5 flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <p className="text-secondary text-[14px] font-normal mb-1">Jun 4, 2026 · Generative AI</p>
                <h4 className="text-[18px] md:text-[23px] font-medium text-foreground font-sans tracking-tight leading-snug">
                  Why AI can't just rewrite Windows
                </h4>
              </div>
              <span className="text-secondary text-[12px] mt-4">Nirjar · 4 min read</span>
            </a>
            <a
              href="https://blog.nirjar.me/sonarqube"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[10px] bg-[#17150E] border border-white/[0.06] p-0 flex flex-col"
            >
              <img
                src="/icons/home/a-2.svg"
                alt=""
                className="w-full rounded-t-[10px]"
              />
              <div className="p-5 flex flex-col justify-between gap-4 min-h-[130px]">
                <div>
                  <p className="text-secondary text-[14px] font-normal mb-1">25 May, 2026 · Observability</p>
                  <h4 className="text-[18px] md:text-[23px] font-medium text-foreground font-sans tracking-tight leading-snug">
                    SonarQube analysis.
                  </h4>
                </div>
                <span className="text-secondary text-[12px]">Nirjar · 5 min read</span>
              </div>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[10px] bg-[#17150E] border border-white/[0.06] p-5 flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <p className="text-secondary text-[14px] font-normal mb-1">April 16, 2026 · GitHub Actions</p>
                <h4 className="text-[18px] md:text-[23px] font-medium text-foreground font-sans tracking-tight leading-snug">
                  How GitHub changed my workflow.
                </h4>
              </div>
              <span className="text-secondary text-[12px] mt-4">Nirjar · 3 min read</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex justify-center mt-16">
            <a
              href="https://blog.nirjar.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outlined px-6 py-1.5 rounded-full text-xs font-medium tracking-wide flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-105 transition-transform text-[#F54E00]/90"
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

      <Footer />
    </main>
  );
}
