import type { ReactNode } from "react"
import { ClockIcon } from "../Icons"

export function CardEyebrow({ tone, children }: Readonly<{ tone: "accent" | "muted"; children: ReactNode }>) {
  return (
    <p
      className={`t-caption-strong card-tag text-xs min-[375px]:text-sm ${tone === "accent" ? "font-semibold tracking-wide text-accent" : "text-muted"}`}
    >
      {children}
    </p>
  )
}

export function CardReadTime({ timeText }: Readonly<{ timeText: string }>) {
  return (
    <div className="flex items-center gap-1.5">
      <ClockIcon width={12} height={12} className="shrink-0 text-muted" />
      <span className="t-fine text-muted">{timeText}</span>
    </div>
  )
}

export function CardBody({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p className="t-body card-desc text-muted text-sm sm:text-base leading-relaxed">
      {children}
    </p>
  )
}

export const CARD_HEADLINE_CLASS =
  "t-tagline tracking-normal text-ink text-lg min-[375px]:text-xl sm:text-2xl leading-tight"

export function CardHeadline({
  className = "",
  centered = false,
  children,
}: Readonly<{ className?: string; centered?: boolean; children: ReactNode }>) {
  return (
    <h3
      className={`${CARD_HEADLINE_CLASS} ${centered ? "text-center" : ""} ${className}`.trim()}
    >
      {children}
    </h3>
  )
}

export function articleAriaLabel(title: string) {
  return `Read article: ${title}`
}
