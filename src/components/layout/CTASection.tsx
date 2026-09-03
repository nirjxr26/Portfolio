import type { ReactNode } from "react"
import { Container } from "./Container"
import { ArrowUpRight } from "../common/Icons"

interface CTASectionProps {
  headline: ReactNode | string
  body: ReactNode | string
  action: string
  url: string
  bgClass?: string
  ariaLabel?: string
}

export function CTASection({
  headline,
  body,
  action,
  url,
  bgClass = "bg-surface-alt",
  ariaLabel,
}: CTASectionProps) {
  return (
    <section className={`${bgClass} py-18 sm:py-24 reveal-on-scroll`}>
      <Container className="text-center max-w-3xl">
        <h2 className="t-hero text-ink">{headline}</h2>
        <p className="t-lead mt-4 text-muted">{body}</p>
        <div className="mt-8 flex justify-center">
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={ariaLabel || (typeof action === "string" ? action : undefined)}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <span>{action}</span>
            <ArrowUpRight className="shrink-0" />
          </a>
        </div>
      </Container>
    </section>
  )
}
