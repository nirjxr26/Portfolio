"use client";

import Link from "next/link";
import { useState } from "react";
import * as Icons from "@/components/Icons";
import type { NoteMeta } from "@/lib/notes";

type DocTreeItem = {
  title: string;
  href: string;
  children?: DocTreeItem[];
};

const bastionTree: DocTreeItem[] = [
  { title: "Overview", href: "#overview" },
  {
    title: "The API Layer",
    href: "#the-api-layer",
    children: [
      { title: "Dual-path JWT delivery", href: "#dual-path-jwt-delivery" },
      { title: "Authorization", href: "#authorization-deny-beats-allow" },
      { title: "Fail-open risk scoring", href: "#fail-open-risk-scoring" },
      { title: "Refresh token rotation", href: "#refresh-token-rotation--without-family-tracking" },
      { title: "Request lifecycle", href: "#request-lifecycle-start-to-finish" },
      { title: "Where this breaks down", href: "#where-this-breaks-down" },
      { title: "Auth & Session Numbers", href: "#auth--session-numbers" },
    ],
  },
  { title: "The Database", href: "#the-database" },
  { title: "Auth System", href: "#auth-system" },
  {
    title: "Security Engine",
    href: "#the-security-engine-ml-risk-scoring",
    children: [
      { title: "Why Isolation Forest", href: "#why-isolation-forest" },
      { title: "Four features, not six", href: "#four-features-not-six" },
      { title: "Model integrity", href: "#model-integrity-and-inference" },
    ],
  },
  { title: "Frontend / Dashboard", href: "#frontend--dashboard" },
  {
    title: "Kubernetes Platform",
    href: "#kubernetes-platform",
    children: [{ title: "Default-deny allows", href: "#default-deny-then-explicit-allows" }],
  },
  { title: "CI/CD", href: "#cicd" },
  { title: "Observability", href: "#observability" },
  { title: "Scripts & Scanner", href: "#scripts-code-quality-and-the-custom-scanner" },
  { title: "Security Posture", href: "#security-posture-in-one-table" },
  { title: "By the Numbers", href: "#by-the-numbers" },
  { title: "What I'd Do Differently", href: "#what-id-do-differently-system-wide" },
];

export default function DocsNavigation({ notes }: { notes: NoteMeta[] }) {
  const [rootExpanded, setRootExpanded] = useState(true);
  const [sectionState, setSectionState] = useState<Record<string, boolean>>({
    "The API Layer": true,
    "Security Engine": true,
    "Kubernetes Platform": true,
  });
  const bastionNotes = notes
    .filter((note) => note.project.toLowerCase() === "bastion")
    .sort((a, b) => (a.part ?? 0) - (b.part ?? 0));
  const currentNote = bastionNotes[0];
  const noteHref = currentNote ? `/notes/${currentNote.slug}` : "/notes";

  const toggleSection = (title: string) => {
    setSectionState((current) => ({ ...current, [title]: !(current[title] ?? true) }));
  };

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[17.5rem] border-r border-white/[0.06] bg-background/95 pb-8 pt-24 xl:block">
      <div className="h-full overflow-y-auto px-4">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 px-2 text-xs font-mono text-secondary transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <nav aria-label="Notes navigation" className="space-y-1">
          <button
            type="button"
            onClick={() => setRootExpanded((open) => !open)}
            aria-expanded={rootExpanded}
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-white/[0.035]"
          >
            <Icons.ChevronRight
              className={`h-3.5 w-3.5 shrink-0 text-secondary transition-transform ${rootExpanded ? "rotate-90" : ""}`}
            />
            Bastion
          </button>
          {rootExpanded && currentNote && (
            <div className="ml-3 space-y-0.5 border-l border-white/[0.07] pl-3">
                  {bastionTree.map((item) => {
                    const expanded = sectionState[item.title] ?? true;
                    const hasChildren = Boolean(item.children?.length);

                    return (
                      <div key={item.href}>
                        <div className="flex items-center gap-1">
                          {hasChildren ? (
                            <button
                              type="button"
                              onClick={() => toggleSection(item.title)}
                              aria-expanded={expanded}
                              className="grid h-5 w-5 shrink-0 place-items-center rounded text-secondary transition-colors hover:bg-white/[0.045] hover:text-foreground"
                            >
                              <Icons.ChevronRight
                                className={`h-3 w-3 transition-transform ${expanded ? "rotate-90" : ""}`}
                              />
                            </button>
                          ) : (
                            <span className="h-5 w-5 shrink-0" />
                          )}
                          <Link
                            href={`${noteHref}${item.href}`}
                            className="block flex-1 rounded-md px-2 py-1.5 text-[12px] leading-snug text-secondary transition-colors hover:bg-white/[0.035] hover:text-foreground"
                          >
                            {item.title}
                          </Link>
                        </div>
                        {hasChildren && expanded && (
                          <div className="ml-7 space-y-0.5 border-l border-white/[0.045] pl-3">
                            {item.children?.map((child) => (
                              <Link
                                key={child.href}
                                href={`${noteHref}${child.href}`}
                                className="block rounded-md px-2 py-1.5 text-[11px] leading-snug text-secondary/75 transition-colors hover:bg-white/[0.035] hover:text-foreground"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
}
