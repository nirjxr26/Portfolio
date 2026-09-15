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
  { name: "Articles", href: "/articles", isExternal: false },
  { name: "Resume", href: SOCIAL_LINKS.resume, isExternal: true },
] as const

const WORK_LINKS = WORK_ITEMS.map((item) => ({ name: item.name, href: item.href, isExternal: false }))

interface FooterProps {
  bgClass?: string
}

interface FooterLinkItem {
  name: string
  href: string
  isExternal?: boolean
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
        <a href={SOCIAL_LINKS.email} className={`${linkClass} block truncate`}>
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
          <FooterAccordionSection
            id="works"
            title="Works"
            open={Boolean(openSections.works)}
            onToggle={toggleSection}
            headingClass={headingClass}
            iconClass={iconClass}
          >
            <FooterLinkList items={WORK_LINKS} linkClass={linkClass} />
          </FooterAccordionSection>

          <FooterAccordionSection
            id="connect"
            title="Connect"
            open={Boolean(openSections.connect)}
            onToggle={toggleSection}
            headingClass={headingClass}
            iconClass={iconClass}
          >
            <FooterLinkList items={CONNECT_LINKS} linkClass={linkClass} />
          </FooterAccordionSection>

          <FooterAccordionSection
            id="resources"
            title="Resources"
            open={Boolean(openSections.resources)}
            onToggle={toggleSection}
            headingClass={headingClass}
            iconClass={iconClass}
          >
            <FooterLinkList items={RESOURCE_LINKS} linkClass={linkClass} />
          </FooterAccordionSection>

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
          <FooterColumn title="Works" headingClass={headingClass}>
            <FooterLinkList items={WORK_LINKS} linkClass={linkClass} listClassName="space-y-2.5 text-[15px]" />
          </FooterColumn>

          <FooterColumn title="Connect" headingClass={headingClass}>
            <FooterLinkList items={CONNECT_LINKS} linkClass={linkClass} listClassName="space-y-2.5 text-[15px]" />
          </FooterColumn>

          <FooterColumn title="Resources" headingClass={headingClass}>
            <FooterLinkList items={RESOURCE_LINKS} linkClass={linkClass} listClassName="space-y-2.5 text-[15px]" />
          </FooterColumn>

          <FooterColumn title="Contact" headingClass={headingClass}>
            <FooterContactList linkClass={linkClass} subtextClass={subtextClass} listClassName="space-y-2.5 text-[15px]" />
          </FooterColumn>
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
