import { type CSSProperties } from "react"
import { TerminalProgressBar } from "./TerminalProgressBar"
import {
  TERMINAL_PALETTE,
  TERMINAL_RGB,
  lerpColor,
  spinnerAt,
} from "./terminalTokens"
import { useLoopingTimeline } from "@/utils/useLoopingTimeline"
import { typedCount } from "@/utils/typewriter"
import { withAssetHash } from "@/utils/helpers"

/**
 * Browser port of the `trace update` CLI animation.
 *
 * The animation is driven by a `script` — timings and copy as data — so this
 * component renders any terminal playback rather than one hardcoded run. The
 * Trace script is the default; `TRACE_UPDATE_SCRIPT` is exported for reuse.
 *
 * The invariants that carry the design are enforced structurally rather than by
 * convention:
 *   - the frame renders a fixed number of equal rows, so the block height cannot
 *     shift as stages swap
 *   - the frame is a pure function of elapsed ms (no state accumulates per tick)
 *   - bar progress is a float and the leading cell is painted to that fraction,
 *     so the fill is continuous rather than stepping one whole cell at a time
 *
 * Timing comes from `useLoopingTimeline`, which holds the clock while the card
 * is off-screen and rebases it on entry.
 *
 * The card is a fixed 68ch viewport — wider than the longest row, the updating
 * title — so it does not resize as stages swap. `ch` tracks the monospace
 * advance, so the width scales with the responsive font size instead of needing
 * a breakpoint per size. It sits centred on a painting, which is atmosphere
 * rather than chrome, so the terminal keeps its own solid surface.
 *
 * This deliberately does not gate on `prefers-reduced-motion`. The motion is a
 * short text block with an in-place glyph and a filling bar — no translation,
 * scaling or parallax — and this card is the showcase for the feature, so
 * visitors with reduced motion enabled still see it.
 */

type StatusMode = "spinner" | "plain" | "fading" | "ready"

export interface TerminalBeat {
  message: string
  durationMs: number
  statusMode?: StatusMode
}

export interface TerminalScript {
  /** Typed in character by character before the run begins. */
  command: string
  /** Characters from this index on render dimmed, e.g. the `--yes` flag. */
  commandDimFrom: number
  typingMs: number
  /** The title row. Versions render in the accent colour. */
  title: {
    running: { lead: string; from: string; to: string }
    done: { lead: string; to: string }
  }
  /** Runs on the title row, before the bar appears. */
  leadIn: TerminalBeat
  /** Bar-driving steps. Progress spans these evenly. */
  steps: readonly TerminalBeat[]
  /** Beats after the bar lands full. */
  tail: readonly TerminalBeat[]
  /** Revealed once `completionDelayMs` has elapsed after the tail. */
  completion: string
  /** Delay from the end of the tail to the completion line, and its fade-in. */
  completionDelayMs: number
  completionFadeMs: number
  /** Held at the end so the last frame is readable before looping. */
  holdMs: number
}

export const TRACE_UPDATE_SCRIPT: TerminalScript = {
  command: "> trace update --yes",
  commandDimFrom: 16,
  typingMs: 2400,
  title: {
    running: { lead: "Trace is updating from ", from: "0.3.1", to: "0.3.2" },
    done: { lead: "Trace updated to ", to: "0.3.2" },
  },
  leadIn: { message: "Checking for updates...", durationMs: 1500 },
  steps: [
    { message: "Downloading release package", durationMs: 3200 },
    { message: "Verifying package integrity", durationMs: 2300 },
    { message: "Installing update", durationMs: 2300 },
  ],
  tail: [
    { message: "Update Installed", durationMs: 1000, statusMode: "plain" },
    { message: "Loading Trace", durationMs: 2500, statusMode: "spinner" },
  ],
  completion: "Restart to view changes !!!",
  completionDelayMs: 0,
  completionFadeMs: 450,
  holdMs: 2600,
}

const LINE_COUNT = 7
const ROW_H = 24
const BACKDROP_SRC = "/assets/trace/update_animation_bg.jpg"

interface Phase {
  /** Characters of the command revealed so far. */
  typed: number
  typing: boolean
  message: string
  /** Which row the message occupies: the title line during the lead-in, the
   *  status line once the steps are under way. */
  messageRow: "title" | "status"
  showTitle: boolean
  showCompletion: boolean
  showBar: boolean
  counter: string
  statusMode: StatusMode
  fade: number
  /** 0–1, fractional so the bar fill is continuous. */
  progress: number
}

/**
 * Expands a script into absolute boundaries once, so `resolvePhase` stays a
 * cheap lookup rather than re-summing durations on every frame.
 */
function compile(script: TerminalScript) {
  let at = 0
  const leadIn = { start: at, end: (at += script.leadIn.durationMs) }

  const steps = script.steps.map((beat) => {
    const span = { start: at, end: at + beat.durationMs }
    at = span.end
    return { ...beat, ...span }
  })

  const tail = script.tail.map((beat) => {
    const span = { start: at, end: at + beat.durationMs }
    at = span.end
    return { ...beat, ...span }
  })

  const runMs =
    at + script.completionDelayMs + script.completionFadeMs + script.holdMs

  return {
    leadIn,
    steps,
    tail,
    runEnd: at,
    fadeStart: at + script.completionDelayMs,
    fadeEnd: at + script.completionDelayMs + script.completionFadeMs,
    cycleMs: script.typingMs + runMs,
  }
}

const TYPING_PHASE: Phase = {
  typed: 0,
  typing: true,
  message: "",
  messageRow: "status",
  showTitle: false,
  showCompletion: false,
  showBar: false,
  counter: "",
  statusMode: "plain",
  fade: 0,
  progress: 0,
}

/** Pure: the same elapsed ms always yields the same frame. */
function resolvePhase(
  elapsed: number,
  script: TerminalScript,
  tl: ReturnType<typeof compile>,
): Phase {
  const cycle = Math.min(Math.max(elapsed, 0), tl.cycleMs)

  if (cycle < script.typingMs) {
    return {
      ...TYPING_PHASE,
      typed: typedCount(cycle, script.command, script.typingMs),
    }
  }

  const t = cycle - script.typingMs
  const run = (phase: Omit<Phase, "typed" | "typing">): Phase => ({
    ...phase,
    typed: script.command.length,
    typing: false,
  })

  if (t < tl.leadIn.end) {
    return run({
      message: script.leadIn.message,
      messageRow: "title",
      showTitle: false,
      showCompletion: false,
      showBar: false,
      counter: "",
      statusMode: script.leadIn.statusMode ?? "spinner",
      fade: 0,
      progress: 0,
    })
  }

  const stepIndex = tl.steps.findIndex((step) => t < step.end)
  if (stepIndex >= 0) {
    const step = tl.steps[stepIndex]
    const local = (t - step.start) / (step.durationMs || 1)
    return run({
      message: step.message,
      messageRow: "status",
      showTitle: true,
      showCompletion: false,
      showBar: true,
      counter: `${stepIndex + 1}/${tl.steps.length}`,
      statusMode: step.statusMode ?? "spinner",
      fade: 0,
      progress: (stepIndex + local) / tl.steps.length,
    })
  }

  const held: Omit<Phase, "typed" | "typing"> = {
    message: "",
    messageRow: "status",
    showTitle: true,
    showCompletion: t >= tl.fadeEnd,
    showBar: true,
    counter: `${tl.steps.length}/${tl.steps.length}`,
    statusMode: "ready",
    fade: 1,
    progress: 1,
  }

  const tailIndex = tl.tail.findIndex((beat) => t < beat.end)
  if (tailIndex >= 0) {
    const beat = tl.tail[tailIndex]
    return run({
      ...held,
      message: beat.message,
      statusMode: beat.statusMode ?? "ready",
    })
  }

  const fade = Math.min(
    Math.max((t - tl.fadeStart) / (tl.fadeEnd - tl.fadeStart || 1), 0),
    1,
  )
  return run({
    ...held,
    message: "Ready",
    showCompletion: t >= tl.fadeEnd,
    fade,
    statusMode: t >= tl.fadeEnd ? "ready" : "fading",
  })
}

function CommandLine({
  script,
  typed,
}: Readonly<{ script: TerminalScript; typed: number }>) {
  const head = script.command.slice(0, Math.min(typed, script.commandDimFrom))
  const tail = script.command.slice(
    Math.min(typed, script.commandDimFrom),
    typed,
  )

  return (
    <>
      <span style={{ color: TERMINAL_PALETTE.white }}>{head}</span>
      {tail && <span style={{ color: TERMINAL_PALETTE.dim }}>{tail}</span>}
    </>
  )
}

function StatusLine({
  phase,
  elapsed,
}: Readonly<{ phase: Phase; elapsed: number }>) {
  if (!phase.message) return null

  const isReady = phase.statusMode === "ready"
  // The spinner holds one dim colour for its whole run. Only the tick glyph
  // changes state, and only on the way to Ready — a spinner that recolours
  // mid-cycle reads as a second progress signal competing with the bar.
  const tickColor = isReady ? TERMINAL_PALETTE.ok : TERMINAL_PALETTE.dim
  const messageColor =
    phase.statusMode === "fading"
      ? lerpColor(TERMINAL_RGB.dimmest, TERMINAL_RGB.bright, phase.fade)
      : TERMINAL_PALETTE.bright

  const glyph =
    phase.statusMode === "plain" ? null : isReady ? "✓" : spinnerAt(elapsed)

  return (
    <span className="text-[12px] sm:text-[14px] lg:text-[15px]">
      {glyph && (
        <>
          <span style={{ color: tickColor }}>{glyph}</span>
          {"  "}
        </>
      )}
      <span style={{ color: messageColor }}>{phase.message}</span>
    </span>
  )
}

export function TraceUpdateAnimation({
  className = "",
  script = TRACE_UPDATE_SCRIPT,
  backdropSrc = BACKDROP_SRC,
}: Readonly<{
  className?: string
  script?: TerminalScript
  backdropSrc?: string
}>) {
  const timeline = compile(script)
  const { ref, elapsed } = useLoopingTimeline<HTMLDivElement>(timeline.cycleMs)
  const phase = resolvePhase(elapsed, script, timeline)

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Terminal animation of ${script.command.trim()}: the command is typed, then ${script.leadIn.message.replace("...", "")}, the update runs through ${script.steps.length} stages, and the run completes.`}
      className={`relative w-full max-w-[720px] overflow-hidden rounded-[20px] squircle ${className}`.trim()}
    >
      <img
        src={withAssetHash(backdropSrc)}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-[50%_68%] select-none pointer-events-none"
      />

      <div className="relative flex items-center justify-center min-h-[320px] sm:min-h-[360px] lg:min-h-[380px] p-5 sm:p-8">
        <div className="w-[68ch] max-w-full font-mono overflow-hidden rounded-[20px] squircle bg-[#0c0c0e]">
          <div className="flex items-center gap-1.5 h-9 px-4 sm:px-5 border-b border-white/[0.07]">
            <span aria-hidden="true" className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-white/20" />
              <span className="size-3 rounded-full bg-white/20" />
              <span className="size-3 rounded-full bg-white/20" />
            </span>
          </div>

          <div className="p-3 sm:p-5 overflow-x-auto no-scrollbar">
            <div
              className="font-mono text-[13px] sm:text-[15px] lg:text-base tracking-normal select-none"
              style={
                {
                  height: LINE_COUNT * ROW_H,
                  lineHeight: `${ROW_H}px`,
                  "--row-h": `${ROW_H}px`,
                } as CSSProperties
              }
            >
              <div className="h-[var(--row-h)]">
                <CommandLine script={script} typed={phase.typed} />
              </div>

              <div className="relative w-max shrink-0">
                <div className="h-[var(--row-h)]" />
                <div className="h-[var(--row-h)]">
                  {phase.messageRow === "title" ? (
                    <StatusLine phase={phase} elapsed={elapsed} />
                  ) : (
                    phase.showTitle &&
                    (phase.showCompletion ? (
                      <>
                        <span style={{ color: TERMINAL_PALETTE.dim }}>
                          {script.title.done.lead}
                        </span>
                        <span style={{ color: TERMINAL_PALETTE.accent }}>
                          {script.title.done.to}
                        </span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: TERMINAL_PALETTE.dim }}>
                          {script.title.running.lead}
                        </span>
                        <span style={{ color: TERMINAL_PALETTE.accent }}>
                          {script.title.running.from}
                        </span>
                        <span style={{ color: TERMINAL_PALETTE.dim }}>
                          {" to "}
                        </span>
                        <span style={{ color: TERMINAL_PALETTE.accent }}>
                          {script.title.running.to}
                        </span>
                      </>
                    ))
                  )}
                </div>
                <div className="h-[var(--row-h)]">
                  {phase.messageRow === "status" && (
                    <StatusLine phase={phase} elapsed={elapsed} />
                  )}
                </div>
                <div className="h-[var(--row-h)]">
                  {phase.showBar && (
                    <TerminalProgressBar
                      progress={phase.progress}
                      counter={phase.counter}
                    />
                  )}
                </div>
                <div className="h-[var(--row-h)]" />
                <div className="h-[var(--row-h)]">
                  {phase.showCompletion && (
                    <span style={{ color: TERMINAL_PALETTE.white }}>
                      {script.completion}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
