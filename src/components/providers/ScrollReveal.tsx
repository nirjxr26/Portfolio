import { useEffect } from "react"

export function ScrollReveal() {
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let rafId: number | null = null

    rafId = requestAnimationFrame(() => {
      const revealElements = document.querySelectorAll(
        ".reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-from-bottom",
      )

      if (revealElements.length === 0) return

      const observerCallback: IntersectionObserverCallback = (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            obs.unobserve(entry.target)
          }
        })
      }

      observer = new IntersectionObserver(observerCallback, {
        root: null,
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      })

      const windowHeight = window.innerHeight

      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        // If element is already within the viewport on mount, reveal immediately
        if (rect.top < windowHeight && rect.bottom > 0) {
          el.classList.add("is-visible")
        } else {
          observer?.observe(el)
        }
      })
    })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (observer) observer.disconnect()
    }
  }, [])

  return null
}
