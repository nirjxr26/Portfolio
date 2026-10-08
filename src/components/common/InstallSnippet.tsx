import { type ReactNode, useState } from "react"
import type { InstallCommand } from "@/types"
import { useCopy } from "@/utils/useCopy"
import { CheckIcon, CopyIcon } from "./Icons"

interface InstallSnippetProps {
  commands: InstallCommand[]
  className?: string
}

const EXECUTOR_COMMANDS = new Set(["iex", "sh", "bash", "zsh", "cmd", "pwsh"])

function renderCommandTokens(command: string): ReactNode {
  const tokens = command.split(" ")
  let isNextCommand = true

  return (
    <>
      {tokens.map((token, idx) => {
        let tokenElement: ReactNode

        if (token === "|" || token === "&&" || token === "||" || token === ";") {
          isNextCommand = true
          tokenElement = <span className="text-muted">{token}</span>
        } else if (isNextCommand) {
          isNextCommand = false
          const isExecutor = EXECUTOR_COMMANDS.has(token)
          tokenElement = (
            <span
              className={
                isExecutor
                  ? "text-blue-500 dark:text-sky-400 font-semibold"
                  : "text-red-500 dark:text-rose-400 font-semibold"
              }
            >
              {token}
            </span>
          )
        } else if (token.startsWith("-")) {
          tokenElement = <span className="text-amber-600 dark:text-amber-400">{token}</span>
        } else if (token.startsWith("http://") || token.startsWith("https://")) {
          tokenElement = <span className="text-ink dark:text-neutral-100">{token}</span>
        } else {
          tokenElement = <span className="text-ink dark:text-neutral-200">{token}</span>
        }

        return (
          <span key={`${token}-${idx}`}>
            {tokenElement}
            {idx < tokens.length - 1 ? " " : ""}
          </span>
        )
      })}
    </>
  )
}

export function InstallSnippet({
  commands = [],
  className = "",
}: Readonly<InstallSnippetProps>) {
  const [activeTab, setActiveTab] = useState(0)
  const { copied, copy } = useCopy(2000)

  if (!commands || commands.length === 0) return null

  const current = commands[activeTab] ?? commands[0]

  return (
    <div className={`hidden sm:block w-fit max-w-full mx-auto text-left ${className}`.trim()}>
      <div className="w-full max-w-full border border-hairline rounded-[20px] squircle bg-card/60 dark:bg-neutral-900/40 p-2 sm:p-2.5">
        <div className="flex items-center justify-between gap-4 px-2.5 py-1.5 mb-2">
          <div className="flex items-center gap-4 sm:gap-6">
            {commands.map((cmd, idx) => {
              const isActive = activeTab === idx
              return (
                <button
                  type="button"
                  key={cmd.label}
                  onClick={() => {
                    setActiveTab(idx)
                    void copy(cmd.command)
                  }}
                  className={`text-xs sm:text-[13px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "text-ink dark:text-white font-semibold"
                      : "text-muted hover:text-ink dark:hover:text-white"
                  }`}
                  aria-selected={isActive}
                  role="tab"
                  title={`Select and copy ${cmd.label} command`}
                >
                  {cmd.label}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => copy(current.command)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-muted hover:text-ink dark:hover:text-white hover:bg-surface-alt/70 dark:hover:bg-white/5 transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={copied ? "Copied command" : "Copy command to clipboard"}
            title={copied ? "Copied!" : "Copy command"}
          >
            {copied ? (
              <>
                <CheckIcon width={13} height={13} strokeWidth={2.5} className="text-accent" />
                <span className="text-[11px] font-semibold text-accent">Copied</span>
              </>
            ) : (
              <>
                <CopyIcon width={13} height={13} strokeWidth={2} />
                <span className="text-[11px] font-medium hidden min-[360px]:inline">Copy</span>
              </>
            )}
          </button>
        </div>

        <div
          onClick={() => void copy(current.command)}
          className="border border-hairline rounded-[14px] bg-surface-alt/80 dark:bg-[#0c0c0e] px-3.5 py-3 sm:px-4.5 sm:py-3.5 overflow-x-auto no-scrollbar max-w-full cursor-pointer"
          title="Click to copy command"
        >
          <code className="block font-mono text-xs sm:text-[13px] md:text-[13.5px] leading-relaxed whitespace-nowrap select-all tracking-normal cursor-pointer">
            {renderCommandTokens(current.command)}
          </code>
        </div>
      </div>
    </div>
  )
}
