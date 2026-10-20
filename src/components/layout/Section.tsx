import type { ReactNode } from "react"
import { BODY_MUTED_CLASS } from "../common/textStyles"
import { Container } from "./Container"

interface SectionProps {
  id?: string
  bgClass?: string
  className?: string
  /**
   * Vertical padding. Passed whole rather than merged with the default so a
   * caller can tighten one edge without depending on which utility wins the
   * cascade — `pb-*` and `py-*` are both `padding` utilities and the winner
   * depends on stylesheet order.
   */
  padClass?: string
  children: ReactNode
}

/**
 * Single section shell — `scroll-mt-12 overflow-hidden py-14 sm:py-18`.
 * Exact classes previously duplicated in CarouselSection + ProjectsRail.
 */
export function Section({
  id,
  bgClass = "bg-canvas",
  className = "",
  padClass = "py-14 sm:py-18",
  children,
}: Readonly<SectionProps>) {
  return (
    <section
      id={id}
      className={`scroll-mt-12 overflow-hidden ${padClass} ${bgClass} ${className}`.trim()}
    >
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
  const defaultTagClass = "text-accent text-sm sm:text-base font-normal tracking-wide mb-2 sm:mb-3"
  const defaultTitleClass = "t-display text-ink"
  const defaultDescClass = `${BODY_MUTED_CLASS} mt-3 sm:mt-4 max-w-lg text-pretty`
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

