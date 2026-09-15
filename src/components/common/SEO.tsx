import { useEffect } from "react"
import {
  SITE_DEFAULT_DESC,
  SITE_DEFAULT_TITLE,
  SITE_OG_IMAGE,
  SITE_URL,
  siteCanonical,
} from "@/data/site"
import {
  absoluteUrl,
  buildArticlesItemList,
  buildBreadcrumbSchema,
  buildDefaultSchemas,
  buildSoftwareSchema,
} from "@/data/seo"
import type { Article, BreadcrumbItem, PersonSchema, SoftwareSchema } from "@/types"

export type { Article, BreadcrumbItem, PersonSchema, SoftwareSchema }

interface SeoProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  publishedTime?: string
  modifiedTime?: string
  breadcrumbs?: BreadcrumbItem[]
  softwareSchema?: SoftwareSchema
  personSchema?: PersonSchema
  includeDefaultSchemas?: boolean
  articles?: Article[]
  articleSchema?: Record<string, unknown>
  extraSchemas?: Record<string, unknown>[]
}

/** @deprecated Use `SeoProps` (PascalCase, Sonar S6770). */
export type SEOProps = SeoProps

export const DEFAULT_TITLE = SITE_DEFAULT_TITLE
export const DEFAULT_DESC = SITE_DEFAULT_DESC
export const DEFAULT_URL = SITE_URL
export const DEFAULT_OG_IMAGE = SITE_OG_IMAGE

export function getCanonicalUrl(urlOrPath?: string): string {
  return siteCanonical(urlOrPath)
}

export function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  publishedTime,
  modifiedTime,
  breadcrumbs,
  softwareSchema,
  personSchema,
  includeDefaultSchemas = true,
  articles,
  articleSchema,
  extraSchemas,
}: Readonly<SeoProps>) {
  useEffect(() => {
    // 1. Update Title only if different
    if (document.title !== title) {
      document.title = title
    }

    // Helper to set or create meta tag without redundant DOM writes
    const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(selector)
      if (!tag) {
        tag = document.createElement("meta")
        tag.setAttribute(attrName, attrValue)
        document.head.appendChild(tag)
      }
      if (tag.getAttribute("content") !== content) {
        tag.setAttribute("content", content)
      }
    }

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', "name", "description", description)

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:title"]', "property", "og:title", title)
    setMetaTag('meta[property="og:description"]', "property", "og:description", description)
    setMetaTag('meta[property="og:type"]', "property", "og:type", ogType)
    setMetaTag('meta[property="og:url"]', "property", "og:url", getCanonicalUrl(canonicalUrl))
    setMetaTag('meta[property="og:image"]', "property", "og:image", ogImage)
    setMetaTag('meta[property="og:image:alt"]', "property", "og:image:alt", title)
    setMetaTag('meta[property="og:site_name"]', "property", "og:site_name", "Nirjar Goswami")
    setMetaTag('meta[property="profile:first_name"]', "property", "profile:first_name", "Nirjar")
    setMetaTag('meta[property="profile:last_name"]', "property", "profile:last_name", "Goswami")
    setMetaTag('meta[property="profile:username"]', "property", "profile:username", "nirjxr")

    // 3b. Article timestamps (only meaningful when og:type is article)
    if (publishedTime) {
      setMetaTag('meta[property="article:published_time"]', "property", "article:published_time", publishedTime)
    }
    if (modifiedTime) {
      setMetaTag('meta[property="article:modified_time"]', "property", "article:modified_time", modifiedTime)
    }

    // 4. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image")
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title)
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description)
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", ogImage)
    setMetaTag('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", title)
    setMetaTag('meta[name="twitter:site"]', "name", "twitter:site", "@nirjxrgoswami")
    setMetaTag('meta[name="twitter:creator"]', "name", "twitter:creator", "@nirjxrgoswami")

    // 5. Canonical Link
    const resolvedCanonical = getCanonicalUrl(canonicalUrl)
    let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!linkCanonical) {
      linkCanonical = document.createElement("link")
      linkCanonical.setAttribute("rel", "canonical")
      document.head.appendChild(linkCanonical)
    }
    if (linkCanonical.getAttribute("href") !== resolvedCanonical) {
      linkCanonical.setAttribute("href", resolvedCanonical)
    }

    // 6. JSON-LD Dynamic Schema Sync
    const scriptId = "dynamic-jsonld-schema"
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null
    if (!scriptEl) {
      scriptEl = document.createElement("script")
      scriptEl.id = scriptId
      scriptEl.type = "application/ld+json"
      document.head.appendChild(scriptEl)
    }

    const schemaGraph: Record<string, unknown>[] = []

    if (includeDefaultSchemas) {
      schemaGraph.push(...buildDefaultSchemas(personSchema))
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaGraph.push(buildBreadcrumbSchema(breadcrumbs))
    }

    if (softwareSchema) {
      schemaGraph.push(
        buildSoftwareSchema(softwareSchema, {
          url: absoluteUrl(canonicalUrl ?? DEFAULT_URL),
          image: ogImage,
        }),
      )
    }

    if (articleSchema) {
      schemaGraph.push(articleSchema)
    }

    if (articles && articles.length > 0) {
      schemaGraph.push(buildArticlesItemList(articles))
    }

    if (extraSchemas && extraSchemas.length > 0) {
      schemaGraph.push(...extraSchemas)
    }

    const newSchemaContent = schemaGraph.length > 0
      ? JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }, null, 2)
      : ""

    if (scriptEl.textContent?.trim() !== newSchemaContent.trim()) {
      scriptEl.textContent = newSchemaContent
    }
  }, [title, description, canonicalUrl, ogImage, ogType, publishedTime, modifiedTime, breadcrumbs, softwareSchema, personSchema, includeDefaultSchemas, articles, articleSchema, extraSchemas])

  return null
}

/** @deprecated Use `Seo` (PascalCase, Sonar S6770). Kept for backward compat. */
export const SEO = Seo
