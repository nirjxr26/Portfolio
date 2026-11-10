import { ReactNode } from "react"
import { Container } from "./Container"

interface PageHeroProps {
  badge?: string
  badgeClassName?: string
  title: ReactNode
  subhead: string
  subheadClassName?: string
  compact?: boolean
  children?: ReactNode
  childrenClassName?: string
  bottomFlush?: boolean
}

export function PageHero({
  badge,
  badgeClassName = "",
  title,
  subhead,
  subheadClassName = "",
  compact = false,
  children,
  childrenClassName = "",
  bottomFlush = false,
}: Readonly<PageHeroProps>) {
  const sectionPadding = bottomFlush
    ? "pt-32 min-[480px]:pt-36 sm:pt-40 md:pt-44 pb-0"
    : compact
      ? "pt-20 pb-6 min-[480px]:pt-24 min-[480px]:pb-6 sm:pt-28 sm:pb-8 md:pt-32 md:pb-8"
      : "pt-32 pb-16 min-[480px]:pt-36 min-[480px]:pb-20 sm:pt-40 sm:pb-24 md:pt-44 md:pb-28"
  return (
    <section className={`bg-canvas ${sectionPadding}`}>
      <Container className="text-center">
        {badge && (
          <p className={`font-extrabold font-inter-variable tracking-normal uppercase text-accent text-base sm:text-lg mb-2 sm:mb-3 animate-hero-1 ${badgeClassName}`.trim()}>
            {badge}
          </p>
        )}
        <h1 className="t-hero text-[38px] sm:text-[clamp(34px,5.2vw,56px)] text-ink mt-2 sm:mt-3 animate-hero-1">{title}</h1>
        <p className={`t-lead text-[15px] sm:text-[24px] font-normal font-univers leading-[1.5] mx-auto mt-4 sm:mt-6 max-w-2xl text-muted animate-hero-2 ${subheadClassName}`.trim()}>{subhead}</p>
        {children && (
          <div className={`mt-8 sm:mt-10 ${bottomFlush ? "" : "animate-hero-3"} flex justify-center w-full ${bottomFlush ? "mb-0" : ""} ${childrenClassName}`.trim()}>
            {children}
          </div>
        )}
      </Container>
    </section>
  )
}
