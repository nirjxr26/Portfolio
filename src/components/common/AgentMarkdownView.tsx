import type { ReactNode } from "react"
import { Container } from "../layout"
import { CheckIcon, CopyIcon } from "./Icons"
import { ThemeToggle } from "./ThemeToggle"
import { HOME_PAGE_MARKDOWN } from "@/data/homeMarkdown"
import { useAgentMode } from "@/utils/useAgentMode"
import { useCopy } from "@/utils/useCopy"

const REGULAR_MONO = {
  fontFamily:
    '"Berkeley Mono Variable", "Berkeley Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontWeight: 400,
}

const BOLD_MONO = {
  fontFamily:
    '"TX-02-Data", "TX-02", "Berkeley Mono Variable", "Berkeley Mono", ui-monospace, SFMono-Regular, monospace',
  fontWeight: 700,
}

function renderInlineMarkdown(text: string): ReactNode {
  // Matches **bold** or [label](url)
  const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g
  const parts = text.split(regex)

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={idx} style={BOLD_MONO} className="text-ink font-bold">
          {part}
        </span>
      )
    }

    const linkMatch = /^\[(.*?)\]\((.*?)\)$/.exec(part)
    if (linkMatch) {
      const [, label, url] = linkMatch
      const isExternal = url.startsWith("http")
      return (
        <a
          key={idx}
          href={url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="text-accent hover:underline transition-colors break-all"
        >
          [{label}]({url})
        </a>
      )
    }

    return (
      <span key={idx} style={REGULAR_MONO}>
        {part}
      </span>
    )
  })
}

function renderMarkdownLine(line: string, index: number): ReactNode {
  if (line === "---") {
    return (
      <div key={index} className="text-muted/40 text-xs py-1 select-none font-mono">
        ---
      </div>
    )
  }

  if (line.startsWith("# ")) {
    return (
      <div key={index} className="text-lg min-[375px]:text-xl sm:text-2xl text-ink pt-3 sm:pt-4 pb-1.5 break-words" style={BOLD_MONO}>
        <span className="text-accent font-normal mr-1">#</span>
        <span className="font-bold">{line.slice(2)}</span>
      </div>
    )
  }

  if (line.startsWith("## ")) {
    return (
      <div key={index} className="text-base min-[375px]:text-lg sm:text-xl text-ink pt-4 sm:pt-5 pb-1.5 break-words" style={BOLD_MONO}>
        <span className="text-accent font-normal mr-1">##</span>
        <span className="font-bold">{line.slice(3)}</span>
      </div>
    )
  }

  if (line.startsWith("### ")) {
    return (
      <div key={index} className="text-[13px] min-[375px]:text-sm sm:text-base text-ink pt-2.5 sm:pt-3 pb-0.5 break-words" style={BOLD_MONO}>
        <span className="text-muted font-normal mr-1">###</span>
        <span className="font-bold">{line.slice(4)}</span>
      </div>
    )
  }

  if (line.startsWith("> ")) {
    return (
      <div
        key={index}
        className="border-l-2 border-accent pl-3 sm:pl-3.5 my-1 text-ink-soft bg-surface-alt/40 py-1 rounded-r-lg break-words text-[12px] min-[375px]:text-[13px] sm:text-[14px] leading-relaxed"
      >
        <span className="text-muted mr-1.5 select-none">&gt;</span>
        {renderInlineMarkdown(line.slice(2))}
      </div>
    )
  }

  if (line.startsWith("![")) {
    const imgMatch = /^!\[(.*?)\]\((.*?)\)$/.exec(line.trim())
    if (imgMatch) {
      const [, alt, src] = imgMatch
      const isLightOnly = src.includes("#gh-light-mode-only")
      const isDarkOnly = src.includes("#gh-dark-mode-only")
      const cleanSrc = src.replace(/#.*$/, "")
      const localSrc = cleanSrc.replace(/^https?:\/\/[^/]+/, "")
      return (
        <div
          key={index}
          className={`my-3 max-w-full overflow-hidden ${isLightOnly ? "dark:hidden block" : isDarkOnly ? "hidden dark:block" : "block"}`}
        >
          <div className="text-[11px] sm:text-xs text-muted/70 mb-2 font-mono select-all break-all">
            {line}
          </div>
          <img
            src={localSrc || cleanSrc}
            alt={alt}
            className="w-full max-w-full sm:max-w-[580px] h-auto object-contain rounded-lg border border-hairline bg-surface-alt/40 shadow-sm"
            loading="lazy"
          />
        </div>
      )
    }
  }

  if (line.trim() === "") {
    return <div key={index} className="h-2.5 sm:h-3.5" aria-hidden="true" />
  }

  return (
    <div key={index} className="text-[12px] min-[375px]:text-[13px] sm:text-[14px] leading-relaxed text-ink-soft whitespace-pre-wrap break-words font-mono">
      {renderInlineMarkdown(line)}
    </div>
  )
}

export function AgentMarkdownView() {
  const { toggleAgentMode } = useAgentMode()
  const { copied, copy } = useCopy()

  const handleCopy = () => {
    void copy(HOME_PAGE_MARKDOWN)
  }

  const lines = HOME_PAGE_MARKDOWN.split("\n")

  return (
    <div className="min-h-screen bg-canvas text-ink animate-agent-enter" style={REGULAR_MONO}>
      {/* Top Navbar stuck to upper screen with distinct background color and matching header height */}
      <header className="sticky top-0 z-50 w-full border-b border-hairline bg-surface-alt/95 dark:bg-[#121417]/95 backdrop-blur-md transition-colors">
        <Container size="wide" className="max-w-[960px]">
          <div className="flex h-[var(--header-h)] items-center justify-between text-[11px] min-[360px]:text-xs sm:text-[13px]">
            {/* Left: Home | index.md */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={toggleAgentMode}
                className="text-muted hover:text-ink transition-colors cursor-pointer select-none hit-area"
                aria-label="Back to Home visual view"
              >
                Home
              </button>
              <span className="text-muted/40 select-none">|</span>
              <span className="text-ink font-bold tracking-tight" style={BOLD_MONO}>
                index.md
              </span>
            </div>

            {/* Right: Copy Icon + ThemeToggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-ink hover:bg-surface-alt transition-colors cursor-pointer select-none hit-area active:scale-95"
                aria-label={copied ? "Copied markdown to clipboard" : "Copy markdown to clipboard"}
                title={copied ? "Copied to clipboard" : "Copy markdown"}
              >
                {copied ? (
                  <CheckIcon width={15} height={15} className="text-accent" />
                ) : (
                  <CopyIcon width={15} height={15} />
                )}
              </button>
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </header>

      {/* Raw Markdown File View */}
      <div className="pt-4 sm:pt-8 pb-20 sm:pb-28">
        <Container size="wide" className="max-w-[960px] px-3.5 min-[375px]:px-4 sm:px-6">
          <div className="bg-canvas text-ink selection:bg-accent selection:text-white max-w-full overflow-x-hidden">
            <div className="font-mono space-y-0.5 break-words">
              {lines.map((line, idx) => renderMarkdownLine(line, idx))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
