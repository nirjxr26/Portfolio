import { describe, expect, it } from "vitest"
import type { Article } from "@/types"
import { SITE_URL } from "./site"
import {
  absoluteUrl,
  buildArticleListElements,
  buildArticlesItemList,
  buildBreadcrumbSchema,
  buildCollectionPage,
  buildDefaultSchemas,
  buildTechArticleSchema,
  estimateWordCount,
  toISODate,
  toISODuration,
} from "./seo"

const sampleArticles: Article[] = [
  { title: "First", category: "Security", date: "Sep 16, 2026", readTime: "5 min read", desc: "First desc", link: "/articles/first" },
  { title: "Second", category: "DevOps", date: "Sep 1, 2026", readTime: "3 min read", desc: "Second desc", link: "/articles/second" },
]

describe("absoluteUrl", () => {
  it("maps the root to the site origin", () => {
    expect(absoluteUrl("/")).toBe(SITE_URL)
  })

  it("joins relative paths onto the origin", () => {
    expect(absoluteUrl("/articles/first")).toBe(`${SITE_URL}/articles/first`)
    expect(absoluteUrl("articles/first")).toBe(`${SITE_URL}/articles/first`)
  })

  it("passes absolute URLs through", () => {
    expect(absoluteUrl("https://example.com/x")).toBe("https://example.com/x")
  })
})

describe("toISODate", () => {
  it("converts display dates to ISO", () => {
    expect(toISODate("June 4, 2026")).toBe("2026-06-04")
    expect(toISODate("September 16, 2026")).toBe("2026-09-16")
  })

  it("passes unparseable input through", () => {
    expect(toISODate("not-a-date")).toBe("not-a-date")
  })
})

describe("estimateWordCount", () => {
  it("counts whitespace-separated words", () => {
    expect(estimateWordCount("one two  three")).toBe(3)
    expect(estimateWordCount("")).toBe(0)
  })
})

describe("buildBreadcrumbSchema", () => {
  it("numbers positions and absolutizes urls", () => {
    const schema = buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Works", url: "/works" },
    ])
    expect(schema["@type"]).toBe("BreadcrumbList")
    const items = schema["itemListElement"] as Array<Record<string, unknown>>
    expect(items).toHaveLength(2)
    expect(items[0]).toMatchObject({ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL })
    expect(items[1]).toMatchObject({ "@type": "ListItem", position: 2, name: "Works", item: `${SITE_URL}/works` })
  })
})

describe("buildDefaultSchemas", () => {
  it("emits profile, person, and website nodes", () => {
    const schemas = buildDefaultSchemas()
    expect(schemas.map((s) => s["@type"])).toEqual(["ProfilePage", "Person", "WebSite"])
  })
})

describe("buildCollectionPage", () => {
  it("builds a collection page without a list description", () => {
    const page = buildCollectionPage({
      id: `${SITE_URL}/works#collection`,
      url: `${SITE_URL}/works`,
      name: "Works",
      description: "Works desc",
      keywords: "Works",
      listName: "Systems",
      items: [],
    })
    expect(page["@type"]).toBe("CollectionPage")
    expect(page["isPartOf"]).toEqual({ "@id": `${SITE_URL}/#website` })
    expect(page["mainEntity"]).toEqual({ "@type": "ItemList", name: "Systems", itemListElement: [] })
  })

  it("includes the list description when provided", () => {
    const page = buildCollectionPage({
      id: `${SITE_URL}/articles#collection`,
      url: `${SITE_URL}/articles`,
      name: "Articles",
      description: "Articles desc",
      keywords: "Articles",
      listName: "Posts",
      listDescription: "All posts",
      items: [],
    })
    expect(page["mainEntity"]).toMatchObject({ description: "All posts" })
  })
})

describe("buildArticlesItemList", () => {
  it("wraps every article as a positioned TechArticle", () => {
    const list = buildArticlesItemList(sampleArticles)
    expect(list["@type"]).toBe("ItemList")
    const items = list["itemListElement"] as Array<Record<string, unknown>>
    expect(items).toHaveLength(2)
    expect(items[0]).toMatchObject({ "@type": "ListItem", position: 1 })
    expect((items[0]["item"] as Record<string, unknown>)["@type"]).toBe("TechArticle")
  })
})

describe("buildArticleListElements", () => {
  it("links each entry to its absolute url", () => {
    const elements = buildArticleListElements(sampleArticles)
    expect(elements).toHaveLength(2)
    expect((elements[1]["item"] as Record<string, unknown>)["url"]).toBe(`${SITE_URL}/articles/second`)
  })
})

describe("buildTechArticleSchema", () => {
  it("emits reading metadata", () => {
    const schema = buildTechArticleSchema({
      title: "T",
      description: "D",
      canonical: `${SITE_URL}/articles/t`,
      category: "Security",
      keywords: "K",
      datePublished: "2026-09-16",
      dateModified: "2026-09-16",
      wordCount: 100,
      readTime: "5 min",
    })
    expect(schema["@type"]).toBe("TechArticle")
    expect(schema["wordCount"]).toBe(100)
    expect(schema["timeRequired"]).toBe("PT5M")
  })
})

describe("toISODuration", () => {
  it("reads the leading minute count from any human read-time format", () => {
    expect(toISODuration("5 min")).toBe("PT5M")
    expect(toISODuration("5 min read")).toBe("PT5M")
    expect(toISODuration("12 min read")).toBe("PT12M")
  })

  it("degrades to zero minutes rather than emitting garbage", () => {
    expect(toISODuration("")).toBe("PT0M")
    expect(toISODuration("a while")).toBe("PT0M")
  })
})
