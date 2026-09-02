import type { CaseStudyData } from "@/types"

export const bastionData: CaseStudyData = {
  hero: {
    title: "Bastion",
    headline: "Access control. Fully yours.",
    subhead: "Auth, MFA, sessions, and audit logs — self-hosted, with zero third-party access to your data.",
  },
  sections: [
    {
      title: "What Bastion does.",
      cards: [
        {
          headline: "Sign in, secured.",
          body: "JWT tokens with secure cookies. Google and GitHub OAuth, enforced org-wide.",
        },
        {
          headline: "Deny wins.",
          body: "Role-based access across every user, role, and policy. No exceptions.",
        },
        {
          headline: "Prove it again.",
          body: "TOTP and backup codes, with step-up verification on sensitive actions.",
        },
        {
          headline: "Nothing goes unseen.",
          body: "Filterable, exportable audit logs with real-time alerts — fully self-hosted.",
        },
        {
          headline: "Test it before it's true.",
          body: "Run policy changes against real scenarios before they ever ship.",
        },
        {
          headline: "See exactly what's allowed.",
          body: "A per-user view of every permission — direct, inherited, and policy-attached.",
        },
        {
          headline: "Keys that know their place.",
          body: "Scoped to exact actions, with reauth and instant revocation.",
        },
      ],
    },
    {
      title: "How every change ships.",
      cards: [
        {
          headline: "Nothing ships untested.",
          body: "Tests and scans gate every commit — only verified code gets signed.",
        },
        {
          headline: "Merge is deploy.",
          body: "Merging to main updates overlays via bot PR. ArgoCD syncs the cluster.",
        },
        {
          headline: "Order, enforced.",
          body: "DB checks, migrations, then services — in that exact order, every time.",
        },
        {
          headline: "Shipped, then proven.",
          body: "Post-deploy smoke tests verify real traffic — not just a running pod.",
        },
      ],
    },
    {
      title: "The Risk engine.",
      cards: [
        {
          headline: "Scored before it matters.",
          body: "Impute, scale, encode, score — async, before the backend ever sees the request.",
        },
        {
          headline: "Above 0.7, prove it again.",
          body: "One score, one threshold. Cross it, and step-up auth kicks in automatically.",
        },
        {
          headline: "Retrains itself, every night.",
          body: "A CronJob retrains on fresh logs and hot-swaps the model — zero downtime.",
        },
        {
          headline: "Nothing drifts unnoticed.",
          body: "MLflow tracks every run. Grafana watches score drift, model version, and latency live.",
        },
      ],
    },
    {
      title: "Secure by default.",
      cards: [
        {
          headline: "No surprises inside.",
          body: "Read-only app code and pinned dependencies — nothing upstream changes without notice.",
        },
        {
          headline: "Contained, by design.",
          body: "Non-root containers with dropped capabilities. Falco watches every syscall live.",
        },
        {
          headline: "Checked before it ships.",
          body: "SonarCloud, CodeQL, and Trivy scan every PR and image before it goes anywhere.",
        },
        {
          headline: "Never in plain sight.",
          body: "Credentials stay encrypted in Git via SealedSecrets, always.",
        },
        {
          headline: "Watching the perimeter.",
          body: "CrowdSec blocks malicious IPs. Falco alerts stream straight to Datadog.",
        },
      ],
    },
    {
      title: "Zero trust, by design.",
      cards: [
        {
          headline: "One rule. No exceptions.",
          body: "Deny-first applies to users and services alike.",
        },
        {
          headline: "Only what's needed.",
          body: "Workloads get scoped to exactly what their job requires — nothing assumed.",
        },
        {
          headline: "Verified, continuously.",
          body: "Sessions are re-verified across every device, for as long as they're active.",
        },
      ],
    },
  ],
  cta: {
    headline: "Try Bastion now.",
    body: "The project's open and ready for contributors — dig into the code or open an issue anytime.",
    action: "View on GitHub",
    url: "https://github.com/nirjxr26/Bastion",
  },
}
