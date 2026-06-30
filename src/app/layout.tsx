import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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
    default: "nirjar",
    template: "%s | Nirjar Goswami"
  },
  description: "I build infrastructure that ships fast and stays up.",
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
        url: "/og-image.png",
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
    images: ["/og-image.png"]
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
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      style={{ backgroundColor: "var(--background)" }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-foreground/10 selection:text-foreground" suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
