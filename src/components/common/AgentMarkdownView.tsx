import type { ReactNode } from "react"
import { Container } from "../layout"
import { CheckIcon, CopyIcon } from "./Icons"
import { ThemeToggle } from "./ThemeToggle"
import { HOME_PAGE_MARKDOWN } from "@/data/homeMarkdown"
import { useAgentMode } from "@/utils/useAgentMode"
import { useCopy } from "@/utils/useCopy"

const REGULAR_MONO = {
  fontFamily: '"Berkeley Mono Variable"',
  fontWeight: 400,
}

const BOLD_MONO = {
  fontFamily: '"Berkeley Mono Variable"',
  fontWeight: 700,
}

const TREE_ROUTES: Record<string, { href: string; isExternal?: boolean }> = {
  "nirjar.me/": { href: "/" },
  "index.md/": { href: "/index.md" },
  "works/": { href: "/works" },
  "trace/": { href: "/works/trace" },
  "bastion/": { href: "/works/bastion" },
  "kost/": { href: "/works/kost" },
  "hookdrop/": { href: "/works/hookdrop" },
  "services/": { href: "/services" },
  "articles/": { href: "/articles" },
  "legal/": { href: "/legal" },
  status: { href: "/api/status", isExternal: true },
  projects: { href: "/api/projects", isExternal: true },
  "nirjar_resume.pdf": { href: "/resume.pdf", isExternal: true },
  "humans.txt": { href: "/humans.txt", isExternal: true },
  "llms.txt": { href: "/llms.txt", isExternal: true },
  "rss.xml": { href: "/rss.xml", isExternal: true },
  "sitemap.xml": { href: "/sitemap.xml", isExternal: true },
  "robots.txt": { href: "/robots.txt", isExternal: true },
  "/.well-known/security.txt": { href: "/.well-known/security.txt", isExternal: true },
}

function renderTreeRow(line: string, key: number): ReactNode {
  const guideMatch = line.match(/^([│\s]*(?:├── |└── )|\s+)/)
  const guide = guideMatch ? guideMatch[1] : ""
  let content = guideMatch ? line.slice(guide.length) : line

  let extra: { label: string; href: string } | null = null
  const agentViewMatch = content.match(/^(.*?)\s*(\[\s*Agent view\s*\])$/)
  if (agentViewMatch) {
    content = agentViewMatch[1].trim()
    extra = { label: "[ Agent view ]", href: "/index.md" }
  }

  const label = content.trim()
  const route = TREE_ROUTES[label]

  return (
    <div key={key} className="flex items-start min-w-0 font-mono">
      {guide && (
        <span className="shrink-0 text-muted/60 select-none whitespace-pre">
          {guide}
        </span>
      )}
      {route ? (
        <a
          href={route.href}
          target={route.isExternal ? "_blank" : undefined}
          rel={route.isExternal ? "noopener noreferrer" : undefined}
          className="min-w-0 break-words hover:text-accent transition-colors text-ink font-medium"
        >
          {label}
        </a>
      ) : (
        <span className="min-w-0 font-semibold break-words text-ink">
          {label}
        </span>
      )}
      {extra && (
        <a
          href={extra.href}
          className="text-accent hover:opacity-80 shrink-0 ml-1.5 transition-colors"
        >
          {extra.label}
        </a>
      )}
    </div>
  )
}

function renderWebsiteTreeBlock(
  lines: { line: string; index: number }[],
  blockKey: number,
): ReactNode {
  return (
    <div
      key={`tree-block-${blockKey}`}
      className="rounded-xl sm:rounded-2xl bg-surface-alt border border-hairline p-4 sm:p-6 lg:p-8 my-3 overflow-x-auto space-y-0.5 text-[10px] min-[375px]:text-[11px] sm:text-[13.5px] md:text-[14px] leading-[1.75] sm:leading-[1.85] select-text text-left"
    >
      {lines.map(({ line, index }) => renderTreeRow(line, index))}
    </div>
  )
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
          className="text-accent hover:opacity-80 transition-opacity break-all"
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
      <div key={index} className="text-muted/40 text-[9px] sm:text-xs py-0.5 sm:py-1 select-none font-mono">
        ---
      </div>
    )
  }

  if (line.startsWith("# ")) {
    return (
      <div key={index} className="text-[13px] min-[375px]:text-[14px] sm:text-2xl text-ink pt-2 sm:pt-4 pb-0.5 sm:pb-1.5 break-words" style={BOLD_MONO}>
        <span className="text-accent font-normal mr-1">#</span>
        <span className="font-bold">{line.slice(2)}</span>
      </div>
    )
  }

  if (line.startsWith("## ")) {
    return (
      <div key={index} className="text-[11.5px] min-[375px]:text-xs sm:text-xl text-ink pt-2.5 sm:pt-5 pb-0.5 sm:pb-1.5 break-words" style={BOLD_MONO}>
        <span className="text-accent font-normal mr-1">##</span>
        <span className="font-bold">{line.slice(3)}</span>
      </div>
    )
  }

  if (line.startsWith("### ")) {
    return (
      <div key={index} className="text-[10.5px] min-[375px]:text-[11px] sm:text-base text-ink pt-1.5 sm:pt-3 pb-0.5 break-words" style={BOLD_MONO}>
        <span className="text-muted font-normal mr-1">###</span>
        <span className="font-bold">{line.slice(4)}</span>
      </div>
    )
  }

  if (line.startsWith("> ")) {
    return (
      <div
        key={index}
        className="border-l-2 border-accent pl-2 sm:pl-3.5 my-1 text-ink-soft bg-surface-alt/40 py-1 rounded-r-lg break-words text-[9.5px] min-[375px]:text-[10px] sm:text-[14px] leading-relaxed"
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
          className={`my-2.5 sm:my-3 max-w-full overflow-hidden ${isLightOnly ? "dark:hidden block" : isDarkOnly ? "hidden dark:block" : "block"}`}
        >
          <div className="text-[9px] sm:text-xs text-muted/70 mb-1.5 sm:mb-2 font-mono select-all break-all">
            {line}
          </div>
          <img
            src={localSrc || cleanSrc}
            alt={alt}
            className="w-full max-w-full sm:max-w-[580px] h-auto object-contain rounded-lg"
            loading="lazy"
          />
        </div>
      )
    }
  }

  if (line.trim() === "") {
    return <div key={index} className="h-1.5 sm:h-3.5" aria-hidden="true" />
  }

  return (
    <div key={index} className="text-[9.5px] min-[375px]:text-[10px] sm:text-[14px] leading-relaxed text-ink-soft whitespace-pre-wrap break-words font-mono">
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

  // Filter out HTML comment blocks so they remain in raw markdown for AI agents,
  // but are completely invisible to human users in the browser UI.
  const visibleLines: { line: string; index: number }[] = []
  let insideComment = false

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (trimmed.startsWith("<!--")) {
      insideComment = true
      if (trimmed.endsWith("-->") && trimmed.length > 4) {
        insideComment = false
      }
      continue
    }
    if (insideComment) {
      if (trimmed.endsWith("-->")) {
        insideComment = false
      }
      continue
    }
    visibleLines.push({ line: lines[i], index: i })
  }

  type Block =
    | { type: "line"; line: string; index: number }
    | { type: "tree"; lines: { line: string; index: number }[] }

  const blocks: Block[] = []
  let inWebsiteTree = false
  let treeAccumulator: { line: string; index: number }[] = []

  for (const item of visibleLines) {
    const trimmed = item.line.trim()

    if (trimmed === "### Website Tree") {
      blocks.push({ type: "line", line: item.line, index: item.index })
      inWebsiteTree = true
      continue
    }

    if (inWebsiteTree) {
      if (
        trimmed.startsWith("nirjar.me/") ||
        trimmed.startsWith("├── ") ||
        trimmed.startsWith("└── ") ||
        trimmed.startsWith("│") ||
        trimmed.startsWith("    ")
      ) {
        treeAccumulator.push(item)
        continue
      }
      if (treeAccumulator.length > 0) {
        blocks.push({ type: "tree", lines: treeAccumulator })
        treeAccumulator = []
      }
      inWebsiteTree = false
    }

    blocks.push({ type: "line", line: item.line, index: item.index })
  }

  if (treeAccumulator.length > 0) {
    blocks.push({ type: "tree", lines: treeAccumulator })
  }

  return (
    <div className="min-h-screen bg-canvas text-ink animate-agent-enter" style={REGULAR_MONO}>
      {/* Top Navbar stuck to upper screen with alternate design surface color for both themes */}
      <header className="sticky top-0 z-50 w-full border-b border-hairline bg-surface-alt/95 backdrop-blur-md transition-colors">
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
              {blocks.map((block, idx) =>
                block.type === "tree"
                  ? renderWebsiteTreeBlock(block.lines, idx)
                  : renderMarkdownLine(block.line, block.index),
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
