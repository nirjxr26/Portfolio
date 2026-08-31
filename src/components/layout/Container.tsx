import { ReactNode } from "react"

export function Container({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`mx-auto max-w-7xl px-4 min-[414px]:px-6 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}
