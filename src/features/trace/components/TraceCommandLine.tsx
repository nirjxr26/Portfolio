import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { CASES, ConsolePreviewBox, Text } from "./TraceConsole"
import { useIsTabActive } from "./SegmentedTabs"
import { typedCount } from "@/lib/typewriter"
import { useOnceTimeline } from "@/hooks/useOnceTimeline"

/**
 * The command line standing in for itself in the interface switcher: a real
 * session, printed in the console's own space.
 *
 * It fills the panel on its own rather than opening over the console: the
 * command line *is* this picture, maximised, so the session gets the whole frame
 * instead of a corner of it. The CLI runs one interaction and loops it — a
 * command typed at the prompt, the case table that command prints, then a case
 * record. The banner is the CLI's own, so the panel reads as that terminal
 * rather than as a picture of one.
 *
 * The case table is `TraceConsole`'s case list, the same six rows the console
 * shows in its own tab. One list means the two mockups cannot disagree about
 * what a case is called or what state it is in.
 *
 * The window is a fixed size. Every row below is a slot of the same height that
 * is always present and simply empty until its moment comes, so output arriving
 * cannot resize the window — a terminal that grows as it prints reads as a page
 * loading, not as a shell printing. The height is sized to the finished table,
 * the widest the window ever gets, with a little slack under the last prompt,
 * which is where a terminal has empty space anyway.
 *
 * The whole playback is a pure function of elapsed time: `useLoopingTimeline`
 * supplies the clock, `resolvePhase` decides what that instant looks like, and
 * the phase is compiled once into absolute boundaries rather than re-summed per
 * frame. Typing comes from `typedCount`, the same rhythm the update card uses.
 *
 * The window carries the class that turns `1em` into one of the console's units,
 * and the console's own typeface — both mockups set in one font, so the banner's
 * columns line up. Every dimension below is written in those units.
 */

/** The launch banner's wordmark, exactly as the CLI draws it. */
const LOGO = String.raw` _____ ____      _     ____ _____
|_   _|  _ \    / \   / ___| ____|
  | | | |_) |  / _ \ | |   |  _|
  | | |  _ <  / ___ \| |___| |___
  |_| |_| \_\/_/   \_\_____|_____|
`;

/**
 * One terminal row, and the type that sits on it — in the console's own units.
 *
 * `LINE` is `Text`'s own default, which is what makes the two mockups the same
 * size: the terminal is not a smaller thing standing next to the console, it is
 * that console's own text at that console's own size.
 *
 * `ROW` is that type's line box rather than a roomier pitch — 12.5 × 1.44. A
 * terminal's rows are the height of its text plus its leading and nothing more:
 * a slack row between two printed lines reads as a gap in the output, and an
 * empty one as a paragraph break the shell never printed.
 */
const ROW = "h-[18em]"
const LINE = "text-[12.5em]"

/**
 * The row's height in the console's units — the same 18 the class above uses.
 * The keyboard scrolls by a row, and the row is measured in pixels from the
 * viewport's own font-size, which is one console unit: the mockup scales, and
 * a fixed number of pixels would scroll a different number of lines at every
 * width.
 */
const ROW_UNITS = 18

/** The wordmark, on the leading the CLI's own banner is drawn at. */
const BANNER = "text-[12.5em] leading-[1.37]"

const MUTED = "text-[#737c84]"
const TITLE = "text-[#f0f6fc]"

/** The CLI's own accent, which is what it prints a case identifier in. */
const ACCENT = "text-[#4bb3fd]"

/**
 * Tags take the accent held back. They are the same family as the identifier
 * above them — labels for this record, not prose — but further from the front,
 * so the case's own name stays the loudest thing on the screen.
 */
const TAGS = "text-[#4bb3fd]/70"

/**
 * A case's state, in the console's own green — the colour the case list prints
 * `OPEN` in, so the record and the row above it agree. Two class strings rather
 * than one colour, because Tailwind only sees a class it can read literally.
 */
const STATE_TEXT = "text-[#39d353]"
const STATE_DOT = "bg-[#39d353]"

/**
 * A rule across the terminal, drawn as a line rather than typed as one.
 *
 * White at low opacity rather than a colour of its own: a rule is the absence of
 * something, and it should read as a division of the same type it separates
 * rather than as another thing printed in the output.
 *
 * Every rule is the same full-width, one-pixel line so the record's blocks read
 * as one set of divisions rather than as rules drawn at different lengths.
 *
 * One CSS pixel tall, not one design unit. In units the line is whatever `851`
 * units divide into on the screen it is on, and the browser spreads that across
 * however many device pixels it lands on — so rules at the same nominal height
 * come out at visibly different weights, one sharp and one soft, depending on
 * whether the row above happened to end on a pixel boundary. A CSS pixel is the
 * same line every time, and the same one the title bar's own border is drawn in.
 */
function Rule() {
  return <span aria-hidden="true" className="h-px w-full bg-white/10" />
}

/**
 * One row of the terminal. Always present at its full height — a slot that is
 * empty is a blank row of the terminal, not a missing one.
 *
 * A row that has not been printed yet is not in the document at all. That is
 * what makes the output read as a shell printing rather than as a page with
 * holes in it: a row that were merely empty would leave the space where a case
 * is about to appear, and the reader would see the terminal's future — phantom
 * gaps, and prompts sitting in mid-air before anything asked for them.
 */
function Slot({
  show = true,
  rowClass = ROW,
  children,
}: Readonly<{ show?: boolean; rowClass?: string; children?: ReactNode }>) {
  if (!show) return null
  return <div className={`flex ${rowClass} items-center`}>{children}</div>
}

/* ------------------------------------------------------------------ *
 * The session
 * ------------------------------------------------------------------ */

/**
 * What `case show` prints for the selected case.
 *
 * The case is `CASES[0]` — the same one the console's record panel is showing —
 * so the two mockups cannot drift on who opened it, when, or with what. It is
 * stated as an ordered list of rows rather than as markup because the session
 * needs to know how tall each output is *before* it renders: `RECORD_ROWS` is
 * read to time the printing, and rows described in one place cannot disagree
 * with the slots that draw them.
 */
type RecordRow =
  | { readonly kind: "blank" }
  | { readonly kind: "spacer" }
  | { readonly kind: "rule" }
  | { readonly kind: "caseId"; readonly value: string }
  | { readonly kind: "caseTitle"; readonly text: string }
  | { readonly kind: "caseStatus"; readonly state: string }
  | { readonly kind: "heading"; readonly text: string }
  | { readonly kind: "meta"; readonly label: string; readonly value: string; readonly valueClass?: string }
  | { readonly kind: "text"; readonly text: string; readonly wrap?: boolean }
  | { readonly kind: "device"; readonly text: string }
  | { readonly kind: "verified"; readonly text: string }
  | { readonly kind: "event"; readonly stamp: string; readonly what: string; readonly who: string }

const RECORD: readonly RecordRow[] = [
  // Half a row under the command, so the record starts a breath below the line
  // that asked for it rather than a full row of nothing.
  { kind: "spacer" },
  { kind: "caseId", value: "2026-CR-0142" },
  { kind: "caseTitle", text: "Exfiltration Host" },
  { kind: "caseStatus", state: "OPEN" },
  { kind: "rule" },
  { kind: "meta", label: "Lead Examiner", value: "Nirjar Goswami" },
  { kind: "meta", label: "Opened", value: "02-10-2026 · 09:41:12 AM IST" },
  { kind: "meta", label: "Updated", value: "05-10-2026 · 04:18:55 PM IST" },
  { kind: "meta", label: "Tags", value: "#memory-dump #server #ransomware", valueClass: TAGS },
  { kind: "rule" },
  { kind: "heading", text: "DESCRIPTION" },
  { kind: "text", text: "Suspicious outbound transfer staged from the shared finance drive across two consecutive nights, correlated to a service account signing from an unmanaged endpoint.", wrap: true },
  { kind: "rule" },
  { kind: "heading", text: "LINKED DEVICE" },
  { kind: "device", text: "Samsung 980 PRO · 931.5 GB · /dev/nvme0n1" },
  { kind: "rule" },
  { kind: "heading", text: "IMAGING" },
  { kind: "text", text: "Preparing — reservation only; no image acquired" },
  { kind: "rule" },
  { kind: "heading", text: "INTEGRITY" },
  { kind: "verified", text: "Verified" },
  { kind: "rule" },
  { kind: "heading", text: "HISTORY · 3 events" },
  { kind: "event", stamp: "05-10 04:18 PM", what: "Case Updated", who: "Nirjar Goswami" },
  { kind: "event", stamp: "03-10 11:42 AM", what: "Device Linked", who: "Priya Sharma" },
  { kind: "event", stamp: "02-10 09:41 AM", what: "Case Created", who: "Nirjar Goswami" },
]

/**
 * How many rows each output occupies, counted once so the script's timings and
 * the markup that renders them cannot disagree about how tall they are.
 */
const LIST_ROWS = 5 + CASES.length
const RECORD_ROWS = RECORD.length

/**
 * The rows that are on screen from the first frame — the launch banner's
 * trailing space, the tool line, and the first prompt — and the two the shell
 * prints between one command's output and the next prompt. The scroll counts
 * these alongside the rows that fill in, so the view is always measuring the
 * whole session rather than only the part that animates.
 */
const HEADER_ROWS = 4
const PROMPT_ROWS = 2

/**
 * How long a command takes to type, and the beat before it prints anything.
 */
const TYPING_MS = 2200
const SUBMIT_MS = 620

/** The table prints a row at a time; this is the gap between rows. */
const ROW_STAGGER_MS = 140

/** Held once the record is complete, so the last frame is readable before looping. */
const HOLD_MS = 2800

/** The beat between one command's output and the next prompt appearing. */
const PROMPT_GAP_MS = 900

/**
 * The beat before the closing prompt, once the record has finished printing.
 * Short: the shell does not pause to announce that it is ready.
 */
const DONE_GAP_MS = 700

/** Where the session rests: the closing prompt, on a row of its own. */
const DONE_ROWS = 1

interface Phase {
  /** Which of the two fresh views the terminal is showing. */
  view: "list" | "record"
  /** Characters of each command on screen so far. */
  listTyped: number
  recordTyped: number
  /** How many rows of each output have printed. */
  listPrinted: number
  recordPrinted: number
  /** The record is complete and the closing prompt is up. */
  done: boolean
}

/**
 * The session, as beats rather than as one hardcoded run.
 *
 * Two commands run here — the case list, then one case shown in full — and
 * stating them as an ordered script means a third would be one more entry
 * rather than another pass of timing arithmetic.
 */
type Beat =
  | { readonly kind: "type"; readonly text: string; readonly ms: number }
  | { readonly kind: "wait"; readonly ms: number }
  | { readonly kind: "rows"; readonly count: number }
  /** The shell clears the screen before the next command. */
  | { readonly kind: "clear" }

const LIST_COMMAND = "case list"
const RECORD_COMMAND = "case show 2026-CR-0142"

/** The label this preview sits under, as the switcher spells it. */
const TAB_LABEL = "Command line"

const SCRIPT: readonly Beat[] = [
  { kind: "type", text: LIST_COMMAND, ms: TYPING_MS },
  { kind: "wait", ms: SUBMIT_MS },
  { kind: "rows", count: LIST_ROWS },
  // Hold the finished case-list view long enough to be read.
  { kind: "wait", ms: PROMPT_GAP_MS },
  // The next command starts on a cleared screen, in the same terminal window.
  { kind: "clear" },
  { kind: "type", text: RECORD_COMMAND, ms: TYPING_MS * 1.4 },
  { kind: "wait", ms: SUBMIT_MS },
  { kind: "rows", count: RECORD_ROWS },
  // The record is the last thing printed; the prompt after it is the shell
  // sitting ready, which is where a session like this rests.
  { kind: "wait", ms: DONE_GAP_MS },
]

/**
 * How long a beat runs. A row beat has no duration of its own — it lasts exactly
 * as long as it takes to print its rows, which is what ties the script to the
 * markup that renders them.
 */
const beatMs = (beat: Beat) =>
  beat.kind === "rows" ? beat.count * ROW_STAGGER_MS : beat.kind === "clear" ? 0 : beat.ms

/**
 * Expands the session into absolute boundaries once, so `resolvePhase` stays a
 * lookup rather than a re-summed set of durations on every frame.
 */
const TIMELINE = (() => {
  let at = 0
  const bounds = SCRIPT.map((beat) => {
    const span = { beat, start: at, end: at + beatMs(beat) }
    at = span.end
    return span
  })

  return { bounds, cycleMs: at + HOLD_MS }
})()

/** Pure: the same elapsed ms always yields the same frame. */
function resolvePhase(elapsed: number): Phase {
  const cycle = Math.min(Math.max(elapsed, 0), TIMELINE.cycleMs)
  const phase: Phase = {
    view: "list",
    listTyped: 0,
    recordTyped: 0,
    listPrinted: 0,
    recordPrinted: 0,
    done: false,
  }

  for (const { beat, start, end } of TIMELINE.bounds) {
    if (cycle < start) break

    const t = Math.min(cycle - start, end - start)

    if (beat.kind === "clear") {
      phase.view = "record"
    } else if (beat.kind === "type") {
      const typed = typedCount(t, beat.text, beat.ms)
      if (beat.text === LIST_COMMAND) phase.listTyped = typed
      else phase.recordTyped = typed
    } else if (beat.kind === "rows") {
      const count = Math.min(beat.count, Math.floor(t / ROW_STAGGER_MS) + 1)
      if (beat.count === LIST_ROWS) phase.listPrinted = count
      else phase.recordPrinted = count
    }
  }

  // The final wait beat is the gap between the last row and the closing prompt.
  phase.done = phase.recordPrinted === RECORD_ROWS && cycle >= TIMELINE.bounds[TIMELINE.bounds.length - 1].start

  return phase
}

/**
 * The prompt, its cursor, and the command being written at it.
 *
 * The cursor is always mounted and swaps colour rather than appearing and
 * disappearing, so a blink cannot reflow the line. It stops once the command is
 * submitted: a blinking caret on a line the shell has already taken reads as a
 * second command still being edited.
 */
/**
 * The prompt, its cursor, and the command being written at it.
 *
 * The cursor is always mounted and swaps between blinking and blank rather than
 * appearing and disappearing, so a blink cannot reflow the line it sits on. It
 * blanks once a command is submitted — a caret on a line the shell has already
 * taken reads as a second command still being edited.
 */
function Prompt({
  text,
  typed,
  caretOn,
}: Readonly<{ text: string; typed: number; caretOn: boolean }>) {
  return (
    <>
      <Text sizeClass={LINE} className={TITLE}>trace</Text>
      <Text sizeClass={LINE} className={MUTED}>&gt;</Text>
      {/*
       * One character's space after the prompt, the way the CLI prints it.
       *
       * `ch`, not `em`: `em` here would resolve against this span's own 18em
       * type rather than the parent's unit, which is what made the gap between
       * the prompt and its command a seven-character hole. `ch` is the advance
       * of one character at the size the text is actually set, so one `ch` is
       * one space at that size — the offset stays correct if the type resizes.
       */}
      <Text sizeClass={LINE} className="ml-[1ch]">{text.slice(0, typed)}</Text>
      <span
        aria-hidden="true"
        className={`ml-[2em] inline-block h-[14em] w-[9em] ${caretOn ? "animate-caret bg-[#39d353]" : "bg-transparent"}`}
      />
    </>
  )
}

/** The command reference the shell offers while a line is being written. */
const COMMANDS = [
  ["create", "Guided case wizard"],
  ["list", "List all cases"],
  ["show", "Display case dossier"],
  ["edit", "Update case metadata"],
  ["close", "Seal & close case"],
  ["delete", "Archive or purge case"],
  ["restore", "Restore archived case"],
] as const

/** The suggestion card the CLI drops under a command still being typed. */
function Autocomplete({ query }: Readonly<{ query: string }>) {
  const matches = COMMANDS.filter(([command]) => command.startsWith(query.toLowerCase()))
  if (matches.length === 0) return null

  return (
    <span aria-hidden="true" className="absolute left-[56em] top-[20em] z-20 flex overflow-hidden rounded-[4em] font-mono">
      <span className="bg-[#a9a9a9] px-[8em] py-[4em] text-[#262626]">
        {matches.map(([command]) => (
          <span key={command} className={`block h-[1.2em] whitespace-nowrap ${LINE} leading-none`}>{command}</span>
        ))}
      </span>
      <span className="bg-[#d4d4d4] px-[8em] py-[4em] text-[#333333]">
        {matches.map(([command, description]) => (
          <span key={command} className={`block h-[1.2em] whitespace-nowrap ${LINE} leading-none`}>{description}</span>
        ))}
      </span>
    </span>
  )
}

/** Once `show` is typed, the shell offers the cases it can open. */
function CaseAutocomplete() {
  return (
    <span aria-hidden="true" className="absolute left-[56em] top-[20em] z-20 flex flex-col overflow-hidden rounded-[4em] bg-[#c9c9c9] px-[8em] py-[4em] font-mono text-[#000000]">
      <Text sizeClass={LINE} className="leading-none text-[#000000]">—</Text>
      {CASES.map((entry) => (
        <span key={entry.id} className="flex h-[15em] items-center whitespace-nowrap leading-none">
          <Text sizeClass={LINE} className="text-[#000000]">{entry.id}</Text>
          <Text sizeClass={LINE} className="ml-[1ch] text-[#000000]">·</Text>
          <Text sizeClass={LINE} className="ml-[1ch] text-[#000000]">{entry.status}</Text>
          <Text sizeClass={LINE} className="ml-[1ch] text-[#000000]">· {entry.title}</Text>
        </span>
      ))}
    </span>
  )
}

/** A prompt with its live suggestion card, used for both commands in the run. */
function CommandPrompt({
  text,
  typed,
  caretOn,
}: Readonly<{ text: string; typed: number; caretOn: boolean }>) {
  return (
    <span className="relative inline-flex items-center">
      <Prompt text={text} typed={typed} caretOn={caretOn} />
      {caretOn && typed > 0 && (() => {
        const subcommand = text.slice("case ".length, typed).split(" ")[0]
        return text.startsWith("case show") && subcommand === "show"
          ? <CaseAutocomplete />
          : <Autocomplete query={subcommand} />
      })()}
    </span>
  )
}

/**
 * Column widths, in characters, shared by the heading and every row.
 *
 * Each is the longest value it holds plus a gutter wide enough to read as a
 * break between columns — the case identifiers are a fixed twelve characters,
 * so their column is mostly gutter and can stay tight, while the title and
 * examiner columns carry the room that makes the eye find each field.
 */
const COL_ID = "w-[16ch]"
const COL_TITLE = "w-[26ch]"
const COL_EXAMINER = "w-[20ch]"

/** Record fields use the table's identifier column, so both views line up. */
const COL_LABEL = COL_ID
const COL_STAMP = "w-[16ch]"

/**
 * The column names the CLI prints above the table.
 *
 * Headings carry the terminal's primary colour rather than the dim one it uses
 * for values: a heading is the strongest thing on the row it introduces, and a
 * table whose headings are dimmer than its data reads upside down.
 */
function Columns() {
  return (
    <>
      <Text sizeClass={LINE} className={`${COL_ID} ${TITLE}`}>Case #</Text>
      <Text sizeClass={LINE} className={`${COL_TITLE} ${TITLE}`}>Title</Text>
      <Text sizeClass={LINE} className={`${COL_EXAMINER} ${TITLE}`}>Examiner</Text>
      <Text sizeClass={LINE} className={TITLE}>Status</Text>
    </>
  )
}

/**
 * One case, as the CLI prints it: id, title, examiner, and its state.
 *
 * The identifier takes the accent so it is findable at a glance, and the
 * examiner drops to the dim colour — it is attribution, the one column nobody
 * scans for, and holding it back keeps the eye on what the row is about.
 */
function CaseRow({ index }: Readonly<{ index: number }>) {
  const entry = CASES[index]
  if (!entry) return null

  return (
    <>
      <Text sizeClass={LINE} className={`${COL_ID} ${ACCENT}`}>{entry.id}</Text>
      <Text sizeClass={LINE} className={COL_TITLE}>{entry.title}</Text>
      <Text sizeClass={LINE} className={`${COL_EXAMINER} ${MUTED}`}>{entry.examiner}</Text>
      <Text sizeClass={LINE} className={entry.statusClass}>{entry.status}</Text>
    </>
  )
}

/**
 * One row of `case show` output.
 *
 * Labels are dim and values are primary, the way the CLI keys a record: the
 * label names the field, the value is what you came to read. Section headings
 * take the accent so the record's blocks can be found by eye.
 */
function RecordSlot({ row }: Readonly<{ row: RecordRow }>) {
  if (row.kind === "blank") return null
  if (row.kind === "rule") return <Rule />

  // Half a row: enough that a heading is not sitting on top of its own body,
  // little enough that the block still reads as one thought.
  if (row.kind === "spacer") return <div className="h-[11em]" />

  // The record's head, which is a title rather than a field: the name and the
  // identifier are one line, and the state sits under it with its own dot.
  if (row.kind === "caseId") {
    return (
      <>
        <Text sizeClass={LINE} className={TITLE}>CASE</Text>
        <Text sizeClass={LINE} className={`ml-[1ch] ${ACCENT}`}>{row.value}</Text>
      </>
    )
  }

  if (row.kind === "caseTitle") {
    return <Text sizeClass={LINE}>{row.text}</Text>
  }

  if (row.kind === "caseStatus") {
    return (
      <>
        <span aria-hidden="true" className={`mr-[6em] h-[9em] w-[9em] rounded-full ${STATE_DOT}`} />
        <Text sizeClass={LINE} className={STATE_TEXT}>{row.state}</Text>
        </>
    )
  }

  if (row.kind === "meta") {
    return (
      <>
        <Text sizeClass={LINE} className={`${COL_LABEL} ${MUTED}`}>{row.label}</Text>
        <Text sizeClass={LINE} className={row.valueClass ?? TITLE}>{row.value}</Text>
      </>
    )
  }

  if (row.kind === "heading") {
    return <Text sizeClass={LINE} className={ACCENT}>{row.text}</Text>
  }

  if (row.kind === "text" && row.wrap) {
    return (
      <span className={`${LINE} block w-full whitespace-normal leading-[1.35]`}>
        {row.text}
      </span>
    )
  }

  if (row.kind === "text" || row.kind === "device") {
    return <Text sizeClass={LINE}>{row.text}</Text>
  }

  if (row.kind === "verified") {
    return (
      <>
        <span aria-hidden="true" className={`mr-[6em] h-[9em] w-[9em] rounded-full ${STATE_DOT}`} />
        <Text sizeClass={LINE} className={STATE_TEXT}>{row.text}</Text>
      </>
    )
  }

  return (
    <>
      <Text sizeClass={LINE} className={`${COL_STAMP} ${MUTED}`}>{row.stamp}</Text>
      <Text sizeClass={LINE}>{row.what}</Text>
      <Text sizeClass={LINE} className={`ml-[1ch] ${MUTED}`}>· {row.who}</Text>
    </>
  )
}

/** What Trace prints on launch, and then the session run at the prompt. */
function Splash({ elapsed }: Readonly<{ elapsed: number }>) {
  const phase = resolvePhase(elapsed)
  const listing = phase.listPrinted > 0
  const showing = phase.recordPrinted > 0
  const listView = phase.view === "list"

  return (
    <div>
      {/* The content below; the window clips it and this slides it up. */}
      <div className={`whitespace-pre font-mono ${BANNER} text-[#4bb3fd]`}>{LOGO}</div>

      <Slot />
      <Slot>
        <Text sizeClass={LINE} className={MUTED}>
          {"Forensic Data Imaging & Retrieval Tool · v0.5.0"}
        </Text>
      </Slot>
      <Slot />
      {listView && (
        <Slot>
          <CommandPrompt
            text={LIST_COMMAND}
            typed={phase.listTyped}
            caretOn={!listing}
          />
        </Slot>
      )}

      {/*
       * The list, printed a row at a time. Each row waits for its turn to exist
       * at all, so the output grows the way a shell writes it.
       */}
      {listView && (
        <>
          <Slot show={phase.listPrinted >= 1} />
          <Slot show={phase.listPrinted >= 2}>
            <Text sizeClass={LINE} className={TITLE}>Forensic Cases</Text>
          </Slot>
          <Slot show={phase.listPrinted >= 3} />
          <Slot show={phase.listPrinted >= 4}><Columns /></Slot>
          <Slot show={phase.listPrinted >= 5}><Rule /></Slot>

          {CASES.map((entry, index) => (
            <Slot key={entry.id} show={index < phase.listPrinted}>
              <CaseRow index={index} />
            </Slot>
          ))}
        </>
      )}

      {/*
       * The shell returns to the user and the second command is written at it.
       * The prompt does not exist until the list above it is finished — an
       * empty `trace>` sitting in the middle of the output reads as a mistake.
       */}
      {!listView && (
        <Slot>
          <CommandPrompt
            text={RECORD_COMMAND}
            typed={phase.recordTyped}
            caretOn={!showing}
          />
        </Slot>
      )}

      {!listView && RECORD.map((row, index) => (
        <Slot
          key={index}
          show={index < phase.recordPrinted}
          rowClass={row.kind === "text" && row.wrap ? "min-h-[18em] py-[3em]" : ROW}
        >
          <RecordSlot row={row} />
        </Slot>
      ))}

      {/*
       * Where the session rests. The shell prints its prompt back and waits,
       * and the cursor on it keeps blinking long after the clock has stopped —
       * the signal that this is a terminal you can type into, not a video.
       */}
      <Slot show={phase.done} />
      <Slot show={phase.done}>
        <Prompt text="" typed={0} caretOn />
      </Slot>
    </div>
  )
}

/**
 * The window's body: a fixed viewport the session scrolls through.
 *
 * The scroll is native rather than a transform, which is what lets a visitor
 * take over afterwards — the same element they were watching scroll is the one
 * they can drag. While the playback is running the view follows the newest
 * printed row; the moment it ends, this stops touching `scrollTop`, and the
 * terminal is simply a scrollable window sitting there finished.
 *
 * Every row is appended as it is printed, so the content grows the way a shell
 * writes it and following the output is a single assignment per row — no
 * reflow, and no rows that were merely empty.
 */
function Terminal({ elapsed }: Readonly<{ elapsed: number }>) {
  const phase = resolvePhase(elapsed)
  const viewport = useRef<HTMLDivElement>(null)
  /**
   * Whether the view still belongs to the playback. A reader who scrolls away
   * from the bottom takes it; reaching the bottom again gives it back.
   */
  const follow = useRef(true)

  const printed = phase.view === "list"
    ? HEADER_ROWS + Math.min(phase.listPrinted, LIST_ROWS)
    : HEADER_ROWS + PROMPT_ROWS + phase.recordPrinted + (phase.done ? DONE_ROWS : 0)

  const finished = elapsed >= TIMELINE.cycleMs

  /**
   * Follow the printed rows with the browser's own smooth scroll rather than a
   * per-frame animation loop. One scroll target per new row is all the work the
   * main thread has to do; the browser interpolates the motion off-thread.
   */
  useEffect(() => {
    const node = viewport.current
    if (!node) return

    // The shell cleared the screen: start the fresh view from its top.
    if (phase.view === "record" && phase.recordPrinted <= 1) {
      node.scrollTop = 0
      return
    }

    if (!follow.current) return
    node.scrollTo({ top: node.scrollHeight, behavior: finished ? "auto" : "smooth" })
  }, [printed, finished, phase.view, phase.recordPrinted])

  /**
   * The wheel belongs to the terminal while the pointer is over it. A native
   * non-passive listener is needed: React's wheel handler cannot stop the page
   * behind the window from scrolling.
   */
  useEffect(() => {
    const node = viewport.current
    if (!node) return

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      node.scrollTop += event.deltaY
      if (event.deltaY < 0) follow.current = false
    }

    node.addEventListener("wheel", onWheel, { passive: false })
    return () => node.removeEventListener("wheel", onWheel)
  }, [])

  const onTouchMove = () => {
    follow.current = false
  }

  /**
   * The viewport is a scrollable region, so it takes the keyboard too: a
   * window that can only be scrolled with a pointer is a window some people
   * cannot read.
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const node = viewport.current
    if (!node) return

    const fontSize = parseFloat(getComputedStyle(node).fontSize) || 1
    const row = fontSize * ROW_UNITS
    const page = node.clientHeight

    switch (event.key) {
      case "ArrowUp":
        node.scrollTop -= row
        break
      case "ArrowDown":
        node.scrollTop += row
        break
      case "PageUp":
        node.scrollTop -= page
        break
      case "PageDown":
        node.scrollTop += page
        break
      case "Home":
        node.scrollTop = 0
        break
      case "End":
        node.scrollTop = node.scrollHeight
        follow.current = true
        break
      default:
        return
    }

    event.preventDefault()
    if (event.key !== "End") follow.current = false
  }

  return (
    <div
      ref={viewport}
      className={`${VIEWPORT} overflow-y-auto`}
      role="region"
      aria-label="Terminal output"
      tabIndex={0}
      onTouchMove={onTouchMove}
      onKeyDown={onKeyDown}
    >
      <Splash elapsed={elapsed} />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * The screen
 * ------------------------------------------------------------------ */

/**
 * The terminal fills the frame the panel reserves for it, in the console's own
 * units — the units its tabs and panels are drawn in, so the terminal's type is
 * the console's own size rather than a smaller scale of it.
 *
 * It is a fixed viewport, the way a terminal is: a fixed number of rows tall,
 * whatever it has printed. The session is longer than the viewport, so rather
 * than shrink the row pitch until it fits — or let the screen grow as output
 * arrives — the content scrolls up through it one row at a time. That keeps the
 * pitch readable and keeps the screen the same size from the first frame to the
 * last.
 */

/**
 * The terminal's own horizontal inset. The rows share it, so they start where
 * the text starts rather than where the window does.
 */
const WINDOW_INSET = "px-[32em]"

/**
 * The scrolled area, in the console's units.
 *
 * Its height is the frame's, less the bar: 528 − 26 = 502. Of those, the padding
 * above and below is 24 + 28, leaving room for twenty-five rows at `ROW` — fewer
 * than the session needs to show at once, so the tail of the record scrolls up
 * through the viewport as it prints.
 *
 * The padding is the viewport's, not the content's, and that is the point:
 * padding on the content scrolls away with it, so the first line printed after a
 * scroll would run straight up under the title bar. Padding on the box that
 * scrolls stays where a terminal's margin stays.
 *
 * The top is the tighter of the two: a terminal's margin under its own chrome
 * is a line of breathing room, not a paragraph.
 *
 * The viewport clips instead of scrolling: the session is a playback, not a
 * terminal someone drives, so a scrollbar would only imply an interaction that
 * is not there.
 */
/** The terminal is shorter than the console panel that holds it. */
const TERMINAL_SCREEN_HEIGHT = "h-[480em] md:h-[466em]"

const VIEWPORT = `h-[450em] md:h-[436em] scroll-smooth overscroll-contain [touch-action:pan-y] pt-[24em] pb-[28em] ${WINDOW_INSET} [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`

/**
 * The screen's title bar. Only the dots sit on it.
 *
 * The dots are the window's whole identity — they are what tells a reader this
 * is a terminal rather than a code block — so they keep the bar's full height
 * and sit slightly outside the text's own margin, the way a window's controls
 * sit outside the page it is showing.
 */
const BAR = `flex h-[30em] items-center border-b border-[#21262d] bg-[#111214] px-[24em]`

/** The dots on the bar — the window's only chrome. */
const DOTS = "flex gap-[8em]"
const DOT = "h-[11em] w-[11em] rounded-full bg-[#5f6672]"

export function TraceCommandLine({
  maxWidthClass,
  screenWidthClass,
  replay = false,
}: Readonly<{ maxWidthClass?: string; screenWidthClass?: string; replay?: boolean }> = {}) {
  const [started, setStarted] = useState(false)
  const [inView, setInView] = useState(false)
  const session = useOnceTimeline<HTMLDivElement>(TIMELINE.cycleMs, started, !inView)
  const isActive = useIsTabActive(TAB_LABEL)

  // The session runs only while the window is on screen. First entry starts it;
  // leaving pauses it and coming back resumes from the same point.
  useEffect(() => {
    const node = session.ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
        setInView(entry.isIntersecting)
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [session.ref])

  // Selecting the tab starts the session over; leaving it does not stop a run
  // already in progress, but coming back does begin another one.
  useEffect(() => {
    if (isActive) session.restart()
  }, [isActive, session.restart])

  const replayButton = replay ? (
    <button
      type="button"
      onClick={session.restart}
      aria-label="Replay trace command line"
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-hairline bg-canvas/90 text-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:h-10 sm:w-10"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" aria-hidden="true">
        <path d="M12 20.75C10.078 20.7474 8.23546 19.9827 6.8764 18.6236C5.51733 17.2645 4.75265 15.422 4.75 13.5C4.75 13.3011 4.82902 13.1103 4.96967 12.9697C5.11032 12.829 5.30109 12.75 5.5 12.75C5.69891 12.75 5.88968 12.829 6.03033 12.9697C6.17098 13.1103 6.25 13.3011 6.25 13.5C6.25 14.6372 6.58723 15.7489 7.21905 16.6945C7.85087 17.6401 8.74889 18.3771 9.79957 18.8123C10.8502 19.2475 12.0064 19.3614 13.1218 19.1395C14.2372 18.9177 15.2617 18.37 16.0659 17.5659C16.87 16.7617 17.4177 15.7372 17.6395 14.6218C17.8614 13.5064 17.7475 12.3502 17.3123 11.2996C16.8771 10.2489 16.1401 9.35087 15.1945 8.71905C14.2489 8.08723 13.1372 7.75 12 7.75H9.5C9.30109 7.75 9.11032 7.67098 8.96967 7.53033C8.82902 7.38968 8.75 7.19891 8.75 7C8.75 6.80109 8.82902 6.61032 8.96967 6.46967C9.11032 6.32902 9.30109 6.25 9.5 6.25H12C13.9228 6.25 15.7669 7.01384 17.1265 8.37348C18.4862 9.73311 19.25 11.5772 19.25 13.5C19.25 15.4228 18.4862 17.2669 17.1265 18.6265C15.7669 19.9862 13.9228 20.75 12 20.75Z" />
        <path d="M12 10.75C11.9015 10.7505 11.8038 10.7313 11.7128 10.6935C11.6218 10.6557 11.5392 10.6001 11.47 10.53L8.47 7.53003C8.32955 7.38941 8.25066 7.19878 8.25066 7.00003C8.25066 6.80128 8.32955 6.61066 8.47 6.47003L11.47 3.47003C11.5387 3.39634 11.6215 3.33724 11.7135 3.29625C11.8055 3.25526 11.9048 3.23322 12.0055 3.23144C12.1062 3.22966 12.2062 3.24819 12.2996 3.28591C12.393 3.32363 12.4778 3.37977 12.549 3.45099C12.6203 3.52221 12.6764 3.60705 12.7141 3.70043C12.7518 3.79382 12.7704 3.89385 12.7686 3.99455C12.7668 4.09526 12.7448 4.19457 12.7038 4.28657C12.6628 4.37857 12.6037 4.46137 12.53 4.53003L10.06 7.00003L12.53 9.47003C12.6704 9.61066 12.7493 9.80128 12.7493 10C12.7493 10.1988 12.6704 10.3894 12.53 10.53C12.4608 10.6001 12.3782 10.6557 12.2872 10.6935C12.1962 10.7313 12.0985 10.7505 12 10.75Z" />
      </svg>
    </button>
  ) : null

  return (
    <ConsolePreviewBox
      ariaLabel="Trace command line listing forensic cases, then opening one case record"
      maxWidthClass={maxWidthClass}
      frameAspectClass="aspect-[851/520] md:aspect-[851/466] lg:aspect-[851/410]"
      overlay={replayButton}
    >
      {/*
       * The terminal is the panel: it fills the frame the console would fill, so
       * switching to this tab swaps one screen for another rather than opening a
       * window over the console's corner.
       *
       * It is scaled and centred exactly as the console's own screen is, and at
       * the console's own height, so the two tabs show the same size of
       * interface — the terminal is not a picture of a bigger screen than the
       * console it belongs to.
       *
       * `font-normal` is explicit because Berkeley Mono Variable is a weight
       * axis spanning 100–900: left to itself the screen inherits whatever
       * weight the page is carrying, and terminal text is regular weight.
       */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={session.ref}
          className={`console-screen console-command pointer-events-auto relative shrink-0 scale-100 lg:scale-95 cursor-pointer overflow-hidden rounded-[15em] bg-[#0c0c0c] font-mono font-normal text-[#f0f6fc] ${screenWidthClass ?? "w-full"} ${TERMINAL_SCREEN_HEIGHT}`}
        >
          <div className={BAR}>
            <span aria-hidden="true" className={DOTS}>
              <span className={DOT} />
              <span className={DOT} />
              <span className={DOT} />
            </span>
          </div>

          <Terminal elapsed={session.elapsed} />
        </div>
        </div>
    </ConsolePreviewBox>
  )
}
