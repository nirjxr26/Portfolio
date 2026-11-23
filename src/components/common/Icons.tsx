import type { ReactNode } from "react"

interface IconProps {
  className?: string
  width?: number
  height?: number
  strokeWidth?: number
}

type StrokeIconProps = IconProps & { children: ReactNode; viewBox?: string }

function StrokeIcon({
  className = "",
  width = 24,
  height = 24,
  strokeWidth = 2,
  viewBox = "0 0 24 24",
  children,
}: Readonly<StrokeIconProps>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function ArrowUpRight({
  className = "",
  width = 24,
  height = 24,
  strokeWidth = 2,
}: Readonly<IconProps>) {
  const sizeClasses = className.includes("w-") && className.includes("h-") ? "" : "w-6 h-6 sm:w-5 sm:h-5"
  return (
    <StrokeIcon
      className={`${sizeClasses} ${className}`.trim()}
      width={width}
      height={height}
      strokeWidth={strokeWidth}
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </StrokeIcon>
  )
}

export function ArrowRight({ className = "", width = 14, height = 14, strokeWidth = 2 }: Readonly<IconProps>) {
  return (
    <StrokeIcon className={className} width={width} height={height} strokeWidth={strokeWidth}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </StrokeIcon>
  )
}

const CHEVRON_PATHS = {
  down: "m6 9 6 6 6-6",
  left: "m15 18-6-6 6-6",
  right: "m9 18 6-6-6-6",
} as const

function Chevron({ direction, ...props }: Readonly<IconProps & { direction: keyof typeof CHEVRON_PATHS }>) {
  return (
    <StrokeIcon {...props}>
      <path d={CHEVRON_PATHS[direction]} />
    </StrokeIcon>
  )
}

export function ChevronDown(props: Readonly<IconProps>) {
  return <Chevron {...props} direction="down" />
}

export function ChevronLeft(props: Readonly<IconProps>) {
  return <Chevron {...props} direction="left" />
}

export function ChevronRight(props: Readonly<IconProps>) {
  return <Chevron {...props} direction="right" />
}

export function HomeIcon({ className = "", width = 16, height = 16 }: Readonly<IconProps>) {
  return (
    <StrokeIcon className={className} width={width} height={height}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </StrokeIcon>
  )
}

export function CopyIcon({ className = "", width = 14, height = 14, strokeWidth = 2 }: Readonly<IconProps>) {
  return (
    <StrokeIcon className={className} width={width} height={height} strokeWidth={strokeWidth}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" />
    </StrokeIcon>
  )
}

export function CheckIcon({ className = "", width = 14, height = 14, strokeWidth = 2 }: Readonly<IconProps>) {
  return (
    <StrokeIcon className={className} width={width} height={height} strokeWidth={strokeWidth}>
      <path d="M5 12l5 5L20 7" />
    </StrokeIcon>
  )
}

export function BotIcon({ className = "", width = 14, height = 14, strokeWidth = 1.8 }: Readonly<IconProps>) {
  return (
    <StrokeIcon className={className} width={width} height={height} strokeWidth={strokeWidth}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </StrokeIcon>
  )
}

export function ShareIcon({ className = "", width = 16, height = 16, strokeWidth = 2 }: Readonly<IconProps>) {
  return (
    <StrokeIcon className={className} width={width} height={height} strokeWidth={strokeWidth}>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </StrokeIcon>
  )
}

export function CopySwapIcon({
  copied,
  width = 14,
  height = 14,
  className = "",
  checkClassName = "text-accent",
}: Readonly<IconProps & { copied: boolean; checkClassName?: string }>) {
  return (
    <span className={`icon-swap${copied ? " is-copied" : ""} ${className}`.trim()} aria-hidden="true">
      <span className="icon-swap-out">
        <CopyIcon width={width} height={height} />
      </span>
      <span className="icon-swap-in">
        <CheckIcon width={width} height={height} className={checkClassName} />
      </span>
    </span>
  )
}



export function SearchIcon({ className = "", width = 16, height = 16, strokeWidth = 2 }: Readonly<IconProps>) {
  return (
    <StrokeIcon width={width} height={height} strokeWidth={strokeWidth} className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </StrokeIcon>
  )
}
