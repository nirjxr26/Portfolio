import type { CaseStudyData } from "@/types"

export const kostData: CaseStudyData = {
  seoTitle: "Kost | Kubernetes Cost Optimizer",
  hero: {
    title: "Kost",
    headline: "Find the waste. Fix it in one line.",
    subhead: "A Go agent that flags over-provisioned pods and hands you the kubectl command to fix them.",
  },
  sections: [
    {
      title: "What Kost does.",
      cards: [
        {
          headline: "Flags the waste.",
          body: "Compares requests against real usage, and surfaces pods running far above what they need.",
        },
        {
          headline: "Gives you the fix.",
          body: "Outputs the exact kubectl patch — no guessing.",
        },
        {
          headline: "Zero install required.",
          body: "One CLI binary, your existing kubeconfig. No CRDs, no operator.",
        },
        {
          headline: "Know the dollar impact.",
          body: "Wasted core-hours and gigabyte-hours, translated into monthly cost.",
        },
        {
          headline: "Safe defaults.",
          body: "Reductions sized to the 95th percentile — headroom for real spikes.",
        },
        {
          headline: "Plugs into CI.",
          body: "Run it as a GitHub Action, and catch regressions before they reach main.",
        },
      ],
    },
    {
      title: "How it works under the hood.",
      cards: [
        {
          headline: "Reads from Metrics Server.",
          body: "Pulls usage data from Kubernetes Metrics Server or Prometheus.",
        },
        {
          headline: "Computes the slack.",
          body: "Weighs requests against peak usage to quantify the room each deployment has to give.",
        },
        {
          headline: "Ships it your way.",
          body: "Terminal tables, JSON, or copy-paste shell commands.",
        },
      ],
    },
    {
      title: "Built for speed & safety.",
      cards: [
        {
          headline: "Read-only by default.",
          body: "Kost never touches cluster state unless you pass the auto-apply flag.",
        },
        {
          headline: "Fast, and it stays fast.",
          body: "Scans thousands of pods across clusters in seconds.",
        },
        {
          headline: "Namespace aware.",
          body: "Target namespaces, exclude critical pods, or set your own thresholds.",
        },
      ],
    },
  ],
  cta: {
    headline: "Try Kost now.",
    body: "The project's open source and ready for your cluster — run your first scan in under a minute.",
    action: "View on GitHub",
    url: "https://github.com/nirjxr26/Kost",
  },
}
