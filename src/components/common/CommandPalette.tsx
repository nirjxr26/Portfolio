import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import { BLOG_ARTICLES } from "@/data/blogArticles"
import { CASE_STUDIES } from "@/data/caseStudies"
import { useCopy } from "@/utils/useCopy"
import { CheckIcon, SearchIcon } from "./Icons"
import { notifySite } from "./NotificationToast"

export interface PaletteItem {
  id: string
  title: string
  category: "Navigation" | "Projects" | "Articles" | "Other" | "Actions"
  href?: string
  keywords?: string
  shortcut?: string
  onSelect?: () => void
}

const DEFAULT_NAVIGATION: PaletteItem[] = [
  {
    id: "nav-home",
    title: "Home",
    category: "Navigation",
    href: "/",
    keywords: "main root index start",
  },
  {
    id: "nav-works",
    title: "Works",
    category: "Navigation",
    href: "/works",
    keywords: "projects portfolio engineering systems",
  },
  {
    id: "nav-services",
    title: "Services",
    category: "Navigation",
    href: "/services",
    keywords: "consulting freelance capabilities hiring security devops",
  },
  {
    id: "nav-articles",
    title: "Articles",
    category: "Navigation",
    href: "/articles",
    keywords: "blog essays writing posts",
  },
]

const OTHER_ITEMS: PaletteItem[] = [
  {
    id: "nav-sitemap",
    title: "Sitemap",
    category: "Other",
    href: "/sitemap",
    keywords: "index all links pages directory",
  },
  {
    id: "nav-legal",
    title: "Terms of use",
    category: "Other",
    href: "/legal",
    keywords: "privacy security terms copyright disclaimer legal",
  },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEntered, setIsEntered] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const searchInputId = useId()
  const { copied, copy } = useCopy(1800)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent))
  }, [])

  const toggleTheme = useCallback(() => {
    const root = document.documentElement
    const isDark = root.classList.toggle("dark")
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light")
    } catch {}
    window.dispatchEvent(new Event("theme-change"))
    notifySite("Theme updated", isDark ? "Switched to dark mode." : "Switched to light mode.")
  }, [])

  const downloadResume = useCallback(() => {
    try {
      const a = document.createElement("a")
      a.href = "/resume.pdf"
      a.download = "Nirjar_Goswami_Resume.pdf"
      document.body.appendChild(a)
      a.click()
      setTimeout(() => {
        if (document.body.contains(a)) document.body.removeChild(a)
      }, 200)
    } catch {
      window.location.href = "/resume.pdf"
    }
    notifySite("Download started", "Your résumé PDF is downloading.")
  }, [])

  const copyUrl = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://nirjargoswami.me"
    let ok = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        ok = true
      }
    } catch {}

    if (!ok) {
      try {
        const ta = document.createElement("textarea")
        ta.value = url
        ta.style.position = "fixed"
        ta.style.opacity = "0"
        document.body.appendChild(ta)
        ta.focus()
        ta.select()
        ok = document.execCommand("copy")
        document.body.removeChild(ta)
      } catch {}
    }

    void copy(url)
    notifySite("Link copied", "Page URL copied to clipboard.")
  }, [copy])

  const openContact = useCallback(() => {
    const email = "nirjargoswami2626@gmail.com"
    // 1. Synchronously trigger mailto so browser user activation token is active
    try {
      const a = document.createElement("a")
      a.href = `mailto:${email}`
      document.body.appendChild(a)
      a.click()
      setTimeout(() => {
        if (document.body.contains(a)) document.body.removeChild(a)
      }, 200)
    } catch {
      window.location.href = `mailto:${email}`
    }

    // 2. Also copy email to clipboard synchronously/asynchronously so user has it ready
    try {
      if (navigator.clipboard?.writeText) {
        void navigator.clipboard.writeText(email)
      } else {
        const ta = document.createElement("textarea")
        ta.value = email
        ta.style.position = "fixed"
        ta.style.opacity = "0"
        document.body.appendChild(ta)
        ta.select()
        document.execCommand("copy")
        document.body.removeChild(ta)
      }
    } catch {}

    notifySite("Contact opened", "Email copied & mail client opened.")
  }, [])

  // Works / Case studies items
  const projectItems: PaletteItem[] = useMemo(
    () =>
      Object.entries(CASE_STUDIES).map(([slug, data]) => ({
        id: `project-${slug}`,
        title: data.hero.title,
        category: "Projects",
        href: `/works/${slug}`,
        keywords: `${slug} case study ${data.softwareSchema?.programmingLanguage ?? ""}`,
      })),
    [],
  )

  // Articles items
  const articleItems: PaletteItem[] = useMemo(
    () =>
      BLOG_ARTICLES.map((article) => ({
        id: `article-${article.slug}`,
        title: article.title,
        category: "Articles",
        href: `/articles/${article.slug}`,
        keywords: `${article.category} ${article.keywords} ${article.slug.replace(/-/g, " ")}`,
      })),
    [],
  )

  // Actions items with daily keybindings
  const actionItems: PaletteItem[] = useMemo(
    () => [
      {
        id: "action-theme",
        title: "Toggle Theme",
        category: "Actions",
        keywords: "theme dark light mode color switch",
        shortcut: isMac ? "⌥ + T" : "Alt + T",
        onSelect: toggleTheme,
      },
      {
        id: "action-resume",
        title: "Download Resume (PDF)",
        category: "Actions",
        href: "/resume.pdf",
        keywords: "cv resume pdf hiring career credentials",
        shortcut: isMac ? "⌥ + R" : "Alt + R",
        onSelect: downloadResume,
      },
      {
        id: "action-copy-url",
        title: "Copy Current Page URL",
        category: "Actions",
        keywords: "copy share link url address",
        shortcut: isMac ? "⌘ + C" : "Ctrl + C",
        onSelect: copyUrl,
      },
      {
        id: "action-email",
        title: "Contact Nirjar Goswami",
        category: "Actions",
        href: "mailto:nirjargoswami2626@gmail.com",
        keywords: "contact hire email message ping mail",
        shortcut: isMac ? "⌥ + M" : "Alt + M",
        onSelect: openContact,
      },
    ],
    [copyUrl, downloadResume, isMac, openContact, toggleTheme],
  )

  // Build the complete searchable catalog
  const catalog = useMemo<PaletteItem[]>(() => {
    return [...DEFAULT_NAVIGATION, ...projectItems, ...articleItems, ...OTHER_ITEMS, ...actionItems]
  }, [actionItems, articleItems, projectItems])

  // Filter items: by default show Navigation + Works (Projects). "View more" reveals Articles & Actions.
  const displayedItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return isExpanded ? catalog : [...DEFAULT_NAVIGATION, ...projectItems]
    }

    return catalog.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q)
      const keywordsMatch = item.keywords?.toLowerCase().includes(q)
      const categoryMatch = item.category.toLowerCase().includes(q)
      return titleMatch || keywordsMatch || categoryMatch
    })
  }, [catalog, isExpanded, projectItems, query])

  // Group displayed items by category
  const groupedSections = useMemo(() => {
    const categoryOrder: Array<PaletteItem["category"]> = ["Navigation", "Projects", "Articles", "Other", "Actions"]
    const groups: Array<{ category: PaletteItem["category"]; items: PaletteItem[] }> = []

    for (const cat of categoryOrder) {
      const items = displayedItems.filter((item) => item.category === cat)
      if (items.length > 0) {
        groups.push({ category: cat, items })
      }
    }

    return groups
  }, [displayedItems])

  const openPalette = useCallback(() => {
    setIsOpen(true)
    setIsClosing(false)
    setIsEntered(false)
    setQuery("")
    setActiveIndex(-1)
    setIsExpanded(false)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsEntered(true)
      })
    })
  }, [])

  const closePalette = useCallback(() => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      setIsEntered(false)
    }, 200)
  }, [isClosing])

  // Global keyboard shortcuts (Cmd+K, Ctrl+K, /, Esc, and daily action keybindings)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only enable keybindings on desktop (>= 1024px) - not for mobile or tablets/iPads
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        return
      }

      const key = e.key.toLowerCase()
      const code = e.code

      const isC = key === "c" || code === "KeyC"
      const isR = key === "r" || code === "KeyR"
      const isT = key === "t" || code === "KeyT"
      const isM = key === "m" || code === "KeyM" || key === "e" || code === "KeyE"

      // Cmd+K or Ctrl+K: toggle command palette
      if ((e.metaKey || e.ctrlKey) && (key === "k" || code === "KeyK")) {
        e.preventDefault()
        if (isOpen) {
          closePalette()
        } else {
          openPalette()
        }
        return
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault()
        closePalette()
        return
      }

      // Ctrl+C or Cmd+C: Copy URL (both inside palette and anywhere on site when no text is highlighted)
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && isC) {
        if (isOpen) {
          const inputEl = inputRef.current
          const hasInputSelection = inputEl ? inputEl.selectionStart !== inputEl.selectionEnd : false
          if (!hasInputSelection) {
            e.preventDefault()
            copyUrl()
            closePalette()
            return
          }
        } else {
          const selection = window.getSelection()?.toString()
          if (!selection || selection.length === 0) {
            e.preventDefault()
            copyUrl()
            return
          }
        }
      }

      // Alt+R (or Option+R): Download resume
      if (e.altKey && isR) {
        e.preventDefault()
        downloadResume()
        if (isOpen) closePalette()
        return
      }

      // Alt+T (or Option+T): Toggle theme
      if (e.altKey && isT) {
        e.preventDefault()
        toggleTheme()
        return
      }

      // Alt+M (or Option+M / Alt+E): Open contact
      if (e.altKey && isM) {
        e.preventDefault()
        openContact()
        if (isOpen) closePalette()
        return
      }

      // When command palette is OPEN, don't trigger single-key shortcuts while typing in input
      if (isOpen) return

      const isInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)

      // Open on `/` when not typing inside an input/textarea
      if (e.key === "/" && !isInput) {
        e.preventDefault()
        openPalette()
        return
      }

      // Quick single-key bindings when not typing in any input:
      if (!isInput && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        // T -> Toggle theme
        if (isT) {
          e.preventDefault()
          toggleTheme()
          return
        }

        // R -> Download resume
        if (isR) {
          e.preventDefault()
          downloadResume()
          return
        }

        // C -> Copy page URL
        if (isC) {
          const selection = window.getSelection()?.toString()
          if (!selection || selection.length === 0) {
            e.preventDefault()
            copyUrl()
            return
          }
        }

        // M or E -> Contact
        if (isM) {
          e.preventDefault()
          openContact()
          return
        }
      }
    }

    const handleCustomOpen = () => openPalette()

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("open-command-palette", handleCustomOpen)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("open-command-palette", handleCustomOpen)
    }
  }, [closePalette, copyUrl, downloadResume, isOpen, openContact, openPalette, toggleTheme])

  // Lock scroll & auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      const t = window.setTimeout(() => inputRef.current?.focus(), 60)
      return () => {
        window.clearTimeout(t)
        document.body.style.removeProperty("overflow")
      }
    }
  }, [isOpen])

  // Reset active index when filtered results change
  useEffect(() => {
    setActiveIndex(-1)
  }, [displayedItems])

  const executeItem = useCallback(
    (item: PaletteItem) => {
      if (item.onSelect) {
        item.onSelect()
        closePalette()
        return
      }

      if (item.href) {
        notifySite("Page navigation", `Navigating to ${item.title}.`)
        closePalette()
        setTimeout(() => {
          window.location.href = item.href!
        }, 120)
      }
    },
    [closePalette],
  )

  const scrollIntoView = (index: number) => {
    const list = listRef.current
    if (!list) return
    const el = list.querySelector(`[data-index="${index}"]`) as HTMLElement | null
    if (el) {
      el.scrollIntoView({ block: "nearest" })
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (displayedItems.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      const nextIndex = activeIndex < 0 ? 0 : (activeIndex + 1) % displayedItems.length
      setActiveIndex(nextIndex)
      scrollIntoView(nextIndex)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const nextIndex =
        activeIndex < 0
          ? displayedItems.length - 1
          : (activeIndex - 1 + displayedItems.length) % displayedItems.length
      setActiveIndex(nextIndex)
      scrollIntoView(nextIndex)
    } else if (e.key === "Enter") {
      e.preventDefault()
      const targetIndex = activeIndex >= 0 ? activeIndex : 0
      const selected = displayedItems[targetIndex]
      if (selected) executeItem(selected)
    }
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4 overscroll-none"
    >
      {/* Backdrop with smooth fade in/out */}
      <div
        onClick={closePalette}
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-200 ease-out ${
          !isEntered || isClosing ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />

      {/* Modal Card - no outer border, generous side padding, spring entry/exit, normal letter-spacing */}
      <div
        onMouseLeave={() => setActiveIndex(-1)}
        className={`relative z-10 w-full max-w-[540px] rounded-[22px] bg-card text-ink shadow-[0_24px_70px_rgba(0,0,0,0.32)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden select-none flex flex-col max-h-[440px] sm:max-h-[470px] tracking-normal [letter-spacing:normal] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          !isEntered || isClosing
            ? "opacity-0 scale-[0.96] -translate-y-3"
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        {/* Search Bar with altered background and matched fixed height */}
        <div className="flex items-center gap-3 px-6 sm:px-8 h-[54px] bg-surface-alt shrink-0 tracking-normal [letter-spacing:normal]">
          <SearchIcon width={16} height={16} className="text-muted shrink-0" />
          <input
            id={searchInputId}
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search pages, projects, articles..."
            className="w-full bg-transparent text-[16px] sm:text-base text-ink placeholder:text-muted/65 focus:outline-none tracking-normal [letter-spacing:normal]"
            autoComplete="off"
            spellCheck={false}
          />
          {copied && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent px-2 py-0.5 rounded-full bg-accent/10 shrink-0 tracking-normal [letter-spacing:normal]">
              <CheckIcon width={12} height={12} strokeWidth={2.5} />
              Copied!
            </span>
          )}
          {/* Close button: X matching search icon size */}
          <button
            type="button"
            onClick={closePalette}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:text-ink hover:bg-canvas/80 transition-colors cursor-pointer shrink-0 hit-area"
            aria-label="Close command palette"
            title="Close"
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Results List without any visible scrollbar and grouped content */}
        <div
          ref={listRef}
          onMouseLeave={() => setActiveIndex(-1)}
          className="flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 tracking-normal [letter-spacing:normal]"
        >
          {displayedItems.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted tracking-normal [letter-spacing:normal]">
              No matching pages found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            groupedSections.map((group) => (
              <div key={group.category} className="mb-2 last:mb-0">
                {/* Category Group Header: Univers font with normal spacing */}
                <div className="px-6 sm:px-8 pt-3 pb-1 text-[14px] sm:text-[14px] font-univers font-semibold tracking-normal [letter-spacing:normal] text-ink/80 dark:text-ink/85 select-none">
                  {group.category}
                </div>

                {/* Items container with vertical indicator rail */}
                <div className="ml-6 sm:ml-8 pl-3.5 sm:pl-4 pr-6 sm:pr-8 border-l border-hairline space-y-0.5 my-1">
                  {group.items.map((item) => {
                    const globalIdx = displayedItems.findIndex((it) => it.id === item.id)
                    const isSelected = globalIdx === activeIndex

                    return (
                      <div
                        key={item.id}
                        data-index={globalIdx}
                        onClick={() => executeItem(item)}
                        onMouseEnter={() => setActiveIndex(globalIdx)}
                        className={`flex items-center justify-between py-1.5 sm:py-2 text-left transition-colors cursor-pointer select-none bg-transparent tracking-normal [letter-spacing:normal] ${
                          isSelected
                            ? "text-ink font-semibold"
                            : "text-muted hover:text-ink font-normal"
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <span className="text-[15px] sm:text-[15px] truncate transition-colors tracking-normal [letter-spacing:normal]">
                          {item.title}
                        </span>

                        {item.id === "action-copy-url" && copied ? (
                          <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-accent shrink-0 select-none">
                            <CheckIcon width={12} height={12} strokeWidth={2.5} />
                            Copied
                          </span>
                        ) : (
                          item.shortcut && (
                            <kbd
                              className={`hidden lg:inline-flex items-center justify-center h-[20px] px-2 text-[11px] font-mono font-medium rounded-[5px] select-none leading-none shrink-0 ml-3 transition-colors ${
                                isSelected
                                  ? "bg-canvas dark:bg-white/[0.12] text-ink"
                                  : "bg-surface-alt/80 dark:bg-white/[0.06] text-muted/80"
                              }`}
                            >
                              {item.shortcut}
                            </kbd>
                          )
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}

          {/* Centered View More button in default view */}
          {!query && !isExpanded && (
            <div className="pt-2 pb-2 flex justify-center w-full">
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                onMouseEnter={() => setActiveIndex(-1)}
                className="flex items-center justify-center gap-1.5 px-6 py-2 text-[14px] sm:text-[13px] font-medium text-accent hover:opacity-80 transition-opacity text-center cursor-pointer select-none bg-transparent mx-auto tracking-normal [letter-spacing:normal]"
              >
                <span>View more</span>
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Bar: Keyboard navigation hints - hidden on mobile, matching header height & color, no top border */}
        <div className="hidden sm:flex items-center justify-between px-6 sm:px-8 h-[54px] bg-surface-alt select-none shrink-0 tracking-normal [letter-spacing:normal]">
          <div className="flex items-center gap-5 text-muted">
            <span className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-ink/90 dark:text-ink/90 bg-canvas/80 dark:bg-white/[0.08] px-1.5 py-1 rounded-[6px] select-none">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
              <span className="text-[13px] sm:text-[14px] font-medium text-muted/90">navigate</span>
            </span>

            <span className="flex items-center gap-2">
              <span className="flex items-center text-ink/90 dark:text-ink/90 bg-canvas/80 dark:bg-white/[0.08] px-1.5 py-1 rounded-[6px] select-none">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="9 10 4 15 9 20" />
                  <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                </svg>
              </span>
              <span className="text-[13px] sm:text-[14px] font-medium text-muted/90">select</span>
            </span>

            <span className="flex items-center gap-2">
              <span className="flex items-center justify-center font-mono text-[12px] h-[24px] px-1.5 text-ink/90 dark:text-ink/90 bg-canvas/80 dark:bg-white/[0.08] rounded-[6px] select-none leading-none">
                esc
              </span>
              <span className="text-[13px] sm:text-[14px] font-medium text-muted/90">close</span>
            </span>
          </div>

          <span className="text-[13px] sm:text-[14px] font-medium text-muted/90">
            {displayedItems.length} {displayedItems.length === 1 ? "result" : "results"}
          </span>
        </div>
      </div>
    </div>
  )
}
