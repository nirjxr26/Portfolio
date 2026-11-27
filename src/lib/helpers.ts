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
  if (!safeHref(src)) return ""
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

/** Allowlist links before they reach an `href`; rejects script/data/protocol-relative URLs. */
export function safeHref(href: string): string {
  const value = href.trim()
  if (!value || /[\u0000-\u001f\u007f]/.test(value)) return ""
  if (value.startsWith("//")) return ""
  if (/^(https?:|mailto:|tel:)/i.test(value)) return value
  if (/^\.\.?\//.test(value)) return value
  if (value.startsWith("/") || value.startsWith("#")) return value
  return ""
}

export function isStaticAsset(href: string) {
  return STATIC_FILE_PATTERN.test(href) || href.startsWith("/assets/")
}

/** Single owner of theme state for the toggle button, palette, and shortcuts. */
export function toggleTheme(): boolean {
  const root = document.documentElement
  const dark = !root.classList.contains(THEME_DARK_CLASS)
  root.classList.toggle(THEME_DARK_CLASS, dark)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, dark ? THEME_DARK_CLASS : "light")
  } catch {}
  window.dispatchEvent(new Event("theme-change"))
  return dark
}

export function isMacUserAgent() {
  return typeof navigator !== "undefined" && /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent)
}

export function isTouchOnlyDevice() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(pointer: fine)").matches
  )
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

