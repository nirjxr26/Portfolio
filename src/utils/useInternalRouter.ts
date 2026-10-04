import { useSyncExternalStore } from "react"
import { isInternalRoute } from "@/data/routes"
import { isStaticAsset } from "./helpers"

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
  document.addEventListener("click", (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const target = (e.target as HTMLElement).closest("a")
    if (!target) return
    const href = target.getAttribute("href")
    if (!href) return

    if (isStaticAsset(href)) return

    const isExternalLink =
      target.target === "_blank" ||
      target.hasAttribute("download") ||
      target.getAttribute("rel") === "external"
    if (isExternalLink) {
      return
    }
    if (href.startsWith("#")) {
      const hash = href.slice(1)
      if (hash && scrollToHash(hash)) {
        e.preventDefault()
      }
      return
    }

    if (!isInternalRoute(href)) return
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
