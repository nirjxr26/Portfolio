import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { withAssetHash } from "@/utils/helpers"
import { CheckIcon } from "./Icons"

export interface AppleShareSheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
  description?: string
  image?: string
  slug?: string
}

const ICONS = {
  whatsapp: "/assets/article_poster/blog_bottom_sheet/whatsapp.svg",
  x: "/assets/article_poster/blog_bottom_sheet/x.svg",
  linkedin: "/assets/article_poster/blog_bottom_sheet/linkedIN.svg",
  gmail: "/assets/article_poster/blog_bottom_sheet/gmail.svg",
  copy: "/assets/article_poster/blog_bottom_sheet/copy_white.svg",
  copyMd: "/assets/article_poster/blog_bottom_sheet/copy_md_white.svg",
  viewSource: "/assets/article_poster/blog_bottom_sheet/view_source_md_white.svg",
  rss: "/assets/article_poster/blog_bottom_sheet/rss_white.svg",
} as const

export function AppleShareSheet({
  isOpen,
  onClose,
  title,
  url,
  image,
  slug,
}: Readonly<AppleShareSheetProps>) {
  const [isEntered, setIsEntered] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedMd, setCopiedMd] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [isClosing, setIsClosing] = useState(false)

  const copyTimeoutRef = useRef<number | null>(null)
  const mdTimeoutRef = useRef<number | null>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  // Smooth close with exit slide
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setIsEntered(false)
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    if (mdTimeoutRef.current) clearTimeout(mdTimeoutRef.current)
    setCopiedLink(false)
    setCopiedMd(false)
    setTimeout(() => {
      setIsClosing(false)
      setDragOffset(0)
      setCopiedLink(false)
      setCopiedMd(false)
      onClose()
    }, 420)
  }, [onClose])

  // Mount animation & listeners
  useEffect(() => {
    if (!isOpen) {
      setIsEntered(false)
      setCopiedLink(false)
      setCopiedMd(false)
      return
    }

    setCopiedLink(false)
    setCopiedMd(false)

    // Paint initial bottom frame before smooth entry
    const entryTimer = setTimeout(() => {
      setIsEntered(true)
    }, 25)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    // Do not set overflow: hidden on iOS/touch devices as it forces Safari's bottom toolbar to pop up
    const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)
    const originalOverflow = document.body.style.overflow
    if (!isIOS) {
      document.body.style.overflow = "hidden"
    }

    // Tint top status bar (notch) and bottom Safari address bar to dark overlay for seamless edge-to-edge view
    const root = document.documentElement
    const body = document.body
    const originalRootBg = root.style.backgroundColor
    const originalBodyBg = body.style.backgroundColor
    root.style.backgroundColor = "#141416"
    body.style.backgroundColor = "#141416"

    const metas = document.querySelectorAll('meta[name="theme-color"]')
    const previousThemeColors: string[] = []
    metas.forEach((meta) => {
      previousThemeColors.push(meta.getAttribute("content") || "")
      meta.setAttribute("content", "#141416")
    })

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      clearTimeout(entryTimer)
      if (!isIOS) {
        document.body.style.overflow = originalOverflow
      }
      if (originalRootBg) {
        root.style.backgroundColor = originalRootBg
      } else {
        root.style.removeProperty("background-color")
      }
      if (originalBodyBg) {
        body.style.backgroundColor = originalBodyBg
      } else {
        body.style.removeProperty("background-color")
      }
      metas.forEach((meta, idx) => {
        if (previousThemeColors[idx]) {
          meta.setAttribute("content", previousThemeColors[idx])
        }
      })
      window.removeEventListener("keydown", handleKeyDown)
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
      if (mdTimeoutRef.current) clearTimeout(mdTimeoutRef.current)
    }
  }, [isOpen, handleClose])

  if (!isOpen && !isClosing) return null

  // Always display the main canonical website name
  const displayWebsite = "https://www.nirjar.me"

  // Actions
  const copyTextToClipboard = async (text: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        return true
      }
    } catch {
      // fallback
    }

    try {
      if (typeof document !== "undefined") {
        const ta = document.createElement("textarea")
        ta.value = text
        ta.style.position = "fixed"
        ta.style.opacity = "0"
        document.body.appendChild(ta)
        ta.select()
        const ok = document.execCommand("copy")
        document.body.removeChild(ta)
        return ok
      }
    } catch {
      return false
    }
    return false
  }

  const handleCopyLink = async () => {
    await copyTextToClipboard(url)
    setCopiedLink(true)
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    copyTimeoutRef.current = window.setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleCopyMd = async () => {
    const mdSnippet = `[${title}](${url})`
    await copyTextToClipboard(mdSnippet)
    setCopiedMd(true)
    if (mdTimeoutRef.current) clearTimeout(mdTimeoutRef.current)
    mdTimeoutRef.current = window.setTimeout(() => setCopiedMd(false), 2000)
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, "_blank", "noopener,noreferrer")
  }

  const handleX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank", "noopener,noreferrer")
  }

  const handleLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank", "noopener,noreferrer")
  }

  const handleGmail = () => {
    const subject = encodeURIComponent(title)
    const body = encodeURIComponent(`${title} ${url}`)
    const isMobile = typeof navigator !== "undefined" && /iPad|iPhone|iPod|Android/.test(navigator.userAgent)
    if (isMobile) {
      window.location.href = `mailto:?subject=${subject}&body=${body}`
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${subject}&body=${body}`, "_blank", "noopener,noreferrer")
    }
  }

  const handleViewSource = () => {
    if (slug) {
      window.open(`/articles/${slug}.md`, "_blank", "noopener,noreferrer")
    } else {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  const handleRss = () => {
    window.open("/feed.json", "_blank", "noopener,noreferrer")
  }

  // Touch drag gesture
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = e.touches[0].clientY - touchStart
    if (diff > 0) {
      setDragOffset(diff)
    }
  }

  const onTouchEnd = () => {
    if (dragOffset > 75) {
      handleClose()
    } else {
      setDragOffset(0)
    }
    setTouchStart(null)
  }

  const posterImageSrc = image ? (image.startsWith("http") ? image : withAssetHash(image)) : undefined

  const sheetContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share article"
      className="fixed inset-0 z-50 flex flex-col justify-end items-center pointer-events-auto px-[10px] pb-[10px] sm:px-4 sm:pb-3 overscroll-none"
      style={{
        height: "100dvh",
        maxHeight: "100dvh",
        touchAction: "manipulation",
      }}
    >
      {/* Full screen backdrop */}
      <div
        onClick={handleClose}
        onTouchMove={(e) => e.preventDefault()}
        className={`fixed inset-0 bg-black/60 backdrop-blur-[4px] transition-opacity duration-400 ease-out ${
          !isEntered || isClosing ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />

      {/* Floating Bottom Sheet Card with slow smooth slide-up flow */}
      <div
        ref={sheetRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: !isEntered || isClosing
            ? "translate3d(0, 100%, 0)"
            : dragOffset > 0
            ? `translate3d(0, ${dragOffset}px, 0)`
            : "translate3d(0, 0, 0)",
          opacity: !isEntered || isClosing ? 0 : 1,
          transition: dragOffset > 0
            ? "none"
            : "transform 480ms cubic-bezier(0.22, 1, 0.36, 1), opacity 350ms ease-out",
          touchAction: "pan-y",
        }}
        className="relative z-10 mx-auto w-full sm:max-w-[420px] rounded-[32px] bg-[#212124] text-white shadow-2xl border-0 select-none overflow-hidden pt-3.5 pb-6 sm:pt-3 sm:pb-5 overscroll-contain max-h-[calc(100dvh-20px)]"
      >
        {/* Horizontal grabber bar in top center */}
        <div className="pt-1 pb-2 sm:pt-0.5 sm:pb-1.5">
          <div className="h-1 w-12 rounded-full bg-[#48484a] mx-auto" />
        </div>

        {/* Row 0: Article Header */}
        <div className="px-8 sm:px-7 pt-2 pb-4 sm:pt-1.5 sm:pb-3 flex items-center gap-3.5">
          {/* Article Cover Poster on the left of article title (borderless, slightly bigger) */}
          <div className="w-[64px] h-[64px] rounded-2xl overflow-hidden shrink-0 relative flex items-center justify-center shadow-sm">
            {posterImageSrc ? (
              <img
                src={posterImageSrc}
                alt={title}
                className="w-full h-full object-cover rounded-2xl select-none"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-white font-mono text-base font-semibold rounded-2xl">
                N
              </div>
            )}
          </div>

          {/* Title & Main Website Name */}
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-semibold text-white leading-tight line-clamp-1 tracking-normal">
              {title}
            </h3>
            <p className="text-[13px] text-neutral-400 font-normal leading-normal mt-0.5 truncate">
              {displayWebsite}
            </p>
          </div>
        </div>

        {/* Divider 1 (identical to Divider 2) */}
        <div className="h-px bg-white/10 mx-8 sm:mx-7 my-1" />

        {/* Row 1: Social Squircles aligned edge-to-edge with divider line */}
        <div className="flex items-start justify-between px-8 sm:px-7 py-4.5 sm:py-3.5">
          {/* WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex flex-col items-center gap-2 w-[56px] shrink-0 text-center group cursor-pointer border-0 bg-transparent p-0 transition-transform active:scale-95"
          >
            <div className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center shadow-md overflow-hidden">
              <img
                src={withAssetHash(ICONS.whatsapp)}
                alt="whatsapp"
                width={56}
                height={56}
                className="w-full h-full object-contain select-none"
                draggable={false}
              />
            </div>
            <span className="text-[13px] font-medium text-white text-center leading-tight whitespace-nowrap">
              whatsapp
            </span>
          </button>

          {/* X */}
          <button
            type="button"
            onClick={handleX}
            className="flex flex-col items-center gap-2 w-[56px] shrink-0 text-center group cursor-pointer border-0 bg-transparent p-0 transition-transform active:scale-95"
          >
            <div className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center shadow-md overflow-hidden">
              <img
                src={withAssetHash(ICONS.x)}
                alt="X"
                width={56}
                height={56}
                className="w-full h-full object-contain select-none"
                draggable={false}
              />
            </div>
            <span className="text-[13px] font-medium text-white text-center leading-tight whitespace-nowrap">
              X
            </span>
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            onClick={handleLinkedIn}
            className="flex flex-col items-center gap-2 w-[56px] shrink-0 text-center group cursor-pointer border-0 bg-transparent p-0 transition-transform active:scale-95"
          >
            <div className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center shadow-md overflow-hidden">
              <img
                src={withAssetHash(ICONS.linkedin)}
                alt="LinkedIn"
                width={56}
                height={56}
                className="w-full h-full object-contain select-none"
                draggable={false}
              />
            </div>
            <span className="text-[13px] font-medium text-white text-center leading-tight whitespace-nowrap">
              LinkedIn
            </span>
          </button>

          {/* Gmail */}
          <button
            type="button"
            onClick={handleGmail}
            className="flex flex-col items-center gap-2 w-[56px] shrink-0 text-center group cursor-pointer border-0 bg-transparent p-0 transition-transform active:scale-95"
          >
            <div className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center shadow-md overflow-hidden">
              <img
                src={withAssetHash(ICONS.gmail)}
                alt="Gmail"
                width={56}
                height={56}
                className="w-full h-full object-contain select-none"
                draggable={false}
              />
            </div>
            <span className="text-[13px] font-medium text-white text-center leading-tight whitespace-nowrap">
              Gmail
            </span>
          </button>
        </div>

        {/* Divider 2 (identical to Divider 1) */}
        <div className="h-px bg-white/10 mx-8 sm:mx-7 my-1" />

        {/* Row 2: Action Squircles matching Row 1 size & border-radius, borderless */}
        <div className="flex items-start justify-between px-8 sm:px-7 py-4.5 sm:py-3.5">
          {/* Copy */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-2 w-[56px] shrink-0 text-center group cursor-pointer border-0 bg-transparent p-0 transition-transform active:scale-95"
          >
            <div className="w-[56px] h-[56px] rounded-2xl bg-white/[0.14] hover:bg-white/[0.2] active:bg-white/[0.25] flex items-center justify-center transition-colors group-active:scale-95 shadow-sm">
              <span className={`icon-swap${copiedLink ? " is-copied" : ""}`} aria-hidden="true">
                <span className="icon-swap-out">
                  <img
                    src={withAssetHash(ICONS.copy)}
                    alt=""
                    className="w-[20px] h-[25px] object-contain select-none"
                    draggable={false}
                  />
                </span>
                <span className="icon-swap-in text-accent">
                  <CheckIcon width={22} height={22} strokeWidth={2.4} />
                </span>
              </span>
            </div>
            <span className={`text-[13px] font-medium transition-colors duration-200 text-center leading-tight whitespace-nowrap ${copiedLink ? "text-accent" : "text-white"}`}>
              {copiedLink ? "Copied!" : "Copy"}
            </span>
          </button>

          {/* Copy MD */}
          <button
            type="button"
            onClick={handleCopyMd}
            className="flex flex-col items-center gap-2 w-[56px] shrink-0 text-center group cursor-pointer border-0 bg-transparent p-0 transition-transform active:scale-95"
          >
            <div className="w-[56px] h-[56px] rounded-2xl bg-white/[0.14] hover:bg-white/[0.2] active:bg-white/[0.25] flex items-center justify-center transition-colors group-active:scale-95 shadow-sm">
              <span className={`icon-swap${copiedMd ? " is-copied" : ""}`} aria-hidden="true">
                <span className="icon-swap-out">
                  <svg
                    width="22"
                    height="26"
                    viewBox="0 0 22 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="select-none"
                  >
                    <path
                      d="M13 1.5H3.5C2.39543 1.5 1.5 2.39543 1.5 3.5V22.5C1.5 23.6046 2.39543 24.5 3.5 24.5H18.5C19.6046 24.5 20.5 23.6046 20.5 22.5V9L13 1.5Z"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 1.5V9H20.5"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 14.5H16"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 18.5H12"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="icon-swap-in text-accent">
                  <CheckIcon width={22} height={22} strokeWidth={2.4} />
                </span>
              </span>
            </div>
            <span className={`text-[13px] font-medium transition-colors duration-200 text-center leading-tight whitespace-nowrap ${copiedMd ? "text-accent" : "text-white"}`}>
              {copiedMd ? "Copied!" : "Copy MD"}
            </span>
          </button>

          {/* Source */}
          <button
            type="button"
            onClick={handleViewSource}
            className="flex flex-col items-center gap-2 w-[56px] shrink-0 text-center group cursor-pointer border-0 bg-transparent p-0 transition-transform active:scale-95"
          >
            <div className="w-[56px] h-[56px] rounded-2xl bg-white/[0.14] hover:bg-white/[0.2] active:bg-white/[0.25] flex items-center justify-center transition-colors group-active:scale-95 shadow-sm">
              <img
                src={withAssetHash(ICONS.viewSource)}
                alt=""
                className="w-[26px] h-[17px] object-contain select-none"
                draggable={false}
              />
            </div>
            <span className="text-[13px] font-medium text-white text-center leading-tight whitespace-nowrap">
              Source
            </span>
          </button>

          {/* RSS */}
          <button
            type="button"
            onClick={handleRss}
            className="flex flex-col items-center gap-2 w-[56px] shrink-0 text-center group cursor-pointer border-0 bg-transparent p-0 transition-transform active:scale-95"
          >
            <div className="w-[56px] h-[56px] rounded-2xl bg-white/[0.14] hover:bg-white/[0.2] active:bg-white/[0.25] flex items-center justify-center transition-colors group-active:scale-95 shadow-sm">
              <img
                src={withAssetHash(ICONS.rss)}
                alt=""
                className="w-[20px] h-[20px] object-contain select-none translate-x-[2px] -translate-y-[2px]"
                draggable={false}
              />
            </div>
            <span className="text-[13px] font-medium text-white text-center leading-tight whitespace-nowrap">
              RSS
            </span>
          </button>
        </div>
      </div>
    </div>
  )

  if (typeof document === "undefined") return null
  return createPortal(sheetContent, document.body)
}
