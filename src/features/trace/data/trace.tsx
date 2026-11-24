import { withAssetHash } from "@/lib/helpers"
import type { CaseStudyData } from "@/types"

export const traceData: CaseStudyData = {
  seoTitle: "Trace | Digital Forensics & Incident Response CLI",
  surfaceMode: "mono",
  hero: {
    title: "Trace",
    headline: (
      <>
        Toolkit for the whole{" "}
        <br className="hidden sm:block" />
        forensic workflow.
      </>
    ),
    subhead:
      "Manage your cases, track every piece of evidence, and keep tamper-proof records, all local-first and all in your terminal.",
    heroLayeredAsset: {
      bgSrc: "/assets/features/trace/hero-bg.jpg",
      fgSrc: "/assets/features/trace/hero-tui-desktop.svg",
      bgAlt: "Mountain landscape behind the Trace interface",
      fgAlt: "Trace CLI forensic case management terminal interface",
      bgWidth: 1633,
      bgHeight: 1276,
      fgWidth: 1065,
      fgHeight: 640,
      frameClass: "p-10",
      mobilePaddingClass: "inset-0",
      mobileFrameClass: "absolute inset-0 flex w-full items-center justify-start pointer-events-none p-10 sm:relative sm:inset-auto sm:justify-center",
      mobileFgSrc: "/assets/features/trace/hero-tui-mobile.svg",
      mobileFgWidth: 900,
      mobileFgHeight: 618,
    },
    installCommands: [
      {
        label: "PowerShell",
        command: "irm https://raw.githubusercontent.com/nirjxr26/Trace/main/install.ps1 | iex",
      },
      {
        label: "Linux / macOS",
        command: "curl -fsSL https://raw.githubusercontent.com/nirjxr26/Trace/main/install.sh | sh",
      },
    ],
  },
  sections: [
    {
      title: "Each case, tracked to seal.",
      titleClassName: "t-hero-headline",
      desc: "Open, under review, or closed, every case shows exactly where it stands, with collision-free IDs and JSON export.",
      layeredAsset: {
        bgSrc: "/assets/features/trace/case-bg.png",
        fgSrc: "/assets/features/trace/case-tui.svg",
        bgAlt: "Trace TUI environment background",
        fgAlt: "Trace TUI console showing cases, audit trail, and updates",
        fgMaxWidthClass: "sm:max-w-[840px] md:max-w-[880px]",
      },
    },
    {
      title: "Each drive, logged and verified.",
      titleClassName: "t-hero-headline",
      desc: "Records outlive the hardware, every touch asks for consent first, and each write-protection check comes with evidence.",
      layeredAsset: {
        bgSrc: "/assets/features/trace/drive-bg.png",
        fgSrc: "/assets/features/trace/drive-tui.svg",
        bgAlt: "Trace update environment background",
        fgAlt: "Trace TUI update console",
        fgMaxWidthClass: "sm:max-w-[840px] md:max-w-[880px]",
      },
    },
    {
      title: "Each action, logged for good.",
      titleClassName: "t-hero-headline",
      desc: "Every action is logged automatically and chained to the last, so edits show. Exports can be encrypted.",
      layeredAsset: {
        bgSrc: "/assets/features/trace/audit-bg.png",
        fgSrc: "/assets/features/trace/audit-tui.svg",
        bgAlt: "Trace audit verification environment background",
        fgAlt: "Trace TUI audit verification console",
        fgMaxWidthClass: "sm:max-w-[840px] md:max-w-[880px]",
      },
    },
    {
      title: (
        <>
          Built for{" "}
          <span className="dock-stack inline-flex items-center mx-1 sm:mx-1.5 -space-x-[0.28em] -translate-y-[0.06em]">
            <span className="dock-item inline-flex items-center justify-center h-[0.92em] w-[0.92em] rounded-full overflow-hidden ring-[0.06em] ring-canvas bg-black dark:bg-white shadow-sm shrink-0 cursor-pointer">
              <img
                src={withAssetHash("/assets/features/trace/icon-codex.svg")}
                alt="Codex"
                width={512}
                height={512}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover select-none"
                draggable={false}
              />
            </span>
            <span className="dock-item inline-flex items-center justify-center h-[0.92em] w-[0.92em] rounded-full overflow-hidden ring-[0.06em] ring-canvas bg-[#D77655] shadow-sm shrink-0 cursor-pointer">
              <img
                src={withAssetHash("/assets/features/trace/icon-claude.svg")}
                alt="Claude"
                width={512}
                height={510}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover select-none"
                draggable={false}
              />
            </span>
            <span className="dock-item inline-flex items-center justify-center h-[0.92em] w-[0.92em] rounded-full overflow-hidden ring-[0.06em] ring-canvas bg-black shadow-sm shrink-0 cursor-pointer">
              <img
                src={withAssetHash("/assets/features/trace/icon-cursor.webp")}
                alt="Cursor"
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover select-none"
                draggable={false}
              />
            </span>
          </span>{" "}
          agents.
        </>
      ),
      titleClassName: "t-hero-headline",
      desc: "Available over MCP. Any agent that supports it can use Trace, with the same proof a person would leave.",
      layeredAsset: {
        bgSrc: "/assets/features/trace/agents-bg.png",
        fgSrc: "/assets/features/trace/agents-tui.svg",
        fgSwatches: [
          {
            label: "Claude",
            description:
              "A Claude Code session demonstrating forensic case creation, USB evidence intake, and audit chain verification through Trace MCP.",
            svg: "/assets/features/trace/agents-tui.svg",
          },
          {
            label: "OpenCode",
            description:
              "An OpenCode session demonstrating insider data exfiltration case creation and transition to review for scope approval through Trace MCP.",
            svg: "/assets/features/trace/tui-opencode.svg",
          },
          {
            label: "Codex",
            description:
              "A Codex session demonstrating forensic case handoff, linked device retrieval, and audit bundle export through Trace MCP.",
            svg: "/assets/features/trace/tui-codex.svg",
          },
        ],
        bgAlt: "Trace agent environment background",
        fgAlt: "Trace agent console and output preview",
        bgWidth: 788,
        bgHeight: 694,
        fgWidth: 667,
        fgHeight: 553,
        fgMaxWidthClass: "sm:max-w-[694px]",
      },
    },
  ],
  cta: {
    headline: "Try Trace today.",
    body: (
      <>
        The project&apos;s still in its{" "}
        <span className="underline underline-offset-4 decoration-muted/60">
          development phase
        </span>, but you can start your first case in under a minute.
      </>
    ),
    action: "View on GitHub",
    url: "https://github.com/nirjxr26/Trace",
    secondaryAction: {
      label: "View changelog",
      url: "https://github.com/nirjxr26/Trace/releases",
    },
    installCommands: [
      {
        label: "PowerShell",
        command: "irm https://raw.githubusercontent.com/nirjxr26/Trace/main/install.ps1 | iex",
      },
      {
        label: "Linux / macOS",
        command: "curl -fsSL https://raw.githubusercontent.com/nirjxr26/Trace/main/install.sh | sh",
      },
    ],
  },
  softwareSchema: {
    name: "Trace",
    description:
      "Case management, device acquisition, and tamper-proof records, all in one local-first CLI tool.",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Windows, macOS, Linux",
    programmingLanguage: "Python / Textual / PostgreSQL",
    url: "https://github.com/nirjxr26/Trace",
  },
}
