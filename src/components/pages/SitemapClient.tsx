import { RouteSeo } from "../common/SEO"
import { PageHero, PageShell, Section } from "../layout"
import { ROUTE_META } from "@/data/routes"
import { SOCIAL_LINKS } from "@/data/navigation"
import { createBreadcrumbs } from "@/utils/helpers"

export function SitemapClient() {
  const rowClass = "flex items-start min-w-0"
  const guideClass = "shrink-0 text-muted/60 select-none whitespace-pre"
  const linkWrapClass = "min-w-0 break-words hover:text-accent hover:underline transition-colors"
  const dirWrapClass = "min-w-0 font-semibold break-words hover:text-accent hover:underline transition-colors"
  const cardClass = "w-full bg-white dark:bg-black rounded-2xl p-4 sm:p-8 lg:p-10 overflow-hidden reveal-on-scroll"
  const monoClass = "font-mono text-[12px] sm:text-[13.5px] md:text-[14px] leading-[1.75] sm:leading-[1.85] tracking-tight sm:tracking-normal text-ink select-text text-left"

  return (
    <PageShell
      headerPath="/sitemap"
      footerBgClass="bg-canvas"
      seo={
        <RouteSeo
          meta={ROUTE_META["/sitemap"]}
          breadcrumbs={createBreadcrumbs([{ name: "Sitemap", url: "/sitemap" }])}
        />
      }
    >
      <PageHero
        title="Sitemap."
        subhead="An index of all public pages and external links available on this website, in one place."
        compact
      />

      <Section id="sitemap" bgClass="bg-surface-alt" padClass="pt-10 pb-16 sm:pt-14 sm:pb-20 md:pt-16 md:pb-24">
        <div className="mx-auto w-full max-w-[680px] px-4 sm:px-6">
          <div className="flex flex-col gap-8 sm:gap-10">
            {/* Card 1: Internal Tree */}
            <div className={cardClass}>
              <div className={monoClass}>
                <div className={rowClass}>
                  <a href="/" className={dirWrapClass}>nirjar.me/</a>
                </div>

                <div className={rowClass}>
                  <span className={guideClass}>├── </span>
                  <div className="flex flex-wrap items-center gap-x-1.5 min-w-0">
                    <a href="/index.md" className={linkWrapClass}>index.md/</a>
                    <a href="/index.md" className="text-accent hover:underline shrink-0">[ Agent view ]</a>
                  </div>
                </div>

                <div className={rowClass}>
                  <span className={guideClass}>├── </span>
                  <a href="/works" className={dirWrapClass}>works/</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>│   ├── </span>
                  <a href="/works/trace" className={linkWrapClass}>trace/</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>│   ├── </span>
                  <a href="/works/bastion" className={linkWrapClass}>bastion/</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>│   ├── </span>
                  <a href="/works/kost" className={linkWrapClass}>kost/</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>│   └── </span>
                  <a href="/works/hookdrop" className={linkWrapClass}>hookdrop/</a>
                </div>

                <div className={rowClass}>
                  <span className={guideClass}>├── </span>
                  <a href="/articles" className={dirWrapClass}>articles/</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>│   ├── </span>
                  <a href="/articles/coding-is-taught-wrong-and-ai-exposed-it" className={linkWrapClass}>coding-is-taught-wrong-and-ai-exposed-it/</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>│   ├── </span>
                  <a href="/articles/allow-remote-postgresql-without-opening-it-to-the-world" className={linkWrapClass}>allow-remote-postgresql-without-opening-it/</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>│   ├── </span>
                  <a href="/articles/making-technical-debt-visible-with-sonarqube" className={linkWrapClass}>making-technical-debt-visible-with-sonarqube/</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>│   ├── </span>
                  <a href="/articles/rethinking-my-git-workflow" className={linkWrapClass}>rethinking-my-git-workflow/</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>│   └── </span>
                  <a href="/articles/how-vaultlock-reliably-fetches-brand-logos" className={linkWrapClass}>how-vaultlock-reliably-fetches-brand-logos/</a>
                </div>

                <div className={rowClass}>
                  <span className={guideClass}>├── </span>
                  <a href="/legal" className={dirWrapClass}>legal/</a>
                </div>

                <div className={rowClass}>
                  <span className={guideClass}>├── </span>
                  <span className="font-semibold break-words min-w-0">assets/</span>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>│   └── </span>
                  <a href="/assets/nirjar_resume.pdf" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>nirjar_resume.pdf</a>
                </div>

                <div className={rowClass}>
                  <span className={guideClass}>└── </span>
                  <span className="font-semibold break-words min-w-0">Others</span>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>    ├── </span>
                  <a href="/humans.txt" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>humans.txt</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>    ├── </span>
                  <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>llms.xml</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>    ├── </span>
                  <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>rss.xml</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>    ├── </span>
                  <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>sitemap.xml</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>    ├── </span>
                  <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>robots.txt</a>
                </div>
                <div className={rowClass}>
                  <span className={guideClass}>    └── </span>
                  <a href="/.well-known/security.txt" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>/.well-known/security.txt</a>
                </div>
              </div>
            </div>

            {/* Card 2: External Links Tree */}
            <div className="flex flex-col">
              <p className="text-xs sm:text-[13px] text-muted mb-2 px-1">
                Disclaimer: All links below navigate to external repositories and services.
              </p>
              <div className={cardClass}>
                <div className={monoClass}>
                  <div className={rowClass}>
                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={dirWrapClass}>github.com/nirjxr26/</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>├── </span>
                    <div className="flex flex-wrap items-center gap-x-1.5 min-w-0">
                      <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={linkWrapClass}>profile/</a>
                      <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline shrink-0">[ @nirjxr26 ]</a>
                    </div>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>└── </span>
                    <span className="font-semibold break-words min-w-0">repositories/</span>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>    ├── </span>
                    <a href="https://github.com/nirjxr26/Trace" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>Trace/</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>    ├── </span>
                    <a href="https://github.com/nirjxr26/Bastion" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>Bastion/</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>    ├── </span>
                    <a href="https://github.com/nirjxr26/Kost" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>Kost/</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>    ├── </span>
                    <a href="https://github.com/nirjxr26/HookDrop" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>HookDrop/</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>    ├── </span>
                    <a href="https://github.com/nirjxr26/DeployLens" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>DeployLens/</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>    ├── </span>
                    <a href="https://github.com/nirjxr26/canopy" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>canopy/</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>    ├── </span>
                    <a href="https://github.com/nirjxr26/SmartFlow" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>SmartFlow/</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>    ├── </span>
                    <a href="https://github.com/nirjxr26/Blamless" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>BlamLess/</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>    ├── </span>
                    <a href="https://github.com/nirjxr26/VaultLock-Password-Manager" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>VaultLock/</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>    └── </span>
                    <a href="https://github.com/nirjxr26/code-humanizer" target="_blank" rel="noopener noreferrer" className={linkWrapClass}>code-humanizer/</a>
                  </div>

                  <div className={`${rowClass} pt-3`}>
                    <span className={dirWrapClass}>connect/</span>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>├── </span>
                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={linkWrapClass}>github.com/nirjxr26</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>├── </span>
                    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={linkWrapClass}>linkedin.com/in/nirjxr</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>├── </span>
                    <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className={linkWrapClass}>x.com/nirjxrgoswami</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>├── </span>
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className={linkWrapClass}>instagram.com/nirjar_goswami</a>
                  </div>
                  <div className={rowClass}>
                    <span className={guideClass}>└── </span>
                    <a href={SOCIAL_LINKS.email} className={`${linkWrapClass} break-all`}>mailto:{SOCIAL_LINKS.emailAddress}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
