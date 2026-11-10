import { RouteSeo } from "../common/SEO"
import { PageHero, PageShell, Section } from "../layout"
import { ROUTE_META } from "@/data/routes"
import { SOCIAL_LINKS } from "@/data/navigation"
import { createBreadcrumbs } from "@/utils/helpers"

export function SitemapClient() {
  const lineGuideClass = "text-muted/60 select-none"
  const linkClass = "hover:text-accent hover:underline transition-colors"
  const dirClass = "font-semibold hover:text-accent hover:underline transition-colors"
  const cardClass = "w-full bg-white dark:bg-black rounded-2xl p-6 sm:p-8 lg:p-10 overflow-x-auto reveal-on-scroll"
  const monoClass = "font-mono text-[13px] sm:text-[14px] leading-[1.85] tracking-normal text-ink select-text whitespace-pre text-left"

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
        subhead="A complete tree view of all routes, works, articles, repositories, and outbound endpoints on nirjar.me."
        compact
      />

      <Section id="sitemap" bgClass="bg-surface-alt" padClass="pt-10 pb-16 sm:pt-14 sm:pb-20 md:pt-16 md:pb-24">
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Card 1: Internal Tree */}
            <div className={cardClass}>
              <div className={monoClass}>
                <div>
                  <a href="/" className={dirClass}>nirjar.me/</a>
                </div>

                <div>
                  <span className={lineGuideClass}>├── </span>
                  <a href="/index.md" className={linkClass}>index.md/</a>
                  <span> </span>
                  <a href="/index.md" className="text-accent hover:underline">[ Agent view ]</a>
                </div>

                <div>
                  <span className={lineGuideClass}>├── </span>
                  <a href="/works" className={dirClass}>works/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│   ├── </span>
                  <a href="/works/trace" className={linkClass}>trace/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│   ├── </span>
                  <a href="/works/bastion" className={linkClass}>bastion/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│   ├── </span>
                  <a href="/works/kost" className={linkClass}>kost/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│   └── </span>
                  <a href="/works/hookdrop" className={linkClass}>hookdrop/</a>
                </div>

                <div>
                  <span className={lineGuideClass}>├── </span>
                  <a href="/articles" className={dirClass}>articles/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│   ├── </span>
                  <a href="/articles/coding-is-taught-wrong-and-ai-exposed-it" className={linkClass}>coding-is-taught-wrong-and-ai-exposed-it/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│   ├── </span>
                  <a href="/articles/allow-remote-postgresql-without-opening-it-to-the-world" className={linkClass}>allow-remote-postgresql-without-opening-it/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│   ├── </span>
                  <a href="/articles/making-technical-debt-visible-with-sonarqube" className={linkClass}>making-technical-debt-visible-with-sonarqube/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│   ├── </span>
                  <a href="/articles/rethinking-my-git-workflow" className={linkClass}>rethinking-my-git-workflow/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│   └── </span>
                  <a href="/articles/how-vaultlock-reliably-fetches-brand-logos" className={linkClass}>how-vaultlock-reliably-fetches-brand-logos/</a>
                </div>

                <div>
                  <span className={lineGuideClass}>├── </span>
                  <span className="font-semibold">assets/</span>
                </div>
                <div>
                  <span className={lineGuideClass}>│   └── </span>
                  <a href="/assets/nirjar_resume.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>nirjar_resume.pdf</a>
                </div>

                <div>
                  <span className={lineGuideClass}>└── </span>
                  <span className="font-semibold">Others</span>
                </div>
                <div>
                  <span className={lineGuideClass}>    ├── </span>
                  <a href="/humans.txt" target="_blank" rel="noopener noreferrer" className={linkClass}>humans.txt</a>
                </div>
                <div>
                  <span className={lineGuideClass}>    ├── </span>
                  <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className={linkClass}>llms.xml</a>
                </div>
                <div>
                  <span className={lineGuideClass}>    ├── </span>
                  <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className={linkClass}>rss.xml</a>
                </div>
                <div>
                  <span className={lineGuideClass}>    ├── </span>
                  <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className={linkClass}>sitemap.xml</a>
                </div>
                <div>
                  <span className={lineGuideClass}>    ├── </span>
                  <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className={linkClass}>robots.txt</a>
                </div>
                <div>
                  <span className={lineGuideClass}>    └── </span>
                  <a href="/.well-known/security.txt" target="_blank" rel="noopener noreferrer" className={linkClass}>/.well-known/security.txt</a>
                </div>
              </div>
            </div>

            {/* Card 2: External Links Tree */}
            <div className={cardClass}>
              <div className={monoClass}>
                <div>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={dirClass}>external/</a>
                </div>

                <div>
                  <span className={lineGuideClass}>├── </span>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={dirClass}>github.com/nirjxr26/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│   ├── </span>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={linkClass}>profile/</a>
                  <span> </span>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">[ @nirjxr26 ]</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│   └── </span>
                  <span className="font-semibold">repositories/</span>
                </div>
                <div>
                  <span className={lineGuideClass}>│       ├── </span>
                  <a href="https://github.com/nirjxr26/Trace" target="_blank" rel="noopener noreferrer" className={linkClass}>Trace/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│       ├── </span>
                  <a href="https://github.com/nirjxr26/Bastion" target="_blank" rel="noopener noreferrer" className={linkClass}>Bastion/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│       ├── </span>
                  <a href="https://github.com/nirjxr26/Kost" target="_blank" rel="noopener noreferrer" className={linkClass}>Kost/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│       ├── </span>
                  <a href="https://github.com/nirjxr26/HookDrop" target="_blank" rel="noopener noreferrer" className={linkClass}>HookDrop/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│       ├── </span>
                  <a href="https://github.com/nirjxr26/DeployLens" target="_blank" rel="noopener noreferrer" className={linkClass}>DeployLens/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│       ├── </span>
                  <a href="https://github.com/nirjxr26/canopy" target="_blank" rel="noopener noreferrer" className={linkClass}>canopy/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│       ├── </span>
                  <a href="https://github.com/nirjxr26/SmartFlow" target="_blank" rel="noopener noreferrer" className={linkClass}>SmartFlow/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│       ├── </span>
                  <a href="https://github.com/nirjxr26/Blamless" target="_blank" rel="noopener noreferrer" className={linkClass}>BlamLess/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│       ├── </span>
                  <a href="https://github.com/nirjxr26/VaultLock-Password-Manager" target="_blank" rel="noopener noreferrer" className={linkClass}>VaultLock/</a>
                </div>
                <div>
                  <span className={lineGuideClass}>│       └── </span>
                  <a href="https://github.com/nirjxr26/code-humanizer" target="_blank" rel="noopener noreferrer" className={linkClass}>code-humanizer/</a>
                </div>

                <div>
                  <span className={lineGuideClass}>└── </span>
                  <span className="font-semibold">connect/</span>
                </div>
                <div>
                  <span className={lineGuideClass}>    ├── </span>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className={linkClass}>github.com/nirjxr26</a>
                </div>
                <div>
                  <span className={lineGuideClass}>    ├── </span>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>linkedin.com/in/nirjxr</a>
                </div>
                <div>
                  <span className={lineGuideClass}>    ├── </span>
                  <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className={linkClass}>x.com/nirjxrgoswami</a>
                </div>
                <div>
                  <span className={lineGuideClass}>    ├── </span>
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>instagram.com/nirjar_goswami</a>
                </div>
                <div>
                  <span className={lineGuideClass}>    └── </span>
                  <a href={SOCIAL_LINKS.email} className={linkClass}>mailto:{SOCIAL_LINKS.emailAddress}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
