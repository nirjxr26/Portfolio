import { useState } from "react"
import {
  SOCIAL_LINKS,
  type FooterLinkItem,
} from "@/data/navigation"
import { AppLink } from "../common/Button"
import { ChevronDown, ChevronRight, HomeIcon } from "../common/Icons"
import { Container } from "./Container"
import { cleanPath, resolveRoute } from "@/data/routes"
import { CASE_STUDIES } from "@/data/caseStudies"
import { getBlogArticle } from "@/data/blogArticles"
import { useInternalRouter } from "@/utils/useInternalRouter"

export interface FooterBreadcrumb {
  name: string
  href?: string
}

function getFooterBreadcrumbs(pathname: string): FooterBreadcrumb[] {
  const clean = cleanPath(pathname.split("#")[0] ?? "/")
  const route = resolveRoute(clean)

  if (route.kind === "home") {
    return []
  }

  const items: FooterBreadcrumb[] = []

  if (route.kind === "works") {
    items.push({ name: "Works" })
  } else if (route.kind === "services") {
    items.push({ name: "Services" })
  } else if (route.kind === "case-study" && route.caseSlug) {
    const cs = CASE_STUDIES[route.caseSlug]
    items.push({ name: "Works", href: "/works" })
    items.push({ name: cs?.hero.title ?? route.caseSlug })
  } else if (route.kind === "articles") {
    items.push({ name: "Articles" })
  } else if (route.kind === "article-detail" && route.articleSlug) {
    const article = getBlogArticle(route.articleSlug)
    items.push({ name: "Articles", href: "/articles" })
    items.push({ name: article?.title ?? route.articleSlug })
  } else if (route.kind === "sitemap") {
    items.push({ name: "Sitemap" })
  } else if (route.kind === "legal") {
    items.push({ name: "Terms of Use" })
  } else if (clean === "/index.md") {
    items.push({ name: "index.md" })
  }

  return items
}

const FOOTER_SECTIONS: ReadonlyArray<{
  id: string
  title: string
  alignment: "start" | "center" | "end"
  items: readonly FooterLinkItem[]
}> = [
  {
    id: "works",
    title: "Works",
    alignment: "start",
    items: [
      { name: "Trace", href: "/works/trace" },
      { name: "Bastion", href: "/works/bastion" },
      { name: "Kost", href: "/works/kost" },
      { name: "HookDrop", href: "/works/hookdrop" },
      { name: "All Works →", href: "/works" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    alignment: "center",
    items: [
      { name: "Services", href: "/services" },
      { name: "Articles", href: "/articles" },
      { name: "Resume (PDF)", href: SOCIAL_LINKS.resume },
      { name: "index.md", href: "/index.md" },
    ],
  },
  {
    id: "connect",
    title: "Connect",
    alignment: "end",
    items: [
      { name: "GitHub", href: SOCIAL_LINKS.github },
      { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
      { name: "X (Twitter)", href: SOCIAL_LINKS.twitter },
      { name: SOCIAL_LINKS.emailAddress, href: SOCIAL_LINKS.email },
    ],
  },
]

const BOTTOM_LEGAL_LINKS: readonly FooterLinkItem[] = [
  { name: "Terms of Use", href: "/legal" },
  { name: "Sitemap", href: "/sitemap" },
  { name: "RSS Feed", href: "/rss.xml" },
]

interface FooterProps {
  bgClass?: string
  breadcrumbs?: readonly FooterBreadcrumb[]
}

function FooterLinkList({
  items,
  linkClass,
  listClassName = "pb-3.5 space-y-2.5 text-sm",
}: Readonly<{ items: readonly FooterLinkItem[]; linkClass: string; listClassName?: string }>) {
  return (
    <ul className={listClassName}>
      {items.map((item) => (
        <li key={item.name} className="truncate">
          <AppLink href={item.href} className={`${linkClass} block truncate`}>
            {item.name}
          </AppLink>
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
  headingClass,
  iconClass,
  children,
}: Readonly<{
  id: string
  title: string
  open: boolean
  onToggle: (id: string) => void
  headingClass: string
  iconClass: string
  children: React.ReactNode
}>) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onToggle(id)}
        className={`flex w-full items-center justify-between py-3.5 text-left text-sm ${headingClass}`}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown className={`transition-transform duration-200 ${iconClass} ${open ? "rotate-180" : ""}`} />
      </button>
      {open && children}
    </div>
  )
}

function FooterColumn({
  title,
  alignment = "center",
  headingClass,
  children,
}: Readonly<{
  title: string
  alignment?: "start" | "center" | "end"
  headingClass: string
  children: React.ReactNode
}>) {
  const alignClass =
    alignment === "start"
      ? "justify-start"
      : alignment === "end"
      ? "justify-start sm:justify-end"
      : "justify-start sm:justify-center"

  return (
    <div className={`flex ${alignClass}`}>
      <div className="w-fit max-w-full text-left">
        <h4 className={`text-base mb-4 ${headingClass}`}>{title}</h4>
        {children}
      </div>
    </div>
  )
}

export function Footer({ bgClass = "bg-surface-alt", breadcrumbs: customBreadcrumbs }: Readonly<FooterProps>) {
  const pathname = useInternalRouter()
  const crumbs = customBreadcrumbs ?? getFooterBreadcrumbs(pathname)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const headingClass = "text-ink font-semibold"
  const linkClass = "text-muted hover:text-ink transition-colors"
  const subtextClass = "text-muted-soft"
  const divideClass = "divide-hairline"
  const borderClass = "border-hairline"
  const iconClass = "text-muted"
  const topPad = crumbs.length > 0 ? "pt-6 sm:pt-10" : "pt-8 sm:pt-16"

  return (
    <footer id="footer" className={`${bgClass} ${topPad} pb-8 sm:pb-12 border-t-0`}>
      <Container>
        <div className="max-w-5xl mx-auto w-full">
          {/* Apple-style Footer Breadcrumbs (only on sub-pages) */}
        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumbs"
            className={`flex items-center gap-2 text-xs sm:text-[13px] text-muted-soft mb-8 pb-5 sm:mb-10 sm:pb-6 border-b ${borderClass} overflow-x-auto no-scrollbar`}
          >
            <AppLink
              href="/"
              aria-label="Home"
              className="text-muted hover:text-ink transition-colors flex items-center shrink-0"
            >
              <HomeIcon width={14} height={14} />
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
                    <AppLink
                      href={crumb.href}
                      className="hover:text-ink hover:underline transition-colors truncate"
                    >
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
        )}

        {/* Mobile Accordion View (< 640px) */}
        <div className={`block sm:hidden divide-y ${divideClass}`}>
          {FOOTER_SECTIONS.map((section) => (
            <FooterAccordionSection
              key={section.id}
              id={section.id}
              title={section.title}
              open={Boolean(openSections[section.id])}
              onToggle={toggleSection}
              headingClass={headingClass}
              iconClass={iconClass}
            >
              <FooterLinkList items={section.items} linkClass={linkClass} />
            </FooterAccordionSection>
          ))}
        </div>

        {/* Desktop / Tablet 3-Column Layout (>= 640px) */}
        <div className="hidden sm:grid sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {FOOTER_SECTIONS.map((section) => (
            <FooterColumn
              key={section.id}
              title={section.title}
              alignment={section.alignment}
              headingClass={headingClass}
            >
              <FooterLinkList items={section.items} linkClass={linkClass} listClassName="space-y-2.5 text-[15px]" />
            </FooterColumn>
          ))}
        </div>

        {/* Bottom Copyright & Legal Links (Apple-style) */}
        <div className={`mt-8 pt-6 sm:mt-10 sm:pt-6 border-t ${borderClass} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 text-xs sm:text-[12px] font-normal ${subtextClass}`}>
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
                <AppLink
                  href={link.href}
                  className="hover:text-ink hover:underline transition-colors"
                >
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
