/**
 * Shared article markdown helpers — paragraphs, fenced code blocks,
 * ordered/unordered lists, and inline code / bold / italic / links.
 * Plain content (no markers) renders exactly as before, as <p><span>…</p>.
 */

import type { ReactNode } from "react"

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
  return (
    <div className="py-2">
      <div className="overflow-hidden rounded-[14px] border border-hairline bg-surface-alt">
        {lang ? (
          <div className="border-b border-hairline px-4 py-2.5 font-mono text-[11px] leading-none font-medium uppercase tracking-[0.14em] text-muted">
            {lang}
          </div>
        ) : null}
        <pre className="whitespace-pre-wrap break-words px-4 py-4 font-mono text-[12.5px] leading-relaxed tracking-normal text-ink sm:py-5 sm:text-[13px]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

type Item = { text: string; blocks: MdNode[] }

type MdNode =
  | { kind: "para"; text: string }
  | { kind: "code"; lang: string; code: string }
  | { kind: "list"; ordered: boolean; items: Item[] }

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
