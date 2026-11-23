import { describe, expect, it } from "vitest"
import { InlineCode, renderContent, slugify } from "./markdown"

type PropsBox = { props: { children: unknown } }
type TypedBox = { type: unknown }

function childElements(result: ReturnType<typeof renderContent>) {
  const first = result[0] as unknown as PropsBox
  return first.props.children as unknown[]
}

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Hello World")).toBe("hello-world")
  })

  it("collapses separators and trims edge dashes", () => {
    expect(slugify("  A -- B!! ")).toBe("a-b")
  })
})

describe("renderContent", () => {
  it("splits blank-line-separated paragraphs", () => {
    const result = renderContent("one\n\ntwo")
    expect(result).toHaveLength(2)
    for (const el of result) {
      expect((el as unknown as TypedBox).type).toBe("p")
    }
  })

  it("wraps backtick spans in InlineCode", () => {
    const kids = childElements(renderContent("use `vite build` here"))
    const code = kids.find((k) => (k as unknown as TypedBox).type === InlineCode)
    expect(code).toBeDefined()
    expect((code as unknown as PropsBox).props.children).toBe("vite build")
  })

  it("leaves plain text as spans", () => {
    const kids = childElements(renderContent("plain text"))
    expect(kids).toHaveLength(1)
    expect((kids[0] as unknown as TypedBox).type).toBe("span")
  })

  it("extracts fenced code blocks with their language", () => {
    const result = renderContent("intro\n\n```bash\nnpm test\n```\n\noutro")
    expect(result).toHaveLength(3)
    const code = result[1] as unknown as { props: { lang: string; code: string } }
    expect(code.props.lang).toBe("bash")
    expect(code.props.code).toBe("npm test")
  })

  it("groups numbered steps into one ordered list", () => {
    const result = renderContent("1. first\n\n2. second")
    expect(result).toHaveLength(1)
    expect((result[0] as unknown as TypedBox).type).toBe("ol")
  })

  it("splits consecutive numbered lines into separate items", () => {
    const result = renderContent("1. first\n2. second\n3. third")
    expect(result).toHaveLength(1)
    const list = result[0] as unknown as { type: string; props: { children: unknown[] } }
    expect(list.type).toBe("ol")
    expect(list.props.children).toHaveLength(3)
  })

  it("keeps a fenced block inside the step it belongs to", () => {
    const result = renderContent("1. run it:\n\n```bash\nls\n```\n\n   then continue")
    expect(result).toHaveLength(1)
    const list = result[0] as unknown as { type: string; props: { children: unknown[] } }
    expect(list.type).toBe("ol")
    expect(list.props.children).toHaveLength(1)
  })

  it("renders bullet lines as an unordered list", () => {
    const result = renderContent("- one\n- two")
    expect(result).toHaveLength(1)
    expect((result[0] as unknown as TypedBox).type).toBe("ul")
  })

  it("renders a pipe table", () => {
    const result = renderContent("| A | B |\n| --- | --- |\n| 1 | 2 |")
    expect(result).toHaveLength(1)
    const el = result[0] as unknown as { type: string; props?: { children?: { type: string } } }
    expect(el.type === "table" || el.props?.children?.type === "table").toBe(true)
  })

  it("renders a 2-column comparison table with border dividers", () => {
    const result = renderContent("| Col 1 | Col 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |")
    expect(result).toHaveLength(1)
    const container = result[0] as unknown as { type: string; props: { className: string; children: { type: string; props: { className: string } } } }
    expect(container.type).toBe("div")
    expect(container.props.className).toContain("border-hairline")
    expect(container.props.children.type).toBe("table")
    expect(container.props.children.props.className).toContain("table-fixed")
  })

  it("renders a standalone image as a figure", () => {
    const result = renderContent("![A paper](/assets/article/question-paper-a4.svg)")
    expect(result).toHaveLength(1)
    expect((result[0] as unknown as TypedBox).type).toBe("figure")
  })

  it("renders markdown headings as h2 or h3", () => {
    const result = renderContent("### Subheading")
    expect(result).toHaveLength(1)
    expect((result[0] as unknown as TypedBox).type).toBe("h3")
  })

  it("lifts a linked closing line out of a quote into a footer", () => {
    const result = renderContent("> body\n>\n> [Source](https://example.com)")
    expect(result).toHaveLength(1)
    const quote = result[0] as unknown as { type: string; props: { children: unknown[] } }
    expect(quote.type).toBe("blockquote")
    expect((quote.props.children[1] as unknown as TypedBox).type).toBe("footer")
  })
})

describe("generateHomeMarkdown", () => {
  it("does not include works list in footer and renders the text website tree instead of SVGs", async () => {
    const { generateHomeMarkdown } = await import("@/data/homeMarkdown")
    const md = generateHomeMarkdown()

    // Under Footer & Connect, Works list must be removed
    const footerSection = md.split("## Footer & Connect")[1]
    expect(footerSection).toBeDefined()
    expect(footerSection).not.toContain("### Works")
    expect(footerSection).not.toContain("- **Trace** (Digital Forensics & Incident Response)")

    // Website Tree text tree must be present, SVGs removed
    expect(footerSection).toContain("### Website Tree")
    expect(footerSection).not.toContain("sitemap_white.svg")
    expect(footerSection).not.toContain("sitemap_black.svg")
    expect(footerSection).toContain("nirjar.me/")
    expect(footerSection).not.toContain("github.com/nirjxr26/")

    // Articles section format check
    expect(md).toContain("## Articles.\n\n### Why I Switched to Zed IDE")
    expect(md).toContain("- **Read Time**: 4 min read\n- **Date**: Nov 17, 2026\n- **Category**: Practice")
    expect(md).toContain("### Parapet: A 100ms Rust Site Checker")
    expect(md).toContain("- **Read Time**: 5 min read\n- **Date**: Nov 12, 2026\n- **Category**: Security")
    expect(md).toContain("### Coding Is Taught Wrong, and AI Exposed It")
    expect(md).toContain("- **Read Time**: 9 min read\n- **Date**: Oct 31, 2026\n- **Category**: Artificial Intelligence")
    expect(md).toContain("[View other articles](https://nirjar.me/articles)")
  })
})
