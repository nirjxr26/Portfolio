import { ReactNode } from "react"

export function Container({
  children,
  className = "",
  size = "default",
}: Readonly<{
  children: ReactNode
  className?: string
  size?: "default" | "narrow" | "wide"
}>) {
  const widthClass = size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-6xl" : "max-w-7xl"
  return <div className={`mx-auto ${widthClass} page-gutter ${className}`}>{children}</div>
}
