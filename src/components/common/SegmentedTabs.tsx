import { useId, useLayoutEffect, useRef, useState } from "react"
import type { KeyboardEvent, ReactNode } from "react"
import { nextTabIndex } from "@/utils/helpers"
import { PREVIEW_FRAME_CLASS, PREVIEW_MAX_WIDTH, PREVIEW_MOBILE_HEIGHT } from "./LayeredPreview"
import { BODY_MUTED_CLASS } from "./textStyles"

export interface SegmentedTab {
  label: string
  desc: ReactNode | string
  /**
   * The tab's visual. Leave it out while one is still being produced and a
   * palette-filled box holds the same space instead.
   */
  preview?: ReactNode
}

/**
 * Reserves the mockup's box while the artwork is being made: the same width,
 * mobile height ladder, rounded panel and frame as `LayeredPreview`, taken from
 * it rather than restated. The inner box carries the console's aspect ratio, so
 * that frame plus the console's own shape reproduces the panel's height exactly
 * instead of approximating it with a second ratio that can drift.
 *
 * The fill is an `--ink` tint rather than a surface token so the box stays
 * visible whichever surface the section landed on — `bg-surface-alt` disappears
 * on a `bg-surface-alt` section, and `bg-card` disappears on a `bg-canvas` one
 * in light mode.
 */
const PLACEHOLDER_CLASS = `w-full ${PREVIEW_MAX_WIDTH} mx-auto rounded-[20px] squircle bg-ink/10 ${PREVIEW_MOBILE_HEIGHT} ${PREVIEW_FRAME_CLASS}`

/**
 * The pill and the counter-shifted label row inside it must animate on the
 * exact same curve, or the inverted labels drift away from the labels
 * underneath them for the length of the slide.
 */
const SLIDE = "transition-[transform,width] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
const SLIDE_COUNTER = "transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"

/** Shape shared by a real button and its inverted twin, so they measure the same. */
const LABEL = "px-4 py-2 text-sm font-medium whitespace-nowrap sm:px-5 sm:text-base"

/**
 * Sequential fade for one layer of a stack — the outgoing layer clears before
 * the incoming one lands, so two descriptions never ghost over each other.
 */
const fadeClass = (isActive: boolean) =>
  `col-start-1 row-start-1 w-full transition-opacity ease-[cubic-bezier(0.16,1,0.3,1)] ${
    isActive
      ? "duration-[350ms] delay-150 opacity-100"
      : "pointer-events-none opacity-0 duration-150"
  }`

/**
 * Opens a description with its first sentence carrying the emphasis. Done here
 * rather than in the copy so every tab of a switcher gets the same treatment
 * and the data stays plain prose. Non-string descriptions pass straight
 * through, since there is nothing to split.
 */
function LeadSentence({ desc }: Readonly<{ desc: ReactNode | string }>) {
  if (typeof desc !== "string") return <>{desc}</>

  const lead = /^[^.!?]*[.!?]/.exec(desc)?.[0]
  if (!lead) return <>{desc}</>

  const rest = desc.slice(lead.length).trim()

  return (
    <>
      <strong className="font-semibold text-ink">{lead}</strong>
      {rest ? ` ${rest}` : null}
    </>
  )
}

/**
 * Segments that swap one preview for another.
 *
 * Selection is a single pill that slides between segments, so the change reads
 * as one control moving rather than two segments blinking.
 *
 * The labels are painted twice: once on the buttons in the resting colour, and
 * again inside the pill in the inverted colour. The pill clips that second copy
 * to its own shape, so a label inverts exactly where the pill is at every frame
 * of the slide. Swapping the labels' colours on a timer instead leaves them
 * unreadable while the pill is halfway across them.
 *
 * The pill group is a real tablist — roving tabindex plus arrow / Home / End
 * keys. Visuals stack in one grid cell and descriptions in another, with the
 * pill group between them; inactive layers are faded rather than unmounted, so
 * the tallest layer sets each height and switching never shifts the page.
 */
export function SegmentedTabs({
  tabs,
  label,
}: Readonly<{ tabs: SegmentedTab[]; label: string }>) {
  const baseId = useId()
  const listRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [pill, setPill] = useState({ left: 0, width: 0 })

  // Measured before paint so the pill never shows a frame at its resting
  // position. The observer keeps it aligned through font swaps and the px-4 →
  // px-5 breakpoint, both of which resize the list without a click.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => {
      const button = list.querySelectorAll<HTMLButtonElement>('[role="tab"]')[active]
      if (!button) return
      const left = button.offsetLeft
      const width = button.offsetWidth
      setPill((prev) => (prev.left === left && prev.width === width ? prev : { left, width }))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [active])

  if (tabs.length === 0) return null

  const moveTo = (index: number) => {
    setActive(index)
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = nextTabIndex(event.key, active, tabs.length)
    if (index === null) return
    event.preventDefault()
    moveTo(index)
  }

  return (
    <div className="w-full">
      <div className="grid w-full">
        {tabs.map((tab, index) => (
          <div
            key={tab.label}
            aria-hidden={index !== active}
            className={fadeClass(index === active)}
          >
            {tab.preview ?? (
              <div className={PLACEHOLDER_CLASS}>
                <div className="hidden w-full sm:block sm:aspect-[851/582]" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        className="relative mx-auto mt-8 flex w-fit items-center gap-1 rounded-full bg-canvas p-1 sm:mt-10"
      >
        {tabs.map((tab, index) => {
          const isActive = index === active

          return (
            <button
              key={tab.label}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={`${LABEL} cursor-pointer rounded-full text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
            >
              {tab.label}
            </button>
          )
        })}

        <span
          aria-hidden="true"
          style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
          className={`pointer-events-none absolute top-1 bottom-1 left-0 overflow-hidden rounded-full bg-ink ${SLIDE}`}
        >
          <span
            style={{ transform: `translateX(${-pill.left}px)` }}
            className={`flex h-full w-max items-center gap-1 px-1 ${SLIDE_COUNTER}`}
          >
            {tabs.map((tab) => (
              <span key={tab.label} className={`${LABEL} text-canvas`}>
                {tab.label}
              </span>
            ))}
          </span>
        </span>
      </div>

      <div className="mt-6 grid w-full sm:mt-8">
        {tabs.map((tab, index) => {
          const isActive = index === active

          return (
            <div
              key={tab.label}
              id={`${baseId}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${index}`}
              aria-hidden={!isActive}
              className={fadeClass(isActive)}
            >
              <p className={`${BODY_MUTED_CLASS} mx-auto max-w-2xl text-center text-pretty`}>
                <LeadSentence desc={tab.desc} />
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
