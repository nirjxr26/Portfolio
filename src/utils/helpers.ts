import type { BreadcrumbItem } from "@/types"

export const THEME_STORAGE_KEY = "theme"
export const THEME_DARK_CLASS = "dark"

const STATIC_FILE_PATTERN = /\.(pdf|png|jpg|jpeg|svg|webp|xml|txt|json|zip)$/i

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
