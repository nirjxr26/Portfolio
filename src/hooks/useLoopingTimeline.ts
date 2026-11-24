import { useEffect, useRef, useState } from "react"

/**
 * A looping clock that only advances while its element is on screen.
 *
 * Returns the ref to attach and the milliseconds elapsed in the current pass.
 * Three behaviours matter and all three are load-bearing:
 *
 *   - Frames are emitted on every animation frame, not at a fixed rate, so the
 *     motion lands on whatever the display actually refreshes at.
 *   - Elapsed is rebased to 0 on every loop *and* on every re-entry, so a
 *     visitor scrolling back in sees the beginning rather than a half-played
 *     pass. The `rAF` chain itself never stops, so a stray observer
 *     notification can never kill it.
 *   - While off-screen the clock holds and no re-render is scheduled, so a
 *     scrolled-past animation costs nothing.
 *
 * The consumer decides what a given elapsed value looks like; this only
 * supplies time.
 */
export function useLoopingTimeline<T extends HTMLElement>(cycleMs: number) {
  const ref = useRef<T>(null)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let raf = 0
    let visible = false
    let cycleStart = performance.now()

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return

      if (now - cycleStart >= cycleMs) {
        cycleStart = now
        setElapsed(0)
        return
      }
      setElapsed(now - cycleStart)
    }

    raf = requestAnimationFrame(tick)

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(entry?.isIntersecting)
        if (isVisible === visible) return
        visible = isVisible
        if (!visible) return

        cycleStart = performance.now()
        setElapsed(0)
      },
      { threshold: 0 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [cycleMs])

  return { ref, elapsed }
}
