import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import type { HeroAction } from "@/types"
import { externalProps } from "@/utils/helpers"
import { ArrowRight, ArrowUpRight } from "./Icons"

export type ButtonVariant = "primary" | "ghost" | "flow" | "light" | "dark" | "apple-dark" | "apple-light"

interface ButtonBase {
  variant?: ButtonVariant
  className?: string
  children: ReactNode
}

type ButtonLinkProps = ButtonBase &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string
  }

type ButtonButtonProps = ButtonBase &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined
  }

export type AppButtonProps = ButtonLinkProps | ButtonButtonProps

/**
 * Simple, clean pill button grammar from original design.
 */
export function AppButton({ variant = "primary", className = "", children, ...rest }: AppButtonProps) {
  let variantClass = `btn btn-${variant}`
  if (variant === "dark" || variant === "apple-dark") {
    variantClass = "btn dark-btn"
  } else if (variant === "light" || variant === "apple-light") {
    variantClass = "btn btn-ghost"
  }

  const classes = `${variantClass} ${className}`.trim()

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as ButtonLinkProps
    return (
      <a href={href} className={classes} {...externalProps(href)} {...anchorRest}>
        {children}
      </a>
    )
  }

  const buttonRest = rest as ButtonButtonProps
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  )
}

type AppleButtonLinkProps = Omit<ButtonLinkProps, "variant" | "children"> & {
  arrow?: boolean | "right" | "up-right"
  children: ReactNode
}

type AppleButtonButtonProps = Omit<ButtonButtonProps, "variant" | "children"> & {
  arrow?: boolean | "right" | "up-right"
  children: ReactNode
}

export type AppleButtonProps = AppleButtonLinkProps | AppleButtonButtonProps

function renderPillButton(
  variant: "dark" | "light" | "primary",
  { arrow, children, ...rest }: AppleButtonProps,
) {
  const content = (
    <>
      <span>{children}</span>
      {arrow === "up-right" ? (
        <ArrowUpRight width={14} height={14} className="flow-arrow shrink-0" />
      ) : arrow ? (
        <ArrowRight width={13} height={13} className="flow-arrow shrink-0" />
      ) : null}
    </>
  )

  if ("href" in rest && typeof rest.href === "string") {
    return (
      <AppButton variant={variant} {...(rest as ButtonLinkProps)}>
        {content}
      </AppButton>
    )
  }

  return (
    <AppButton variant={variant} {...(rest as ButtonButtonProps)}>
      {content}
    </AppButton>
  )
}

export function PrimaryButton(props: AppleButtonProps) {
  return renderPillButton("primary", props)
}

export const ApplePrimaryButton = PrimaryButton

export function DarkButton(props: AppleButtonProps) {
  return renderPillButton("dark", props)
}

export const AppleDarkButton = DarkButton

export function LightButton(props: AppleButtonProps) {
  return renderPillButton("light", props)
}

export const AppleLightButton = LightButton

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> {
  href: string
  className?: string
  children: ReactNode
}

export function AppLink({ href, className, children, ...rest }: Readonly<AppLinkProps>) {
  return (
    <a href={href} className={className} {...externalProps(href)} {...rest}>
      {children}
    </a>
  )
}

export const HERO_BUTTON_CLASS =
  "w-full min-[360px]:flex-1 sm:flex-initial min-[360px]:max-w-[185px] sm:max-w-none sm:w-auto justify-center text-center whitespace-nowrap px-5 sm:px-7"

export function ActionGroup({
  className = "",
  children,
}: Readonly<{ className?: string; children: ReactNode }>) {
  return (
    <div
      className={`flex flex-col min-[360px]:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[390px] sm:max-w-none mx-auto ${className}`.trim()}
    >
      {children}
    </div>
  )
}

export function ActionButtons({
  actions,
  className = HERO_BUTTON_CLASS,
}: Readonly<{
  actions: HeroAction[]
  className?: string
}>) {
  return (
    <>
      {actions.map((action) => {
        const arrow = action.arrow ?? (action.type === "secondary" ? true : undefined)

        return action.type === "primary" ? (
          <PrimaryButton
            key={action.label}
            href={action.url}
            arrow={arrow}
            aria-label={action.ariaLabel}
            className={`${className} ${action.className ?? ""}`.trim()}
          >
            {action.label}
          </PrimaryButton>
        ) : (
          <LightButton
            key={action.label}
            href={action.url}
            arrow={arrow}
            aria-label={action.ariaLabel}
            className={`${className} ${action.className ?? ""}`.trim()}
          >
            {action.label}
          </LightButton>
        )
      })}
    </>
  )
}
