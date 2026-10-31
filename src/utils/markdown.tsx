/**
 * Shared article markdown helpers — paragraphs, fenced code blocks,
 * ordered/unordered lists, and inline code / bold / italic / links.
 * Plain content (no markers) renders exactly as before, as <p><span>…</p>.
 */

import { useRef, type ReactNode } from "react"
import { CopySwapIcon } from "../components/common/Icons"
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
          className="text-ink underline decoration-muted/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          {link[1]}
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

function CodeBlock({ code, lang }: Readonly<{ code: string; lang: string }>) {
  const { copied, copy } = useCopy(1600)
  const panelRef = useRef<HTMLDivElement>(null)

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
        className="relative overflow-hidden rounded-[14px] border border-hairline/60 bg-surface-alt"
      >
        {lang ? (
          <div className="flex items-center justify-between gap-3 border-b border-hairline/60 px-4 py-2.5 font-mono text-[11px] leading-none font-medium uppercase tracking-[0.14em] text-muted">
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
        <pre className="whitespace-pre-wrap break-words px-4 py-4 font-mono text-[12.5px] leading-relaxed tracking-normal text-ink sm:py-5 sm:text-[13px]">
          <code>{code}</code>
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
  | { kind: "code"; lang: string; code: string }
  | { kind: "list"; ordered: boolean; items: Item[] }
  | { kind: "quote"; paragraphs: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }

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
    return <p key={key}>{renderInline(node.text, key)}</p>
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
      <blockquote key={key} className="border-l-2 border-accent/40 pl-5 sm:pl-6">
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

  if (node.kind === "table") {
    return (
      <table key={key} className="w-full border-collapse text-left text-[14px]">
        <thead>
          <tr>
            {node.head.map((cell, i) => (
              <th
                key={`${key}-h${i}`}
                scope="col"
                className="border-b border-hairline py-3 pr-5 align-top font-semibold text-ink last:pr-0"
              >
                {renderInline(cell, `${key}-h${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {node.rows.map((row, r) => (
            <tr key={`${key}-r${r}`} className="border-b border-hairline/60">
              {row.map((cell, c) => (
                <td key={`${key}-r${r}c${c}`} className="py-3 pr-5 align-top last:pr-0">
                  {renderInline(cell, `${key}-r${r}c${c}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const items = node.items.map((item, i) => (
    <li key={`${key}-${i}`} className="[&>*+*]:mt-5">
      {renderInline(item.text, `${key}-${i}`)}
      {item.blocks.map((child, j) => renderNode(child, `${key}-${i}-${j}`))}
    </li>
  ))

  if (node.ordered) {
    return (
      <ol key={key} className="list-decimal space-y-7 pl-5 marker:text-muted">
        {items}
      </ol>
    )
  }

  return (
    <ul key={key} className="list-disc space-y-4 pl-5 marker:text-muted">
      {items}
    </ul>
  )
}

export function renderContent(content: string) {
  return parseContent(content).map((node, i) => renderNode(node, `md-${i}`))
}
