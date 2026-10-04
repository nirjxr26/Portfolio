import { useEffect } from "react"
import {
  SITE_DEFAULT_DESC,
  SITE_DEFAULT_TITLE,
  SITE_OG_IMAGE,
  siteCanonical,
} from "@/data/site"
import {
  JSONLD_SCRIPT_ID,
  buildArticlesItemList,
  buildBreadcrumbSchema,
  buildDefaultSchemas,
  buildSoftwareSchema,
} from "@/data/seo"
import type { RouteMeta } from "@/data/routes"
import type { Article, BreadcrumbItem, SoftwareSchema } from "@/types"

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
  includeDefaultSchemas?: boolean
  articles?: Article[]
  articleSchema?: Record<string, unknown>
}

function upsertHeadElement<K extends keyof HTMLElementTagNameMap>(
  selector: string,
  tag: K,
  attributes: Record<string, string>,
) {
  const existing = document.querySelector(selector) as HTMLElementTagNameMap[K] | null
  const el = existing ?? document.createElement(tag)
  if (!existing) document.head.appendChild(el)
  for (const [name, value] of Object.entries(attributes)) {
    if (el.getAttribute(name) !== value) el.setAttribute(name, value)
  }
  return el
}

function setMeta(keyAttr: "name" | "property", key: string, content: string) {
  upsertHeadElement(`meta[${keyAttr}="${key}"]`, "meta", { [keyAttr]: key, content })
}

export function Seo({
  title = SITE_DEFAULT_TITLE,
  description = SITE_DEFAULT_DESC,
  canonicalUrl,
  ogImage = SITE_OG_IMAGE,
  ogType = "website",
  publishedTime,
  modifiedTime,
  breadcrumbs,
  softwareSchema,
  includeDefaultSchemas = true,
  articles,
  articleSchema,
}: Readonly<SeoProps>) {
  useEffect(() => {
    const canonical = siteCanonical(canonicalUrl)

    if (document.title !== title) document.title = title
    setMeta("name", "description", description)
    setMeta("property", "og:title", title)
    setMeta("property", "og:description", description)
    setMeta("property", "og:type", ogType)
    setMeta("property", "og:url", canonical)
    setMeta("property", "og:image", ogImage)
    setMeta("property", "og:image:alt", title)
    setMeta("property", "og:site_name", "Nirjar Goswami")
    setMeta("property", "profile:first_name", "Nirjar")
    setMeta("property", "profile:last_name", "Goswami")
    setMeta("property", "profile:username", "nirjxr")
    if (publishedTime) setMeta("property", "article:published_time", publishedTime)
    if (modifiedTime) setMeta("property", "article:modified_time", modifiedTime)
    setMeta("name", "twitter:card", "summary_large_image")
    setMeta("name", "twitter:title", title)
    setMeta("name", "twitter:description", description)
    setMeta("name", "twitter:image", ogImage)
    setMeta("name", "twitter:image:alt", title)
    setMeta("name", "twitter:site", "@nirjxrgoswami")
    setMeta("name", "twitter:creator", "@nirjxrgoswami")
    upsertHeadElement('link[rel="canonical"]', "link", { rel: "canonical", href: canonical })
    const schemaGraph: Record<string, unknown>[] = []
    if (includeDefaultSchemas) schemaGraph.push(...buildDefaultSchemas())
    if (breadcrumbs?.length) schemaGraph.push(buildBreadcrumbSchema(breadcrumbs))
    if (softwareSchema) {
      schemaGraph.push(buildSoftwareSchema(softwareSchema, { url: canonical, image: ogImage }))
    }
    if (articleSchema) schemaGraph.push(articleSchema)
    if (articles?.length) schemaGraph.push(buildArticlesItemList(articles))

    const jsonLd = schemaGraph.length
      ? JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }, null, 2)
      : ""
    const scriptEl = upsertHeadElement(`#${JSONLD_SCRIPT_ID}`, "script", {
      id: JSONLD_SCRIPT_ID,
      type: "application/ld+json",
    })
    if (scriptEl.textContent?.trim() !== jsonLd.trim()) scriptEl.textContent = jsonLd
  }, [
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType,
    publishedTime,
    modifiedTime,
    breadcrumbs,
    softwareSchema,
    includeDefaultSchemas,
    articles,
    articleSchema,
  ])

  return null
}

export function RouteSeo({
  meta,
  breadcrumbs,
}: Readonly<{ meta: RouteMeta; breadcrumbs: BreadcrumbItem[] }>) {
  return (
    <Seo
      title={meta.title}
      description={meta.description}
      canonicalUrl={meta.canonical}
      includeDefaultSchemas={false}
      breadcrumbs={breadcrumbs}
    />
  )
}
