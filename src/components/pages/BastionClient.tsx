import { bastionData } from "@/data/bastion"
import { CaseStudyPage } from "./CaseStudyPage"

export function BastionClient() {
  return (
    <CaseStudyPage
      data={{
        ...bastionData,
        seoTitle: "Bastion | Self-Hosted IAM Platform",
        hero: {
          ...bastionData.hero,
          headline: <>Access Control.<br className="block sm:hidden" /> Fully Yours.</>,
        },
        cta: {
          ...bastionData.cta,
          body: (
            <>
              The project's open and ready for contributors — dig into <br className="hidden sm:inline" /> the code or open an issue anytime.
            </>
          ),
        },
      }}
    />
  )
}
