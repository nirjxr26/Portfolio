import { useEffect, useState } from "react"
import { NAV_LINKS, WORK_ITEMS, type NavLink } from "@/data/navigation"
import { ArrowRight, ChevronDown, HomeIcon } from "../common/Icons"
import { ThemeToggle } from "../common/ThemeToggle"
import { Container } from "./Container"

const DESKTOP_LINK = "transition-colors hover:text-ink whitespace-nowrap shrink-0"
const MOBILE_LINK = "py-1 transition-colors hover:text-accent"

function externalAttrs(link: NavLink) {
  return link.external ? { target: "_blank", rel: "noreferrer noopener" } : {}
}

function MobileDrawer({
  activePath,
  worksExpanded,
  setWorksExpanded,
  isWorks,
  closeMobileNav,
}: Readonly<{
  activePath: string
  worksExpanded: boolean
  setWorksExpanded: (expanded: boolean) => void
  isWorks: boolean
  closeMobileNav: () => void
}>) {
  if (worksExpanded) {
    return (
      <div className="flex flex-col gap-6 text-[28px] font-normal tracking-normal normal-none py-2 text-ink animate-drill-in">
        <button
          type="button"
          onClick={() => setWorksExpanded(false)}
          className="flex items-center justify-between text-left w-full text-accent hover:opacity-80 transition-opacity py-1"
          aria-expanded={true}
          aria-label="Back to main navigation menu"
        >
          <span>Works</span>
          <ChevronDown width={20} height={20} strokeWidth={2} className="rotate-180 text-muted" />
        </button>

        <div className="flex flex-col gap-4 text-[22px] min-[380px]:text-[24px] font-normal">
          {WORK_ITEMS.map((item) => {
            const isActive = activePath === item.href
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between py-1 transition-colors ${
                  isActive ? "text-accent font-medium" : "text-ink-soft hover:text-accent"
                }`}
              >
                <span>{item.name}</span>
                <ArrowRight
                  width={16}
                  height={16}
                  className={isActive ? "text-accent" : "text-muted-faint"}
                />
              </a>
            )
          })}

          <div className="pt-3 mt-1 border-t border-hairline dark:border-hairline/50">
            <a
              href="/works"
              onClick={closeMobileNav}
              className="flex items-center justify-between py-1 text-accent hover:opacity-80 transition-opacity font-medium"
            >
              <span>View All Works</span>
              <ArrowRight width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 text-[28px] font-normal tracking-normal normal-none py-2 text-ink">
      <a href="/" onClick={closeMobileNav} className={MOBILE_LINK}>
        Home
      </a>

      {NAV_LINKS.map((link) =>
        link.expandable ? (
          <button
            key={link.label}
            type="button"
            onClick={() => setWorksExpanded(true)}
            className={`w-full flex items-center justify-between text-left ${MOBILE_LINK} ${
              isWorks ? "text-accent" : ""
            }`}
            aria-expanded={false}
            aria-label="Open Works submenu"
          >
            <span>{link.label}</span>
            <ChevronDown width={20} height={20} strokeWidth={2} className="text-muted" />
          </button>
        ) : (
          <a
            key={link.label}
            href={link.href}
            {...externalAttrs(link)}
            onClick={closeMobileNav}
            className={MOBILE_LINK}
          >
            {link.label}
          </a>
        ),
      )}
    </div>
  )
}

function WorksDropdown({
  isWorks,
  open,
}: Readonly<{
  isWorks: boolean
  open: boolean
}>) {
  return (
    <a
      href="/works"
      className={`flex items-center gap-1 transition-colors hover:text-ink whitespace-nowrap ${
        isWorks ? "text-ink font-semibold" : ""
      }`}
    >
      <span>Works</span>
      <ChevronDown
        width={10}
        height={10}
        strokeWidth={2.5}
        className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      />
    </a>
  )
}

export function Header({ activePath = "/" }: Readonly<{ activePath?: string }>) {
  const isWorks = activePath.startsWith("/works")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [worksDropdownOpen, setWorksDropdownOpen] = useState(false)
  const [mobileWorksExpanded, setMobileWorksExpanded] = useState(false)

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateHeader = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 20) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 5) {
        setVisible(false)
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 5) {
        setVisible(true)
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader)
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setMobileWorksExpanded(false)
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const closeMobileNav = () => {
    setMobileMenuOpen(false)
    setMobileWorksExpanded(false)
  }

  const headerVisibilityClass = mobileMenuOpen
    ? "bg-canvas translate-y-0 opacity-100 pointer-events-auto"
    : visible
      ? "bg-canvas/85 backdrop-blur-md translate-y-0 opacity-100 pointer-events-auto"
      : "-translate-y-full opacity-0 pointer-events-none"

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-hairline dark:border-hairline/50 text-ink transition-all duration-300 ease-out ${
        headerVisibilityClass
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-full focus:font-medium focus:text-sm focus:shadow-md"
      >
        Skip to main content
      </a>
      <nav>
        <Container className="relative flex h-[var(--header-h)] items-center justify-between">
          <a
            href="/"
            aria-label="Home"
            className="flex items-center text-muted transition-colors hover:text-ink md:hidden"
          >
            <HomeIcon width={16} height={16} />
          </a>

          <div className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-5 lg:gap-8 text-xs text-muted md:flex whitespace-nowrap">
            <a
              href="/"
              aria-label="Home"
              className="flex items-center text-muted transition-colors hover:text-ink pr-1 shrink-0"
            >
              <HomeIcon width={15} height={15} />
            </a>

            {NAV_LINKS.map((link) =>
              link.expandable ? (
                <div
                  key={link.label}
                  className="relative py-3 shrink-0"
                  onMouseEnter={() => setWorksDropdownOpen(true)}
                  onMouseLeave={() => setWorksDropdownOpen(false)}
                >
                  <WorksDropdown isWorks={isWorks} open={worksDropdownOpen} />

                  {worksDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-52 z-50">
                      <div className="rounded-2xl bg-card p-3 shadow-xl text-ink whitespace-normal">
                        <div className="space-y-1">
                          {WORK_ITEMS.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-xl px-3 py-2 text-sm text-muted hover:text-accent transition-colors font-medium"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>

                        <div className="mt-2 pt-1">
                          <a
                            href="/works"
                            className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-surface-alt/60"
                          >
                            <span>View All Works</span>
                            <ArrowRight width={12} height={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  {...externalAttrs(link)}
                  className={DESKTOP_LINK}
                >
                  {link.label}
                </a>
              ),
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto md:ml-0">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-ink md:hidden focus:outline-none hit-area"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </Container>

        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 bg-canvas px-7 pt-7 pb-12 flex flex-col justify-between overflow-y-auto md:hidden text-ink animate-curtain-fall border-t border-hairline dark:border-hairline/50 h-[calc(100vh-var(--header-h))]">
            <MobileDrawer
              activePath={activePath}
              worksExpanded={mobileWorksExpanded}
              setWorksExpanded={setMobileWorksExpanded}
              isWorks={isWorks}
              closeMobileNav={closeMobileNav}
            />
          </div>
        )}
      </nav>
    </header>
  )
}
