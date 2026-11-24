import { describe, expect, it } from "vitest"
import { BLOG_ARTICLES } from "@/features/articles/data/blogArticles"
import { CASE_STUDIES } from "@/features/case-studies/data/caseStudies"
import { cleanPath, isInternalRoute, resolveRoute } from "@/app/router/routes"

const firstArticleSlug = BLOG_ARTICLES[0].slug
const firstCaseSlug = Object.keys(CASE_STUDIES)[0]

describe("resolveRoute", () => {
  it("resolves the home page", () => {
    expect(resolveRoute("/")).toEqual({ kind: "home" })
    expect(resolveRoute("/index.html")).toEqual({ kind: "home" })
    expect(resolveRoute("/index.md")).toEqual({ kind: "home" })
    expect(resolveRoute("/agent.md")).toEqual({ kind: "home" })
  })

  it("resolves section pages", () => {
    expect(resolveRoute("/works")).toEqual({ kind: "works" })
    expect(resolveRoute("/services")).toEqual({ kind: "services" })
    expect(resolveRoute("/articles")).toEqual({ kind: "articles" })
    expect(resolveRoute("/article")).toEqual({ kind: "articles" })
    expect(resolveRoute("/sitemap")).toEqual({ kind: "sitemap" })
    expect(resolveRoute("/legal")).toEqual({ kind: "legal" })
  })

  it("ignores trailing slashes and hashes", () => {
    expect(resolveRoute("/works/")).toEqual({ kind: "works" })
    expect(resolveRoute("/works#featured-works")).toEqual({ kind: "works" })
  })

  it("resolves every real article slug", () => {
    for (const article of BLOG_ARTICLES) {
      expect(resolveRoute(`/articles/${article.slug}`)).toEqual({
        kind: "article-detail",
        articleSlug: article.slug,
      })
      expect(resolveRoute(`/article/${article.slug}`)).toEqual({
        kind: "article-detail",
        articleSlug: article.slug,
      })
    }
  })

  it("rejects unknown article slugs", () => {
    expect(resolveRoute("/articles/no-such-post")).toEqual({ kind: "not-found" })
  })

  it("resolves every real case study slug", () => {
    for (const slug of Object.keys(CASE_STUDIES)) {
      expect(resolveRoute(`/works/${slug}`)).toEqual({ kind: "case-study", caseSlug: slug })
    }
  })

  it("resolves legacy single-segment case URLs", () => {
    expect(resolveRoute(`/${firstCaseSlug}`)).toEqual({ kind: "case-study", caseSlug: firstCaseSlug })
  })

  it("rejects unknown works slugs and random paths", () => {
    expect(resolveRoute("/works/no-such-case")).toEqual({ kind: "not-found" })
    expect(resolveRoute("/definitely-not-a-page")).toEqual({ kind: "not-found" })
  })

  it("smoke-checks the fixture slugs exist", () => {
    expect(firstArticleSlug.length).toBeGreaterThan(0)
    expect(firstCaseSlug.length).toBeGreaterThan(0)
  })
})

describe("cleanPath", () => {
  it("keeps the root intact", () => {
    expect(cleanPath("/")).toBe("/")
  })

  it("strips trailing slashes", () => {
    expect(cleanPath("/works/")).toBe("/works")
    expect(cleanPath("/articles")).toBe("/articles")
  })
})

describe("isInternalRoute", () => {
  it("accepts same-origin paths", () => {
    expect(isInternalRoute("/works")).toBe(true)
    expect(isInternalRoute("/articles/some-slug")).toBe(true)
  })

  it("rejects external, protocol-relative, and hash links", () => {
    expect(isInternalRoute("https://example.com")).toBe(false)
    expect(isInternalRoute("//example.com/x")).toBe(false)
    expect(isInternalRoute("#section")).toBe(false)
  })
})
