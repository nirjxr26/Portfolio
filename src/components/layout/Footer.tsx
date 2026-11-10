import { useState } from "react"
import {
  CONTACT,
  FOOTER_CONNECT,
  FOOTER_RESOURCES,
  WORK_ITEMS,
  type FooterLinkItem,
} from "@/data/navigation"
import { AppLink } from "../common/Button"
import { ChevronDown } from "../common/Icons"
import { Container } from "./Container"

const BOTTOM_LEGAL_LINKS: readonly FooterLinkItem[] = [
  { name: "Legal", href: "/legal" },
  { name: "Sitemap", href: "/sitemap" },
  { name: "Blog RSS", href: "/rss.xml" },
]

interface FooterProps {
  bgClass?: string
}

function FooterLinkList({
  items,
  linkClass,
  listClassName = "pb-3.5 space-y-2.5 text-sm",
}: Readonly<{ items: readonly FooterLinkItem[]; linkClass: string; listClassName?: string }>) {
  return (
    <ul className={listClassName}>
      {items.map((item) => (
        <li key={item.name}>
          <AppLink href={item.href} className={linkClass}>
            {item.name}
          </AppLink>
        </li>
      ))}
    </ul>
  )
}

function FooterContactList({
  linkClass,
  subtextClass,
  listClassName = "pb-3.5 space-y-2.5 text-sm",
}: Readonly<{ linkClass: string; subtextClass: string; listClassName?: string }>) {
  return (
    <ul className={listClassName}>
      <li>
        <a href={CONTACT.emailHref} className={`${linkClass} block truncate`}>
          {CONTACT.emailAddress}
        </a>
      </li>
      <li>
        <a href={CONTACT.phoneHref} className={linkClass}>
          {CONTACT.phoneLabel}
        </a>
      </li>
      <li className={subtextClass}>{CONTACT.location}</li>
    </ul>
  )
}

function FooterAccordionSection({
  id,
  title,
  open,
  onToggle,
  headingClass,
  iconClass,
  children,
}: Readonly<{
  id: string
  title: string
  open: boolean
  onToggle: (id: string) => void
  headingClass: string
  iconClass: string
  children: React.ReactNode
}>) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onToggle(id)}
        className={`flex w-full items-center justify-between py-3.5 text-left text-sm ${headingClass}`}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown className={`transition-transform duration-200 ${iconClass} ${open ? "rotate-180" : ""}`} />
      </button>
      {open && children}
    </div>
  )
}

function FooterColumn({
  title,
  headingClass,
  children,
}: Readonly<{ title: string; headingClass: string; children: React.ReactNode }>) {
  return (
    <div>
      <h4 className={`text-base mb-4 ${headingClass}`}>{title}</h4>
      {children}
    </div>
  )
}

export function Footer({ bgClass = "bg-surface-alt" }: Readonly<FooterProps>) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const sections: ReadonlyArray<{ id: string; title: string; items: readonly FooterLinkItem[] }> = [
    { id: "works", title: "Works", items: WORK_ITEMS },
    { id: "connect", title: "Connect", items: FOOTER_CONNECT },
    { id: "resources", title: "Resources", items: FOOTER_RESOURCES },
  ]

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const headingClass = "text-ink font-semibold"
  const linkClass = "text-muted hover:text-ink transition-colors"
  const subtextClass = "text-muted-soft"
  const divideClass = "divide-hairline"
  const borderClass = "border-hairline"
  const iconClass = "text-muted"

  return (
    <footer id="footer" className={`${bgClass} pt-8 pb-8 sm:pt-16 sm:pb-12 border-t-0`}>
      <Container>
        {/* Mobile Accordion View (< 640px) */}
        <div className={`block sm:hidden divide-y ${divideClass}`}>
          {sections.map((section) => (
            <FooterAccordionSection
              key={section.id}
              id={section.id}
              title={section.title}
              open={Boolean(openSections[section.id])}
              onToggle={toggleSection}
              headingClass={headingClass}
              iconClass={iconClass}
            >
              <FooterLinkList items={section.items} linkClass={linkClass} />
            </FooterAccordionSection>
          ))}

          <FooterAccordionSection
            id="contact"
            title="Contact"
            open={Boolean(openSections.contact)}
            onToggle={toggleSection}
            headingClass={headingClass}
            iconClass={iconClass}
          >
            <FooterContactList linkClass={linkClass} subtextClass={subtextClass} />
          </FooterAccordionSection>
        </div>

        {/* Desktop / Tablet 4-Column Layout (>= 640px) */}
        <div className="hidden sm:grid sm:grid-cols-4 sm:gap-8">
          {sections.map((section) => (
            <FooterColumn key={section.id} title={section.title} headingClass={headingClass}>
              <FooterLinkList items={section.items} linkClass={linkClass} listClassName="space-y-2.5 text-[15px]" />
            </FooterColumn>
          ))}

          <FooterColumn title="Contact" headingClass={headingClass}>
            <FooterContactList linkClass={linkClass} subtextClass={subtextClass} listClassName="space-y-2.5 text-[15px]" />
          </FooterColumn>
        </div>

        {/* Bottom Copyright & Legal Links (Apple-style) */}
        <div className={`mt-8 pt-6 sm:mt-10 sm:pt-6 border-t ${borderClass} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 text-xs sm:text-[12px] font-normal ${subtextClass}`}>
          <div className="shrink-0">
            Copyright &copy; {new Date().getFullYear()} Nirjar Goswami. All rights reserved.
          </div>
          <ul className="flex flex-wrap items-center gap-y-1 sm:justify-end">
            {BOTTOM_LEGAL_LINKS.map((link, idx) => (
              <li key={link.name} className="flex items-center">
                {idx > 0 && (
                  <span className="px-2 sm:px-2.5 text-muted-soft/40 select-none" aria-hidden="true">
                    |
                  </span>
                )}
                <AppLink
                  href={link.href}
                  className="hover:text-ink hover:underline transition-colors"
                >
                  {link.name}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
