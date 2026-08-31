import type {
  Article,
  Frame,
  HeroAction,
  ProductionCapability,
  Project,
  ProjectLink,
  Service,
} from "@/types"

export type { Article, Frame, HeroAction, ProductionCapability, Project, ProjectLink, Service }

export const productionCapabilities: ProductionCapability[] = [
  {
    title: "Quality",
    tagline: "Built to be read twice.",
    desc: "Typed, consistent, tested. Every PR is scanned before a human reviews it, so review time goes to design, not typos.",
  },
  {
    title: "Maintainability",
    tagline: "Written to outlive me.",
    desc: "Decisions get documented as they're made. If a repo can't explain itself six months later, that's a bug too.",
  },
  {
    title: "System Design",
    tagline: "Diagrams before diffs.",
    desc: "I map failure modes before I write the happy path. Cheaper to argue on a whiteboard than fix in production.",
  },
  {
    title: "Architecture",
    tagline: "Built to fail safely.",
    desc: "Components stay isolated, so one failure doesn't take down three. When something breaks, the cause is obvious fast.",
  },
  {
    title: "DevOps",
    tagline: "Automated, not improvised.",
    desc: "Infra sized to real usage, not guesswork. CI/CD gated on tests and scans, so passing actually means something.",
  },
  {
    title: "Security",
    tagline: "Threat-modeled, not bolted on.",
    desc: "Least privilege and deny-by-default from the start. Easier to plan for risk than explain a breach later.",
  },
  {
    title: "Observability",
    tagline: "Unmonitored is unproven.",
    desc: "Logs, metrics, and traces exist before launch, not after the first outage. Alerts only fire for what matters.",
  },
  {
    title: "Cost Awareness",
    tagline: "Efficient, not just cheap.",
    desc: "I weigh what infrastructure costs to run, not just to build. Waste is easier to catch in review than in the bill.",
  },
]

export const meta = {
  title: "Nirjar Goswami — Cloud & DevOps Engineer",
  description: "Building systems meant to be forgotten.",
}

export const hero = {
  headingPrimary: "Building systems",
  headingSecondary: "meant to be forgotten.",
  subheading:
    "Nirjar Goswami, a Cloud and DevOps engineer who helps teams build infrastructure that ships faster and doesn't page anyone at 2am.",
  actions: [
    { label: "View Resume", url: "/assets/nirjar_resume.pdf", type: "primary", isExternal: true },
    { label: "View Works", url: "/works", type: "secondary" },
  ] as HeroAction[],
}

export const frames: Frame[] = [
  {
    number: "01",
    tag: "DevOps",
    title: "Ship faster, break less.",
    desc: "CI/CD and infra built for repeatable deploys — not manual steps someone has to remember to run.",
    tagline: "Pipelines that don't page you at 2am.",
    achievements: [
      "Zero-touch GitOps pipelines that eliminate manual deploys — built for Bastion with GitHub Actions and ArgoCD reconciliation.",
      "Signed, scanned delivery pipelines that hold production latency under load — built for HookDrop, sub-35ms SSE at scale.",
      "Deployment tracking that ties every release back to its exact commit — built for DeployLens with real-time SHA correlation.",
    ],
    techStack: ["GitHub Actions", "Docker", "Kubernetes", "Helm", "ArgoCD", "AWS ECR", "Terraform"],
  },
  {
    number: "02",
    tag: "Cybersecurity",
    title: "Security in every layer.",
    desc: "Least privilege and secure defaults from day one, not patched in after something goes wrong.",
    tagline: "Deny by default, verify always.",
    achievements: [
      "Deny-first IAM with real-time login risk scoring — cut flagged security issues 87.4% when applied to Bastion.",
      "Admission-layer defense that blocks unsigned workloads before they run — built for HookDrop with Kyverno and NetworkPolicies.",
      "Local-only credential storage with no cloud trust dependency — built for VaultLock on Argon2id and AES-256-GCM.",
    ],
    techStack: ["RBAC", "MFA", "OAuth", "Argon2id", "AES-256-GCM", "Kyverno", "Falco"],
  },
  {
    number: "03",
    tag: "Monitoring",
    title: "Know before it breaks.",
    desc: "Metrics and alerts tuned for real signal, so incidents get caught by a dashboard, not by users.",
    tagline: "See the failure before your users do.",
    achievements: [
      "Full-stack tracing that turns failures into alerts instead of tickets — built for HookDrop with OpenTelemetry, Prometheus, and Grafana.",
      "Unified telemetry that connects an anomaly to its cause in one view — built for Bastion via Datadog APM.",
      "Usage-based cost alerting that flags waste before it hits the bill — built for Kost with automated Slack reporting.",
    ],
    techStack: ["OpenTelemetry", "Prometheus", "Grafana", "Loki", "Tempo", "Datadog"],
  },
  {
    number: "04",
    tag: "Code Security",
    title: "Catch it before it ships.",
    desc: "Static analysis, dependency, and container scans run inside CI, so bad code never reaches review.",
    tagline: "Catch it in the PR, not in prod.",
    achievements: [
      "CI-gated static and dependency analysis — dropped open issues from 872 to 479 in 30 days on Bastion, security score 6.5 to 8.5.",
      "Signature-verified image admission that blocks unverified containers — built for HookDrop with Cosign and Kyverno.",
    ],
    techStack: ["SonarCloud", "CodeQL", "Trivy", "Cosign", "Kyverno"],
  },
  {
    number: "05",
    tag: "Automation",
    title: "Less manual, more scale.",
    desc: "If a task repeats, it becomes a pipeline. Fewer manual steps means fewer places for mistakes to hide.",
    tagline: "Fewer runbooks, more running itself.",
    achievements: [
      "Infra-aware CI retries that stop false failures from blocking merges — shipped as BlamLess, live on GitHub Marketplace.",
      "Cost audits that output ready-to-run fixes, not just reports — built for Kost with scheduled kubectl remediation.",
      "Self-updating ML models with no manual retrain step — built for Bastion using Kubernetes CronJobs.",
    ],
    techStack: ["GitHub Actions", "Kubernetes CronJobs", "ArgoCD", "GitOps"],
  },
  {
    number: "06",
    tag: "Cloud Architecture",
    title: "Built for the workload, not the demo.",
    desc: "Infra sized for actual traffic and cost, not headroom that never gets used.",
    tagline: "Sized for real usage, built for scale.",
    achievements: [
      "Cost-efficient cloud architecture with multi-region failover and automated resource scaling.",
      "Immutable infrastructure provisioned using Terraform and Helm for zero-drift deployments.",
    ],
    techStack: ["Terraform", "AWS", "Kubernetes", "Helm", "Docker"],
  },
  {
    number: "07",
    tag: "Incident Readiness",
    title: "Fail loud, recover fast.",
    desc: "Rollbacks and runbooks get planned before an incident, not written during one.",
    tagline: "Prepared before the alert fires.",
    achievements: [
      "Automated rollbacks and disaster recovery pipelines for zero-downtime production recovery.",
      "Structured runbooks and incident triage workflows mapped straight to telemetry alerts.",
    ],
    techStack: ["Grafana", "Prometheus", "Datadog", "PagerDuty", "ArgoCD"],
  },
]

export const services: Service[] = [
  {
    title: "Security",
    highlight: "Built secure from the start.",
    desc: "I build systems with least privilege, defense in depth, secure authentication, and continuous security validation from day one.",
  },
  {
    title: "Cloud & Infrastructure",
    highlight: "Built to survive real workloads.",
    desc: "Cost-efficient, reliable, scalable, resilient, and automated cloud solutions from development to deployment.",
  },
  {
    title: "Automation First",
    highlight: "If it repeats, automate it.",
    desc: "CI/CD, Infrastructure as Code, testing, deployment, and operational workflows designed to reduce manual work and human error.",
  },
  {
    title: "Continuous Visibility",
    highlight: "You can't secure what you can't see.",
    desc: "Logs, metrics, traces, security events, and monitoring that turn infrastructure into observable, actionable systems.",
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
    title: "DeployLens",
    category: "Deployment Insights",
    year: "2026",
    description:
      "GitHub Actions and AWS CodeDeploy don't talk to each other. It ties both into a single timeline, so you can see exactly what a commit did on both sides.",
    link: "https://github.com/nirjxr26/DeployLens",
    tags: ["DevOps"],
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

export const articles: Article[] = [
  {
    title: "Why AI can't rewrite Windows ?",
    category: "Generative AI",
    date: "Jun 4, 2026",
    readTime: "4 min read",
    desc: "50M lines. 41 years and decades of decisions. ",
    link: "https://blog.nirjar.me/why-ai-can-t-just-rewrite-windows",
  },
  {
    title: "SonarQube analysis",
    category: "Observability",
    date: "May 25, 2026",
    readTime: "5 min read",
    desc: "872 hidden issues. One scan. 30 days to fix what I couldn't see before.",
    link: "https://blog.nirjar.me/sonarqube",
  },
  {
    title: "How Git changed the way I work",
    category: "Developer Tools",
    readTime: "3 min read",
    desc: "Not just a code host. A place that quietly reshaped how I build.",
    link: "https://blog.nirjar.me/how-github-changed-my-workflow",
  },
  {
    title: "VaultLock's logo fetching problem",
    category: "Security",
    date: "Apr 8, 2026",
    readTime: "2 min read",
    desc: "Getting the right brand logo, every time, without breaking the UI.",
    link: "https://blog.nirjar.me/vaultlock-logo-fetching",
  },
]

export const quote =
  "Every project I've built has solved a real problem I've encountered. Each feature exists for a reason and every decision is driven by a real need."

export const projectLinks: Record<string, ProjectLink> = {
  Bastion: { href: "/works/bastion" },
  HookDrop: { href: "/works/hookdrop" },
  Kost: { href: "/works/kost" },
  DeployLens: { href: "https://github.com/nirjxr26/DeployLens", isExternal: true },
  VaultLock: { href: "https://github.com/nirjxr26/VaultLock-Password-Manager", isExternal: true },
  BlameLess: { href: "https://github.com/nirjxr26/Blamless", isExternal: true },
  Blamless: { href: "https://github.com/nirjxr26/Blamless", isExternal: true },
}
