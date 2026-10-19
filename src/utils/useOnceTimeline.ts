import { useCallback, useEffect, useRef, useState } from "react"

/**
 * A clock that plays once and then stops.
 *
 * `useLoopingTimeline` is the wrong shape for a playback that should *end*: it
 * rebases on every loop and on every viewport entry, so a visitor who comes
 * back to it never sees the ending, and it keeps burning frames on a finished
 * pass. This one runs from `restart()` to the end of `durationMs`, publishes the
 * final value once, and stops — no further frames, no further state.
 *
 * Restarting is explicit rather than automatic so the caller decides what a
 * replay means: here, selecting the tab again. Re-entering the viewport does
 * not restart it, because a mockup that replays itself every time it is
 * scrolled past is not a mockup, it is a loop.
 */
export function useOnceTimeline<T extends HTMLElement>(durationMs: number) {
  const ref = useRef<T>(null)
  const [elapsed, setElapsed] = useState(0)
  const [run, setRun] = useState(0)

  const restart = useCallback(() => {
    setElapsed(0)
    setRun((previous) => previous + 1)
  }, [])

  useEffect(() => {
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = now - start
      if (t >= durationMs) {
        // Publish the end once and stop. Nothing reschedules from here.
        setElapsed(durationMs)
        return
      }
      setElapsed(t)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [durationMs, run])

  return { ref, elapsed, restart, durationMs }
}