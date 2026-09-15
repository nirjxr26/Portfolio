interface IconProps {
  className?: string
  width?: number
  height?: number
  strokeWidth?: number
}

export function ArrowUpRight({ className = "", width = 20, height = 20 }: Readonly<IconProps>) {
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

// Official brand marks — Simple Icons (MIT) — not custom-drawn
export function WhatsAppIcon({ className = "", width = 16, height = 16 }: Readonly<IconProps>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 10.91c0 1.57.41 3.1 1.19 4.45L2 22l6.81-1.32a9.86 9.86 0 0 0 3.23.55h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.41Zm-7.01 15.24h-.01c-1.32 0-2.62-.35-3.75-1.02l-.27-.16-4.04.78.79-3.94-.17-.28a8.13 8.13 0 0 1-1.25-4.32c0-4.49 3.66-8.15 8.16-8.15 2.18 0 4.23.85 5.77 2.39a8.11 8.11 0 0 1 2.39 5.76c0 4.49-3.66 8.15-8.15 8.15Zm6.54-5.95c-.36-.18-2.12-1.05-2.45-1.17-.33-.12-.57-.18-.81.18s-.93 1.17-1.14 1.41-.42.27-.78.09c-.36-.18-1.52-.56-2.9-1.78-1.07-.96-1.79-2.14-2-2.5-.21-.36-.02-.56.16-.74.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.61-.81-.62l-.69-.01c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.72.18.24 2.54 3.88 6.15 5.44.86.37 1.53.59 2.05.76.86.27 1.65.23 2.27.14.69-.1 2.12-.87 2.42-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42Z" />
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
