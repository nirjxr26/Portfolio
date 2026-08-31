import { StrictMode, useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import {
  BastionClient,
  ErrorBoundary,
  HomeClient,
  HookDropClient,
  KostClient,
  NotFoundClient,
  WebVitals,
  WorksClient,
} from "@/components"

// Theme initialization
if (typeof window !== "undefined") {
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
    const handlePopState = () => {
      setPathname(window.location.pathname)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }

    // Intercept internal link clicks for buttery smooth SPA transitions
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return

      const href = target.getAttribute("href")
      if (!href) return

      // Do not intercept static files, assets, external URLs, or blank targets
      const isStaticFile = /\.(pdf|png|jpg|jpeg|svg|webp|xml|txt|json|zip)$/i.test(href) || href.startsWith("/assets/")
      if (isStaticFile || target.target === "_blank" || target.hasAttribute("download")) {
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
  } else if (cleanPath === "/bastion" || cleanPath === "/works/bastion") {
    content = <BastionClient />
  } else if (cleanPath === "/kost" || cleanPath === "/works/kost") {
    content = <KostClient />
  } else if (cleanPath === "/hookdrop" || cleanPath === "/works/hookdrop") {
    content = <HookDropClient />
  }

  return (
    <main id="main-content" key={cleanPath} className="animate-hero-1">
      {content}
    </main>
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
