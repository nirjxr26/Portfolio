import { useRef, type ReactNode } from "react"
import { CopySwapIcon } from "@/components/ui/Icons"
import { safeHref, withAssetHash } from "@/lib/helpers"
import { useCopy } from "@/hooks/useCopy"

export interface MarkdownListItem<TNode> {
  text: string
  blocks: TNode[]
}

export type MarkdownAstNode =
  | { kind: "para"; text: string }
  | { kind: "heading"; level: number; text: string }
  | { kind: "code"; lang: string; code: string }
  | { kind: "quote"; paragraphs: string[] }
  | { kind: "image"; src: string; alt: string }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "list"; ordered: boolean; items: MarkdownListItem<MarkdownAstNode>[] }

const QUOTE_SOURCE = /\[[^\]]+\]\([^)\s]+\)/

export function InlineCode({ children }: Readonly<{ children: string }>) {
  return (
    <code className="rounded-[6px] bg-surface-alt px-1.5 py-0.5 font-mono text-[0.875em] font-medium tracking-normal text-ink">
      {children}
    </code>
  )
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function matchLinkAt(text: string, start: number): { label: string; url: string; next: number } | null {
  if (text[start] !== "[") return null
  const closeBracket = text.indexOf("]", start + 1)
  if (closeBracket <= start + 1 || text[closeBracket + 1] !== "(") return null
  const urlStart = closeBracket + 2
  let urlEnd = urlStart
  while (urlEnd < text.length && text[urlEnd] !== ")" && !/\s/.test(text[urlEnd])) {
    urlEnd += 1
  }
  if (urlEnd === urlStart || text[urlEnd] !== ")") return null
  return {
    label: text.slice(start + 1, closeBracket),
    url: text.slice(urlStart, urlEnd),
    next: urlEnd + 1,
  }
}

export function renderInline(text: string, key: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let cursor = 0
  let plainStart = 0
  let tokenIdx = 0

  const flushPlain = (end: number) => {
    if (end > plainStart) {
      nodes.push(<span key={`${key}-${tokenIdx++}`}>{text.slice(plainStart, end)}</span>)
    }
  }

  while (cursor < text.length) {
    const ch = text[cursor]

    if (ch === "[") {
      const link = matchLinkAt(text, cursor)
      if (link) {
        flushPlain(cursor)
        const partKey = `${key}-${tokenIdx++}`
        const href = safeHref(link.url)
        if (href) {
          nodes.push(
            <a
              key={partKey}
              href={href}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-ink underline decoration-ink/50 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {renderInline(link.label, `${partKey}-label`)}
            </a>,
          )
        } else {
          nodes.push(<span key={partKey}>{link.label}</span>)
        }
        cursor = link.next
        plainStart = cursor
        continue
      }
    } else if (ch === "`") {
      const close = text.indexOf("`", cursor + 1)
      if (close > cursor + 1) {
        flushPlain(cursor)
        nodes.push(<InlineCode key={`${key}-${tokenIdx++}`}>{text.slice(cursor + 1, close)}</InlineCode>)
        cursor = close + 1
        plainStart = cursor
        continue
      }
    } else if (ch === "*" && text[cursor + 1] === "*") {
      const close = text.indexOf("**", cursor + 2)
      if (close > cursor + 2) {
        flushPlain(cursor)
        const partKey = `${key}-${tokenIdx++}`
        nodes.push(
          <strong key={partKey} className="font-semibold text-ink">
            {renderInline(text.slice(cursor + 2, close), partKey)}
          </strong>,
        )
        cursor = close + 2
        plainStart = cursor
        continue
      }
    } else if (ch === "*") {
      const close = text.indexOf("*", cursor + 1)
      const newline = text.indexOf("\n", cursor + 1)
      if (close > cursor + 1 && (newline === -1 || close < newline)) {
        flushPlain(cursor)
        nodes.push(<em key={`${key}-${tokenIdx++}`}>{text.slice(cursor + 1, close)}</em>)
        cursor = close + 1
        plainStart = cursor
        continue
      }
    }

    cursor += 1
  }

  flushPlain(text.length)
  return nodes
}

export function isPipelineBlock(code: string, lang: string): boolean {
  const normalizedLang = lang.toLowerCase()
  return (
    normalizedLang === "pipeline" ||
    (normalizedLang === "diagram" && (code.includes("→") || code.includes("->")))
  )
}

export function PipelineDiagram({ code }: Readonly<{ code: string }>) {
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

export function CodeBlockShell({
  code,
  lang,
  children,
}: Readonly<{ code: string; lang: string; children: ReactNode }>) {
  const { copied, copy } = useCopy(1600)
  const panelRef = useRef<HTMLDivElement>(null)

  if (isPipelineBlock(code, lang)) {
    return <PipelineDiagram code={code} />
  }

  const copySelection = () => {
    const selection = window.getSelection()
    const panel = panelRef.current
    if (!selection || selection.isCollapsed || !panel) return
    if (!panel.contains(selection.anchorNode) || !panel.contains(selection.focusNode)) return
    const text = selection.toString()
    if (text.trim()) void copy(text)
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
            <button
              type="button"
              onClick={() => void copy(code)}
              className="flex items-center gap-1.5 font-text text-[11px] leading-none font-medium normal-case tracking-normal text-muted hover:text-ink transition-colors cursor-pointer hit-area select-none"
              aria-label={copied ? "Code copied to clipboard" : `Copy ${lang} code`}
              title={copied ? "Copied!" : "Copy code"}
            >
              <CopySwapIcon copied={copied} width={12} height={12} className="[&_svg]:block text-ink" />
              <span className={copied ? "text-accent font-semibold" : ""}>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        ) : (
          <div className="absolute top-2.5 right-3 z-10">
            <button
              type="button"
              onClick={() => void copy(code)}
              className="flex items-center gap-1.5 rounded-md bg-canvas/80 px-2 py-1 font-text text-[11px] leading-none font-medium normal-case tracking-normal text-muted hover:text-ink transition-colors cursor-pointer select-none border border-hairline/60 hit-area backdrop-blur-sm"
              aria-label={copied ? "Code copied to clipboard" : "Copy code"}
              title={copied ? "Copied!" : "Copy code"}
            >
              <CopySwapIcon copied={copied} width={12} height={12} className="[&_svg]:block text-ink" />
              <span className={copied ? "text-accent font-semibold" : ""}>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        )}
        <pre className="overflow-x-hidden whitespace-pre-wrap break-words px-3.5 py-3.5 font-mono text-[11px] leading-relaxed tracking-normal text-ink min-[375px]:text-[11.5px] min-[414px]:text-[12px] sm:px-4 sm:py-5 sm:text-[13px]">
          <code>{children}</code>
        </pre>
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      </div>
    </div>
  )
}

export function renderMarkdownNode<TNode extends MarkdownAstNode>(
  node: TNode,
  key: string,
  renderCode: (node: Extract<TNode, { kind: "code" }>, key: string) => ReactNode,
): ReactNode {
  if (node.kind === "para") {
    const isSubhead = /^\*\*[^*]+\*\*$/.test(node.text)
    return (
      <p key={key} className={isSubhead ? "my-6 font-display text-base leading-snug" : undefined}>
        {renderInline(node.text, key)}
      </p>
    )
  }

  if (node.kind === "code") {
    return renderCode(node as Extract<TNode, { kind: "code" }>, key)
  }

  if (node.kind === "quote") {
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
        <h2 key={key} className="mt-8 mb-3 text-[18px] font-semibold tracking-normal text-ink sm:text-[20px]">
          {renderInline(node.text, key)}
        </h2>
      )
    }
    return (
      <h3 key={key} className="mt-7 mb-2.5 text-[16px] font-semibold tracking-normal text-ink sm:text-[17.5px]">
        {renderInline(node.text, key)}
      </h3>
    )
  }

  if (node.kind === "table") {
    const isComparison = node.head.length === 2
    if (isComparison) {
      return (
        <div key={key} className="my-6 sm:my-8 w-full overflow-x-auto rounded-xl border border-hairline/60">
          <table className="w-full table-fixed border-collapse text-left text-[13px] min-[360px]:text-[13.5px] sm:text-[14.5px] md:text-[15px]">
            <thead className="bg-surface-alt">
              <tr className="border-b border-hairline/60">
                {node.head.map((cell, i) => (
                  <th
                    key={`${key}-h${i}`}
                    scope="col"
                    className={`w-1/2 px-4 py-3.5 sm:px-6 sm:py-4 align-middle font-semibold text-ink text-left ${
                      i === 0 ? "border-r border-hairline/60" : ""
                    }`}
                  >
                    {renderInline(cell, `${key}-h${i}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {node.rows.map((row, r) => (
                <tr key={`${key}-r${r}`} className="border-b border-hairline/60 last:border-b-0">
                  {row.map((cell, c) => (
                    <td
                      key={`${key}-r${r}c${c}`}
                      className={`w-1/2 px-4 py-3.5 sm:px-6 sm:py-4 align-middle text-left font-normal text-ink leading-relaxed ${
                        c === 0 ? "border-r border-hairline/60" : ""
                      }`}
                    >
                      {renderInline(cell, `${key}-r${r}c${c}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

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
                    } ${isHighlight ? "bg-accent/15 text-accent font-bold" : "text-ink"}`}
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
                      } ${isHighlight ? "bg-accent/5 dark:bg-accent/10" : ""}`}
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
      {item.blocks.map((child, j) => renderMarkdownNode(child as TNode, `${key}-${i}-${j}`, renderCode))}
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
