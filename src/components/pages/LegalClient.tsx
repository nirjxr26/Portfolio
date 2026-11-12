import { RouteSeo } from "../common/SEO"
import { PageHero, PageShell, Section } from "../layout"
import { ROUTE_META } from "@/data/routes"
import { createBreadcrumbs } from "@/utils/helpers"

export function LegalClient() {
  const pClass = "text-[15px] sm:text-[16px] leading-[1.65] text-ink/90 text-left"
  const h2Class = "text-lg sm:text-[21px] font-bold text-ink tracking-tight mb-3 sm:mb-4 text-left"
  const groupClass = "space-y-3.5 sm:space-y-4"
  const divider = <hr className="border-hairline my-6 sm:my-8" />

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
      />

      <Section id="legal" bgClass="bg-canvas" padClass="pt-2 pb-14 sm:pt-3 sm:pb-20">
        <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
          <hr className="border-hairline mb-6 sm:mb-8" />

          <div>
            {/* Acceptance */}
            <section id="acceptance" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Acceptance</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use the site. I may revise these terms from time to time; continued use after a revision means you accept it.
                </p>
              </div>
            </section>

            {divider}

            {/* Data Protection */}
            <section id="data-protection" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Data Protection</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  This website does not use cookies, trackers, or fingerprinting, and it does not ask for personal data in order to browse. Aggregated, non-identifiable page-view statistics are collected through Umami Cloud. The hosting provider, Vercel, processes IP addresses and user-agent data solely to deliver content, route requests, and prevent abuse and DDoS attacks. Both providers act as service providers to this site, and I do not use this data for profiling or share it for commercial purposes.
                </p>
                <p className={pClass}>
                  If you email me at{" "}
                  <a
                    href="mailto:nirjargoswami2626@gmail.com"
                    className="text-accent hover:underline transition-colors"
                  >
                    nirjargoswami2626@gmail.com
                  </a>
                  , I use your email address and message only to respond to your enquiry and keep them only as long as needed to handle it. I do not add them to marketing lists, sell them, or share them with third parties, except where the law requires disclosure or where it is necessary to respond to abuse or a legal claim. No internet transmission, including email, is completely secure. To request deletion of your correspondence or to raise any privacy concern, write to the same address.
                </p>
              </div>
            </section>

            {divider}

            {/* Copyright & AI Use */}
            <section id="copyright-ai" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Copyright &amp; AI Use</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  All articles, case studies, diagrams, and graphics on this site are &copy; 2026 Nirjar Goswami, all rights reserved. You may quote short excerpts for commentary or education, provided you give attribution and a working link to the original. Reproducing, mirroring, or translating a full work requires my prior written permission.
                </p>
                <p className={pClass}>
                  Under the Copyright Act, 1957, and Article 4(3) of Directive (EU) 2019/790, I expressly reserve all rights in this content. I prohibit its collection or use by crawlers, bots, scrapers, or other automated means for text and data mining, or for training machine learning or generative AI models, without my prior written consent. This reservation is also published in machine-readable form through the site&rsquo;s{" "}
                  <a
                    href="/robots.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline transition-colors"
                  >
                    robots.txt
                  </a>{" "}
                  file.
                </p>
              </div>
            </section>

            {divider}

            {/* Code Licensing */}
            <section id="code-licensing" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Code Licensing</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  Code snippets within articles are licensed under the MIT License for reference and educational use. Standalone projects, including Trace, Bastion, Kost, and HookDrop, are licensed individually in their{" "}
                  <a
                    href="https://github.com/nirjxr26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline transition-colors"
                  >
                    GitHub repositories
                  </a>
                  . Each repository&rsquo;s license, notices, and disclaimers take precedence over this page and are not modified by it.
                </p>
              </div>
            </section>

            {divider}

            {/* Acceptable Use */}
            <section id="acceptable-use" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Acceptable Use</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  You agree not to use bots, scrapers, or other automated tools to copy this site, other than standard search-engine indexing and RSS readers; to overload the site or interfere with its operation; to attempt unauthorized access to the site, its hosting, or any connected system; to probe, scan, or test the site for vulnerabilities except as permitted under Security Reporting below; to impersonate another person or disguise the origin of a message sent to me; or to use the site for any unlawful purpose or to infringe the rights of others. I may block access for anyone who breaches these terms, without notice.
                </p>
              </div>
            </section>

            {divider}

            {/* Warranty Disclaimer */}
            <section id="warranty-disclaimer" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Warranty Disclaimer</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  ALL CONTENT ON THIS SITE, INCLUDING ARTICLES, CODE, SCRIPTS, CONFIGURATIONS, DIAGRAMS, AND TUTORIALS, IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE,&rdquo; WITH ALL FAULTS AND WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, STATUTORY, OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, I DISCLAIM ALL WARRANTIES OF ACCURACY, COMPLETENESS, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ERROR-FREE OPERATION.
                </p>
                <p className={pClass}>
                  Software, networking, and systems work carries inherent risk of failure and data loss. You rely on this material at your own risk and are solely responsible for testing any configuration, firewall rule, or script in an isolated staging environment, with verified backups and a rollback plan, before applying it to a production system. The site and its content may change, be suspended, or be removed at any time without notice.
                </p>
              </div>
            </section>

            {divider}

            {/* Authorized Use */}
            <section id="authorized-use" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Authorized Use</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  Security-related content, including discussion of scanning, testing, and access-control tools and techniques, is published for defensive education and research. Apply it only to systems you own or have explicit written authorization to test. Unauthorized access or testing may constitute an offence under Sections 43 and 66 of the Information Technology Act, 2000, and under similar laws elsewhere, including the U.S. Computer Fraud and Abuse Act and the U.K. Computer Misuse Act 1990.
                </p>
                <p className={pClass}>
                  I do not offer hacking-for-hire, unauthorized exploitation, or malicious software. Anyone who misuses information from this site is solely responsible, civilly and criminally, for their actions.
                </p>
              </div>
            </section>

            {divider}

            {/* Professional Advice */}
            <section id="professional-advice" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Professional Advice</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  Content on this site is general information and does not constitute legal, financial, compliance, or other professional advice. Reading this site or emailing me does not create a consulting, fiduciary, or other professional relationship; any engagement begins only under a separate written agreement.
                </p>
                <p className={pClass}>
                  Cost savings, percentages, performance figures, and benchmarks, including those relating to Kost and AWS architecture work, are illustrative results from specific environments. They are not guarantees of any outcome, uptime, discount, or audit result.
                </p>
              </div>
            </section>

            {divider}

            {/* Trademarks & Links */}
            <section id="trademarks-links" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Trademarks &amp; Links</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  All third-party names, logos, and trademarks referenced on this site, including Amazon Web Services, Docker, Kubernetes, Cloudflare, GitHub, and Google, belong to their respective owners. They appear solely to identify the technologies discussed, as permitted under Section 30 of the Trade Marks Act, 1999. I am not sponsored by, endorsed by, or affiliated with any trademark holder.
                </p>
                <p className={pClass}>
                  This site links to external websites, including GitHub, LinkedIn, and X. I do not control and am not responsible for their content, availability, or privacy practices.
                </p>
              </div>
            </section>

            {divider}

            {/* Limitation of Liability */}
            <section id="limitation-of-liability" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Limitation of Liability</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  TO THE FULLEST EXTENT PERMITTED BY LAW, I AM NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF, OR INABILITY TO USE, THIS SITE OR ITS CONTENT, INCLUDING LOSS OF PROFITS, GOODWILL, OR DATA, BUSINESS INTERRUPTION, DOWNTIME, AND SECURITY INCIDENTS. THIS APPLIES UNDER ANY LEGAL THEORY, INCLUDING CONTRACT, TORT, AND NEGLIGENCE.
                </p>
                <p className={pClass}>
                  My total liability for any other claim relating to this site is limited to the amount you paid me for access to it, which is ₹0. Nothing in these terms excludes or limits liability that cannot be excluded or limited under applicable law, including liability for fraud or wilful misconduct.
                </p>
              </div>
            </section>

            {divider}

            {/* Security Reporting */}
            <section id="security-reporting" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Security Reporting</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  If you find a security vulnerability affecting this site, please report it privately and in good faith through{" "}
                  <a
                    href="/.well-known/security.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline transition-colors"
                  >
                    security.txt
                  </a>{" "}
                  or by email, with enough detail to reproduce the issue, and allow reasonable time for remediation before any public disclosure.
                </p>
                <p className={pClass}>
                  If your research avoids privacy violations, data destruction, service degradation, and social engineering, I will treat it as authorized and will not bring legal action against you for it. This commitment covers my own conduct only and does not bind any third party or public authority. Testing outside this policy is not authorized.
                </p>
              </div>
            </section>

            {divider}

            {/* Governing Law */}
            <section id="governing-law" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Governing Law</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  These terms are governed by the laws of India, without regard to conflict-of-law principles. Before starting any legal proceeding, the parties must try in good faith to resolve the dispute through written notice and discussion for thirty (30) days, except where a party needs urgent interim or injunctive relief. If the dispute is not resolved, the courts at Ahmedabad, Gujarat, India have exclusive jurisdiction.
                </p>
                <p className={pClass}>
                  If any provision of these terms is held invalid or unenforceable, it will be limited or removed to the minimum extent necessary, and the remaining provisions stay in full effect. My failure to enforce a provision is not a waiver of it. These terms are the entire agreement between you and me regarding use of this site.
                </p>
                <p className={pClass}>
                  Contact:{" "}
                  <a
                    href="mailto:nirjargoswami2626@gmail.com"
                    className="text-accent hover:underline transition-colors"
                  >
                    nirjargoswami2626@gmail.com
                  </a>
                </p>
                <p className="text-[13px] sm:text-[14px] italic text-ink/60 pt-4 select-none">
                  Updated by Nirjar Goswami on November 12, 2026
                </p>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
