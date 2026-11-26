import { useState, type ReactNode } from "react"
import {
  SOCIAL_LINKS,
  WORK_ITEMS,
  type FooterLinkItem,
} from "@/app/config/navigation"
import { cleanPath, resolveRoute } from "@/app/router/routes"
import { useInternalRouter } from "@/app/router/useInternalRouter"
import { AppLink } from "@/components/ui/Button"
import { ChevronDown, ChevronRight, CopySwapIcon, HomeIcon } from "@/components/ui/Icons"
import { getArticleMeta } from "@/features/articles/data/articleMeta"
import { CASE_STUDY_META } from "@/features/case-studies/data/caseStudyMeta"
import { useCopy } from "@/hooks/useCopy"
import { Container } from "./Container"

export interface FooterBreadcrumb {
  name: string
  href?: string
}

interface FooterItem extends FooterLinkItem {
  copyText?: string
}

interface FooterSection {
  id: string
  title: string
  items: readonly FooterItem[]
}

const FOOTER_SECTIONS: readonly FooterSection[] = [
  {
    id: "works",
    title: "Works",
    items: WORK_ITEMS,
  },
  {
    id: "explore",
    title: "Explore",
    items: [
      { name: "Services", href: "/services" },
      { name: "Articles", href: "/articles" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    items: [
      { name: "Resume", href: SOCIAL_LINKS.resume },
      { name: "index.md", href: "/index.md" },
    ],
  },
  {
    id: "connect",
    title: "Connect",
    items: [
      { name: "GitHub", href: SOCIAL_LINKS.github },
      { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
      { name: "X (Twitter)", href: SOCIAL_LINKS.twitter },
      { name: "Gmail", href: SOCIAL_LINKS.email, copyText: SOCIAL_LINKS.emailAddress },
    ],
  },
]

const BOTTOM_LEGAL_LINKS: readonly FooterLinkItem[] = [
  { name: "Terms of Use", href: "/legal" },
  { name: "Sitemap", href: "/sitemap" },
  { name: "RSS Feed", href: "/rss.xml" },
]

const STATIC_ROUTE_LABELS: Readonly<Record<string, string>> = {
  works: "Works",
  services: "Services",
  articles: "Articles",
  sitemap: "Sitemap",
  legal: "Terms of Use",
}

function getFooterBreadcrumbs(pathname: string): FooterBreadcrumb[] {
  const clean = cleanPath(pathname.split("#")[0] ?? "/")
  if (clean === "/index.md") {
    return [{ name: "index.md" }]
  }

  const route = resolveRoute(clean)
  if (route.kind === "home") {
    return []
  }

  if (route.kind === "case-study" && route.caseSlug) {
    const cs = CASE_STUDY_META[route.caseSlug]
    return [
      { name: "Works", href: "/works" },
      { name: cs?.title ?? route.caseSlug },
    ]
  }

  if (route.kind === "article-detail" && route.articleSlug) {
    const article = getArticleMeta(route.articleSlug)
    return [
      { name: "Articles", href: "/articles" },
      { name: article?.title ?? route.articleSlug },
    ]
  }

  const label = STATIC_ROUTE_LABELS[route.kind]
  return label ? [{ name: label }] : []
}

function FooterCopyButton({ text, label }: Readonly<{ text: string; label: string }>) {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      onClick={() => void copy(text)}
      aria-label={copied ? "Copied to clipboard" : label}
      title={copied ? "Copied!" : text}
      className="inline-flex items-center justify-center p-1 -m-1 rounded text-muted-soft hover:text-ink transition-colors cursor-pointer shrink-0"
    >
      <CopySwapIcon copied={copied} width={13} height={13} />
    </button>
  )
}

function FooterLinkList({
  items,
  listClassName = "pb-3.5 space-y-2.5 text-sm",
}: Readonly<{
  items: readonly FooterItem[]
  listClassName?: string
}>) {
  return (
    <ul className={listClassName}>
      {items.map((item) => (
        <li
          key={item.name}
          className={item.copyText ? "flex items-center gap-2 min-w-0" : "truncate"}
        >
          <AppLink
            href={item.href}
            className={
              item.copyText
                ? "text-muted hover:text-ink transition-colors truncate"
                : "text-muted hover:text-ink transition-colors block truncate"
            }
          >
            {item.name}
          </AppLink>
          {item.copyText && (
            <FooterCopyButton text={item.copyText} label={`Copy ${item.name}`} />
          )}
        </li>
      ))}
    </ul>
  )
}

function FooterAccordionSection({
  id,
  title,
  open,
  onToggle,
  children,
}: Readonly<{
  id: string
  title: string
  open: boolean
  onToggle: (id: string) => void
  children: ReactNode
}>) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex w-full items-center justify-between py-3.5 text-left text-sm text-ink font-semibold"
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          className={`transition-transform duration-200 text-muted ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && children}
    </div>
  )
}

function FooterColumn({
  title,
  children,
}: Readonly<{
  title: string
  children: ReactNode
}>) {
  return (
    <div className="min-w-0 text-left">
      <h4 className="text-base mb-4 text-ink font-semibold">{title}</h4>
      {children}
    </div>
  )
}

function FooterBreadcrumbs({ crumbs }: Readonly<{ crumbs: readonly FooterBreadcrumb[] }>) {
  if (crumbs.length === 0) {
    return null
  }

  return (
    <nav
      aria-label="Breadcrumbs"
      className="flex items-center gap-2 text-xs sm:text-[13px] leading-none text-muted-soft mb-8 pb-5 sm:mb-10 sm:pb-6 border-b border-hairline overflow-x-auto no-scrollbar"
    >
      <AppLink
        href="/"
        aria-label="Home"
        className="text-muted hover:text-ink transition-colors inline-flex items-center justify-center shrink-0"
      >
        <HomeIcon width={14} height={14} className="block -translate-y-[1px]" />
      </AppLink>

      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1
        return (
          <div key={crumb.name} className="flex items-center gap-2 shrink-0 max-w-[280px] sm:max-w-none">
            <ChevronRight
              width={10}
              height={10}
              className="text-muted-soft/40 shrink-0"
              aria-hidden="true"
            />
            {crumb.href && !isLast ? (
              <AppLink href={crumb.href} className="hover:text-ink transition-colors truncate">
                {crumb.name}
              </AppLink>
            ) : (
              <span
                className="text-ink font-normal truncate"
                aria-current={isLast ? "page" : undefined}
              >
                {crumb.name}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}

interface FooterProps {
  bgClass?: string
  breadcrumbs?: readonly FooterBreadcrumb[]
}

export function Footer({
  bgClass = "bg-surface-alt",
  breadcrumbs: customBreadcrumbs,
}: Readonly<FooterProps>) {
  const pathname = useInternalRouter()
  const crumbs = customBreadcrumbs ?? getFooterBreadcrumbs(pathname)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const topPad = crumbs.length > 0 ? "pt-6 sm:pt-10" : "pt-8 sm:pt-16"

  return (
    <footer
      id="footer"
      className={`${bgClass} ${topPad} pb-[max(2rem,env(safe-area-inset-bottom))] sm:pb-12 border-t-0`}
    >
      <Container>
        <div className="max-w-5xl mx-auto w-full">
          <FooterBreadcrumbs crumbs={crumbs} />

          {/* Mobile Accordion View (< 640px) */}
          <div className="block sm:hidden divide-y divide-hairline">
            {FOOTER_SECTIONS.map((section) => (
              <FooterAccordionSection
                key={section.id}
                id={section.id}
                title={section.title}
                open={Boolean(openSections[section.id])}
                onToggle={toggleSection}
              >
                <FooterLinkList items={section.items} />
              </FooterAccordionSection>
            ))}
          </div>

          {/* Tablet (2x2) & Desktop (4-Column) Directory (>= 640px) */}
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-[repeat(4,auto)] md:justify-between sm:gap-x-12 sm:gap-y-8">
            {FOOTER_SECTIONS.map((section) => (
              <FooterColumn key={section.id} title={section.title}>
                <FooterLinkList
                  items={section.items}
                  listClassName="space-y-2.5 text-[15px]"
                />
              </FooterColumn>
            ))}
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="mt-8 pt-6 sm:mt-10 sm:pt-6 border-t border-hairline flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 text-xs sm:text-[12px] font-normal text-muted-soft">
            <div className="shrink-0">
              Copyright &copy; {new Date().getFullYear()} Nirjar Goswami. All rights reserved.
            </div>
            <ul className="flex flex-wrap items-center gap-y-1 sm:justify-end">
              {BOTTOM_LEGAL_LINKS.map((link, idx) => (
                <li key={link.name} className="flex items-center">
                  {idx > 0 && (
                    <span className="px-2 sm:px-2.5 text-muted-soft/40 select-none" aria-hidden="true">
                      |
                    </span>
                  )}
                  <AppLink href={link.href} className="hover:text-ink transition-colors">
                    {link.name}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}
