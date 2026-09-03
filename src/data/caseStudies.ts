import { bastionData } from "./bastion"
import { hookdropData } from "./hookdrop"
import { kostData } from "./kost"
import type { CaseStudyData } from "@/types"

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  bastion: bastionData,
  kost: kostData,
  hookdrop: hookdropData,
}
