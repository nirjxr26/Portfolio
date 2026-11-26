import { cleanPath, isInternalRoute, resolveRoute } from "./routes"
import { isStaticAsset, withAssetHash } from "@/lib/helpers"

const prefetched = new Set<string>()

function preloadImage(src: string) {
  if (typeof Image === "undefined") return
  const img = new Image()
  img.decoding = "async"
  img.src = withAssetHash(src)
}

/**
 * Prefetches the JS chunk (and hero LCP assets for Trace) for an internal route
 * on link hover, focus, or touch so navigation feels instantaneous.
 */
export function prefetchRoute(href: string) {
  if (typeof window === "undefined") return
  if (!href || href.startsWith("#") || isStaticAsset(href) || !isInternalRoute(href)) return

  const path = cleanPath(href.split("#")[0] ?? "/")
  if (prefetched.has(path)) return
  prefetched.add(path)

  const route = resolveRoute(path)
  switch (route.kind) {
    case "works":
      void import("@/pages/WorksPage")
      break
    case "services":
      void import("@/pages/ServicesPage")
      break
    case "articles":
      void import("@/pages/ArticlesPage")
      break
    case "sitemap":
      void import("@/pages/SitemapPage")
      break
    case "legal":
      void import("@/pages/LegalPage")
      break
    case "article-detail":
      void import("@/pages/ArticleDetailPage")
      void import("@/features/articles/data/blogArticles")
      break
    case "case-study":
      void import("@/pages/CaseStudyPage")
      void import("@/features/case-studies/data/caseStudies")
      if (route.caseSlug === "trace") {
        void import("@/pages/TracePage")
        preloadImage("/assets/features/trace/hero-bg.jpg")
        const isDesktop = window.matchMedia?.("(min-width: 640px)").matches ?? true
        preloadImage(
          isDesktop
            ? "/assets/features/trace/hero-tui-desktop.svg"
            : "/assets/features/trace/hero-tui-mobile.svg",
        )
      }
      break
    default:
      break
  }
}
