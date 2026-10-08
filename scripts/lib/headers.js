const INLINE_SCRIPT_HASH = "sha256-PN9ASHoTfz3oCqEKzg0rY4Zv6vmu/3hacZ93Zln0s+c="

export const cspProd = [
  "default-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "object-src 'none'",
  `script-src 'self' '${INLINE_SCRIPT_HASH}'`,
  "style-src 'self'",
  "font-src 'self'",
  "img-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "worker-src 'self'",
  "upgrade-insecure-requests",
  "block-all-mixed-content",
].join("; ")

export const cspDev = [
  "default-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self' ws:",
  "worker-src 'self'",
  "upgrade-insecure-requests",
  "block-all-mixed-content",
].join("; ")

export const inlineScriptHash = INLINE_SCRIPT_HASH

export function baseHeaders(csp) {
  return {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), fullscreen=(self), display-capture=(), browsing-topics=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "credentialless",
    "Origin-Agent-Cluster": "?1",
    "X-DNS-Prefetch-Control": "off",
    "X-Permitted-Cross-Domain-Policies": "none",
    "Content-Security-Policy": csp,
  }
}

export const REVALIDATE_CACHE = "public, max-age=0, must-revalidate"
export const IMMUTABLE_CACHE = "public, max-age=31536000, immutable"

const immutable = IMMUTABLE_CACHE
const revalidate = REVALIDATE_CACHE

export const CACHE_RULES = [
  { path: "/_assets/*", vercelPath: "/_assets/(.*)", cacheControl: immutable },
  { path: "/assets/*", vercelPath: "/assets/(.*)", cacheControl: revalidate },
  { path: "/", vercelPath: "/", cacheControl: revalidate },
  { path: "/works", vercelPath: "/works", cacheControl: revalidate },
  { path: "/articles", vercelPath: "/articles", cacheControl: revalidate },
  { path: "/works/:slug", vercelPath: "/works/:slug", cacheControl: revalidate },
  { path: "/articles/:slug", vercelPath: "/articles/:slug", cacheControl: revalidate },
  { path: "/404.html", vercelPath: "/404.html", cacheControl: revalidate },
  { path: "/fonts/*", vercelPath: "/fonts/(.*)", cacheControl: immutable },
]

export function renderHeadersFile(csp = cspProd) {
  const lines = ["/*"]
  for (const [name, value] of Object.entries(baseHeaders(csp))) {
    lines.push(`  ${name}: ${value}`)
  }
  lines.push(`  Cache-Control: ${REVALIDATE_CACHE}`)
  for (const rule of CACHE_RULES) {
    lines.push("", rule.path)
    lines.push(`  Cache-Control: ${rule.cacheControl}`)
  }
  return `${lines.join("\n")}\n`
}

export function renderVercelHeaders(csp = cspProd) {
  return [
    {
      source: "/(.*)",
      headers: Object.entries(baseHeaders(csp)).map(([key, value]) => ({ key, value })),
    },
    ...CACHE_RULES.map((rule) => ({
      source: rule.vercelPath,
      headers: [{ key: "Cache-Control", value: rule.cacheControl }],
    })),
  ]
}
