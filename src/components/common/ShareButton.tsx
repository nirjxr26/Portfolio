import type { ReactNode } from "react"

interface ShareButtonProps {
  label: string
  href?: string
  onClick?: () => void
  children: ReactNode
}

const SHARE_BUTTON_CLASSES =
  "flex h-8 w-8 items-center justify-center rounded-full bg-surface-alt text-muted transition-colors hover:bg-card hover:text-ink"

/**
 * Single circular share button — same classes for WhatsApp/X/Mail/Copy.
 * Renders `a` when href, `button` when onClick. 0 UI change.
 */
export function ShareButton({ label, href, onClick, children }: Readonly<ShareButtonProps>) {
  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:")
    return (
      <a
        href={href}
        aria-label={label}
        className={SHARE_BUTTON_CLASSES}
        {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} className={SHARE_BUTTON_CLASSES}>
      {children}
    </button>
  )
}
