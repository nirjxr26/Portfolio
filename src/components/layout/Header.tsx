import { useEffect, useState } from "react"
import { Container } from "./Container"
import { ThemeToggle } from "../common/ThemeToggle"

export function Header({ activePath = "/" }: { activePath?: string }) {
  const isWorks = activePath.startsWith("/works")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [worksDropdownOpen, setWorksDropdownOpen] = useState(false)
  const [mobileWorksExpanded, setMobileWorksExpanded] = useState(false)

  // Lock body scroll when full-screen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-hairline text-ink transition-colors duration-200 ${mobileMenuOpen ? "bg-canvas" : "bg-canvas/85 backdrop-blur-md"}`}>
      {/* Skip to Main Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-full focus:font-medium focus:text-sm focus:shadow-md"
      >
        Skip to main content
      </a>
      <nav>
        <Container className="relative flex h-11 items-center justify-between">
          {/* Mobile Home Icon Link */}
          <a
            href="/"
            aria-label="Home"
            className="flex items-center text-muted transition-colors hover:text-ink md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </a>

          {/* Desktop Centered Nav Cluster */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-8 text-xs text-muted md:flex">
            <a
              href="/"
              aria-label="Home"
              className="flex items-center text-muted transition-colors hover:text-ink pr-1"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </a>

            <a
              href="/#what-i-do"
              className="transition-colors hover:text-ink"
            >
              What I do
            </a>

            {/* Desktop Works Dropdown Menu */}
            <div
              className="relative py-3"
              onMouseEnter={() => setWorksDropdownOpen(true)}
              onMouseLeave={() => setWorksDropdownOpen(false)}
            >
              <a
                href="/works"
                className={`flex items-center gap-1 transition-colors hover:text-ink ${
                  isWorks ? "text-ink font-semibold" : ""
                }`}
              >
                <span>Works</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform duration-200 ${worksDropdownOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>

              {/* Floating Dropdown Card */}
              {worksDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-52 z-50">
                  <div className="rounded-2xl bg-card p-3 shadow-xl text-ink">
                    <div className="space-y-1">
                      <a
                        href="/works/bastion"
                        className="block rounded-xl px-3 py-2 text-sm text-muted hover:text-accent transition-colors font-medium"
                      >
                        Bastion
                      </a>

                      <a
                        href="/works/kost"
                        className="block rounded-xl px-3 py-2 text-sm text-muted hover:text-accent transition-colors font-medium"
                      >
                        Kost
                      </a>

                      <a
                        href="/works/hookdrop"
                        className="block rounded-xl px-3 py-2 text-sm text-muted hover:text-accent transition-colors font-medium"
                      >
                        HookDrop
                      </a>
                    </div>

                    <div className="mt-2 pt-1">
                      <a
                        href="/works"
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-surface-alt/60"
                      >
                        <span>View All Works</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="/#articles" className="transition-colors hover:text-ink">
              Articles
            </a>
            <a
              href="/assets/nirjar_resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ink"
            >
              Resume
            </a>
            <a href="/#footer" className="transition-colors hover:text-ink">
              Contact
            </a>
          </div>

          {/* Right Action Controls (Theme Toggle & Mobile Menu) */}
          <div className="flex items-center gap-3 ml-auto md:ml-0">
            <ThemeToggle />

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-ink md:hidden focus:outline-none"
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

        {/* Full-Screen Vertical Curtain-Falling Nav Drawer (Mobile <= 768px) */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-11 bottom-0 z-40 bg-canvas px-7 pt-7 pb-12 flex flex-col justify-between overflow-y-auto md:hidden text-ink animate-curtain-fall border-t border-hairline h-[calc(100vh-44px)]">
            {/* Top Links Section with Generous Vertical Padding */}
            <div className="flex flex-col gap-6 text-[30px] font-bold tracking-tight leading-none py-2 text-ink">
              <a
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition-colors hover:text-accent"
              >
                Home
              </a>

              <a
                href="/#what-i-do"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition-colors hover:text-accent"
              >
                What I do
              </a>

              {/* Works Section Accordion */}
              <div>
                <div className="flex items-center justify-between py-1">
                  <a
                    href="/works"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`transition-colors hover:text-accent ${isWorks ? "text-accent" : ""}`}
                  >
                    Works
                  </a>
                  <button
                    type="button"
                    onClick={() => setMobileWorksExpanded(!mobileWorksExpanded)}
                    className="p-1.5 text-muted hover:text-ink focus:outline-none"
                    aria-label="Toggle Works Submenu"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className={`transition-transform duration-200 ${mobileWorksExpanded ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>

                {mobileWorksExpanded && (
                  <div className="mt-3 pl-4 border-l-2 border-hairline space-y-4 text-[20px] font-normal text-muted pt-2 pb-1">
                    <a
                      href="/works/bastion"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-accent transition-colors py-0.5"
                    >
                      Bastion
                    </a>
                    <a
                      href="/works/kost"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-accent transition-colors py-0.5"
                    >
                      Kost
                    </a>
                    <a
                      href="/works/hookdrop"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-accent transition-colors py-0.5"
                    >
                      HookDrop
                    </a>
                    <a
                      href="/works"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block font-semibold text-accent text-[17px] pt-1"
                    >
                      View All Works →
                    </a>
                  </div>
                )}
              </div>

              <a
                href="/#articles"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition-colors hover:text-accent"
              >
                Articles
              </a>
              <a
                href="/assets/nirjar_resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition-colors hover:text-accent"
              >
                Resume
              </a>
              <a
                href="/#footer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 transition-colors hover:text-accent"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
