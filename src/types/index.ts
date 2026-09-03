import type { ReactNode } from "react"

// ---- Case Study Types ----
export interface CardItem {
  headline: string
  body?: string
  tag?: string
  link?: string
  url?: string
}

export interface SectionItem {
  title: string
  cards: CardItem[]
}

export interface CaseStudyData {
  seoTitle?: string
  hero: {
    title: string
    headline: ReactNode | string
    subhead: string
  }
  sections: SectionItem[]
  cta: {
    headline: string
    body: ReactNode | string
    action: string
    url: string
  }
  softwareSchema?: Partial<SoftwareSchema>
}

// ---- Home & Portfolio Types ----
export interface HeroAction {
  label: string
  url: string
  type: "primary" | "secondary"
  isExternal?: boolean
}

export interface Frame {
  number?: string
  tag: string
  title: string
  desc: string
  tagline?: string
  achievements?: string[]
  techStack?: string[]
}

export interface Project {
  title: string
  category: string
  year?: string
  description: string
  link: string
  projectLink?: string
  tags: string[]
}

export interface Article {
  title: string
  category?: string
  date?: string
  readTime?: string
  desc: string
  link: string
}

export interface ProductionCapability {
  title: string
  tagline: string
  desc: string
}

// ---- SEO & Metadata Types ----
export interface BreadcrumbItem {
  name: string
  url: string
}

export interface SoftwareSchema {
  name: string
  description: string
  applicationCategory: string
  operatingSystem: string
  url: string
  codeRepository?: string
  programmingLanguage?: string
  license?: string
  runtimePlatform?: string
}

export interface PersonSchema {
  name: string
  url: string
  jobTitle: string
  sameAs: string[]
}
