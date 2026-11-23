import type { ReactNode } from "react"
import { BODY_MUTED_CLASS } from "../textStyles"

export function CardEyebrow({ tone, children }: Readonly<{ tone: "accent" | "muted"; children: ReactNode }>) {
  return (
    <p
      className={`t-caption-strong card-tag text-xs min-[375px]:text-sm font-semibold font-univers ${tone === "accent" ? "tracking-[0.2px] text-accent" : "text-muted"}`}
    >
      {children}
    </p>
  )
}

export function CardBody({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p className={`${BODY_MUTED_CLASS} card-desc`}>
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
