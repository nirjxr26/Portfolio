import { hero, frames, productionCapabilities, projects, articles, quote } from "./home"
import { CONTACT, FOOTER_CONNECT, FOOTER_RESOURCES } from "./navigation"
import {
  SITE_DEFAULT_DESC,
  SITE_DEFAULT_TITLE,
  SITE_URL,
} from "./site"

export function generateHomeMarkdown(): string {
  const metadataBlock = `---
title: "${SITE_DEFAULT_TITLE}"
description: "${SITE_DEFAULT_DESC}"
canonical: "${SITE_URL}"
---`

  const resumeAction = `[View Resume](${SITE_URL}/assets/nirjar_resume.pdf)`
  const worksAction = `[View Works](${SITE_URL}/works)`

  const whatIDoLines = frames
    .map(
      (f) =>
        `### ${f.tag}\n**${f.title}**\n${f.desc}`,
    )
    .join("\n\n")

  const featured = projects.slice(0, 4)
  const more = projects.slice(4)

  const featuredLines = featured
    .map((p) => {
      const lines = [
        `### ${p.title} (${p.year})`,
        `- **Category**: ${p.category}`,
        `- **Summary**: ${p.description}`,
      ]
      if (p.projectLink) {
        lines.push(`- **Case Study**: [Case Study](${SITE_URL}${p.projectLink})`)
      }
      if (p.link) {
        lines.push(`- **Repository**: [Repository](${p.link})`)
      }
      return lines.join("\n")
    })
    .join("\n\n")

  const moreLines = more
    .map((p) => {
      const lines = [
        `### ${p.title} (${p.year})`,
        `- **Category**: ${p.category}`,
        `- **Summary**: ${p.description}`,
      ]
      if (p.projectLink) {
        lines.push(`- **Case Study**: [Case Study](${SITE_URL}${p.projectLink})`)
      }
      if (p.link) {
        lines.push(`- **Repository**: [Repository](${p.link})`)
      }
      return lines.join("\n")
    })
    .join("\n\n")

  const howIThinkLines = productionCapabilities
    .map(
      (cap) =>
        `### ${cap.title}\n**${cap.tagline}**\n${cap.desc}`,
    )
    .join("\n\n")

  const homeArticles = articles.filter((a) => !a.hideFromHome && a.poster != null)
  const articleLines = homeArticles
    .map(
      (a) =>
        `### ${a.title}\n- **Read Time**: ${a.readTime}\n- **Date**: ${a.date}\n- **Category**: ${a.category}\n- **Summary**: ${a.desc}\n- **Link**: [Read Article](${SITE_URL}${a.link})`,
    )
    .join("\n\n")

  const resourcesLines = FOOTER_RESOURCES
    .map((r) => `- [${r.name}](${r.href.startsWith("/") ? `${SITE_URL}${r.href}` : r.href})`)
    .join("\n")

  const connectLines = FOOTER_CONNECT
    .map((c) => `- [${c.name}](${c.href})`)
    .join("\n")

  return `${metadataBlock}

# Nirjar Goswami

> **${hero.headingPrimary} ${hero.headingSecondary}**
> ${hero.subheading}

${resumeAction}
${worksAction}

## What I do.

${whatIDoLines}

## Featured work.

${featuredLines}

### More works

${moreLines}

[View all works](${SITE_URL}/works)

## How I think.

${howIThinkLines}

## Articles.

${articleLines}

[View other articles](${SITE_URL}/articles)

## Operating Credo

> "${quote}"

## Footer & Connect

### Website Tree

![Website Tree](${SITE_URL}/assets/sitemap/sitemap_white.svg#gh-light-mode-only)
![Website Tree](${SITE_URL}/assets/sitemap/sitemap_black.svg#gh-dark-mode-only)

### Resources
${resourcesLines}

### Connect
${connectLines}

### Contact
- **Email**: [${CONTACT.emailAddress}](mailto:${CONTACT.emailAddress})
- **Phone**: [${CONTACT.phoneLabel}](${CONTACT.phoneHref})
- **Location**: ${CONTACT.location}

---
© ${new Date().getFullYear()} Nirjar Goswami. All rights reserved. • [Blog RSS](${SITE_URL}/rss.xml)
`
}

export const HOME_PAGE_MARKDOWN = generateHomeMarkdown()
