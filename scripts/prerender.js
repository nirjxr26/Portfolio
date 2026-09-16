import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execSync } from "node:child_process"
import { createServer } from "vite"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, "..")
const distDir = path.resolve(projectRoot, "dist")
const templatePath = path.resolve(distDir, "index.html")

if (!fs.existsSync(templatePath)) {
  console.error("Error: dist/index.html does not exist. Run vite build first.")
  process.exit(1)
}

const template = fs.readFileSync(templatePath, "utf-8")

function getGitLastMod(relativeFilePath) {
  try {
    let fullPath = path.resolve(projectRoot, relativeFilePath)
    if (!fs.existsSync(fullPath) && fs.existsSync(fullPath + "x")) fullPath += "x"
    if (fs.existsSync(fullPath)) {
      const out = execSync(`git log -1 --format=%aI -- "${fullPath}"`, { cwd: projectRoot, encoding: "utf-8", stdio: ["pipe", "pipe", "ignore"] }).trim()
      if (out) return out.split("T")[0]
    }
  } catch {}
  try {
    let fullPath = path.resolve(projectRoot, relativeFilePath)
    if (!fs.existsSync(fullPath) && fs.existsSync(fullPath + "x")) fullPath += "x"
    if (fs.existsSync(fullPath)) return fs.statSync(fullPath).mtime.toISOString().split("T")[0]
  } catch {}
  return new Date().toISOString().split("T")[0]
}

function toPlainText(node) {
  if (!node) return ""
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(toPlainText).join("")
  if (typeof node === "object" && node !== null && "props" in node) {
    if (node.props?.children) return toPlainText(node.props.children)
  }
  return ""
}

// NOTE: toISODate + estimateWordCount come from src/data/seo.ts (shared with
// the runtime `Seo` component) — do not redeclare them here.

const vite = await createServer({ root: projectRoot, server: { middlewareMode: true }, appType: "custom", logLevel: "silent" })

let homeMod, caseStudiesMod, navMod, blogMod, siteMod, seoMod, routesMod
try {
  homeMod = await vite.ssrLoadModule("/src/data/home.ts")
  caseStudiesMod = await vite.ssrLoadModule("/src/data/caseStudies.ts")
  navMod = await vite.ssrLoadModule("/src/data/navigation.ts")
  blogMod = await vite.ssrLoadModule("/src/data/blogArticles.ts")
  siteMod = await vite.ssrLoadModule("/src/data/site.ts")
  seoMod = await vite.ssrLoadModule("/src/data/seo.ts")
  routesMod = await vite.ssrLoadModule("/src/data/routes.ts")
} finally {
  await vite.close()
}

const { articles } = homeMod
const { CASE_STUDIES } = caseStudiesMod
const { SOCIAL_LINKS } = navMod
const { BLOG_ARTICLES } = blogMod
const { SITE_KEYWORDS: SITE_KEYWORDS_SHARED, SITE_OG_IMAGE, SITE_URL } = siteMod
const {
  buildArticleListElements,
  buildArticlesItemList,
  buildBreadcrumbSchema,
  buildCollectionPage,
  buildDefaultSchemas,
  buildSoftwareSchema,
  buildTechArticleSchema,
  estimateWordCount,
  toISODate,
} = seoMod
const { ROUTE_META } = routesMod

const SITE_KEYWORDS = SITE_KEYWORDS_SHARED

const OG_IMAGE = SITE_OG_IMAGE

const caseStudyRoutes = Object.entries(CASE_STUDIES).map(([slug, data]) => {
  const headlineText = toPlainText(data.hero.headline)
  const title = data.seoTitle || `${data.hero.title} | ${headlineText || data.hero.subhead}`
  const description = data.hero.subhead
  const repoUrl = data.cta.url
  const canonical = `https://nirjar.me/works/${slug}`
  const sourceFile = fs.existsSync(path.resolve(projectRoot, `src/data/${slug}.tsx`)) ? `src/data/${slug}.tsx` : `src/data/${slug}.ts`
  const keywords = `${data.hero.title}, ${headlineText || description}, Go, Kubernetes, Docker, DevOps, ${SITE_KEYWORDS}`
  return {
    path: `/works/${slug}`,
    title,
    description,
    canonical,
    keywords,
    sourceFile,
    priority: "0.8",
    changefreq: "monthly",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
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
            url: repoUrl,
            codeRepository: repoUrl,
            ...data.softwareSchema,
          },
          { url: canonical, image: OG_IMAGE, keywords },
        ),
      ],
    },
  }
})

const articleCardItems = buildArticleListElements(articles)

const worksCollectionItems = Object.entries(CASE_STUDIES).map(([slug, cs], idx) => ({
  "@type": "ListItem",
  position: idx + 1,
  item: buildSoftwareSchema(
    {
      name: cs.hero.title,
      description: cs.hero.subhead,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Kubernetes / Linux",
      url: `https://nirjar.me/works/${slug}`,
      codeRepository: cs.cta.url,
      ...cs.softwareSchema,
    },
    { url: `https://nirjar.me/works/${slug}`, image: OG_IMAGE },
  ),
}))

function buildArticleRoute(blog) {
  const canonical = `https://nirjar.me/articles/${blog.slug}`
  const isoDate = toISODate(blog.updated)
  const wordCount = estimateWordCount(blog.sections.map((s) => s.subtitle + " " + s.content).join(" ") + " " + blog.description)
  const keywords = blog.keywords || `${blog.category}, ${blog.title}, Nirjar Goswami, ${SITE_KEYWORDS}`
  return {
    path: `/articles/${blog.slug}`,
    title: `${blog.title} | Nirjar Goswami`,
    description: blog.description,
    canonical,
    keywords,
    sourceFile: "src/data/blogArticles.ts",
    priority: "0.8",
    changefreq: "monthly",
    // Shared builders — identical nodes to the runtime `Seo` articleSchema.
    // ogType + published/modified meta are injected by the head renderer below.
    ogType: "article",
    publishedTime: isoDate,
    modifiedTime: isoDate,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
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
        }),
      ],
    },
  }
}

const articleDetailRoutes = BLOG_ARTICLES.map(buildArticleRoute)

const allArticleKeywords = BLOG_ARTICLES.map((b) => b.keywords).join(", ")

const routes = [
  {
    path: "/",
    ...ROUTE_META["/"],
    keywords: `${SITE_KEYWORDS}, ${allArticleKeywords}`,
    sourceFile: "src/data/home.ts",
    priority: "1.0",
    changefreq: "weekly",
    schema: {
      "@context": "https://schema.org",
      "@graph": [...buildDefaultSchemas(), buildArticlesItemList(articles)],
    },
  },
  {
    path: "/works",
    ...ROUTE_META["/works"],
    keywords: `Works, ${SITE_KEYWORDS}, Bastion, Kost, HookDrop, Systems, Infrastructure`,
    sourceFile: "src/components/pages/WorksClient.tsx",
    priority: "0.9",
    changefreq: "monthly",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Works", url: "/works" },
        ]),
        buildCollectionPage({
          "@id": "https://nirjar.me/works#collection",
          url: "https://nirjar.me/works",
          name: "Works & Systems Architecture | Nirjar Goswami",
          description:
            "Explore systems, infrastructure, and open-source tools built by Nirjar Goswami, including Bastion, Kost, and HookDrop.",
          keywords: `Works, ${SITE_KEYWORDS}`,
          listName: "Featured Software & Infrastructure Systems",
          items: worksCollectionItems,
        }),
      ],
    },
  },
  {
    path: "/articles",
    ...ROUTE_META["/articles"],
    keywords: `Articles, Blog, Technical Writing, ${allArticleKeywords}`,
    sourceFile: "src/components/pages/ArticleClient.tsx",
    priority: "0.9",
    changefreq: "weekly",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Articles", url: "/articles" },
        ]),
        buildCollectionPage({
          "@id": "https://nirjar.me/articles#collection",
          url: "https://nirjar.me/articles",
          name: "Articles | Nirjar Goswami",
          description: "Notes on systems, security, and the craft of building by Nirjar Goswami.",
          keywords: allArticleKeywords,
          listName: "Technical Articles & Publications",
          listDescription: "All technical articles by Nirjar Goswami — bento grid, same short desc as cards.",
          items: articleCardItems,
        }),
      ],
    },
  },
  ...articleDetailRoutes,
  ...caseStudyRoutes,
]

routes.forEach((route) => {
  let html = template
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/, `<meta name="description" content="${route.description}" />`)
  // Keywords — add or replace
  if (route.keywords) {
    if (html.includes('name="keywords"')) {
      html = html.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/, `<meta name="keywords" content="${route.keywords}" />`)
    } else {
      html = html.replace("</head>", `  <meta name="keywords" content="${route.keywords}" />\n  </head>`)
    }
  }
  html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/, `<link rel="canonical" href="${route.canonical}" />`)
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/, `<meta property="og:title" content="${route.title}" />`)
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/, `<meta property="og:description" content="${route.description}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/, `<meta property="og:url" content="${route.canonical}" />`)
  html = html.replace(/<meta\s+property="og:image:alt"\s+content=".*?"\s*\/?>/, `<meta property="og:image:alt" content="${route.title}" />`)
  html = html.replace(/<meta\s+property="og:type"\s+content=".*?"\s*\/?>/, `<meta property="og:type" content="${route.ogType || (route.path.startsWith("/articles/") ? "article" : "website")}" />`)
  if (route.publishedTime || route.modifiedTime) {
    const stampTags = [
      route.publishedTime ? `  <meta property="article:published_time" content="${route.publishedTime}" />` : null,
      route.modifiedTime ? `  <meta property="article:modified_time" content="${route.modifiedTime}" />` : null,
    ]
      .filter(Boolean)
      .join("\n")
    html = html.replace("</head>", `${stampTags}\n  </head>`)
  }
  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/, `<meta name="twitter:title" content="${route.title}" />`)
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/, `<meta name="twitter:description" content="${route.description}" />`)
  html = html.replace(/<meta\s+name="twitter:image:alt"\s+content=".*?"\s*\/?>/, `<meta name="twitter:image:alt" content="${route.title}" />`)
  if (route.schema) {
    const formattedSchema = JSON.stringify(route.schema, null, 2)
    html = html.replace(
      /<script\s+id="dynamic-jsonld-schema"\s+type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="dynamic-jsonld-schema" type="application/ld+json">\n${formattedSchema}\n    </script>`,
    )
  }
  let outputPath
  if (route.path === "/") outputPath = path.resolve(distDir, "index.html")
  else {
    const routeDir = path.resolve(distDir, route.path.substring(1))
    fs.mkdirSync(routeDir, { recursive: true })
    outputPath = path.resolve(routeDir, "index.html")
  }
  fs.writeFileSync(outputPath, html, "utf-8")
})

let notFoundHtml = template
notFoundHtml = notFoundHtml.replace(/<title>.*?<\/title>/, `<title>${ROUTE_META["/404"].title}</title>`)
notFoundHtml = notFoundHtml.replace(/<meta\s+name="robots"\s+content=".*?"\s*\/?>/, `<meta name="robots" content="noindex, nofollow" />`)
fs.writeFileSync(path.resolve(distDir, "404.html"), notFoundHtml, "utf-8")

const seenCanonical = new Set()
const sitemapRoutes = routes.filter((r) => {
  if (seenCanonical.has(r.canonical)) return false
  seenCanonical.add(r.canonical)
  return true
})
const sitemapEntries = sitemapRoutes
  .map((r) => {
    const lastmod = getGitLastMod(r.sourceFile)
    return `  <url>\n    <loc>${r.canonical}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  })
  .join("\n")
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`
fs.writeFileSync(path.resolve(distDir, "sitemap.xml"), sitemapXml, "utf-8")
fs.writeFileSync(path.resolve(projectRoot, "public/sitemap.xml"), sitemapXml, "utf-8")

const escXml = (s) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
const rssPubDate = (updated) => new Date(`${updated} 12:00:00 UTC`).toUTCString()
const rssItems = [...BLOG_ARTICLES]
  .sort((a, b) => new Date(b.updated) - new Date(a.updated))
  .map((b) => {
    const link = `https://nirjar.me/articles/${b.slug}`
    const bodyHtml = b.sections
      .map(
        (s) =>
          `<h2>${escXml(s.subtitle)}</h2>` +
          s.content
            .split("\n\n")
            .map((p) => `<p>${escXml(p).replaceAll("\n", "<br/>")}</p>`)
            .join(""),
      )
      .join("")
    return [
      "  <item>",
      `    <title>${escXml(b.title)}</title>`,
      `    <link>${link}</link>`,
      `    <guid isPermaLink="true">${link}</guid>`,
      `    <description>${escXml(b.description)}</description>`,
      `    <content:encoded>${escXml(bodyHtml)}</content:encoded>`,
      `    <category>${escXml(b.category)}</category>`,
      `    <pubDate>${rssPubDate(b.updated)}</pubDate>`,
      "  </item>",
    ].join("\n")
  })
  .join("\n")
const rssXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">\n` +
  `<channel>\n` +
  `  <title>Nirjar Goswami — Articles</title>\n` +
  `  <link>https://nirjar.me/articles</link>\n` +
  `  <atom:link href="https://nirjar.me/rss.xml" rel="self" type="application/rss+xml" />\n` +
  `  <description>Notes on systems, security, and the craft of building by Nirjar Goswami.</description>\n` +
  `  <language>en-us</language>\n` +
  `  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n` +
  `  <generator>nirjar.me prerender</generator>\n` +
  `${rssItems}\n` +
  `</channel>\n` +
  `</rss>\n`
fs.writeFileSync(path.resolve(distDir, "rss.xml"), rssXml, "utf-8")
fs.writeFileSync(path.resolve(projectRoot, "public/rss.xml"), rssXml, "utf-8")
