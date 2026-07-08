import type { Metadata } from "next";
import BastionClient from "./BastionClient";

export const metadata: Metadata = {
  title: "Bastion",
  description:
    "Enterprise-grade access control — auth, policy enforcement, MFA, session control, and audit logging in a single self-hosted stack.",
  keywords: [
    "Bastion",
    "Identity Access Management",
    "IAM",
    "self-hosted auth",
    "RBAC",
    "MFA",
    "SSO",
    "OAuth",
    "access control",
    "authentication",
    "authorization",
    "audit logging",
    "session management",
    "open source IAM",
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
    title: "Bastion — Identity & Access Management",
    description:
      "Enterprise-grade access control without handing user data to a third party.",
    url: "https://nirjar.me/works/bastion",
  },
  alternates: {
    canonical: "/works/bastion",
  },
};

export default function BastionPage() {
  return <BastionClient />;
}
