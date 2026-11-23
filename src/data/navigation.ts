export const SOCIAL_LINKS = {
  github: "https://github.com/nirjxr26",
  linkedin: "https://www.linkedin.com/in/nirjxr",
  twitter: "https://x.com/nirjxrgoswami",
  instagram: "https://instagram.com/nirjar_goswami",
  email: "mailto:nirjargoswami2626@gmail.com",
  emailAddress: "nirjargoswami2626@gmail.com",
  resume: "/resume.pdf",
} as const

export const WORK_ITEMS = [
  { name: "Trace", href: "/works/trace" },
  { name: "Bastion", href: "/works/bastion" },
  { name: "Kost", href: "/works/kost" },
  { name: "HookDrop", href: "/works/hookdrop" },
] as const

export interface NavLink {
  label: string
  href: string
  external?: boolean
  expandable?: boolean
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Works", href: "/works", expandable: true },
  { label: "Articles", href: "/articles" },
  { label: "Resume", href: SOCIAL_LINKS.resume, external: true },
  { label: "Contact", href: "/#footer" },
]

export interface FooterLinkItem {
  name: string
  href: string
}

export const CONTACT = {
  emailHref: SOCIAL_LINKS.email,
  emailAddress: SOCIAL_LINKS.emailAddress,
  phoneHref: "tel:+918799142626",
  phoneLabel: "+91 87991 42626",
  location: "Ahmedabad, Gujarat, India",
} as const
