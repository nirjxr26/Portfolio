import { useSyncExternalStore } from "react"
import { isInternalRoute } from "@/data/routes"

let currentPath = typeof window !== "undefined" ? window.location.pathname : "/"
const listeners = new Set<() => void>()

function notify() {
  if (typeof window === "undefined") return
  const next = window.location.pathname
  if (currentPath !== next) {
    currentPath = next
    listeners.forEach((listener) => listener())
  }
}

export function navigate(to: string) {
  if (typeof window === "undefined") return
  const currentFull = window.location.pathname + window.location.search + window.location.hash
  if (currentFull === to) return
  window.history.pushState({}, "", to)
  notify()
  window.scrollTo({ top: 0, left: 0, behavior: "instant" })
}

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    notify()
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  })

  const scrollToHash = (hash: string) => {
    const el = document.getElementById(hash)
    if (!el) return false
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", `#${hash}`)
    return true
  }

  // Single global click delegator for client-side routing
  document.addEventListener("click", (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const target = (e.target as HTMLElement).closest("a")
    if (!target) return
    const href = target.getAttribute("href")
    if (!href) return

    const isStaticFile =
      /\.(pdf|png|jpg|jpeg|svg|webp|xml|txt|json|zip)$/i.test(href) ||
      href.startsWith("/assets/")
    const isExternalLink =
      target.target === "_blank" ||
      target.hasAttribute("download") ||
      target.getAttribute("rel") === "external"
    if (isStaticFile || isExternalLink) {
      return
    }

    // Pure hash link on current page (e.g. "#what-i-do")
    if (href.startsWith("#")) {
      const hash = href.slice(1)
      if (hash && scrollToHash(hash)) {
        e.preventDefault()
      }
      return
    }

    if (!isInternalRoute(href)) return

    // Route with hash (e.g. "/#what-i-do" or "/works#grid")
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      const currentClean = window.location.pathname.replace(/\/$/, "") || "/"
      const targetClean = path.replace(/\/$/, "") || "/"

      if (currentClean === targetClean) {
        if (hash && scrollToHash(hash)) {
          e.preventDefault()
          return
        }
      }

      // Navigating across pages to a hash
      e.preventDefault()
      window.history.pushState({}, "", href)
      notify()
      requestAnimationFrame(() => {
        if (hash) {
          const el = document.getElementById(hash)
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
            return
          }
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      })
      return
    }

    // Standard internal SPA navigation
    e.preventDefault()
    window.history.pushState({}, "", href)
    notify()
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  })
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

function getSnapshot() {
  return currentPath
}

function getServerSnapshot() {
  return "/"
}

export function useInternalRouter() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
