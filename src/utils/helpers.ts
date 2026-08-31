export function externalProps(url: string) {
  if (url.startsWith("http") || url.endsWith(".pdf") || url.includes("/assets/")) {
    return { target: "_blank", rel: "noreferrer" }
  }
  return {}
}
