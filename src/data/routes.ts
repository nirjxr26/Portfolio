import { BLOG_ARTICLES } from "./blogArticles"
import { CASE_STUDIES } from "./caseStudies"
import {
  SITE_DEFAULT_DESC,
  SITE_DEFAULT_TITLE,
  SITE_KEYWORDS,
  SITE_URL,
  stripTrailingSlashes,
} from "./site"

export interface RouteMeta {
  title: string
  description: string
  canonical?: string
  keywords?: string
}

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESC,
    canonical: SITE_URL,
    keywords: SITE_KEYWORDS,
  },
  "/works": {
    title: "Works | Nirjar Goswami",
    description:
      "Explore systems, infrastructure, and open-source tools built by Nirjar Goswami, including Bastion, Kost, HookDrop, and Trace.",
    canonical: `${SITE_URL}/works`,
    keywords: `Works, Systems Architecture, Infrastructure, Bastion, Kost, HookDrop, Trace, ${SITE_KEYWORDS}`,
  },
  "/articles": {
    title: "Articles | Nirjar Goswami",
    description:
      "Technical articles on systems architecture, cloud infrastructure, DevOps, and security by Nirjar Goswami. Writing about things experienced and worked on.",
    canonical: `${SITE_URL}/articles`,
    keywords: `Articles, Engineering Blog, Systems Architecture, DevOps, Security, ${SITE_KEYWORDS}`,
  },
  "/sitemap": {
    title: "Sitemap | Nirjar Goswami",
    description:
      "A comprehensive directory of all pages, case studies, engineering articles, systems, and feeds across nirjar.me.",
    canonical: `${SITE_URL}/sitemap`,
    keywords: `Sitemap, Directory, Works, Articles, Systems Architecture, ${SITE_KEYWORDS}`,
  },
  "/legal": {
    title: "Terms of Use | Nirjar Goswami",
    description: "Legal Information & Notices.",
    canonical: `${SITE_URL}/legal`,
    keywords: `Legal, Terms of Use, Privacy, Security, Licensing, ${SITE_KEYWORDS}`,
  },
  "/404": {
    title: "Page Not Found | Nirjar Goswami",
    description: "The page you are looking for does not exist or has been moved.",
  },
}

export type RouteKind = "home" | "works" | "articles" | "sitemap" | "legal" | "article-detail" | "case-study" | "not-found"

export interface ResolvedRoute {
  kind: RouteKind
  articleSlug?: string
  caseSlug?: string
}

export function cleanPath(pathname: string) {
  const stripped = stripTrailingSlashes(pathname) || "/"
  if (stripped === "/index.html") {
    return "/"
  }
  return stripped
}

export function resolveRoute(pathname: string): ResolvedRoute {
  const clean = cleanPath(pathname.split("#")[0] ?? "/")

  if (clean === "/" || clean === "/index.html" || clean === "/index.md" || clean === "/agent.md") return { kind: "home" }
  if (clean === "/works") return { kind: "works" }
  if (clean === "/articles" || clean === "/article") return { kind: "articles" }
  if (clean === "/sitemap") return { kind: "sitemap" }
  if (clean === "/legal") return { kind: "legal" }

  if (clean.startsWith("/articles/") || clean.startsWith("/article/")) {
    const slug = clean.startsWith("/articles/")
      ? clean.slice("/articles/".length)
      : clean.slice("/article/".length)
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
