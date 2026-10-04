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

export const CACHE_RULES = [
  { source: "/assets/*", cacheControl: IMMUTABLE_CACHE },
  { source: "/fonts/*", cacheControl: IMMUTABLE_CACHE },
  { source: "/", cacheControl: REVALIDATE_CACHE },
  { source: "/works", cacheControl: REVALIDATE_CACHE },
  { source: "/articles", cacheControl: REVALIDATE_CACHE },
  { source: "/works/:slug", cacheControl: REVALIDATE_CACHE },
  { source: "/articles/:slug", cacheControl: REVALIDATE_CACHE },
  { source: "/404.html", cacheControl: REVALIDATE_CACHE },
]

export function renderHeadersFile(csp = cspProd) {
  const lines = ["/*"]
  for (const [name, value] of Object.entries(baseHeaders(csp))) {
    lines.push(`  ${name}: ${value}`)
  }
  lines.push(`  Cache-Control: ${REVALIDATE_CACHE}`)
  for (const rule of CACHE_RULES) {
    lines.push("", rule.source)
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
      source: rule.source,
      headers: [{ key: "Cache-Control", value: rule.cacheControl }],
    })),
  ]
}
