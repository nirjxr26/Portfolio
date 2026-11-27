import { useEffect, useState } from "react"
import { THEME_DARK_CLASS, toggleTheme } from "@/lib/helpers"

export function ThemeToggle({ className = "", iconSize = 17 }: Readonly<{ className?: string; iconSize?: number }>) {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains(THEME_DARK_CLASS)
      : true,
  )

  useEffect(() => {
    const syncTheme = () => {
      const isDark = document.documentElement.classList.contains(THEME_DARK_CLASS)
      setDark(isDark)
    }

    // Immediately sync state with actual DOM in case it changed prior to mounting
    syncTheme()

    // Listen to theme-change events dispatched from keyboard shortcuts or command palette
    window.addEventListener("theme-change", syncTheme)
    window.addEventListener("storage", syncTheme)

    return () => {
      window.removeEventListener("theme-change", syncTheme)
      window.removeEventListener("storage", syncTheme)
    }
  }, [])

  const defaultClasses = "flex h-8 w-8 items-center justify-center rounded-full text-muted transition-all hover:text-ink focus-visible:outline-2 focus-visible:outline-accent active:scale-95 hit-area cursor-pointer"

  const handleToggle = () => {
    setDark(toggleTheme())
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={className ? `flex items-center justify-center rounded-full transition-all focus-visible:outline-2 focus-visible:outline-accent active:scale-95 hit-area cursor-pointer ${className}` : defaultClasses}
    >
      {dark ? (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  )
}
