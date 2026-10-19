import { useLayoutEffect, useRef, useState } from "react"
import type { ReactNode, Ref } from "react"
import { useLoopingTimeline } from "@/utils/useLoopingTimeline"
import { withAssetHash } from "@/utils/helpers"
import {
  PREVIEW_FRAME_CLASS,
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

/**
 * The sequence column in the audit list: the header's own label — `Seq #`, five
 * monospaced characters — plus the gap that separates the two columns.
 *
 * Sized to the label rather than to the digits, because a column has to fit its
 * widest cell: the digits only ever fill a sixth of it, and the empty rest is
 * what the eye reads as the column's gap. The header and the rows share it, so
 * the events line up under the events.
 */
const COL_SEQ = "w-[64em] shrink-0"

/**
 * How wide the console's panel is allowed to get.
 *
 * Wider than the artwork previews elsewhere on the site: a console is a working
 * interface with four columns of real content, and at the narrower preview width
 * it is cropping the case record's own text. `LayeredPreview`'s width is left
 * alone — those previews are pictures, and this is not.
 */
const CONSOLE_MAX_WIDTH = "max-w-5xl lg:max-w-6xl"

/** How long each view holds before the console steps to the next one. */
const DWELL_MS = 4000

/** The painting the preview sits on, behind the console in both of its tabs. */
const OVERVIEW_BACKDROP = "/assets/trace/overview_bg.svg"

/**
 * One run of console type. Floors at one design unit, so the geometry above it
 * keeps reading the artwork's numbers.
 */
export function Text({
  sizeClass = "text-[12.5em]",
  className = "",
  children,
}: Readonly<{ sizeClass?: string; className?: string; children: ReactNode }>) {
  return (
    <span className={`${sizeClass} leading-none whitespace-pre ${className}`.trim()}>{children}</span>
  )
}

/**
 * Both case panels: one height, one radius, one border.
 *
 * The height is the console's fixed vertical budget — the views above and below
 * them take what is left — so every panel is the same height whatever it holds,
 * and the views whose content nearly fills it are the ones that set the number.
 */
function Panel({
  widthClass,
  className = "",
  children,
}: Readonly<{ widthClass: string; className?: string; children: ReactNode }>) {
  return (
    <div
      className={`flex h-[434em] ${widthClass} shrink-0 flex-col rounded-[8em] border-[1em] ${PANEL_EDGE} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

/**
 * A rule, inset to the content so it stops at the padding rather than the edge.
 *
 * One CSS pixel, not one design unit. In units the line lands at whatever
 * `851` units divide into — 1.35px at a 1152px panel, 0.41px on a phone — and
 * the browser then spreads that over however many device pixels it lands on:
 * two rules at the same nominal height come out visibly different weights, one
 * sharper and darker, the next softer and lighter, because one fell on a pixel
 * boundary and the other did not. A CSS pixel is the same line every time, and
 * it is what borders everywhere else on the page already are.
 */
function Rule({ className = "" }: Readonly<{ className?: string }>) {
  return <span aria-hidden="true" className={`absolute h-px ${HAIRLINE} ${className}`.trim()} />
}

/**
 * A block of a record, ruled off from the block above it.
 *
 * Each block draws its own rule, inset to the content, so no rule is shared
 * with a neighbour or runs into the panel's edge.
 *
 * A block's height also leaves about ten units past its last row, the same
 * slack the record's blocks carry. Without it the next block's rule lands on
 * top of the text above and reads as an underline on that row rather than as a
 * divider between two blocks.
 */
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

/**
 * A block's heading, on the same row height as the label/value rows beneath it.
 *
 * It is shorter than a row of content on purpose. A heading names what follows
 * it, so the space that matters is the one above it — where the block's rule
 * separates it from the block before — and the one below should be the tightest
 * gap in the block. At a content row's height the heading floated halfway
 * between its own rule and its own value, reading as neither's.
 */
function BlockTitle({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="flex h-[16em] items-center">{children}</div>
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
      <BlockTitle>
        <Text className={BLUE}>{label}</Text>
      </BlockTitle>
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

/**
 * The band of key hints every view ends with, which differ per view. The hints
 * stay aligned to the panels' inset and sit centred in the band's height, the
 * way a status line does, rather than centred across the console.
 */
function Footer({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-[40em] shrink-0 items-center gap-[27em] px-[24em]">{children}</div>
  )
}

/** A case in the list: its number, and where it stands. */
/**
 * The case list, in the order the console shows it. Exported because the CLI
 * preview prints the same cases as a table: one list, so the two mockups can
 * never disagree about what a case is called or what state it is in. `title`
 * and `examiner` are the columns the console's own narrow list has no room for.
 */
export const CASES = [
  { id: "2026-CR-0142", title: "Exfiltration Host", examiner: "Nirjar Goswami", status: "OPEN", statusClass: GREEN, selected: true },
  { id: "2026-CR-0137", title: "Ransom Note Found", examiner: "Priya Sharma", status: "OPEN", statusClass: GREEN },
  { id: "2026-CR-0129", title: "Workstation Imaging", examiner: "Aditya Verma", status: "CLOSED", statusClass: VIOLET },
  { id: "2026-CR-0118", title: "Staging Server Sweep", examiner: "Meera Krishnan", status: "OPEN", statusClass: GREEN },
  { id: "2026-CR-0104", title: "Memory Dump Triage", examiner: "Ravi Menon", status: "OPEN", statusClass: GREEN },
  { id: "2026-CR-0091", title: "Archive Verification", examiner: "Kavya Iyer", status: "ARCHIVED", statusClass: DIM },
]

/** A drive on the bench, and what it holds. */
const DEVICES = [
  { name: "Samsung 980 PRO", size: "931.5 GB", selected: true },
  { name: "Crucial MX500", size: "1 TB" },
  { name: "WD Elements SE", size: "4 TB" },
  { name: "Kingston IronKey", size: "64 GB" },
  { name: "Seagate BarraCuda", size: "2 TB" },
  { name: "Sabrent Rocket", size: "512 GB" },
]

/** A step of the audit trail, newest first. */
const EVENTS = [
  { seq: "9", event: "Case Edited", selected: true },
  { seq: "8", event: "Case Purged" },
  { seq: "7", event: "Device Inspected" },
  { seq: "6", event: "Gate Checked" },
  { seq: "5", event: "Device Linked" },
  { seq: "4", event: "Case Updated" },
  { seq: "3", event: "Case Closed" },
  { seq: "2", event: "Case Archived" },
  { seq: "1", event: "Case Created" },
]

/**
 * What one audited change altered, and to what. `from` is absent on a creation.
 *
 * The values are the case's own: the title it now carries in the list beside,
 * the tags its record prints, and a description of what was actually imaged.
 * An audit that renames a case to something the list has never shown is an
 * audit of nothing.
 */
const CHANGES = [
  { field: "title", from: "Staging Server", to: "Staging Server Sweep" },
  { field: "tags", from: "#server", to: "#server, #memory-dump" },
  { field: "desc", from: "", to: "Disk images of three staging servers, SHA-256 verified" },
]

/** Cases: the case list, and the record of the selected case. */
function CasesView() {
  return (
    <>
      <div className="flex shrink-0 gap-[11em] px-[24em] pt-[20em]">
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
          </div>
        </Panel>

        <Panel widthClass="w-[502em]">
          <div className="h-[94.5em] shrink-0 px-[24em] pt-[24em]">
            <div className="flex h-[22em] items-center">
              <Text className={BLUE}>2026-CR-0142</Text>
            </div>
            <div className="flex h-[22em] items-center">
              <Text className={WHITE}>Exfiltration Staging Host</Text>
            </div>
            <div className="flex h-[22em] items-center">
              <Text className={GREEN}>● OPEN</Text>
            </div>
          </div>

          <Block height="h-[46em]">
            <MetaRow label="Lead Examiner" value="Nirjar Goswami" />
            <MetaRow label="Tags" value="#memory-dump #server #ransomware" />
          </Block>

          <Block height="h-[46em]">
            <MetaRow label="Opened" value="02-10-2026 09:41:12 AM IST" />
            <MetaRow label="Updated" value="05-10-2026 04:18:55 PM IST" />
          </Block>

          <Field label="DESCRIPTION" height="h-[56em]">
            <Text className={WHITE}>Memory capture of the staging host before shutdown.</Text>
          </Field>

          <Field label="LINKED DEVICE" height="h-[56em]">
            <Text className={WHITE}>Samsung_980_PRO_1TB · 931.5 GB</Text>
          </Field>

          <Field label="INTEGRITY" height="h-[57em]" indent={false}>
            <Text className={GREEN}>● Verified</Text>
          </Field>

          <Block>
            <BlockTitle>
              <Text className={BLUE}>HISTORY · 2 events</Text>
            </BlockTitle>
            <div className="mt-[7em] pl-[17em]">
              <HistoryRow at="05-10 04:18 PM" event="Device Linked" />
              <HistoryRow at="02-10 09:41 AM" event="Created" />
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

/**
 * Settings: the preferences the console keeps, and nothing else.
 *
 * It is a real tab — a person can open it and read it — but the demo does not
 * step into it on its own. A cycle that wanders into a page of preferences is
 * showing something that is not the point, so `CYCLED` stops short of it.
 */
function SettingsView() {
  return (
    <>
      <div className="flex shrink-0 gap-[11em] px-[24em] pt-[20em]">
        <Panel widthClass="w-[502em]">
          <div className="shrink-0 px-[24em] pt-[24em]">
            <div className="flex h-[22em] items-center">
              <Text className={BLUE}>Preferences</Text>
            </div>
          </div>

          <Block height="h-[120em]">
            <MetaRow label="Theme" value="Auto" />
            <MetaRow label="Timezone" value="Asia/Kolkata" />
            <MetaRow label="Hashing" value="SHA-256" />
          </Block>

          <Block height="h-[96em]">
            <MetaRow label="Imaging" value="Write-protected" />
            <MetaRow label="Evidence" value="Append only" />
          </Block>

          <Block height="h-[120em]">
            <Text className={MUTED}>Logging</Text>
            <MetaRow label="Level" value="Info" />
            <MetaRow label="Retention" value="30 days" />
          </Block>
        </Panel>

        <Panel widthClass="w-[290em]">
          <div className="shrink-0 px-[24em] pt-[24em]">
            <div className="flex h-[22em] items-center">
              <Text className={WHITE}>Version</Text>
            </div>
          </div>

          <Block height="h-[130em]">
            <MetaRow label="Trace" value="0.3.4" />
            <MetaRow label="Channel" value="stable" />
            <MetaRow label="Build" value="029dbd43" />
          </Block>

          <Block height="h-[200em]">
            <Text className={MUTED}>Licence</Text>
            <MetaRow label="Seats" value="1 of 1" />
            <MetaRow label="Renews" value="01-10-2026" />
          </Block>
        </Panel>
      </div>

      <Footer>
        <FooterKey keyName="↑↓" action="Navigate" />
        <FooterKey keyName="⏎" action="Change" />
        <FooterKey keyName="?" action="Help" />
      </Footer>
    </>
  )
}

/** Devices: the registry of drives, and the fingerprint of the selected one. */
function DevicesView() {
  return (
    <>
      <div className="flex shrink-0 gap-[11em] px-[24em] pt-[20em]">
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
          <div className="shrink-0 px-[24em] pt-[24em] pb-[5em]">
            <div className="flex h-[22em] items-center">
              <Text className={BLUE}>Samsung 980 PRO</Text>
            </div>
          </div>

          <Block height="h-[84em]">
            <MetaRow label="Node" value="Drive04" />
            <MetaRow label="Kind" value="Data" />
            <MetaRow label="Size" value="931.5 GB" />
            <MetaRow label="Model" value="Samsung SSD 980 PRO 1TB" />
          </Block>

          <Block height="h-[106em]">
            <BlockTitle>
              <Text className={BLUE}>FINGERPRINT</Text>
            </BlockTitle>
            <MetaRow label="Serial" value="5F0A_11C4_8E70_0000_009B_2D6F_1A83_4C77" />
            <MetaRow label="Interface" value="NVMe" />
            <MetaRow label="Firmware" value="2B4QFXO7" />
            <MetaRow label="Observed" value="08-10-2026 11:14:32 AM IST" />
          </Block>

          <Block height="h-[90em]">
            <BlockTitle>
              <Text className={BLUE}>CASES LINKED</Text>
            </BlockTitle>
            {["2026-CR-0142", "2026-CR-0118", "2026-CR-0091"].map((id) => (
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
      <div className="flex shrink-0 gap-[11em] px-[24em] pt-[20em]">
        <Panel widthClass="w-[290em]">
          <div className="shrink-0 px-[24em] pt-[24em]">
            <SearchField value="Search audits.." />
          </div>

          <ListHeader className="pt-[20em] pb-[14em]">
            <span className={COL_SEQ}>
              <Text className={WHITE}>Seq #</Text>
            </span>
            <Text className={WHITE}>Events · 9</Text>
          </ListHeader>

          <div className="shrink-0 px-[24em] pt-[19em]">
            {EVENTS.map((row) => (
              <ListRow key={row.seq} marker={row.selected}>
                <span className={COL_SEQ}>
                  <Text className={row.selected ? WHITE : MUTED}>{row.seq}</Text>
                </span>
                <Text className={row.selected ? WHITE : MUTED}>{row.event}</Text>
              </ListRow>
            ))}
          </div>
        </Panel>

        <Panel widthClass="w-[502em]">
          <div className="shrink-0 px-[24em] pt-[24em] pb-[5em]">
            <div className="flex h-[22em] items-center gap-[7em]">
              <Text className={BLUE}>#9</Text>
              <Text className={WHITE}>Case Edited</Text>
            </div>
          </div>

          <Block height="h-[84em]">
            <MetaRow label="Case" value="2026-CR-0118" />
            <MetaRow label="Actor" value="Nirjar Goswami" />
            <MetaRow label="Timestamp" value="06-10-2026 02:07:44 PM IST" />
            <MetaRow label="Event" value="CASE_EDITED" />
          </Block>

          <Block height="h-[162em]">
            <BlockTitle>
              <Text className={BLUE}>CHANGES · {CHANGES.length}</Text>
            </BlockTitle>
            {CHANGES.map((change) => (
              <div key={change.field}>
                <div className="flex h-[18em] items-center">
                  <Text className={MUTED}>{change.field}</Text>
                </div>
                <div className="flex h-[22em] items-center gap-[10em] pl-[17em]">
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

          <Field label="INTEGRITY" height="h-[64em]">
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
  { label: "Settings", view: <SettingsView /> },
]

/**
 * How many of them the demo steps through on its own.
 *
 * Settings is a real tab with a real view, but it is not part of the tour: a
 * cycle that wanders into a page of preferences is showing something that is
 * not the point. The count is stated here rather than read off `VIEWS`, so
 * adding a tab cannot quietly pull it into the cycle — the next one joins the
 * tour by raising this number on purpose.
 */
const CYCLED = 3

const CYCLE_MS = DWELL_MS * CYCLED

/**
 * The console's own tabs, with the selection marked by an underline rather than
 * a filled pill. The underline is one element measured against the active
 * label, so a step slides it across instead of blinking it from one tab to the
 * next; `SLIDE` and `TINT` are the same motion the interface switcher uses.
 *
 * The labels' own top padding is what sets the gap between them and the rule:
 * the row is shorter than it was, so the labels sit higher in it and keep the
 * same air underneath. The row's height is where the rule and the underline
 * land, and the panels row compensates so nothing under the rule moves. The
 * gap between the labels is the same 24 units the row is inset by, so the tabs
 * read as one evenly spaced row rather than a run of words.
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
      className="relative flex h-[33em] shrink-0 items-start gap-[24em] px-[24em] pt-[10em]"
    >
      <Rule className="bottom-0 left-[24em] right-[24em]" />
      {VIEWS.map((view, index) => (
        <span
          key={view.label}
          data-tab
          className={`${index === active ? WHITE : MUTED} ${TINT}`}
        >
          <Text sizeClass="text-[12em]">{view.label}</Text>
        </span>
      ))}
      <span
        aria-hidden="true"
        style={{ transform: `translateX(${underline.left}px)`, width: underline.width }}
        className={`pointer-events-none absolute bottom-0 left-0 h-[2em] bg-[#f0f6fc] ${SLIDE}`}
      />
    </div>
  )
}

/**
 * The console sits a little inside its frame, centred on it.
 *
 * Scaling rather than rebuilding keeps every row, rule and inset at the
 * artwork's proportions: the height, the type and everything between them come
 * down together.
 */
const SCREEN_SCALE = "absolute inset-0 flex items-center justify-center"

/**
 * The height of either mockup's screen, in the console's units: the 33-unit tab
 * bar, the 20 the views leave under it, the 434-unit panels and the 40-unit
 * footer — 527, one unit short of the 528 the frame allows. The screen is the
 * frame: the panel's height is set by this number, not the other way round, so
 * the console has no landscape showing through it and the panel's own padding is
 * the only margin around it.
 *
 * The panels are what fix the total: they are the one part of the console with a
 * height of its own, and every view's content is sized to sit inside them.
 *
 * Exported because the terminal is the same size of interface: it is drawn in
 * the same units at the same scale, and the two tabs are meant to be read as one
 * program seen two ways.
 */
export const SCREEN_HEIGHT = "h-[528em]"

/** The console's own screen: its tabs, and all the views stacked in one cell. */
function ConsoleScreen({ active }: Readonly<{ active: number }>) {
  return (
    <div className={SCREEN_SCALE}>
      <div
        className={`console-screen relative w-full shrink-0 scale-95 overflow-hidden rounded-[15em] bg-[#0c0c0c] font-mono text-[#f0f6fc] ${SCREEN_HEIGHT} flex flex-col`}
      >
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
  )
}

/**
 * The panel a Trace mockup sits in, and the frame inside it.
 *
 * The box, its mobile height ladder, the frame and the mobile inset are the
 * ones `LayeredPreview` reserved, taken from it so no two previews can disagree
 * about the space they hold. Below `sm` the crop is the artwork's as well: the
 * mockup keeps its full size and the panel stops showing the part that no
 * longer fits, anchored left.
 *
 * The frame is also the container the mockup measures itself against — whatever
 * lands inside it can be written in the artwork's own units. Its proportions are
 * this panel's own: `528` of the `851` units wide is the console's height, so the
 * panel is exactly as tall as the screen it holds.
 *
 * It carries an image role and a label rather than exposing its own text,
 * matching how the artwork previews read to assistive tech: a mockup is a
 * picture of an interface, and the panel's description is what says what it
 * does.
 */
export function ConsolePreviewBox({
  ariaLabel,
  rootRef,
  children,
}: Readonly<{ ariaLabel: string; rootRef?: Ref<HTMLDivElement>; children: ReactNode }>) {
  return (
    <div
      ref={rootRef}
      className={`relative w-full select-none ${CONSOLE_MAX_WIDTH} mx-auto overflow-hidden rounded-[20px] squircle bg-ink/10 ${PREVIEW_MOBILE_HEIGHT}`}
    >
      {/*
       * The painting the console sits on. It is the panel's own backdrop, so it
       * shows in the frame's inset on either side of the screen rather than
       * behind it, and the mockup reads as a window laid over a landscape
       * rather than a screenshot on a grey card.
       *
       * The `bg-ink/10` above stays: it is what shows for the moment before the
       * image arrives, and the panel keeps a surface whichever way the section
       * behind it is painted.
       */}
      <img
        src={withAssetHash(OVERVIEW_BACKDROP)}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-[50%_45%]"
      />

      <div
        className={`absolute ${PREVIEW_MOBILE_PADDING} pointer-events-none flex w-auto items-center justify-start sm:relative sm:inset-auto sm:block sm:w-full ${PREVIEW_FRAME_CLASS}`}
      >
        <div
          role="img"
          aria-label={ariaLabel}
          className="console-frame relative aspect-[851/528] h-full w-auto shrink-0 sm:h-auto sm:w-full"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * The console's own cycle: attach the returned ref to the mockup's root and
 * read back the view it is showing.
 */
function useConsoleCycle() {
  const { ref, elapsed } = useLoopingTimeline<HTMLDivElement>(CYCLE_MS)
  return { ref, active: Math.floor(elapsed / DWELL_MS) % VIEWS.length }
}

/**
 * The console standing in for itself in the interface switcher: the panel the
 * reserved box holds, with the console inside it at the artwork's size instead
 * of a background scene behind it.
 *
 * The console also demonstrates itself. The cycle is decoration on top of the
 * picture the panel describes.
 */
export function TraceConsole() {
  const { ref, active } = useConsoleCycle()

  return (
    <ConsolePreviewBox
      rootRef={ref}
      ariaLabel="Trace console cycling through the case list, the device registry, and the audit trail"
    >
      <ConsoleScreen active={active} />
    </ConsolePreviewBox>
  )
}
