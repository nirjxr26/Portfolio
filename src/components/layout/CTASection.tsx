import type { ReactNode } from "react"
import { Container } from "./Container"
import { AppButton } from "../common/Button"
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
}: Readonly<CTASectionProps>) {
  return (
    <section className={`${bgClass} py-18 sm:py-24 reveal-on-scroll`}>
      <Container size="narrow" className="text-center">
        <h2 className="t-hero text-ink">{headline}</h2>
        <p className="t-lead mt-4 text-muted">{body}</p>
        <div className="mt-8 flex justify-center">
          <AppButton
            href={url}
            aria-label={ariaLabel || (typeof action === "string" ? action : undefined)}
            className="inline-flex items-center gap-2"
          >
            <span>{action}</span>
            <ArrowUpRight className="shrink-0" />
          </AppButton>
        </div>
      </Container>
    </section>
  )
}
