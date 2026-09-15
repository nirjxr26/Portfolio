/**
 * Shared article markdown helpers — extracted verbatim from ArticleDetailLayout
 * so detail pages + future renderers share one implementation. 0 UI change.
 */

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

export function renderContent(content: string) {
  const paragraphs = content.split("\n\n")
  return paragraphs.map((para, pi) => {
    const parts = para.split(/(`[^`]+`)/g)
    return (
      <p key={pi}>
        {parts.map((part, idx) => {
          if (part.startsWith("`") && part.endsWith("`")) {
            const inner = part.slice(1, -1)
            return <InlineCode key={idx}>{inner}</InlineCode>
          }
          return <span key={idx}>{part}</span>
        })}
      </p>
    )
  })
}
