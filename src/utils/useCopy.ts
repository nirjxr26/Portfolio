import { useCallback, useEffect, useRef, useState } from "react"

async function copyWithFallback(text: string) {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fallback
  }

  try {
    if (typeof document !== "undefined") {
      const ta = document.createElement("textarea")
      ta.value = text
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand("copy")
      document.body.removeChild(ta)
      return ok
    }
  } catch {
    return false
  }
  return false
}

/**
 * Single copy-to-clipboard hook — auto-resets `copied` after 2s.
 * Replaces duplicated handleCopyText/handleCopyLink + setTimeout logic.
 */
export function useCopy(timeoutMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  const copy = useCallback(
    async (text: string) => {
      await copyWithFallback(text)
      setCopied(true)
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), timeoutMs)
    },
    [timeoutMs],
  )

  return { copied, copy } as const
}
