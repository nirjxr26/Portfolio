import { describe, expect, it } from "vitest"
import { ARTICLE_CATEGORIES } from "./blogArticles"
import { BLOG_ARTICLES } from "./blogArticles"
import { articles } from "./home"

describe("article data integrity", () => {
  it("has unique, slug-safe slugs", () => {
    const slugs = BLOG_ARTICLES.map((a) => a.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it("fills every required field and section", () => {
    for (const article of BLOG_ARTICLES) {
      expect(article.title.length).toBeGreaterThan(0)
      expect(article.description.length).toBeGreaterThan(0)
      expect(article.cardDesc.length).toBeGreaterThan(0)
      expect(article.keywords.length).toBeGreaterThan(0)
      expect(article.sections.length).toBeGreaterThan(0)
      article.sections.forEach((section, index) => {
        // A lead section may run without a heading; every later one is titled.
        if (index > 0) expect(section.subtitle.length).toBeGreaterThan(0)
        expect(section.content.length).toBeGreaterThan(0)
      })
    }
  })

  it("uses parseable dates", () => {
    for (const article of BLOG_ARTICLES) {
      expect(Number.isNaN(Date.parse(article.updated))).toBe(false)
      expect(Number.isNaN(Date.parse(article.cardDate))).toBe(false)
    }
  })
})

describe("article categories", () => {
  it("files every article into a known rail", () => {
    const known = new Set<string>(ARTICLE_CATEGORIES)
    for (const article of BLOG_ARTICLES) {
      expect(known.has(article.category)).toBe(true)
    }
  })

  it("leaves no rail empty", () => {
    for (const category of ARTICLE_CATEGORIES) {
      expect(BLOG_ARTICLES.some((a) => a.category === category)).toBe(true)
    }
  })

  it("lists each category once", () => {
    expect(new Set(ARTICLE_CATEGORIES).size).toBe(ARTICLE_CATEGORIES.length)
  })
})

describe("home article ordering", () => {
  it("stays newest-first", () => {
    for (let i = 1; i < articles.length; i += 1) {
      const prev = Date.parse(articles[i - 1].date ?? "")
      const curr = Date.parse(articles[i].date ?? "")
      expect(prev >= curr).toBe(true)
    }
  })
})
