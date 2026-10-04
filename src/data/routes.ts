import { BLOG_ARTICLES } from "./blogArticles"
import { CASE_STUDIES } from "./caseStudies"
import { SITE_DEFAULT_DESC, SITE_DEFAULT_TITLE, SITE_URL, stripTrailingSlashes } from "./site"

export interface RouteMeta {
  title: string
  description: string
  canonical?: string
}

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESC,
    canonical: SITE_URL,
  },
  "/works": {
    title: "Works | Nirjar Goswami",
    description:
      "Explore systems, infrastructure, and open-source tools built by Nirjar Goswami, including Bastion, Kost, HookDrop, and Trace.",
    canonical: `${SITE_URL}/works`,
  },
  "/articles": {
    title: "Article | Nirjar Goswami",
    description: "Writing about things I’ve experienced and worked on, not just ideas I’ve read about.",
    canonical: `${SITE_URL}/articles`,
  },
  "/404": {
    title: "Page Not Found | Nirjar Goswami",
    description: "The page you are looking for does not exist or has been moved.",
  },
}

export type RouteKind = "home" | "works" | "articles" | "article-detail" | "case-study" | "not-found"

export interface ResolvedRoute {
  kind: RouteKind
  articleSlug?: string
  caseSlug?: string
}

export function cleanPath(pathname: string) {
  return stripTrailingSlashes(pathname) || "/"
}

export function resolveRoute(pathname: string): ResolvedRoute {
  const clean = cleanPath(pathname.split("#")[0] ?? "/")

  if (clean === "/" || clean === "/index.html") return { kind: "home" }
  if (clean === "/works") return { kind: "works" }
  if (clean === "/articles") return { kind: "articles" }

  if (clean.startsWith("/articles/")) {
    const slug = clean.slice("/articles/".length)
    if (BLOG_ARTICLES.some((a) => a.slug === slug)) {
      return { kind: "article-detail", articleSlug: slug }
    }
    return { kind: "not-found" }
  }

  if (clean.startsWith("/works/")) {
    const slug = clean.slice("/works/".length)
    if (slug && CASE_STUDIES[slug]) {
      return { kind: "case-study", caseSlug: slug }
    }
    return { kind: "not-found" }
  }

    const legacy = clean.slice(1)
  if (legacy && CASE_STUDIES[legacy]) {
    return { kind: "case-study", caseSlug: legacy }
  }

  return { kind: "not-found" }
}

export function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//")
}
