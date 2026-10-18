import { useLayoutEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { useLoopingTimeline } from "@/utils/useLoopingTimeline"
import {
  PREVIEW_FRAME_CLASS,
  PREVIEW_MAX_WIDTH,
  PREVIEW_MOBILE_HEIGHT,
  PREVIEW_MOBILE_PADDING,
} from "./LayeredPreview"
import { fadeLayerClass, SLIDE, TINT } from "./motionStyles"

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
 *
 * The console also demonstrates itself: on entering the viewport it walks its
 * own tabs — cases, devices, audit — swapping the list, the record, the keys
 * and the tab underline as it goes. All three views are built once and stacked
 * in a single grid cell, so a step is a fade rather than a re-layout, and the
 * cycle holds whenever the console is off screen.
 */

/** The artwork's palette, named by role. */
const WHITE = "text-[#f0f6fc]"
const MUTED = "text-[#8f97a6]"
const DIM = "text-[#5f6672]"
const GREEN = "text-[#39d353]"
const BLUE = "text-[#4bb3fd]"
const VIOLET = "text-[#b388ff]"
const RED = "text-[#ff7b72]"

/**
 * Hairlines and panel edges. A rule is drawn as its own element rather than as
 * a border, because a border spans the whole box: the artwork insets every rule
 * to the content, so it stops short of the panel's edges on both sides.
 */
const HAIRLINE = "bg-[#21262d]"
const PANEL_EDGE = "border-[#1e2a3a]/70"

/** How long each view holds before the console steps to the next one. */
const DWELL_MS = 4000

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

/** A rule, inset to the content so it stops at the padding rather than the edge. */
function Rule({
  heightClass = "h-[1em]",
  className = "",
}: Readonly<{ heightClass?: string; className?: string }>) {
  return <span aria-hidden="true" className={`absolute ${heightClass} ${HAIRLINE} ${className}`.trim()} />
}

/** A block of a record, ruled off from the block above it. */
function Block({
  height,
  className = "",
  children,
}: Readonly<{ height?: string; className?: string; children: ReactNode }>) {
  return (
    <div
      className={`relative ${height ? `${height} shrink-0` : "flex-1"} px-[24em] pt-[10em] ${className}`.trim()}
    >
      <Rule className="left-[24em] right-[24em] top-0" />
      {children}
    </div>
  )
}

/** A ruled block that opens with a label and then prints one value row. */
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

/** One row of a record's history: when, what, and who. */
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

/** The search box every list opens with. */
function SearchField({ value }: Readonly<{ value: string }>) {
  return (
    <div className="flex h-[35em] items-center rounded-[5.5em] border-[1em] border-[#30363d]/50 px-[10em]">
      <Text className={DIM}>{value}</Text>
    </div>
  )
}

/**
 * One row of a list: the selection marker's gutter, then whatever that list
 * shows. Every list in the console is built on this row, which is what keeps
 * their first column — a case number, a device, an event's sequence — on one
 * line down the panel.
 */
function ListRow({
  marker = false,
  children,
}: Readonly<{ marker?: boolean; children: ReactNode }>) {
  return (
    <div className="flex h-[22em] items-center">
      <span className="w-[12em] shrink-0" aria-hidden="true">
        {marker ? <Text className={WHITE}>›</Text> : null}
      </span>
      {children}
    </div>
  )
}

/** A list's column header: the same gutter the rows beneath it use. */
function ListHeader({
  className = "",
  children,
}: Readonly<{ className?: string; children: ReactNode }>) {
  return (
    <div className={`relative flex shrink-0 items-center px-[24em] ${className}`.trim()}>
      <Rule className="bottom-0 left-[24em] right-[24em]" />
      <span className="w-[12em] shrink-0" />
      {children}
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

/** The band of key hints every view ends with, which differ per view. */
function Footer({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-[46em] shrink-0 items-start gap-[27em] px-[24em] pt-[10em]">{children}</div>
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

/** A drive on the bench, and what it holds. */
const DEVICES = [
  { name: "NVMe Micron", size: "476.9 GB", selected: true },
  { name: "SATA USB Card", size: "1.8 TB" },
  { name: "Samsung SSD 870 EVO", size: "931.5 GB" },
  { name: "Kingston DataTraveler", size: "2 TB" },
  { name: "Samsung T7 Shield", size: "1.8 TB" },
  { name: "WD Blue SN570", size: "500 GB" },
]

/** A step of the audit trail, newest first. */
const EVENTS = [
  { seq: "9", event: "Case Updated", selected: true },
  { seq: "8", event: "Case Archived" },
  { seq: "7", event: "Device Inspected" },
  { seq: "6", event: "Case Purged" },
  { seq: "5", event: "Device Linked" },
  { seq: "4", event: "Device Gate Checked" },
  { seq: "3", event: "Case Closed" },
  { seq: "2", event: "Case Closed" },
  { seq: "1", event: "Case Created" },
]

/** What one audited change altered, and to what. `from` is absent on a creation. */
const CHANGES = [
  { field: "title", from: "USB Evidence Case", to: "USB Evidence Case 01" },
  { field: "tags", from: "#USB", to: "#USB, #Evidence01" },
  { field: "description", from: "USB device investigation", to: "USB acquisition investigation" },
  { field: "reason", from: "", to: "Evidence acquisition completed" },
]

/** Cases: the case list, and the record of the selected case. */
function CasesView() {
  return (
    <>
      <div className="flex shrink-0 gap-[11em] px-[24em] pt-[24em]">
        <Panel widthClass="w-[290em]">
          <div className="shrink-0 px-[24em] pt-[24em]">
            <SearchField value="Search cases ..." />
          </div>

          <ListHeader className="pt-[20em] pb-[14em]">
            <Text className={WHITE}>Case #</Text>
            <div className="ml-auto flex w-[85em] shrink-0 justify-start">
              <Text className={WHITE}>Status · 6</Text>
            </div>
          </ListHeader>

          <div className="shrink-0 px-[24em] pt-[19em]">
            {CASES.map((row) => (
              <ListRow key={row.id} marker={row.selected}>
                <Text className={row.selected ? WHITE : MUTED}>{row.id}</Text>
                <span className="flex-1" />
                <div className="flex w-[85em] shrink-0 justify-start">
                  <Text className={row.statusClass}>{row.status}</Text>
                </div>
              </ListRow>
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
            <Text className={WHITE}>Forensic examination of a workstation image collected.</Text>
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

      <Footer>
        <FooterKey keyName="↑↓" action="Navigate" />
        <FooterKey keyName="?" action="Help" />
        <FooterKey keyName="/" action="Search" />
      </Footer>
    </>
  )
}

/** Devices: the registry of drives, and the fingerprint of the selected one. */
function DevicesView() {
  return (
    <>
      <div className="flex shrink-0 gap-[11em] px-[24em] pt-[24em]">
        <Panel widthClass="w-[290em]">
          <div className="shrink-0 px-[24em] pt-[24em]">
            <SearchField value="Search devices.." />
          </div>

          <div className="shrink-0 px-[24em] pt-[17em]">
            <div className="flex pl-[11em]">
              <Text className={MUTED}>Kind: all</Text>
            </div>
          </div>

          <ListHeader className="pt-[8em] pb-[13em]">
            <Text className={WHITE}>Device · 6</Text>
            <div className="ml-auto flex">
              <Text className={WHITE}>Size</Text>
            </div>
          </ListHeader>

          <div className="shrink-0 px-[24em] pt-[19em]">
            {DEVICES.map((row) => (
              <ListRow key={row.name} marker={row.selected}>
                <Text className={row.selected ? WHITE : MUTED}>{row.name}</Text>
                <span className="flex-1" />
                <Text className={row.selected ? WHITE : MUTED}>{row.size}</Text>
              </ListRow>
            ))}
          </div>
        </Panel>

        <Panel widthClass="w-[502em]">
          <div className="h-[46em] shrink-0 px-[24em] pt-[24em]">
            <div className="flex h-[22em] items-center">
              <Text className={BLUE}>NVMe Micron</Text>
            </div>
          </div>

          <Block height="h-[75em]">
            <MetaRow label="Node" value="Drive01" />
            <MetaRow label="Kind" value="OS" />
            <MetaRow label="Size" value="476.9 GB" />
            <MetaRow label="Model" value="NVMe Micron_2400_MTFDKBA512QFM" />
          </Block>

          <Block height="h-[97em]">
            <div className="flex h-[22em] items-center">
              <Text className={BLUE}>FINGERPRINT</Text>
            </div>
            <MetaRow label="Serial" value="0000_0000_0000_0001_00A0_7523_411D_5C04" />
            <MetaRow label="Interface" value="NVMe" />
            <MetaRow label="Firmware" value="V2MB006" />
            <MetaRow label="Observed" value="13-10-2026 10:28:10 AM IST" />
          </Block>

          <Block height="h-[81em]">
            <div className="flex h-[22em] items-center">
              <Text className={BLUE}>CASES LINKED</Text>
            </div>
            {["2026-CR-0005", "2026-CR-0012", "2026-CR-0052"].map((id) => (
              <div key={id} className="flex h-[16em] items-center pl-[17em]">
                <Text className={WHITE}>{id}</Text>
              </div>
            ))}
          </Block>

          <div className="flex-1" />
        </Panel>
      </div>

      <Footer>
        <FooterKey keyName="↑↓" action="Navigate" />
        <FooterKey keyName="l" action="Link" />
        <FooterKey keyName="i" action="Inspect" />
        <FooterKey keyName="k" action="Kind" />
        <FooterKey keyName="c" action="Check" />
      </Footer>
    </>
  )
}

/** Audit: the trail of events, and one event's changes. */
function AuditView() {
  return (
    <>
      <div className="flex shrink-0 gap-[11em] px-[24em] pt-[24em]">
        <Panel widthClass="w-[290em]">
          <div className="shrink-0 px-[24em] pt-[24em]">
            <SearchField value="Search audits.." />
          </div>

          <ListHeader className="pt-[20em] pb-[14em]">
            <span className="w-[90em] shrink-0">
              <Text className={WHITE}>Seq #</Text>
            </span>
            <Text className={WHITE}>Events · 4</Text>
          </ListHeader>

          <div className="shrink-0 px-[24em] pt-[19em]">
            {EVENTS.map((row) => (
              <ListRow key={row.seq} marker={row.selected}>
                <span className="w-[90em] shrink-0">
                  <Text className={row.selected ? WHITE : MUTED}>{row.seq}</Text>
                </span>
                <Text className={row.selected ? WHITE : MUTED}>{row.event}</Text>
              </ListRow>
            ))}
          </div>
        </Panel>

        <Panel widthClass="w-[502em]">
          <div className="h-[46em] shrink-0 px-[24em] pt-[24em]">
            <div className="flex h-[22em] items-center gap-[7em]">
              <Text className={BLUE}>#9</Text>
              <Text className={WHITE}>Case Update</Text>
            </div>
          </div>

          <Block height="h-[75em]">
            <MetaRow label="Case" value="2026-CR-004" />
            <MetaRow label="Actor" value="Nirjar Goswami" />
            <MetaRow label="Timestamp" value="20-09-2026 06:56:38 PM IST" />
            <MetaRow label="Event" value="CASE_UPDATED" />
          </Block>

          <Block height="h-[241em]">
            <div className="flex h-[22em] items-center">
              <Text className={BLUE}>CHANGES · 4</Text>
            </div>
            {CHANGES.map((change) => (
              <div key={change.field}>
                <div className="flex h-[26em] items-center">
                  <Text className={MUTED}>{change.field}</Text>
                </div>
                <div className="flex h-[26em] items-center gap-[10em] pl-[17em]">
                  {change.from ? (
                    <>
                      <Text className={RED}>{change.from}</Text>
                      <Text className={DIM}>→</Text>
                    </>
                  ) : null}
                  <Text className={GREEN}>{change.to}</Text>
                </div>
              </div>
            ))}
          </Block>

          <Field label="INTEGRITY" height="h-[55em]">
            <Text className={GREEN}>● Verified</Text>
          </Field>

          <div className="flex-1" />
        </Panel>
      </div>

      <Footer>
        <FooterKey keyName="↑↓" action="Navigate" />
        <FooterKey keyName="?" action="Help" />
        <FooterKey keyName="/" action="Search" />
      </Footer>
    </>
  )
}

/**
 * Everything the console cycles through, as one stable element per view.
 *
 * They are built here rather than inside `TraceConsole` on purpose: the cycle
 * re-reads the elapsed time every frame, and an element that is referentially
 * the same as the last render is the one thing React can skip in full. Only
 * the three wrappers around them and the tab bar re-render per frame.
 */
const VIEWS = [
  { label: "Cases", view: <CasesView /> },
  { label: "Devices", view: <DevicesView /> },
  { label: "Audit", view: <AuditView /> },
]

const CYCLE_MS = DWELL_MS * VIEWS.length

/**
 * The console's own tabs, with the selection marked by an underline rather than
 * a filled pill. The underline is one element measured against the active
 * label, so a step slides it across instead of blinking it from one tab to the
 * next; `SLIDE` and `TINT` are the same motion the interface switcher uses.
 */
function TabBar({ active }: Readonly<{ active: number }>) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [underline, setUnderline] = useState({ left: 0, width: 0 })

  // Measured before paint, and re-measured whenever the console is resized —
  // its labels are set in `em`, so they move with the frame as well as with
  // the selection.
  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row) return

    const measure = () => {
      const label = row.querySelectorAll<HTMLSpanElement>("[data-tab]")[active]
      if (!label) return
      const left = label.offsetLeft
      const width = label.offsetWidth
      setUnderline((prev) => (prev.left === left && prev.width === width ? prev : { left, width }))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(row)
    return () => observer.disconnect()
  }, [active])

  return (
    <div
      ref={rowRef}
      className="relative flex h-[45em] shrink-0 items-start gap-[30em] px-[24em] pt-[20em]"
    >
      <Rule heightClass="h-[2em]" className="bottom-0 left-[24em] right-[24em]" />
      {VIEWS.map((view, index) => (
        <span
          key={view.label}
          data-tab
          className={`${index === active ? WHITE : MUTED} ${TINT}`}
        >
          <Text>{view.label}</Text>
        </span>
      ))}
      <span
        aria-hidden="true"
        style={{ transform: `translateX(${underline.left}px)`, width: underline.width }}
        className={`pointer-events-none absolute left-0 top-[43em] h-[4em] bg-[#f0f6fc] ${SLIDE}`}
      />
    </div>
  )
}

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
 * does. The cycle is decoration on top of that picture.
 */
export function TraceConsole() {
  const { ref, elapsed } = useLoopingTimeline<HTMLDivElement>(CYCLE_MS)
  const active = Math.floor(elapsed / DWELL_MS) % VIEWS.length

  return (
    <div
      ref={ref}
      className={`relative w-full select-none ${PREVIEW_MAX_WIDTH} mx-auto overflow-hidden rounded-[20px] squircle bg-ink/10 ${PREVIEW_MOBILE_HEIGHT}`}
    >
      <div
        className={`absolute ${PREVIEW_MOBILE_PADDING} pointer-events-none flex w-auto items-center justify-start sm:relative sm:inset-auto sm:block sm:w-full ${PREVIEW_FRAME_CLASS}`}
      >
        <div
          role="img"
          aria-label="Trace console cycling through the case list, the device registry, and the audit trail"
          className="console-frame relative aspect-[851/582] h-full w-auto shrink-0 sm:h-auto sm:w-full"
        >
          <div className="console-screen absolute inset-0 flex flex-col overflow-hidden rounded-[15em] bg-[#0c0c0c] font-mono text-[#f0f6fc]">
            <TabBar active={active} />

            <div className="grid flex-1">
              {VIEWS.map((view, index) => (
                <div key={view.label} className={fadeLayerClass(index === active)}>
                  {view.view}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
