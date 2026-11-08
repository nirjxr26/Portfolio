import { navigate, useInternalRouter } from "./useInternalRouter"

function isAgentPath(path: string): boolean {
  const clean = path.toLowerCase().replace(/\/$/, "")
  return clean === "/index.md" || clean === "/agent.md"
}

function hasAgentQuery(): boolean {
  if (typeof window === "undefined") return false
  const params = new URLSearchParams(window.location.search)
  return params.get("agent") === "1" || params.get("mode") === "agent"
}

export function useAgentMode() {
  const pathname = useInternalRouter()
  const isAgentMode = isAgentPath(pathname) || hasAgentQuery()

  const toggleAgentMode = () => {
    if (isAgentMode) {
      navigate("/")
    } else {
      navigate("/index.md")
    }
  }

  const setAgentMode = (active: boolean) => {
    if (active) {
      navigate("/index.md")
    } else {
      navigate("/")
    }
  }

  return { isAgentMode, toggleAgentMode, setAgentMode }
}

