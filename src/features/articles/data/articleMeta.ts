export interface ArticlePoster {
  light: string
  dark: string
}

export interface ArticleMeta {
  slug: string
  title: string
  displayTitle?: string
  subhead?: string
  description: string
  updated: string
  readTime: string
  category: string
  cardDate: string
  cardDesc: string
  cardReadTime: string
  hideFromHome?: boolean
  keywords: string
  leadImage?: { src: string; alt: string; width: number; height: number }
  disclaimer?: string
  poster?: ArticlePoster
  ogImage?: string
}

export const ARTICLE_META: ArticleMeta[] = [
  {
    slug: "why-i-switched-to-zed",
    title: "Why I Switched to Zed IDE",
    displayTitle: "Why I Switched to <br>Zed IDE",
    subhead:
      "I tried Zed out of curiosity, and its speed and simplicity gradually made it the editor I open first.",
    description:
      "Four years of muscle memory, extensions and workspace config didn't break. The editor just got quieter, faster, and out of the way.",
    updated: "November 17, 2026",
    readTime: "4 min",
    category: "Practice",
    cardDate: "Nov 17, 2026",
    cardDesc:
      "Four years of muscle memory, extensions and workspace config didn't break. The editor just got quieter, faster, and out of the way.",
    cardReadTime: "4 min read",
    keywords:
      "Zed, VS Code, code editor, Rust, developer tools, performance, workflow, text editor, extensions, software engineering",
    poster: {
      light: "/assets/content/articles/zed_white.svg",
      dark: "/assets/content/articles/zed_black.svg",
    },
    ogImage: "/assets/og/zed_og.svg",
  },
  {
    slug: "a-100ms-rust-site-verifier",
    title: "Parapet: A 100ms Rust Site Checker",
    subhead:
      "A tiny Rust tool that catches silent static-site breakage in a tenth of a second.",
    description:
      "Parapet is a Rust site checker that audits CSP hashes, links, and sitemaps in about 100 ms, with no browser. Why I built it.",
    updated: "November 12, 2026",
    readTime: "5 min",
    category: "Security",
    cardDate: "Nov 12, 2026",
    cardDesc:
      "Static builds hide broken anchors and CSP drift. A 100ms Rust binary catches both before code ever ships.",
    cardReadTime: "5 min read",
    keywords:
      "Rust, site verifier, Content Security Policy, CSP hash, link checker, broken anchors, sitemap.xml, llms.txt, CI/CD, Vite, static site generation, automation",
    poster: {
      light: "/assets/content/articles/rust_white.svg",
      dark: "/assets/content/articles/rust_black.svg",
    },
    ogImage: "/assets/og/rust_og.svg",
  },
  {
    slug: "coding-is-taught-wrong-and-ai-exposed-it",
    title: "Coding Is Taught Wrong, and AI Exposed It",
    subhead:
      "Coding education should teach engineering judgement, not syntax, now that AI writes the syntax.",
    description:
      "Exams test loops, jobs test judgement. Why coding education needs to change, and what AI made impossible to ignore.",
    updated: "October 31, 2026",
    readTime: "9 min",
    category: "Artificial Intelligence",
    cardDate: "Oct 31, 2026",
    cardDesc:
      "The exam tested loops. The job tests judgement — and AI made the difference impossible to ignore.",
    cardReadTime: "9 min read",
    keywords:
      "programming education, software engineering, computer science curriculum, AI coding agents, code review, secure coding, SQL injection, XSS, DevOps, India, employability, Stack Overflow Developer Survey 2026, METR, Veracode",
    poster: {
      light: "/assets/content/articles/coding_white.svg",
      dark: "/assets/content/articles/coding_black.svg",
    },
    ogImage: "/assets/og/coding_og.svg",
    disclaimer:
      "The views and opinions expressed in this article are my own and are intended for educational and informational purposes. The arguments and recommendations reflect my personal perspective and interpretation of the cited research. They do not represent the views of any institution, organization, or affiliated entity. Nothing in this article is intended to defame, misrepresent, or infringe upon the rights of any individual or institution.",
  },
  {
    slug: "allow-remote-postgresql-without-opening-it-to-the-world",
    title: "How to Allow Remote PostgreSQL Connections Securely",
    subhead:
      "Lock PostgreSQL down with a narrow listen address, a strict `pg_hba.conf` rule and a firewall, then verify it.",
    description:
      "Secure remote PostgreSQL access with three locks: listen_addresses, pg_hba.conf rules, and a firewall. No open exposure to the internet.",
    updated: "October 27, 2026",
    readTime: "6 min",
    category: "Security",
    cardDate: "Oct 27, 2026",
    cardDesc:
      "Three locks instead of one: where Postgres listens, who may connect, and what the firewall allows.",
    cardReadTime: "6 min read",
    keywords:
      "PostgreSQL, remote access, listen_addresses, pg_hba.conf, TLS, sslmode, verify-full, UFW, firewall, scram-sha-256, pg_authid, pg_hba_file_rules, Docker, security",
    poster: {
      light: "/assets/content/articles/postgres_white.svg",
      dark: "/assets/content/articles/postgres_black.svg",
    },
    ogImage: "/assets/og/postgres_og.svg",
  },
  {
    slug: "making-technical-debt-visible-with-sonarqube",
    title: "Making Technical Debt Visible with SonarQube",
    subhead:
      "Uncovering 872 hidden code smells and setting up quality gates to pay down technical debt.",
    description:
      "One SonarQube scan exposed 872 hidden issues. What I did over the next 30 days to fix what I couldn't see before.",
    updated: "May 25, 2026",
    readTime: "3 min",
    category: "Practice",
    cardDate: "May 25, 2026",
    cardDesc: "872 hidden issues. One scan. 30 days to fix what I couldn't see before.",
    cardReadTime: "5 min read",
    keywords:
      "SonarQube, AegisMesh, code quality, technical debt, bugs, vulnerabilities, security hotspots, code smells, duplication, Quality Gates, React, cognitive complexity, JWT, regex, maintainability, reliability",
    poster: {
      light: "/assets/content/articles/sonarqube_white.svg",
      dark: "/assets/content/articles/sonarqube_black.svg",
    },
    ogImage: "/assets/og/sonarqube_og.svg",
  },
  {
    slug: "rethinking-my-git-workflow",
    title: "Rethinking My Git Workflow",
    subhead:
      "Moving from messy script folders to atomic commits and structured version control.",
    description:
      "How GitHub and commit discipline reshaped the way I build software, and the Git workflow I use now.",
    updated: "April 16, 2026",
    readTime: "3 min",
    category: "Practice",
    cardDate: "Feb 10, 2026",
    cardDesc: "Not just a code host. A place that quietly reshaped how I build.",
    cardReadTime: "3 min read",
    keywords:
      "Git, GitHub, workflow, version control, commit, branch, README, portfolio, collaboration, green squares, staging, push, clone",
    poster: {
      light: "/assets/content/articles/github_white.svg",
      dark: "/assets/content/articles/github_black.svg",
    },
    ogImage: "/assets/og/github_og.svg",
  },
  {
    slug: "how-vaultlock-reliably-fetches-brand-logos",
    title: "How VaultLock Reliably Fetches Brand Logos",
    subhead:
      "Resolving brand icons reliably with layered caching and zero external network latency.",
    description:
      "How VaultLock gets the right brand logo every time without breaking the UI: ingestion, caching, and resilience.",
    updated: "April 8, 2026",
    readTime: "2 min",
    category: "Security",
    cardDate: "Apr 8, 2026",
    cardDesc: "Getting the right brand logo, every time, without breaking the UI.",
    cardReadTime: "2 min read",
    keywords:
      "VaultLock, logo, brand, favicon, Clearbit, Google, DuckDuckGo, caching, validation, QML, Qt, backend, input normalization, offline password manager",
  },
]

export function getArticleMeta(slug: string) {
  return ARTICLE_META.find((a) => a.slug === slug)
}

export function getAdjacentArticleMeta(slug: string): {
  previous: ArticleMeta | null
  next: ArticleMeta | null
} {
  const idx = ARTICLE_META.findIndex((a) => a.slug === slug)
  if (idx === -1) return { previous: null, next: null }
  return {
    previous: idx > 0 ? ARTICLE_META[idx - 1] : null,
    next: idx + 1 < ARTICLE_META.length ? ARTICLE_META[idx + 1] : null,
  }
}
