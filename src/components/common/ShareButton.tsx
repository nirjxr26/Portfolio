import type { ReactNode } from "react"
import { externalProps } from "@/utils/helpers"

interface ShareButtonProps {
  label: string
  href?: string
  onClick?: () => void
  children: ReactNode
}

export function ShareButton({ label, href, onClick, children }: Readonly<ShareButtonProps>) {
  if (href) {
    return (
      <a
        href={href}
        aria-label={label}
        className="btn-icon h-8 w-8 hit-area"
        {...externalProps(href)}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} className="btn-icon h-8 w-8">
      {children}
    </button>
  )
}
