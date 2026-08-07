import type { Metadata } from "next";
import WorksClient from "./WorksClient";

export const metadata: Metadata = {
  title: "Works",
  description:
    "A curated list of projects by Nirjar Goswami — self-hosted IAM, Kubernetes cost intelligence, webhook infrastructure, deployment insights, and automation tools.",
  keywords: [
    "Nirjar Goswami",
    "DevOps projects",
    "Bastion IAM",
    "Kost Kubernetes",
    "HookDrop webhooks",
    "DeployLens",
    "SmartFlow",
    "BlamLess",
    "VaultLock",
    "open source",
    "cloud engineering",
  ],
  authors: [{ name: "Nirjar Goswami", url: "https://nirjar.me" }],
  creator: "Nirjar Goswami",
  publisher: "Nirjar Goswami",
  metadataBase: new URL("https://nirjar.me"),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Nirjar Goswami",
    title: "Works | Nirjar Goswami",
    description:
      "Systems, tools, and pipelines I've built — each one solving a problem I actually ran into.",
    url: "https://nirjar.me/works",
  },
  alternates: {
    canonical: "/works",
  },
};

export default function WorksPage() {
  return <WorksClient />;
}
