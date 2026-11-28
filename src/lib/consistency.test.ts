import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { JSONLD_SCRIPT_ID, buildDefaultSchemas } from "@/app/seo/seo"
import { SITE_DEFAULT_DESC, SITE_DEFAULT_TITLE } from "@/app/seo/site"
import { THEME_DARK_CLASS, THEME_STORAGE_KEY } from "@/lib/helpers"

const shell = readFileSync("index.html", "utf8")

function jsonLdBlock(): { "@context": string; "@graph": Record<string, unknown>[] } {
  const match = shell.match(
    new RegExp(`<script id="${JSONLD_SCRIPT_ID}"[^>]*>([\\s\\S]*?)</script>`),
  )
  if (!match) throw new Error(`no #${JSONLD_SCRIPT_ID} script in index.html`)
  return JSON.parse(match[1])
}

describe("cross-file agreements", () => {
  it("inline theme script honors the shared theme constants", () => {
    expect(shell).toContain(`localStorage.getItem("${THEME_STORAGE_KEY}")`)
    expect(shell).toContain(`"${THEME_DARK_CLASS}"`)
  })

  it("shell carries the shared JSON-LD script id", () => {
    expect(shell).toContain(`id="${JSONLD_SCRIPT_ID}"`)
  })

  it("static JSON-LD graph matches buildDefaultSchemas()", () => {
    expect(jsonLdBlock()).toEqual({
      "@context": "https://schema.org",
      "@graph": buildDefaultSchemas(),
    })
  })

  it("static title and description match the shared site defaults", () => {
    const unescape = (s: string) => s.replace(/&amp;/g, "&").trim()
    const title = shell.match(/<title>(.*?)<\/title>/)?.[1] ?? ""
    const description =
      shell.match(/<meta\s+name="description"\s+content="(.*?)"\s*\/?>/)?.[1] ?? ""
    const ogDescription =
      shell.match(/<meta\s+property="og:description"\s+content="(.*?)"\s*\/?>/)?.[1] ?? ""

    expect(unescape(title)).toBe(SITE_DEFAULT_TITLE)
    expect(unescape(description)).toBe(SITE_DEFAULT_DESC)
    expect(unescape(ogDescription)).toBe(SITE_DEFAULT_DESC)
  })

  it("static canonical and og:url agree", () => {
    const canonical = shell.match(/<link rel="canonical" href="(.*?)"/)?.[1]
    const ogUrl = shell.match(/<meta property="og:url" content="(.*?)"/)?.[1]
    expect(canonical).toBeDefined()
    expect(ogUrl).toBe(canonical)
  })

  it("homeMarkdown matches articles and footer sitemap structure", async () => {
    const { generateHomeMarkdown } = await import("@/features/home/data/homeMarkdown")
    const md = generateHomeMarkdown()

    // Under Footer & Connect, Works list must be removed
    const footerSection = md.split("## Footer & Connect")[1]
    expect(footerSection).toBeDefined()
    expect(footerSection).not.toContain("### Works")
    expect(footerSection).not.toContain("- **Trace** (Digital Forensics & Incident Response)")

    // Website Tree text tree is present, SVGs removed
    expect(footerSection).toContain("### Website Tree")
    expect(footerSection).not.toContain("sitemap_white.svg")
    expect(footerSection).not.toContain("sitemap_black.svg")
    expect(footerSection).toContain("nirjar.me/")
    expect(footerSection).not.toContain("github.com/nirjxr26/")

    // Metadata frontmatter check
    expect(md).toContain(`title: "Nirjar`)
    expect(md).toContain(`description: "Generalist`)
    expect(md).toContain(`canonical: "https://nirjar.me"`)
    expect(md).not.toContain("author:")
    expect(md).not.toContain("image:")
    expect(md).not.toContain("language:")
    expect(md).not.toContain("format:")

    // Articles section format check (no extra gap between heading and first bullet)
    expect(md).toContain("## Articles.\n\n### All-in-One VCRedist Installer\n- **Read Time**: 2 min read\n- **Date**: Nov 28, 2026\n- **Category**: Practice")
    expect(md).toContain("### Why I Switched to Zed IDE\n- **Read Time**: 4 min read\n- **Date**: Nov 17, 2026\n- **Category**: Practice")
    expect(md).toContain("### Parapet: A 100ms Rust Site Checker\n- **Read Time**: 5 min read\n- **Date**: Nov 12, 2026\n- **Category**: Security")
    expect(md).toContain("### Coding Is Taught Wrong, and AI Exposed It\n- **Read Time**: 9 min read\n- **Date**: Oct 31, 2026\n- **Category**: Artificial Intelligence")
    expect(md).toContain("[View other articles](https://nirjar.me/articles)")
  })
})
