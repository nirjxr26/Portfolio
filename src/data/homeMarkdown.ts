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

![Website Tree](${SITE_URL}/assets/sitemap/sitemap_white.svg#gh-light-mode-only)
![Website Tree](${SITE_URL}/assets/sitemap/sitemap_black.svg#gh-dark-mode-only)

<!--
## Sitemap Tree (Machine-readable routes, works, articles, and endpoints for AI agents)

nirjar.me/
├── index.md/ [ Agent view: ${SITE_URL}/index.md ]
├── sitemap/ [ Full Sitemap Directory: ${SITE_URL}/sitemap ]
├── works/ [ All Works: ${SITE_URL}/works ]
│   ├── trace/ [ Trace Forensics: ${SITE_URL}/works/trace ]
│   ├── bastion/ [ Bastion IAM: ${SITE_URL}/works/bastion ]
│   ├── kost/ [ Kost Cost Intelligence: ${SITE_URL}/works/kost ]
│   └── hookdrop/ [ HookDrop Webhook Receiver: ${SITE_URL}/works/hookdrop ]
├── services/ [ Services & Capabilities: ${SITE_URL}/services ]
│   ├── cybersecurity/ [ ${SITE_URL}/services#cybersecurity ]
│   ├── devops/ [ ${SITE_URL}/services#devops ]
│   ├── cloud-architecture/ [ ${SITE_URL}/services#cloud-architecture ]
│   ├── system-design/ [ ${SITE_URL}/services#system-design ]
│   ├── backend-api/ [ ${SITE_URL}/services#backend-api ]
│   └── code-quality/ [ ${SITE_URL}/services#code-quality ]
├── articles/ [ Engineering Articles: ${SITE_URL}/articles ]
│   ├── coding-is-taught-wrong-and-ai-exposed-it/ [ ${SITE_URL}/articles/coding-is-taught-wrong-and-ai-exposed-it ]
│   ├── allow-remote-postgresql-without-opening-it-to-the-world/ [ ${SITE_URL}/articles/allow-remote-postgresql-without-opening-it-to-the-world ]
│   ├── making-technical-debt-visible-with-sonarqube/ [ ${SITE_URL}/articles/making-technical-debt-visible-with-sonarqube ]
│   ├── rethinking-my-git-workflow/ [ ${SITE_URL}/articles/rethinking-my-git-workflow ]
│   └── how-vaultlock-reliably-fetches-brand-logos/ [ ${SITE_URL}/articles/how-vaultlock-reliably-fetches-brand-logos ]
├── legal/ [ Legal & Terms of Use: ${SITE_URL}/legal ]
├── assets/
│   └── nirjar_resume.pdf [ ${SITE_URL}/assets/nirjar_resume.pdf ]
└── Others
    ├── humans.txt [ ${SITE_URL}/humans.txt ]
    ├── llms.txt [ ${SITE_URL}/llms.txt ]
    ├── rss.xml [ ${SITE_URL}/rss.xml ]
    ├── sitemap.xml [ ${SITE_URL}/sitemap.xml ]
    ├── robots.txt [ ${SITE_URL}/robots.txt ]
    └── /.well-known/security.txt [ ${SITE_URL}/.well-known/security.txt ]

github.com/nirjxr26/
├── profile/ [ https://github.com/nirjxr26 ]
└── repositories/
    ├── Trace/ [ https://github.com/nirjxr26/Trace ]
    ├── Bastion/ [ https://github.com/nirjxr26/Bastion ]
    ├── Kost/ [ https://github.com/nirjxr26/Kost ]
    ├── HookDrop/ [ https://github.com/nirjxr26/HookDrop ]
    ├── DeployLens/ [ https://github.com/nirjxr26/DeployLens ]
    ├── canopy/ [ https://github.com/nirjxr26/canopy ]
    ├── SmartFlow/ [ https://github.com/nirjxr26/SmartFlow ]
    ├── BlamLess/ [ https://github.com/nirjxr26/Blamless ]
    ├── VaultLock/ [ https://github.com/nirjxr26/VaultLock-Password-Manager ]
    └── code-humanizer/ [ https://github.com/nirjxr26/code-humanizer ]

connect/
├── github.com/nirjxr26 [ https://github.com/nirjxr26 ]
├── linkedin.com/in/nirjxr [ https://www.linkedin.com/in/nirjxr ]
├── x.com/nirjxrgoswami [ https://x.com/nirjxrgoswami ]
├── instagram.com/nirjar_goswami [ https://instagram.com/nirjar_goswami ]
└── mailto:nirjargoswami2626@gmail.com
-->

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
