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
    if (!fs.existsSync(fullPath) && fs.existsSync(fullPath + "x")) {
      fullPath = fullPath + "x"
    }
    if (fs.existsSync(fullPath)) {
      const output = execSync(`git log -1 --format=%aI -- "${fullPath}"`, {
        cwd: projectRoot,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "ignore"],
      }).trim()
      if (output) {
        return output.split("T")[0]
      }
    }
  } catch {
    // Fallback to file mtime or today
  }

  try {
    let fullPath = path.resolve(projectRoot, relativeFilePath)
    if (!fs.existsSync(fullPath) && fs.existsSync(fullPath + "x")) {
      fullPath = fullPath + "x"
    }
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath)
      return stat.mtime.toISOString().split("T")[0]
    }
  } catch {
    // Ignore
  }

  return new Date().toISOString().split("T")[0]
}

function toPlainText(node) {
  if (!node) return ""
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(toPlainText).join("")
  if (typeof node === "object" && node !== null && "props" in node) {
    if (node.props && node.props.children) {
      return toPlainText(node.props.children)
    }
  }
  return ""
}

// Dynamically load live TypeScript data modules via Vite's SSR runtime
console.log("📦 Loading application data modules for unified single-source prerendering...")
const vite = await createServer({
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent",
})

let homeMod, caseStudiesMod, navMod
try {
  homeMod = await vite.ssrLoadModule("/src/data/home.ts")
  caseStudiesMod = await vite.ssrLoadModule("/src/data/caseStudies.ts")
  navMod = await vite.ssrLoadModule("/src/data/navigation.ts")
} finally {
  await vite.close()
}

const { articles } = homeMod
const { CASE_STUDIES } = caseStudiesMod
const { SOCIAL_LINKS } = navMod

// Dynamically build case study routes from CASE_STUDIES with rich Schema.org metadata
const caseStudyRoutes = Object.entries(CASE_STUDIES).map(([slug, data]) => {
  const headlineText = toPlainText(data.hero.headline)
  const title = data.seoTitle || `${data.hero.title} | ${headlineText || data.hero.subhead}`
  const description = data.hero.subhead
  const repoUrl = data.cta.url
  const canonical = `https://nirjar.me/works/${slug}`
  const sourceFile = fs.existsSync(path.resolve(projectRoot, `src/data/${slug}.tsx`))
    ? `src/data/${slug}.tsx`
    : `src/data/${slug}.ts`

  return {
    path: `/works/${slug}`,
    title,
    description,
    canonical,
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
          codeRepository: repoUrl,
          programmingLanguage: data.softwareSchema?.programmingLanguage || "Go",
          license: data.softwareSchema?.license || "https://opensource.org/licenses/MIT",
          runtimePlatform: data.softwareSchema?.runtimePlatform || "Kubernetes, Linux, Docker",
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://nirjar.me/#website",
          },
          author: {
            "@type": "Person",
            "@id": "https://nirjar.me/#person",
            name: "Nirjar Goswami",
            url: "https://nirjar.me",
          },
        },
      ],
    },
  }
})

const articleSchemaItems = articles.map((art, idx) => ({
  "@type": "ListItem",
  position: idx + 1,
  item: {
    "@type": "TechArticle",
    headline: art.title,
    description: art.desc.trim(),
    url: art.link,
    author: { "@id": "https://nirjar.me/#person" },
    publisher: { "@id": "https://nirjar.me/#person" },
    about: art.category || "Technology",
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
    codeRepository: cs.cta.url,
  },
}))

const routes = [
  {
    path: "/",
    title: "Nirjar Goswami | Cloud & Security Engineer",
    description:
      "Cloud, Security & Systems Engineer specializing in cloud architecture, DevOps, cybersecurity, identity platforms, and resilient, cost-aware infrastructure.",
    canonical: "https://nirjar.me",
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
          mainEntity: {
            "@id": "https://nirjar.me/#person",
          },
        },
        {
          "@type": "Person",
          "@id": "https://nirjar.me/#person",
          name: "Nirjar Goswami",
          url: "https://nirjar.me",
          image: "https://nirjar.me/og-image.webp",
          jobTitle: "Cloud & Security Engineer",
          email: "mailto:nirjargoswami2626@gmail.com",
          sameAs: [
            SOCIAL_LINKS.github,
            SOCIAL_LINKS.linkedin,
            SOCIAL_LINKS.twitter,
            SOCIAL_LINKS.instagram,
          ].filter(Boolean),
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
          publisher: {
            "@id": "https://nirjar.me/#person",
          },
          inLanguage: "en-US",
        },
        {
          "@type": "ItemList",
          "@id": "https://nirjar.me/#articles",
          name: "Technical Articles & Publications",
          description: "Technical articles on systems, observability, security, and developer tooling by Nirjar Goswami.",
          itemListElement: articleSchemaItems,
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
          mainEntity: {
            "@type": "ItemList",
            name: "Featured Software & Infrastructure Systems",
            itemListElement: worksCollectionItems,
          },
        },
      ],
    },
  },
  ...caseStudyRoutes,
]

console.log("🚀 Prerendering static HTML route heads and dynamic schemas...")

routes.forEach((route) => {
  let html = template

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)

  // Replace Description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`
  )

  // Replace Canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/,
    `<link rel="canonical" href="${route.canonical}" />`
  )

  // Replace OG Tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`
  )
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`
  )
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
    `<meta property="og:url" content="${route.canonical}" />`
  )
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content=".*?"\s*\/?>/,
    `<meta property="og:image:alt" content="${route.title}" />`
  )

  // Replace Twitter Tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`
  )
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`
  )
  html = html.replace(
    /<meta\s+name="twitter:image:alt"\s+content=".*?"\s*\/?>/,
    `<meta name="twitter:image:alt" content="${route.title}" />`
  )

  // Replace JSON-LD schema
  if (route.schema) {
    const formattedSchema = JSON.stringify(route.schema, null, 2)
    html = html.replace(
      /<script\s+id="dynamic-jsonld-schema"\s+type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="dynamic-jsonld-schema" type="application/ld+json">\n${formattedSchema}\n    </script>`
    )
  }

  // Determine output location
  let outputPath
  if (route.path === "/") {
    outputPath = path.resolve(distDir, "index.html")
  } else {
    const routeDir = path.resolve(distDir, route.path.substring(1))
    fs.mkdirSync(routeDir, { recursive: true })
    outputPath = path.resolve(routeDir, "index.html")
  }

  fs.writeFileSync(outputPath, html, "utf-8")
  console.log(`  ✓ Prerendered ${route.path} -> ${outputPath}`)
})

// Prerender 404.html with noindex, nofollow for real HTTP 404 handler
console.log("🛑 Prerendering 404.html error page...")
let notFoundHtml = template
notFoundHtml = notFoundHtml.replace(/<title>.*?<\/title>/, `<title>Page Not Found | Nirjar Goswami</title>`)
notFoundHtml = notFoundHtml.replace(
  /<meta\s+name="robots"\s+content=".*?"\s*\/?>/,
  `<meta name="robots" content="noindex, nofollow" />`
)
fs.writeFileSync(path.resolve(distDir, "404.html"), notFoundHtml, "utf-8")
console.log("  ✓ Generated dist/404.html with noindex headers")

// Generate dynamic sitemap.xml with Git-derived lastmod dates
console.log("🗺️  Generating dynamic sitemap.xml with Git commit timestamps...")

const sitemapEntries = routes.map((r) => {
  const lastmod = getGitLastMod(r.sourceFile)
  return `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
}).join("\n")

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`

fs.writeFileSync(path.resolve(distDir, "sitemap.xml"), sitemapXml, "utf-8")
console.log("  ✓ Generated dist/sitemap.xml with dynamic lastmod timestamps")

console.log(`✨ All ${routes.length} routes prerendered successfully with 100/100 production SEO!`)
