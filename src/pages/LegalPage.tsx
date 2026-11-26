import type { ReactNode } from "react"
import { RouteSeo } from "@/components/ui/SEO"
import { PageHero, PageShell, Section } from "@/components/layout"
import { ROUTE_META } from "@/app/router/routes"
import { createBreadcrumbs } from "@/lib/helpers"

const P_CLASS = "t-body text-[15px] sm:text-[17px] leading-relaxed tracking-normal text-ink text-left"
const H2_CLASS = "t-section-title tracking-normal text-ink text-left"
const H3_CLASS = "text-[16px] sm:text-[17.5px] font-semibold tracking-normal text-ink text-left"
const LINK_CLASS = "text-accent hover:text-accent/80 transition-colors"

function DashList({ items }: Readonly<{ items: readonly ReactNode[] }>) {
  return (
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="t-body text-[15px] sm:text-[17px] leading-snug tracking-normal text-ink text-left flex items-start gap-2.5">
          <span aria-hidden="true" className="select-none text-muted shrink-0">
            —
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function SubBlock({
  title,
  children,
}: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <div className="space-y-3">
      <h3 className={H3_CLASS}>{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function LegalSection({
  id,
  title,
  children,
}: Readonly<{ id: string; title: string; children: ReactNode }>) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className={H2_CLASS}>{title}</h2>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  )
}

export function LegalPage() {
  const divider = <hr className="border-hairline" />

  return (
    <PageShell
      headerPath="/legal"
      footerBgClass="bg-surface-alt"
      seo={
        <RouteSeo
          meta={ROUTE_META["/legal"]}
          breadcrumbs={createBreadcrumbs([{ name: "Legal", url: "/legal" }])}
        />
      }
    >
      <PageHero
        title="Terms of Use"
        subhead="Legal Information & Notices."
        compact
        animate={false}
      />

      <Section id="legal" bgClass="bg-canvas" padClass="pt-2 pb-14 sm:pt-3 sm:pb-20">
        <div className="mx-auto w-full max-w-[720px] px-4 min-[414px]:px-6 sm:px-6 xl:max-w-[760px]">
          <hr className="border-hairline mb-10 sm:mb-12" />

          <div className="space-y-10 sm:space-y-12">
            {/* Acceptance */}
            <LegalSection id="acceptance" title="Acceptance">
              <p className={P_CLASS}>
                By accessing or using this website, you agree to these Terms of Use.
              </p>
              <DashList
                items={[
                  "If you do not agree, please do not use the site.",
                  "I may revise these terms from time to time; continued use after a revision means you accept it.",
                ]}
              />
            </LegalSection>

            {divider}

            {/* Data Protection */}
            <LegalSection id="data-protection" title="Data Protection">
              <p className={P_CLASS}>
                This website does not use cookies, trackers, or fingerprinting, and it does not ask for personal data in order to browse.
              </p>
              <DashList
                items={[
                  "Aggregated, non-identifiable page-view statistics are collected through Umami Cloud.",
                  "The hosting provider, Vercel, processes IP addresses and user-agent data solely to deliver content, route requests, and prevent abuse and DDoS attacks.",
                  "I do not use this data for profiling or share it for commercial purposes.",
                  <>
                    If you email me at{" "}
                    <a href="mailto:nirjargoswami2626@gmail.com" className={LINK_CLASS}>
                      nirjargoswami2626@gmail.com
                    </a>
                    , I use your address and message only to respond to your enquiry and retain them only as long as needed.
                  </>,
                ]}
              />
            </LegalSection>

            {divider}

            {/* Copyright & AI Use */}
            <LegalSection id="copyright-ai" title="Copyright & AI Use">
              <p className={P_CLASS}>
                All articles, case studies, diagrams, and graphics on this site are the original work of the author, all rights reserved.
              </p>
              <DashList
                items={[
                  "Short excerpts may be quoted for commentary or education with attribution and a working link.",
                  "Reproducing, mirroring, or translating a full work requires prior written permission.",
                  "Text and data mining, or scraping by crawlers, bots, or scrapers without prior written consent is prohibited (Copyright Act, 1957; Article 4(3), Directive (EU) 2019/790).",
                  "Training machine learning or generative AI models on this content is prohibited.",
                  <>
                    This reservation is also published in{" "}
                    <a
                      href="/robots.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK_CLASS}
                    >
                      robots.txt
                    </a>
                    .
                  </>,
                ]}
              />
            </LegalSection>

            {divider}

            {/* Code Licensing */}
            <LegalSection id="code-licensing" title="Code Licensing">
              <SubBlock title="Code Snippets">
                <p className={P_CLASS}>
                  Snippets within articles are licensed under the MIT License for reference and educational use.
                </p>
              </SubBlock>
              <SubBlock title="Standalone Projects">
                <p className={P_CLASS}>
                  Trace, Bastion, Kost, and HookDrop are licensed individually in their{" "}
                  <a
                    href="https://github.com/nirjxr26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    GitHub repositories
                  </a>
                  .
                </p>
                <DashList
                  items={[
                    "Each repository's license, notices, and disclaimers take precedence over this page.",
                    "This page does not modify them.",
                  ]}
                />
              </SubBlock>
            </LegalSection>

            {divider}

            {/* Acceptable Use */}
            <LegalSection id="acceptable-use" title="Acceptable Use">
              <SubBlock title="You Agree Not To">
                <p className={P_CLASS}>These actions are not allowed.</p>
                <DashList
                  items={[
                    "Use bots, scrapers, or automated tools to copy the site (search-engine indexing and RSS readers are fine).",
                    "Overload the site or interfere with its operation.",
                    "Attempt unauthorized access to the site, its hosting, or any connected system.",
                    "Probe, scan, or test for vulnerabilities, except as permitted under Security Reporting.",
                    "Impersonate another person or disguise the origin of a message sent to me.",
                    "Use the site for any unlawful purpose or to infringe others' rights.",
                  ]}
                />
              </SubBlock>
              <SubBlock title="Enforcement">
                <DashList
                  items={[
                    "I may block access for anyone who breaches these terms, without notice.",
                  ]}
                />
              </SubBlock>
            </LegalSection>

            {divider}

            {/* Authorized Use */}
            <LegalSection id="authorized-use" title="Authorized Use">
              <SubBlock title="Security Content">
                <p className={P_CLASS}>
                  Security-related content is published for defensive education and research.
                </p>
                <DashList
                  items={[
                    "Apply it only to systems you own or have explicit written authorization to test.",
                    "Unauthorized testing may be an offence under Sections 43 and 66 of the IT Act, 2000, and similar laws elsewhere (U.S. CFAA, U.K. Computer Misuse Act 1990).",
                  ]}
                />
              </SubBlock>
              <SubBlock title="What I Do Not Offer">
                <DashList
                  items={[
                    "Hacking-for-hire.",
                    "Unauthorized exploitation.",
                    "Malicious software.",
                    "Anyone who misuses information from this site is solely responsible, civilly and criminally.",
                  ]}
                />
              </SubBlock>
            </LegalSection>

            {divider}

            {/* Disclaimers */}
            <LegalSection id="disclaimers" title="Disclaimers">
              <SubBlock title="Warranty">
                <p className={P_CLASS}>
                  All content is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind.
                </p>
                <DashList
                  items={[
                    "You rely on it at your own risk.",
                    "Test any configuration, firewall rule, or script in an isolated staging environment, with verified backups and a rollback plan, before production.",
                  ]}
                />
              </SubBlock>
              <SubBlock title="Professional Advice">
                <p className={P_CLASS}>Content is general information only.</p>
                <DashList
                  items={[
                    "It is not legal, financial, compliance, or other professional advice.",
                    "Reading the site or emailing me creates no professional relationship.",
                  ]}
                />
              </SubBlock>
            </LegalSection>

            {divider}

            {/* Limitation of Liability */}
            <LegalSection id="limitation-of-liability" title="Limitation of Liability">
              <p className={P_CLASS}>To the fullest extent permitted by law:</p>
              <DashList
                items={[
                  "I am not liable for indirect, incidental, special, consequential, or punitive damages.",
                  "This includes loss of profits, goodwill, or data, downtime, and security incidents.",
                  "My total liability for any other claim is limited to what you paid for access: ₹0.",
                  "Liability that cannot legally be limited (fraud, wilful misconduct) is not affected.",
                ]}
              />
            </LegalSection>

            {divider}

            {/* Trademarks & Links */}
            <LegalSection id="trademarks-links" title="Trademarks & Links">
              <SubBlock title="Trademarks">
                <p className={P_CLASS}>
                  Third-party names and logos appear only to identify the technologies discussed (Section 30, Trade Marks Act, 1999).
                </p>
                <DashList
                  items={[
                    "I am not sponsored, endorsed, or affiliated with any trademark holder.",
                  ]}
                />
              </SubBlock>
              <SubBlock title="External Links">
                <p className={P_CLASS}>The site links to GitHub, LinkedIn, and X.</p>
                <DashList
                  items={[
                    "I do not control their content, availability, or privacy practices.",
                  ]}
                />
              </SubBlock>
            </LegalSection>

            {divider}

            {/* Security Reporting */}
            <LegalSection id="security-reporting" title="Security Reporting">
              <SubBlock title="How to Report">
                <p className={P_CLASS}>
                  Report vulnerabilities privately and in good faith.
                </p>
                <DashList
                  items={[
                    <>
                      Use{" "}
                      <a
                        href="/.well-known/security.txt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={LINK_CLASS}
                      >
                        security.txt
                      </a>{" "}
                      or email.
                    </>,
                    "Include enough detail to reproduce the issue.",
                    "Allow reasonable time for remediation before public disclosure.",
                  ]}
                />
              </SubBlock>
              <SubBlock title="Safe Harbour">
                <p className={P_CLASS}>
                  I will treat your research as authorized and take no legal action if it avoids:
                </p>
                <DashList
                  items={[
                    "Privacy violations.",
                    "Data destruction.",
                    "Service degradation.",
                    "Social engineering.",
                    "This covers my conduct only and does not bind any third party or public authority.",
                  ]}
                />
              </SubBlock>
            </LegalSection>

            {divider}

            {/* Governing Law */}
            <LegalSection id="governing-law" title="Governing Law">
              <SubBlock title="Jurisdiction">
                <DashList
                  items={[
                    "These terms are governed by the laws of India.",
                    "Courts at Ahmedabad, Gujarat have exclusive jurisdiction.",
                  ]}
                />
              </SubBlock>
              <SubBlock title="Disputes">
                <DashList
                  items={[
                    "Try in good faith to resolve it through written notice and discussion for 30 days first.",
                    "Exception: urgent interim or injunctive relief.",
                  ]}
                />
              </SubBlock>
              <SubBlock title="General">
                <DashList
                  items={[
                    "Invalid provisions are limited or removed only as far as necessary.",
                    "Not enforcing a provision is not a waiver of it.",
                    "These terms are the entire agreement between us regarding the site.",
                  ]}
                />
              </SubBlock>
              <SubBlock title="Contact">
                <p className={P_CLASS}>
                  <a href="mailto:nirjargoswami2626@gmail.com" className={LINK_CLASS}>
                    nirjargoswami2626@gmail.com
                  </a>
                </p>
                <p className="text-[13px] sm:text-[14px] italic text-ink/60 pt-4 select-none">
                  Updated by Nirjar Goswami on November 26, 2026
                </p>
              </SubBlock>
            </LegalSection>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
