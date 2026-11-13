/**
 * Shared article markdown helpers — paragraphs, fenced code blocks,
 * ordered/unordered lists, and inline code / bold / italic / links.
 * Plain content (no markers) renders exactly as before, as <p><span>…</p>.
 */

import { useRef, type ReactNode } from "react"
import { CopySwapIcon } from "../components/common/Icons"
import { withAssetHash } from "./helpers"
import { useCopy } from "./useCopy"

export function InlineCode({ children }: Readonly<{ children: string }>) {
  return (
    <code className="rounded-[6px] bg-surface-alt px-1.5 py-0.5 font-mono text-[13px] font-medium tracking-normal text-ink sm:text-[14px]">
      {children}
    </code>
  )
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

/* Inline tokens: links first, then code, then bold, then italic.
 * Bold allows single asterisks inside (e.g. `'*'` in a bold lead-in). */
const INLINE = /(\[[^\]]+\]\([^)\s]+\)|`[^`]+`|\*\*(?:[^*]|\*(?!\*))+\*\*|\*[^*\n]+\*)/g

function renderInline(text: string, key: string): ReactNode[] {
  const nodes: ReactNode[] = []

  text.split(INLINE).forEach((part, idx) => {
    if (!part) return
    const partKey = `${key}-${idx}`

    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part)
    if (link) {
      nodes.push(
        <a
          key={partKey}
          href={link[2]}
          className="text-ink underline decoration-ink/50 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          {renderInline(link[1], `${partKey}-label`)}
        </a>,
      )
      return
    }

    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      nodes.push(<InlineCode key={partKey}>{part.slice(1, -1)}</InlineCode>)
      return
    }

    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      nodes.push(
        <strong key={partKey} className="font-semibold text-ink">
          {renderInline(part.slice(2, -2), partKey)}
        </strong>,
      )
      return
    }

    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      nodes.push(<em key={partKey}>{part.slice(1, -1)}</em>)
      return
    }

    nodes.push(<span key={partKey}>{part}</span>)
  })

  return nodes
}

function highlightCode(code: string, lang: string): ReactNode {
  const normalizedLang = lang.toLowerCase()

  // Terminal / text status line highlighting (matches user's screenshot)
  if (normalizedLang === "text" || normalizedLang === "plain" || !normalizedLang) {
    if (code.includes("[ PASSED ]") || code.includes("[ FAILED ]") || code.includes("════")) {
      const lines = code.split("\n")
      return lines.map((line, i) => {
        const isLast = i === lines.length - 1
        let lineNode: ReactNode = line

        if (line.includes("[ PASSED ]")) {
          const passIdx = line.indexOf("[ PASSED ]")
          const prefix = line.slice(0, passIdx)
          const greenText = line.slice(passIdx)
          lineNode = (
            <>
              <span>{prefix}</span>
              <span className="text-[#16a34a] dark:text-[#4ade80] font-medium">{greenText}</span>
            </>
          )
        } else if (line.includes("[ FAILED ]")) {
          const failIdx = line.indexOf("[ FAILED ]")
          const prefix = line.slice(0, failIdx)
          const redText = line.slice(failIdx)
          lineNode = (
            <>
              <span>{prefix}</span>
              <span className="text-[#e02424] dark:text-[#f87171] font-medium">{redText}</span>
            </>
          )
        } else if (line.trim().startsWith("═") || line.trim().startsWith("─")) {
          lineNode = <span className="text-muted/50">{line}</span>
        } else if (line.includes("PARAPET INTEGRITY REPORT") || line.includes("RUST VERIFICATION & INTEGRITY AUDIT REPORT")) {
          lineNode = <span className="font-semibold text-ink">{line}</span>
        }

        return (
          <span key={i}>
            {lineNode}
            {!isLast && "\n"}
          </span>
        )
      })
    }
    return code
  }

  const RUST_KW =
    "\\b(?:fn|let|mut|for|in|if|else|return|struct|impl|pub|match|const|type|as|where|use|mod|crate|enum|trait|while|loop|break|continue|async|await)\\b"
  const RUST_TYPES =
    "\\b(?:String|Path|PathBuf|HashMap|HashSet|Sha256|Regex|Vec|Option|Some|None|Result|Ok|Err|bool|usize|u8|u16|u32|u64|i32|i64|str|Self|VerificationReport)\\b"
  const RUST_MACROS = "\\b(?:format|println|eprintln|panic|vec)(?=!)"
  const SQL_KW = "\\b(?:SELECT|FROM|WHERE|INSERT|INTO|UPDATE|DELETE|CREATE|ROLE|DATABASE|OWNER|LOGIN|SHOW|SET|WITH)\\b"
  const HTTP_KW = "\\b(?:Content-Security-Policy|default-src|script-src|style-src|img-src)\\b"

  const regex = new RegExp(
    `(\\/\\/[^\\n]*|#[^\\n]*|"(?:\\\\.|[^"\\\\])*"|'[^']*'|${RUST_KW}|${RUST_TYPES}|${RUST_MACROS}|${SQL_KW}|${HTTP_KW}|\\b\\d+(?:\\.\\d+)?\\b)`,
    "g",
  )

  const parts = code.split(regex)
  return parts.map((part, i) => {
    if (!part) return null
    if (part.startsWith("//") || part.startsWith("#")) {
      return (
        <span key={i} className="text-muted/80 italic">
          {part}
        </span>
      )
    }
    if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
      return (
        <span key={i} className="text-[#057a55] dark:text-[#31c48d]">
          {part}
        </span>
      )
    }
    if (new RegExp(`^(?:${RUST_KW}|${SQL_KW}|${HTTP_KW})$`).test(part)) {
      return (
        <span key={i} className="font-semibold text-[#a03d00] dark:text-[#ff8f5a]">
          {part}
        </span>
      )
    }
    if (new RegExp(`^(${RUST_TYPES})$`).test(part)) {
      return (
        <span key={i} className="font-medium text-[#0284c7] dark:text-[#38bdf8]">
          {part}
        </span>
      )
    }
    if (new RegExp(`^(${RUST_MACROS})$`).test(part)) {
      return (
        <span key={i} className="text-[#9333ea] dark:text-[#c084fc]">
          {part}
        </span>
      )
    }
    if (/^\d+(?:\.\d+)?$/.test(part)) {
      return (
        <span key={i} className="text-[#b45309] dark:text-[#fbbf24]">
          {part}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function CodeBlock({ code, lang }: Readonly<{ code: string; lang: string }>) {
  const { copied, copy } = useCopy(1600)
  const panelRef = useRef<HTMLDivElement>(null)

  const normalizedLang = lang.toLowerCase()
  if (normalizedLang === "pipeline" || (normalizedLang === "diagram" && (code.includes("→") || code.includes("->")))) {
    const steps = code
      .split(/\n/)[0]
      .split(/->|→/)
      .map((s) => s.trim())
      .filter(Boolean)

    return (
      <div className="py-2">
        <div className="flex w-full items-center justify-between gap-1 overflow-hidden rounded-[14px] border border-hairline/60 bg-surface-alt/50 px-2 py-3 min-[390px]:px-3 min-[390px]:py-3.5 sm:gap-2.5 sm:px-5 sm:py-4">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1
            const isParapet = /parapet/i.test(step)
            return (
              <div key={idx} className="flex items-center gap-1 min-[390px]:gap-1.5 sm:gap-2.5">
                <div
                  className={`flex items-center justify-center rounded-[8px] px-2 py-1.5 text-center font-mono text-[10.5px] min-[360px]:text-[11px] min-[390px]:px-2.5 min-[390px]:text-[11.5px] sm:rounded-[10px] sm:px-3.5 sm:py-2 sm:text-[13px] ${
                    isParapet
                      ? "border border-accent/30 bg-accent/15 font-bold text-accent"
                      : "border border-hairline/60 bg-canvas/70 font-medium text-ink"
                  }`}
                >
                  <span>{step}</span>
                </div>
                {!isLast && (
                  <span className="text-[11px] text-muted/60 sm:text-[13px]" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  /**
   * Selecting inside the panel copies the selection: a single line stays a
   * single line, a drag across several copies exactly those. Clipboard writes
   * need a user gesture, which mouseup/keyup provide; a plain click (collapsed
   * caret) or a selection that starts outside the panel is ignored.
   */
  const copySelection = () => {
    const selection = window.getSelection()
    const panel = panelRef.current
    if (!selection || selection.isCollapsed || !panel) return
    if (!panel.contains(selection.anchorNode) || !panel.contains(selection.focusNode)) return

    const text = selection.toString()
    if (!text.trim()) return
    void copy(text)
  }

  return (
    <div className="py-2">
      <div
        ref={panelRef}
        onMouseUp={copySelection}
        onKeyUp={copySelection}
        className="relative overflow-hidden rounded-[14px] bg-surface-alt"
      >
        {lang ? (
          <div className="flex items-center justify-between gap-3 border-b border-hairline/65 px-3.5 py-2 font-mono text-[11px] leading-none font-medium uppercase tracking-[0.04em] text-muted sm:px-4 sm:py-2.5">
            <span>{lang}</span>
            <span
              aria-hidden="true"
              className={`flex items-center gap-1.5 font-text text-[11px] leading-none font-medium normal-case tracking-normal text-ink transition-opacity duration-150 ${copied ? "opacity-100" : "opacity-0"}`}
            >
              <CopySwapIcon copied={copied} width={12} height={12} className="[&_svg]:block" />
              Copied!
            </span>
          </div>
        ) : null}
        <pre className="overflow-x-hidden whitespace-pre-wrap break-words px-3.5 py-3.5 font-mono text-[11px] leading-relaxed tracking-normal text-ink min-[375px]:text-[11.5px] min-[414px]:text-[12px] sm:px-4 sm:py-5 sm:text-[13px]">
          <code>{highlightCode(code, lang)}</code>
        </pre>
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      </div>
    </div>
  )
}

type Item = { text: string; blocks: MdNode[] }

type MdNode =
  | { kind: "para"; text: string }
  | { kind: "heading"; level: number; text: string }
  | { kind: "code"; lang: string; code: string }
  | { kind: "list"; ordered: boolean; items: Item[] }
  | { kind: "quote"; paragraphs: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "image"; src: string; alt: string }

type Block = { kind: "code"; lang: string; code: string } | { kind: "text"; text: string }

function parseBlocks(content: string): Block[] {
  const blocks: Block[] = []
  const fence = /```(\w*)\n([\s\S]*?)```/g
  const pushText = (text: string) => {
    if (text.trim()) blocks.push({ kind: "text", text })
  }

  let cursor = 0
  for (let match = fence.exec(content); match; match = fence.exec(content)) {
    pushText(content.slice(cursor, match.index))
    blocks.push({ kind: "code", lang: match[1], code: match[2].replace(/\n+$/, "") })
    cursor = match.index + match[0].length
  }
  pushText(content.slice(cursor))

  return blocks
}

/* A blockquote is a run of `>` lines; blank `>` lines separate its paragraphs. */
function parseQuote(lines: string[]): string[] {
  const paragraphs: string[] = []
  let current: string[] = []

  for (const line of lines) {
    const text = line.replace(/^>\s?/, "").trim()
    if (!text) {
      if (current.length) {
        paragraphs.push(current.join(" "))
        current = []
      }
      continue
    }
    current.push(text)
  }

  if (current.length) paragraphs.push(current.join(" "))
  return paragraphs
}

function parseRow(line: string) {
  return line
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim())
}

/* The last line of a quote holding a link is its source, not part of it. */
const QUOTE_SOURCE = /\[[^\]]+\]\([^)\s]+\)/

/* A block that is only an image renders as a figure, not a paragraph. */
const IMAGE = /^!\[([^\]]*)\]\(([^)\s]+)\)$/

function parseContent(content: string): MdNode[] {
  const nodes: MdNode[] = []
  let list: { ordered: boolean; items: Item[] } | null = null

  const flushList = () => {
    if (list) nodes.push({ kind: "list", ordered: list.ordered, items: list.items })
    list = null
  }

  for (const block of parseBlocks(content)) {
    if (block.kind === "code") {
      // A fence directly under a list item belongs to that item.
      if (list) list.items[list.items.length - 1].blocks.push(block)
      else nodes.push(block)
      continue
    }

    for (const raw of block.text.split(/\n{2,}/)) {
      const text = raw.trim()
      if (!text) continue

      const indented = /^[ \t]/.test(raw)
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)

      const quoteLines = lines.filter((line) => line.startsWith(">"))
      if (!indented && quoteLines.length > 0 && quoteLines.length === lines.length) {
        flushList()
        nodes.push({ kind: "quote", paragraphs: parseQuote(text.split("\n")) })
        continue
      }

      const heading = indented ? null : /^(#{1,6})\s+([\s\S]+)$/.exec(text)
      if (heading) {
        flushList()
        nodes.push({ kind: "heading", level: heading[1].length, text: heading[2].trim() })
        continue
      }

      const image = indented ? null : IMAGE.exec(text)
      if (image) {
        flushList()
        nodes.push({ kind: "image", src: image[2], alt: image[1] })
        continue
      }

      const separator = lines[1] ?? ""
      const isTable =
        !indented &&
        lines.length >= 3 &&
        lines.every((line) => line.startsWith("|")) &&
        /^\|[\s:|-]+\|$/.test(separator)
      if (isTable) {
        flushList()
        nodes.push({ kind: "table", head: parseRow(lines[0]), rows: lines.slice(2).map(parseRow) })
        continue
      }

      // A chunk of consecutive `1.`…`5.` lines is several items, not one.
      const steps = indented ? [] : lines.map((line) => /^(\d+)\.\s+([\s\S]+)$/.exec(line))
      if (steps.length > 1 && steps.every(Boolean)) {
        const items: Item[] = steps.map((match) => ({ text: match![2], blocks: [] }))
        if (list?.ordered && Number(steps[0]![1]) === list.items.length + 1) {
          list.items.push(...items)
        } else {
          flushList()
          list = { ordered: true, items }
        }
        continue
      }

      const step = indented ? null : /^(\d+)\.\s+([\s\S]+)$/.exec(text)
      if (step) {
        const lead = step[2].replace(/\s*\n\s*/g, " ")
        if (list?.ordered && Number(step[1]) === list.items.length + 1) {
          list.items.push({ text: lead, blocks: [] })
        } else {
          flushList()
          list = { ordered: true, items: [{ text: lead, blocks: [] }] }
        }
        continue
      }

      const bullets = lines.length > 0 && lines.every((line) => line.startsWith("- "))
      if (bullets) {
        const items: Item[] = lines.map((line) => ({ text: line.slice(2), blocks: [] }))
        if (indented && list) {
          list.items[list.items.length - 1].blocks.push({ kind: "list", ordered: false, items })
        } else if (list && !list.ordered) {
          list.items.push(...items)
        } else {
          flushList()
          list = { ordered: false, items }
        }
        continue
      }

      // Indented prose continues the current list item.
      if (indented && list) {
        list.items[list.items.length - 1].blocks.push({ kind: "para", text: lines.join(" ") })
        continue
      }

      flushList()
      nodes.push({ kind: "para", text: lines.join(" ") })
    }
  }

  flushList()
  return nodes
}

function renderNode(node: MdNode, key: string): ReactNode {
  if (node.kind === "para") {
    // A paragraph that is only bold text is a subhead: equal space above and below.
    const isSubhead = /^\*\*[^*]+\*\*$/.test(node.text)
    return (
      <p key={key} className={isSubhead ? "my-6 font-display text-base leading-snug" : undefined}>
        {renderInline(node.text, key)}
      </p>
    )
  }

  if (node.kind === "code") {
    return <CodeBlock key={key} code={node.code} lang={node.lang} />
  }

  if (node.kind === "quote") {
    // A closing line that carries a link is the citation itself.
    const paragraphs = [...node.paragraphs]
    const last = paragraphs[paragraphs.length - 1] ?? ""
    const source = paragraphs.length > 1 && QUOTE_SOURCE.test(last) ? paragraphs.pop() : undefined

    return (
      <blockquote key={key} className="border-l-[3px] border-accent/40 pl-5 sm:pl-6">
        {paragraphs.map((text, i) => (
          <p key={`${key}-p${i}`} className={i > 0 ? "mt-4" : undefined}>
            {renderInline(text, `${key}-p${i}`)}
          </p>
        ))}
        {source ? (
          <footer className="mt-4 font-text text-[13px] leading-relaxed text-muted">
            {renderInline(source, `${key}-source`)}
          </footer>
        ) : null}
      </blockquote>
    )
  }

  if (node.kind === "image") {
    return (
      <figure key={key} className="py-2">
        <img
          src={withAssetHash(node.src)}
          alt={node.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="mx-auto block h-auto w-full select-none rounded-[14px] border border-hairline/60 bg-surface-alt"
        />
      </figure>
    )
  }

  if (node.kind === "heading") {
    if (node.level <= 2) {
      return (
        <h2 key={key} className="mt-8 mb-3 text-[18px] font-semibold tracking-tight text-ink sm:text-[20px]">
          {renderInline(node.text, key)}
        </h2>
      )
    }
    return (
      <h3 key={key} className="mt-7 mb-2.5 text-[16px] font-semibold tracking-tight text-ink sm:text-[17.5px]">
        {renderInline(node.text, key)}
      </h3>
    )
  }

  if (node.kind === "table") {
    const highlightColIndex = node.head.findIndex((cell) => /parapet|rust/i.test(cell))

    return (
      <div key={key} className="my-6 w-full overflow-hidden">
        <table className="w-full table-fixed border-collapse text-left text-[11px] min-[360px]:text-[11.5px] min-[414px]:text-[12.5px] sm:text-[14px]">
          <thead>
            <tr className="border-b border-hairline">
              {node.head.map((cell, i) => {
                const isHighlight = i === highlightColIndex
                const isFirst = i === 0
                return (
                  <th
                    key={`${key}-h${i}`}
                    scope="col"
                    className={`px-2 py-2.5 align-middle font-semibold sm:px-4 sm:py-3.5 ${
                      isFirst ? "text-left w-[28%]" : "text-center w-[24%]"
                    } ${
                      isHighlight
                        ? "bg-accent/15 text-accent font-bold"
                        : "text-ink"
                    }`}
                  >
                    {renderInline(cell, `${key}-h${i}`)}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {node.rows.map((row, r) => (
              <tr key={`${key}-r${r}`} className="border-b border-hairline/60 last:border-b-0">
                {row.map((cell, c) => {
                  const isHighlight = c === highlightColIndex
                  const isFirst = c === 0
                  const match = !isFirst
                    ? /^(.*?)\s*(?:\(([^)]+)\)|<br\s*\/?>\s*(.+))$/i.exec(cell.trim())
                    : null

                  const primary = match ? match[1].trim() : cell
                  const sub = match ? (match[2] ?? match[3]).trim() : null

                  return (
                    <td
                      key={`${key}-r${r}c${c}`}
                      className={`px-1.5 py-2.5 align-middle min-[360px]:px-2 sm:px-4 sm:py-3.5 ${
                        isFirst ? "text-left font-medium text-ink" : "text-center"
                      } ${
                        isHighlight
                          ? "bg-accent/5 dark:bg-accent/10"
                          : ""
                      }`}
                    >
                      {sub ? (
                        <div className="flex flex-col items-center justify-center leading-tight">
                          <span
                            className={
                              isHighlight
                                ? "font-bold text-accent sm:text-[14px]"
                                : "font-semibold text-ink sm:text-[14px]"
                            }
                          >
                            {renderInline(primary, `${key}-r${r}c${c}-p`)}
                          </span>
                          <span className="mt-1 block font-mono text-[9.5px] font-normal leading-tight text-muted/75 min-[360px]:text-[10px] sm:text-[11px] dark:text-muted/70">
                            {renderInline(sub, `${key}-r${r}c${c}-s`)}
                          </span>
                        </div>
                      ) : (
                        <span
                          className={
                            isHighlight
                              ? "font-bold text-accent sm:text-[14px]"
                              : isFirst
                              ? "font-medium text-ink"
                              : "font-medium text-ink/90 sm:text-[13.5px]"
                          }
                        >
                          {renderInline(cell, `${key}-r${r}c${c}`)}
                        </span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const items = node.items.map((item, i) => (
    <li key={`${key}-${i}`} className="[&>*+*]:mt-3">
      {renderInline(item.text, `${key}-${i}`)}
      {item.blocks.map((child, j) => renderNode(child, `${key}-${i}-${j}`))}
    </li>
  ))

  if (node.ordered) {
    return (
      <ol key={key} className="list-decimal space-y-4 pl-5 marker:text-muted">
        {items}
      </ol>
    )
  }

  return (
    <ul key={key} className="list-disc space-y-3 pl-5 marker:text-ink/80">
      {items}
    </ul>
  )
}

export function renderContent(content: string) {
  return parseContent(content).map((node, i) => renderNode(node, `md-${i}`))
}
