import type { ReactNode } from "react"
import type { HeroAction, InstallCommand } from "@/types"
import { Container } from "./Container"
import { ActionButtons, ActionGroup } from "../common/Button"
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
  const actions: HeroAction[] = [
    {
      label: typeof action === "string" ? action : "Learn more",
      url,
      type: "primary",
      arrow: "up-right",
      ariaLabel: ariaLabel || (typeof action === "string" ? action : undefined),
    },
    ...(secondaryAction
      ? [
          {
            label: secondaryAction.label,
            url: secondaryAction.url,
            type: "secondary" as const,
            arrow: true as const,
          },
        ]
      : []),
  ]

  return (
    <section className={`${bgClass} py-18 sm:py-24 reveal-on-scroll`}>
      <Container className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="t-hero text-ink">{headline}</h2>
          <p className="t-lead mt-4 text-muted">{body}</p>
        </div>
        {installCommands && installCommands.length > 0 && (
          <div className="hidden sm:flex mt-8 justify-center w-full">
            <InstallSnippet commands={installCommands} />
          </div>
        )}
        <ActionGroup className="mt-6 sm:mt-8">
          <ActionButtons actions={actions} />
        </ActionGroup>
      </Container>
    </section>
  )
}
