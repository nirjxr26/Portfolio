<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/> (RSS Feed)</title>
        <style>
          :root {
            --bg: #090a0f;
            --surface: #111318;
            --surface-hover: #161922;
            --border: rgba(255, 255, 255, 0.1);
            --text: #f0f2f5;
            --text-muted: #8b949e;
            --accent: #38bdf8;
            --accent-soft: rgba(56, 189, 248, 0.12);
            --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
            --font-mono: "TX-02-Data", "TX-02", "Berkeley Mono Variable", "Berkeley Mono", ui-monospace, SFMono-Regular, monospace;
          }
          @media (prefers-color-scheme: light) {
            :root {
              --bg: #fafafa;
              --surface: #ffffff;
              --surface-hover: #f4f4f5;
              --border: rgba(0, 0, 0, 0.08);
              --text: #111827;
              --text-muted: #6b7280;
              --accent: #0284c7;
              --accent-soft: rgba(2, 132, 199, 0.1);
            }
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background: var(--bg);
            color: var(--text);
            font-family: var(--font-sans);
            line-height: 1.6;
            padding: 2.5rem 1rem;
            min-height: 100vh;
          }
          .container {
            max-width: 780px;
            margin: 0 auto;
          }
          .header-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 1.75rem 2rem;
            margin-bottom: 2rem;
          }
          .feed-badge {
            display: inline-block;
            font-family: var(--font-mono);
            font-size: 0.72rem;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            padding: 0.25rem 0.6rem;
            border-radius: 6px;
            background: var(--accent-soft);
            color: var(--accent);
            margin-bottom: 0.75rem;
          }
          h1 {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 0.5rem;
            letter-spacing: -0.02em;
          }
          .feed-desc {
            font-size: 0.95rem;
            color: var(--text-muted);
            margin-bottom: 1rem;
            line-height: 1.5;
          }
          .feed-subscribe {
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            font-size: 0.85rem;
            color: var(--text-muted);
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
          }
          .feed-url {
            font-family: var(--font-mono);
            font-size: 0.82rem;
            color: var(--accent);
            word-break: break-all;
          }
          .articles {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }
          .article-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.5rem 1.75rem;
            transition: all 0.2s ease;
          }
          .article-card:hover {
            border-color: var(--accent);
            background: var(--surface-hover);
          }
          .meta {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.8rem;
            color: var(--text-muted);
            margin-bottom: 0.6rem;
            flex-wrap: wrap;
          }
          .category-tag {
            font-family: var(--font-mono);
            font-size: 0.72rem;
            color: var(--accent);
            background: var(--accent-soft);
            padding: 0.15rem 0.5rem;
            border-radius: 4px;
            font-weight: 500;
          }
          .title {
            font-size: 1.22rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            letter-spacing: -0.01em;
          }
          .title a {
            color: var(--text);
            text-decoration: none;
          }
          .title a:hover {
            color: var(--accent);
          }
          .description {
            color: var(--text-muted);
            font-size: 0.92rem;
            line-height: 1.6;
          }
          footer {
            margin-top: 3rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border);
            text-align: center;
            font-size: 0.85rem;
            color: var(--text-muted);
          }
          footer a {
            color: var(--accent);
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header class="header-card">
            <span class="feed-badge">RSS 2.0 Feed</span>
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p class="feed-desc"><xsl:value-of select="/rss/channel/description"/></p>
            <div class="feed-subscribe">
              <span>Subscribe by copying this feed URL into your RSS reader (NetNewsWire, Feedly, Inoreader, etc.):</span>
              <span class="feed-url"><xsl:value-of select="/rss/channel/atom:link/@href"/></span>
            </div>
          </header>

          <main class="articles">
            <xsl:for-each select="/rss/channel/item">
              <article class="article-card">
                <div class="meta">
                  <span class="category-tag"><xsl:value-of select="category"/></span>
                  <time><xsl:value-of select="pubDate"/></time>
                </div>
                <h2 class="title">
                  <a href="{link}">
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <p class="description">
                  <xsl:value-of select="description"/>
                </p>
              </article>
            </xsl:for-each>
          </main>

          <footer>
            <p>© Nirjar Goswami • <a href="https://nirjar.me">nirjar.me</a> • <a href="https://nirjar.me/articles">All Articles</a></p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
