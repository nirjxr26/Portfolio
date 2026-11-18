import { useEffect } from "react"

/**
 * iOS 26 Safari paints its own tint layer over the status bar and notch. It
 * samples the root background, so a page whose top section is lighter than
 * `--canvas` shows a hard band above the content. Keep `html`, `body` and the
 * theme-color tag on the colour of whatever sits under the top edge, so the
 * notch reads as part of the page.
 *
 * Browsers that do not paint that layer (desktop, Android) see no change: the
 * sampled colour only ever equals a section that already paints there.
 */
export function useNotchTint() {
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    let frame = 0

    const isVisibleColor = (color: string) =>
      color !== "" && color !== "transparent" && !/,\s*0\)$/.test(color)

    const sample = () => {
      frame = 0
      const header = document.querySelector("header")
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0
      const y = Math.min(window.innerHeight - 1, Math.max(8, headerBottom + 8))
      let node = document.elementFromPoint(window.innerWidth / 2, y)
      let color = ""

      while (node && !color) {
        const background = getComputedStyle(node).backgroundColor
        if (isVisibleColor(background)) color = background
        node = node.parentElement
      }

      if (!color) color = getComputedStyle(root).getPropertyValue("--canvas").trim()

      root.style.backgroundColor = color
      body.style.backgroundColor = color
      document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
        meta.setAttribute("content", color)
      })
    }

    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(sample)
    }

    // The header is hidden with `display: none` while scrolling down, so the
    // sample below it hits page content rather than the fixed bar.
    const observer = new MutationObserver(schedule)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })

    sample()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (frame) window.cancelAnimationFrame(frame)
      root.style.removeProperty("background-color")
      body.style.removeProperty("background-color")
    }
  }, [])
}
