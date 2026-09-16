import { useEffect, useState } from "react"
import { isInternalRoute } from "@/data/routes"

export function useInternalRouter() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })

    const handlePopState = () => {
      setPathname(window.location.pathname)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }

    const scrollToHash = (hash: string) => {
      const el = document.getElementById(hash)
      if (!el) return false
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", `#${hash}`)
      return true
    }

    const handleHashLink = (e: MouseEvent, href: string) => {
      if (!href.startsWith("#")) return false
      const hash = href.slice(1)
      if (!hash || !scrollToHash(hash)) return false
      e.preventDefault()
      return true
    }

    const handleSamePageHash = (e: MouseEvent, href: string) => {
      if (!href.includes("#")) return false
      const [path, hash] = href.split("#")
      const currentClean = window.location.pathname.replace(/\/$/, "") || "/"
      const targetClean = path.replace(/\/$/, "") || "/"
      if (currentClean !== targetClean || !hash || !scrollToHash(hash)) return false
      e.preventDefault()
      return true
    }

    const handleLinkClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (!href) return
      const isStaticFile = /\.(pdf|png|jpg|jpeg|svg|webp|xml|txt|json|zip)$/i.test(href) || href.startsWith("/assets/")
      const isExternalLink = target.target === "_blank" || target.hasAttribute("download") || target.getAttribute("rel") === "external"
      if (isStaticFile || isExternalLink) {
        return
      }
      if (handleHashLink(e, href) || !isInternalRoute(href) || handleSamePageHash(e, href)) return
      e.preventDefault()
      window.history.pushState({}, "", href)
      setPathname(href.split("#")[0])
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }

    window.addEventListener("popstate", handlePopState)
    document.addEventListener("click", handleLinkClick)
    return () => {
      window.removeEventListener("popstate", handlePopState)
      document.removeEventListener("click", handleLinkClick)
    }
  }, [])

  return pathname
}
