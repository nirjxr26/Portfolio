import type { Metadata } from "next";
import BastionClient from "./BastionClient";

export const metadata: Metadata = {
  title: "Bastion",
  description:
    "Enterprise-grade access control — auth, policy enforcement, MFA, session control, and audit logging in a single self-hosted stack.",
  openGraph: {
    title: "Bastion — Identity & Access Management",
    description:
      "Enterprise-grade access control without handing user data to a third party.",
    url: "https://nirjar.me/works/bastion",
  },
  alternates: {
    canonical: "works/bastion",
  },
};

export default function BastionPage() {
  return <BastionClient />;
}
