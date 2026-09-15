import type { ReactNode } from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { ScrollReveal } from "../providers/ScrollReveal"

interface PageShellProps {
  children: ReactNode
  headerPath?: string
  footerBgClass?: string
  outerClassName?: string
  mainClassName?: string
  seo?: ReactNode
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
  outerClassName = "min-h-screen bg-canvas text-ink",
  mainClassName,
  seo,
}: Readonly<PageShellProps>) {
  return (
    <div className={outerClassName}>
      {seo}
      <ScrollReveal />
      <Header activePath={headerPath} />
      <main id="main-content" className={mainClassName}>
        {children}
      </main>
      {footerBgClass ? <Footer bgClass={footerBgClass} /> : <Footer />}
    </div>
  )
}
