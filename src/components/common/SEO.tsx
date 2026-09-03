import { useEffect } from "react"
import { SOCIAL_LINKS } from "@/data/navigation"
import type { Article, BreadcrumbItem, PersonSchema, SoftwareSchema } from "@/types"

export type { Article, BreadcrumbItem, PersonSchema, SoftwareSchema }

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
  articles?: Article[]
}

export const DEFAULT_TITLE = "Nirjar Goswami | Cloud & Security Engineer"
export const DEFAULT_DESC =
  "Cloud, Security & Systems Engineer specializing in cloud architecture, DevOps, cybersecurity, identity platforms, and resilient, cost-aware infrastructure."
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
  articles,
}: SEOProps) {
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
    setMetaTag('meta[property="og:site_name"]', "property", "og:site_name", "Nirjar Goswami")
    setMetaTag('meta[property="profile:first_name"]', "property", "profile:first_name", "Nirjar")
    setMetaTag('meta[property="profile:last_name"]', "property", "profile:last_name", "Goswami")
    setMetaTag('meta[property="profile:username"]', "property", "profile:username", "nirjxr")

    // 4. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image")
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title)
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description)
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", ogImage)
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
      schemaGraph.push(
        {
          "@type": "ProfilePage",
          "@id": `${DEFAULT_URL}/#profilepage`,
          url: DEFAULT_URL,
          name: "Nirjar Goswami | Cloud & Security Engineer",
          mainEntity: {
            "@id": `${DEFAULT_URL}/#person`,
          },
        },
        {
          "@type": "Person",
          "@id": `${DEFAULT_URL}/#person`,
          name: personSchema?.name || "Nirjar Goswami",
          url: personSchema?.url || DEFAULT_URL,
          jobTitle: personSchema?.jobTitle || "Cloud & Security Engineer",
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
          ],
          description: "Cloud & Security Engineer building systems meant to be forgotten.",
        },
        {
          "@type": "WebSite",
          "@id": `${DEFAULT_URL}/#website`,
          url: DEFAULT_URL,
          name: "Nirjar Goswami Portfolio",
          description: "Official website and case studies of Nirjar Goswami.",
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
        codeRepository: softwareSchema.codeRepository || softwareSchema.url,
        programmingLanguage: softwareSchema.programmingLanguage || "Go",
        license: softwareSchema.license || "https://opensource.org/licenses/MIT",
        runtimePlatform: softwareSchema.runtimePlatform || "Kubernetes, Linux, Docker",
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

    if (articles && articles.length > 0) {
      schemaGraph.push({
        "@type": "ItemList",
        "@id": `${DEFAULT_URL}/#articles`,
        name: "Technical Articles & Publications",
        description: "Technical articles on systems, observability, security, and developer tooling by Nirjar Goswami.",
        itemListElement: articles.map((article, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "TechArticle",
            headline: article.title,
            description: article.desc,
            url: article.link,
            author: {
              "@id": `${DEFAULT_URL}/#person`,
            },
            publisher: {
              "@id": `${DEFAULT_URL}/#person`,
            },
            about: article.category,
          },
        })),
      })
    }

    const newSchemaContent = schemaGraph.length > 0
      ? JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }, null, 2)
      : ""

    if (scriptEl.textContent?.trim() !== newSchemaContent.trim()) {
      scriptEl.textContent = newSchemaContent
    }
  }, [title, description, canonicalUrl, ogImage, ogType, breadcrumbs, softwareSchema, personSchema, includeDefaultSchemas, articles])

  return null
}
