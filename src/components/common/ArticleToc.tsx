import { useEffect, useRef, useState } from "react"

export interface ArticleTocEntry {
  id: string
  title: string
}

type Direction = "forward" | "back"

/** Keeps the direction tick even when the reader jumps past several sections. */
function nextDirection(prevIndex: number, nextIndex: number): Direction {
  return nextIndex >= prevIndex ? "forward" : "back"
}

/**
 * "On this page" rail.
 *
 * A vertical rail with one tick per section. The tick for the section currently
 * in view widens and takes the accent colour; the rest stay short and dimmed.
 *
 * The tick wipes in from the side the reader is travelling from — growing
 * left-to-right when moving down the page, right-to-left when moving back up —
 * so the motion reads as the marker advancing rather than simply switching.
 *
 * Active-section tracking is done with an IntersectionObserver rather than a
 * scroll listener, so it costs nothing per scroll frame.
 */
export function ArticleToc({
  entries,
  className = "",
}: Readonly<{ entries: ArticleTocEntry[]; className?: string }>) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null)
  const [direction, setDirection] = useState<Direction>("forward")
  const activeRef = useRef<string | null>(null)

  useEffect(() => {
    if (entries.length === 0) return

    const nodes = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((node): node is HTMLElement => node !== null)

    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (observed) => {
        // Only the topmost intersecting section is "current", so scrolling
        // upward moves the marker back rather than getting stuck on whichever
        // section happens to have the largest intersection.
        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        const nextId = visible[0]?.target.id ?? activeRef.current
        if (!nextId || nextId === activeRef.current) return

        const prevIndex = entries.findIndex((entry) => entry.id === activeRef.current)
        const nextIndex = entries.findIndex((entry) => entry.id === nextId)
        if (nextIndex === -1) return

        activeRef.current = nextId
        if (prevIndex !== -1) setDirection(nextDirection(prevIndex, nextIndex))
        setActiveId(nextId)
      },
      {
        // Bias the viewport band toward the top of the screen: a section
        // becomes current once its heading clears the sticky header, rather
        // than when it is already halfway down.
        rootMargin: "-120px 0px -70% 0px",
        threshold: 0,
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [entries])

  if (entries.length === 0) return null

  return (
    <nav aria-label="On this page" className={className}>
      <ol className="relative m-0 list-none p-0">
        {/* The rail sits behind every tick, so it is drawn first. */}
        <span aria-hidden="true" className="absolute inset-y-2 left-0 w-px bg-hairline" />

        {entries.map((entry) => {
          const isActive = entry.id === activeId

          return (
            <li key={entry.id} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-[0.82em] block h-[2px] rounded-full transition-[left,width,background-color] duration-300 ease-out ${
                  isActive
                    ? "-left-[5px] w-[22px] bg-accent toc-tick-forward"
                    : "left-0 w-[13px] bg-hairline"
                } ${isActive && direction === "back" ? "toc-tick-back" : ""}`}
                style={{
                  transformOrigin: isActive && direction === "back" ? "right center" : "left center",
                }}
              />

              <a
                href={`#${entry.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`relative block py-2.5 pl-10 pr-1 text-[0.9375rem] leading-snug transition-colors duration-200 ${
                  isActive ? "font-semibold text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {entry.title}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}