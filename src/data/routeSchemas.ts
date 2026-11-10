import { BLOG_ARTICLES } from "./blogArticles"
import { CASE_STUDIES } from "./caseStudies"
import { articles } from "./home"
import { ROUTE_META } from "./routes"
import { SITE_KEYWORDS, SITE_OG_IMAGE, SITE_URL } from "./site"
import {
  absoluteUrl,
  buildArticleListElements,
  buildArticlesItemList,
  buildBreadcrumbSchema,
  buildCollectionPage,
  buildDefaultSchemas,
  buildSoftwareSchema,
  buildTechArticleSchema,
  estimateWordCount,
  toISODate,
} from "./seo"
import { toPlainText } from "@/utils/reactNode"


const SCHEMA_CONTEXT = "https://schema.org"

export interface StaticRoute {
  path: string
  title: string
  description: string
  canonical: string
  priority: string
  changefreq: string
  keywords?: string
  image?: string
  ogType?: string
  publishedTime?: string
  modifiedTime?: string
  schema: {
    "@context": string
    "@graph": Record<string, unknown>[]
  }
}

function graph(...nodes: Record<string, unknown>[]): StaticRoute["schema"] {
  return { "@context": SCHEMA_CONTEXT, "@graph": nodes }
}

function prerenderMeta(path: "/" | "/works" | "/articles" | "/sitemap" | "/legal"): Pick<
  StaticRoute,
  "title" | "description" | "canonical" | "keywords"
> {
  const meta = ROUTE_META[path]
  if (!meta.canonical) throw new Error(`ROUTE_META["${path}"] is missing a canonical`)
  return {
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    keywords: meta.keywords ?? SITE_KEYWORDS,
  }
}

const articleCardItems = buildArticleListElements(articles)

const allArticleKeywords = BLOG_ARTICLES.map((b) => b.keywords).join(", ")

const worksCollectionItems = Object.entries(CASE_STUDIES).map(([slug, cs], idx) => ({
  "@type": "ListItem",
  position: idx + 1,
  item: buildSoftwareSchema(
    {
      name: cs.hero.title,
      description: cs.hero.subhead,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Kubernetes / Linux",
      url: `${SITE_URL}/works/${slug}`,
      codeRepository: cs.cta.url,
      ...cs.softwareSchema,
    },
    { url: `${SITE_URL}/works/${slug}`, image: SITE_OG_IMAGE },
  ),
}))

function buildArticleRoute(blog: (typeof BLOG_ARTICLES)[number]): StaticRoute {
  const canonical = `${SITE_URL}/articles/${blog.slug}`
  const isoDate = toISODate(blog.updated)
  const bodyText = blog.sections.map((s) => `${s.subtitle} ${s.content}`).join(" ")
  const wordCount = estimateWordCount(`${bodyText} ${blog.description}`)
  const keywords = blog.keywords || `${blog.category}, ${blog.title}, Nirjar Goswami, ${SITE_KEYWORDS}`
  const posterSrc = blog.poster?.dark ?? blog.poster?.light
  const articleImage = posterSrc
    ? absoluteUrl(posterSrc)
    : blog.leadImage
    ? absoluteUrl(blog.leadImage.src)
    : undefined

  return {
    path: `/articles/${blog.slug}`,
    title: `${blog.title} | Nirjar Goswami`,
    description: blog.description,
    canonical,
    priority: "0.8",
    changefreq: "monthly",
    ogType: "article",
    publishedTime: isoDate,
    modifiedTime: isoDate,
    keywords,
    image: articleImage ?? SITE_OG_IMAGE,
    schema: graph(
      buildBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Articles", url: "/articles" },
        { name: blog.title, url: `/articles/${blog.slug}` },
      ]),
      buildTechArticleSchema({
        title: blog.title,
        description: blog.description,
        canonical,
        category: blog.category,
        keywords,
        datePublished: isoDate,
        dateModified: isoDate,
        wordCount,
        readTime: blog.readTime,
        image: articleImage,
      }),
    ),
  }
}

function buildCaseStudyRoute(slug: string, data: (typeof CASE_STUDIES)[string]): StaticRoute {
  const headlineText = toPlainText(data.hero.headline)
  const description = data.hero.subhead
  const canonical = `${SITE_URL}/works/${slug}`
  const keywords = `${data.hero.title}, ${headlineText || description}, Go, Kubernetes, Docker, DevOps, ${SITE_KEYWORDS}`

  return {
    path: `/works/${slug}`,
    title: data.seoTitle || `${data.hero.title} | ${headlineText || description}`,
    description,
    canonical,
    priority: "0.8",
    changefreq: "monthly",
    keywords,
    image: SITE_OG_IMAGE,
    schema: graph(
      buildBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Works", url: "/works" },
        { name: data.hero.title, url: `/works/${slug}` },
      ]),
      buildSoftwareSchema(
        {
          name: data.hero.title,
          description,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Kubernetes / Linux",
          url: data.cta.url,
          codeRepository: data.cta.url,
          ...data.softwareSchema,
        },
        { url: canonical, image: SITE_OG_IMAGE, keywords },
      ),
    ),
  }
}

export function buildStaticRoutes(): StaticRoute[] {
  return [
    {
      path: "/",
      ...prerenderMeta("/"),
      priority: "1.0",
      changefreq: "weekly",
      schema: graph(...buildDefaultSchemas(), buildArticlesItemList(articles)),
    },
    {
      path: "/works",
      ...prerenderMeta("/works"),
      priority: "0.9",
      changefreq: "monthly",
      schema: graph(
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Works", url: "/works" },
        ]),
        buildCollectionPage({
          id: `${SITE_URL}/works#collection`,
          url: `${SITE_URL}/works`,
          name: "Works & Systems Architecture | Nirjar Goswami",
          description: ROUTE_META["/works"].description,
          keywords: `Works, ${SITE_KEYWORDS}`,
          listName: "Featured Software & Infrastructure Systems",
          items: worksCollectionItems,
        }),
      ),
    },
    {
      path: "/articles",
      ...prerenderMeta("/articles"),
      priority: "0.9",
      changefreq: "weekly",
      schema: graph(
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Articles", url: "/articles" },
        ]),
        buildCollectionPage({
          id: `${SITE_URL}/articles#collection`,
          url: `${SITE_URL}/articles`,
          name: "Articles | Nirjar Goswami",
          description: ROUTE_META["/articles"].description,
          keywords: allArticleKeywords,
          listName: "Technical Articles & Publications",
          listDescription:
            "All technical articles by Nirjar Goswami — bento grid, same short desc as cards.",
          items: articleCardItems,
        }),
      ),
    },
    {
      path: "/sitemap",
      ...prerenderMeta("/sitemap"),
      priority: "0.7",
      changefreq: "monthly",
      schema: graph(
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Sitemap", url: "/sitemap" },
        ]),
      ),
    },
    {
      path: "/legal",
      ...prerenderMeta("/legal"),
      priority: "0.5",
      changefreq: "yearly",
      schema: graph(
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Legal", url: "/legal" },
        ]),
      ),
    },
    ...BLOG_ARTICLES.map(buildArticleRoute),
    ...Object.entries(CASE_STUDIES).map(([slug, data]) => buildCaseStudyRoute(slug, data)),
  ]
}

export const STATIC_ROUTE_SOURCE_FILES: Record<string, string> = {
  "/": "src/data/home.ts",
  "/works": "src/components/pages/WorksClient.tsx",
  "/articles": "src/components/pages/ArticleClient.tsx",
  "/sitemap": "src/components/pages/SitemapClient.tsx",
  "/legal": "src/components/pages/LegalClient.tsx",
}
