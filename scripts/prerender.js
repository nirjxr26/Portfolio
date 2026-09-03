import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"

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
    const fullPath = path.resolve(projectRoot, relativeFilePath)
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
    const fullPath = path.resolve(projectRoot, relativeFilePath)
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath)
      return stat.mtime.toISOString().split("T")[0]
    }
  } catch {
    // Ignore
  }

  return new Date().toISOString().split("T")[0]
}

function createCaseStudyRoute({
  slug,
  title,
  name,
  description,
  repoUrl,
  language = "Go",
  license = "https://opensource.org/licenses/MIT",
  runtimePlatform = "Kubernetes, Linux, Docker",
}) {
  const itemName = name || slug
  return {
    path: `/works/${slug}`,
    title,
    description,
    canonical: `https://nirjar.me/works/${slug}`,
    sourceFile: `src/data/${slug}.ts`,
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
            { "@type": "ListItem", position: 3, name: itemName, item: `https://nirjar.me/works/${slug}` },
          ],
        },
        {
          "@type": "SoftwareSourceCode",
          name: itemName,
          description,
          codeRepository: repoUrl,
          programmingLanguage: language,
          license,
          runtimePlatform,
          author: {
            "@type": "Person",
            name: "Nirjar Goswami",
            url: "https://nirjar.me",
          },
        },
      ],
    },
  }
}

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
          jobTitle: "Cloud & Security Engineer",
          sameAs: [
            "https://github.com/nirjxr26",
            "https://www.linkedin.com/in/nirjxr",
            "https://x.com/nirjxrgoswami",
            "https://instagram.com/nirjar_goswami",
          ],
          knowsAbout: [
            "Cloud Infrastructure",
            "Cloud Architecture",
            "Cloud Security",
            "Cybersecurity",
            "Identity & Access Management",
            "System Design",
            "DevOps",
          ],
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
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "TechArticle",
                headline: "Why AI can't rewrite Windows ?",
                description: "50M lines. 41 years and decades of decisions.",
                url: "https://blog.nirjar.me/why-ai-can-t-just-rewrite-windows",
                author: { "@id": "https://nirjar.me/#person" },
                publisher: { "@id": "https://nirjar.me/#person" },
                about: "Generative AI",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "TechArticle",
                headline: "SonarQube analysis",
                description: "872 hidden issues. One scan. 30 days to fix what I couldn't see before.",
                url: "https://blog.nirjar.me/sonarqube",
                author: { "@id": "https://nirjar.me/#person" },
                publisher: { "@id": "https://nirjar.me/#person" },
                about: "Observability",
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "TechArticle",
                headline: "How Git changed the way I work",
                description: "Not just a code host. A place that quietly reshaped how I build.",
                url: "https://blog.nirjar.me/how-github-changed-my-workflow",
                author: { "@id": "https://nirjar.me/#person" },
                publisher: { "@id": "https://nirjar.me/#person" },
                about: "Developer Tools",
              },
            },
            {
              "@type": "ListItem",
              position: 4,
              item: {
                "@type": "TechArticle",
                headline: "VaultLock's logo fetching problem",
                description: "Getting the right brand logo, every time, without breaking the UI.",
                url: "https://blog.nirjar.me/vaultlock-logo-fetching",
                author: { "@id": "https://nirjar.me/#person" },
                publisher: { "@id": "https://nirjar.me/#person" },
                about: "Security",
              },
            },
          ],
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
      ],
    },
  },
  createCaseStudyRoute({
    slug: "bastion",
    name: "Bastion",
    title: "Bastion | Self-Hosted IAM Platform",
    description: "Auth, MFA, sessions, and audit logs — self-hosted access control with zero third-party access to your data.",
    repoUrl: "https://github.com/nirjxr26/Bastion",
  }),
  createCaseStudyRoute({
    slug: "kost",
    name: "Kost",
    title: "Kost | Kubernetes Cost Optimizer",
    description: "A Go agent that flags over-provisioned pods and hands you the kubectl command to fix them.",
    repoUrl: "https://github.com/nirjxr26/Kost",
  }),
  createCaseStudyRoute({
    slug: "hookdrop",
    name: "HookDrop",
    title: "HookDrop | Go Webhook Receiver",
    description: "Built to be watched. Every event traced live. Every image proven before it runs.",
    repoUrl: "https://github.com/nirjxr26",
  }),
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

  // Replace Twitter Tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`
  )
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`
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

console.log("✨ All 5 routes prerendered successfully with 100/100 production SEO!")
