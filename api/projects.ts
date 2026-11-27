export const config = {
  runtime: "edge",
}

export type ProjectState = "active" | "maintained" | "archived"

export interface PortfolioProject {
  name: string
  category: string
  state: ProjectState
  summary: string
  repo: string
  case_study?: string
}

export interface ProjectsResponse {
  projects: PortfolioProject[]
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    name: "Trace",
    category: "Digital Forensics & Incident Response",
    state: "active",
    summary:
      "Local-first forensic CLI and console with tamper-evident, append-only SQLite audit trails.",
    repo: "https://github.com/nirjxr26/Trace",
    case_study: "/works/trace",
  },
  {
    name: "Bastion",
    category: "Identity & Access Management",
    state: "active",
    summary:
      "Self-hosted access control gateway with MFA, session control, policy enforcement, and audit logs.",
    repo: "https://github.com/nirjxr26/Bastion",
    case_study: "/works/bastion",
  },
  {
    name: "Kost",
    category: "Kubernetes Cost Intelligence",
    state: "active",
    summary:
      "Single-pod Kubernetes agent calculating workload resource waste and posting right-sizing commands to Slack.",
    repo: "https://github.com/nirjxr26/Kost",
    case_study: "/works/kost",
  },
  {
    name: "HookDrop",
    category: "Backend & Webhooks",
    state: "active",
    summary:
      "Go webhook receiver with HMAC signature verification, live event streaming, and GitOps automated delivery.",
    repo: "https://github.com/nirjxr26/HookDrop",
    case_study: "/works/hookdrop",
  },
  {
    name: "Parapet",
    category: "Security & Site Auditor",
    state: "active",
    summary:
      "Parapet is a Rust tool that checks your built static site for broken anchors, dead sitemap URLs and CSP hash mismatches, without needing a browser.",
    repo: "https://github.com/nirjxr26/parapet",
  },
  {
    name: "DeployLens",
    category: "CI/CD & Observability",
    state: "active",
    summary:
      "Deployment observability tool unifying GitHub Actions workflow runs and AWS CodeDeploy events in a single timeline.",
    repo: "https://github.com/nirjxr26/DeployLens",
  },
  {
    name: "Canopy",
    category: "Identity & Authentication",
    state: "active",
    summary:
      "Self-hosted alternative to Clerk with Argon2id password hashing, encrypted MFA, and session control with zero per-user pricing.",
    repo: "https://github.com/nirjxr26/canopy",
  },
  {
    name: "SmartFlow",
    category: "Workflow Automation",
    state: "active",
    summary:
      "Operations platform unifying task workflows, approval pipelines, and system resource insights into a streamlined dashboard.",
    repo: "https://github.com/nirjxr26/SmartFlow",
  },
  {
    name: "BlamLess",
    category: "GitHub Action",
    state: "active",
    summary:
      "GitHub Action detecting whether CI failures stem from repo code or GitHub platform outages, retrying automatically on platform faults.",
    repo: "https://github.com/nirjxr26/Blamless",
  },
  {
    name: "Code Humanizer",
    category: "Developer Tooling",
    state: "active",
    summary:
      "AI code explanation skill file explaining the rationale, failure modes, and mental models behind complex codebases.",
    repo: "https://github.com/nirjxr26/code-humanizer",
  },
  {
    name: "VaultLock",
    category: "Offline Password Manager",
    state: "maintained",
    summary:
      "Offline password manager with AES-256 local credential encryption and zero cloud dependencies.",
    repo: "https://github.com/nirjxr26/VaultLock-Password-Manager",
  },
]

export default function handler(): Response {
  return new Response(
    JSON.stringify(
      {
        projects: PORTFOLIO_PROJECTS,
      },
      null,
      2,
    ),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    },
  )
}
