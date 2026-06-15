import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  description: "Cloud and DevOps Engineer specializing in building secure, resilient infrastructure. Expert in Terraform, Kubernetes, AWS, and automation pipelines.",
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
    description: "Cloud and DevOps Engineer specializing in building secure, resilient infrastructure. Expert in Terraform, Kubernetes, AWS, and automation pipelines.",
    siteName: "Nirjar Goswami Portfolio",
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
    description: "Cloud and DevOps Engineer specializing in building secure, resilient infrastructure. Expert in Terraform, Kubernetes, AWS, and automation pipelines.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
