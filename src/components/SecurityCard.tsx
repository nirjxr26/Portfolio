"use client";

import React from "react";

export default function SecurityCard() {
  const diffLines = [
    {
      num: 1,
      code: (
        <>
          <span className="text-sky-400">app</span>.
          <span className="text-purple-400 font-semibold">get</span>(
          <span className="text-amber-200">"/"</span>, (
          <span className="text-orange-400">req</span>,{" "}
          <span className="text-orange-400">res</span>) =&gt;
        </>
      ),
    },
    {
      num: 2,
      code: (
        <>
          {"  "}
          <span className="text-orange-400">res</span>.
          <span className="text-purple-400 font-semibold">send</span>(
          <span className="text-amber-200">`{"<"}h1{">"}{"${"}</span>
          <span className="text-red-400 font-semibold underline decoration-wavy decoration-red-500">req.query.name</span>
          <span className="text-amber-200">{"}"}{"<"}/h1{">"}`</span>)
        </>
      ),
    },
    {
      num: 3,
      code: (
        <>
          );
        </>
      ),
    },
  ];

  return (
    <div className="relative rounded-3xl p-4 min-[375px]:p-6 md:p-8 lg:p-10 overflow-hidden shadow-2xl flex items-center justify-center w-full max-w-2xl bg-gradient-to-bl from-[#0F172A] via-[#1E40AF] to-[#0284C7]">
      {/* Decorative Grid Mesh overlay inside the gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),rgba(255,255,255,0))]" />

      {/* Outer Card Container */}
      <div className="w-full z-10 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden text-left flex flex-col">

        {/* Top Panel: Diff Code Editor */}
        <div className="bg-[#0E0E0E] border-b border-neutral-800/80 font-mono text-[9px] sm:text-[10px] lg:text-[10px] leading-normal text-left select-none overflow-hidden py-3 sm:py-4">
          {diffLines.map((line, idx) => (
            <div key={idx} className="flex hover:bg-neutral-800/20 min-h-[1.15rem] w-full">
              {/* Line number */}
              <div className="w-8 sm:w-10 text-right pr-2 sm:pr-3 text-neutral-500 select-none">
                {line.num}
              </div>
              {/* Diff sign */}
              <div className="w-4 text-center text-emerald-500 font-bold select-none pr-1">
                +
              </div>
              {/* Code */}
              <div className="flex-grow pl-1 whitespace-pre-wrap sm:whitespace-pre break-all bg-emerald-950/5 pr-4 text-neutral-300">
                {line.code}
              </div>
            </div>
          ))}
        </div>

        {/* Middle Panel: SonarQube Cloud Failure Check */}
        <div className="flex gap-2.5 sm:gap-3 items-start py-2.5 sm:py-3.5 md:py-4 px-2.5 sm:px-3.5 md:px-4 border-b border-neutral-200 dark:border-neutral-800/80 bg-[#171717]">
          <img src="/icons/sonarqubecloud.svg" className="hidden lg:block w-8 h-8 object-contain shrink-0 mt-0.5" alt="SonarQube" />
          <div className="flex-grow">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <img src="/icons/sonarqubecloud.svg" className="w-5 h-5 sm:w-6 h-6 lg:hidden object-contain shrink-0" alt="SonarQube" />
                <span className="font-semibold text-[#FAFAFA]/80 text-[9.5px] sm:text-[10.5px] lg:text-[10.5px]">
                  SonarQube
                </span>
              </div>
              <span className="text-[8.5px] sm:text-[9px] font-bold text-[#f85149]">
                High
              </span>
            </div>

            <div className="pl-6.5 sm:pl-8 lg:pl-0">
              <div className="mt-0.5">
                <h4 className="text-xs sm:text-[13px] lg:text-[13px] font-semibold text-[#FAFAFA] leading-tight">
                  Reflected Cross-Site Scripting
                </h4>
              </div>

              <p className="text-[8.5px] sm:text-[9.5px] lg:text-[9.5px] text-[#A1A1AA] mt-1 leading-relaxed">
                User-controlled input is rendered directly in the HTML response without sanitization.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Trivy Image Scan Failure Check */}
        <div className="flex gap-2.5 sm:gap-3 items-start py-2.5 sm:py-3.5 md:py-4 px-2.5 sm:px-3.5 md:px-4 bg-[#171717]">
          <img src="/icons/trivy.svg" className="hidden lg:block w-8 h-8 object-contain shrink-0 mt-0.5" alt="Trivy" />
          <div className="flex-grow">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <img src="/icons/trivy.svg" className="w-5 h-5 sm:w-6 h-6 lg:hidden object-contain shrink-0" alt="Trivy" />
                <span className="font-semibold text-[#FAFAFA]/80 text-[9.5px] sm:text-[10.5px] lg:text-[10.5px]">
                  Trivy
                </span>
              </div>
              <span className="text-[8.5px] sm:text-[9px] font-bold text-[#f85149]">
                Critical
              </span>
            </div>

            <div className="pl-6.5 sm:pl-8 lg:pl-0">
              <div className="mt-0.5">
                <h4 className="text-xs sm:text-[13px] lg:text-[13px] font-semibold text-[#FAFAFA] leading-tight">
                  Vuln Container Package (CVE-2024-3094)
                </h4>
              </div>

              <p className="text-[8.5px] sm:text-[9.5px] lg:text-[9.5px] text-[#A1A1AA] mt-1 leading-relaxed">
                Backdoor detected in liblzma (xz-utils) package. Compromised SSH daemon connection possible.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
