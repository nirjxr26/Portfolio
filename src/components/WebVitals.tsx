"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useCallback, useRef } from "react";

const labels: Record<string, string> = {
  LCP: "Largest Contentful Paint",
  FCP: "First Contentful Paint",
  CLS: "Cumulative Layout Shift",
  INP: "Interaction to Next Paint",
  TTFB: "Time to First Byte",
};

const thresholds: Record<string, { good: number; poor: number; unit: string }> = {
  LCP: { good: 2500, poor: 4000, unit: "ms" },
  FCP: { good: 1800, poor: 3000, unit: "ms" },
  CLS: { good: 0.1, poor: 0.25, unit: "" },
  INP: { good: 200, poor: 500, unit: "ms" },
  TTFB: { good: 800, poor: 1800, unit: "ms" },
};

const colors = {
  good: "#22c55e",
  "needs-improvement": "#eab308",
  poor: "#ef4444",
};

function formatValue(name: string, value: number) {
  const t = thresholds[name];
  if (!t) return String(value);
  return t.unit ? `${Math.round(value)} ${t.unit}` : value.toFixed(3);
}

function logMetric(name: string, value: number, rating: string) {
  const label = labels[name] || name;
  const formatted = formatValue(name, value);
  const color = colors[rating as keyof typeof colors] || "#888";
  console.log(
    `%c⚡ ${label}: %c${formatted} %c(${rating})`,
    "color:#a1a1aa;font-weight:500",
    `color:${color};font-weight:700`,
    "color:#71717a;font-size:11px"
  );
}

const needed = new Set(["LCP", "FCP", "CLS", "INP", "TTFB"]);
const collected: Record<string, { value: number; rating: string }> = {};

function logSummary() {
  const allGood = Object.values(collected).every((m) => m.rating === "good");
  const icon = allGood ? "🎉" : "📊";
  const headline = allGood
    ? "All Core Web Vitals passed"
    : "Core Web Vitals — improvements available";

  console.log(`\n${icon}  %c${headline}`, "font-weight:600;font-size:14px");

  for (const name of ["LCP", "FCP", "CLS", "INP", "TTFB"]) {
    const m = collected[name];
    if (!m) continue;
    const label = labels[name] || name;
    const formatted = formatValue(name, m.value);
    const color = colors[m.rating as keyof typeof colors] || "#888";
    const bar =
      m.rating === "good"
        ? "🟢"
        : m.rating === "needs-improvement"
          ? "🟡"
          : "🔴";
    console.log(
      `  ${bar}  %c${label.padEnd(30)}%c${formatted.padStart(12)}`,
      "color:#a1a1aa",
      `color:${color};font-weight:600`
    );
  }
  console.log("");
}

export function WebVitals() {
  const reported = useRef(false);

  useReportWebVitals(
    useCallback((metric: any) => {
      const { name, value, rating } = metric;
      if (!name || value === undefined || !rating) return;

      logMetric(name, value, rating);
      collected[name] = { value, rating };
      needed.delete(name);

      if (!reported.current && needed.size === 0) {
        reported.current = true;
        logSummary();
      }
    }, [])
  );

  return null;
}
