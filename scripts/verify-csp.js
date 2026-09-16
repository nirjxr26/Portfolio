import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, "..")

const CSP_FILES = ["vite.config.ts", "vercel.json", "public/_headers"]
const NON_EXECUTABLE_TYPES = new Set([
  "application/ld+json",
  "application/json",
  "importmap",
  "speculationrules",
])

function executableInlineScripts(html) {
  const out = []
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script\b[^>]*>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    const attrs = m[1] ?? ""
    if (/\bsrc\s*=/i.test(attrs)) continue
    const typeMatch = attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i)
    const type = (typeMatch?.[1] ?? "").toLowerCase()
    if (type && NON_EXECUTABLE_TYPES.has(type)) continue
    if (type && !["text/javascript", "module"].includes(type)) continue
    if (!m[2] || !m[2].trim()) continue
    out.push(m[2])
  }
  return out
}

const html = fs.readFileSync(path.resolve(projectRoot, "index.html"), "utf-8")
const scripts = executableInlineScripts(html)

if (scripts.length === 0) {
  console.error("verify-csp: no executable inline <script> found in index.html")
  process.exit(1)
}

const expected = scripts.map((s) => `sha256-${crypto.createHash("sha256").update(s, "utf8").digest("base64")}`)

const found = new Map()
for (const rel of CSP_FILES) {
  const full = path.resolve(projectRoot, rel)
  const content = fs.readFileSync(full, "utf-8")
  const hashes = [...content.matchAll(/sha256-([A-Za-z0-9+/=]+)/g)].map((m) => `sha256-${m[1]}`)
  found.set(rel, hashes)
}

const allHashes = [...found.values()].flat()
const uniqueHashes = [...new Set(allHashes)]

let failed = false

if (allHashes.length === 0 || uniqueHashes.length !== 1) {
  console.error(
    `verify-csp: expected exactly 1 unique CSP hash across ${CSP_FILES.join(", ")}, found ${uniqueHashes.length}: ${uniqueHashes.join(", ") || "(none)"}`,
  )
  failed = true
}

for (const [rel, hashes] of found) {
  for (const want of expected) {
    if (!hashes.includes(want)) {
      console.error(`verify-csp: ${rel} is missing ${want}`)
      failed = true
    }
  }
}

if (failed) {
  console.error(
    `\nFix: copy the hash above into the script-src of ${CSP_FILES.join(", ")}. index.html inline script changed without updating CSP.`,
  )
  process.exit(1)
}

console.log(`verify-csp: ok (${expected.join(", ")})`)
