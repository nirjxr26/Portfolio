import type { BreadcrumbItem } from "@/types"
import assetHashes from "virtual:asset-hashes"

export const THEME_STORAGE_KEY = "theme"
export const THEME_DARK_CLASS = "dark"

const STATIC_FILE_PATTERN = /\.(pdf|png|jpg|jpeg|svg|webp|xml|txt|json|zip)$/i

/**
 * Appends the build-time content hash as a query parameter (e.g. ?v=029dbd43)
 * if the path corresponds to a static asset in public/assets.
 * This guarantees permanent cache-busting when SVGs or assets change without manual edits.
 */
export function withAssetHash(src: string): string {
  if (!src) return src
  const [cleanPath, query] = src.split("?")
  const hash = assetHashes[cleanPath]
  if (!hash) return src
  // If an existing custom query exists, append or replace v parameter
  if (query) {
    const params = new URLSearchParams(query)
    params.set("v", hash)
    return `${cleanPath}?${params.toString()}`
  }
  return `${cleanPath}?v=${hash}`
}

export function isStaticAsset(href: string) {
  return STATIC_FILE_PATTERN.test(href) || href.startsWith("/assets/")
}

export function externalProps(url: string) {
  if (url.startsWith("http") || isStaticAsset(url)) {
    return { target: "_blank", rel: "noreferrer noopener" }
  }
  return {}
}

export function byNewestFirst(a: { date?: string }, b: { date?: string }) {
  const da = a.date ? Date.parse(a.date) : 0
  const db = b.date ? Date.parse(b.date) : 0
  return db - da
}

export function alternateSurfaces(index: number) {
  if (index % 2 === 0) return { section: "bg-surface-alt", card: "bg-card" }
  return { section: "bg-canvas", card: "bg-surface-alt" }
}

export function createBreadcrumbs(items: { name: string; url: string }[]): BreadcrumbItem[] {
  return [{ name: "Home", url: "/" }, ...items]
}
