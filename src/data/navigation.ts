export const SOCIAL_LINKS = {
  github: "https://github.com/nirjxr26",
  linkedin: "https://www.linkedin.com/in/nirjxr",
  twitter: "https://x.com/nirjxrgoswami",
  instagram: "https://instagram.com/nirjar_goswami",
  blog: "https://blog.nirjar.me",
  email: "mailto:nirjargoswami2626@gmail.com",
  emailAddress: "nirjargoswami2626@gmail.com",
  resume: "/assets/nirjar_resume.pdf",
} as const

export const WORK_ITEMS = [
  { name: "Bastion", href: "/works/bastion" },
  { name: "Kost", href: "/works/kost" },
  { name: "HookDrop", href: "/works/hookdrop" },
] as const

export interface FooterLinkItem {
  name: string
  href: string
}

export const FOOTER_CONNECT: FooterLinkItem[] = [
  { name: "GitHub", href: SOCIAL_LINKS.github },
  { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { name: "X (Twitter)", href: SOCIAL_LINKS.twitter },
  { name: "Instagram", href: SOCIAL_LINKS.instagram },
]

export const FOOTER_RESOURCES: FooterLinkItem[] = [
  { name: "Home", href: "/" },
  { name: "Articles", href: "/articles" },
  { name: "Resume", href: SOCIAL_LINKS.resume },
]

export const CONTACT = {
  emailHref: SOCIAL_LINKS.email,
  emailAddress: SOCIAL_LINKS.emailAddress,
  phoneHref: "tel:+918799142626",
  phoneLabel: "+91 87991 42626",
  location: "Ahmedabad, Gujarat, India",
} as const
