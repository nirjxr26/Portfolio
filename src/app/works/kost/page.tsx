import type { Metadata } from "next";
import KostClient from "./KostClient";

export const metadata: Metadata = {
  title: "Kost",
  description:
    "Kubernetes cost anomaly detection and right-sizing. A single-pod Go agent that finds every wasted dollar and gives you the exact kubectl command to fix it.",
  keywords: [
    "Kost",
    "Kubernetes cost",
    "cost optimization",
    "right-sizing",
    "Kubernetes waste",
    "cloud cost",
    "Kubecost alternative",
    "open source cost tool",
    "Kubernetes metrics",
    "cost anomaly detection",
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
    title: "Kost — Kubernetes Cost Intelligence",
    description:
      "Single-pod Go agent that finds over-provisioned workloads and hands you the fix command.",
    url: "https://nirjar.me/works/kost",
  },
  alternates: {
    canonical: "/works/kost",
  },
};

export default function KostPage() {
  return <KostClient />;
}
