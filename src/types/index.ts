import type { ReactNode } from "react"

export interface CardItem {
  headline: string
  body?: string
  tag?: string
  wide?: boolean
  centered?: boolean
  /** Optional product preview rendered beneath the copy. Grows the card. */
  image?: HeroAsset
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
  /**
   * Rendered past the card rail, still inside the section — for content that
   * belongs to the same section without being a card.
   */
  afterCards?: ReactNode
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

/** A tab that swaps the preview foreground to its own SVG. */
export interface FgSwatch {
  /** Tab label. */
  label: string
  /** Caption text shown while this tab is active. */
  description: string
  /** Foreground SVG shown in the preview while this tab is active. */
  svg: string
}

export interface LayeredAsset {
  bgSrc?: string
  bgColor?: string
  fgSrc: string
  fgSwatches?: FgSwatch[]
  bgAlt?: string
  fgAlt?: string
  bgWidth?: number
  bgHeight?: number
  fgWidth?: number
  fgHeight?: number
  mobileFgSrc?: string
  mobileFgWidth?: number
  mobileFgHeight?: number
  mobileFgClass?: string
  mobileFrameClass?: string
  maxWidthClass?: string
  /** Caps the console itself, so growing the panel does not grow the artwork. */
  fgMaxWidthClass?: string
  mobileHeightClass?: string
  mobilePaddingClass?: string
  frameClass?: string
}

export type SurfaceMode = "alternate" | "mono"

export interface CaseStudyData {
  seoTitle?: string
  /** `mono` keeps every section after the first on the canvas colour with its
   *  cards on the surface colour, instead of alternating the pair. */
  surfaceMode?: SurfaceMode
  hero: {
    title: string
    headline: ReactNode | string
    subhead: string
    installCommands?: InstallCommand[]
    heroAsset?: HeroAsset
    heroLayeredAsset?: LayeredAsset
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
      arrow?: boolean | "right" | "up-right"
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
  tag?: string
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
  slug?: string
  poster?: {
    light: string
    dark: string
  }
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
