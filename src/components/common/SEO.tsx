import { useEffect } from "react"
import type { BreadcrumbItem, PersonSchema, SoftwareSchema } from "@/types"

export type { BreadcrumbItem, PersonSchema, SoftwareSchema }

interface SEOProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  breadcrumbs?: BreadcrumbItem[]
  softwareSchema?: SoftwareSchema
  personSchema?: PersonSchema
  includeDefaultSchemas?: boolean
}

export const DEFAULT_TITLE = "Nirjar Goswami | Cloud & DevOps Engineer"
export const DEFAULT_DESC =
  "Cloud & DevOps Engineer specializing in Kubernetes, Go, access control (Bastion), cost optimization (Kost), and runtime security (HookDrop)."
export const DEFAULT_URL = "https://nirjar.me"
export const DEFAULT_OG_IMAGE = "https://nirjar.me/og-image.webp"

export function getCanonicalUrl(urlOrPath?: string): string {
  if (!urlOrPath) {
    const clean = window.location.pathname.replace(/\/+$/, "")
    return clean ? `${DEFAULT_URL}${clean.startsWith("/") ? "" : "/"}${clean}` : DEFAULT_URL
  }
  if (urlOrPath.startsWith("http")) {
    try {
      const parsed = new URL(urlOrPath)
      const clean = parsed.pathname.replace(/\/+$/, "")
      return clean ? `${parsed.origin}${clean.startsWith("/") ? "" : "/"}${clean}` : parsed.origin
    } catch {
      return urlOrPath
    }
  }
  const clean = urlOrPath.replace(/\/+$/, "")
  return clean ? `${DEFAULT_URL}${clean.startsWith("/") ? "" : "/"}${clean}` : DEFAULT_URL
}

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  breadcrumbs,
  softwareSchema,
  personSchema,
  includeDefaultSchemas = true,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title only if different
    if (document.title !== title) {
      document.title = title
    }

    // Helper to set or create meta tag without redundant DOM writes
    const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement("meta")
        element.setAttribute(attrName, attrValue)
        element.setAttribute("content", content)
        document.head.appendChild(element)
      } else if (element.getAttribute("content") !== content) {
        element.setAttribute("content", content)
      }
    }

    // Helper to set or create link tag without redundant DOM writes
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
      if (!element) {
        element = document.createElement("link")
        element.setAttribute("rel", rel)
        element.setAttribute("href", href)
        document.head.appendChild(element)
      } else if (element.getAttribute("href") !== href) {
        element.setAttribute("href", href)
      }
    }

    const currentUrl = getCanonicalUrl(canonicalUrl)

    // 2. Primary Meta & Canonical
    setMetaTag('meta[name="description"]', "name", "description", description)
    setMetaTag('meta[name="robots"]', "name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1")
    setLinkTag("canonical", currentUrl)

    // 3. Open Graph Meta Tags
    setMetaTag('meta[property="og:title"]', "property", "og:title", title)
    setMetaTag('meta[property="og:description"]', "property", "og:description", description)
    setMetaTag('meta[property="og:url"]', "property", "og:url", currentUrl)
    setMetaTag('meta[property="og:type"]', "property", "og:type", ogType)
    setMetaTag('meta[property="og:image"]', "property", "og:image", ogImage)
    setMetaTag('meta[property="og:site_name"]', "property", "og:site_name", "Nirjar Goswami")
    setMetaTag('meta[property="og:locale"]', "property", "og:locale", "en_US")

    // 4. Twitter Card Meta Tags
    setMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image")
    setMetaTag('meta[name="twitter:site"]', "name", "twitter:site", "@nirjxrgoswami")
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title)
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description)
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", ogImage)

    // 5. Dynamic JSON-LD Schema Sync
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
      schemaGraph.push(
        {
          "@type": "Person",
          "@id": `${DEFAULT_URL}/#person`,
          name: personSchema?.name || "Nirjar Goswami",
          url: personSchema?.url || DEFAULT_URL,
          jobTitle: personSchema?.jobTitle || "Cloud & DevOps Engineer",
          sameAs: personSchema?.sameAs || [
            "https://github.com/nirjxr26",
            "https://www.linkedin.com/in/nirjxr",
            "https://x.com/nirjxrgoswami",
            "https://instagram.com/nirjar_goswami",
          ],
          knowsAbout: [
            "Cloud Infrastructure",
            "DevOps",
            "Kubernetes",
            "Go",
            "Access Control",
            "eBPF Runtime Security",
            "Cluster Optimization",
          ],
          description: "Cloud & DevOps Engineer building systems meant to be forgotten.",
        },
        {
          "@type": "WebSite",
          "@id": `${DEFAULT_URL}/#website`,
          url: DEFAULT_URL,
          name: "Nirjar Goswami Portfolio",
          description: "Official website and engineering case studies of Nirjar Goswami.",
          publisher: {
            "@id": `${DEFAULT_URL}/#person`,
          },
          inLanguage: "en-US",
        },
      )
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaGraph.push({
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: b.name,
          item: b.url.startsWith("http") ? b.url : `${DEFAULT_URL}${b.url}`,
        })),
      })
    }

    if (softwareSchema) {
      schemaGraph.push({
        "@type": "SoftwareApplication",
        name: softwareSchema.name,
        description: softwareSchema.description,
        applicationCategory: softwareSchema.applicationCategory || "DeveloperApplication",
        operatingSystem: softwareSchema.operatingSystem || "Linux, macOS, Windows",
        url: softwareSchema.url,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Person",
          name: "Nirjar Goswami",
          url: DEFAULT_URL,
        },
      })
    }

    const newSchemaContent = schemaGraph.length > 0
      ? JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }, null, 2)
      : ""

    if (scriptEl.textContent?.trim() !== newSchemaContent.trim()) {
      scriptEl.textContent = newSchemaContent
    }
  }, [title, description, canonicalUrl, ogImage, ogType, breadcrumbs, softwareSchema, personSchema, includeDefaultSchemas])

  return null
}
