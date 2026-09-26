import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import type { HeroAction } from "@/types"
import { externalProps } from "@/utils/helpers"
import { ArrowRight, ArrowUpRight } from "./Icons"

export type ButtonVariant =
  | "primary"
  | "ghost"
  | "flow"
  | "dark"
  | "light"
  | "apple-dark"
  | "apple-light"
  | "glass-dark"
  | "glass-light"

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
 * Single pill button supporting traditional tokens and Apple tactile CTAs.
 */
export function AppButton({ variant = "primary", className = "", children, ...rest }: AppButtonProps) {
  let variantClass = `btn btn-${variant}`
  if (variant === "dark" || variant === "apple-dark" || variant === "glass-dark") {
    variantClass = "dark-btn btn-apple-dark"
  } else if (variant === "light" || variant === "apple-light" || variant === "glass-light") {
    variantClass = "light-btn btn-apple-light"
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
        <ArrowUpRight width={14} height={14} strokeWidth={2.2} className="flow-arrow shrink-0" />
      ) : arrow ? (
        <ArrowRight width={13} height={13} strokeWidth={2.2} className="flow-arrow shrink-0" />
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

/**
 * Reusable Apple Primary Accent Pill Button ("View resume" reference style)
 * Accent fill with specular metallic gradient ring around the edge.
 */
export function PrimaryButton(props: AppleButtonProps) {
  return renderPillButton("primary", props)
}

export const ApplePrimaryButton = PrimaryButton

/**
 * Reusable Apple Primary Dark Pill Button ("Apply now" reference style)
 * Charcoal gradient, tinted ambient shadow, top specular highlight, squircle curvature.
 */
export function DarkButton(props: AppleButtonProps) {
  return renderPillButton("dark", props)
}

export const AppleDarkButton = DarkButton

/**
 * Reusable Apple Secondary Light Pill Button ("Read docs" reference style)
 * Alabaster gradient, refined border contrast, ambient floating shadow, squircle curvature.
 */
export function LightButton(props: AppleButtonProps) {
  return renderPillButton("light", props)
}

export const AppleLightButton = LightButton

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> {
  href: string
  className?: string
  children: ReactNode
}

/**
 * Single link with automatic external handling. Use for non-button links.
 */
export function AppLink({ href, className, children, ...rest }: Readonly<AppLinkProps>) {
  return (
    <a href={href} className={className} {...externalProps(href)} {...rest}>
      {children}
    </a>
  )
}

export function ActionButtons({ actions }: Readonly<{ actions: HeroAction[] }>) {
  return (
    <>
      {actions.map((action) =>
        action.type === "primary" ? (
          <PrimaryButton
            key={action.label}
            id={action.label.toLowerCase().includes("resume") ? "btn-view-resume" : undefined}
            href={action.url}
            className="w-full min-[360px]:w-auto"
          >
            {action.label}
          </PrimaryButton>
        ) : (
          <LightButton
            key={action.label}
            id={action.label.toLowerCase().includes("work") ? "btn-view-works" : undefined}
            href={action.url}
            arrow
            className="w-full min-[360px]:w-auto"
          >
            {action.label}
          </LightButton>
        ),
      )}
    </>
  )
}
