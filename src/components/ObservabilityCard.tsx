"use client";

import React from "react";

// Inline Custom SVG Checkmark Icon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
  </svg>
);

// Inline Custom SVG Alert/Warning Icon (Red Triangle)
const AlertIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path>
  </svg>
);

// Inline Custom SVG Sparkles/AI Icon
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.813 15.904L9 21L8.188 15.904L3 15L8.188 14.096L9 9L9.813 14.096L15 15L9.813 15.904Z" />
    <path d="M19.071 4.929L18.5 8.5L17.929 4.929L14.5 4.5L17.929 4.071L18.5 0.5L19.071 4.071L22.5 4.5L19.071 4.929Z" />
  </svg>
);

export default function ObservabilityCard() {
  return (
    <div className="relative rounded-3xl p-4 min-[375px]:p-6 md:p-8 lg:p-10 overflow-hidden shadow-2xl flex items-center justify-center w-full max-w-2xl bg-gradient-to-tl from-[#0F172A] via-[#1E40AF] to-[#0284C7]">
      {/* Decorative Grid Mesh overlay inside the gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),rgba(255,255,255,0))]" />

      {/* Outer Dashboard Card Panel */}
      <div className="w-full z-10 bg-[#171717] border border-neutral-800/40 rounded-2xl shadow-2xl p-4 sm:p-5 text-left flex flex-col gap-3.5">

        {/* Header Bar with Mac window controls on left, incident detected on right */}
        <div className="flex items-center justify-between select-none">
          <div className="flex items-center gap-1.5">
            {/* Standard Mac-style window controls */}
            <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
            <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
            <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
          </div>
          {/* Right aligned Incident detected text */}
          <span className="text-[#f85149] text-[8px] sm:text-[8.5px] font-medium">
            Incident detected
          </span>
        </div>

        {/* Main Alert Section */}
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xs sm:text-[13px] lg:text-[13px] font-semibold text-white tracking-normal leading-tight">
            Checkout latency increased 347%
          </h3>
          <p className="text-[8.5px] sm:text-[9.5px] lg:text-[9.5px] text-[#A1A1AA] leading-relaxed font-normal">
            Correlating metrics, logs, traces, and alerts across distributed systems.
          </p>
        </div>

        {/* Metrics Grid (4 columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { value: "99.99%", label: "Service uptime" },
            { value: "42ms", label: "p95 latency" },
            { value: "1.2B", label: "Events processed" },
            { value: "847", label: "Services monitored" },
          ].map((metric, idx) => (
            <div key={idx} className="bg-[#1E1E1E] rounded-xl p-2.5 flex flex-col gap-0.5 select-none">
              <span className="text-[11px] sm:text-[13px] lg:text-[13px] font-semibold text-white leading-none">{metric.value}</span>
              <span className="text-[8px] sm:text-[8.5px] text-neutral-500 leading-tight font-normal">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom Split Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* Left Side: Distributed Trace spans list */}
          <div className="bg-[#1E1E1E] rounded-xl p-3 flex flex-col gap-2.5 select-none">
            <h4 className="text-[9.5px] sm:text-[10.5px] lg:text-[10.5px] font-medium text-white">Distributed Trace</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { name: "API Gateway", duration: "14ms", barWidth: "w-[20%]", color: "bg-blue-500", status: "check" },
                { name: "Auth Service", duration: "32ms", barWidth: "w-[45%]", color: "bg-cyan-500", status: "check" },
                { name: "Orders API", duration: "41ms", barWidth: "w-[60%]", color: "bg-emerald-500", status: "check" },
                { name: "PostgreSQL", duration: "742ms", barWidth: "w-[90%]", color: "bg-red-500", status: "alert" },
              ].map((span, idx) => (
                <div key={idx} className="flex items-center justify-between text-[9px] sm:text-[10px] lg:text-[10px]">
                  <span className="text-neutral-300 w-20 truncate font-normal">{span.name}</span>
                  <div className="flex-grow mx-2 flex items-center">
                    <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden relative">
                      <div className={`h-full rounded-full ${span.barWidth} ${span.color} opacity-90`} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 w-14 justify-end font-normal">
                    <span className="text-neutral-400 text-[8.5px] font-normal">{span.duration}</span>
                    {span.status === "check" ? (
                      <CheckIcon className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertIcon className="w-3 h-3 text-[#f85149] shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Correlated Signals */}
          <div className="bg-[#1E1E1E] rounded-xl p-3 flex flex-col gap-2 select-none">
            <h4 className="text-[9.5px] sm:text-[10.5px] lg:text-[10.5px] font-medium text-white">Correlated Signals</h4>
            <div className="flex flex-col gap-1.5 text-[9px] sm:text-[10px] lg:text-[10px]">
              {[
                { name: "Metrics", val: "CPU spike detected" },
                { name: "Logs", val: "Timeout errors" },
                { name: "Traces", val: "Latency regression" },
                { name: "Alerts", val: "Database saturation" },
              ].map((sig, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-neutral-800/10 pb-1.5 last:border-0 last:pb-0">
                  <span className="text-neutral-400 font-normal">{sig.name}</span>
                  <span className="text-emerald-400 font-normal flex items-center gap-1">
                    ✓ {sig.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* AI Root Cause Analysis (Full Width below the grid) */}
        <div className="bg-[#1E1E1E] rounded-xl p-3 flex flex-col gap-1.5 select-none">
          <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10.5px] lg:text-[10.5px] font-medium text-white">
            <SparklesIcon className="w-3 h-3 text-blue-400 shrink-0" />
            <span>Root cause analysis</span>
          </div>
          <p className="text-[8.5px] sm:text-[9.5px] lg:text-[9.5px] text-neutral-300 leading-relaxed font-normal">
            High query contention on <span className="text-blue-400 font-medium">orders-db</span>. Elevated lock wait times account for 87% of the latency increase.
          </p>
        </div>

      </div>
    </div>
  );
}
