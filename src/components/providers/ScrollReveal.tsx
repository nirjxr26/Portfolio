import { useEffect } from "react"
import { useInternalRouter } from "@/app/router/useInternalRouter"

export function ScrollReveal() {
  const pathname = useInternalRouter()

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let rafId: number | null = null

    const attach = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const revealElements = document.querySelectorAll(".reveal-on-scroll")
        if (revealElements.length === 0) return

        if (!observer) {
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
        }

        const vh = window.innerHeight || 900
        revealElements.forEach((el) => {
          if (el.classList.contains("is-visible")) return
          const rect = el.getBoundingClientRect()
          if (rect.top < vh * 0.96 && rect.bottom > 0) {
            el.classList.add("is-visible")
          } else {
            observer?.observe(el)
          }
        })
      })
    }

    attach()

    let mutationObserver: MutationObserver | null = null
    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (
              node instanceof Element &&
              (node.classList.contains("reveal-on-scroll") || node.querySelector(".reveal-on-scroll"))
            ) {
              attach()
              return
            }
          }
        }
      })
      mutationObserver.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (observer) observer.disconnect()
      if (mutationObserver) mutationObserver.disconnect()
    }
  }, [pathname])

  return null
}
