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
  animate?: boolean
  mobileLeftAlign?: boolean
  roomyHeader?: boolean
  padClassName?: string
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
  animate = true,
  mobileLeftAlign = false,
  roomyHeader = false,
  padClassName,
}: Readonly<PageHeroProps>) {
  const sectionPadding = padClassName
    ? padClassName
    : bottomFlush
    ? "pt-32 min-[480px]:pt-36 sm:pt-40 md:pt-44 pb-0"
    : compact
      ? "pt-28 pb-16 sm:pt-32 sm:pb-16"
      : "pt-32 pb-16 min-[480px]:pt-36 min-[480px]:pb-20 sm:pt-40 sm:pb-24 md:pt-44 md:pb-28"
  return (
    <section className={`bg-canvas ${sectionPadding}`}>
      <Container className={mobileLeftAlign ? "text-left sm:text-center" : "text-center"}>
        {badge && (
          <p className={`font-extrabold font-inter-variable tracking-normal uppercase text-accent text-base sm:text-lg ${roomyHeader ? "mb-7 sm:mb-8" : "mb-2 sm:mb-3"} ${animate ? "animate-hero-1" : ""} ${badgeClassName}`.trim()}>
            {badge}
          </p>
        )}
        <h1 className={`t-hero text-ink ${roomyHeader ? "mt-0 sm:mt-0" : "mt-2 sm:mt-3"} ${animate ? "animate-hero-1" : ""}`.trim()}>{title}</h1>
        <p className={`t-lead text-[17px] sm:text-[24px] font-medium font-univers leading-[1.5] ${mobileLeftAlign ? "mx-0 sm:mx-auto text-left sm:text-center" : "mx-auto"} ${roomyHeader ? "mt-8 sm:mt-10" : "mt-4 sm:mt-6"} max-w-2xl sm:max-w-xl text-muted ${animate ? "animate-hero-2" : ""} ${subheadClassName}`.trim()}>{subhead}</p>
        {children && (
          <div className={`mt-8 sm:mt-10 ${!animate || bottomFlush ? "" : "animate-hero-3"} flex justify-center w-full ${bottomFlush ? "mb-0" : ""} ${childrenClassName}`.trim()}>
            {children}
          </div>
        )}
      </Container>
    </section>
  )
}
