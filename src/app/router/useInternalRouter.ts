import { useSyncExternalStore } from "react"
import { isInternalRoute } from "@/app/router/routes"
import { isStaticAsset } from "@/lib/helpers"

let currentPath = typeof window !== "undefined" ? window.location.pathname : "/"
let currentUrl =
  typeof window !== "undefined"
    ? window.location.pathname + window.location.search + window.location.hash
    : "/"
const listeners = new Set<() => void>()

function notify() {
  if (typeof window === "undefined") return
  const nextPath = window.location.pathname
  const nextUrl = nextPath + window.location.search + window.location.hash
  if (currentUrl !== nextUrl) {
    currentUrl = nextUrl
    currentPath = nextPath
    listeners.forEach((listener) => listener())
  }
}

function performNavigation(to: string) {
  const performUpdate = () => {
    window.history.pushState({}, "", to)
    notify()
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }

  const cleanTo = to.split("#")[0].replace(/\/$/, "") || "/"
  const isTransitionToLegal = cleanTo === "/legal"

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (
    isTransitionToLegal &&
    !reduceMotion &&
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    typeof document.startViewTransition === "function"
  ) {
    document.startViewTransition(performUpdate)
  } else {
    performUpdate()
  }
}

export function navigate(to: string) {
  if (typeof window === "undefined") return
  const currentFull = window.location.pathname + window.location.search + window.location.hash
  if (currentFull === to) return
  performNavigation(to)
}

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    const performUpdate = () => {
      notify()
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }
    const cleanCurrent = window.location.pathname.replace(/\/$/, "") || "/"
    const isTransitionToLegal = cleanCurrent === "/legal"
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (
      isTransitionToLegal &&
      !reduceMotion &&
      "startViewTransition" in document &&
      typeof document.startViewTransition === "function"
    ) {
      document.startViewTransition(performUpdate)
    } else {
      performUpdate()
    }
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
    performNavigation(href)
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
