import { SOCIAL_LINKS } from "./navigation"
import { SITE_OG_IMAGE, SITE_URL } from "./site"
import type { Article, BreadcrumbItem, PersonSchema, SoftwareSchema } from "@/types"

/**
 * Single source for SEO structured-data builders — pure functions, no React.
 * Used by both the runtime `Seo` component and `scripts/prerender.js`
 * (via `vite.ssrLoadModule`) so static heads and SPA-navigated heads emit
 * identical schemas. 0 UI change: head-only output.
 */

export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl
  if (pathOrUrl === "/") return SITE_URL
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`
}

export function toISODate(dateStr: string): string {
  const d = new Date(dateStr)
  if (!isNaN(d.getTime())) return d.toISOString().split("T")[0] as string
  return dateStr
}

export function estimateWordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((b, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: b.name,
      item: absoluteUrl(b.url),
    })),
  }
}

export function buildDefaultSchemas(personSchema?: PersonSchema): Record<string, unknown>[] {
  return [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Nirjar Goswami | Cloud & Security Engineer",
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: personSchema?.name || "Nirjar Goswami",
      url: personSchema?.url || SITE_URL,
      image: `${SITE_URL}/og-image.webp`,
      jobTitle: personSchema?.jobTitle || "Cloud & Security Engineer",
      email: "mailto:nirjargoswami2626@gmail.com",
      sameAs: personSchema?.sameAs || [
        SOCIAL_LINKS.github,
        SOCIAL_LINKS.linkedin,
        SOCIAL_LINKS.twitter,
        SOCIAL_LINKS.instagram,
      ],
      knowsAbout: [
        "Cloud Infrastructure",
        "Cloud Architecture",
        "Cloud Security",
        "Cybersecurity",
        "Identity & Access Management",
        "System Design",
        "DevOps",
        "Kubernetes",
        "Go",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Cloud & Security Engineer",
        occupationalCategory: "15-1252.00",
        skills: "Cloud Architecture, Kubernetes, DevOps, Cybersecurity, IAM, Go",
      },
      description: "Cloud & Security Engineer building systems meant to be forgotten.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Nirjar Goswami Portfolio",
      description: "Official website and case studies of Nirjar Goswami.",
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
  ]
}

export function buildSoftwareSchema(
  s: SoftwareSchema,
  opts?: { url?: string; image?: string },
): Record<string, unknown> {
  return {
    "@type": "SoftwareSourceCode",
    name: s.name,
    description: s.description,
    url: opts?.url ?? s.url,
    image: opts?.image ?? SITE_OG_IMAGE,
    codeRepository: s.codeRepository || s.url,
    programmingLanguage: s.programmingLanguage || "Go",
    license: s.license || "https://opensource.org/licenses/MIT",
    runtimePlatform: s.runtimePlatform || "Kubernetes, Linux, Docker",
    author: { "@type": "Person", name: "Nirjar Goswami", url: SITE_URL },
  }
}

export function buildArticlesItemList(articles: Article[]): Record<string, unknown> {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#articles`,
    name: "Technical Articles & Publications",
    description:
      "Technical articles on systems, observability, security, and developer tooling by Nirjar Goswami.",
    itemListElement: articles.map((article, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "TechArticle",
        headline: article.title,
        description: article.desc,
        url: absoluteUrl(article.link),
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
        about: article.category,
      },
    })),
  }
}

interface TechArticleInput {
  title: string
  description: string
  canonical: string
  category: string
  keywords: string
  datePublished: string
  dateModified: string
  wordCount: number
  readTime: string
}

export function buildTechArticleSchema(a: TechArticleInput): Record<string, unknown> {
  return {
    "@type": "TechArticle",
    "@id": `${a.canonical}#article`,
    headline: a.title,
    alternativeHeadline: a.title,
    description: a.description,
    image: SITE_OG_IMAGE,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: {
      "@id": `${SITE_URL}/#person`,
      name: "Nirjar Goswami",
      logo: { "@type": "ImageObject", url: SITE_OG_IMAGE },
    },
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": a.canonical },
    url: a.canonical,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    articleSection: a.category,
    keywords: a.keywords,
    wordCount: a.wordCount,
    timeRequired: `PT${a.readTime.replace(" min", "M")}`,
    thumbnailUrl: SITE_OG_IMAGE,
    copyrightHolder: { "@id": `${SITE_URL}/#person` },
    isAccessibleForFree: true,
  }
}
