import { useEffect } from "react"
import { THEME_DARK_CLASS } from "@/lib/helpers"

/**
 * Keeps the strip behind the status bar and notch on a solid colour: pure
 * black in the dark theme, pure white in the light theme. It never follows the
 * section under the top edge, so scrolling to a lighter or darker section
 * cannot change the colour behind the notch.
 *
 * iOS 26 Safari paints its own tint layer over the status bar and samples the
 * root background. `html`, `body` and the `theme-color` tags are kept in sync
 * with the theme, so that layer always resolves to the same colour.
 */
export function useNotchTint() {
  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    // Probes the resolved safe-area inset. `env()` cannot be read from CSS
    // directly, and Android reports 0 even when installed. Absolute, not
    // fixed: iOS Safari samples fixed elements for its status-bar tint.
    const probe = document.createElement("div")
    probe.setAttribute("aria-hidden", "true")
    probe.style.cssText =
      "position:absolute;top:0;left:0;width:0;height:0;padding-top:env(safe-area-inset-top,0px);visibility:hidden;pointer-events:none"

    const measureInset = () => {
      const inset = Number.parseFloat(getComputedStyle(probe).paddingTop) || 0
      root.classList.toggle("has-notch", inset > 0)
    }

    const applyThemeColor = () => {
      const color = root.classList.contains(THEME_DARK_CLASS) ? "#000000" : "#ffffff"
      root.style.backgroundColor = color
      body.style.backgroundColor = color
      document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
        meta.setAttribute("content", color)
      })
    }

    // `ThemeToggle` flips the theme by toggling the class on `<html>`.
    const observer = new MutationObserver(applyThemeColor)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })

    body.appendChild(probe)
    measureInset()
    applyThemeColor()
    window.addEventListener("resize", measureInset)
    window.addEventListener("orientationchange", measureInset)

    return () => {
      observer.disconnect()
      probe.remove()
      root.classList.remove("has-notch")
      window.removeEventListener("resize", measureInset)
      window.removeEventListener("orientationchange", measureInset)
      root.style.removeProperty("background-color")
      body.style.removeProperty("background-color")
    }
  }, [])
}
