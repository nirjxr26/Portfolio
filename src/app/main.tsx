import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../styles/index.css"
import { App } from "./App"
import { ErrorBoundary } from "@/components/providers"

if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual"
  }
  window.scrollTo(0, 0)

  if ("serviceWorker" in navigator && import.meta.env.PROD) {
    const register = () => navigator.serviceWorker.register("/sw.js").catch(() => {})
    if (document.readyState === "complete") register()
    else window.addEventListener("load", register, { once: true })
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
