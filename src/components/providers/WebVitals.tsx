import { useEffect } from "react"

export function WebVitals() {
  useEffect(() => {
    // Lightweight Web Vitals performance audit logger (privacy-preserving, no trackers)
    if ("performance" in window && "getEntriesByType" in performance) {
      const paintEntries = performance.getEntriesByType("paint")
      paintEntries.forEach((entry) => {
        if (import.meta.env.DEV) {
          console.log(`[Performance Audit] ${entry.name}: ${entry.startTime.toFixed(2)}ms`)
        }
      })
    }
  }, [])

  return null
}
