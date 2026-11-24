import type { CaseStudyData } from "@/types"

export const hookdropData: CaseStudyData = {
  seoTitle: "HookDrop | Real-Time Event & Webhook Ingestion Engine",
  hero: {
    title: "HookDrop",
    headline: "Built to be watched.",
    subhead: "Every event traced live. Every image proven before it runs.",
  },
  sections: [
    {
      title: "What it does.",
      cards: [
        {
          headline: "Nothing gets lost.",
          body: "Every event streams live over SSE — full context, sub-35ms.",
        },
        {
          headline: "Nothing unverified ships.",
          body: "Images are signed and scanned before they reach a cluster.",
        },
        {
          headline: "Nothing deploys by hand.",
          body: "Push a commit. Build, sign, sync, and deploy happen on their own.",
        },
      ],
    },
    {
      title: "Ready for real traffic.",
      cards: [
        {
          headline: "Locked down by default.",
          body: "Non-root, read-only, resource-limited, policy-enforced.",
        },
        {
          headline: "Traced end to end.",
          body: "Metrics, logs, and traces — correlated, not guessed at.",
        },
      ],
    },
  ],
  cta: {
    headline: "See it running.",
    body: "The full pipeline, the source, and how it stays under 35ms.",
    action: "View on GitHub",
    url: "https://github.com/nirjxr26",
  },
}
