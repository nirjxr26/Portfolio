import { hookdropData } from "@/data/hookdrop"
import { CaseStudyPage } from "./CaseStudyPage"

export function HookDropClient() {
  return (
    <CaseStudyPage
      data={{
        ...hookdropData,
        seoTitle: "HookDrop | Go Webhook Receiver",
        cta: {
          ...hookdropData.cta,
          body: (
            <>
              Ready to harden your runtime observability? <br className="hidden sm:inline" /> Check out the GitHub repository.
            </>
          ),
        },
      }}
    />
  )
}
