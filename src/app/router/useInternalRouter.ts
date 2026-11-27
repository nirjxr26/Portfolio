import { useSyncExternalStore } from "react"
import { isInternalRoute } from "@/app/router/routes"
import { prefetchRoute } from "@/app/router/prefetch"
import { isStaticAsset, safeHref } from "@/lib/helpers"

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
  window.history.pushState({}, "", to)
  notify()
  window.scrollTo({ top: 0, left: 0, behavior: "instant" })
}

export function navigate(to: string) {
  if (typeof window === "undefined" || !safeHref(to)) return
  if (!isInternalRoute(to) && !/^(https?:|mailto:|tel:)/i.test(to)) return
  const currentFull = window.location.pathname + window.location.search + window.location.hash
  if (currentFull === to) return
  if (!isInternalRoute(to)) {
    window.location.href = to
    return
  }
  performNavigation(to)
}

function bindRouterListeners() {
  const onPopState = () => {
    notify()
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }

  const scrollToHash = (hash: string) => {
    const el = document.getElementById(hash)
    if (!el) return false
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", `#${hash}`)
    return true
  }

  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const target = (e.target as HTMLElement).closest("a")
    if (!target) return
    const href = target.getAttribute("href")
    if (!href || !safeHref(href)) return

    if (isStaticAsset(href)) return

    const isExternalLink =
      target.target === "_blank" ||
      target.hasAttribute("download") ||
      target.getAttribute("rel") === "external"
    if (isExternalLink) return

    if (href.startsWith("#")) {
      const hash = href.slice(1)
      if (hash && scrollToHash(hash)) e.preventDefault()
      return
    }

    if (!isInternalRoute(href)) return
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      const currentClean = window.location.pathname.replace(/\/$/, "") || "/"
      const targetClean = path.replace(/\/$/, "") || "/"

      if (currentClean === targetClean && hash && scrollToHash(hash)) {
        e.preventDefault()
        return
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
  }

  const prefetchTarget = (e: Event) => {
    const el = e.target
    if (!(el instanceof Element)) return
    const anchor = el.closest("a")
    if (!anchor) return
    const href = anchor.getAttribute("href")
    if (href && safeHref(href)) prefetchRoute(href)
  }

  window.addEventListener("popstate", onPopState)
  document.addEventListener("click", onClick)
  document.addEventListener("pointerover", prefetchTarget, { passive: true })
  document.addEventListener("focusin", prefetchTarget, { passive: true })
  document.addEventListener("touchstart", prefetchTarget, { passive: true })

  return () => {
    window.removeEventListener("popstate", onPopState)
    document.removeEventListener("click", onClick)
    document.removeEventListener("pointerover", prefetchTarget)
    document.removeEventListener("focusin", prefetchTarget)
    document.removeEventListener("touchstart", prefetchTarget)
  }
}

let unbindRouter: (() => void) | undefined
if (typeof window !== "undefined") {
  unbindRouter = bindRouterListeners()
  import.meta.hot?.dispose(() => unbindRouter?.())
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

/** Full URL snapshot: query-only changes still notify subscribers. */
function getUrlSnapshot() {
  return currentUrl
}

function getUrlServerSnapshot() {
  return "/"
}

export function useInternalUrl() {
  return useSyncExternalStore(subscribe, getUrlSnapshot, getUrlServerSnapshot)
}
