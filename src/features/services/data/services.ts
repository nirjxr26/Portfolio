export interface ServiceSection {
  id: string
  title: string
  tagline: string
  items: readonly string[]
  tools?: readonly string[]
  proof?: { name: string; href: string }
}

export const CORE_SERVICES: readonly ServiceSection[] = [
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Find it before they do.",
    items: [
      "Reconnaissance and attack-surface mapping",
      "Vulnerability assessment and penetration testing (VAPT)",
      "Identifying, prioritising, and verifying security issues",
      "Server, database, and configuration hardening",
      "Authentication, access control, and session security",
      "Incident response planning and investigation",
    ],
    tools: [
      "WireGuard",
      "Linux Hardening",
      "SonarQube",
      "Trivy",
      "Nmap",
      "Argon2id",
      "Tamper-Proof Audits",
    ],
    proof: { name: "Bastion", href: "/works/bastion" },
  },
  {
    id: "devops",
    title: "DevOps",
    tagline: "Automate the boring.",
    items: [
      "CI/CD pipelines written in YAML, such as GitHub Actions",
      "Containerizing applications and deploying them",
      "Running workloads on Kubernetes",
      "Automating build, test, and deployment workflows",
      "Monitoring applications and infrastructure",
      "Managing releases, rollbacks, and operational runbooks",
    ],
    tools: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Helm",
      "Prometheus",
      "Grafana",
      "Trivy",
      "Cosign",
      "Kyverno",
      "Datadog",
      "Falco",
    ],
    proof: { name: "Kost", href: "/works/kost" },
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture & Security",
    tagline: "Cost-aware from day one.",
    items: [
      "Provisioning and managing AWS infrastructure with Terraform",
      "Working with compute, storage, networking, and container infrastructure",
      "Configuring identity and access management with least privilege",
      "Managing secrets and encryption",
      "Defining firewall rules and network access controls",
      "Reviewing resource usage and infrastructure costs",
      "Planning for availability, monitoring, and recovery",
    ],
    tools: [
      "AWS (EC2, VPC, IAM, S3, ECR)",
      "Cloudflare",
      "Linux",
      "Security Groups",
      "Cost Optimization",
      "OpenTelemetry",
    ],
    proof: { name: "HookDrop", href: "/works/hookdrop" },
  },
]

export const WORKING_KNOWLEDGE_SERVICES: readonly ServiceSection[] = [
  {
    id: "system-design",
    title: "System Design",
    tagline: "Diagram, then code.",
    items: [
      "Translating requirements into architecture diagrams",
      "Evaluating databases, APIs, and infrastructure choices",
      "Identifying dependencies and potential failure points",
      "Considering scalability and resource requirements",
      "Balancing performance, reliability, and cost",
    ],
  },
  {
    id: "backend-api",
    title: "Backend Development",
    tagline: "Reliable behind the scenes.",
    items: [
      "Building APIs and backend services with Go",
      "Working with webhooks and event-driven workflows",
      "Designing and querying PostgreSQL databases",
      "Handling application errors and structured logging",
      "Working with authentication and data access patterns",
    ],
  },
  {
    id: "code-quality",
    title: "Code Quality",
    tagline: "Built to be maintained.",
    items: [
      "Static analysis and code quality checks with SonarQube and CodeRabbit",
      "Identifying technical debt and maintainability issues",
      "Integrating linting, type checks, and tests into CI",
      "Managing Git workflows, pull requests, and code reviews",
      "Writing unit, integration, and end-to-end tests",
    ],
  },
]

export interface HowIWorkCard {
  tag: string
  title: string
  desc: string
}

export const HOW_I_WORK_CARDS: readonly HowIWorkCard[] = [
  {
    tag: "Automate the Repeatable",
    title: "Ship faster, break less.",
    desc: "Anything done twice gets automated, so no step depends on someone remembering it.",
  },
  {
    tag: "Fix, Don’t File",
    title: "Fixed, not filed.",
    desc: "Issues are ranked by real impact and closed, not left sitting in a backlog.",
  },
  {
    tag: "Security from the Start",
    title: "Nothing left open.",
    desc: "It’s part of the first design conversation, not a review at the end.",
  },
  {
    tag: "Signals Early",
    title: "Know before it breaks.",
    desc: "Systems report their own problems, so I hear about them from a dashboard, not a user.",
  },
  {
    tag: "Recovery Planned",
    title: "Fail loud, recover fast.",
    desc: "Rollback steps are written while things are calm, not improvised mid-incident.",
  },
]
