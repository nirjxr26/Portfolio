"use client";

import React from "react";
import { GitPullRequest, Check } from "lucide-react";

export default function PRStatusCard() {
  // Custom Github avatar icon representing GitHub Actions / checks from skillicons.dev
  const GithubIcon = () => (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="https://skillicons.dev/icons?i=github"
      alt="GitHub"
      className="w-6 h-6 object-contain shrink-0 rounded-[6px] shadow-sm select-none"
    />
  );

  // Row render helper for static checks (larger text and padding)
  const renderCheckRow = (name: string, successText: string) => {
    return (
      <div className="flex items-center justify-between py-2 px-4.5 sm:py-2.5 sm:px-6 md:px-7 hover:bg-neutral-50 dark:hover:bg-neutral-800/10 transition-colors duration-200 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          {/* Status Indicator (Checkmark) */}
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <Check className="w-4.5 h-4.5 text-[#1f883d] dark:text-[#3fb950] stroke-[2.5]" />
          </div>

          <GithubIcon />

          {/* Details */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 min-w-0">
            <span className="text-[9px] sm:text-[10px] lg:text-[10px] font-semibold text-neutral-800 dark:text-neutral-200 truncate">{name}</span>
            <span className="text-[8px] sm:text-[9px] lg:text-[9px] text-neutral-500 dark:text-neutral-400 shrink-0">
              {successText}
            </span>
          </div>
        </div>

        {/* Static Details Link */}
        <span className="text-[9px] sm:text-[10px] lg:text-[10px] font-medium text-blue-600 dark:text-blue-400 hover:underline shrink-0">
          Details
        </span>
      </div>
    );
  };

  return (
    <div className="relative rounded-3xl p-4 min-[375px]:p-6 md:p-8 lg:p-10 overflow-hidden shadow-2xl flex items-center justify-center w-full max-w-2xl bg-gradient-to-br from-[#0F172A] via-[#1E40AF] to-[#0284C7]">
      {/* Decorative Grid Mesh overlay inside the gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),rgba(255,255,255,0))]" />

      {/* Outer PR Card Container */}
      <div className="w-full z-10 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden text-left">

        {/* Header Area */}
        <div className="pt-3 pb-1.5 px-4 sm:pt-4 sm:pb-2.5 sm:px-5 md:pt-5 md:pb-3 md:px-6 flex items-center gap-3 sm:gap-4">
          {/* Green Circle Checkmark icon */}
          <div className="flex items-center justify-center w-7.5 h-7.5 rounded-full bg-[#1f883d] dark:bg-[#238636] text-white shrink-0 shadow-sm">
            <Check className="w-4.5 h-4.5 stroke-[3]" />
          </div>
          <div className="flex-grow">
            <h4 className="text-[11px] sm:text-[14px] lg:text-[15px] font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
              All checks have passed
            </h4>
            <p className="text-[8.5px] sm:text-[9.5px] lg:text-[9.5px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              3 successful checks
            </p>
          </div>
        </div>

        {/* Checks Checklist Area */}
        <div className="border-t border-neutral-100 dark:border-neutral-800 divide-y divide-neutral-100 dark:divide-neutral-800 bg-neutral-50/30 dark:bg-neutral-900">
          {renderCheckRow("CI / ArgoCD sync", "Successful in 4s")}
          {renderCheckRow("CI / k3s rollout", "Successful in 45s")}
          {renderCheckRow("CD / Update k8s overlays", "Successful in 12s")}
        </div>

        {/* Footer Area */}
        <div className="pt-3 pb-3.5 px-4 sm:pt-4 sm:pb-5 sm:px-5 md:pt-5 md:pb-6 md:px-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-row items-center justify-between gap-2.5 sm:gap-4 bg-white dark:bg-neutral-900">
          {/* Static Merge Button styled identically to GitHub */}
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-[8.5px] sm:text-[10.5px] lg:text-[10.5px] font-semibold bg-[#1f883d] text-white border border-[#1f883d] shadow-sm select-none shrink-0 cursor-pointer">
            <GitPullRequest className="w-3.5 h-3.5" />
            Merge pull request
          </div>

          <span className="text-[8px] sm:text-[10px] lg:text-[10px] text-neutral-500 dark:text-neutral-400 font-sans text-right leading-tight min-w-0 truncate sm:overflow-visible">
            <span className="inline sm:hidden">Open in </span>
            <span className="hidden sm:inline">You can also open this in </span>
            <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-neutral-700 dark:text-neutral-300 font-semibold text-[8px] sm:text-[9px]">GitHub CLI</code>
          </span>
        </div>

      </div>
    </div>
  );
}
