export function externalProps(url: string) {
  if (url.startsWith("http") || url.endsWith(".pdf") || url.includes("/assets/")) {
    return { target: "_blank", rel: "noreferrer noopener" }
  }
  return {}
}

export function byNewestFirst(a: { date?: string }, b: { date?: string }) {
  const da = a.date ? Date.parse(a.date) : 0
  const db = b.date ? Date.parse(b.date) : 0
  return db - da
}

export function alternateSurfaces(index: number) {
  if (index % 2 === 0) return { section: "bg-surface-alt", card: "bg-card" }
  return { section: "bg-canvas", card: "bg-surface-alt" }
}
