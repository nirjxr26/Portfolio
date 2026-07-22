"use client";

import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/Stagger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import * as Icons from "@/components/Icons";

export default function BastionClient() {

const features = [
  {
    title: "Identity & Access",
    desc: "JWT access and refresh tokens with secure cookie handling. Google and GitHub OAuth with org-lvl policy enforcement — admins can mandate a single identity provider org-wide."
  },
  {
    title: "Access Rules",
    desc: "Dynamic RBAC across users, roles, groups, and policies — explicit DENY always wins. Simulate a policy or check per-user effective permissions before it ships."
  },
  {
    title: "Stay Verified",
    desc: "TOTP with backup codes and step-up reauth on sensitive actions. Live session viewer with per-session or bulk revocation."
  },
  {
    title: "Every Action, Logged",
    desc: "Centralized audit logs — filterable, exportable, streamed, with security alerts. Runs on your infrastructure, no third-party dependency."
  }
];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nirjar.me" },
      { "@type": "ListItem", "position": 2, "name": "Works", "item": "https://nirjar.me" },
      { "@type": "ListItem", "position": 3, "name": "Bastion", "item": "https://nirjar.me/works/bastion" }
    ]
  };

  return (
    <main className="w-full min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-foreground/10 selection:text-foreground">

      <Navbar variant="project" title="Bastion" />

      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto pt-32 md:pt-40 pb-[45px]">
        <StaggerContainer delay={0.1} staggerStep={0.15}>
          <StaggerItem>
            <div className="flex flex-col items-start text-left">

              <h1 className="text-[22px] md:text-[30px] lg:text-[34px] font-normal tracking-tight leading-[1.05] font-sans max-w-5xl">
                Bastion
              </h1>
              <p className="xl:text-[18px] lg:text-[20px] xl:text-[22px] text-[#6B6B70] max-w-2xl leading-[1.2] mt-2 text-left font-sans text-balance">
                Self-hosted access control — auth, MFA, sessions, and audit logs, with zero third-party access to your data.
              </p>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />      {/* IAM Dashboard Mockup */}
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
                          { icon: <Icons.Users className="w-3.5 h-3.5" />, label: 'Users' },
                          { icon: <Icons.Shield className="w-3.5 h-3.5" />, label: 'Policies' },
                          { icon: <Icons.Key className="w-3.5 h-3.5" />, label: 'MFA' },
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
                          { icon: <Icons.Eye className="w-3.5 h-3.5" />, label: 'Sessions' },
                          { icon: <Icons.FileText className="w-3.5 h-3.5" />, label: 'Audit Log' },
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
                          { icon: <Icons.Server className="w-3.5 h-3.5" />, label: 'Providers' },
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
              as="h2"
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
                  <h3 className="text-[16px] md:text-[20px] font-normal text-foreground mb-1.5 font-sans tracking-normal">
                    {feature.title}
                  </h3>
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
              as="h2"
              className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
              text="The new way to control access."
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-6 md:gap-8">
          <ScrollReveal delay={0.25}>
            <div className="w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-4 md:p-6 min-[1025px]:p-8 flex flex-col min-[1025px]:flex-row items-start min-[1025px]:items-center justify-between gap-6 md:gap-8 min-[1025px]:gap-10 overflow-hidden">
              <div className="w-full min-[1025px]:w-[32%] min-[1025px]:shrink-0 text-left flex flex-col justify-start items-start">
                <h3 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                  Continuous Integration
                </h3>
                <p className="text-[#6B6B70] text-sm md:text-base leading-[1.4] max-w-2xl font-sans">
                  Every change proves itself before it ships — linting, unit tests, security scans, and reproducible builds, producing a signed, hardened image only if all of it passes.
                </p>
                <a
                  href="https://github.com/nirjxr26/Bastion#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#F54E00] text-sm md:text-base font-normal font-sans inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  Learn more <span className="text-lg leading-none">→</span>
                </a>
              </div>
              <div className="w-full min-[1025px]:w-[65%] min-[1025px]:shrink-0 flex justify-center items-center self-stretch">
                <div className="w-full min-h-[320px] sm:min-h-[480px] md:min-h-[560px] min-[1025px]:min-h-[500px] min-[1025px]:h-[500px] bg-[var(--surface-warm-1)] rounded-[8px] self-stretch flex items-center justify-start sm:justify-center p-6 sm:p-6 md:p-8 min-[1025px]:p-8 overflow-hidden relative">
                  <img
                    src="/icons/bastion/ci.svg"
                    alt="Security architecture diagram"
                    className="w-[180%] sm:w-full max-w-none sm:max-w-[900px] min-[1025px]:max-w-full h-auto sm:h-auto sm:max-h-full min-[1025px]:max-h-[440px] object-contain block relative select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-4 md:p-6 min-[1025px]:p-8 flex flex-col min-[1025px]:flex-row-reverse items-start min-[1025px]:items-center justify-between gap-6 md:gap-6 min-[1025px]:gap-10 overflow-hidden">
              <div className="w-full min-[1025px]:w-[32%] min-[1025px]:shrink-0 text-left flex flex-col justify-start items-start">
                <h3 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                  Continuous Deployment / GitOps
                </h3>
                <p className="text-[#6B6B70] text-sm md:text-base leading-[1.4] max-w-2xl font-sans">
                  Merging to main resolves the new image SHA, patches it into the Kustomize overlays, and auto-merges via bot PR. ArgoCD reconciles the cluster to match — no manual apply.
                </p>
                <a
                  href="https://github.com/nirjxr26/Bastion#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#F54E00] text-sm md:text-base font-normal font-sans inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  Learn more <span className="text-lg leading-none">→</span>
                </a>
              </div>
              <div className="w-full min-[1025px]:w-[65%] min-[1025px]:shrink-0 flex justify-center items-center self-stretch">
                <div className="w-full min-h-[320px] sm:min-h-[480px] md:min-h-[560px] min-[1025px]:min-h-[500px] min-[1025px]:h-[500px] bg-[var(--surface-warm-2)] rounded-[8px] self-stretch flex items-center justify-start sm:justify-center p-6 sm:p-6 md:p-8 min-[1025px]:p-8 overflow-hidden relative">
                  <img
                    src="/icons/bastion/cd.svg"
                    alt="GitOps deployment diagram"
                    className="w-[180%] sm:w-full max-w-none sm:max-w-[900px] min-[1025px]:max-w-full h-auto sm:h-auto sm:max-h-full min-[1025px]:max-h-[440px] object-contain block relative select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <div className="w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-4 md:p-6 min-[1025px]:p-8 flex flex-col min-[1025px]:flex-row items-start min-[1025px]:items-center justify-between gap-6 md:gap-6 min-[1025px]:gap-10 overflow-hidden">
              <div className="w-full min-[1025px]:w-[32%] min-[1025px]:shrink-0 text-left flex flex-col justify-start items-start">
                <h3 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                  Boot sequence
                </h3>
                <p className="text-[#6B6B70] text-sm md:text-base leading-[1.4] max-w-2xl font-sans">
                  Init containers enforce order: DB check, then prisma-migrate, then backend, frontend, and security-engine pods — so nothing boots against a database that isn&apos;t ready.
                </p>
                <a
                  href="https://github.com/nirjxr26/Bastion#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#F54E00] text-sm md:text-base font-normal font-sans inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  Learn more <span className="text-lg leading-none">→</span>
                </a>
              </div>
              <div className="w-full min-[1025px]:w-[65%] min-[1025px]:shrink-0 flex justify-center items-center self-stretch">
                <div className="w-full min-h-[320px] sm:min-h-[480px] md:min-h-[560px] min-[1025px]:min-h-[500px] min-[1025px]:h-[500px] bg-[var(--surface-warm-3)] rounded-[8px] self-stretch flex items-center justify-start sm:justify-center p-6 sm:p-6 md:p-8 min-[1025px]:p-8 overflow-hidden relative">
                  <img
                    src="/icons/bastion/boot-mobile.svg"
                    alt="Boot sequence order diagram"
                    className="block sm:hidden w-[180%] max-w-none h-auto object-contain relative select-none pointer-events-none"
                  />
                  <img
                    src="/icons/bastion/boot.svg"
                    alt="Boot sequence order diagram"
                    className="hidden sm:block w-[180%] sm:w-full max-w-none sm:max-w-[900px] min-[1025px]:max-w-full h-auto sm:h-auto sm:max-h-full min-[1025px]:max-h-[440px] object-contain relative select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      {/* The Model That Watches Itself */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h2"
              className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
              text="Model that watches itself."
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-6 md:gap-8">
          {/* Card 1 */}
          <ScrollReveal delay={0.25}>
            <div className="w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-4 md:p-6 min-[1025px]:p-8 flex flex-col min-[1025px]:flex-row items-start min-[1025px]:items-center justify-between gap-6 md:gap-6 min-[1025px]:gap-10 overflow-hidden">
              <div className="w-full min-[1025px]:w-[32%] min-[1025px]:shrink-0 text-left flex flex-col justify-start items-start">
                <h3 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                  Model Retraining
                </h3>
                <p className="text-[#6B6B70] text-sm md:text-base leading-[1.4] max-w-2xl font-sans">
                  The model retrains daily using recent activity through a Kubernetes CronJob and hot-swaps updates without restarting the service.
                </p>
                <a
                  href="https://github.com/nirjxr26/Bastion#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#F54E00] text-sm md:text-base font-normal font-sans inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  Learn more <span className="text-lg leading-none">→</span>
                </a>
              </div>
              <div className="w-full min-[1025px]:w-[65%] min-[1025px]:shrink-0 flex justify-center items-center self-stretch">
                <div className="w-full min-h-[320px] sm:min-h-[480px] md:min-h-[560px] min-[1025px]:min-h-[500px] min-[1025px]:h-[500px] bg-[var(--surface-warm-4)] rounded-[8px] self-stretch flex items-center justify-start sm:justify-center p-6 sm:p-6 md:p-8 min-[1025px]:p-8 overflow-hidden relative shadow-inner">
                  <img
                    src="/icons/bastion/m-1.svg"
                    alt="Model Retraining diagram"
                    className="w-[180%] sm:w-full max-w-none sm:max-w-[700px] min-[1025px]:max-w-full h-auto sm:h-auto sm:max-h-full min-[1025px]:max-h-[440px] object-contain block relative select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal delay={0.3}>
            <div className="w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-4 md:p-6 min-[1025px]:p-8 flex flex-col min-[1025px]:flex-row-reverse items-start min-[1025px]:items-center justify-between gap-6 md:gap-6 min-[1025px]:gap-10 overflow-hidden">
              <div className="w-full min-[1025px]:w-[32%] min-[1025px]:shrink-0 text-left flex flex-col justify-start items-start">
                <h3 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                  Risk Evaluation
                </h3>
                <p className="text-[#6B6B70] text-sm md:text-base leading-[1.4] max-w-2xl font-sans">
                  An Isolation Forest model scores every request on login history, action, and timing. High risk or rate-limit triggers step-up — password or MFA — before access is granted.
                </p>
                <a
                  href="https://github.com/nirjxr26/Bastion#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#F54E00] text-sm md:text-base font-normal font-sans inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  Learn more <span className="text-lg leading-none">→</span>
                </a>
              </div>
              <div className="w-full min-[1025px]:w-[65%] min-[1025px]:shrink-0 flex justify-center items-center self-stretch">
                <div className="w-full min-h-[200px] sm:min-h-[260px] md:min-h-[300px] min-[1025px]:min-h-[500px] min-[1025px]:h-[500px] bg-[var(--surface-warm-5)] rounded-[8px] self-stretch flex items-center justify-start sm:justify-center p-6 sm:p-6 md:p-8 min-[1025px]:p-8 overflow-hidden relative shadow-inner">
                  <img
                    src="/icons/bastion/m-2.svg"
                    alt="Risk Evaluation diagram"
                    className="w-[180%] sm:w-full max-w-none sm:max-w-[900px] lg:max-w-[700px] min-[1025px]:max-w-full h-auto sm:h-auto sm:max-h-full min-[1025px]:max-h-[440px] object-contain block relative select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal delay={0.35}>
            <div className="w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-4 md:p-6 min-[1025px]:p-8 flex flex-col min-[1025px]:flex-row items-start min-[1025px]:items-center justify-between gap-6 md:gap-6 min-[1025px]:gap-10 overflow-hidden">
              <div className="w-full min-[1025px]:w-[32%] min-[1025px]:shrink-0 text-left flex flex-col justify-start items-start">
                <h3 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                  Resilient Fallback
                </h3>
                <p className="text-[#6B6B70] text-sm md:text-base leading-[1.4] max-w-2xl font-sans">
                  Authentication defaults to neutral/low and keeps running. Account lock, rate limits, session checks, and IP blocking stay active independently.
                </p>
                <a
                  href="https://github.com/nirjxr26/Bastion#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#F54E00] text-sm md:text-base font-normal font-sans inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  Learn more <span className="text-lg leading-none">→</span>
                </a>
              </div>
              <div className="w-full min-[1025px]:w-[65%] min-[1025px]:shrink-0 flex justify-center items-center self-stretch">
                <div className="w-full min-h-[200px] sm:min-h-[260px] md:min-h-[300px] min-[1025px]:min-h-[500px] min-[1025px]:h-[500px] bg-[var(--surface-warm-6)] rounded-[8px] self-stretch flex items-center justify-start sm:justify-center p-6 sm:p-6 md:p-8 min-[1025px]:p-8 overflow-hidden relative shadow-inner">
                  <img
                    src="/icons/bastion/m-3.svg"
                    alt="Resilient Fallback diagram"
                    className="w-[180%] sm:w-full max-w-none sm:max-w-[900px] lg:max-w-[700px] min-[1025px]:max-w-full h-auto sm:h-auto sm:max-h-full min-[1025px]:max-h-[440px] object-contain block relative select-none pointer-events-none"
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
              as="h2"
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
                svg: "/icons/bastion/zt-auth.svg",
              },
              {
                subtitle: "Only the access it needs.",
                description: "Workloads get scoped to what their job requires — nothing assumed.",
                svg: "/icons/bastion/zt-lock.svg",
              },
              {
                subtitle: "Trust is never permanent.",
                description: "Sessions are re-verified continuously across every device.",
                svg: "/icons/bastion/zt-dep.svg",
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
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Get Bastion Section */}
      <section className="w-full py-12 md:py-20 bg-[#17150E] flex flex-col items-center">
        <ScrollReveal delay={0.15}>
          <div className="w-full max-w-xl mx-auto text-center px-4">
            <TextReveal
              as="h2"
              className="text-[28px] sm:text-[32px] md:text-[36px] font-normal text-foreground tracking-tight leading-[1.15] font-sans text-center mb-3"
              text="Try Bastion now."
            />

            <p className="text-[#6B6B70] text-[14px] sm:text-[15px] md:text-[16px] leading-normal max-w-md mx-auto mb-4 font-sans">
            The project's open and ready for contributors — dig into the code or open an issue anytime.
            </p>

            <a
              href="https://github.com/nirjxr26/Bastion"
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
