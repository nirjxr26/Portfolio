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
    title: "Projects & Case Studies | Nirjar Goswami",
    description:
      "Case studies of systems built by Nirjar Goswami: Bastion (IAM), Kost (Kubernetes cost), HookDrop (webhooks), and Trace (forensics CLI).",
    canonical: `${SITE_URL}/works`,
    keywords: "Case Studies, Bastion, Kost, HookDrop, Trace",
  },
  "/services": {
    title: "Services | Nirjar Goswami",
    description:
      "Core capabilities in cybersecurity, DevOps, and cloud architecture and security, plus working knowledge of system design and backend engineering.",
    canonical: `${SITE_URL}/services`,
    keywords: "Cybersecurity, DevOps, Cloud Architecture, AWS, Kubernetes",
  },
  "/articles": {
    title: "Articles on Cloud, DevOps & Security | Nirjar Goswami",
    description:
      "Technical articles on cloud infrastructure, DevOps, security, and systems architecture, with Markdown versions and an RSS feed.",
    canonical: `${SITE_URL}/articles`,
    keywords: "Engineering Blog, DevOps, Security, Cloud",
  },
  "/sitemap": {
    title: "Sitemap | Nirjar Goswami",
    description: "Complete directory of pages, case studies, articles, and feeds on nirjar.me.",
    canonical: `${SITE_URL}/sitemap`,
    keywords: "Sitemap, Directory",
  },
  "/legal": {
    title: "Terms of Use | Nirjar Goswami",
    description:
      "Privacy statement, content and code licensing, technical disclaimer, and how to report security issues for nirjar.me.",
    canonical: `${SITE_URL}/legal`,
    keywords: "Privacy, Licensing, Security Reporting",
  },
  "/404": {
    title: "Page Not Found | Nirjar Goswami",
    description: "The page you are looking for does not exist or has been moved.",
  },
  "/500": {
    title: "500 - Internal Server Error | Nirjar Goswami",
    description: "An unexpected error occurred.",
  },
}

export type RouteKind = "home" | "works" | "services" | "articles" | "sitemap" | "legal" | "article-detail" | "case-study" | "not-found" | "error"

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
  if (clean === "/services") return { kind: "services" }
  if (clean === "/articles" || clean === "/article") return { kind: "articles" }
  if (clean === "/sitemap") return { kind: "sitemap" }
  if (clean === "/legal") return { kind: "legal" }
  if (clean === "/500" || clean === "/error") return { kind: "error" }

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
