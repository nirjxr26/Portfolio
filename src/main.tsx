import { StrictMode, useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import {
  ArticleClient,
  ArticleDetailLayout,
  CaseStudyPage,
  ErrorBoundary,
  HomeClient,
  NotFoundClient,
  WebVitals,
  WorksClient,
} from "@/components"
import { BLOG_ARTICLES, getBlogArticle } from "@/data/blogArticles"
import { CASE_STUDIES } from "@/data/caseStudies"
import { isInternalRoute, resolveRoute } from "@/data/routes"

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

    const handleLinkClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (!href) return
      const isStaticFile = /\.(pdf|png|jpg|jpeg|svg|webp|xml|txt|json|zip)$/i.test(href) || href.startsWith("/assets/")
      if (isStaticFile || target.target === "_blank" || target.hasAttribute("download") || target.getAttribute("rel") === "external") {
        return
      }
      if (href.startsWith("#")) {
        const hash = href.slice(1)
        if (hash) {
          const el = document.getElementById(hash)
          if (el) {
            e.preventDefault()
            el.scrollIntoView({ behavior: "smooth", block: "start" })
            window.history.replaceState(null, "", `#${hash}`)
            return
          }
        }
        return
      }
      if (isInternalRoute(href)) {
        if (href.includes("#")) {
          const [path, hash] = href.split("#")
          const currentClean = window.location.pathname.replace(/\/$/, "") || "/"
          const targetClean = path.replace(/\/$/, "") || "/"
          if (currentClean === targetClean && hash) {
            const el = document.getElementById(hash)
            if (el) {
              e.preventDefault()
              el.scrollIntoView({ behavior: "smooth", block: "start" })
              window.history.replaceState(null, "", `#${hash}`)
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
  const route = resolveRoute(pathname)

  let content = <NotFoundClient />
  if (route.kind === "home") {
    content = <HomeClient />
  } else if (route.kind === "works") {
    content = <WorksClient />
  } else if (route.kind === "articles") {
    content = <ArticleClient />
  } else if (route.kind === "article-detail" && route.articleSlug) {
    const article = getBlogArticle(route.articleSlug) ?? BLOG_ARTICLES.find((a) => a.slug === route.articleSlug)
    if (article) {
      content = <ArticleDetailLayout article={article} />
    }
  } else if (route.kind === "case-study" && route.caseSlug) {
    const data = CASE_STUDIES[route.caseSlug]
    if (data) {
      content = <CaseStudyPage data={data} />
    }
  }

  return (
    <div key={cleanPath} className="page-transition">
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
