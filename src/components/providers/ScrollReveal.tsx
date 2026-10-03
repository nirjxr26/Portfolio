import { useEffect } from "react"
import { useInternalRouter } from "@/utils/useInternalRouter"

export function ScrollReveal() {
  const pathname = useInternalRouter()

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let rafId: number | null = null

    rafId = requestAnimationFrame(() => {
      const revealElements = document.querySelectorAll(".reveal-on-scroll")

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
        rootMargin: "0px 0px -30px 0px",
      })

      revealElements.forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          observer?.observe(el)
        }
      })
    })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (observer) observer.disconnect()
    }
  }, [pathname])

  return null
}
