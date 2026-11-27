import { navigate, useInternalUrl } from "@/app/router/useInternalRouter"

function isAgentPath(path: string): boolean {
  const clean = path.toLowerCase().replace(/\/$/, "")
  return clean === "/index.md" || clean === "/agent.md"
}

export function useAgentMode() {
  const url = useInternalUrl()
  const [path, query = ""] = url.split("?")
  const params = new URLSearchParams(query)
  const isAgentMode = isAgentPath(path) || params.get("agent") === "1" || params.get("mode") === "agent"

  const toggleAgentMode = () => {
    navigate(isAgentMode ? "/" : "/index.md")
  }

  const setAgentMode = (active: boolean) => {
    navigate(active ? "/index.md" : "/")
  }

  return { isAgentMode, toggleAgentMode, setAgentMode }
}
