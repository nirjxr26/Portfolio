import type { ReactNode } from "react"
import {
  PREVIEW_FRAME_CLASS,
  PREVIEW_MAX_WIDTH,
  PREVIEW_MOBILE_HEIGHT,
  PREVIEW_MOBILE_PADDING,
} from "./LayeredPreview"

/**
 * The Trace console, rebuilt as markup rather than shipped as artwork.
 *
 * It is authored at the artwork's own size — 851x582 — and every value below
 * is a design unit from it. `console-screen` sets `1em` to one of those units,
 * so a box, a hairline or a row is written with the number the artwork gives
 * it and the whole console scales with whatever frame it lands in.
 *
 * Type is the one exception. Type carries a font size of its own, so it lives
 * on a leaf that has no geometry to place; every measurement stays on the
 * layout element around it. A node that sets both would measure itself against
 * the wrong `em`, which is why the two are never the same element here.
 */

/** The artwork's palette, named by role. */
const WHITE = "text-[#f0f6fc]"
const MUTED = "text-[#8f97a6]"
const DIM = "text-[#5f6672]"
const GREEN = "text-[#39d353]"
const BLUE = "text-[#4bb3fd]"
const VIOLET = "text-[#b388ff]"

/** Hairlines between regions inside a panel, on the tab bar, and between blocks. */
const RULE = "border-[#21262d]"
const PANEL_EDGE = "border-[#1e2a3a]/70"

/**
 * One run of console type. Floors at one design unit, so the geometry above it
 * keeps reading the artwork's numbers.
 */
function Text({
  className = "",
  children,
}: Readonly<{ className?: string; children: ReactNode }>) {
  return (
    <span className={`text-[12.5em] leading-none whitespace-pre ${className}`.trim()}>
      {children}
    </span>
  )
}

/** Both case panels: one height, one radius, one border. */
function Panel({
  widthClass,
  className = "",
  children,
}: Readonly<{ widthClass: string; className?: string; children: ReactNode }>) {
  return (
    <div
      className={`flex h-[467em] ${widthClass} shrink-0 flex-col rounded-[8em] border-[1em] ${PANEL_EDGE} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

/** A block of the record, ruled off from the block above it. */
function Block({
  height,
  className = "",
  children,
}: Readonly<{ height?: string; className?: string; children: ReactNode }>) {
  return (
    <div
      className={`${height ? `${height} shrink-0` : "flex-1"} border-t-[1em] ${RULE} px-[24em] pt-[10em] ${className}`.trim()}
    >
      {children}
    </div>
  )
}

/** A ruled block that opens with a label and then prints its value indented. */
function Field({
  label,
  height,
  indent = true,
  children,
}: Readonly<{ label: string; height: string; indent?: boolean; children: ReactNode }>) {
  return (
    <Block height={height}>
      <div className="flex h-[22em] items-center">
        <Text className={BLUE}>{label}</Text>
      </div>
      <div className={`flex h-[22em] items-center ${indent ? "pl-[17em]" : ""}`.trim()}>
        {children}
      </div>
    </Block>
  )
}

/** A label and its value, the value starting at the record's value column. */
function MetaRow({
  label,
  value,
  valueClass = WHITE,
}: Readonly<{ label: string; value: string; valueClass?: string }>) {
  return (
    <div className="grid h-[16em] grid-cols-[156em_1fr] items-center">
      <Text className={MUTED}>{label}</Text>
      <Text className={valueClass}>{value}</Text>
    </div>
  )
}

/** One row of the record's history: when, what, and who. */
function HistoryRow({ at, event }: Readonly<{ at: string; event: string }>) {
  return (
    <div className="flex h-[16em] items-center gap-[17em]">
      <Text className={MUTED}>{at}</Text>
      <Text className={WHITE}>{event}</Text>
      <Text className={DIM}>·</Text>
      <Text className={MUTED}>Nirjar</Text>
    </div>
  )
}

/** One key hint in the footer: the key, then what it does. */
function FooterKey({ keyName, action }: Readonly<{ keyName: string; action: string }>) {
  return (
    <div className="flex items-start gap-[13em]">
      <Text className={DIM}>{keyName}</Text>
      <Text className={MUTED}>{action}</Text>
    </div>
  )
}

/** A case in the list: its number, and where it stands. */
const CASES = [
  { id: "2026-CR-0006", status: "OPEN", statusClass: GREEN, selected: true },
  { id: "2026-CR-0005", status: "OPEN", statusClass: GREEN },
  { id: "2026-CR-0004", status: "OPEN", statusClass: GREEN },
  { id: "2026-CR-0003", status: "CLOSED", statusClass: VIOLET },
  { id: "2026-CR-0002", status: "OPEN", statusClass: GREEN },
  { id: "2026-CR-0001", status: "ARCHIVED", statusClass: DIM },
]

const TABS = ["Cases", "Devices", "Audit", "Settings"]

/**
 * The console standing in for itself in the interface switcher: the panel the
 * reserved box holds, with the console inside it at the artwork's size instead
 * of a background scene behind it.
 *
 * The box, its mobile height ladder, the frame and the mobile inset are the
 * ones `LayeredPreview` reserved, taken from it so the two tabs cannot disagree
 * about the space. The crop below `sm` is the artwork's as well: the console
 * keeps its full size and the panel stops showing the part that no longer fits.
 *
 * It carries an image role and a label rather than exposing its own text,
 * matching how the artwork previews read to assistive tech — the console is a
 * picture of an interface, and the panel's description is what says what it
 * does.
 */
export function TraceConsole() {
  return (
    <div
      className={`relative w-full select-none ${PREVIEW_MAX_WIDTH} mx-auto overflow-hidden rounded-[20px] squircle bg-ink/10 ${PREVIEW_MOBILE_HEIGHT}`}
    >
      <div
        className={`absolute ${PREVIEW_MOBILE_PADDING} pointer-events-none flex w-auto items-center justify-start sm:relative sm:inset-auto sm:block sm:w-full ${PREVIEW_FRAME_CLASS}`}
      >
        <div
          role="img"
          aria-label="Trace console showing the case list, a case record, and its history"
          className="console-frame relative aspect-[851/582] h-full w-auto shrink-0 sm:h-auto sm:w-full"
        >
          <div className="console-screen absolute inset-0 flex flex-col overflow-hidden rounded-[15em] bg-[#0c0c0c] font-mono text-[#f0f6fc]">
            {/* Tabs */}
            <div
              className={`flex h-[45em] shrink-0 items-start gap-[30em] border-b-[2em] ${RULE} px-[24em] pt-[20em]`}
            >
              {TABS.map((tab, index) => (
                <span key={tab} className="relative">
                  <Text className={index === 0 ? WHITE : MUTED}>{tab}</Text>
                  {index === 0 ? (
                    <span className="absolute inset-x-0 top-[23em] h-[4em] bg-[#f0f6fc]" />
                  ) : null}
                </span>
              ))}
            </div>

            {/* Case list and record */}
            <div className="flex shrink-0 gap-[11em] px-[24em] pt-[24em]">
              <Panel widthClass="w-[290em]">
                <div className="shrink-0 px-[24em] pt-[24em]">
                  <div className="flex h-[35em] items-center rounded-[5.5em] border-[1em] border-[#30363d]/50 px-[10em]">
                    <Text className={DIM}>Search cases ...</Text>
                  </div>
                </div>

                <div
                  className={`flex shrink-0 items-center border-b-[1em] ${RULE} px-[24em] pt-[20em] pb-[13em]`}
                >
                  <span className="w-[12em] shrink-0" />
                  <Text className={WHITE}>Case #</Text>
                  <div className="ml-auto flex w-[85em] shrink-0 justify-start">
                    <Text className={WHITE}>Status · 6</Text>
                  </div>
                </div>

                <div className="shrink-0 px-[24em] pt-[19em]">
                  {CASES.map((row) => (
                    <div key={row.id} className="flex h-[22em] items-center">
                      <span className="w-[12em] shrink-0" aria-hidden="true">
                        {row.selected ? <Text className={WHITE}>›</Text> : null}
                      </span>
                      <Text className={row.selected ? WHITE : MUTED}>{row.id}</Text>
                      <span className="flex-1" />
                      <div className="flex w-[85em] shrink-0 justify-start">
                        <Text className={row.statusClass}>{row.status}</Text>
                      </div>
                    </div>
                  ))}
                  <div className="flex h-[22em] items-center pl-[12em]">
                    <Text className={MUTED}>4 open · 1 closed · 1 archived</Text>
                  </div>
                </div>
              </Panel>

              <Panel widthClass="w-[502em]">
                <div className="h-[94.5em] shrink-0 px-[24em] pt-[24em]">
                  <div className="flex h-[22em] items-center">
                    <Text className={BLUE}>2026-CR-0024</Text>
                  </div>
                  <div className="flex h-[22em] items-center">
                    <Text className={WHITE}>Compromised Workstation</Text>
                  </div>
                  <div className="flex h-[22em] items-center">
                    <Text className={GREEN}>● OPEN</Text>
                  </div>
                </div>

                <Block height="h-[51em]">
                  <MetaRow label="Lead Examiner" value="Nirjar Goswami" />
                  <div className="flex h-[16em] items-center">
                    <Text className={MUTED}>#disk-image #workstation #malware</Text>
                  </div>
                </Block>

                <Block height="h-[51em]">
                  <MetaRow label="Opened" value="25-09-2026 07:03:27 PM IST" />
                  <MetaRow label="Updated" value="25-09-2026 07:03:27 PM IST" />
                </Block>

                <Field label="DESCRIPTION" height="h-[62em]">
                  <Text className={WHITE}>
                    Forensic examination of a workstation image collected.
                  </Text>
                </Field>

                <Field label="LINKED DEVICE" height="h-[62em]">
                  <Text className={WHITE}>Micron_2400_MTFDKBA512QFM · 476.9 GB</Text>
                </Field>

                <Field label="INTEGRITY" height="h-[64em]" indent={false}>
                  <Text className={GREEN}>● Verified</Text>
                </Field>

                <Block>
                  <div className="flex h-[22em] items-center">
                    <Text className={BLUE}>HISTORY · 2 events</Text>
                  </div>
                  <div className="mt-[7em] pl-[17em]">
                    <HistoryRow at="27-09 12:03 PM" event="Device Linked" />
                    <HistoryRow at="25-09 07:03 PM" event="Created" />
                  </div>
                </Block>
              </Panel>
            </div>

            {/* Keys */}
            <div className="flex h-[46em] shrink-0 items-start gap-[27em] px-[24em] pt-[10em]">
              <FooterKey keyName="↑↓" action="Navigate" />
              <FooterKey keyName="?" action="Help" />
              <FooterKey keyName="/" action="Search" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
