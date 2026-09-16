import { useCallback, useEffect, useRef, useState } from "react"

async function copyWithFallback(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
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
