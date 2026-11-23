import { describe, expect, it } from "vitest"
import {
  CACHE_RULES,
  baseHeaders,
  cspDev,
  cspProd,
  inlineScriptHash,
  renderHeadersFile,
  renderVercelHeaders,
} from "./headers.js"

describe("csp", () => {
  it("locks scripts to self plus the inline-script hash in production", () => {
    expect(cspProd).toContain(`script-src 'self' '${inlineScriptHash}'`)
    expect(cspProd).not.toContain("unsafe-inline")
    expect(cspProd).not.toContain("unsafe-eval")
  })

  it("relaxes only script-src and style-src on the dev server", () => {
    expect(cspDev).toContain("script-src 'self' 'unsafe-inline'")
    expect(cspDev).toContain("style-src 'self' 'unsafe-inline'")
    expect(cspDev).toContain("connect-src 'self' ws:")
    const directives = (csp) => csp.split("; ").sort()
    const diff = directives(cspDev).filter((d) => !directives(cspProd).includes(d))
    expect(diff).toHaveLength(3)
  })
})

describe("baseHeaders", () => {
  it("emits the hardening headers every response needs", () => {
    const headers = baseHeaders(cspProd)
    expect(headers["X-Frame-Options"]).toBe("DENY")
    expect(headers["X-Content-Type-Options"]).toBe("nosniff")
    expect(headers["Content-Security-Policy"]).toBe(cspProd)
  })
})

describe("renderHeadersFile", () => {
  const file = renderHeadersFile()

  it("writes every base header under the catch-all block", () => {
    for (const [name, value] of Object.entries(baseHeaders(cspProd))) {
      expect(file).toContain(`  ${name}: ${value}`)
    }
  })

  it("writes one glob block per cache rule", () => {
    for (const rule of CACHE_RULES) {
      expect(file).toContain(`\n${rule.path}\n  Cache-Control: ${rule.cacheControl}`)
    }
  })
})

describe("renderVercelHeaders", () => {
  it("mirrors the same header set the _headers file emits", () => {
    const headers = renderVercelHeaders()
    const catchAll = headers.find((block) => block.source === "/(.*)")
    expect(Object.fromEntries(catchAll.headers.map((h) => [h.key, h.value]))).toEqual(
      baseHeaders(cspProd),
    )
  })

  it("emits one block per cache rule", () => {
    expect(renderVercelHeaders().map((block) => block.source)).toEqual([
      "/(.*)",
      ...CACHE_RULES.map((rule) => rule.vercelPath),
    ])
  })
})
