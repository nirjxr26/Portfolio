import type { ReactNode } from "react"

export interface CardItem {
  headline: string
  body?: string
  tag?: string
  wide?: boolean
  centered?: boolean
}

export interface SectionItem {
  tag?: ReactNode | string
  tagClassName?: string
  title: ReactNode | string
  titleClassName?: string
  desc?: ReactNode | string
  descClassName?: string
  media?: ReactNode
  layeredAsset?: LayeredAsset
  cards?: CardItem[]
  wideCards?: boolean
  centeredHeader?: boolean
  centeredCards?: boolean
}

export interface InstallCommand {
  label: string
  command: string
}

export interface HeroAsset {
  src: string
  alt?: string
  width?: number
  height?: number
  maxWidthClass?: string
}

export interface LayeredAsset {
  bgSrc: string
  fgSrc: string
  bgAlt?: string
  fgAlt?: string
  bgWidth?: number
  bgHeight?: number
  fgWidth?: number
  fgHeight?: number
  fgWidthClass?: string
  maxWidthClass?: string
  mobileHeightClass?: string
  mobilePaddingClass?: string
}

export interface CaseStudyData {
  seoTitle?: string
  hero: {
    title: string
    headline: ReactNode | string
    subhead: string
    installCommands?: InstallCommand[]
    heroAsset?: HeroAsset
  }
  sections: SectionItem[]
  cta: {
    headline: string
    body: ReactNode | string
    action: string
    url: string
    secondaryAction?: {
      label: string
      url: string
    }
    installCommands?: InstallCommand[]
  }
  softwareSchema?: Partial<SoftwareSchema>
}

export interface HeroAction {
  label: string
  url: string
  type: "primary" | "secondary"
  arrow?: boolean | "right" | "up-right"
  ariaLabel?: string
  className?: string
}

export interface Frame {
  tag: string
  title: string
  desc: string
}

export interface Project {
  title: string
  category: string
  year?: string
  description: string
  link?: string
  projectLink?: string
}

export interface Article {
  title: string
  category?: string
  date?: string
  readTime?: string
  desc: string
  link: string
  hideFromHome?: boolean
}

export interface ProductionCapability {
  title: string
  tagline: string
  desc: string
}

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
