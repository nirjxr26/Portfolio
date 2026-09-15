import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import { externalProps } from "@/utils/helpers"

type ButtonVariant = "primary" | "ghost"

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
 * Single pill button — `btn btn-primary/ghost` grammar from DESIGN-apple.md.
 * Auto-applies external link props (target/rel) so callers drop `externalProps()` spreads.
 * 0 UI change: same classes, same DOM (`a` when href, `button` otherwise).
 */
export function AppButton({ variant = "primary", className = "", children, ...rest }: AppButtonProps) {
  const classes = `btn btn-${variant} ${className}`.trim()

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
