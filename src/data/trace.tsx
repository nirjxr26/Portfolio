import type { CaseStudyData } from "@/types"

export const traceData: CaseStudyData = {
  seoTitle: "Trace | Digital Forensics & Incident Response",
  hero: {
    title: "Trace",
    headline: (
      <>
        Recorded. <br className="sm:hidden" />Proven. Sealed.
      </>
    ),
    subhead:
      "Case management, tamper-proof records, and safe updates — all in one local-first CLI tool.",
    heroAsset: {
      src: "/assets/trace/cli_hero.svg",
      alt: "Trace CLI forensic case management terminal interface",
    },
  },
  sections: [
    {
      title: "The chain of custody.",
      wideCards: true,
      centeredCards: true,
      cards: [
        {
          tag: "Cases",
          headline: "Every case, organized from start to close. Easy to find, safe to store.",
        },
        {
          tag: "Audit trail",
          headline: "Hash-chained and signed instantly. Tampering breaks the chain.",
        },
        {
          tag: "Updates",
          headline: "Verified, staged, and health-checked before going live. Failures roll back.",
        },
      ],
    },
    {
      tag: "Beyond Terminal",
      title: (
        <>
          One console. <br /> Everything in view.
        </>
      ),
      titleClassName: "t-hero-headline",
      desc: "Cases, audit trail and updates, now in one dark full-screen console. Built for long sessions. No new syntax, no mouse.",
      centeredHeader: true,
      layeredAsset: {
        bgSrc: "/assets/trace/tui_intro_bg.svg",
        fgSrc: "/assets/trace/intro_tui.svg",
        bgAlt: "Trace TUI environment background",
        fgAlt: "Trace TUI console showing cases, audit trail, and updates",
      },
    },
    {
      title: "Cases.",
      cards: [
        {
          headline: "Never lose track.",
          body: "Open, under review, or closed — every case shows exactly where it stands.",
        },
        {
          headline: "No collisions, ever.",
          body: "IDs are generated safely, even with multiple investigators working at once.",
        },
        {
          headline: "Closing isn't deleting.",
          body: "Filing a case away never changes whether it's open or closed.",
        },
        {
          headline: "Suggests as you type.",
          body: "Commands and flags autocomplete as you go — no docs, no memorizing syntax.",
        },
        {
          headline: "Also speaks JSON.",
          body: "Every case and dossier can be output as JSON — ready for scripts and automation.",
        },
      ],
    },
    {
      tag: "Tamper-evident by design",
      title: "Verify. Instantly.",
      titleClassName: "t-hero-headline",
      desc: "One command checks every signature, hash, and sequence. If anything was ever touched, Trace shows you exactly where.",
      centeredHeader: true,
      layeredAsset: {
        bgSrc: "/assets/trace/audit_intro_bg.svg",
        fgSrc: "/assets/trace/audit_tui.svg",
        bgAlt: "Trace audit verification environment background",
        fgAlt: "Trace TUI audit verification console",
      },
    },
    {
      title: "Audit trail.",
      cards: [
        {
          headline: "Recorded, automatically.",
          body: "Every case action is logged the instant it happens — no way to skip it.",
        },
        {
          headline: "Broken chains don't hide.",
          body: "Each record links to the last. Edit one, and the break shows immediately.",
        },
        {
          headline: "Sealed for transport.",
          body: "Exports can be encrypted, so evidence stays private once it leaves the system.",
        },
      ],
    },
    {
      tag: "Safe updates",
      title: (
        <>
          Never interrupts. <br /> Never breaks things.
        </>
      ),
      titleClassName: "t-hero-headline",
      desc: "Trace installs only when you're idle, verifies every release before it runs, and rolls back automatically if anything fails.",
      centeredHeader: true,
      layeredAsset: {
        bgSrc: "/assets/trace/update_bg.svg",
        fgSrc: "/assets/trace/update_tui.svg",
        bgAlt: "Trace update environment background",
        fgAlt: "Trace TUI update console",
      },
    },
    {
      title: "Updates.",
      cards: [
        {
          headline: "Waits for the right moment.",
          body: "Active work in progress? Trace holds off installing anything new.",
        },
        {
          headline: "Verified before install.",
          body: "Every release is checked for authenticity before it ever runs.",
        },
        {
          headline: "Never stuck broken.",
          body: "A failed update rolls back automatically, restoring things exactly as they were.",
        },
      ],
    },
    {
      tag: "Not just for humans",
      title: "Built for agents too.",
      titleClassName: "t-hero-headline",
      desc: "Not just for people. Every action returns clean output — so an agent gets the same proof a human would.",
      centeredHeader: true,
      layeredAsset: {
        bgSrc: "/assets/trace/agents_bg.svg",
        fgSrc: "/assets/trace/agents_content.svg",
        bgAlt: "Trace agent environment background",
        fgAlt: "Trace agent console and output preview",
        bgWidth: 788,
        bgHeight: 694,
        fgWidth: 667,
        fgHeight: 541,
        fgWidthClass: "w-[88%]",
        maxWidthClass: "max-w-2xl lg:max-w-3xl xl:max-w-[788px]",
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
      "Case management, tamper-proof records, and safe updates — all in one local-first CLI tool.",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Windows, macOS, Linux",
    programmingLanguage: "Python / Textual / PostgreSQL",
    url: "https://github.com/nirjxr26/Trace",
  },
}
