"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Menu, Sun, Moon, ChevronRight, Shield, Key, Lock, Eye, Server, Users, Rss, FileText } from "lucide-react";
import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/Stagger";
import { useTheme } from "@/components/ThemeProvider";

const features = [
  {
    icon: Key,
    title: "Authentication",
    desc: "JWT with refresh tokens. Google and GitHub OAuth, enforced at the org level."
  },
  {
    icon: Shield,
    title: "Policy Enforcement",
    desc: "Dynamic RBAC/PBAC with explicit DENY precedence — simulate a policy before it ships."
  },
  {
    icon: Lock,
    title: "Multi-Factor Auth",
    desc: "TOTP with backup codes. Step-up reauth on password changes, deletions, and privileged actions."
  },
  {
    icon: Eye,
    title: "Session Control",
    desc: "Live session viewer. Revoke one device or all of them, instantly."
  },
  {
    icon: Server,
    title: "Self-Hosted",
    desc: "Your infrastructure, your compliance boundary. No third-party auth dependency."
  },
  {
    icon: Users,
    title: "Audit Logging",
    desc: "Every access attempt — who, what, when, allowed or denied. Filterable, exportable, streamed."
  }
];

export default function BastionClient() {
  const { theme, toggleTheme, mounted } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [copied, setCopied] = useState(false);
  const lastScrollY = useRef(0);

  const handleCopy = () => {
    navigator.clipboard.writeText("git clone https://github.com/nirjxr26/AegisMesh-IAM");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
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

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-foreground/10 selection:text-foreground">
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
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-secondary font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-secondary/60" />
            <span className="text-foreground font-medium">Bastion</span>
          </nav>
          <div className="flex items-center space-x-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-1.5 text-secondary hover:text-foreground transition-colors cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-secondary hover:text-foreground transition-colors cursor-pointer md:hidden"
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
              <Link href="/" className="text-foreground hover:text-secondary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/works/bastion" className="text-foreground hover:text-secondary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Bastion
              </Link>
              {mounted && (
                <button
                  onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                  className="text-foreground hover:text-secondary transition-colors cursor-pointer"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
              )}
            </nav>
            <div className="border-t border-foreground/5 pt-8 flex flex-col space-y-8">
              <div className="text-xs text-secondary font-light">
                Ahmedabad, Gujarat
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary">
                <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
                <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
                <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto pt-32 md:pt-40 pb-16 md:pb-24">
        <StaggerContainer delay={0.1} staggerStep={0.15}>
          <StaggerItem>
            <div className="flex flex-col items-center text-center">

              <h1 className="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[96px] font-normal tracking-tight leading-[1.05] font-sans max-w-5xl">
                <TextReveal
                  as="span"
                  className="block text-foreground"
                  text="Bastion"
                  delay={0}
                />
              </h1>
              <div className="text-base sm:text-lg md:text-xl text-secondary max-w-3xl leading-relaxed mt-6 flex flex-col items-center text-center">
                <TextReveal
                  as="span"
                  className="block"
                  text="It gives teams enterprise-grade access control without handing user data"
                  delay={0.2}
                  muted
                />
                <TextReveal
                  as="span"
                  className="block mt-0.5"
                  text="to a third party — auth, policy enforcement, MFA, session control,"
                  delay={0.25}
                  muted
                />
                <TextReveal
                  as="span"
                  className="block mt-0.5"
                  text="and audit logging in a single self-hosted stack."
                  delay={0.3}
                  muted
                />
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </section>



      {/* Features */}
      <section className="border-t border-foreground/5 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-12 md:mb-16 text-center">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-sans"
              text="What Bastion does."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 rounded-2xl bg-foreground/5 transition-colors"
              >
                <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-accent/60 mb-4" />
                <h4 className="text-lg md:text-xl font-medium text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm md:text-base text-secondary leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </section>



      {/* How it ships */}
      <section className="border-t border-foreground/5 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        {/* Mockup / Hero Visual
        <ScrollReveal delay={0.1}>
          <div className="relative w-full aspect-[16/6] md:aspect-[21/7] rounded-2xl overflow-hidden flex items-center justify-center p-3 sm:p-6 md:p-8 bg-foreground/[0.10] border border-foreground/5 mb-12 md:mb-16">
            <div className="relative z-10 w-full h-full rounded-xl overflow-hidden bg-[#0A0A0C]/95 border border-white/[0.08] backdrop-blur-md flex flex-col">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/15" />
                  <div className="w-2 h-2 rounded-full bg-white/15" />
                  <div className="w-2 h-2 rounded-full bg-white/15" />
                </div>
                <span className="text-[13px] font-normal text-secondary tracking-wide select-none">
                  Bastion
                </span>
              </div>

              <div className="flex-1 flex items-center justify-center p-3 sm:p-5 md:p-6">
                <img
                  src="/icons/Icon.svg?v=cropped"
                  alt="Bastion System Logo"
                  className="w-full h-auto max-h-[85%] max-w-[92%] md:max-w-[88%] object-contain select-none opacity-95"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
        */}

        <ScrollReveal delay={0.15}>
          <div className="mb-10 md:mb-14">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-sans"
              text="How it ships."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col gap-10 md:gap-14 max-w-4xl">
            {/* CI Column */}
            <div className="flex flex-col">
              <h4 className="text-xl md:text-2xl font-normal text-foreground font-sans mb-3">
                CI
              </h4>
              <p className="text-base md:text-lg text-secondary leading-relaxed font-sans">
                Push to main, and Bastion tests itself before anything reaches production — lint, unit tests, and a Docker build check across all three services. Once merged, a hardened image is built, tagged, and pushed automatically.
              </p>
            </div>

            {/* CD / GitOps Column */}
            <div className="flex flex-col">
              <h4 className="text-xl md:text-2xl font-normal text-foreground font-sans mb-3">
                CD / GitOps
              </h4>
              <p className="text-base md:text-lg text-secondary leading-relaxed font-sans">
                From there, a GitOps pipeline takes over. Nothing is applied by hand — a controller watches the repo and rolls out the change on its own, ramping traffic gradually: 20%, then 50%, then 100%, so a bad deploy affects a fraction of users, not all of them.
              </p>
            </div>

            {/* Rollout Column */}
            <div className="flex flex-col">
              <h4 className="text-xl md:text-2xl font-normal text-foreground font-sans mb-3">
                Rollout
              </h4>
              <p className="text-base md:text-lg text-secondary leading-relaxed font-sans">
                Before the app goes live, schema migrations run first, in order — the database is always ready before the code that depends on it. A final check hits real traffic, not just a health endpoint, before the rollout is called done.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>



      {/* Zero Trust */}
      <section className="border-t border-foreground/5 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="max-w-4xl">
            <TextReveal
              as="h3"
              className="text-2xl sm:text-3xl md:text-[40px] font-normal text-foreground tracking-tight leading-[1.1] font-sans mb-8"
              text="Zero trust, enforced by the cluster."
            />
            <p className="text-base md:text-lg text-secondary leading-relaxed">
              Nothing talks to anything by default. Every connection between services has to be explicitly allowed. Containers run locked down — no root access, no writable filesystem, no privilege escalation. If something doesn&apos;t declare what it needs, it doesn&apos;t get deployed.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* The Model That Watches Itself */}
      <section className="border-t border-foreground/5 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="max-w-4xl">
            <TextReveal
              as="h3"
              className="text-2xl sm:text-3xl md:text-[40px] font-normal text-foreground tracking-tight leading-[1.1] font-sans mb-8"
              text="The model that watches itself."
            />
            <p className="text-base md:text-lg text-secondary leading-relaxed mb-6">
              Every login gets scored in real time — by IP, time of day, and behavior — and a suspicious one triggers extra verification automatically. The model isn&apos;t static: every night, it retrains itself on recent activity and swaps itself in, live, with no downtime.
            </p>
            <p className="text-base md:text-lg text-secondary leading-relaxed">
              And if that scoring system ever goes down, login still works. Security never becomes the reason people get locked out.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Full Trace */}
      <section className="border-t border-foreground/5 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="max-w-4xl">
            <TextReveal
              as="h3"
              className="text-2xl sm:text-3xl md:text-[40px] font-normal text-foreground tracking-tight leading-[1.1] font-sans mb-8"
              text="One trace, three languages."
            />
            <p className="text-base md:text-lg text-secondary leading-relaxed">
              A single login touches three different services, written in three different languages. Bastion follows it the whole way, so a slow login or a wrong decision can be traced to the exact step that caused it — not guessed at across three separate logs.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Why self-hosted */}
      <section className="border-t border-foreground/5 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-sans mb-6 [&_.inline-flex]:justify-center"
              text="Your data, your infrastructure."
            />
            <p className="text-base md:text-lg text-secondary leading-relaxed max-w-2xl mx-auto text-center">
              Every third-party auth provider is a data leak waiting to happen. Bastion runs on your own servers, under your own compliance boundary. No user data ever leaves your network.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/5 w-full px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto pt-12 pb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-sm text-secondary font-light select-none">
          © 2026 Nirjar Goswami. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-secondary">
          <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors link-underline">GitHub</a>
          <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors link-underline">LinkedIn</a>
          <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors link-underline">Twitter</a>
          <a href="https://blog.nirjar.me/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors link-underline">Blogs</a>
          <a href="/nirjar_resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors link-underline">Resume</a>
        </div>
      </footer>
    </div>
  );
}
