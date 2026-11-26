import { Fragment, createElement } from "react"
import type { CaseStudyData } from "@/types"

export const hookdropData: CaseStudyData = {
  seoTitle: "HookDrop | Real-Time Event & Webhook Ingestion Engine",
  hero: {
    title: "HookDrop",
    headline: createElement(
      Fragment,
      null,
      "Webhooks in,",
      createElement("br"),
      " signed images out.",
    ),
    subhead: "A Go service that captures, inspects, and streams live webhooks with end-to-end tracing.",
  },
  sections: [
    {
      title: "Capture, inspect, stream.",
      cards: [
        {
          headline: "Captures the full event.",
          body: "POST to /h/<bucket> and store headers, body, source IP, and a unique per-event trace ID.",
        },
        {
          headline: "Lists what arrived.",
          body: "Send a GET request to any bucket endpoint to inspect its latest 50 captured events.",
        },
        {
          headline: "Streams them live.",
          body: "Connect to /h/<bucket>/stream for live SSE webhooks, kept open past proxies with keepalives.",
        },
        {
          headline: "Reports its own health.",
          body: "Exposes /healthz and /readyz HTTP endpoints to back Kubernetes liveness and readiness probes.",
        },
        {
          headline: "Configures in four variables.",
          body: "Uses PORT (8080), LOG_LEVEL (info), OTEL_SERVICE_NAME (hookdrop), and optional OTLP endpoint.",
        },
      ],
    },
    {
      title: "Inside a single request.",
      cards: [
        {
          headline: "Receives and stores.",
          body: "net/http handlers accept each POST while an in-memory store retains the latest 50 events per bucket.",
        },
        {
          headline: "Publishes.",
          body: "Broadcasts each incoming event immediately to every active SSE subscriber listening on that bucket.",
        },
        {
          headline: "Traces twice, on purpose.",
          body: "Middleware assigns a transport ID (or X-Trace-Id), then the handler creates a related event trace ID.",
        },
        {
          headline: "Exports spans.",
          body: "Emits OpenTelemetry spans over OTLP gRPC when configured; stays a zero-overhead no-op when unset.",
        },
        {
          headline: "Honest about its limits.",
          body: "Events stay in memory and clear on pod restart—built for live webhook inspection, not archiving.",
        },
      ],
    },
    {
      title: "The road to production.",
      cards: [
        {
          headline: "Verify.",
          body: "Every push or PR to main runs the Go build, go test -race suite, and a strict golangci-lint gate.",
        },
        {
          headline: "Scan.",
          body: "Trivy scans both the built container image and the Helm chart for known security vulnerabilities.",
        },
        {
          headline: "Build and sign.",
          body: "On merge, an Alpine-to-distroless image pushes to ECR by SHA and is signed keylessly via Cosign.",
        },
        {
          headline: "Sync.",
          body: "ArgoCD watches deploy and syncs hookdrop using values-local.yaml or values-prod.yaml overrides.",
        },
        {
          headline: "Admit.",
          body: "A Kyverno policy checks the Cosign signature at admission, blocking unsigned images at the cluster.",
        },
        {
          headline: "Bootstrap in one script.",
          body: "setup-cluster.sh (.ps1 on Windows) checks docker-desktop, installs ArgoCD and Kyverno, and syncs.",
        },
        {
          headline: "One manual step remains.",
          body: "Updating the tag in helm/hookdrop/values.yaml is still manual; reusable-build.yml can automate it.",
        },
      ],
    },
    {
      title: "Locked down and observable.",
      cards: [
        {
          headline: "Signed or it doesn't run.",
          body: "Cluster admission enforces the Cosign signature, ensuring only pipeline-built images can run.",
        },
        {
          headline: "Least privilege.",
          body: "Distroless image, no token auto-mount, and a NetworkPolicy allowing only app, ArgoCD, and OTLP.",
        },
        {
          headline: "Sized, scaled, and alerting.",
          body: "The Helm chart configures resource limits, an HPA, a ServiceMonitor, and a PrometheusRule.",
        },
        {
          headline: "Metrics, logs, and traces.",
          body: "setup-observability.sh installs Prometheus, Grafana, Alertmanager, Loki/Zerolog, and Tempo/OTel.",
        },
        {
          headline: "Dependencies stay current.",
          body: "Renovate continuously checks and opens PRs to keep Go libraries and base images up to date.",
        },
      ],
    },
  ],
  cta: {
    headline: "Try Hookdrop now.",
    body: "Clone the GitHub repository, run make dev, and POST to your first bucket in under a minute.",
    action: "View on GitHub",
    url: "https://github.com/nirjxr26",
  },
}
