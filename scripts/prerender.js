import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execSync } from "node:child_process"
import { createServer } from "vite"
import {
  buildLlmsArticleLines,
  buildRssItems,
  buildRssXml,
  buildSitemapXml,
  spliceLlmsSection,
} from "./prerender-lib.js"


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
      const out = execSync(`git log -1 --format=%aI -- "${fullPath}"`, {
        cwd: projectRoot,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "ignore"],
      }).trim()
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

const vite = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent",
})

let routesMod, navMod, blogMod, seoMod, routeSchemasMod
try {
  routesMod = await vite.ssrLoadModule("/src/data/routes.ts")
  navMod = await vite.ssrLoadModule("/src/data/navigation.ts")
  blogMod = await vite.ssrLoadModule("/src/data/blogArticles.ts")
  seoMod = await vite.ssrLoadModule("/src/data/seo.ts")
  routeSchemasMod = await vite.ssrLoadModule("/src/data/routeSchemas.ts")
} finally {
  await vite.close()
}

const { BLOG_ARTICLES } = blogMod
const { ROUTE_META } = routesMod
const { JSONLD_SCRIPT_ID } = seoMod
const { STATIC_ROUTE_SOURCE_FILES, buildStaticRoutes } = routeSchemasMod

function sourceFileFor(routePath) {
  const staticMatch = STATIC_ROUTE_SOURCE_FILES[routePath]
  if (staticMatch) return staticMatch
  if (routePath.startsWith("/articles/")) return "src/data/blogArticles.ts"
  const slug = routePath.slice("/works/".length)
  return fs.existsSync(path.resolve(projectRoot, `src/data/${slug}.tsx`))
    ? `src/data/${slug}.tsx`
    : `src/data/${slug}.ts`
}

const routes = buildStaticRoutes()

function replaceHead(html, pattern, replacement) {
  return html.replace(pattern, replacement)
}

function renderRouteHtml(route) {
  let html = template
  const ogType = route.ogType ?? (route.path.startsWith("/articles/") ? "article" : "website")

  html = replaceHead(html, /<title>.*?<\/title>/, `<title>${route.title}</title>`)
  html = replaceHead(
    html,
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`,
  )
  html = replaceHead(
    html,
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/,
    `<link rel="canonical" href="${route.canonical}" />`,
  )
  html = replaceHead(
    html,
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`,
  )
  html = replaceHead(
    html,
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`,
  )
  html = replaceHead(
    html,
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
    `<meta property="og:url" content="${route.canonical}" />`,
  )
  html = replaceHead(
    html,
    /<meta\s+property="og:image:alt"\s+content=".*?"\s*\/?>/,
    `<meta property="og:image:alt" content="${route.title}" />`,
  )
  html = replaceHead(
    html,
    /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/,
    `<meta property="og:type" content="${ogType}" />`,
  )
  html = replaceHead(
    html,
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`,
  )
  html = replaceHead(
    html,
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`,
  )
  html = replaceHead(
    html,
    /<meta\s+name="twitter:image:alt"\s+content=".*?"\s*\/?>/,
    `<meta name="twitter:image:alt" content="${route.title}" />`,
  )

  if (route.publishedTime || route.modifiedTime) {
    const stamps = [
      route.publishedTime
        ? `  <meta property="article:published_time" content="${route.publishedTime}" />`
        : null,
      route.modifiedTime
        ? `  <meta property="article:modified_time" content="${route.modifiedTime}" />`
        : null,
    ]
      .filter(Boolean)
      .join("\n")
    html = replaceHead(html, "</head>", `${stamps}\n  </head>`)
  }

  return replaceHead(
    html,
    new RegExp(`<script\\s+id="${JSONLD_SCRIPT_ID}"\\s+type="application\\/ld\\+json">[\\s\\S]*?<\\/script>`),
    `<script id="${JSONLD_SCRIPT_ID}" type="application/ld+json">\n${JSON.stringify(route.schema, null, 2).replace(/</g, "\\u003c")}\n    </script>`,
  )
}

for (const route of routes) {
  let outputPath
  if (route.path === "/") {
    outputPath = path.resolve(distDir, "index.html")
  } else {
    const routeDir = path.resolve(distDir, route.path.substring(1))
    fs.mkdirSync(routeDir, { recursive: true })
    outputPath = path.resolve(routeDir, "index.html")
  }
  fs.writeFileSync(outputPath, renderRouteHtml(route), "utf-8")
}

const notFoundHtml = template
  .replace(/<title>.*?<\/title>/, `<title>${ROUTE_META["/404"].title}</title>`)
  .replace(
    /<meta\s+name="robots"\s+content=".*?"\s*\/?>/,
    '<meta name="robots" content="noindex, nofollow" />',
  )
fs.writeFileSync(path.resolve(distDir, "404.html"), notFoundHtml, "utf-8")

const seenCanonical = new Set()
const sitemapRoutes = routes.filter((route) => {
  if (seenCanonical.has(route.canonical)) return false
  seenCanonical.add(route.canonical)
  return true
})
const sitemapXml = buildSitemapXml(
  sitemapRoutes.map((route) => ({
    canonical: route.canonical,
    changefreq: route.changefreq,
    priority: route.priority,
    lastmod: getGitLastMod(sourceFileFor(route.path)),
  })),
)
fs.writeFileSync(path.resolve(distDir, "sitemap.xml"), sitemapXml, "utf-8")
fs.writeFileSync(path.resolve(projectRoot, "public/sitemap.xml"), sitemapXml, "utf-8")

const rssXml = buildRssXml(buildRssItems(BLOG_ARTICLES), ROUTE_META["/articles"].description)
fs.writeFileSync(path.resolve(distDir, "rss.xml"), rssXml, "utf-8")
fs.writeFileSync(path.resolve(projectRoot, "public/rss.xml"), rssXml, "utf-8")

const llmsPublicPath = path.resolve(projectRoot, "public/llms.txt")
const llmsOut = spliceLlmsSection(
  fs.readFileSync(llmsPublicPath, "utf-8"),
  buildLlmsArticleLines(BLOG_ARTICLES),
)
if (llmsOut !== null) {
  fs.writeFileSync(llmsPublicPath, llmsOut, "utf-8")
  fs.writeFileSync(path.resolve(distDir, "llms.txt"), llmsOut, "utf-8")
}
