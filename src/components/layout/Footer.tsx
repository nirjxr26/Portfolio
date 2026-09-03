import { useState } from "react"
import { SOCIAL_LINKS, WORK_ITEMS } from "@/data/navigation"
import { ChevronDown } from "../common/Icons"
import { Container } from "./Container"

const CONNECT_LINKS = [
  { name: "GitHub", href: SOCIAL_LINKS.github, isExternal: true },
  { name: "LinkedIn", href: SOCIAL_LINKS.linkedin, isExternal: true },
  { name: "X (Twitter)", href: SOCIAL_LINKS.twitter, isExternal: true },
  { name: "Instagram", href: SOCIAL_LINKS.instagram, isExternal: true },
  { name: "Blog", href: SOCIAL_LINKS.blog, isExternal: true },
] as const

const RESOURCE_LINKS = [
  { name: "Home", href: "/", isExternal: false },
  { name: "Articles", href: "/#articles", isExternal: false },
  { name: "Resume", href: SOCIAL_LINKS.resume, isExternal: true },
] as const

interface FooterProps {
  bgClass?: string
}

export function Footer({ bgClass = "bg-surface-alt" }: FooterProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const isBlackBg = bgClass.includes("bg-black")
  const headingClass = isBlackBg ? "text-white font-semibold" : "text-ink font-semibold"
  const linkClass = isBlackBg ? "text-neutral-400 hover:text-white transition-colors" : "text-muted hover:text-ink transition-colors"
  const subtextClass = isBlackBg ? "text-neutral-500" : "text-muted/80"
  const divideClass = isBlackBg ? "divide-neutral-800" : "divide-muted/15"
  const borderClass = isBlackBg ? "border-neutral-800" : "border-muted/15"
  const iconClass = isBlackBg ? "text-neutral-400" : "text-muted"

  return (
    <footer id="footer" className={`${bgClass} pt-8 pb-8 sm:pt-16 sm:pb-12 border-t-0`}>
      <Container>
        {/* Mobile Accordion View (< 640px) */}
        <div className={`block sm:hidden divide-y ${divideClass}`}>
          {/* Section 1: Works */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("works")}
              className={`flex w-full items-center justify-between py-3.5 text-left text-sm ${headingClass}`}
              aria-expanded={Boolean(openSections.works)}
            >
              <span>Works</span>
              <ChevronDown
                className={`transition-transform duration-200 ${iconClass} ${openSections.works ? "rotate-180" : ""}`}
              />
            </button>
            {openSections.works && (
              <ul className="pb-3.5 space-y-2.5 text-sm">
                {WORK_ITEMS.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className={linkClass}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Section 2: Connect */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("connect")}
              className={`flex w-full items-center justify-between py-3.5 text-left text-sm ${headingClass}`}
              aria-expanded={Boolean(openSections.connect)}
            >
              <span>Connect</span>
              <ChevronDown
                className={`transition-transform duration-200 ${iconClass} ${openSections.connect ? "rotate-180" : ""}`}
              />
            </button>
            {openSections.connect && (
              <ul className="pb-3.5 space-y-2.5 text-sm">
                {CONNECT_LINKS.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={linkClass}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Section 3: Resources */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("resources")}
              className={`flex w-full items-center justify-between py-3.5 text-left text-sm ${headingClass}`}
              aria-expanded={Boolean(openSections.resources)}
            >
              <span>Resources</span>
              <ChevronDown
                className={`transition-transform duration-200 ${iconClass} ${openSections.resources ? "rotate-180" : ""}`}
              />
            </button>
            {openSections.resources && (
              <ul className="pb-3.5 space-y-2.5 text-sm">
                {RESOURCE_LINKS.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noreferrer noopener" : undefined}
                      className={linkClass}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Section 4: Contact */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("contact")}
              className={`flex w-full items-center justify-between py-3.5 text-left text-sm ${headingClass}`}
              aria-expanded={Boolean(openSections.contact)}
            >
              <span>Contact</span>
              <ChevronDown
                className={`transition-transform duration-200 ${iconClass} ${openSections.contact ? "rotate-180" : ""}`}
              />
            </button>
            {openSections.contact && (
              <ul className="pb-3.5 space-y-2.5 text-sm">
                <li>
                  <a
                    href={SOCIAL_LINKS.email}
                    className={`${linkClass} block truncate`}
                  >
                    {SOCIAL_LINKS.emailAddress}
                  </a>
                </li>
                <li>
                  <a href="tel:+918799142626" className={linkClass}>
                    +91 87991 42626
                  </a>
                </li>
                <li className={subtextClass}>Ahmedabad, Gujarat, India</li>
              </ul>
            )}
          </div>
        </div>

        {/* Desktop / Tablet 4-Column Layout (>= 640px) */}
        <div className="hidden sm:grid sm:grid-cols-4 sm:gap-8">
          {/* Column 1: Works */}
          <div>
            <h4 className={`text-base mb-4 ${headingClass}`}>Works</h4>
            <ul className="space-y-2.5 text-[15px]">
              {WORK_ITEMS.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className={linkClass}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Connect */}
          <div>
            <h4 className={`text-base mb-4 ${headingClass}`}>Connect</h4>
            <ul className="space-y-2.5 text-[15px]">
              {CONNECT_LINKS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={linkClass}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className={`text-base mb-4 ${headingClass}`}>Resources</h4>
            <ul className="space-y-2.5 text-[15px]">
              {RESOURCE_LINKS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noreferrer noopener" : undefined}
                    className={linkClass}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className={`text-base mb-4 ${headingClass}`}>Contact</h4>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <a
                  href={SOCIAL_LINKS.email}
                  className={`${linkClass} block truncate`}
                >
                  {SOCIAL_LINKS.emailAddress}
                </a>
              </li>
              <li>
                <a href="tel:+918799142626" className={linkClass}>
                  +91 87991 42626
                </a>
              </li>
              <li className={subtextClass}>Ahmedabad, Gujarat, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Divider & Centered Legal Text */}
        <div className={`mt-8 pt-6 sm:mt-12 sm:pt-8 border-t ${borderClass} text-center`}>
          <p className={`text-xs sm:text-[13px] font-normal ${subtextClass}`}>
            &copy; 2026 Nirjar Goswami. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
