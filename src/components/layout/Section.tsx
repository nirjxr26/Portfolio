import type { ReactNode } from "react"
import { Container } from "./Container"

interface SectionProps {
  id?: string
  bgClass?: string
  className?: string
  children: ReactNode
}

/**
 * Single section shell — `scroll-mt-12 overflow-hidden py-14 sm:py-18`.
 * Exact classes previously duplicated in CarouselSection + ProjectsRail.
 */
export function Section({ id, bgClass = "bg-canvas", className = "", children }: Readonly<SectionProps>) {
  return (
    <section id={id} className={`scroll-mt-12 overflow-hidden py-14 sm:py-18 ${bgClass} ${className}`.trim()}>
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  tag?: ReactNode | string
  tagClassName?: string
  title: ReactNode | string
  titleClassName?: string
  desc?: ReactNode | string
  className?: string
  centered?: boolean
  descClassName?: string
}

/**
 * Single section title & description — Container + `t-display` + `t-body` + reveal.
 */
export function SectionHeader({
  tag,
  tagClassName,
  title,
  titleClassName,
  desc,
  className = "mb-6 sm:mb-8",
  centered = false,
  descClassName,
}: Readonly<SectionHeaderProps>) {
  const defaultTagClass = "text-accent text-sm sm:text-base font-semibold tracking-wide mb-2 sm:mb-3"
  const defaultTitleClass = "t-display text-ink"
  const defaultDescClass =
    "t-body text-muted text-sm sm:text-base font-normal leading-relaxed mt-3 sm:mt-4 max-w-lg text-pretty"
  const titleClass = titleClassName
    ? `font-display font-semibold text-ink ${titleClassName}`
    : defaultTitleClass

  return (
    <Container className={`reveal-on-scroll ${centered ? "text-left sm:text-center" : ""} ${className}`.trim()}>
      {tag && (
        <p className={`${tagClassName ?? defaultTagClass} ${centered ? "mr-auto sm:mx-auto" : ""}`.trim()}>
          {tag}
        </p>
      )}
      <h2 className={titleClass}>{title}</h2>
      {desc && (
        <p className={`${descClassName ?? defaultDescClass} ${centered ? "mr-auto sm:mx-auto" : ""}`.trim()}>
          {desc}
        </p>
      )}
    </Container>
  )
}

