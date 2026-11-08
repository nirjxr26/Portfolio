import { BotIcon } from "./Icons"
import { useAgentMode } from "@/utils/useAgentMode"

export function AgentButton({ className = "" }: Readonly<{ className?: string }>) {
  const { isAgentMode, toggleAgentMode } = useAgentMode()

  return (
    <button
      type="button"
      onClick={toggleAgentMode}
      aria-label={isAgentMode ? "Exit Agent markdown view" : "Switch to Agent markdown view"}
      aria-pressed={isAgentMode}
      title={isAgentMode ? "Exit Agent markdown view" : "View main site in raw Markdown format"}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-surface-alt hover:text-ink focus-visible:outline-2 focus-visible:outline-accent active:scale-95 hit-area ${
        isAgentMode ? "text-accent bg-accent/15" : "text-muted"
      } ${className}`.trim()}
    >
      <BotIcon width={17} height={17} />
    </button>
  )
}
