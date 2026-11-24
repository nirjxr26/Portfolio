import { describe, expect, it } from "vitest"
import { executableInlineScripts, hashInlineScript } from "./verify-csp.js"

describe("executableInlineScripts", () => {
  it("extracts classic inline scripts", () => {
    expect(executableInlineScripts("<script>try{}</script>")).toEqual(["try{}"])
  })

  it("matches closing tags with whitespace", () => {
    expect(executableInlineScripts("<script>try{}</script >")).toEqual(["try{}"])
  })

  it("matches uppercase tags and module scripts", () => {
    expect(executableInlineScripts('<SCRIPT>caps</SCRIPT>')).toEqual(["caps"])
    expect(executableInlineScripts('<script type="module">mod</script>')).toEqual(["mod"])
  })

  it("skips external, empty, and data-block scripts", () => {
    expect(executableInlineScripts('<script src="/app.js"></script>')).toEqual([])
    expect(executableInlineScripts("<script>   </script>")).toEqual([])
    expect(executableInlineScripts('<script type="application/ld+json">{"a":1}</script>')).toEqual([])
  })
})

describe("hashInlineScript", () => {
  it("is stable and content-sensitive", () => {
    expect(hashInlineScript("try{}")).toMatch(/^sha256-[A-Za-z0-9+/=]+$/)
    expect(hashInlineScript("try{}")).toBe(hashInlineScript("try{}"))
    expect(hashInlineScript("try{}")).not.toBe(hashInlineScript("try{} "))
  })
})
