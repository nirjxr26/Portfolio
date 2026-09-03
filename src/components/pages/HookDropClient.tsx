import { hookdropData } from "@/data/hookdrop"
import { CaseStudyPage } from "./CaseStudyPage"

export function HookDropClient() {
  return <CaseStudyPage data={hookdropData} />
}
