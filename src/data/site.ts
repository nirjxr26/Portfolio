export const SITE_URL = "https://nirjar.me"
export const SITE_OG_IMAGE = "https://nirjar.me/og-image.webp"
export const SITE_NAME = "Nirjar Goswami"
export const SITE_DEFAULT_TITLE = "Nirjar Goswami | Cloud & Security Engineer"
export const SITE_DEFAULT_DESC =
  "Cloud, Security & Systems Engineer specializing in cloud architecture, DevOps, cybersecurity, identity platforms, and resilient, cost-aware infrastructure."

export const SITE_KEYWORDS =
  "Nirjar Goswami, Cloud Engineer, Security Engineer, Cloud Architecture, DevOps, Kubernetes, Go, System Design, IAM, Cybersecurity, AegisMesh, Bastion, Kost, HookDrop, Trace, DeployLens, VaultLock"

export function stripTrailingSlashes(path: string): string {
  let end = path.length
  while (end > 0 && path[end - 1] === "/") end -= 1
  return path.slice(0, end)
}

function joinUrl(origin: string, path: string): string {
  const clean = stripTrailingSlashes(path)
  if (!clean) return origin
  const separator = clean.startsWith("/") ? "" : "/"
  return `${origin}${separator}${clean}`
}

export function joinSiteUrl(path: string): string {
  return joinUrl(SITE_URL, path)
}

function urlCanonical(pathOrUrl: string): string {
  try {
    const parsed = new URL(pathOrUrl)
    return joinUrl(parsed.origin, parsed.pathname)
  } catch {
    return pathOrUrl
  }
}

export function siteCanonical(pathOrUrl?: string): string {
  if (!pathOrUrl) {
    return typeof window === "undefined" ? SITE_URL : joinSiteUrl(window.location.pathname)
  }
  if (pathOrUrl.startsWith("http")) return urlCanonical(pathOrUrl)
  return joinSiteUrl(pathOrUrl)
}
