export interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  link: string;
  projectLink?: string;
  tags: string[];
}

export const PROJECT_CATEGORIES = [
  "All",
  "Security",
  "DevOps",
  "Automation",
  "Developer Tools",
] as const;

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
    category: "Webhook Receiver & Streamer",
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
];
