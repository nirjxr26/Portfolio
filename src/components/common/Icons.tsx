interface IconProps {
  className?: string
  width?: number
  height?: number
  strokeWidth?: number
}

export function ArrowUpRight({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      width={24}
      height={24}
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

export function ArrowRight({ className = "", width = 14, height = 14 }: Readonly<IconProps>) {
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
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function ChevronDown({ className = "", width = 16, height = 16, strokeWidth = 2 }: Readonly<IconProps>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function HomeIcon({ className = "", width = 16, height = 16 }: Readonly<IconProps>) {
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
      className={className}
      aria-hidden="true"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export function ClockIcon({ className = "", width = 14, height = 14, strokeWidth = 2 }: Readonly<IconProps>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export function CopyIcon({ className = "", width = 14, height = 14, strokeWidth = 2 }: Readonly<IconProps>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" />
    </svg>
  )
}

export function CheckIcon({ className = "", width = 14, height = 14, strokeWidth = 2 }: Readonly<IconProps>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
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

export function MailIcon({ className = "", width = 16, height = 16, strokeWidth = 1.8 }: Readonly<IconProps>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2.5 6l9.5 8 9.5-8" />
    </svg>
  )
}

export function LinkIcon({ className = "", width = 16, height = 16, strokeWidth = 2 }: Readonly<IconProps>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7 0l1-1a5 5 0 0 0 0-7 5 5 0 0 0-7 0l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-1 1a5 5 0 0 0 0 7 5 5 0 0 0 7 0l1-1" />
    </svg>
  )
}

// Artwork from public/assets/icons/whatsapp-svgrepo-com.svg (SVG Repo) — inlined
// so it keeps the component API (size via props) and inherits the parent text
// color via currentColor (the file's fixed black would vanish on dark theme
// and kill the share buttons' hover tint).
export function WhatsAppIcon({ className = "", width = 16, height = 16 }: Readonly<IconProps>) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z" />
      <path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z" />
    </svg>
  )
}

export function XIcon({ className = "", width = 14, height = 14 }: Readonly<IconProps>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932M17.61 20.644h2.039L6.486 3.24H4.298z" />
    </svg>
  )
}

export function RssIcon({ className = "", width = 14, height = 14 }: Readonly<IconProps>) {
  return (
    <svg width={width} height={height} viewBox="0 0 10 10" fill="currentColor" className={className} aria-hidden="true">
      <g transform="translate(-209 -3484)" fillRule="evenodd">
        <path d="M209,3492 L209,3494 L210.971803,3494 C210.971803,3492.895 210.089421,3492 209,3492 M209,3488 L209,3490 C210.971803,3490 213.08459,3492 213.08459,3494 L215.056394,3494 C215.056394,3491 211.957705,3488 209,3488 M219,3494 L217.028197,3494 C217.028197,3490 212.943606,3486 209,3486 L209,3484 C213.929508,3484 219,3488 219,3494" />
      </g>
    </svg>
  )
}
