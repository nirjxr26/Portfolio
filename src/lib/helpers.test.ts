import { describe, expect, it } from "vitest"
import {
  alternateSurfaces,
  byNewestFirst,
  createBreadcrumbs,
  externalProps,
  isStaticAsset,
  safeHref,
  withAssetHash,
} from "@/lib/helpers"

describe("safeHref", () => {
  it("allows internal, anchor, mail, and https links", () => {
    for (const href of ["/works/trace", "#top", "mailto:a@b.com", "https://example.com", "./a.md"]) {
      expect(safeHref(href)).toBe(href)
    }
  })

  it("rejects script, data, protocol-relative, and control-character URLs", () => {
    for (const href of ["javascript:alert(1)", "data:text/html,x", "//evil.com", "/a\u0000b", " vbscript:x"]) {
      expect(safeHref(href)).toBe("")
    }
  })
})

describe("isStaticAsset", () => {
  it("matches downloadable file extensions anywhere in the path", () => {
    for (const href of ["/rss.xml", "/files/report.pdf", "/img/hero.webp", "/a/b.json"]) {
      expect(isStaticAsset(href)).toBe(true)
    }
  })

  it("matches the asset mount point", () => {
    expect(isStaticAsset("/assets/nirjar_resume.pdf")).toBe(true)
    expect(isStaticAsset("/assets/features/trace/hero-cli.svg")).toBe(true)
  })

  it("leaves internal routes and anchors alone", () => {
    for (const href of ["/", "/works", "/articles/some-slug", "#section"]) {
      expect(isStaticAsset(href)).toBe(false)
    }
  })
})

describe("externalProps", () => {
  it("opens http links in a hardened new tab", () => {
    expect(externalProps("https://example.com")).toEqual({ target: "_blank", rel: "noreferrer noopener" })
  })

  it("treats pdfs and asset paths as external", () => {
    expect(externalProps("/assets/resume.pdf")).toEqual({ target: "_blank", rel: "noreferrer noopener" })
    expect(externalProps("/files/doc.pdf")).toEqual({ target: "_blank", rel: "noreferrer noopener" })
  })

  it("leaves internal routes alone", () => {
    expect(externalProps("/works")).toEqual({})
    expect(externalProps("/articles/some-slug")).toEqual({})
  })
})

describe("byNewestFirst", () => {
  it("sorts newer dates before older ones", () => {
    const rows = [{ date: "Jan 1, 2026" }, { date: "Sep 16, 2026" }, { date: "May 1, 2026" }]
    expect([...rows].sort(byNewestFirst).map((r) => r.date)).toEqual([
      "Sep 16, 2026",
      "May 1, 2026",
      "Jan 1, 2026",
    ])
  })

  it("treats missing dates as oldest", () => {
    expect(byNewestFirst({}, { date: "Jan 1, 2026" })).toBeGreaterThan(0)
    expect(byNewestFirst({ date: "Jan 1, 2026" }, {})).toBeLessThan(0)
  })
})

describe("alternateSurfaces", () => {
  it("starts on the alt surface and alternates", () => {
    expect(alternateSurfaces(0)).toEqual({ section: "bg-surface-alt", card: "bg-card" })
    expect(alternateSurfaces(1)).toEqual({ section: "bg-canvas", card: "bg-surface-alt" })
    expect(alternateSurfaces(2)).toEqual({ section: "bg-surface-alt", card: "bg-card" })
  })
})

describe("createBreadcrumbs", () => {
  it("prepends Home root breadcrumb", () => {
    expect(createBreadcrumbs([{ name: "Works", url: "/works" }])).toEqual([
      { name: "Home", url: "/" },
      { name: "Works", url: "/works" },
    ])
  })
})

describe("withAssetHash", () => {
  it("appends content hash when the file exists in assets", () => {
    const hashed = withAssetHash("/assets/features/trace/hero-cli.svg")
    expect(hashed).toMatch(/^\/assets\/features\/trace\/hero-cli\.svg\?v=[a-f0-9]{8}$/)
  })

  it("leaves external or non-existent paths intact", () => {
    expect(withAssetHash("/non-existent.png")).toBe("/non-existent.png")
    expect(withAssetHash("https://example.com/image.svg")).toBe("https://example.com/image.svg")
  })
})

