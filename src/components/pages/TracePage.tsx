import type { CaseStudyData, HeroAction } from "@/types"
import { SITE_URL } from "@/data/site"
import { createBreadcrumbs } from "@/utils/helpers"
import { ActionButtons, ActionGroup, HeroAssetPreview, InstallSnippet, LayeredPreview, Seo } from "../common"
import { PageShell } from "../layout"

interface TracePageProps {
  data: CaseStudyData
}

const BORDER_COLOR = "border-black/[0.16] dark:border-white/[0.16]"
const COLUMN_CONTAINER = `relative w-full max-w-[1360px] mx-auto border-x ${BORDER_COLOR} bg-white dark:bg-black`

export function TracePage({ data }: Readonly<TracePageProps>) {
  const { hero, sections, cta, seoTitle } = data
  const canonicalUrl = `${SITE_URL}/works/trace`
  const pageTitle = seoTitle || `${hero.title} | ${typeof hero.headline === "string" ? hero.headline : hero.subhead}`

  const ctaActions: HeroAction[] = [
    {
      label: typeof cta.action === "string" ? cta.action : "View on GitHub",
      url: cta.url,
      type: "primary",
      arrow: "up-right",
      ariaLabel: `View ${hero.title} on GitHub`,
    },
    ...(cta.secondaryAction
      ? [
          {
            label: cta.secondaryAction.label,
            url: cta.secondaryAction.url,
            type: "secondary" as const,
            arrow: cta.secondaryAction.arrow ?? (true as const),
          },
        ]
      : []),
  ]

  return (
    <PageShell
      headerPath="/works"
      outerClassName="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-accent selection:text-white"
      footerBgClass="bg-white dark:bg-black"
      seo={
        <Seo
          title={pageTitle}
          description={hero.subhead}
          canonicalUrl={canonicalUrl}
          includeDefaultSchemas={false}
          breadcrumbs={createBreadcrumbs([
            { name: "Works", url: "/works" },
            { name: hero.title, url: "/works/trace" },
          ])}
          softwareSchema={{
            name: hero.title,
            description: hero.subhead,
            applicationCategory: "SecurityApplication",
            operatingSystem: "Windows, macOS, Linux",
            url: cta.url,
            codeRepository: cta.url,
            programmingLanguage: "Python / Textual / PostgreSQL",
            license: "https://opensource.org/licenses/MIT",
            runtimePlatform: "Kubernetes, Linux, Docker",
            ...data.softwareSchema,
          }}
        />
      }
    >
      {/* 
        Technical boxed grid layout:
        Each row is full-width with a horizontal divider (border-b) that extends 
        all the way across the page. Inside each row sits the centered column with 
        vertical guide lines (border-x).
      */}

      {/* Hero Row */}
      <div className={`w-full border-b ${BORDER_COLOR}`}>
        <section className={`${COLUMN_CONTAINER} pt-16 sm:pt-24 md:pt-28 pb-0 overflow-hidden flex flex-col items-center text-center`}>
          <div className="px-6 sm:px-12 max-w-3xl mx-auto flex flex-col items-center">
            {hero.title && (
              <span className="font-eurostile text-xs sm:text-sm tracking-widest uppercase text-accent mb-4 sm:mb-5 block select-none">
                {hero.title}
              </span>
            )}

            <h1 className="t-hero text-black dark:text-white tracking-tight mb-4 sm:mb-6">
              {hero.headline}
            </h1>

            <p className="t-lead text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8 sm:mb-12 text-pretty">
              {hero.subhead}
            </p>
          </div>

          {/* Hero Visual: MacBook CLI mockup, half visible and attached to the bottom border */}
          {hero.heroAsset && (
            <div className="w-full flex justify-center mt-2 sm:mt-6 overflow-hidden">
              <HeroAssetPreview
                asset={hero.heroAsset}
                className="w-full max-w-4xl lg:max-w-5xl"
              />
            </div>
          )}
        </section>
      </div>

      {/* Hero Install Script Row (moved below the hero visual in its own technical divider band) */}
      {hero.installCommands && hero.installCommands.length > 0 && (
        <div className={`w-full border-b ${BORDER_COLOR}`}>
          <div className={`${COLUMN_CONTAINER} py-8 sm:py-10 px-6 sm:px-12 flex justify-center`}>
            <InstallSnippet commands={hero.installCommands} />
          </div>
        </div>
      )}

      {/* The 4 Feature Sections: Case, Audit, Device, AI Agent */}
      {sections.map((section, idx) => (
        <div
          key={typeof section.title === "string" ? section.title : idx}
          className={`w-full border-b ${BORDER_COLOR}`}
        >
          <section className={`${COLUMN_CONTAINER} p-8 sm:p-12 md:p-16 lg:p-20 reveal-on-scroll`}>
            {/* Left-aligned Header Content */}
            <div className="max-w-3xl mb-8 sm:mb-12 md:mb-16 text-left">
              {section.tag && (
                <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-accent mb-2 sm:mb-3">
                  {section.tag}
                </p>
              )}

              <h2 className="text-[30px] sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-black dark:text-white tracking-tight mb-3 sm:mb-4 text-left leading-tight">
                {section.title}
              </h2>

              {section.desc && (
                <p className="t-body text-neutral-600 dark:text-neutral-400 max-w-2xl text-left leading-relaxed text-pretty">
                  {section.desc}
                </p>
              )}
            </div>

            {/* Visual below covering width with internal padding inside this box */}
            {section.layeredAsset && (
              <div className="w-full flex justify-center">
                <LayeredPreview
                  {...section.layeredAsset}
                  className="shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
                />
              </div>
            )}
          </section>
        </div>
      ))}

      {/* Bottom CTA Section with Full-Width Horizontal Dividers */}
      <div className={`w-full border-b ${BORDER_COLOR}`}>
        <section
          className={`${COLUMN_CONTAINER} py-16 sm:py-24 md:py-28 px-6 sm:px-12 text-center reveal-on-scroll`}
          aria-label={`View ${hero.title} on GitHub`}
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="t-hero text-black dark:text-white tracking-tight mb-4">
              {cta.headline}
            </h2>
            <p className="t-lead text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-8">
              {cta.body}
            </p>
          </div>

          <ActionGroup className="mt-8">
            <ActionButtons actions={ctaActions} />
          </ActionGroup>

          {cta.installCommands && cta.installCommands.length > 0 && (
            <div className="hidden sm:flex mt-10 justify-center w-full">
              <InstallSnippet commands={cta.installCommands} />
            </div>
          )}
        </section>
      </div>
    </PageShell>
  )
}
