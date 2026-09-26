import type { ReactNode } from "react"
import { Container } from "./Container"
import { LightButton, PrimaryButton } from "../common/Button"

interface CTASectionProps {
  headline: ReactNode | string
  body: ReactNode | string
  action: string
  url: string
  secondaryAction?: {
    label: string
    url: string
  }
  bgClass?: string
  ariaLabel?: string
}

export function CTASection({
  headline,
  body,
  action,
  url,
  secondaryAction,
  bgClass = "bg-surface-alt",
  ariaLabel,
}: Readonly<CTASectionProps>) {
  return (
    <section className={`${bgClass} py-18 sm:py-24 reveal-on-scroll`}>
      <Container size="narrow" className="text-center">
        <h2 className="t-hero text-ink">{headline}</h2>
        <p className="t-lead mt-4 text-muted">{body}</p>
        <div className="mt-8 flex flex-col min-[360px]:flex-row items-center justify-center gap-3 sm:gap-4">
          <PrimaryButton
            href={url}
            arrow="up-right"
            aria-label={ariaLabel || (typeof action === "string" ? action : undefined)}
            className="w-full min-[360px]:w-auto"
          >
            {action}
          </PrimaryButton>
          {secondaryAction && (
            <LightButton
              href={secondaryAction.url}
              arrow
              className="w-full min-[360px]:w-auto"
            >
              {secondaryAction.label}
            </LightButton>
          )}
        </div>
      </Container>
    </section>
  )
}
