import type { ElementType, ReactNode } from "react"

interface BaseCardProps {
  as?: ElementType
  className?: string
  children: ReactNode
  [key: string]: unknown
}

const BASE_CARD_CLASSES = "rounded-[20px] flex flex-col justify-between apple-card-hover"

export const CAROUSEL_CARD_SIZE =
  "w-[270px] min-[375px]:w-[300px] min-[480px]:w-[340px] min-[577px]:w-[350px] md:w-[380px] lg:w-[400px] shrink-0 snap-start"

export const FEATURE_CARD_SIZE =
  "w-[270px] min-[375px]:w-[300px] min-[480px]:w-[340px] min-[577px]:w-[360px] md:w-[380px] lg:w-[400px] shrink-0 snap-start"

export const PROJECT_CARD_SIZE =
  "w-[280px] min-[375px]:w-[320px] min-[480px]:w-[360px] min-[577px]:w-[420px] md:w-[480px] lg:w-[520px] shrink-0 snap-start"

export const CARD_PADDING = "p-5 min-[375px]:p-6 sm:p-8"

export const CARD_HEIGHT = "h-[320px] min-h-[320px] sm:h-[350px] sm:min-h-[350px]"

export const PROJECT_CARD_HEIGHT =
  "h-[360px] min-h-[360px] min-[375px]:h-[380px] min-[375px]:min-h-[380px] sm:h-[350px] sm:min-h-[350px]"

export const PROJECT_CARD_PADDING = "p-6 min-[375px]:p-7 sm:p-9"

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
