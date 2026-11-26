/**
 * Shared article markdown helpers — paragraphs, fenced code blocks,
 * ordered/unordered lists, and inline code / bold / italic / links.
 * Plain content (no markers) renders exactly as before, as <p><span>…</p>.
 */

import type { ReactNode } from "react"
import {
  CodeBlockShell,
  InlineCode,
  renderInline,
  renderMarkdownNode,
  slugify,
  type MarkdownAstNode,
  type MarkdownListItem,
} from "@/lib/markdownNodes"

export { InlineCode, renderInline, slugify }

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
  return (
    <CodeBlockShell code={code} lang={lang}>
      {highlightCode(code, lang)}
    </CodeBlockShell>
  )
}

type Item = MarkdownListItem<MdNode>
type MdNode = MarkdownAstNode

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

export function renderContent(content: string) {
  return parseContent(content).map((node, i) =>
    renderMarkdownNode(node, `md-${i}`, (codeNode, codeKey) => (
      <CodeBlock key={codeKey} code={codeNode.code} lang={codeNode.lang} />
    )),
  )
}
