// The update section's content is commented out for now. Its imports are
// commented with it — an unused import fails `tsc --noEmit`. Uncomment both
// blocks to bring it back.
// import { TraceUpdateAnimation } from "@/components/common/TraceUpdateAnimation"
// import { CardBody, CardHeadline } from "@/components/common/cards/atoms"
// import { withAssetHash } from "@/utils/helpers"
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
          tag: "Evidence",
          headline: "Every drive logged, every check kept. Nothing lost between cases.",
        },
        {
          tag: "Audit trail",
          headline: "Hash-chained and signed instantly. Tampering breaks the chain.",
        }
      ],
    },
    {
      tag: "Beyond Terminal",
      title: (
        <>
          One console. <br /> Every case in view.
        </>
      ),
      titleClassName: "t-hero-headline",
      desc: "Browse, search, and open every case in one dark full-screen console. Built for long sessions. No new syntax, no mouse.",
      centeredHeader: true,
      layeredAsset: {
        bgSrc: "/assets/trace/tui_intro_bg.svg",
        fgSrc: "/assets/trace/intro_tui.svg",
        bgAlt: "Trace TUI environment background",
        fgAlt: "Trace TUI console showing cases, audit trail, and updates",
      },
    },
    {
      title: "Know where every case stands.",
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
      tag: "Evidence",
      title: (
        <>
          Log every drive.
        </>
      ),
      titleClassName: "t-hero-headline",
      desc: "Every inspection and check becomes a permanent record, so you can show what you did to each drive, and when.",
      centeredHeader: true,
      layeredAsset: {
        bgSrc: "/assets/trace/update_bg.svg",
        fgSrc: "/assets/trace/update_tui.svg",
        bgAlt: "Trace update environment background",
        fgAlt: "Trace TUI update console",
      },
    },
    {
      title: "Every drive, from bag to case.",
      cards: [
        {
          headline: "Identity outlives hardware.",
          body: "Unplug a disk and its record stays. Model and size come from the newest observation.",
        },
        {
          headline: "Consent before contact.",
          body: "Anything touching a physical drive asks first, naming the exact node.",
        },
        {
          headline: "Tag first, inspect later.",
          body: "File a bagged drive under a case without imaging it first.",
        },
        {
          headline: "Hostile input, sanitized.",
          body: "Serials and firmware strings are cleaned and clamped, so they can't break the layout.",
        },
        {
          headline: "Write protection, proven.",
          body: "Each check shows the verdict, cause, platform, and a per-check evidence table.",
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
      title: "Nothing happens off the record.",
      cards: [
        {
          headline: "Recorded, automatically.",
          body: "Every case action is logged the instant it happens. No way to skip it.",
        },
        {
          headline: "Broken chains don't hide.",
          body: "Each record links to the last. Edit one, and the break shows immediately.",
        },
        {
          headline: "Sealed for transport.",
          body: "Exports can be encrypted, so evidence stays private when it leaves the workstation.",
        },
      ],
    },
    {
      tag: "Not just for humans",
      title: "Built for agents too.",
      titleClassName: "t-hero-headline",
      desc: "Any agent that can run a command can use Trace, with the same proof a person would leave.",
      centeredHeader: true,
      layeredAsset: {
        bgSrc: "/assets/trace/agents_bg.svg",
        fgSrc: "/assets/trace/agents_content.svg",
        bgAlt: "Trace agent environment background",
        fgAlt: "Trace agent console and output preview",
        bgWidth: 788,
        bgHeight: 694,
        fgWidth: 667,
        fgHeight: 553,
        fgWidthClass: "w-[88%]",
        maxWidthClass: "max-w-2xl lg:max-w-3xl xl:max-w-[788px]",
      },
    },
    // The "Update in one command." section is retired for now. Every line of
    // the block is commented, not just the body — `title` is required on a
    // section, so commenting the heading alone would leave an invalid object.
    // Uncomment the whole block (and the imports at the top) to bring it back.
    // {
    //   tag: "Safe updates",
    //   title: "Update in one command.",
    //   titleClassName: "t-hero-headline",
    //   centeredHeader: true,
      // media: (
      //   <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
      //     <TraceUpdateAnimation />
      //
      //     <ul className="space-y-8">
      //       <li>
      //         <CardHeadline className="sm:text-xl">Waits for the right moment.</CardHeadline>
      //         <CardBody>
      //           If you&apos;re in the middle of something, Trace won&apos;t install anything. It
      //           waits until you&apos;re done.
      //         </CardBody>
      //       </li>
      //       <li>
      //         <CardHeadline className="sm:text-xl">Checked before it runs.</CardHeadline>
      //         <CardBody>
      //           Every release is verified as genuine before it&apos;s installed, so you only run
      //           what&apos;s really from the source.
      //         </CardBody>
      //       </li>
      //       <li>
      //         <CardHeadline className="sm:text-xl">A bad update can&apos;t break you.</CardHeadline>
      //         <CardBody>
      //           If an update fails, Trace puts everything back exactly as it was.
      //         </CardBody>
      //       </li>
      //     </ul>
      //   </div>
      // ),
      // media: (
      //   <div className="relative mx-auto w-full max-w-[680px] overflow-hidden rounded-[20px] squircle bg-[#0c0c0e]">
      //     <img
      //       src={withAssetHash("/assets/trace/agents_bg.svg")}
      //       alt=""
      //       aria-hidden="true"
      //       width={788}
      //       height={694}
      //       loading="lazy"
      //       decoding="async"
      //       draggable={false}
      //       className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none"
      //     />
      //
      //     <div className="relative flex items-center justify-center p-5 sm:p-7">
      //       <video
      //         aria-hidden="true"
      //         className="block h-auto w-full max-w-[560px] rounded-[16px] bg-[#0c0c0e]"
      //         src={withAssetHash("/assets/trace/update_module.mp4")}
      //         width={1920}
      //         height={1080}
      //         autoPlay
      //         loop
      //         muted
      //         playsInline
      //         preload="metadata"
      //       />
      //     </div>
      //   </div>
      // ),
    // },
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
