"use client";

import { useState } from "react";
import Link from "next/link";
import { MAILTO } from "@/lib/email";

const columns = [
  {
    title: "Works",
    links: [
      { label: "Bastion", href: "/works/bastion" },
      { label: "Kost", href: "/works/kost" },
      { label: "HookDrop", href: "/works/hookdrop" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/nirjxr26", external: true },
      { label: "LinkedIn", href: "https://linkedin.com/in/nirjxr", external: true },
      { label: "Twitter", href: "https://x.com/nirjxrgoswami", external: true },
      { label: "Blog", href: "https://blog.nirjar.me/", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Home", href: "/" },
      { label: "Articles", href: "https://blog.nirjar.me/", external: true },
      { label: "Resume", href: "/nirjar_resume.pdf", external: true },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "nirjargoswami2626@gmail.com", href: MAILTO },
      { label: "+91 87991 42626", href: "tel:+918799142626" },
    ],
    note: "Ahmedabad, Gujarat, India",
  },
];

function MobileAccordion({ col, isLast }: { col: typeof columns[number]; isLast?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={isLast ? "" : "border-b border-white/[0.04]"}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left cursor-pointer"
      >
        <h3 className="text-sm font-medium text-foreground font-sans">{col.title}</h3>
        <svg
          className={`w-4 h-4 text-secondary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="space-y-2 pb-3">
          {col.links.map((link) => (
            <li key={link.label}>
              {link.href.startsWith("/") || !("external" in link && link.external) ? (
                <Link href={link.href} className="text-sm text-secondary hover:text-foreground transition-colors font-sans pl-2">
                  {link.label}
                </Link>
              ) : (
                <a href={link.href} target="_blank" rel="noreferrer" className="text-sm text-secondary hover:text-foreground transition-colors font-sans pl-2">
                  {link.label}
                </a>
              )}
            </li>
          ))}
          {"note" in col && col.note && (
            <p className="text-xs text-secondary/50 font-sans mt-2 pl-2">{col.note}</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full md:border-t border-white/[0.04]">
      <div className="px-6 md:px-12 lg:px-16 max-w-5xl mx-auto py-8 md:py-12">
        {/* Mobile: accordion */}
        <div className="md:hidden">
          {columns.map((col, i) => (
            <MobileAccordion key={col.title} col={col} isLast={i === columns.length - 1} />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-8 text-left">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold text-foreground mb-3 font-sans">{col.title}</h3>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") || !("external" in link && link.external) ? (
                      <Link href={link.href} className="text-sm text-secondary hover:text-foreground transition-colors font-sans">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noreferrer" className="text-sm text-secondary hover:text-foreground transition-colors font-sans">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              {"note" in col && col.note && (
                <p className="text-xs text-secondary/50 font-sans mt-2">{col.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/[0.04] px-6 py-5">
        <p className="text-[11px] text-secondary/50 font-sans text-center">
          © {new Date().getFullYear()} Nirjar Goswami. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
