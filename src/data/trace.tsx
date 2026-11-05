import { withAssetHash } from "@/utils/helpers"
import type { CaseStudyData } from "@/types"

export const traceData: CaseStudyData = {
  seoTitle: "Trace | Digital Forensics & Incident Response",
  surfaceMode: "mono",
  hero: {
    title: "Trace",
    headline: (
      <>
        Recorded. <br className="sm:hidden" />Proven. Sealed.
      </>
    ),
    subhead:
      "Case management, evidence tracking, and tamper-proof records, all in one local-first forensic CLI.",
    heroAsset: {
      src: "/assets/trace/cli_hero.svg",
      alt: "Trace CLI forensic case management terminal interface",
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
      tag: "Case files, organized",
      title: "Every case in view.",
      titleClassName: "t-hero-headline",
      desc: "From intake to sealed, every case keeps its examiner, its evidence, and a full history of what was done and when.",
      layeredAsset: {
        bgSrc: "/assets/trace/tui_intro_bg.svg",
        fgSrc: "/assets/trace/intro_tui.svg",
        bgAlt: "Trace TUI environment background",
        fgAlt: "Trace TUI console showing cases, audit trail, and updates",
        fgMaxWidthClass: "sm:max-w-[840px] md:max-w-[880px]",
      },
    },
    {
      tag: "Tamper-evident by design",
      title: "Verify. Instantly.",
      titleClassName: "t-hero-headline",
      desc: "One command checks every signature, hash, and sequence. If anything was ever touched, Trace shows you exactly where.",
      layeredAsset: {
        bgSrc: "/assets/trace/audit_intro_bg.svg",
        fgSrc: "/assets/trace/audit_tui.svg",
        bgAlt: "Trace audit verification environment background",
        fgAlt: "Trace TUI audit verification console",
        fgMaxWidthClass: "sm:max-w-[840px] md:max-w-[880px]",
      },
    },
    {
      tag: "Evidence",
      title: "Log every drive.",
      titleClassName: "t-hero-headline",
      desc: "Every inspection and check becomes a permanent record, so you can show what you did to each drive, and when.",
      layeredAsset: {
        bgSrc: "/assets/trace/update_bg.svg",
        fgSrc: "/assets/trace/update_tui.svg",
        bgAlt: "Trace update environment background",
        fgAlt: "Trace TUI update console",
        fgMaxWidthClass: "sm:max-w-[840px] md:max-w-[880px]",
      },
    },
    {
      tag: "Not just for humans",
      title: (
        <>
          Built for{" "}
          <span className="dock-stack mx-1 sm:mx-1.5 -space-x-[0.28em] -translate-y-[0.06em]">
            <span className="dock-item inline-flex items-center justify-center h-[0.92em] w-[0.92em] rounded-full overflow-hidden ring-[0.06em] ring-canvas bg-black dark:bg-white shadow-sm shrink-0 cursor-pointer">
              <img
                src={withAssetHash("/assets/trace/codex-icon.svg")}
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
                src={withAssetHash("/assets/trace/claude-ai-icon.svg")}
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
                src={withAssetHash("/assets/trace/cursor_icon.png")}
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
          agents too.
        </>
      ),
      titleClassName: "t-hero-headline",
      desc: "Any agent that can run a command can use Trace, with the same proof a person would leave.",
      layeredAsset: {
        bgSrc: "/assets/trace/agents_bg.svg",
        fgSrc: "/assets/trace/agents_content.svg",
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
