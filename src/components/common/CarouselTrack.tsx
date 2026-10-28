import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "./Icons"

const TRACK_CLASS =
  "carousel-track-container no-scrollbar flex snap-x snap-mandatory overflow-x-auto py-3 gap-4 min-[414px]:gap-5 sm:gap-6"

const CONTROL_CLASS =
  "btn-icon h-11 w-11 cursor-pointer bg-ink/[0.06] text-ink/60 transition-[color,background-color,transform] duration-150 hover:bg-ink/10 hover:text-ink disabled:pointer-events-none disabled:text-ink/25"

const CONTROLS = [
  { label: "Scroll carousel left", direction: -1, icon: ChevronLeft },
  { label: "Scroll carousel right", direction: 1, icon: ChevronRight },
] as const

/**
 * Horizontal rail with round prev/next controls.
 *
 * The buttons only appear when the track actually overflows, and step by one
 * card plus its gap so a card always lands where the last one was. They are
 * measured after mount rather than during render: the rail can be wider than
 * the viewport, and its width is only known once it is in the DOM.
 */
export function CarouselTrack({ children, centered = false }: Readonly<{ children: ReactNode; centered?: boolean }>) {
  const trackRef = useRef<HTMLDivElement>(null)
  const trackId = useId()
  const [overflows, setOverflows] = useState(false)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const syncControls = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth

    setOverflows(max > 1)
    setCanScrollPrev(track.scrollLeft > 1)
    setCanScrollNext(track.scrollLeft < max - 1)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    syncControls()
    track.addEventListener("scroll", syncControls, { passive: true })
    window.addEventListener("resize", syncControls)
    // Cards sized in rem can change width once the webfont arrives.
    void document.fonts?.ready.then(syncControls)

    return () => {
      track.removeEventListener("scroll", syncControls)
      window.removeEventListener("resize", syncControls)
    }
  }, [syncControls])

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return

    const card = track.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const distance = card ? card.offsetWidth + gap : track.clientWidth
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    track.scrollBy({ left: direction * distance, behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <div className="w-full">
      <div
        id={trackId}
        ref={trackRef}
        className={`${TRACK_CLASS} ${centered ? "carousel-track-centered" : ""}`.trim()}
      >
        {children}
      </div>

      {overflows && (
        <div className="page-gutter mt-6 hidden justify-end gap-2 lg:flex">
          {CONTROLS.map(({ label, direction, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={CONTROL_CLASS}
              onClick={() => scrollByCard(direction)}
              disabled={direction < 0 ? !canScrollPrev : !canScrollNext}
              aria-label={label}
              aria-controls={trackId}
            >
              <Icon width={18} height={18} strokeWidth={2.25} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
