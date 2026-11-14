import { hero, frames, productionCapabilities, projects, articles, quote } from "./home"
import { HOW_I_WORK_CARDS } from "./services"
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
  const servicesAction = `[View Services](${SITE_URL}/services)`

  const whatIDoLines = frames
    .map((f) => (f.tag ? `### ${f.tag}\n**${f.title}**\n${f.desc}` : `### ${f.title}\n${f.desc}`))
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

  const howIWorkLines = HOW_I_WORK_CARDS
    .map((card) => `### ${card.tag}\n**${card.title}**\n${card.desc}`)
    .join("\n\n")

  const homeArticles = articles.filter((a) => !a.hideFromHome && a.poster != null)
  const articleLines = homeArticles
    .map(
      (a) =>
        `### ${a.title}\n- **Read Time**: ${a.readTime}\n- **Date**: ${a.date}\n- **Category**: ${a.category}\n- **Summary**: ${a.desc}\n- **Link**: [Read Article](${SITE_URL}${a.link})`,
    )
    .join("\n\n")

  return `${metadataBlock}

# Nirjar Goswami

> **${hero.headingPrimary} ${hero.headingSecondary}**
> ${hero.subheading}

${resumeAction}
${worksAction}
${servicesAction}

## Services.

${whatIDoLines}

[View all services](${SITE_URL}/services)

## Featured work.

${featuredLines}

### More works

${moreLines}

[View all works](${SITE_URL}/works)

## How I think.

${howIThinkLines}

## How I work.

${howIWorkLines}

## Articles.

${articleLines}

[View other articles](${SITE_URL}/articles)

## Operating Credo

> "${quote}"

## Footer & Connect

### Website Tree

nirjar.me/
├── index.md/ [ Agent view ]
├── works/
│   ├── trace/
│   ├── bastion/
│   ├── kost/
│   └── hookdrop/
├── services/
├── articles/
├── legal/
├── api/
│   ├── status
│   └── projects
├── assets/
│   └── nirjar_resume.pdf
└── Others
    ├── humans.txt
    ├── llms.txt
    ├── rss.xml
    ├── sitemap.xml
    ├── robots.txt
    └── /.well-known/security.txt

## Contact
 
- **Email**: nirjargoswami2626@gmail.com
- **Phone**: +91 87991 42626
- **Location**: Ahmedabad, Gujarat, India
- **GitHub**: https://github.com/nirjxr26
- **LinkedIn**: https://www.linkedin.com/in/nirjxr
- **X (Twitter)**: https://x.com/nirjxrgoswami
- **Instagram**: https://instagram.com/nirjar_goswami
- **Resume**: https://nirjar.me/assets/nirjar_resume.pdf

---
© 2026 Nirjar Goswami. All rights reserved. • [Blog RSS](${SITE_URL}/rss.xml) • [Sitemap](${SITE_URL}/sitemap)
`
}

export const HOME_PAGE_MARKDOWN = generateHomeMarkdown()
