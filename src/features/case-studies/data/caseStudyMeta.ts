export interface CaseStudyMeta {
  title: string
  programmingLanguage?: string
}

export const CASE_STUDY_META: Record<string, CaseStudyMeta> = {
  bastion: {
    title: "Bastion",
    programmingLanguage: "Go / Python / TypeScript",
  },
  kost: {
    title: "Kost",
    programmingLanguage: "Go",
  },
  hookdrop: {
    title: "HookDrop",
    programmingLanguage: "Go / TypeScript",
  },
  trace: {
    title: "Trace",
    programmingLanguage: "Python / Textual / PostgreSQL",
  },
}
