"use client";

import { useEffect, useState, useRef } from "react";

type Heading = { id: string; text: string; level: number };

export default function DocsTableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const article = document.getElementById("note-content");
    if (!article) return;
    const items = Array.from(article.querySelectorAll<HTMLElement>("h2, h3, h4")).map((heading, index) => {
      const fallback = heading.textContent?.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-") || `section-${index + 1}`;
      heading.id ||= fallback;
      heading.style.scrollMarginTop = "7rem";
      return { id: heading.id, text: heading.textContent?.trim() || "Untitled section", level: Number(heading.tagName.slice(1)) };
    });
    setHeadings(items);
    setActiveId(items[0]?.id || "");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActiveId(visible.target.id);
    }, { rootMargin: "-18% 0px -70% 0px", threshold: 0 });
    items.forEach(({ id }) => document.getElementById(id) && observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, []);

  if (!headings.length) return null;
  return <aside className="fixed inset-y-0 right-0 hidden w-[18rem] border-l border-white/[0.06] bg-background/95 pb-8 pt-28 xl:block"><div className="px-7"><p className="mb-4 text-xs font-medium text-foreground">In this article</p><nav aria-label="Table of contents" className="border-l border-white/[0.08]">{headings.map((heading) => <a key={heading.id} href={`#${heading.id}`} onClick={(event) => { event.preventDefault(); document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); window.history.replaceState(null, "", `#${heading.id}`); }} className={`-ml-px block border-l py-1.5 text-xs leading-snug transition-colors ${heading.level === 2 ? "pl-4" : heading.level === 3 ? "pl-7" : "pl-10"} ${activeId === heading.id ? "border-[#F54E00] text-foreground" : "border-transparent text-secondary hover:text-foreground"}`}>{heading.text}</a>)}</nav></div></aside>;
}
