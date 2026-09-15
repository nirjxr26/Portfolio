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

const BLOG_KEYWORDS = {
  "why-ai-cant-just-rewrite-windows":
    "AI, Windows, code generation, scale, complexity, backward compatibility, dependencies, Microsoft, 50 million lines, Git, context window, Gemini, Claude, Veracode, Brooks Law, multi-agent, .NET Runtime, operating system, rewrite",
  "872-issues-30-days-sonarqube":
    "SonarQube, AegisMesh, code quality, technical debt, bugs, vulnerabilities, security hotspots, code smells, duplication, Quality Gates, React, cognitive complexity, JWT, regex, maintainability, reliability",
  "containerized-aegismesh-docker-kubernetes-jenkins":
    "Docker, Kubernetes, Jenkins, Prisma, dumb-init, Nginx, Vite, healthcheck, ConfigMap, Secret, .dockerignore, Node.js, CI/CD, containerization, AegisMesh, DevOps",
  "rethinking-my-git-workflow":
    "Git, GitHub, workflow, version control, commit, branch, README, portfolio, collaboration, green squares, staging, push, clone",
  "how-vaultlock-reliably-fetches-brand-logos":
    "VaultLock, logo, brand, favicon, Clearbit, Google, DuckDuckGo, caching, validation, QML, Qt, backend, input normalization, offline password manager",
  "building-deploylens-exposed-my-deployment-blind-spots":
    "DeployLens, CI/CD, pipeline, GitHub Actions, AWS, IAM, OIDC, CodeQL, SAST, ECS, SHA, deployment, visibility, security, secrets, CodeDeploy",
  "ai-agents-have-permissions-who-controls-them":
    "AI agents, IAM, authorization, least privilege, OAuth, non-human identity, prompt injection, insider threat, short-lived credentials, infrastructure as code, AegisMesh, deployment security",
}

console.log("📦 Loading application data modules for unified single-source prerendering...")
const vite = await createServer({ root: projectRoot, server: { middlewareMode: true }, appType: "custom", logLevel: "silent" })

let homeMod, caseStudiesMod, navMod, blogMod, siteMod, seoMod
try {
  homeMod = await vite.ssrLoadModule("/src/data/home.ts")
  caseStudiesMod = await vite.ssrLoadModule("/src/data/caseStudies.ts")
  navMod = await vite.ssrLoadModule("/src/data/navigation.ts")
  blogMod = await vite.ssrLoadModule("/src/data/blogArticles.ts")
  siteMod = await vite.ssrLoadModule("/src/data/site.ts")
  seoMod = await vite.ssrLoadModule("/src/data/seo.ts")
} finally {
  await vite.close()
}

const { articles } = homeMod
const { CASE_STUDIES } = caseStudiesMod
const { SOCIAL_LINKS } = navMod
const { BLOG_ARTICLES } = blogMod
const { SITE_KEYWORDS: SITE_KEYWORDS_SHARED, SITE_OG_IMAGE, SITE_URL } = siteMod
const { buildBreadcrumbSchema, buildTechArticleSchema, estimateWordCount, toISODate } = seoMod

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
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://nirjar.me" },
            { "@type": "ListItem", position: 2, name: "Works", item: "https://nirjar.me/works" },
            { "@type": "ListItem", position: 3, name: data.hero.title, item: canonical },
          ],
        },
        {
          "@type": "SoftwareSourceCode",
          "@id": `${canonical}#software`,
          name: data.hero.title,
          description,
          url: canonical,
          image: OG_IMAGE,
          codeRepository: repoUrl,
          programmingLanguage: data.softwareSchema?.programmingLanguage || "Go",
          license: data.softwareSchema?.license || "https://opensource.org/licenses/MIT",
          runtimePlatform: data.softwareSchema?.runtimePlatform || "Kubernetes, Linux, Docker",
          author: { "@id": "https://nirjar.me/#person" },
          publisher: { "@id": "https://nirjar.me/#person" },
          isPartOf: { "@id": "https://nirjar.me/#website" },
          inLanguage: "en-US",
          keywords,
        },
      ],
    },
  }
})

const articleCardItems = articles.map((art, idx) => ({
  "@type": "ListItem",
  position: idx + 1,
  item: {
    "@type": "TechArticle",
    headline: art.title,
    description: art.desc.trim(),
    url: `https://nirjar.me${art.link}`,
    image: OG_IMAGE,
    author: { "@id": "https://nirjar.me/#person" },
    publisher: { "@id": "https://nirjar.me/#person" },
    datePublished: art.date ? toISODate(art.date) : undefined,
    dateModified: art.date ? toISODate(art.date) : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://nirjar.me${art.link}` },
    inLanguage: "en-US",
    isPartOf: { "@id": "https://nirjar.me/#website" },
    keywords: art.category,
  },
}))

const worksCollectionItems = Object.entries(CASE_STUDIES).map(([slug, cs], idx) => ({
  "@type": "ListItem",
  position: idx + 1,
  item: {
    "@type": "SoftwareSourceCode",
    name: cs.hero.title,
    description: cs.hero.subhead,
    url: `https://nirjar.me/works/${slug}`,
    image: OG_IMAGE,
    codeRepository: cs.cta.url,
    author: { "@id": "https://nirjar.me/#person" },
  },
}))

function buildArticleRoute(blog) {
  const canonical = `https://nirjar.me/articles/${blog.slug}`
  const isoDate = toISODate(blog.updated)
  const wordCount = estimateWordCount(blog.sections.map((s) => s.subtitle + " " + s.content).join(" ") + " " + blog.description)
  const keywords = BLOG_KEYWORDS[blog.slug] || `${blog.category}, ${blog.title}, Nirjar Goswami, ${SITE_KEYWORDS}`
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

const allArticleKeywords = BLOG_ARTICLES.map((b) => BLOG_KEYWORDS[b.slug]).join(", ")

const routes = [
  {
    path: "/",
    title: "Nirjar Goswami | Cloud & Security Engineer",
    description:
      "Cloud, Security & Systems Engineer specializing in cloud architecture, DevOps, cybersecurity, identity platforms, and resilient, cost-aware infrastructure.",
    canonical: "https://nirjar.me",
    keywords: `${SITE_KEYWORDS}, ${allArticleKeywords}`,
    sourceFile: "src/data/home.ts",
    priority: "1.0",
    changefreq: "weekly",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": "https://nirjar.me/#profilepage",
          url: "https://nirjar.me",
          name: "Nirjar Goswami | Cloud & Security Engineer",
          mainEntity: { "@id": "https://nirjar.me/#person" },
        },
        {
          "@type": "Person",
          "@id": "https://nirjar.me/#person",
          name: "Nirjar Goswami",
          url: "https://nirjar.me",
          image: OG_IMAGE,
          jobTitle: "Cloud & Security Engineer",
          email: "mailto:nirjargoswami2626@gmail.com",
          sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.twitter, SOCIAL_LINKS.instagram].filter(Boolean),
          knowsAbout: [
            "Cloud Infrastructure",
            "Cloud Architecture",
            "Cloud Security",
            "Cybersecurity",
            "Identity & Access Management",
            "System Design",
            "DevOps",
            "Kubernetes",
            "Go",
          ],
          hasOccupation: {
            "@type": "Occupation",
            name: "Cloud & Security Engineer",
            occupationalCategory: "15-1252.00",
            skills: "Cloud Architecture, Kubernetes, DevOps, Cybersecurity, IAM, Go",
          },
          description: "Cloud & Security Engineer building systems meant to be forgotten.",
        },
        {
          "@type": "WebSite",
          "@id": "https://nirjar.me/#website",
          url: "https://nirjar.me",
          name: "Nirjar Goswami Portfolio",
          description: "Official website and case studies of Nirjar Goswami.",
          publisher: { "@id": "https://nirjar.me/#person" },
          inLanguage: "en-US",
          keywords: SITE_KEYWORDS,
        },
        {
          "@type": "ItemList",
          "@id": "https://nirjar.me/#articles",
          name: "Technical Articles & Publications",
          description: "Technical articles on systems, observability, security, and developer tooling by Nirjar Goswami.",
          itemListElement: articleCardItems,
        },
      ],
    },
  },
  {
    path: "/works",
    title: "Works | Nirjar Goswami",
    description:
      "Explore systems, infrastructure, and open-source tools built by Nirjar Goswami, including Bastion, Kost, and HookDrop.",
    canonical: "https://nirjar.me/works",
    keywords: `Works, ${SITE_KEYWORDS}, Bastion, Kost, HookDrop, Systems, Infrastructure`,
    sourceFile: "src/components/pages/WorksClient.tsx",
    priority: "0.9",
    changefreq: "monthly",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://nirjar.me" },
            { "@type": "ListItem", position: 2, name: "Works", item: "https://nirjar.me/works" },
          ],
        },
        {
          "@type": "CollectionPage",
          "@id": "https://nirjar.me/works#collection",
          url: "https://nirjar.me/works",
          name: "Works & Systems Architecture | Nirjar Goswami",
          description:
            "Explore systems, infrastructure, and open-source tools built by Nirjar Goswami, including Bastion, Kost, and HookDrop.",
          isPartOf: { "@id": "https://nirjar.me/#website" },
          inLanguage: "en-US",
          keywords: `Works, ${SITE_KEYWORDS}`,
          mainEntity: {
            "@type": "ItemList",
            name: "Featured Software & Infrastructure Systems",
            itemListElement: worksCollectionItems,
          },
        },
      ],
    },
  },
  {
    path: "/articles",
    title: "Articles | Nirjar Goswami",
    description: "Notes on systems, security, and the craft of building by Nirjar Goswami.",
    canonical: "https://nirjar.me/articles",
    keywords: `Articles, Blog, Technical Writing, ${allArticleKeywords}`,
    sourceFile: "src/components/pages/ArticleClient.tsx",
    priority: "0.9",
    changefreq: "weekly",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://nirjar.me" },
            { "@type": "ListItem", position: 2, name: "Articles", item: "https://nirjar.me/articles" },
          ],
        },
        {
          "@type": "CollectionPage",
          "@id": "https://nirjar.me/articles#collection",
          url: "https://nirjar.me/articles",
          name: "Articles | Nirjar Goswami",
          description: "Notes on systems, security, and the craft of building by Nirjar Goswami.",
          isPartOf: { "@id": "https://nirjar.me/#website" },
          inLanguage: "en-US",
          keywords: allArticleKeywords,
          mainEntity: {
            "@type": "ItemList",
            name: "Technical Articles & Publications",
            description: "All technical articles by Nirjar Goswami — bento grid, same short desc as cards.",
            itemListElement: articleCardItems,
          },
        },
      ],
    },
  },
  ...articleDetailRoutes,
  ...caseStudyRoutes,
]

console.log("🚀 Prerendering static HTML route heads and dynamic schemas...")

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
  console.log(`  ✓ Prerendered ${route.path} -> ${outputPath}`)
})

console.log("🛑 Prerendering 404.html error page...")
let notFoundHtml = template
notFoundHtml = notFoundHtml.replace(/<title>.*?<\/title>/, `<title>Page Not Found | Nirjar Goswami</title>`)
notFoundHtml = notFoundHtml.replace(/<meta\s+name="robots"\s+content=".*?"\s*\/?>/, `<meta name="robots" content="noindex, nofollow" />`)
fs.writeFileSync(path.resolve(distDir, "404.html"), notFoundHtml, "utf-8")
console.log("  ✓ Generated dist/404.html with noindex headers")

console.log("🗺️  Generating dynamic sitemap.xml with Git commit timestamps...")
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
console.log("  ✓ Generated dist/sitemap.xml with dynamic lastmod timestamps")
console.log(`✨ All ${routes.length} routes prerendered successfully with 100/100 production SEO!`)
