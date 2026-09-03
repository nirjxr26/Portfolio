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

export const NAV_LINKS = [
  { label: "What I do", href: "/#what-i-do" },
  { label: "Works", href: "/works" },
  { label: "Articles", href: "/#articles" },
  { label: "Resume", href: SOCIAL_LINKS.resume, isExternal: true },
] as const
