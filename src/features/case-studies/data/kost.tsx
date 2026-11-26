import type { CaseStudyData } from "@/types"
import { withAssetHash } from "@/lib/helpers"

export const kostData: CaseStudyData = {
  seoTitle: "Kost | Kubernetes Cost Optimizer",
  hero: {
    title: "Kost",
    headline: (
      <>
        <span className="inline-flex items-center justify-center gap-[0.34em]">
          <span>See what your</span>
          <img
            src={withAssetHash("/assets/features/kost/kubernetes.svg")}
            alt="Kubernetes"
            className="h-[0.96em] w-[0.96em] shrink-0 translate-y-[0.06em] select-none"
            draggable={false}
          />
        </span>
        <br />
        is overpaying for.
      </>
    ),
    subhead: "A Go agent that flags over-provisioned pods and hands you the kubectl command to fix them.",
  },
  sections: [
    {
      title: "What Kost does.",
      cards: [
        {
          headline: "Flags the waste.",
          body: "Compares container requests to real usage and flags workloads requesting 1.5× or more.",
        },
        {
          headline: "Gives you the fix.",
          body: "Outputs the exact kubectl set resources command to copy, review, and apply.",
        },
        {
          headline: "Targets the right resource.",
          body: "Traces Pod → ReplicaSet → Deployment ownership so the fix points to the object you edit.",
        },
        {
          headline: "Knows the dollar impact.",
          body: "Translates wasted CPU and memory into monthly cost in USD and INR.",
        },
        {
          headline: "Filters the noise.",
          body: "Flags workloads only when estimated waste clears $5/month.",
        },
        {
          headline: "Sizes with headroom.",
          body: "Suggests actual usage × 1.3, with a floor of 0.1 core and 0.1 GB.",
        },
      ],
    },
    {
      title: "How it works under the hood.",
      cards: [
        {
          headline: "Reads from the Metrics API.",
          body: "Lists running pods and reads metrics.k8s.io via the dynamic client at startup and every 15 minutes.",
        },
        {
          headline: "Aggregates requests.",
          body: "Sums container requests per pod using a hand-written Kubernetes quantity parser.",
        },
        {
          headline: "Computes the slack.",
          body: "Weighs requests against current usage to measure reclaimable headroom.",
        },
        {
          headline: "Prices the difference.",
          body: "Monthly cost equals (wasted CPU × price + wasted memory × price) × 730 hours, with configurable rates.",
        },
        {
          headline: "Ships it your way.",
          body: "Outputs JSON on stdout each cycle, Prometheus metrics, and an embedded 200-report dashboard.",
        },
      ],
    },
    {
      title: "Reporting & observability.",
      cards: [
        {
          headline: "Structured by default.",
          body: "Each cycle emits JSON with cluster name, total USD/INR waste, and every finding.",
        },
        {
          headline: "Prometheus-ready.",
          body: "GET /metrics exposes over-provisioned count and USD/INR waste as cluster gauges.",
        },
        {
          headline: "Built-in dashboard.",
          body: "GET /dashboard serves a dark-theme UI with stats, findings, and copyable fixes via go:embed.",
        },
        {
          headline: "History without a database.",
          body: "GET /api/reports returns the last 200 reports from memory.",
        },
        {
          headline: "Health you can probe.",
          body: "GET /health checks liveness; GET /ready probes the API server with a 5s timeout.",
        },
      ],
    },
    {
      title: "Built for speed & safety.",
      cards: [
        {
          headline: "Read-only by design.",
          body: "ClusterRole reads pods, metrics, nodes, and PVCs only — no writes, deletes, exec, or secrets.",
        },
        {
          headline: "Suggests, never applies.",
          body: "Prints the fix command; changing cluster state stays your call.",
        },
        {
          headline: "Runs as non-root.",
          body: "Runs as UID 65534 with config mounted from a read-only ConfigMap.",
        },
        {
          headline: "Small footprint.",
          body: "Single ~25MB replica requesting 50m CPU and 32Mi memory, with no database.",
        },
        {
          headline: "Graceful shutdown.",
          body: "Handles SIGTERM and SIGINT with a 5-second window for in-flight work.",
        },
        {
          headline: "Zero config to start.",
          body: "Every setting has a default; missing config files never fail startup.",
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
