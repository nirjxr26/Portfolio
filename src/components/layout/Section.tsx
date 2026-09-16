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
  title: string
  className?: string
}

/**
 * Single section title — Container + `t-display` + reveal.
 */
export function SectionHeader({ title, className = "mb-6 sm:mb-8" }: Readonly<SectionHeaderProps>) {
  return (
    <Container className={`reveal-on-scroll ${className}`.trim()}>
      <h2 className="t-display">{title}</h2>
    </Container>
  )
}

