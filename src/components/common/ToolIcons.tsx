interface ToolIconProps {
  name: string
  className?: string
  width?: number
  height?: number
}

export function ToolIcon({ name, className = "", width = 24, height = 24 }: Readonly<ToolIconProps>) {
  const iconKey = name.toLowerCase().replace(/[^a-z0-9]/g, "")

  switch (iconKey) {
    case "go":
    case "golang":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M3 12.5c0-2.5 2-4.5 4.5-4.5 1.5 0 2.8.7 3.6 1.8l-1.8 1.4c-.4-.7-1-1.2-1.8-1.2-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c1 0 1.8-.6 2.2-1.5H7.5v-2h6.1c.1.4.1.8.1 1.2 0 3-2.3 5.3-5.5 5.3C4.8 18 3 15.6 3 12.5zM17.5 8c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm0 2c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"
            fill="currentColor"
          />
        </svg>
      )

    case "python":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M11.9 2c-4 0-3.8 1.7-3.8 1.7l.1 1.8h3.8v.5H6.6S4 5.7 4 9.8s2.3 4 2.3 4l1.3-.1v-1.9s-.1-2.3 2.3-2.3h3.9s2.2.1 2.2-2.1V4.2S16.5 2 11.9 2zm-1.8 1.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm1.9 18.7c4 0 3.8-1.7 3.8-1.7l-.1-1.8h-3.8v-.5h5.4s2.6.3 2.6-3.8-2.3-4-2.3-4l-1.3.1v1.9s.1 2.3-2.3 2.3H10s-2.2-.1-2.2 2.1v3.2s-.5 2.2 4.1 2.2zm1.8-1.3c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
        </svg>
      )

    case "typescript":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M3 3h18v18H3V3zm8.5 7.5h-5v2h1.4v6.5h2.2v-6.5h1.4v-2zm7 3.8c-.3-.2-.7-.4-1.2-.5l-.8-.2c-.5-.1-.8-.3-1-.4-.2-.1-.2-.3-.2-.5 0-.2.1-.4.3-.5.2-.1.5-.2.9-.2.4 0 .8.1 1.1.3.3.2.5.5.6.9l1.9-.9c-.3-.7-.7-1.2-1.3-1.6-.6-.4-1.4-.6-2.3-.6-.9 0-1.7.2-2.3.7-.6.5-1 1.1-1 1.9 0 .6.2 1.1.5 1.5.4.4.9.7 1.6.9l.9.2c.5.1.9.3 1.1.5.2.2.3.4.3.7 0 .3-.1.5-.4.7-.3.2-.7.3-1.2.3-.6 0-1.1-.1-1.5-.4-.4-.3-.7-.7-.8-1.3l-1.9.8c.3.9.8 1.6 1.5 2.1.7.5 1.6.7 2.7.7 1.1 0 2-.3 2.7-.8.7-.5 1-1.2 1-2.1 0-.7-.3-1.3-.8-1.7z" />
        </svg>
      )

    case "bash":
    case "shell":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      )

    case "kubernetes":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2a1 1 0 0 0-.45.1l-7 4A1 1 0 0 0 4 7v8a1 1 0 0 0 .55.9l7 4a1 1 0 0 0 .9 0l7-4A1 1 0 0 0 20 15V7a1 1 0 0 0-.55-.9l-7-4A1 1 0 0 0 12 2zm0 2.2 5.5 3.1-2.1 1.2-3.4-1.9-3.4 1.9-2.1-1.2L12 4.2zM6 8.3l2.1 1.2v3.8L6 14.5V8.3zm12 0v6.2l-2.1-1.2V9.5L18 8.3zm-6 2.5 3 1.7-3 1.7-3-1.7 3-1.7zm-2.1 4.5 2.1 1.2 2.1-1.2 2.1 1.2-4.2 2.4-4.2-2.4 2.1-1.2z" />
        </svg>
      )

    case "docker":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M13.9 10.7h-2.1v2.1h2.1v-2.1zm-2.7 0H9.1v2.1h2.1v-2.1zm5.3 0h-2.1v2.1h2.1v-2.1zm-8 0H6.4v2.1h2.1v-2.1zm5.4-2.7h-2.1v2.1h2.1V8zm-2.7 0H9.1v2.1h2.1V8zm5.4 0h-2.1v2.1h2.1V8zm2.7 2.7h-2.1v2.1h2.1v-2.1zm-2.7-5.4h-2.1v2.1h2.1V5.3zm8.3 7.8c-.4-.3-1.5-.7-2.6-.5-.3-1.2-1.3-1.9-2.5-1.9-.3 0-.6.1-.8.2-.1-1.8-1.5-2.9-1.5-2.9l-.6.6s1.2 1.3 1.2 2.6H2.1c-.6 1.8-.4 4.3 1.1 6.1C5 21.6 7.9 22 10.9 22c5.6 0 9.8-3 11-7.7.8-.1 1.7-.5 1.7-.5s-.8-1-1.3-.7z" />
        </svg>
      )

    case "argocd":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
        </svg>
      )

    case "helm":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.5" />
          <line x1="12" y1="2" x2="12" y2="9.5" />
          <line x1="12" y1="14.5" x2="12" y2="22" />
          <line x1="2" y1="12" x2="9.5" y2="12" />
          <line x1="14.5" y1="12" x2="22" y2="12" />
          <line x1="4.9" y1="4.9" x2="10.2" y2="10.2" />
          <line x1="13.8" y1="13.8" x2="19.1" y2="19.1" />
          <line x1="4.9" y1="19.1" x2="10.2" y2="13.8" />
          <line x1="13.8" y1="10.2" x2="19.1" y2="4.9" />
        </svg>
      )

    case "aws":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M7.7 11.2c0-1.1.7-1.8 1.9-1.8 1.1 0 1.8.6 1.8 1.6v3.2c0 .6.2.9.7.9.3 0 .6-.1.8-.3v1.1c-.3.2-.8.3-1.3.3-1.1 0-1.5-.7-1.5-1.5-.5.9-1.3 1.5-2.4 1.5-1.3 0-2.3-.9-2.3-2.3 0-1.6 1.2-2.5 2.3-2.7zm2.3 1.9v-.7c0-.6-.4-1-1.2-1-.7 0-1.2.4-1.2 1.1 0 .7.4 1.2 1.2 1.2.6 0 1.2-.3 1.2-.6zm5.8-3.9h1.5l1.4 5.3 1.5-5.3h1.4l-2.2 7h-1.4l-1.4-5.2-1.4 5.2h-1.4l-2.2-7h1.4l1.5 5.3 1.4-5.3zm-12.7 11c5.2 2.6 11.3 2.6 16.5 0 .4-.2.8.2.5.5-5.5 3.3-12.2 3.3-17.6 0-.3-.2 0-.6.6-.5z" />
        </svg>
      )

    case "linux":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2C9.5 2 8 3.5 8 6.5v2.2C6.7 9.5 5 11.2 5 13.5c0 2 1.2 3.6 2.8 4.2C8.3 19.3 10 20.5 12 20.5s3.7-1.2 4.2-2.8c1.6-.6 2.8-2.2 2.8-4.2 0-2.3-1.7-4-3-4.8V6.5C16 3.5 14.5 2 12 2zm-1.5 5c.4 0 .7.3.7.8s-.3.7-.7.7-.8-.3-.8-.7.4-.8.8-.8zm3 0c.4 0 .8.3.8.8s-.4.7-.8.7-.7-.3-.7-.7.3-.8.7-.8zm-3 8c1.8 0 3-1 3-2.5h-6c0 1.5 1.2 2.5 3 2.5z" />
        </svg>
      )

    case "cloudflare":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M18.8 11.4c-.4-2.5-2.5-4.4-5-4.4-2.1 0-3.9 1.3-4.7 3.1-.5-.2-1-.3-1.6-.3-2.5 0-4.5 2-4.5 4.5 0 .2 0 .4.1.6C1.4 15.3.2 16.8.2 18.6c0 2.2 1.8 4 4 4h14.5c2.4 0 4.3-1.9 4.3-4.3 0-2.1-1.5-3.8-3.5-4.2-.1-.9-.4-1.9-.7-2.7z" />
        </svg>
      )

    case "sonarqube":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M4 12a8 8 0 0 1 14.9-4" />
          <path d="M7 12a5 5 0 0 1 9.3-2.5" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path d="M20 12a8 8 0 0 1-14.9 4" />
        </svg>
      )

    case "trivy":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )

    case "wireguard":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.9V9.1l4 3.9zm-2-9.8v7.8l-4-3.9z" />
        </svg>
      )

    case "codeql":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <path d="m8 11 2 2 4-4" />
        </svg>
      )

    case "postgresql":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6 9.1v-3.2c-1-.3-1.8-1-2.2-1.9-.4-.9-.3-2 .2-2.8.5-.7 1.3-1.2 2.2-1.2h.8v-2.3C9 8.2 10.3 7 12 7s3 1.2 3 2.7v2.3h.8c.9 0 1.7.5 2.2 1.2.5.8.6 1.9.2 2.8-.4.9-1.2 1.6-2.2 1.9v3.2c3.5-1.5 6-5 6-9.1 0-5.5-4.5-10-10-10z" />
        </svg>
      )

    case "redis":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M21.5 8.2 12 3.4 2.5 8.2l9.5 4.8 9.5-4.8zM2.5 12l9.5 4.8 9.5-4.8v3.8L12 20.6 2.5 15.8V12z" />
        </svg>
      )

    case "sqlite":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </svg>
      )

    case "prometheus":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2c-.6 2.4-1.8 4.2-3.3 6.1-1.6 2-3.3 4.3-3.3 7.5 0 4.1 3 7.4 6.6 7.4s6.6-3.3 6.6-7.4c0-4.1-3.2-6.6-4.5-8.8-1.2-2.1-1.6-3.8-2.1-4.8zm0 17c-1.7 0-3-1.3-3-3 0-1.6 1.5-2.7 2.3-3.8.4.8.7 1.6.7 2.3 0 .8.6 1.5 1.5 1.5.3 0 .6-.1.8-.3-.2 1.9-1 3.3-2.3 3.3z" />
        </svg>
      )

    case "opentelemetry":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="5" cy="18" r="2" />
          <path d="m14 10 3.5-2.5M6.5 16.5 10 14" />
        </svg>
      )

    case "githubactions":
    case "github":
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )

    default:
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
  }
}
