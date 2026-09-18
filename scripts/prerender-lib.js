export function toPlainText(node) {
  if (!node) return ""
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(toPlainText).join("")
  if (typeof node === "object" && node !== null && "props" in node) {
    if (node.props?.children) return toPlainText(node.props.children)
  }
  return ""
}

export function escXml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

export function rssPubDate(updated) {
  return new Date(`${updated} 12:00:00 UTC`).toUTCString()
}

export function buildSitemapXml(entries) {
  const body = entries
    .map(
      (r) =>
        `  <url>\n    <loc>${r.canonical}</loc>\n    <lastmod>${r.lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
    )
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

export function buildRssItems(articles) {
  return [...articles]
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
}

export function buildRssXml(items, channelDescription) {
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">\n` +
    `<channel>\n` +
    `  <title>Nirjar Goswami — Articles</title>\n` +
    `  <link>https://nirjar.me/articles</link>\n` +
    `  <atom:link href="https://nirjar.me/rss.xml" rel="self" type="application/rss+xml" />\n` +
    `  <description>${channelDescription}</description>\n` +
    `  <language>en-us</language>\n` +
    `  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n` +
    `  <generator>nirjar.me prerender</generator>\n` +
    `${items}\n` +
    `</channel>\n` +
    `</rss>\n`
  )
}

export function buildLlmsArticleLines(articles) {
  return [...articles]
    .sort((a, b) => new Date(b.updated) - new Date(a.updated))
    .map((b) => `- "${b.title}": ${b.cardDesc.trim()} (https://nirjar.me/articles/${b.slug}).`)
}

export function spliceLlmsSection(source, lines, header = "## Technical Articles & Writing") {
  const out = source.split("\n")
  const start = out.findIndex((l) => l.trim() === header)
  if (start === -1) return null
  let end = start + 1
  while (end < out.length && out[end].startsWith("- ")) end += 1
  out.splice(start + 1, end - start - 1, ...lines)
  return out.join("\n")
}
