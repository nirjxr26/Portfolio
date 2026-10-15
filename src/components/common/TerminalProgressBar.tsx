import { type CSSProperties, type ReactNode } from "react"
import { TERMINAL_PALETTE, lerpColor, type Rgb } from "./terminalTokens"

/** The gradient the filled portion is painted with, from left edge to right. */
const GRADIENT_STOPS: ReadonlyArray<{ at: number; rgb: Rgb }> = [
  { at: 0, rgb: [58, 79, 138] },
  { at: 0.45, rgb: [98, 119, 180] },
  { at: 1, rgb: [163, 181, 255] },
]

const BLOCK = "━"

function gradientAt(t: number): string {
  const upper = t <= GRADIENT_STOPS[1].at ? 1 : 2
  const from = GRADIENT_STOPS[upper - 1]
  const to = GRADIENT_STOPS[upper]
  return lerpColor(from.rgb, to.rgb, (t - from.at) / (to.at - from.at))
}

export interface TerminalProgressBarProps {
  /** 0–1. Fractional, so the leading edge moves continuously. */
  progress: number
  /** Character cells across the track. */
  cells?: number
  /** Rendered after the track, e.g. `2/3`. */
  counter?: string
  /** Glyph used for each cell. Every cell uses the same one so metrics match. */
  block?: string
  trackColor?: string
}

/**
 * A terminal progress bar that fills in place.
 *
 * The whole bar is fixed-width cells of one glyph; only colour changes. Two
 * approaches for the leading cell both fail, which is why this looks the way it
 * does:
 *
 *   - Clipping the cell to its fractional width leaves the hidden remainder in
 *     the inline flow, opening a gap before the track.
 *   - Pulling it back with a negative margin closes that gap but slides the
 *     track and the counter sideways on every frame.
 *
 * So the leading cell keeps its full width and is painted with a hard gradient
 * stop clipped to the glyph itself. Nothing reflows, and there is no gap.
 */
export function TerminalProgressBar({
  progress,
  cells = 24,
  counter = "",
  block = BLOCK,
  trackColor = TERMINAL_PALETTE.dimmest,
}: Readonly<TerminalProgressBarProps>) {
  const exact = progress * cells
  const whole = Math.min(Math.floor(exact), cells)
  const partial = exact - whole

  const rendered: ReactNode[] = []
  for (let j = 0; j < cells; j++) {
    const isFilled = j < whole
    const isPartial = !isFilled && j === whole && partial > 0.001

    // Stable key per cell: moving from empty to filled is a style update, not an
    // unmount/remount. Remounting is what made the leading edge blink.
    const style: CSSProperties = {}

    if (isFilled) {
      style.color = gradientAt(j / Math.max(whole - 1, 1))
    } else if (isPartial) {
      const stop = (partial * 100).toFixed(3)
      const lead = gradientAt(1)
      style.color = "transparent"
      style.backgroundImage = `linear-gradient(90deg, ${lead} 0%, ${lead} ${stop}%, ${trackColor} ${stop}%, ${trackColor} 100%)`
      style.WebkitBackgroundClip = "text"
      style.backgroundClip = "text"
    } else {
      style.color = trackColor
    }

    rendered.push(
      <span key={j} className="inline-block" style={style}>
        {block}
      </span>,
    )
  }

  return (
    <>
      {rendered}
      {counter && (
        <>
          <span>{"  "}</span>
          <span style={{ color: TERMINAL_PALETTE.dim }}>{counter}</span>
        </>
      )}
    </>
  )
}
