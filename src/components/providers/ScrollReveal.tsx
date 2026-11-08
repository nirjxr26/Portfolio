import { useEffect } from "react"
import { useInternalRouter } from "@/utils/useInternalRouter"

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

        revealElements.forEach((el) => {
          if (!el.classList.contains("is-visible")) {
            observer?.observe(el)
          }
        })
      })
    }

    attach()

    const handleAgentChange = () => {
      // Re-scan when agent mode toggles so elements reveal immediately without refresh
      attach()
      setTimeout(attach, 100)
      setTimeout(attach, 300)
    }

    window.addEventListener("agent-mode-change", handleAgentChange)

    let mutationObserver: MutationObserver | null = null
    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(() => {
        attach()
      })
      mutationObserver.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (observer) observer.disconnect()
      if (mutationObserver) mutationObserver.disconnect()
      window.removeEventListener("agent-mode-change", handleAgentChange)
    }
  }, [pathname])

  return null
}
