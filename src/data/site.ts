/**
 * Single site source — canonical URL, OG image, keywords.
 * SEO.tsx + prerender.js must read from here to avoid drift. 0 UI change.
 */

export const SITE_URL = "https://nirjar.me"
export const SITE_OG_IMAGE = "https://nirjar.me/og-image.webp"
export const SITE_NAME = "Nirjar Goswami"
export const SITE_DEFAULT_TITLE = "Nirjar Goswami | Cloud & Security Engineer"
export const SITE_DEFAULT_DESC =
  "Cloud, Security & Systems Engineer specializing in cloud architecture, DevOps, cybersecurity, identity platforms, and resilient, cost-aware infrastructure."

export const SITE_KEYWORDS =
  "Nirjar Goswami, Cloud Engineer, Security Engineer, Cloud Architecture, DevOps, Kubernetes, Go, System Design, IAM, Cybersecurity, AegisMesh, Bastion, Kost, HookDrop, DeployLens, VaultLock"

function withPath(origin: string, path: string): string {
  const clean = path.replace(/\/+$/, "")
  if (!clean) return origin

  const separator = clean.startsWith("/") ? "" : "/"
  return `${origin}${separator}${clean}`
}

function currentCanonical(): string {
  if (typeof window === "undefined") return SITE_URL
  return withPath(SITE_URL, window.location.pathname)
}

function urlCanonical(pathOrUrl: string): string {
  try {
    const parsed = new URL(pathOrUrl)
    return withPath(parsed.origin, parsed.pathname)
  } catch {
    return pathOrUrl
  }
}

export function siteCanonical(pathOrUrl?: string): string {
  if (!pathOrUrl) return currentCanonical()
  if (pathOrUrl.startsWith("http")) return urlCanonical(pathOrUrl)
  return withPath(SITE_URL, pathOrUrl)
}
