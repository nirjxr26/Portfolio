import type {
  Article,
  Frame,
  HeroAction,
  ProductionCapability,
  Project,
} from "@/types"
import type { BlogArticle } from "./blogArticles"
import { BLOG_ARTICLES } from "./blogArticles"
import { byNewestFirst } from "@/utils/helpers"

export type { Article, Frame, HeroAction, ProductionCapability, Project }

export const productionCapabilities: ProductionCapability[] = [
  {
    title: "Systems Fluency",
    tagline: "Where pieces connect.",
    desc: "I've built across the frontend, backend, infra, and pipeline layers — enough to see how a change in one breaks another.",
  },
  {
    title: "System Design",
    tagline: "Whiteboard before code.",
    desc: "Failure points get mapped on paper first. Cheaper to redesign a diagram than rewrite production code.",
  },
  {
    title: "Cost Awareness",
    tagline: "Efficient, not cheap.",
    desc: "I size systems to what they actually need to handle, not what looks impressive on a spec sheet.",
  },
  {
    title: "Code Quality",
    tagline: "Checked before it's seen.",
    desc: "Style, types, and tests are enforced automatically — so review time goes to design decisions, not typos.",
  },
  {
    title: "Fault Isolation",
    tagline: "Small blast radius.",
    desc: "Components are scoped so one failure doesn't cascade — and the cause is obvious immediately.",
  },
]

export const meta = {
  title: "Nirjar Goswami — Cloud & Security Engineer",
  description: "Building systems meant to be forgotten.",
}

export const hero = {
  headingPrimary: "Building systems",
  headingSecondary: "meant to be forgotten.",
  subheading:
    "Nirjar Goswami — everyone's specializing, but I went wide instead, learning how most of the pieces connect rather than mastering just one.",
  actions: [
    { label: "View Resume", url: "/assets/nirjar_resume.pdf", type: "primary", isExternal: true },
    { label: "View Works", url: "/works", type: "secondary" },
  ] as HeroAction[],
}

export const frames: Frame[] = [
  {
    number: "01",
    tag: "CI/CD Pipelines",
    title: "Ship faster, break less.",
    desc: "Every change gets built, tested, and deployed automatically — no step depends on someone remembering it.",
  },
  {
    number: "02",
    tag: "Vulnerability Patching",
    title: "Fixed, not filed.",
    desc: "Vulnerabilities get triaged by real severity and closed inside SLA — before they're exploited, not after.",
  },
  {
    number: "03",
    tag: "Secure by default.",
    title: "Nothing left open.",
    desc: "Access is scoped tight and secrets stay encrypted from the first commit — security isn't a later step.",
  },
  {
    number: "04",
    tag: "Monitoring & Alerting",
    title: "Know before it breaks.",
    desc: "Systems are instrumented so problems surface on a dashboard, not from a user complaint.",
  },
  {
    number: "05",
    tag: "Incident Response & Recovery",
    title: "Fail loud, recover fast.",
    desc: "Rollback paths and runbooks exist before something breaks — not improvised while it's on fire.",
  },
]

export const projects: Project[] = [
  {
    title: "Bastion",
    category: "Identity & Access Management",
    year: "2025 - 2026",
    description:
      "It gives teams enterprise-grade access control without handing user data to a third party — auth, policy enforcement, MFA, session control, and audit logging in a single self-hosted stack.",
    link: "https://github.com/nirjxr26/Bastion",
    projectLink: "/works/bastion",
    tags: ["Security"],
  },
  {
    title: "Kost",
    category: "Kubernetes Cost Intelligence",
    year: "2026",
    description:
      "Finds over-provisioned workloads and hands you the fix command. Waste detection, right-sizing, and Slack alerts, all from one pod. No dashboard to check, no database, no bill.",
    link: "https://github.com/nirjxr26/Kost",
    projectLink: "/works/kost",
    tags: ["DevOps"],
  },
  {
    title: "HookDrop",
    category: "Webhook Receiver",
    year: "2025",
    description:
      "HookDrop is a mock webhook receiver in Go — POST to a bucket URL, it catches, stores, and streams it live. The real work is the pipeline around it: ECR, hardening, GitOps.",
    link: "https://github.com/nirjxr26/HookDrop",
    projectLink: "/works/hookdrop",
    tags: ["DevOps"],
  },
  {
    title: "Trace",
    category: "Digital Forensics & Incident Response",
    year: "Coming Up",
    description:
      "A standalone Hardware device that safely images digital evidence and verifies it with cryptographic hashing for chain of custody.",
    tags: ["DevOps", "Cloud"],
  },
  {
    title: "DeployLens",
    category: "Deployment Insights",
    year: "2026",
    description:
      "GitHub Actions and AWS CodeDeploy don't talk to each other. It ties both into a single timeline, so you can see exactly what a commit did on both sides.",
    link: "https://github.com/nirjxr26/DeployLens",
    tags: ["DevOps"],
  },
  {
    title: "Canopy",
    category: "Identity & Authentication",
    year: "2026",
    description:
      "A self-hosted alternative to Clerk — Argon2id password hashing, encrypted MFA, and session control your users never have to think about, with zero per-user pricing.",
    link: "https://github.com/nirjxr26/canopy",
    tags: ["Security"],
  },
  {
    title: "SmartFlow",
    category: "Workflow Automation",
    year: "2025 - 2026",
    description:
      "A platform that unifies task workflows, approval pipelines, and system resource insights into a streamlined operations dashboard.",
    link: "https://github.com/nirjxr26/SmartFlow",
    tags: ["Automation"],
  },
  {
    title: "BlamLess",
    category: "GitHub Action",
    year: "2026",
    description:
      "GitHub Actions fails. Sometimes it's your code. Sometimes it's GitHub. Blameless figures out which — and retries automatically if it's GitHub's fault.",
    link: "https://github.com/nirjxr26/Blamless",
    tags: ["DevOps"],
  },
  {
    title: "Code Humanizer",
    category: "Skill File",
    year: "2026",
    description:
      "Most AI code explanations restate what you can already read. This one tells you why it exists, what breaks it, and what the person who wrote it was thinking with modes.",
    link: "https://github.com/nirjxr26/code-humanizer",
    tags: ["Developer Tools"],
  },
  {
    title: "VaultLock",
    category: "Offline Password Manager",
    year: "2024",
    description:
      "VaultLock is an offline password manager. Credentials stay on your machine — AES-256 encrypted, no cloud sync, no external servers. The desktop UI works without a connection.",
    link: "https://github.com/nirjxr26/VaultLock-Password-Manager",
    tags: ["Security"],
  },
]

export function toCardArticle(a: BlogArticle): Article {
  return {
    title: a.title,
    category: a.category,
    date: a.cardDate,
    readTime: a.cardReadTime,
    desc: a.cardDesc,
    link: `/articles/${a.slug}`,
    hideFromHome: a.hideFromHome,
  }
}

export const articles: Article[] = BLOG_ARTICLES.map(toCardArticle).sort(byNewestFirst)

export const quote =
  "Every project I've built has solved a real problem I've encountered. Each feature exists for a reason and every decision is driven by a real need."
