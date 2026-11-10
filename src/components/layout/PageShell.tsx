import type { ReactNode } from "react"
import { Footer, type FooterBreadcrumb } from "./Footer"
import { Header } from "./Header"
import { ScrollReveal } from "../providers/ScrollReveal"

interface PageShellProps {
  children: ReactNode
  headerPath?: string
  footerBgClass?: string
  footerBreadcrumbs?: readonly FooterBreadcrumb[]
  outerClassName?: string
  mainClassName?: string
  seo?: ReactNode
  hideHeader?: boolean
  hideFooter?: boolean
}

/**
 * Single page chrome — outer canvas + SEO + ScrollReveal + Header + main + Footer.
 * Preserves exact DOM/classes previously duplicated across all 7 page components.
 * 0 UI change: defaults match `min-h-screen bg-canvas text-ink` + `bg-surface-alt` footer.
 */
export function PageShell({
  children,
  headerPath = "/",
  footerBgClass,
  footerBreadcrumbs,
  outerClassName = "min-h-screen bg-canvas text-ink",
  mainClassName,
  seo,
  hideHeader = false,
  hideFooter = false,
}: Readonly<PageShellProps>) {
  return (
    <div className={outerClassName}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-canvas focus:rounded-full focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent text-xs font-semibold tracking-wide"
      >
        Skip to content
      </a>
      {seo}
      <ScrollReveal />
      {!hideHeader && <Header activePath={headerPath} />}
      <main id="main-content" className={mainClassName}>
        {children}
      </main>
      {!hideFooter && <Footer bgClass={footerBgClass} breadcrumbs={footerBreadcrumbs} />}
    </div>
  )
}
