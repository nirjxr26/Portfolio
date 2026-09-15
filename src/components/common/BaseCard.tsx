import type { ElementType, ReactNode } from "react"

interface BaseCardProps {
  as?: ElementType
  className?: string
  children: ReactNode
  [key: string]: unknown
}

const BASE_CARD_CLASSES = "rounded-[20px] flex flex-col justify-between apple-card-hover"

/**
 * Single card foundation — rounded + vertical spread + Apple hover.
 * Preserves exact DOM tag via `as` (`a` / `article` / `div`).
 * Size/padding/bg stay on callers so 0 UI change.
 */
export function BaseCard({ as: Tag = "div", className = "", children, ...rest }: Readonly<BaseCardProps>) {
  return (
    <Tag className={`${BASE_CARD_CLASSES} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
