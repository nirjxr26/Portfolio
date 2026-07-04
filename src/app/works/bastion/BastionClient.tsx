"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, ChevronRight, Shield, Key, Eye, Server, Users, FileText, KeyRound, Scale, Smartphone, MonitorSmartphone, History, Check, Copy } from "lucide-react";
import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/Stagger";

const features = [
  {
    icon: KeyRound,
    title: "Authentication",
    desc: "JWT with refresh tokens. Google and GitHub OAuth, enforced at the org level."
  },
  {
    icon: Scale,
    title: "Policy Enforcement",
    desc: "Dynamic RBAC/PBAC with explicit DENY precedence — simulate a policy before it ships."
  },
  {
    icon: Smartphone,
    title: "Multi-Factor Auth",
    desc: "TOTP with backup codes. Step-up reauth on password changes, deletions, and privileged actions."
  },
  {
    icon: MonitorSmartphone,
    title: "Session Control",
    desc: "Live session viewer. Revoke one device or all of them, instantly."
  },
  {
    icon: Server,
    title: "Self-Hosted",
    desc: "Your infrastructure, your compliance boundary. No third-party auth dependency."
  },
  {
    icon: History,
    title: "Audit Logging",
    desc: "Every access attempt — who, what, when, allowed or denied. Filterable, exportable, streamed."
  }
];

export default function BastionClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [widgetCopied, setWidgetCopied] = useState(false);
  const lastScrollY = useRef(0);

  const handleWidgetCopy = () => {
    navigator.clipboard.writeText("git clone https://github.com/nirjxr26/Bastion");
    setWidgetCopied(true);
    setTimeout(() => setWidgetCopied(false), 2000);
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
            <span className="text-foreground font-medium font-sans">Bastion</span>
          </nav>
          <div className="flex items-center space-x-4">
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
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mt-6 text-center mx-auto font-sans text-balance"
              >
                It gives teams enterprise-grade access control without handing user data to a third party — auth, policy enforcement, MFA, session control, and audit logging in a single self-hosted stack.
              </motion.p>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </section>



      {/* IAM Dashboard Mockup */}
      <section className="hidden lg:block w-full overflow-hidden py-6 md:py-10 bg-black">
        <div className="px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
          <ScrollReveal delay={0.15}>
            <div className="w-full rounded-xl md:rounded-2xl overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 bg-[#0D0F17] border-b border-white/5">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#EDECEC]/20" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#EDECEC]/20" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#EDECEC]/20" />
              </div>

              {/* Dashboard layout */}
              <div className="flex flex-col md:flex-row min-h-[250px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px]">
                {/* Sidebar — horizontal scroll on mobile, vertical on md+ */}
                <aside className="md:w-52 lg:w-60 bg-[#090D16] overflow-x-auto border-b md:border-b-0 md:border-r border-[#E5E7EB]/6 no-scrollbar">
                  <div className="flex md:flex-col gap-1 p-3 md:p-4 pb-4 md:pb-6 min-w-max md:min-w-0">
                    <div className="hidden md:block mb-6 px-2">
                      <span className="text-base font-bold text-white/90 tracking-tight">Bastion</span>
                    </div>

                    <p className="hidden md:block text-[9px] uppercase tracking-widest text-white/20 px-3 mb-1">Overview</p>
                    <div className="flex md:flex-col gap-1">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-md text-xs whitespace-nowrap transition-all bg-[#2563EB]/20 text-[#2563EB] font-medium">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                        <span className="hidden md:inline">Dashboard</span>
                      </div>
                    </div>

                    <p className="hidden md:block text-[9px] uppercase tracking-widest text-white/20 px-3 mb-1 mt-4">Access</p>
                    <div className="flex md:flex-col gap-1">
                      {[
                        { icon: <Users className="w-3.5 h-3.5" />, label: 'Users' },
                        { icon: <Shield className="w-3.5 h-3.5" />, label: 'Policies' },
                        { icon: <Key className="w-3.5 h-3.5" />, label: 'MFA' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-md text-xs whitespace-nowrap transition-all text-white/40 hover:text-white/70 hover:bg-white/[0.04]">
                          {item.icon}
                          <span className="hidden md:inline">{item.label}</span>
                        </div>
                      ))}
                    </div>

                    <p className="hidden md:block text-[9px] uppercase tracking-widest text-white/20 px-3 mb-1 mt-4">Monitoring</p>
                    <div className="flex md:flex-col gap-1">
                      {[
                        { icon: <Eye className="w-3.5 h-3.5" />, label: 'Sessions' },
                        { icon: <FileText className="w-3.5 h-3.5" />, label: 'Audit Log' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-md text-xs whitespace-nowrap transition-all text-white/40 hover:text-white/70 hover:bg-white/[0.04]">
                          {item.icon}
                          <span className="hidden md:inline">{item.label}</span>
                        </div>
                      ))}
                    </div>

                    <p className="hidden md:block text-[9px] uppercase tracking-widest text-white/20 px-3 mb-1 mt-4">System</p>
                    <div className="flex md:flex-col gap-1">
                      {[
                        { icon: <Server className="w-3.5 h-3.5" />, label: 'Providers' },
                        { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>, label: 'Settings' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-md text-xs whitespace-nowrap transition-all text-white/40 hover:text-white/70 hover:bg-white/[0.04]">
                          {item.icon}
                          <span className="hidden md:inline">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 bg-[#090D16] p-3 sm:p-4 md:p-5 overflow-y-auto text-white/90" style={{ fontFamily: "'Inter', 'Switzer', system-ui, sans-serif" }}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div>
                      <h2 className="text-sm md:text-base font-semibold text-white/95 tracking-tight">Dashboard</h2>
                      <p className="text-[11px] md:text-xs text-white/40 mt-0.5">Overview of your identity infrastructure</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/40 bg-[#111827] px-2.5 py-1.5 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        All systems operational
                      </div>
                      <button className="text-[11px] font-medium text-white bg-[#2563EB] hover:bg-[#1d4ed8] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer">
                        + Add User
                      </button>
                    </div>
                  </div>

                  {/* Stat cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-3 md:mb-4">
                    {[
                      { label: 'Total Users', value: '2,847', change: '+12', positive: true },
                      { label: 'Active Sessions', value: '143', change: '-8', positive: false },
                      { label: 'Policies Enforced', value: '24', change: '+2', positive: true },
                      { label: 'Events (24h)', value: '8,392', change: '+18%', positive: true },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-[#111827] rounded-xl p-3">
                        <p className="text-[11px] text-white/40 mb-0.5">{stat.label}</p>
                        <p className="text-base md:text-lg font-semibold text-white/95">{stat.value}</p>
                        <span className={`text-[11px] font-medium ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                          {stat.change}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Two column layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                    {/* Auth Methods Pie */}
                    <div className="bg-[#111827] rounded-xl p-3 md:p-4 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[11px] font-medium text-white/40 tracking-wide uppercase">Auth Methods</h3>
                        <span className="text-[11px] text-[#2563EB] font-medium cursor-pointer hover:underline">Details</span>
                      </div>
                      <div className="flex items-center gap-3 md:gap-5 flex-1">
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0">
                          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                            <circle cx="50" cy="50" r="42" fill="none" stroke="#2563EB" strokeWidth="8"
                              strokeDasharray={`${(45 / 100) * 263.9} 263.9`} strokeLinecap="round" />
                            <circle cx="50" cy="50" r="42" fill="none" stroke="#10b981" strokeWidth="8"
                              strokeDasharray={`${(28 / 100) * 263.9} 263.9`}
                              strokeDashoffset={`${-(45 / 100) * 263.9}`} strokeLinecap="round" />
                            <circle cx="50" cy="50" r="42" fill="none" stroke="#f59e0b" strokeWidth="8"
                              strokeDasharray={`${(18 / 100) * 263.9} 263.9`}
                              strokeDashoffset={`${-((45 + 28) / 100) * 263.9}`} strokeLinecap="round" />
                            <circle cx="50" cy="50" r="42" fill="none" stroke="#a78bfa" strokeWidth="8"
                              strokeDasharray={`${(9 / 100) * 263.9} 263.9`}
                              strokeDashoffset={`${-((45 + 28 + 18) / 100) * 263.9}`} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs md:text-sm font-semibold text-white/95 text-center leading-tight">2,847<br /><span className="text-[9px] md:text-[10px] font-normal text-white/40">total</span></span>
                          </div>
                        </div>
                        <div className="text-[11px] space-y-2 flex-1 min-w-0">
                          {[
                            { label: 'Password', value: '45%', color: 'bg-[#2563EB]', count: '1,281' },
                            { label: 'SSO / OAuth', value: '28%', color: 'bg-emerald-500', count: '797' },
                            { label: 'MFA (TOTP)', value: '18%', color: 'bg-amber-500', count: '512' },
                            { label: 'API Keys', value: '9%', color: 'bg-violet-500', count: '257' },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.color}`} />
                                <span className="text-white/50 truncate">{item.label}</span>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-white/40">{item.count}</span>
                                <span className="text-white/70 font-medium w-7 text-right">{item.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Active sessions */}
                    <div className="bg-[#111827] rounded-xl p-3 md:p-4 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[11px] font-medium text-white/40 tracking-wide uppercase">Active Sessions</h3>
                        <span className="text-[11px] text-[#2563EB] font-medium cursor-pointer hover:underline">Manage</span>
                      </div>
                      <div className="space-y-2 flex-1 flex flex-col justify-center">
                        {[
                          { user: 'alice@corp.com', device: 'Chrome / macOS', ip: '10.0.1.42', time: '1h 12m' },
                          { user: 'bob@corp.com', device: 'Firefox / Linux', ip: '10.0.1.87', time: '2h 04m' },
                          { user: 'carol@corp.com', device: 'Safari / iOS', ip: '203.0.113.42', time: '3h 30m' },
                          { user: 'dave@corp.com', device: 'Edge / Windows', ip: '10.0.2.15', time: '4h 55m' },
                        ].map((session, i) => (
                          <div key={i} className="flex items-center justify-between text-[11px] py-0.5">
                            <div className="min-w-0">
                              <p className="text-white/80 font-medium">{session.user}</p>
                              <p className="text-white/40 mt-0.5">{session.device} · {session.ip}</p>
                            </div>
                            <span className="text-white/40 shrink-0 ml-2">{session.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Access Decisions bar chart */}
                    <div className="bg-[#111827] rounded-xl p-3 md:p-4 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[11px] font-medium text-white/40 tracking-wide uppercase">Access Decisions (24h)</h3>
                        <span className="text-[11px] text-[#2563EB] font-medium cursor-pointer hover:underline">Details</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-end gap-1.5 h-20 sm:h-24 md:h-28">
                          {[65, 45, 80, 55, 70, 40, 85, 60, 75, 50, 90, 55].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                              <div
                                className="w-full rounded-sm bg-emerald-400/70"
                                style={{ height: `${h * 0.35}px` }}
                              />
                              <div
                                className="w-full rounded-sm bg-red-400/60"
                                style={{ height: `${(100 - h) * 0.18}px` }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-white/40">
                          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-emerald-400/70" />Allowed</span>
                          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-red-400/60" />Denied</span>
                        </div>
                      </div>
                    </div>

                    {/* MFA status */}
                    <div className="bg-[#111827] rounded-xl p-3 md:p-4 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[11px] font-medium text-white/40 tracking-wide uppercase">MFA Enrollment</h3>
                        <span className="text-[11px] text-[#2563EB] font-medium cursor-pointer hover:underline">Configure</span>
                      </div>
                      <div className="flex items-center gap-3 md:gap-4 flex-1">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                            <circle cx="50" cy="50" r="42" fill="none" stroke="#2563EB" strokeWidth="8"
                              strokeDasharray={`${(78 / 100) * 264} 264`} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm md:text-base font-semibold text-white/95">78%</span>
                          </div>
                        </div>
                        <div className="text-[11px] text-white/50 space-y-1">
                          <p><span className="text-white/90 font-medium">2,220</span> enrolled</p>
                          <p><span className="text-white/90 font-medium">627</span> not enrolled</p>
                          <p className="text-emerald-400 font-medium mt-1">+5.2% this week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Get Bastion Section */}
      <section className="border-t border-foreground/5 py-10 md:py-16 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto flex flex-col items-center">
        <ScrollReveal delay={0.15}>
          <div className="w-full max-w-2xl mx-auto text-center">
            <TextReveal
              as="h3"
              className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-sans text-center mb-5 sm:mb-8"
              text="Get started with Bastion."
            />

            {/* The Installer Widget */}
            <div className="relative z-30 max-w-sm sm:max-w-md mx-auto mb-4 sm:mb-6 px-4 sm:px-0">
              <div className="flex items-center justify-between gap-2.5 bg-[#11131C] border border-white/[0.06] rounded-full p-1 pl-4 pr-1.5 shadow-2xl w-full">
                {/* Command Display */}
                <div className="flex-1 min-w-0 font-mono text-[9.5px] min-[380px]:text-[11px] sm:text-xs text-white/90 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center select-all py-1.5">
                  <span className="font-mono font-medium select-all flex items-center gap-1.5">
                    <span className="text-[#E06C75] select-all">git clone</span>
                    <span className="text-white/60 select-all">https://github.com/nirjxr26/Bastion</span>
                  </span>
                </div>

                <button
                  onClick={handleWidgetCopy}
                  className="p-1.5 sm:p-2 hover:bg-white/5 text-white/40 hover:text-white rounded-full transition-colors shrink-0 cursor-pointer"
                  aria-label="Copy code"
                >
                  {widgetCopied ? (
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Subtext link */}
            <p className="text-sm text-secondary font-sans">
              <a
                href="https://github.com/nirjxr26/Bastion "
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors font-medium cursor-pointer"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Features */}
      <section className="border-t border-foreground/5 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1} className="mb-6 md:mb-8">
          <TextReveal
            as="h3"
            className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-sans"
            text="What It does."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {features.map((feature, idx) => {
              const gridClasses = [
                // Item 0
                "border-b md:border-r md:pr-12 lg:pr-16",
                // Item 1
                "border-b md:pl-12 lg:pl-16",
                // Item 2
                "border-b md:border-r md:pr-12 lg:pr-16",
                // Item 3
                "border-b md:pl-12 lg:pl-16",
                // Item 4
                "border-b md:border-b-0 md:border-r md:pr-12 lg:pr-16",
                // Item 5
                "border-b-0 md:pl-12 lg:pl-16"
              ];
              return (
                <div
                  key={idx}
                  className={`py-8 md:py-12 border-foreground/8 ${gridClasses[idx]}`}
                >
                  <h4 className="text-lg md:text-xl lg:text-[22px] font-normal text-foreground mb-3 font-sans tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-secondary text-sm md:text-base lg:text-[18px] leading-relaxed font-normal max-w-lg">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>



      {/* How it ships */}
      <section className="border-t border-foreground/5 pt-8 md:pt-12 pb-20 md:pb-28 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.15}>
          <TextReveal
            as="h3"
            className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-sans mb-2 sm:mb-3 text-center"
            text="How it ships."
          />
          <div className="max-w-3xl mb-16 md:mb-20 mx-auto text-center">
            <p className="text-lg md:text-xl text-secondary leading-relaxed font-sans">
              Deployments are boring on purpose. Every release gets checked, rolled out in stages, and confirmed working — before it reaches everyone.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="w-full flex flex-col gap-16 md:gap-24">

            {/* CI Section */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 justify-between w-full">
              <div className="flex-1 flex flex-col max-w-2xl">
                <h4 className="text-xl md:text-2xl font-normal text-foreground font-sans mb-3">
                  Continuous Integration
                </h4>
                <p className="text-base md:text-lg text-secondary leading-relaxed font-sans">
                  Every change proves itself before it ships. Bastion runs linting, unit tests, security checks, and reproducible builds across every service before producing a signed, hardened container image.
                </p>
              </div>
              <div className="flex-1 flex justify-center lg:justify-end w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[540px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden bg-[#14120B]"
                >
                  <img
                    src="/icons/cisvg.svg"
                    alt="CI Gate SVG"
                    className="w-full h-auto block"
                  />
                </motion.div>
              </div>
            </div>

            {/* CD / GitOps Section */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 justify-between w-full">
              <div className="flex-1 flex flex-col max-w-2xl">
                <h4 className="text-xl md:text-2xl font-normal text-foreground font-sans mb-3">
                  Continuous Deployment / GitOps
                </h4>
                <p className="text-base md:text-lg text-secondary leading-relaxed font-sans">
                  Once a change lands on main, Bastion resolves the new image SHA and patches it into the Kustomize overlays. A bot opens the PR and auto-merges it. ArgoCD watches main and reconciles the cluster to match.
                </p>
              </div>
              <div className="flex-1 flex justify-center lg:justify-end w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="w-full max-w-[540px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden bg-[#14120B]"
                >
                  <img
                    src="/icons/Container (Security Gate).svg"
                    alt="CD/GitOps SVG"
                    className="w-full h-auto block"
                  />
                </motion.div>
              </div>
            </div>

            {/* Rollout Section */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 justify-between w-full">
              <div className="flex-1 flex flex-col max-w-2xl">
                <h4 className="text-xl md:text-2xl font-normal text-foreground font-sans mb-3">
                  Rollout
                </h4>
                <p className="text-base md:text-lg text-secondary leading-relaxed font-sans">
                  Migrations run before new code serves traffic, so every deployment starts on a schema it can use. Before a rollout finishes, Bastion checks real application behavior, not just a health check response.
                </p>
              </div>
              <div className="flex-1 flex justify-center lg:justify-end w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="w-full max-w-[540px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden bg-[#14120B]"
                >
                  <img
                    src="/icons/rolloutsvg.svg"
                    alt="Rollout SVG"
                    className="w-full h-auto block"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>





      {/* Zero Trust */}
      <section className="border-t border-foreground/5 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <TextReveal
              as="h3"
              className="text-3xl sm:text-4xl md:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-sans text-center"
              text="Zero trust, enforced automatically."
            />
          </div>
        </ScrollReveal>

        {/* Zero Trust Cards */}
        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-3">
            {[
              {
                subtitle: "Nothing connects without permission.",
                description: "Every request is checked against network policy and access rules before it's allowed through — deny by default, allow only what's explicitly permitted.",
                svg: "/icons/auth.svg",
              },
              {
                subtitle: "Only the access it needs.",
                description: "Workloads get scoped to exactly what their job requires, nothing more. Permissions are granted one at a time, not assumed by default.",
                svg: "/icons/lp.svg",
              },
              {
                subtitle: "Nothing ships until it proves itself.",
                description: "Every release runs through the same gates before it goes anywhere near production: tests, checks, and a live smoke test.",
                svg: "/icons/dep.svg",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="flex flex-col bg-[#0b0b0d] rounded-2xl p-4 sm:p-5"
              >
                <div className="flex-grow flex flex-col justify-start">
                  <div className="pb-6">
                    <p className="leading-relaxed font-sans">
                      <span className="block text-lg font-medium text-foreground mb-1.5">
                        {card.subtitle}
                      </span>
                      <span className="text-sm text-secondary leading-relaxed block">
                        {card.description}
                      </span>
                    </p>
                  </div>

                  <div className="w-full flex-grow overflow-hidden flex items-end justify-center p-0 mt-4 relative min-h-[220px]">
                    <img
                      src={card.svg}
                      alt={card.subtitle}
                      className="w-full h-full object-contain object-bottom select-none pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>



      {/* The Model That Watches Itself */}
      <section className="border-t border-foreground/5 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <TextReveal
            as="h3"
            className="text-2xl sm:text-3xl md:text-[40px] font-normal text-foreground tracking-tight leading-[1.1] font-sans mb-8"
            text="The model that watches itself."
          />
          <div className="max-w-4xl">
            <p className="text-base md:text-lg text-secondary leading-relaxed mb-6">
              Every authentication request is evaluated in real time using signals like IP reputation, login history, time of day, and behavioral patterns. Elevated risk automatically triggers step-up verification before access is granted.
            </p>
            <p className="text-base md:text-lg text-secondary leading-relaxed">
              The detection model continuously improves. It retrains on recent activity, validates itself, and deploys new versions automatically—without interrupting authentication.
            </p>
            <br></br>
            <p className="text-base md:text-lg text-secondary leading-relaxed">
              Even if the risk engine becomes unavailable, authentication continues. it falls back to a simpler rule set, so real users can still get in without leaving the door wide open.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Full Trace */}
      <section className="border-t border-foreground/5 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <TextReveal
            as="h3"
            className="text-2xl sm:text-3xl md:text-[40px] font-normal text-foreground tracking-tight leading-[1.1] font-sans mb-8"
            text="One trace, three languages."
          />
          <div className="max-w-4xl">
            <p className="text-base md:text-lg text-secondary leading-relaxed">
              A single login touches three different services, written in three different languages. Bastion traces the request end to end, so you can see exactly where latency or a bad decision happened—instead of forcing you to correlate logs across multiple systems.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Why self-hosted */}
      <section className="border-t border-foreground/5 py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <TextReveal
            as="h3"
            className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-sans mb-6"
            text="Your data, your infrastructure."
          />
          <div className="max-w-3xl">
            <p className="text-base md:text-lg text-secondary leading-relaxed max-w-2xl">
              Every external identity provider is one more trust boundary you don&apos;t control. Bastion keeps authentication inside your own infrastructure, so user data, audit logs, and credentials stay yours.
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
