import { StrictMode, useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import {
  CaseStudyPage,
  ErrorBoundary,
  HomeClient,
  NotFoundClient,
  WebVitals,
  WorksClient,
} from "@/components"
import { CASE_STUDIES } from "@/data/caseStudies"

// Theme & scroll initialization
if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual"
  }
  window.scrollTo(0, 0)

  const stored = localStorage.getItem("theme")
  if (
    stored === "dark" ||
    (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })

    const handlePopState = () => {
      setPathname(window.location.pathname)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }

    // Intercept internal link clicks for buttery smooth SPA transitions
    const handleLinkClick = (e: MouseEvent) => {
      // Respect default prevented or non-left clicks
      if (e.defaultPrevented || e.button !== 0) return

      // Let browser handle modifier keys for new tab / new window / download
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const target = (e.target as HTMLElement).closest("a")
      if (!target) return

      const href = target.getAttribute("href")
      if (!href) return

      // Do not intercept static files, assets, external URLs, downloads, or target=_blank
      const isStaticFile = /\.(pdf|png|jpg|jpeg|svg|webp|xml|txt|json|zip)$/i.test(href) || href.startsWith("/assets/")
      if (isStaticFile || target.target === "_blank" || target.hasAttribute("download") || target.getAttribute("rel") === "external") {
        return
      }

      // Only intercept relative internal paths (starting with /)
      if (href.startsWith("/") && !href.startsWith("//")) {
        // If hash link on same page e.g. /#what-i-do
        if (href.includes("#")) {
          const [path, hash] = href.split("#")
          const currentClean = window.location.pathname.replace(/\/$/, "") || "/"
          const targetClean = path.replace(/\/$/, "") || "/"

          if (currentClean === targetClean && hash) {
            const el = document.getElementById(hash)
            if (el) {
              e.preventDefault()
              el.scrollIntoView({ behavior: "smooth" })
              return
            }
          }
        }

        e.preventDefault()
        window.history.pushState({}, "", href)
        setPathname(href.split("#")[0])
        window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      }
    }

    window.addEventListener("popstate", handlePopState)
    document.addEventListener("click", handleLinkClick)

    return () => {
      window.removeEventListener("popstate", handlePopState)
      document.removeEventListener("click", handleLinkClick)
    }
  }, [])

  const cleanPath = pathname.replace(/\/$/, "") || "/"

  let content = <NotFoundClient />
  if (cleanPath === "/" || cleanPath === "/index.html") {
    content = <HomeClient />
  } else if (cleanPath === "/works") {
    content = <WorksClient />
  } else {
    const slug = cleanPath.startsWith("/works/")
      ? cleanPath.slice(7)
      : cleanPath.slice(1)
    if (slug && CASE_STUDIES[slug]) {
      content = <CaseStudyPage data={CASE_STUDIES[slug]} />
    }
  }

  return (
    <div key={cleanPath}>
      {content}
    </div>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <WebVitals />
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
