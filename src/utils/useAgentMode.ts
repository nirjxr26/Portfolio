import { useEffect, useState } from "react"
import { navigate } from "./useInternalRouter"

const AGENT_EVENT = "agent-mode-change"

function isAgentInUrl(): boolean {
  if (typeof window === "undefined") return false
  const path = window.location.pathname.toLowerCase().replace(/\/$/, "")
  if (path === "/index.md" || path === "/agent.md") return true
  const params = new URLSearchParams(window.location.search)
  return params.get("agent") === "1" || params.get("mode") === "agent"
}

let agentModeGlobal = isAgentInUrl()
const listeners = new Set<(active: boolean) => void>()

function setGlobalAgentMode(active: boolean, pushHistory = true) {
  agentModeGlobal = active
  if (typeof window !== "undefined") {
    const targetPath = active ? "/index.md" : "/"
    const currentPath = window.location.pathname.toLowerCase().replace(/\/$/, "") || "/"

    const url = new URL(window.location.href)
    url.searchParams.delete("agent")
    url.searchParams.delete("mode")
    const search = url.search ? url.search : ""

    if (currentPath !== targetPath) {
      if (pushHistory) {
        window.history.pushState(null, "", targetPath + search)
      } else {
        window.history.replaceState(null, "", targetPath + search)
      }
    } else if (search !== window.location.search) {
      window.history.replaceState(null, "", targetPath + search)
    }

    window.dispatchEvent(new CustomEvent(AGENT_EVENT, { detail: active }))
  }
  listeners.forEach((listener) => listener(active))
}

export function useAgentMode() {
  const [isAgentMode, setIsAgentMode] = useState(agentModeGlobal)

  useEffect(() => {
    const handleUpdate = () => {
      const current = isAgentInUrl()
      agentModeGlobal = current
      setIsAgentMode(current)
      window.dispatchEvent(new CustomEvent(AGENT_EVENT, { detail: current }))
    }

    const handleCustom = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>
      setIsAgentMode(customEvent.detail)
    }

    listeners.add(setIsAgentMode)
    window.addEventListener("popstate", handleUpdate)
    window.addEventListener(AGENT_EVENT, handleCustom)

    return () => {
      listeners.delete(setIsAgentMode)
      window.removeEventListener("popstate", handleUpdate)
      window.removeEventListener(AGENT_EVENT, handleCustom)
    }
  }, [])

  const toggleAgentMode = () => {
    if (typeof window === "undefined") return
    const currentPath = window.location.pathname.toLowerCase().replace(/\/$/, "") || "/"
    const isHome =
      currentPath === "/" ||
      currentPath === "/index.html" ||
      currentPath === "/index.md" ||
      currentPath === "/agent.md"

    if (!isHome) {
      // Navigate directly to /index.md with agent view enabled
      setGlobalAgentMode(true, true)
      navigate("/index.md")
      return
    }

    setGlobalAgentMode(!isAgentMode, true)
  }

  const setAgentMode = (active: boolean) => {
    setGlobalAgentMode(active, true)
  }

  return { isAgentMode, toggleAgentMode, setAgentMode }
}
