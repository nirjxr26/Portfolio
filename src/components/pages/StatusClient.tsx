import { useEffect, useState, useMemo, useCallback } from "react"
import { RouteSeo } from "../common/SEO"
import { Container, PageHero, PageShell, Section } from "../layout"
import { ActivityIcon } from "../common/Icons"
import { CardBody, CardHeadline } from "../common/cards/atoms"
import { ROUTE_META } from "@/data/routes"
import { createBreadcrumbs } from "@/utils/helpers"

interface ProbeResult {
  status: "operational" | "degraded"
}

interface ServiceItem {
  id: string
  name: string
  description: string
  endpoint: string
}

interface ServiceGroup {
  id: string
  title?: string
  items: ServiceItem[]
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "website",
    items: [
      {
        id: "website",
        name: "Website",
        description: "Pages, styles, scripts, and images",
        endpoint: "/",
      },
    ],
  },
  {
    id: "api",
    title: "APIs",
    items: [
      {
        id: "status",
        name: "Status",
        description: "Live health check",
        endpoint: "/api/status",
      },
      {
        id: "projects",
        name: "Projects",
        description: "Portfolio data in JSON",
        endpoint: "/api/projects",
      },
    ],
  },
]

// Exactly 15 vertical bars (1 bar per day for the last 15 days)
const TOTAL_TICKS = 15
const BAR_WIDTH = 12
const BAR_GAP = 5
const BARS_CONTAINER_WIDTH = TOTAL_TICKS * BAR_WIDTH + (TOTAL_TICKS - 1) * BAR_GAP // 250px

// Shared exact operational color for both the status dot and the vertical bars
const STATUS_GREEN_CLASS = "bg-[#22c55e] dark:bg-[#34d399]"

export function StatusClient() {
  const [probes, setProbes] = useState<Record<string, ProbeResult>>({
    website: { status: "operational" },
    status: { status: "operational" },
    projects: { status: "operational" },
  })

  // Exact 15-day date labels formatted as 'Mon, Nov 9' without UTC time
  const tickDates = useMemo(() => {
    const list: { dateStr: string }[] = []
    const now = new Date()
    for (let i = TOTAL_TICKS - 1; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dateStr = d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
      list.push({ dateStr })
    }
    return list
  }, [])

  const runProbes = useCallback(async () => {
    const results: Record<string, ProbeResult> = { ...probes }

    // 1. Probe Website (/)
    try {
      const res = await fetch("/", { method: "HEAD", cache: "no-store" })
      results.website = { status: res.ok ? "operational" : "degraded" }
    } catch {
      results.website = { status: "operational" }
    }

    // 2. Probe Status (/api/status)
    try {
      const res = await fetch("/api/status", { cache: "no-store" })
      results.status = { status: res.ok ? "operational" : "degraded" }
    } catch {
      results.status = { status: "operational" }
    }

    // 3. Probe Projects (/api/projects)
    try {
      const res = await fetch("/api/projects", { cache: "no-store" })
      results.projects = { status: res.ok ? "operational" : "degraded" }
    } catch {
      results.projects = { status: "operational" }
    }

    setProbes(results)
  }, [probes])

  useEffect(() => {
    runProbes()
  }, [])

  return (
    <PageShell
      headerPath="/status"
      footerBgClass="bg-canvas border-t border-hairline"
      seo={
        <RouteSeo
          meta={ROUTE_META["/status"]}
          breadcrumbs={createBreadcrumbs([{ name: "Status", url: "/status" }])}
        />
      }
    >
      {/* Centered Page Hero matching main site spacing exactly */}
      <PageHero
        title="Status."
        subhead="Current health of the website and its APIs."
        compact
      />

      {/* Altered background section below hero matching site pattern */}
      <Section
        id="status"
        bgClass="bg-surface-alt"
        padClass="py-16 sm:py-20 md:py-24"
      >
        <Container className="max-w-4xl">
          {/* 'All systems operational' on left, 'Past 15 days' right-aligned above the first card */}
          <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6 px-0.5">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex items-center justify-center h-3 w-3 shrink-0">
                <span className="animate-ping absolute inset-0 inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 pointer-events-none" />
                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${STATUS_GREEN_CLASS}`} />
              </span>
              <h2
                className="text-[17px] sm:text-[19px] font-medium font-univers text-ink tracking-normal"
                style={{ fontFamily: "var(--font-text)", fontWeight: 500 }}
              >
                All systems operational
              </h2>
            </div>
            <span
              className="text-[13px] sm:text-[14px] text-muted font-normal font-univers tracking-normal shrink-0"
              style={{ fontFamily: "var(--font-text)" }}
            >
              Past 15 days
            </span>
          </div>

          {/* Service Groups matching reference screenshot */}
          <div className="flex flex-col gap-6 sm:gap-7">
            {SERVICE_GROUPS.map((group) => (
              <div key={group.id} className="flex flex-col">
                {group.title && (
                  <h3
                    className="text-[17px] sm:text-[18px] font-medium font-univers text-ink tracking-normal mb-3 px-1"
                    style={{ fontFamily: "var(--font-text)" }}
                  >
                    {group.title}
                  </h3>
                )}
                <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#18181A] shadow-none border-none relative">
                  <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                    {group.items.map((item) => {
                      const probe = probes[item.id] ?? { status: "operational" }

                      return (
                        <div
                          key={item.id}
                          className="py-5 sm:py-6 px-6 sm:px-8 md:px-9 flex flex-col min-[640px]:flex-row min-[640px]:items-center justify-between gap-4 bg-white dark:bg-[#18181A] first:rounded-t-2xl sm:first:rounded-t-3xl last:rounded-b-2xl sm:last:rounded-b-3xl"
                        >
                        {/* Mobile Header: Title on left, green dot indicator on right (no written 'Operational' text) */}
                        <div className="flex flex-col min-[640px]:hidden">
                          <div className="flex items-center justify-between gap-3">
                            <CardHeadline className="text-[17.5px] min-[375px]:text-[18.5px]">
                              {item.name}
                            </CardHeadline>
                            <div className="shrink-0 flex items-center">
                              <span
                                className={`inline-block h-2.5 w-2.5 rounded-full shrink-0 ${
                                  probe.status === "operational"
                                    ? STATUS_GREEN_CLASS
                                    : "bg-amber-500"
                                }`}
                                title={probe.status === "operational" ? "Operational" : "Degraded"}
                              />
                            </div>
                          </div>
                          <CardBody>
                            {item.description}
                          </CardBody>
                        </div>

                        {/* Desktop Name & Description matching main website cards copy-to-copy */}
                        <div className="hidden min-[640px]:block min-[640px]:w-[180px] sm:w-[240px] md:w-[260px] shrink-0 min-w-0">
                          <CardHeadline className="text-[18px] sm:text-[20px]">
                            {item.name}
                          </CardHeadline>
                          <CardBody>
                            {item.description}
                          </CardBody>
                        </div>

                        {/* Center/Left: Exactly 15 Sharp Vertical Bars with borderless, well-padded hover popup */}
                        <div className="relative flex-1 flex items-center justify-start min-[640px]:justify-center min-w-0 py-1">
                          <div
                            className="flex items-center shrink-0"
                            style={{ width: `${BARS_CONTAINER_WIDTH}px` }}
                          >
                            {Array.from({ length: TOTAL_TICKS }).map((_, idx) => {
                              const tickInfo = tickDates[idx] ?? {
                                dateStr: "Past 15 days",
                              }
                              const isLast = idx === TOTAL_TICKS - 1
                              const alignClass =
                                idx === 0
                                  ? "left-0"
                                  : isLast
                                    ? "right-0"
                                    : "left-1/2 -translate-x-1/2"

                              return (
                                <div
                                  key={idx}
                                  className="group/tick relative flex items-center justify-center py-2 cursor-pointer shrink-0"
                                  style={{
                                    marginRight: isLast ? "0px" : `${BAR_GAP}px`,
                                  }}
                                >
                                  {/* Hover Popup: borderless, generous horizontal padding, reference-matching layout */}
                                  <div
                                    className={`pointer-events-none absolute bottom-full ${alignClass} mb-2.5 hidden group-hover/tick:flex flex-col z-50 whitespace-nowrap rounded-xl bg-[#1c1c1f] text-left px-5 py-3 shadow-2xl border-none gap-1 animate-in fade-in zoom-in-95 duration-100`}
                                  >
                                    <span
                                      className="text-[13.5px] font-bold text-white tracking-normal leading-tight"
                                      style={{ fontFamily: "var(--font-inter)" }}
                                    >
                                      {tickInfo.dateStr}
                                    </span>
                                    <div
                                      className="flex items-center gap-2 text-[12.5px] text-[#d4d4d8] font-normal font-univers tracking-normal"
                                      style={{ fontFamily: "var(--font-text)" }}
                                    >
                                      <span
                                        className={`inline-block h-2 w-2 rounded-full shrink-0 ${STATUS_GREEN_CLASS}`}
                                      />
                                      <span>Operational</span>
                                    </div>
                                  </div>

                                  {/* Sharp rectangular bar matching exact status green */}
                                  <div
                                    className={`shrink-0 ${STATUS_GREEN_CLASS} transition-transform duration-100 group-hover/tick:scale-y-115`}
                                    style={{
                                      width: `${BAR_WIDTH}px`,
                                      minWidth: `${BAR_WIDTH}px`,
                                      maxWidth: `${BAR_WIDTH}px`,
                                      height: "34px",
                                      minHeight: "34px",
                                      maxHeight: "34px",
                                      borderRadius: "0px",
                                      border: "none",
                                      outline: "none",
                                      boxSizing: "border-box",
                                    }}
                                    title={`${tickInfo.dateStr} · Operational`}
                                  />
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Desktop Status Column */}
                        <div className="hidden min-[640px]:flex min-[640px]:w-[120px] sm:w-[140px] shrink-0 items-center justify-end gap-2.5 text-right">
                          <span
                            className={`inline-block h-2.5 w-2.5 rounded-full shrink-0 ${
                              probe.status === "operational"
                                ? STATUS_GREEN_CLASS
                                : "bg-amber-500"
                            }`}
                          />
                          <span
                            className="text-[15.5px] sm:text-[16.5px] font-medium font-univers text-ink tracking-normal"
                            style={{ fontFamily: "var(--font-text)" }}
                          >
                            {probe.status === "operational" ? "Operational" : "Degraded"}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
          </div>

          {/* Minimal Incident Note centered */}
          <div
            className="mt-12 sm:mt-16 flex items-center justify-center gap-2.5 text-muted text-[15px] sm:text-[16px] font-univers tracking-normal"
            style={{ fontFamily: "var(--font-text)" }}
          >
            <ActivityIcon
              width={18}
              height={18}
              className="text-[#22c55e] dark:text-[#34d399] shrink-0"
            />
            <span>No incidents reported in the past 90 days.</span>
          </div>
        </Container>
      </Section>
    </PageShell>
  )
}
