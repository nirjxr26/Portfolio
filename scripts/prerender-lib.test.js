import { describe, expect, it } from "vitest"
import {
  buildArticleMarkdown,
  buildJsonFeed,
  buildLlmsArticleLines,
  buildRssItems,
  buildRssXml,
  buildSitemapXml,
  escXml,
  rssPubDate,
  spliceLlmsSection,
} from "./prerender-lib.js"

const twoPosts = [
  {
    slug: "older",
    title: "Older",
    description: "Old desc",
    updated: "April 8, 2026",
    category: "DevOps",
    cardDesc: "Old card",
    sections: [{ subtitle: "Sub", content: "Body" }],
  },
  {
    slug: "newer",
    title: "Newer & <b>",
    description: "New desc",
    updated: "September 16, 2026",
    category: "Security",
    cardDesc: "New card",
    sections: [{ subtitle: "Sub", content: "Body" }],
  },
]

describe("escXml", () => {
  it("escapes markup characters", () => {
    expect(escXml(`<a href="x">'&'`)).toBe("&lt;a href=&quot;x&quot;&gt;&apos;&amp;&apos;")
  })
})

describe("rssPubDate", () => {
  it("renders midday UTC", () => {
    expect(rssPubDate("September 16, 2026")).toContain("2026")
    expect(rssPubDate("September 16, 2026")).toContain("GMT")
  })
})

describe("buildSitemapXml", () => {
  it("emits one url node per entry", () => {
    const xml = buildSitemapXml([
      { canonical: "https://nirjar.me/", lastmod: "2026-09-16", changefreq: "weekly", priority: "1.0" },
    ])
    expect(xml).toContain("<loc>https://nirjar.me/</loc>")
    expect(xml).toContain("<lastmod>2026-09-16</lastmod>")
    expect(xml).toContain("<urlset")
  })
})

describe("buildRssItems", () => {
  it("sorts newest-first and escapes titles", () => {
    const items = buildRssItems(twoPosts)
    expect(items.indexOf("Newer")).toBeLessThan(items.indexOf("Older"))
    expect(items).toContain("Newer &amp; &lt;b&gt;")
    expect(items).toContain("https://nirjar.me/articles/newer")
  })
})

describe("buildRssXml", () => {
  it("wraps items in a channel with the given description", () => {
    const xml = buildRssXml("  <item/>", "Channel desc")
    expect(xml).toContain("<description>Channel desc</description>")
    expect(xml).toContain("  <item/>")
    expect(xml).toContain("<generator>nirjar.me prerender</generator>")
  })
})

describe("buildLlmsArticleLines", () => {
  it("lists newest-first in link format with markdown twin", () => {
    const lines = buildLlmsArticleLines(twoPosts)
    expect(lines).toHaveLength(2)
    expect(lines[0]).toBe('- "Newer & <b>": New card (Markdown: https://nirjar.me/articles/newer.md, HTML: https://nirjar.me/articles/newer).')
  })
})

describe("buildJsonFeed", () => {
  it("emits valid JSON Feed with items", () => {
    const json = buildJsonFeed(twoPosts, "Feed description")
    const parsed = JSON.parse(json)
    expect(parsed.version).toBe("https://jsonfeed.org/version/1.1")
    expect(parsed.title).toBe("Nirjar Goswami — Articles")
    expect(parsed.home_page_url).toBe("https://nirjar.me")
    expect(parsed.feed_url).toBe("https://nirjar.me/feed.json")
    expect(parsed.items).toHaveLength(2)
    expect(parsed.items[0].url).toBe("https://nirjar.me/articles/newer")
    expect(parsed.items[0].title).toBe("Newer & <b>")
    expect(parsed.items[0].tags).toEqual(["Security"])
  })
})

describe("buildArticleMarkdown", () => {
  it("renders frontmatter and markdown sections", () => {
    const md = buildArticleMarkdown(twoPosts[1])
    expect(md).toContain('title: "Newer & <b>"')
    expect(md).toContain("canonical: \"https://nirjar.me/articles/newer\"")
    expect(md).toContain("# Newer & <b>")
    expect(md).toContain("## Sub\n\nBody")
  })
})

describe("XML escaping in generated feeds", () => {
  it("escapes sitemap fields", () => {
    const xml = buildSitemapXml([
      { canonical: "https://nirjar.me/?a=1&b=2", lastmod: "2026-09-16", changefreq: "weekly", priority: "1.0" },
    ])
    expect(xml).toContain("<loc>https://nirjar.me/?a=1&amp;b=2</loc>")
  })

  it("escapes the RSS channel description", () => {
    const xml = buildRssXml("  <item/>", "R&D <notes>")
    expect(xml).toContain("<description>R&amp;D &lt;notes&gt;</description>")
  })
})

describe("ISO date inputs", () => {
  it("accepts ISO updated dates without throwing", () => {
    const isoPost = { ...twoPosts[1], updated: "2026-09-16T00:00:00Z" }
    expect(() => buildArticleMarkdown(isoPost)).not.toThrow()
    expect(() => buildJsonFeed([isoPost], "d")).not.toThrow()
    expect(() => rssPubDate(isoPost.updated)).not.toThrow()
  })
})

describe("spliceLlmsSection", () => {
  it("replaces only the article list", () => {
    const out = spliceLlmsSection("# T\n\n## Technical Articles & Writing\n- old\n\n## Next\nkeep", [
      '- "N": d (u).',
    ])
    expect(out).toBe('# T\n\n## Technical Articles & Writing\n- "N": d (u).\n\n## Next\nkeep')
  })

  it("returns null when the section is missing", () => {
    expect(spliceLlmsSection("# T\nnope", ["- x"])).toBeNull()
  })
})
