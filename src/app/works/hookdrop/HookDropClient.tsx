"use client";

import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/Stagger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import * as Icons from "@/components/Icons";

export default function HookDropClient() {

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nirjar.me" },
      { "@type": "ListItem", "position": 2, "name": "Works", "item": "https://nirjar.me" },
      { "@type": "ListItem", "position": 3, "name": "HookDrop", "item": "https://nirjar.me/works/hookdrop" }
    ]
  };

  return (
    <main className="w-full min-h-screen relative bg-background text-foreground selection:bg-foreground/10 selection:text-foreground">

      <Navbar variant="project" title="HookDrop" />

      {/* Hero */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto pt-32 md:pt-40 pb-[45px]">
        <StaggerContainer delay={0.1} staggerStep={0.15}>
          <StaggerItem>
            <div className="flex flex-col items-start text-left">
              <h1 className="text-[22px] md:text-[30px] lg:text-[34px] font-normal tracking-tight leading-[1.05] font-sans max-w-5xl">
                HookDrop
              </h1>
              <p className="text-[17px] md:text-[20px] lg:text-[22px] text-[#6B6B70] max-w-2xl leading-[1.2] mt-2 text-left font-sans text-balance">
                A webhook sink you can watch live — every event traced,<br />every image signed before it ships.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* HookDrop Dashboard */}
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
                  {/* <span className="ml-2 text-[11px] text-white/30 font-mono">hookdrop — live dashboard</span> */}
                </div>

                {/* Dashboard layout */}
                <div className="bg-[#14120B] p-3 sm:p-4 md:p-5 text-white/90" style={{ fontFamily: "'Inter', 'Switzer', system-ui, sans-serif" }}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div>
                      <h2 className="text-sm md:text-base font-semibold text-white/95 tracking-tight">Webhook Monitor</h2>
                      <p className="text-[11px] md:text-xs text-white/40 mt-0.5">Real-time event stream from your sink</p>
                    </div>
                  </div>

                  {/* Stat cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 mb-3 md:mb-4 w-[calc(100vw-30px)] sm:w-full">
                    {[
                      { label: 'Total Events', value: '12,438', change: '+8.2%', positive: true },
                      { label: 'Active Streams', value: '7', change: '-2', positive: false },
                      { label: 'Traced Events', value: '99.8%', change: '', positive: true },
                      { label: 'Images Signed', value: '156', change: '+12', positive: true },
                      { label: 'Avg Latency', value: '24ms', change: '-3ms', positive: true, hideMobile: true },
                      { label: 'Buckets Live', value: '4', change: '+1', positive: true, hideMobile: true },
                    ].map((stat) => (
                      <div key={stat.label} className={`bg-[#1B1913] rounded-xl p-3${stat.hideMobile ? ' hidden lg:block' : ''}`}>
                        <p className="text-[11px] text-white/40 mb-0.5">{stat.label}</p>
                        <p className="text-base md:text-lg font-semibold text-white/95">{stat.value}</p>
                        {stat.change && (
                          <span className={`text-[11px] font-medium ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {stat.change}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Recent events table */}
                  <div className="bg-[#1B1913] rounded-xl p-3 md:p-4 mb-3 md:mb-4 w-[calc(100vw-30px)] sm:w-full overflow-x-auto">
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <h3 className="text-xs md:text-sm font-semibold text-white/90">Recent Events</h3>
                      <button className="text-[11px] text-[#2563EB] hover:text-[#3b82f6] transition-colors cursor-pointer">View All →</button>
                    </div>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[11px] text-white/30 border-b border-white/5">
                          <th className="pb-2 pr-2 font-normal">Method</th>
                          <th className="pb-2 pr-2 font-normal">Source</th>
                          <th className="pb-2 pr-2 font-normal hidden sm:table-cell">Bucket</th>
                          <th className="pb-2 pr-2 font-normal hidden md:table-cell">Source IP</th>
                          <th className="pb-2 pr-2 font-normal hidden md:table-cell">Trace ID</th>
                          <th className="pb-2 pr-2 font-normal">Status</th>
                          <th className="pb-2 font-normal text-right">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { method: 'POST', source: 'github', bucket: 'push-events', ip: '192.168.1.42', trace: 'tr-8a3f', status: '✓', statusColor: 'text-emerald-400', time: '2m ago' },
                          { method: 'POST', source: 'stripe', bucket: 'charges', ip: '34.120.85.6', trace: 'tr-c71b', status: '✓', statusColor: 'text-emerald-400', time: '15m ago' },
                          { method: 'POST', source: 'slack', bucket: 'events', ip: '54.87.210.33', trace: 'tr-f92d', status: '✓', statusColor: 'text-emerald-400', time: '1h ago' },
                          { method: 'POST', source: 'docker', bucket: 'push-hooks', ip: '18.192.47.8', trace: 'tr-4e65', status: '!', statusColor: 'text-amber-400', time: '2h ago' },
                          { method: 'GET', source: 'github', bucket: 'status-checks', ip: '140.82.112.3', trace: 'tr-a17b', status: '✓', statusColor: 'text-emerald-400', time: '3h ago' },
                        ].map((row, i) => (
                          <tr key={i} className="text-[12px] text-white/70 border-b border-white/[0.03] last:border-0">
                            <td className="py-2 pr-2">
                              <span className={`text-[11px] font-mono font-medium ${
                                row.method === 'POST' ? 'text-[#2563EB]' : 'text-[#6B6B70]'
                              }`}>{row.method}</span>
                            </td>
                            <td className="py-2 pr-2">
                              <span className="inline-flex items-center gap-1.5">
                                {row.source}
                              </span>
                            </td>
                            <td className="py-2 pr-2 text-white/50 hidden sm:table-cell">{row.bucket}</td>
                            <td className="py-2 pr-2 text-white/40 hidden md:table-cell font-mono">{row.ip}</td>
                            <td className="py-2 pr-2 text-white/40 hidden md:table-cell font-mono">{row.trace}</td>
                            <td className={`py-2 pr-2 ${row.statusColor} font-mono text-[11px]`}>{row.status}</td>
                            <td className="py-2 text-right text-white/40">{row.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Live status bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-white/40">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-emerald-400 font-medium">7</span> SSE streams
                      </div>
                      <span className="text-white/10">|</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                      <span className="text-white/10">|</span>
                      <span>Uptime <span className="text-white/60">99.97%</span></span>
                    </div>
                    <div className="text-[11px] text-white/25 font-mono">last sync: now</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* The pipeline behind a small app */}
      <section className="py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">
        <ScrollReveal delay={0.1}>
          <div className="mb-[25px]">
            <TextReveal
              as="h2"
              className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-md text-foreground tracking-tight leading-[1.1] font-sans"
              text="One binary. Every gate."
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-6 md:gap-8">
          <ScrollReveal delay={0.25}>
            <div className="w-full bg-[#17150E] border border-white/[0.04] rounded-[8px] p-4 md:p-6 flex flex-col items-start gap-6 md:gap-8 overflow-hidden">
              <div className="w-full text-left flex flex-col justify-start items-start">
                <h3 className="text-lg md:text-xl lg:text-[24px] font-normal text-foreground mb-2 font-sans tracking-normal">
                  Nothing Ships Unverified.
                </h3>
                <p className="text-[#6B6B70] text-sm md:text-base leading-[1.4] max-w-2xl font-sans">
                  Every push runs the full gate — tests, lint, a CVE scan — then builds, signs, and waits at the cluster edge for Kyverno to let it in.
                </p>
                <a
                  href="https://github.com/nirjxr26/HookDrop#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#F54E00] text-sm md:text-base font-normal font-sans inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  Learn more <span className="text-lg leading-none">→</span>
                </a>
              </div>
              <div className="w-full flex justify-center items-center self-stretch">
                <div className="w-full min-h-[420px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[620px] bg-[#252219] rounded-[8px] self-stretch flex items-center justify-start sm:justify-center p-6 sm:p-6 md:p-8 overflow-hidden relative">
                  <img
                    src="/icons/hookdrop/cicd.svg"
                    alt="CI/CD pipeline diagram"
                    className="w-[280%] sm:w-[130%] md:w-full lg:w-[115%] xl:w-full max-w-none md:max-w-full h-auto sm:h-auto sm:max-h-full object-contain block relative select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-20 bg-[#17150E] flex flex-col items-center">
        <ScrollReveal delay={0.15}>
          <div className="w-full max-w-xl mx-auto text-center px-4">
            <TextReveal
              as="h2"
              className="text-[28px] sm:text-[32px] md:text-[36px] font-normal text-foreground tracking-tight leading-[1.15] font-sans text-center mb-3"
              text="Try HookDrop now."
            />

            <p className="text-[#6B6B70] text-[14px] sm:text-[15px] md:text-[16px] leading-normal max-w-md mx-auto mb-4 font-sans">
            The project&apos;s open and ready for contributors — dig into the code or open an issue anytime.
            </p>
            <a
              href="https://github.com/nirjxr26/HookDrop"
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
