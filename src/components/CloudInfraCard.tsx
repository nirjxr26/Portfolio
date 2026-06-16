"use client";

import React from "react";
import { Code } from "lucide-react";

export default function CloudInfraCard() {
  // Complex, realistic EKS Cluster Terraform code block (exactly 10 lines) with perfect alignment
  const codeLines = [
    // Line 1
    (
      <>
        <span className="text-purple-600 dark:text-purple-400 font-semibold">resource</span>{" "}
        <span className="text-amber-800 dark:text-amber-200">"aws_instance"</span>{" "}
        <span className="text-blue-600 dark:text-blue-400">"app"</span> {"{"}
      </>
    ),
    // Line 2
    (
      <>
        {"  "}<span className="text-sky-700 dark:text-sky-400">ami</span>                    = <span className="text-emerald-600 dark:text-emerald-400">var.ami_id</span>
      </>
    ),
    // Line 3
    (
      <>
        {"  "}<span className="text-sky-700 dark:text-sky-400">instance_type</span>          = <span className="text-amber-800 dark:text-amber-200">"t3.micro"</span>
      </>
    ),
    // Line 4
    (
      <>
        {"  "}<span className="text-sky-700 dark:text-sky-400">subnet_id</span>              = <span className="text-emerald-600 dark:text-emerald-400">var.subnet_id</span>
      </>
    ),
    // Line 5
    (
      <>
        {"  "}<span className="text-sky-700 dark:text-sky-400">iam_instance_profile</span>   = <span className="text-emerald-600 dark:text-emerald-400">aws_iam_instance_profile.app.name</span>
      </>
    ),
    // Line 6
    (
      <span className="relative inline-block w-full">
        {"  "}<span className="text-sky-700 dark:text-sky-400">vpc_security_group_ids</span> = <span className="text-neutral-400">{"["}</span><span className="text-emerald-600 dark:text-emerald-400">aws_security_group.app.</span>
        <span className="inline-block w-[1.5px] h-3.5 bg-black dark:bg-white animate-pulse translate-y-0.5" />
        
        {/* Autocomplete Dropdown Popup - relative to this line */}
        <div className="absolute z-20 left-[175px] sm:left-[195px] top-[0.95rem] w-32 sm:w-36 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl overflow-hidden py-0.5 text-[9px] sm:text-[10px] font-sans">
          <div className="px-2.5 py-1.5 bg-blue-600 text-white font-semibold text-left select-none cursor-pointer">
            id
          </div>
          <div className="px-2.5 py-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-left select-none cursor-pointer">
            arn
          </div>
          <div className="px-2.5 py-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-left select-none cursor-pointer">
            name
          </div>
          <div className="px-2.5 py-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-left select-none cursor-pointer">
            tags
          </div>
        </div>
      </span>
    ),
    // Line 7
    "",
    // Line 8
    (
      <>
        {"  "}<span className="text-purple-600 dark:text-purple-400 font-semibold">root_block_device</span> {"{"}
      </>
    ),
    // Line 9
    (
      <>
        {"    "}<span className="text-sky-700 dark:text-sky-400">volume_size</span>           = <span className="text-blue-600 dark:text-blue-400">50</span>
      </>
    ),
    // Line 10
    (
      <>
        {"    "}<span className="text-sky-700 dark:text-sky-400">volume_type</span>           = <span className="text-amber-800 dark:text-amber-200">"gp3"</span>
      </>
    ),
    // Line 11
    (
      <>
        {"    "}<span className="text-sky-700 dark:text-sky-400">encrypted</span>             = <span className="text-blue-600 dark:text-blue-400">true</span>
      </>
    ),
    // Line 12
    (
      <>
        {"  "}{"}"}
      </>
    ),
    // Line 13
    (
      <>
        {"}"}
      </>
    )
  ];

  return (
    <div className="relative rounded-3xl pt-4 px-4 min-[375px]:pt-6 min-[375px]:px-6 md:pt-8 md:px-8 lg:pt-10 lg:px-10 pb-0 overflow-hidden bg-gradient-to-tr from-[#0F172A] via-[#1E40AF] to-[#0284C7] shadow-2xl flex items-end justify-center w-full max-w-2xl">
      {/* Decorative Grid Mesh overlay inside the gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),rgba(255,255,255,0))]" />
      
      {/* Outer Card Container */}
      <div className="w-full z-10 bg-white dark:bg-neutral-900 border-t border-x border-neutral-200/80 dark:border-neutral-800 rounded-t-2xl rounded-b-none shadow-xl overflow-hidden text-left flex flex-col">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800/80 h-9 px-4 bg-neutral-50 dark:bg-neutral-900/50 select-none">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
          </div>
        </div>

        {/* Code Editor Area with Line Numbers & Autocomplete */}
        <div className="relative pt-4 px-3 sm:px-4 pb-0 font-mono text-[8px] min-[375px]:text-[9px] sm:text-[10px] lg:text-[10px] leading-normal text-left bg-white dark:bg-neutral-950/70 select-none overflow-x-auto no-scrollbar">
          {/* HCL Syntax Highlighted Code */}
          <div className="flex flex-col min-w-max sm:min-w-0">
            {codeLines.map((line, idx) => (
              <div key={idx} className="flex items-start min-h-[1.15rem] whitespace-pre w-full">
                {/* Line Number */}
                <div className="w-8 text-neutral-300 dark:text-neutral-700 select-none text-right pr-3 shrink-0">
                  {idx + 1}
                </div>
                {/* Code Line */}
                <div className="flex-grow">
                  {line}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
