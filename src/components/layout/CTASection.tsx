import type { ReactNode } from "react"
import type { InstallCommand } from "@/types"
import { Container } from "./Container"
import { LightButton, PrimaryButton } from "../common/Button"
import { InstallSnippet } from "../common/InstallSnippet"

interface CTASectionProps {
  headline: ReactNode | string
  body: ReactNode | string
  action: string
  url: string
  secondaryAction?: {
    label: string
    url: string
  }
  installCommands?: InstallCommand[]
  bgClass?: string
  ariaLabel?: string
}

export function CTASection({
  headline,
  body,
  action,
  url,
  secondaryAction,
  installCommands,
  bgClass = "bg-surface-alt",
  ariaLabel,
}: Readonly<CTASectionProps>) {
  return (
    <section className={`${bgClass} py-18 sm:py-24 reveal-on-scroll`}>
      <Container size="narrow" className="text-center">
        <h2 className="t-hero text-ink">{headline}</h2>
        <p className="t-lead mt-4 text-muted">{body}</p>
        {installCommands && installCommands.length > 0 && (
          <div className="hidden sm:flex mt-8 justify-center w-full">
            <InstallSnippet commands={installCommands} />
          </div>
        )}
        <div className="mt-6 sm:mt-8 flex flex-col min-[360px]:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[390px] sm:max-w-none mx-auto">
          <PrimaryButton
            href={url}
            arrow="up-right"
            aria-label={ariaLabel || (typeof action === "string" ? action : undefined)}
            className="w-full min-[360px]:flex-1 sm:flex-initial min-[360px]:max-w-[185px] sm:max-w-none sm:w-auto justify-center text-center whitespace-nowrap px-4 sm:px-7"
          >
            {action}
          </PrimaryButton>
          {secondaryAction && (
            <LightButton
              href={secondaryAction.url}
              arrow
              className="w-full min-[360px]:flex-1 sm:flex-initial min-[360px]:max-w-[185px] sm:max-w-none sm:w-auto justify-center text-center whitespace-nowrap px-4 sm:px-7"
            >
              {secondaryAction.label}
            </LightButton>
          )}
        </div>
      </Container>
    </section>
  )
}
