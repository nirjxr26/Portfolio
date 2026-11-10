import { RouteSeo } from "../common/SEO"
import { PageHero, PageShell, Section } from "../layout"
import { ROUTE_META } from "@/data/routes"
import { createBreadcrumbs } from "@/utils/helpers"

export function LegalClient() {
  const pClass = "text-[15px] sm:text-[16px] leading-[1.6] text-ink/90"
  const h2Class = "text-lg sm:text-[21px] font-bold text-ink tracking-tight mb-3 sm:mb-4"
  const listClass = "space-y-3 sm:space-y-3.5"
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
            <section id="privacy" className="scroll-mt-24">
              <h2 className={h2Class}>Privacy &amp; Data</h2>
              <ul className={listClass}>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">No Cookies:</strong>{" "}
                  nirjar.me sets zero cookies, runs zero tracking scripts, and collects zero personal analytics.
                </li>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">Server Logs:</strong>{" "}
                  Infrastructure logs (IP addresses, user agents) are processed strictly by Vercel for routing and DDoS mitigation.
                </li>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">Direct Contact:</strong>{" "}
                  If you send an email, your address is only used to write back. It is never stored in a marketing database or shared.
                </li>
              </ul>
            </section>

            {divider}

            {/* Content & Code Licensing */}
            <section id="licensing" className="scroll-mt-24">
              <h2 className={h2Class}>Content &amp; Code Licensing</h2>
              <ul className={listClass}>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">Writing &amp; Design:</strong>{" "}
                  All original articles, case studies, and visual diagrams are &copy; 2026 Nirjar Goswami. Excerpts may be quoted freely with proper credit and a link back.
                </li>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">Article Code Snippets:</strong>{" "}
                  Code samples within engineering articles are provided under the MIT License for reference and use in your own projects.
                </li>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">Open-Source Projects:</strong>{" "}
                  Standalone tools (Trace, Bastion, Kost, HookDrop, etc.) are licensed individually under the terms specified in their respective{" "}
                  <a
                    href="https://github.com/nirjxr26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline transition-colors"
                  >
                    GitHub
                  </a>{" "}
                  repositories.
                </li>
              </ul>
            </section>

            {divider}

            {/* Technical & Security Disclaimer */}
            <section id="disclaimer" className="scroll-mt-24">
              <h2 className={h2Class}>Technical &amp; Security Disclaimer</h2>
              <ul className={listClass}>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">Educational Purpose:</strong>{" "}
                  Everything published here reflects personal engineering practice and research. It is provided &ldquo;as is&rdquo; without warranty of any kind.
                </li>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">Production Safety:</strong>{" "}
                  Always test configurations, firewall rules, and scripts in an isolated staging environment before applying them to production.
                </li>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">Responsible Testing:</strong>{" "}
                  Security and penetration testing articles are strictly for systems you own or have explicit written permission to test.
                </li>
              </ul>
            </section>

            {divider}

            {/* Security Reports & Governing Law */}
            <section id="security" className="scroll-mt-24">
              <h2 className={h2Class}>Security Reports &amp; Governing Law</h2>
              <ul className={listClass}>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">Vulnerability Disclosure:</strong>{" "}
                  If you identify a security issue, please disclose it responsibly via{" "}
                  <a
                    href="/.well-known/security.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline transition-colors font-mono text-[14px]"
                  >
                    /.well-known/security.txt
                  </a>{" "}
                  or by email before public disclosure.
                </li>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">Jurisdiction:</strong>{" "}
                  These terms are governed by the laws of India, under the jurisdiction of the courts in Ahmedabad, Gujarat.
                </li>
                <li className={pClass}>
                  <strong className="font-semibold text-ink">Contact:</strong>{" "}
                  Questions or security reports:{" "}
                  <a
                    href="mailto:nirjargoswami2626@gmail.com"
                    className="text-accent hover:underline transition-colors font-mono"
                  >
                    nirjargoswami2626@gmail.com
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
