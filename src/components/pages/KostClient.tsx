import { kostData } from "@/data/kost"
import { CaseStudyPage } from "./CaseStudyPage"

export function KostClient() {
  return (
    <CaseStudyPage
      data={{
        ...kostData,
        seoTitle: "Kost | Kubernetes Cost Optimizer",
        hero: {
          ...kostData.hero,
          headline: <>Find The Waste.<br className="block sm:hidden" /> Fix It In One Line.</>,
        },
        cta: {
          ...kostData.cta,
          body: (
            <>
              The project's open source and ready for your cluster — <br className="hidden sm:inline" /> run your first scan in under a minute.
            </>
          ),
        },
      }}
    />
  )
}
