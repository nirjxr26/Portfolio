interface IconProps {
  className?: string
  width?: number
  height?: number
}

export function ArrowUpRight({ className = "", width = 20, height = 20 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-6 h-6 sm:w-5 sm:h-5 ${className}`}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}
