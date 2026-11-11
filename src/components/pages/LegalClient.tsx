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
            {/* Privacy & Data */}
            <section id="privacy" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Privacy &amp; Data</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  This website sets no cookies and collects no personal data. A privacy-first analytics service (Umami Cloud) records only aggregated page views, with no persistent identifiers, device fingerprinting, cross-site tracking, or profiling of individual visitors.
                </p>
                <p className={pClass}>
                  Infrastructure logs (IP addresses, user agents) are processed solely by Vercel for request routing, abuse prevention, and DDoS mitigation, and are not used for any other purpose.
                </p>
                <p className={pClass}>
                  If you send an email, your address is used only to reply to you. It is never stored in a marketing database, sold, or shared with third parties, and it is deleted on request.
                </p>
              </div>
            </section>

            {divider}

            {/* Content & Code Licensing */}
            <section id="licensing" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Content &amp; Code Licensing</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  All original articles, case studies, and visual diagrams are &copy; 2026 Nirjar Goswami, all rights reserved. Excerpts may be quoted with proper credit and a link back to the original source; reproduction of full works or use of the content to train machine learning models requires prior written permission.
                </p>
                <p className={pClass}>
                  Code samples within engineering articles are provided under the MIT License for reference and use in your own projects. Standalone tools (Trace, Bastion, Kost, HookDrop, and others) are licensed individually under the terms specified in their respective{" "}
                  <a
                    href="https://github.com/nirjxr26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline transition-colors"
                  >
                    GitHub repositories
                  </a>
                  , and those terms take precedence over any general statement made here.
                </p>
              </div>
            </section>

            {divider}

            {/* Technical & Security Disclaimer */}
            <section id="disclaimer" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Technical &amp; Security Disclaimer</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  Everything published here reflects personal engineering practice and research, and is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranty of any kind, express or implied, including fitness for a particular purpose, accuracy, or completeness. The author accepts no liability for any loss, damage, downtime, or data exposure arising from the use of this material.
                </p>
                <p className={pClass}>
                  Always test configurations, firewall rules, and scripts in an isolated staging environment, with verified backups and a rollback plan, before applying them to production.
                </p>
                <p className={pClass}>
                  Security and penetration testing content is intended strictly for systems you own or have explicit written authorization to test. Unauthorized testing of third-party systems may be illegal, and you are solely responsible for complying with all applicable laws.
                </p>
              </div>
            </section>

            {divider}

            {/* Security Reports & Governing Law */}
            <section id="security" className="scroll-mt-24 reveal-on-scroll">
              <h2 className={h2Class}>Security Reports &amp; Governing Law</h2>
              <div className={groupClass}>
                <p className={pClass}>
                  If you identify a security issue, please report it privately and in good faith through{" "}
                  <a
                    href="/.well-known/security.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline transition-colors font-mono text-[14px]"
                  >
                    /.well-known/security.txt
                  </a>{" "}
                  or by email, and allow reasonable time for remediation before any public disclosure. Good-faith research that avoids privacy violations, data destruction, service degradation, and social engineering will be treated as authorized.
                </p>
                <p className={pClass}>
                  These terms are governed by the laws of India, and the courts at Ahmedabad, Gujarat shall have exclusive jurisdiction. For questions or security reports, contact{" "}
                  <a
                    href="mailto:nirjargoswami2626@gmail.com"
                    className="text-accent hover:underline transition-colors font-mono"
                  >
                    nirjargoswami2626@gmail.com
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
