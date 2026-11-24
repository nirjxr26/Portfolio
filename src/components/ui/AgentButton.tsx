import { BotIcon } from "@/components/ui/Icons"
import { useAgentMode } from "@/hooks/useAgentMode"
import { notifySite } from "./NotificationToast"

export function AgentButton({ className = "" }: Readonly<{ className?: string }>) {
  const { isAgentMode, toggleAgentMode } = useAgentMode()

  const handleToggle = () => {
    toggleAgentMode()
    notifySite("Yes, it's done", isAgentMode ? "Exited Agent markdown view" : "Switched to Agent markdown view")
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isAgentMode ? "Exit Agent markdown view" : "Switch to Agent markdown view"}
      aria-pressed={isAgentMode}
      title={isAgentMode ? "Exit Agent markdown view" : "View main site in raw Markdown format"}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all hover:text-ink focus-visible:outline-2 focus-visible:outline-accent active:scale-95 hit-area cursor-pointer ${
        isAgentMode ? "text-accent" : "text-muted"
      } ${className}`.trim()}
    >
      <BotIcon width={17} height={17} />
    </button>
  )
}
