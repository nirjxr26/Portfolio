import { describe, expect, it } from "vitest"
import {
  alternateSurfaces,
  byNewestFirst,
  createBreadcrumbs,
  externalProps,
  isStaticAsset,
  nextTabIndex,
  withAssetHash,
} from "./helpers"

describe("isStaticAsset", () => {
  it("matches downloadable file extensions anywhere in the path", () => {
    for (const href of ["/rss.xml", "/files/report.pdf", "/img/hero.webp", "/a/b.json"]) {
      expect(isStaticAsset(href)).toBe(true)
    }
  })

  it("matches the asset mount point", () => {
    expect(isStaticAsset("/assets/nirjar_resume.pdf")).toBe(true)
    expect(isStaticAsset("/assets/trace/cli_hero.svg")).toBe(true)
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
    const hashed = withAssetHash("/assets/trace/cli_hero.svg")
    expect(hashed).toMatch(/^\/assets\/trace\/cli_hero\.svg\?v=[a-f0-9]{8}$/)
  })

  it("leaves external or non-existent paths intact", () => {
    expect(withAssetHash("/non-existent.png")).toBe("/non-existent.png")
    expect(withAssetHash("https://example.com/image.svg")).toBe("https://example.com/image.svg")
  })
})

describe("nextTabIndex", () => {
  it("wraps the arrow keys in both directions", () => {
    expect(nextTabIndex("ArrowRight", 0, 2)).toBe(1)
    expect(nextTabIndex("ArrowRight", 1, 2)).toBe(0)
    expect(nextTabIndex("ArrowLeft", 0, 2)).toBe(1)
    expect(nextTabIndex("ArrowDown", 0, 3)).toBe(1)
    expect(nextTabIndex("ArrowUp", 0, 3)).toBe(2)
  })

  it("jumps to the ends on Home and End", () => {
    expect(nextTabIndex("Home", 2, 3)).toBe(0)
    expect(nextTabIndex("End", 0, 3)).toBe(2)
  })

  it("ignores keys that do not move the selection", () => {
    for (const key of ["Enter", " ", "Tab", "Escape", "a"]) {
      expect(nextTabIndex(key, 0, 2)).toBeNull()
    }
  })

  it("stays put for an empty tablist", () => {
    expect(nextTabIndex("ArrowRight", 0, 0)).toBeNull()
  })
})
