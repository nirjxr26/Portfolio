import { ReactNode } from "react"
import { Container } from "./Container"

interface PageHeroProps {
  badge?: string
  title: ReactNode
  subhead: string
  compact?: boolean
  children?: ReactNode
  childrenClassName?: string
  bottomFlush?: boolean
}

export function PageHero({
  badge,
  title,
  subhead,
  compact = false,
  children,
  childrenClassName = "",
  bottomFlush = false,
}: Readonly<PageHeroProps>) {
  const sectionPadding = bottomFlush
    ? "pt-32 min-[480px]:pt-36 sm:pt-40 md:pt-44 pb-0"
    : compact
      ? "pt-24 pb-12 min-[480px]:pt-28 min-[480px]:pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24"
      : "pt-32 pb-16 min-[480px]:pt-36 min-[480px]:pb-20 sm:pt-40 sm:pb-24 md:pt-44 md:pb-28"
  return (
    <section className={`bg-canvas ${sectionPadding}`}>
      <Container className="text-center">
        {badge && (
          <p className="font-bold tracking-normal text-accent text-lg min-[375px]:text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 animate-hero-1">
            {badge}
          </p>
        )}
        <h1 className="t-hero text-[38px] sm:text-[clamp(34px,5.2vw,56px)] text-ink mt-2 sm:mt-3 animate-hero-1">{title}</h1>
        <p className="t-lead mx-auto mt-4 sm:mt-6 max-w-2xl text-muted animate-hero-2">{subhead}</p>
        {children && (
          <div className={`mt-8 sm:mt-10 ${bottomFlush ? "" : "animate-hero-3"} flex justify-center w-full ${bottomFlush ? "mb-0" : ""} ${childrenClassName}`.trim()}>
            {children}
          </div>
        )}
      </Container>
    </section>
  )
}
