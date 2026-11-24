export function toPlainText(node: unknown): string {
  if (node === null || node === undefined || typeof node === "boolean") return ""
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(toPlainText).join("")
  if (typeof node === "object" && node !== null && "props" in node) {
    const props = (node as { props?: { children?: unknown } }).props
    if (props?.children) return toPlainText(props.children)
  }
  return ""
}
