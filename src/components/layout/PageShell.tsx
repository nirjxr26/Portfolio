import { lazy, Suspense, useEffect, useState, type ReactNode } from "react"
import { Footer, type FooterBreadcrumb } from "./Footer"
import { Header } from "./Header"
import { NotificationToast } from "@/components/ui/NotificationToast"
import { ScrollReveal } from "@/components/providers/ScrollReveal"
import { useNotchTint } from "@/hooks/useNotchTint"

const CommandPalette = lazy(() =>
  import("@/components/ui/CommandPalette").then((m) => ({ default: m.CommandPalette })),
)

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
  useNotchTint()
  const [paletteReady, setPaletteReady] = useState(false)

  useEffect(() => {
    if (paletteReady) return
    const load = () => setPaletteReady(true)
    const onOpen = () => {
      load()
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent("open-command-palette"))
      })
    }
    window.addEventListener("open-command-palette", onOpen, { once: true })
    window.addEventListener("keydown", load, { once: true, passive: true })

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const idleId = w.requestIdleCallback
      ? w.requestIdleCallback(load, { timeout: 1500 })
      : window.setTimeout(load, 1200)

    return () => {
      window.removeEventListener("open-command-palette", onOpen)
      window.removeEventListener("keydown", load)
      if (w.cancelIdleCallback) w.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
  }, [paletteReady])

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
      {paletteReady && (
        <Suspense fallback={null}>
          <CommandPalette />
        </Suspense>
      )}
      <NotificationToast />
      <div aria-hidden="true" className="notch-blur" />
    </div>
  )
}
