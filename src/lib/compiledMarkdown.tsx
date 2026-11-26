import {
  CodeBlockShell,
  renderInline,
  renderMarkdownNode,
  slugify,
  type MarkdownListItem,
} from "@/lib/markdownNodes"

export { renderInline, slugify }

export type CompiledCodeTokenKind =
  | "plain"
  | "comment"
  | "string"
  | "keyword"
  | "control"
  | "type"
  | "function"
  | "macro"
  | "ident"
  | "number"
  | "pass"
  | "fail"
  | "rule"
  | "title"

export interface CompiledCodeToken {
  k: CompiledCodeTokenKind
  t: string
}

export type CompiledNode =
  | { kind: "para"; text: string }
  | { kind: "heading"; level: number; text: string }
  | { kind: "code"; lang: string; code: string; tokens: CompiledCodeToken[] }
  | { kind: "quote"; paragraphs: string[] }
  | { kind: "image"; src: string; alt: string }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "list"; ordered: boolean; items: MarkdownListItem<CompiledNode>[] }

export interface CompiledSection {
  subtitle: string
  blocks: CompiledNode[]
}

export interface CompiledArticle {
  sections: CompiledSection[]
}

const TOKEN_CLASSES: Record<CompiledCodeTokenKind, string | undefined> = {
  plain: undefined,
  comment: "text-[#008000] dark:text-[#6a9955] italic",
  string: "text-[#a31515] dark:text-[#ce9178]",
  keyword: "text-[#b83b1d] dark:text-[#ff7b72]",
  control: "text-[#b83b1d] dark:text-[#ff7b72]",
  type: "text-[#267f99] dark:text-[#4ec9b0]",
  function: "text-[#795e26] dark:text-[#dcdcaa]",
  macro: "text-[#795e26] dark:text-[#dcdcaa]",
  ident: "text-[#001080] dark:text-[#9cdcfe]",
  number: "text-[#098658] dark:text-[#b5cea8]",
  pass: "text-[#16a34a] dark:text-[#4ade80] font-medium",
  fail: "text-[#e02424] dark:text-[#f87171] font-medium",
  rule: "text-muted/50",
  title: "font-semibold text-ink",
}

export function renderCompiledNode(node: CompiledNode, key: string) {
  return renderMarkdownNode(node, key, (codeNode, codeKey) => (
    <CodeBlockShell key={codeKey} code={codeNode.code} lang={codeNode.lang}>
      {codeNode.tokens.map((tok, idx) => {
        const cls = TOKEN_CLASSES[tok.k]
        return cls ? (
          <span key={idx} className={cls}>
            {tok.t}
          </span>
        ) : (
          tok.t
        )
      })}
    </CodeBlockShell>
  ))
}

export function extractCompiledSectionText(section: CompiledSection): string {
  const parts: string[] = []
  if (section.subtitle) parts.push(section.subtitle)

  const walk = (node: CompiledNode) => {
    if (node.kind === "para" || node.kind === "heading") parts.push(node.text)
    else if (node.kind === "code") parts.push(node.code)
    else if (node.kind === "quote") parts.push(node.paragraphs.join(" "))
    else if (node.kind === "table") {
      parts.push(node.head.join(" | "))
      node.rows.forEach((r) => parts.push(r.join(" | ")))
    } else if (node.kind === "list") {
      node.items.forEach((it) => {
        parts.push(it.text)
        it.blocks.forEach(walk)
      })
    }
  }
  section.blocks.forEach(walk)
  return parts.join("\n")
}
