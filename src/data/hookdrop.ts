import type { CaseStudyData } from "@/types"

export const hookdropData: CaseStudyData = {
  seoTitle: "HookDrop | Go Webhook Receiver",
  hero: {
    title: "HookDrop",
    headline: "Built to be watched.",
    subhead: "Every event traced live. Every image proven before it runs.",
  },
  sections: [
    {
      title: "What HookDrop does.",
      cards: [
        {
          headline: "Traces events live.",
          body: "Captures and streams system calls, network events, and container lifecycle changes in real time.",
        },
        {
          headline: "Verifies image provenance.",
          body: "Checks cryptographic signatures and SBOM attestations before allowing any image to boot.",
        },
        {
          headline: "Enforces runtime policy.",
          body: "Blocks unauthorized executions, unexpected shell spawns, and abnormal file access attempts immediately.",
        },
      ],
    },
    {
      title: "Observability & Control.",
      cards: [
        {
          headline: "Structured audit trails.",
          body: "Exports clean JSON events enriched with pod, container, and user metadata directly to your SIEM.",
        },
        {
          headline: "Low overhead sensor.",
          body: "Leverages modern eBPF probes for kernel-level visibility without degrading cluster performance.",
        },
      ],
    },
  ],
  cta: {
    headline: "Try HookDrop now.",
    body: "Ready to harden your runtime observability? Check out the GitHub repository.",
    action: "View on GitHub",
    url: "https://github.com/nirjxr26",
  },
}
