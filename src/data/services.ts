export interface StackToolItem {
  name: string
  src?: string
  iconKey?: string
  invertInDark?: boolean
}

export interface ServiceSection {
  id: string
  title: string
  tagline: string
  items: readonly string[]
  tools?: readonly string[]
  stackTools?: readonly StackToolItem[]
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
    stackTools: [
      { name: "Nmap", src: "/assets/stack/cybersecurity/nmap-logo-64px.svg" },
      { name: "Burp Suite", src: "/assets/stack/cybersecurity/burpsuit.svg" },
      { name: "Wireshark", src: "/assets/stack/cybersecurity/wireshark-logo.svg" },
      { name: "Metasploit", src: "/assets/stack/cybersecurity/metasploit.svg" },
      { name: "sqlmap", src: "/assets/stack/cybersecurity/sqlmap-logo.svg" },
      { name: "BloodHound", src: "/assets/stack/cybersecurity/bloodhound-logo.svg" },
      { name: "Hydra", src: "/assets/stack/cybersecurity/hydra-logo.svg" },
      { name: "OpenVAS", src: "/assets/stack/cybersecurity/openvas.svg" },
      { name: "Ghidra", src: "/assets/stack/cybersecurity/ghidra-logo.svg" },
      { name: "John the Ripper", src: "/assets/stack/cybersecurity/john-logo.svg" },
      { name: "Nikto", src: "/assets/stack/cybersecurity/nikto-logo.svg" },
      { name: "Autopsy", src: "/assets/stack/cybersecurity/autopsy-logo.svg" },
    ],
    proof: { name: "Bastion", href: "/works/bastion" },
  },
  {
    id: "devops",
    title: "DevOps",
    tagline: "Automate the boring parts.",
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
    stackTools: [
      { name: "Docker", src: "/assets/stack/devops/docker-svgrepo-com (1).svg" },
      { name: "Kubernetes", src: "/assets/stack/devops/kubernetes-svgrepo-com (1).svg" },
      { name: "Terraform", src: "/assets/stack/devops/terraform-icon-svgrepo-com.svg" },
      { name: "Helm", src: "/assets/stack/devops/helm-svgrepo-com.svg" },
      { name: "Prometheus", src: "/assets/stack/devops/prometheus.svg" },
      { name: "Grafana", src: "/assets/stack/devops/grafana.svg" },
      { name: "Trivy", src: "/assets/stack/devops/trivy.svg" },
      { name: "Cosign", src: "/assets/stack/devops/cosign.svg" },
      { name: "Kyverno", src: "/assets/stack/devops/kyverno.svg" },
      { name: "Datadog", src: "/assets/stack/devops/datadog.svg" },
      { name: "Falco", src: "/assets/stack/devops/falco.svg" },
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
    stackTools: [
      { name: "AWS", iconKey: "aws" },
      { name: "Cloudflare", iconKey: "cloudflare" },
      { name: "Linux", iconKey: "linux" },
      { name: "OpenTelemetry", iconKey: "opentelemetry" },
      { name: "WireGuard", iconKey: "wireguard" },
      { name: "PostgreSQL", iconKey: "postgresql" },
    ],
    proof: { name: "HookDrop", href: "/works/hookdrop" },
  },
]

export const WORKING_KNOWLEDGE_SERVICES: readonly ServiceSection[] = [
  {
    id: "system-design",
    title: "System Design",
    tagline: "Draw it before you build it.",
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
    tag: "CI/CD Pipelines",
    title: "Ship faster, break less.",
    desc: "Every change gets built, tested, and deployed automatically — no step depends on someone remembering it.",
  },
  {
    tag: "Vulnerability Patching",
    title: "Fixed, not filed.",
    desc: "Vulnerabilities get triaged by real severity and closed inside SLA — before they're exploited, not after.",
  },
  {
    tag: "Secure by default.",
    title: "Nothing left open.",
    desc: "Access is scoped tight and secrets stay encrypted from the first commit — security isn't a later step.",
  },
  {
    tag: "Monitoring & Alerting",
    title: "Know before it breaks.",
    desc: "Systems are instrumented so problems surface on a dashboard, not from a user complaint.",
  },
  {
    tag: "Incident Response & Recovery",
    title: "Fail loud, recover fast.",
    desc: "Rollback paths and runbooks exist before something breaks — not improvised while it's on fire.",
  },
]
