import type { Metadata } from "next";
import HookDropClient from "./HookDropClient";

export const metadata: Metadata = {
  title: "HookDrop",
  description:
    "A webhook sink you can watch live — every event traced, every image signed before it ships.",
  keywords: [
    "HookDrop",
    "webhook receiver",
    "webhook sink",
    "SSE",
    "server-sent events",
    "Cosign",
    "Sigstore",
    "Kyverno",
    "image signing",
    "Go webhook",
    "event tracing",
    "GitOps",
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
    title: "HookDrop — Webhook Sink & Streamer",
    description:
      "A webhook sink you can watch live — every event traced, every image signed before it ships.",
    url: "https://nirjar.me/works/hookdrop",
  },
  alternates: {
    canonical: "/works/hookdrop",
  },
};

export default function HookDropPage() {
  return <HookDropClient />;
}
