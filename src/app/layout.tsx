import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WebVitals } from "@/components/WebVitals";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nirjar.me"),
  icons: {
    icon: [
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icons/favicon.svg",
    apple: "/icons/favicon.svg",
  },
  title: {
    default: "Nirjar Goswami | Cloud & DevOps Engineer",
    template: "%s | Nirjar Goswami"
  },
  description: "I build infrastructure that ships fast and stays up. Cloud and DevOps engineer specializing in Kubernetes, Terraform, CI/CD, and security.",
  keywords: [
    "Nirjar Goswami",
    "Nirjar",
    "Goswami",
    "DevOps",
    "Cloud Engineer",
    "Infrastructure as Code",
    "Terraform",
    "Kubernetes",
    "AWS",
    "Security Engineering",
    "CI/CD Pipelines",
    "Ahmedabad DevOps",
    "Gujarat"
  ],
  authors: [{ name: "Nirjar Goswami", url: "https://nirjar.me" }],
  creator: "Nirjar Goswami",
  publisher: "Nirjar Goswami",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nirjar.me",
    title: "Nirjar Goswami | Cloud & DevOps Engineer",
    description: "I build infrastructure that ships fast and stays up.",
    siteName: "Nirjar Goswami",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Nirjar Goswami | Cloud & DevOps Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirjar Goswami | Cloud & DevOps Engineer",
    description: "I build infrastructure that ships fast and stays up.",
    creator: "@nirjxrgoswami",
    images: ["/og-image.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://nirjar.me/#person",
        "name": "Nirjar Goswami",
        "givenName": "Nirjar",
        "familyName": "Goswami",
        "jobTitle": "Cloud & DevOps Engineer",
        "url": "https://nirjar.me",
        "sameAs": [
          "https://github.com/nirjxr26",
          "https://linkedin.com/in/nirjxr",
          "https://x.com/nirjxrgoswami",
          "https://blog.nirjar.me"
        ],
        "email": "nirjargoswami2626@gmail.com",
        "knowsAbout": [
          "Cloud Architecture",
          "DevOps",
          "Kubernetes",
          "Terraform",
          "CI/CD",
          "AWS",
          "Docker",
          "Linux",
          "Infrastructure as Code",
          "Pipeline Security"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://nirjar.me/#website",
        "url": "https://nirjar.me",
        "name": "Nirjar Goswami",
        "description": "I build infrastructure that ships fast and stays up.",
        "publisher": { "@id": "https://nirjar.me/#person" }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="/icons/home/hero.svg" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var t=localStorage.getItem("theme");if(t==="light"||(!t&&window.matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.classList.add("light")})()`
        }} />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-foreground/10 selection:text-foreground" suppressHydrationWarning>
        <ThemeProvider>
          <WebVitals />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
