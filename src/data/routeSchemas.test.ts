import { describe, expect, it } from "vitest"
import { BLOG_ARTICLES } from "./blogArticles"
import { CASE_STUDIES } from "./caseStudies"
import { absoluteUrl, buildTechArticleSchema, estimateWordCount, toISODate } from "./seo"
import { buildStaticRoutes } from "./routeSchemas"
import { SITE_URL } from "./site"

const routes = buildStaticRoutes()

function routeFor(path: string) {
  const found = routes.find((r) => r.path === path)
  if (!found) throw new Error(`no static route for ${path}`)
  return found
}

function graphOf(path: string) {
  return routeFor(path).schema["@graph"] as Record<string, unknown>[]
}

describe("buildStaticRoutes", () => {
  it("emits home, the section pages, then every detail page", () => {
    expect(routes.map((r) => r.path)).toEqual([
      "/",
      "/works",
      "/articles",
      "/services",
      "/sitemap",
      "/legal",
      ...BLOG_ARTICLES.map((b) => `/articles/${b.slug}`),
      ...Object.keys(CASE_STUDIES).map((slug) => `/works/${slug}`),
    ])
  })

  it("gives every route a title, description and canonical", () => {
    for (const route of routes) {
      expect(route.title.length).toBeGreaterThan(0)
      expect(route.description.length).toBeGreaterThan(0)
      expect(route.canonical.startsWith(SITE_URL)).toBe(true)
    }
  })

  it("never emits a duplicate canonical", () => {
    const canonicals = routes.map((r) => r.canonical)
    expect(new Set(canonicals).size).toBe(canonicals.length)
  })

  it("marks article pages as og:type=article and the rest as website", () => {
    for (const route of routes) {
      expect(route.ogType ?? (route.path.startsWith("/articles/") ? "article" : "website")).toBe(
        route.path.startsWith("/articles/") ? "article" : "website",
      )
    }
  })
})

describe("collection page schemas", () => {
  it.each(["/works", "/articles"])("emits @id on the %s collection page", (path) => {
    const collection = graphOf(path).find((n) => n["@type"] === "CollectionPage")
    expect(collection).toBeDefined()
    expect(collection?.["@id"]).toBe(`${SITE_URL}${path}#collection`)
    expect(collection?.url).toBe(`${SITE_URL}${path}`)
  })

  it("lists every case study on the works collection page", () => {
    const collection = graphOf("/works").find((n) => n["@type"] === "CollectionPage")
    const mainEntity = collection?.mainEntity as { itemListElement: unknown[] }
    expect(mainEntity.itemListElement).toHaveLength(Object.keys(CASE_STUDIES).length)
  })

  it("lists every article on the articles collection page", () => {
    const collection = graphOf("/articles").find((n) => n["@type"] === "CollectionPage")
    const mainEntity = collection?.mainEntity as { itemListElement: unknown[] }
    expect(mainEntity.itemListElement).toHaveLength(BLOG_ARTICLES.length)
  })
})

describe("detail page schemas", () => {
  it("gives every article a breadcrumb plus a TechArticle node", () => {
    for (const blog of BLOG_ARTICLES) {
      const graph = graphOf(`/articles/${blog.slug}`)
      expect(graph.map((n) => n["@type"])).toEqual(["BreadcrumbList", "TechArticle"])
      const crumbs = graph[0].itemListElement as { name: string }[]
      expect(crumbs.map((c) => c.name)).toEqual(["Home", "Articles", blog.title])
    }
  })

  it("emits a schema.org duration for readTime", () => {
    for (const blog of BLOG_ARTICLES) {
      const article = graphOf(`/articles/${blog.slug}`)[1]
      expect(article.timeRequired).toMatch(/^PT\d+M$/)
    }
  })

  it("carries published and modified timestamps matching the article date", () => {
    const blog = BLOG_ARTICLES[0]
    const route = routeFor(`/articles/${blog.slug}`)
    expect(route.publishedTime).toBe(toISODate(blog.updated))
    expect(route.modifiedTime).toBe(toISODate(blog.updated))
  })

  it("gives every case study a breadcrumb plus a SoftwareSourceCode node", () => {
    for (const [slug, data] of Object.entries(CASE_STUDIES)) {
      const graph = graphOf(`/works/${slug}`)
      expect(graph.map((n) => n["@type"])).toEqual(["BreadcrumbList", "SoftwareSourceCode"])
      const crumbs = graph[0].itemListElement as { name: string }[]
      expect(crumbs.map((c) => c.name)).toEqual(["Home", "Works", data.hero.title])
    }
  })
})

describe("runtime / static schema parity", () => {
  const blog = BLOG_ARTICLES[0]

  it("builds the same TechArticle node the ArticleDetailLayout builds", () => {
    const staticNode = graphOf(`/articles/${blog.slug}`)[1]
    const isoDate = toISODate(blog.updated)
    const posterSrc = blog.poster?.dark ?? blog.poster?.light
    const articleImage = blog.ogImage
      ? absoluteUrl(blog.ogImage)
      : posterSrc
      ? absoluteUrl(posterSrc)
      : blog.leadImage
      ? absoluteUrl(blog.leadImage.src)
      : undefined
    const runtimeNode = buildTechArticleSchema({
      title: blog.title,
      description: blog.description,
      canonical: `${SITE_URL}/articles/${blog.slug}`,
      category: blog.category,
      keywords: blog.keywords,
      datePublished: isoDate,
      dateModified: isoDate,
      wordCount: estimateWordCount(
        `${blog.sections.map((s) => `${s.subtitle} ${s.content}`).join(" ")} ${blog.description}`,
      ),
      readTime: blog.readTime,
      image: articleImage,
    })
    expect(staticNode).toEqual(runtimeNode)
  })
})
