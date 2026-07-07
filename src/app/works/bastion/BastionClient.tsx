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
    title: "Identity & Access",
    desc: "JWT access and refresh tokens with secure cookie handling. Google and GitHub OAuth with org-lvl policy enforcement — admins can mandate a single identity provider org-wide."
  },
  {
    icon: Scale,
    title: "Access Rules",
    desc: "Dynamic RBAC across users, roles, groups, and policies — explicit DENY always wins. Simulate a policy or check per-user effective permissions before it ships."
  },
  {
    icon: MonitorSmartphone,
    title: "Stay Verified",
    desc: "TOTP with backup codes and step-up reauth on sensitive actions. Live session viewer with per-session or bulk revocation."
  },
  {
    icon: History,
    title: "Every Action, Logged",
    desc: "Centralized audit logs — filterable, exportable, streamed, with security alerts. Runs on your infrastructure, no third-party dependency."
  }
];

export default function BastionClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);


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
        className={`fixed top-0 left-0 right-0 z-50 ${isScrolled
          ? "py-3 bg-background/95 backdrop-blur-md"
          : "py-6 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[4px]"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#6B6B70] font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#6B6B70]/60" />
            <span className="text-foreground font-medium font-sans">Bastion</span>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#6B6B70] hover:text-foreground transition-colors cursor-pointer md:hidden"
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
              <Link href="/" className="text-foreground hover:text-[#6B6B70] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/works/bastion" className="text-foreground hover:text-[#6B6B70] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Bastion
              </Link>
            </nav>
            <div className="border-t border-foreground/5 pt-8 flex flex-col space-y-8">
              <div className="text-xs text-[#6B6B70] font-light">
                Ahmedabad, Gujarat
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#6B6B70]">
                <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
                <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
                <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto pt-32 md:pt-40 pb-[45px]">
        <StaggerContainer delay={0.1} staggerStep={0.15}>
          <StaggerItem>
            <div className="flex flex-col items-start text-left">

              <h1 className="text-[22px] md:text-[30px] lg:text-[34px] font-normal tracking-tight leading-[1.05] font-sans max-w-5xl">
                <TextReveal
                  as="span"
                  className="block text-foreground text-left"
                  text="Bastion"
                  delay={0}
                />
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="xl:text-[18px] lg:text-[20px] xl:text-[22px] text-[#6B6B70] max-w-2xl leading-[1.2] mt-2 text-left font-sans text-balance"
              >
                Self-hosted access control — auth, MFA, sessions, and audit logs, with zero third-party access to your data.
              </motion.p>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </section>



      {/* IAM Dashboard Mockup */}
      <section className="w-full overflow-hidden pt-0 pb-10 sm:pb-16 md:pb-20 bg-background relative z-0">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
          <ScrollReveal delay={0.15}>
            <div className="w-full bg-[#201E18] rounded-[8px] flex items-center justify-start sm:justify-center pl-6 pr-0 py-6 sm:p-6 md:p-10 overflow-hidden relative shadow-2xl">
              <div className="w-[160%] sm:w-full rounded-[8px] overflow-hidden shadow-2xl shrink-0 relative">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 bg-[#14120B] border-b border-white/5">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#EDECEC]/20" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#EDECEC]/20" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#EDECEC]/20" />
                </div>

                {/* Dashboard layout */}
                <div className="flex flex-col md:flex-row min-h-[250px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px]">
                  {/* Sidebar — horizontal scroll on mobile, vertical on md+ */}
                  <aside className="hidden md:block md:w-52 lg:w-60 bg-[#14120B] overflow-x-auto border-b md:border-b-0 md:border-r border-[#E5E7EB]/6 no-scrollbar">
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
                  <main className="flex-1 bg-[#14120B] p-3 sm:p-4 md:p-5 overflow-y-auto text-white/90" style={{ fontFamily: "'Inter', 'Switzer', system-ui, sans-serif" }}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div>
                        <h2 className="text-sm md:text-base font-semibold text-white/95 tracking-tight">Dashboard</h2>
                        <p className="text-[11px] md:text-xs text-white/40 mt-0.5">Overview of your identity infrastructure</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/40 bg-[#1B1913] px-2.5 py-1.5 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          All systems operational
                        </div>
                        <button className="text-[11px] font-medium text-white bg-[#2563EB] hover:bg-[#1d4ed8] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer">
                          + Add User
                        </button>
                      </div>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-3 md:mb-4 w-[calc(100vw-30px)] sm:w-full">
                      {[
                        { label: 'Total Users', value: '2,847', change: '+12', positive: true },
                        { label: 'Active Sessions', value: '143', change: '-8', positive: false },
                        { label: 'Policies Enforced', value: '24', change: '+2', positive: true },
                        { label: 'Events (24h)', value: '8,392', change: '+18%', positive: true },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-[#1B1913] rounded-xl p-3">
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
                      <div className="bg-[#1B1913] rounded-xl p-3 md:p-4 flex flex-col">
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
                      <div className="hidden lg:flex bg-[#1B1913] rounded-xl p-3 md:p-4 flex-col">
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
                      <div className="bg-[#1B1913] rounded-xl p-3 md:p-4 flex flex-col">
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
                      <div className="hidden lg:flex bg-[#1B1913] rounded-xl p-3 md:p-4 flex-col">
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
            </div>
          </ScrollReveal>
        </div>
      </section>



      <section className="relative z-10 py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto bg-background">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h3"
              className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
              text="What It does."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => {
              return (
                <div
                  key={idx}
                  className="p-5 md:p-5 lg:p-6 flex flex-col rounded-[8px] bg-[#17150E] border border-white/[0.04]"
                >
                  <h4 className="text-[16px] md:text-[20px] font-normal text-foreground mb-1.5 font-sans tracking-normal">
                    {feature.title}
                  </h4>
                  <p className="text-[#6B6B70] text-[14px] md:text-[16px] leading-relaxed font-normal max-w-lg">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>
      {/* The new way to control access */}
      <section className="py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h3"
              className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
              text="The new way to control access."
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-6 md:gap-8">
          <ScrollReveal delay={0.25}>
            <div className="w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-6 md:p-6 flex flex-col items-start gap-8 overflow-hidden">
              <div className="w-full text-left flex flex-col justify-start items-start">
                <h4 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                  Continuous Integration
                </h4>
                <p className="text-[#6B6B70] text-sm md:text-base leading-relaxed max-w-2xl font-sans">
                  Every change proves itself before it ships — linting, unit tests, security scans, and reproducible builds, producing a signed, hardened image only if all of it passes.
                </p>
                <a
                  href="#"
                  className="mt-3 text-[#F54E00] text-sm md:text-base font-normal font-sans inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  Learn more <span className="text-lg leading-none">→</span>
                </a>
              </div>
              <div className="w-full flex justify-center items-center self-stretch">
                <div className="w-full min-h-[420px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[620px] bg-[#4A443B] rounded-[8px] self-stretch flex items-center justify-start sm:justify-center pl-6 pr-0 py-6 sm:p-6 md:p-10 overflow-hidden relative">
                  <img
                    src="/icons/1sr.svg"
                    alt="Security architecture diagram"
                    className="w-[180%] sm:w-full max-w-none sm:max-w-[900px] h-auto sm:h-auto sm:max-h-full object-contain block relative select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-6 md:p-8 flex flex-col items-start gap-8 overflow-hidden">
              <div className="w-full text-left flex flex-col justify-start items-start">
                <h4 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                  Continuous Deployment / GitOps
                </h4>
                <p className="text-[#6B6B70] text-sm md:text-base leading-relaxed max-w-2xl font-sans">
                  Merging to main resolves the new image SHA, patches it into the Kustomize overlays, and auto-merges via bot PR. ArgoCD reconciles the cluster to match — no manual apply.
                </p>
                <a
                  href="#"
                  className="mt-3 text-[#F54E00] text-sm md:text-base font-normal font-sans inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  Learn more <span className="text-lg leading-none">→</span>
                </a>
              </div>
              <div className="w-full flex justify-center items-center self-stretch">
                <div className="w-full min-h-[420px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[620px] bg-[#252118] rounded-[8px] self-stretch flex items-center justify-start sm:justify-center pl-6 pr-0 py-6 sm:p-6 md:p-10 overflow-hidden relative">
                  <img
                    src="/icons/2nd.svg"
                    alt="GitOps deployment diagram"
                    className="w-[180%] sm:w-full max-w-none sm:max-w-[900px] h-auto sm:h-auto sm:max-h-full object-contain block relative select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <div className="w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-6 md:p-8 flex flex-col items-start gap-8 overflow-hidden">
              <div className="w-full text-left flex flex-col justify-start items-start">
                <h4 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                  Boot sequence
                </h4>
                <p className="text-[#6B6B70] text-sm md:text-base leading-relaxed max-w-2xl font-sans">
                  Init containers enforce order: DB check, then prisma-migrate, then backend, frontend, and security-engine pods — so nothing boots against a database that isn't ready.
                </p>
                <a
                  href="#"
                  className="mt-3 text-[#F54E00] text-sm md:text-base font-normal font-sans inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  Learn more <span className="text-lg leading-none">→</span>
                </a>
              </div>
              <div className="w-full flex justify-center items-center self-stretch">
                <div className="w-full min-h-[420px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[620px] bg-[#26241E] rounded-[8px] self-stretch flex items-center justify-start sm:justify-center pl-6 pr-0 py-6 sm:p-6 md:p-10 overflow-hidden relative">
                  <img
                    src="/icons/3rd.svg"
                    alt="Boot sequence order diagram"
                    className="w-[180%] sm:w-full max-w-none sm:max-w-[900px] h-auto sm:h-auto sm:max-h-full object-contain block relative select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      {/* Zero Trust */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="text-center max-w-3xl mx-auto pb-[25px]">
            <TextReveal
              as="h3"
              className="text-[26px] sm:text-4xl md:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-sans text-center"
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
                description: "Every request is checked against policy first — deny by default.",
                svg: "/icons/z1.svg",
              },
              {
                subtitle: "Only the access it needs.",
                description: "Workloads get scoped to what their job requires — nothing assumed.",
                svg: "/icons/z2.svg",
              },
              {
                subtitle: "Trust is never permanent.",
                description: "Sessions are re-verified continuously across every device.",
                svg: "/icons/z3.svg",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="pt-4 pb-6 px-5 md:pt-5 md:pb-5 flex flex-col rounded-[8px] bg-[#17150E] border border-white/[0.04]"
              >
                <div className="flex-grow flex flex-col justify-start">
                  <h4 className="text-[15px] md:text-[16px] font-normal text-foreground mb-0 font-sans tracking-normal">
                    {card.subtitle}
                  </h4>
                  <p className="text-[#6B6B70] text-[15px] md:text-[16px] leading-[1.3] font-normal max-w-lg mb-6">
                    {card.description}
                  </p>

                  <img
                    src={card.svg}
                    alt={card.subtitle}
                    className="w-full h-auto mx-auto block mt-auto select-none pointer-events-none rounded-[6px] overflow-hidden"
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* The Model That Watches Itself
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <TextReveal
            as="h3"
            className="text-2xl sm:text-3xl md:text-[40px] font-normal text-foreground tracking-tight leading-[1.1] font-sans mb-8"
            text="The model that watches itself."
          />
          <div className="max-w-4xl">
            <p className="text-base md:text-lg text-[#6B6B70] leading-relaxed mb-6">
              Every authentication request is evaluated in real time using signals like IP reputation, login history, time of day, and behavioral patterns. Elevated risk automatically triggers step-up verification before access is granted.
            </p>
            <p className="text-base md:text-lg text-[#6B6B70] leading-relaxed">
              The detection model continuously improves. It retrains on recent activity, validates itself, and deploys new versions automatically—without interrupting authentication.
            </p>
            <br></br>
            <p className="text-base md:text-lg text-[#6B6B70] leading-relaxed">
              Even if the risk engine becomes unavailable, authentication continues. it falls back to a simpler rule set, so real users can still get in without leaving the door wide open.
            </p>
          </div>
        </ScrollReveal>
      </section>
      */}

      {/* Full Trace
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <TextReveal
            as="h3"
            className="text-2xl sm:text-3xl md:text-[40px] font-normal text-foreground tracking-tight leading-[1.1] font-sans mb-8"
            text="One trace, three languages."
          />
          <div className="max-w-4xl">
            <p className="text-base md:text-lg text-[#6B6B70] leading-relaxed">
              A single login touches three different services, written in three different languages. Bastion traces the request end to end, so you can see exactly where latency or a bad decision happened—instead of forcing you to correlate logs across multiple systems.
            </p>
          </div>
        </ScrollReveal>
      </section>
      */}

      {/* Why self-hosted
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <TextReveal
            as="h3"
            className="text-[30px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.1] font-sans mb-6"
            text="Your data, your infrastructure."
          />
          <div className="max-w-3xl">
            <p className="text-base md:text-lg text-[#6B6B70] leading-relaxed max-w-2xl">
              Every external identity provider is one more trust boundary you don&apos;t control. Bastion keeps authentication inside your own infrastructure, so user data, audit logs, and credentials stay yours.
            </p>
          </div>
        </ScrollReveal>
      </section>
      */}

      {/* Get Bastion Section */}
      <section className="w-full py-10 md:py-16 bg-[#17150E] flex flex-col items-center">
        <ScrollReveal delay={0.15}>
          <div className="w-full max-w-2xl mx-auto text-center">
            <TextReveal
              as="h3"
              className="text-[40px] sm:text-[44px] md:text-[50px] lg:text-[58px] font-normal text-foreground tracking-tight leading-[1.1] font-sans text-center mb-0"
              text="Try Bastion now."
            />


            {/* Subtext link */}
            <div className="mt-4 mb-4">
              <a
                href="https://github.com/nirjxr26/Bastion"
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

      {/* CTA Section */}
      <section className="py-10 md:py-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="max-w-lg mx-auto text-center flex flex-col items-center">
            <a
              href="mailto:nirjargoswami2626@gmail.com"
              className="text-lg sm:text-2xl md:text-[28px] font-normal text-foreground hover:text-accent transition-colors mb-1"
            >
              nirjargoswami2626@gmail.com
            </a>

            <a
              href="tel:+918799142626"
              className="text-sm sm:text-lg text-secondary hover:text-foreground transition-colors mb-0.5"
            >
              +91 87991 42626
            </a>

            <p className="text-xs sm:text-sm text-secondary/50 mb-5">
              Ahmedabad, Gujarat
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-0 gap-y-1">
              {[
                { label: "GitHub", href: "https://github.com/nirjxr26" },
                { label: "LinkedIn", href: "https://linkedin.com/in/nirjxr" },
                { label: "Twitter", href: "https://x.com/nirjxrgoswami" },
                { label: "Blogs", href: "https://blog.nirjar.me/" },
                { label: "Resume", href: "/nirjar_resume.pdf" },
              ].map((link, i) => (
                <React.Fragment key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm text-secondary/60 hover:text-foreground transition-colors px-2 sm:px-2 py-1"
                  >
                    {link.label}
                  </a>
                  {i < 4 && (
                    <span className="text-secondary/20 text-xs sm:text-sm select-none">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <footer className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto py-6 text-center border-t border-white/[0.04]">
        <p className="text-xs text-[#6B6B70] font-light">
          © {new Date().getFullYear()} Nirjar Goswami. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
