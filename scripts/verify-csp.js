import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { cspProd, inlineScriptHash } from "./lib/headers.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, "..")

const GENERATED_MANIFESTS = ["vercel.json", "public/_headers"]

const NON_EXECUTABLE_TYPES = new Set([
  "application/ld+json",
  "application/json",
  "importmap",
  "speculationrules",
])

export function executableInlineScripts(html) {
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

export function hashInlineScript(source) {
  return `sha256-${crypto.createHash("sha256").update(source, "utf8").digest("base64")}`
}

export function verifyCsp() {
  const html = fs.readFileSync(path.resolve(projectRoot, "index.html"), "utf-8")
  const scripts = executableInlineScripts(html)

  if (scripts.length === 0) {
    console.error("verify-csp: no executable inline <script> found in index.html")
    process.exit(1)
  }

  const expected = scripts.map(hashInlineScript)

  const missingFromSource = expected.filter((want) => !cspProd.includes(want))
  if (missingFromSource.length > 0) {
    console.error(
      `verify-csp: scripts/lib/headers.js is missing ${missingFromSource.join(", ")} (currently ${inlineScriptHash}). index.html inline script changed without updating the CSP.`,
    )
    process.exit(1)
  }
  const stale = []
  for (const rel of GENERATED_MANIFESTS) {
    const content = fs.readFileSync(path.resolve(projectRoot, rel), "utf-8")
    if (!content.includes(inlineScriptHash)) stale.push(rel)
  }

  if (stale.length > 0) {
    console.error(
      `verify-csp: ${stale.join(", ")} do not carry ${inlineScriptHash}. Run \`npm run sync:headers\`.`,
    )
    process.exit(1)
  }

  console.log(`verify-csp: ok (${expected.join(", ")})`)
}

const invokedDirectly = process.argv[1] !== undefined && path.resolve(process.argv[1]) === __filename
if (invokedDirectly) verifyCsp()
