import type { CaseStudyData, HeroAction } from "@/types"
import { SITE_URL } from "@/data/site"
import { createBreadcrumbs } from "@/utils/helpers"
import { ActionButtons, ActionGroup, HeroAssetPreview, InstallSnippet, LayeredPreview, Seo } from "../common"
import { PageShell } from "../layout"

interface TracePageProps {
  data: CaseStudyData
}

const CONTAINER = "w-full max-w-[1100px] mx-auto px-6 sm:px-8 md:px-10"
const FEATURE_SECTION_SPACING = "py-8 sm:py-10 md:py-12 lg:py-14"

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
      outerClassName="min-h-screen bg-canvas text-ink selection:bg-accent selection:text-white"
      footerBgClass="bg-surface-alt"
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
      {/* Hero Section: Centered header, MacBook CLI mockup attached to the bottom */}
      <section className="pt-16 sm:pt-24 md:pt-32 pb-0 overflow-hidden flex flex-col items-center text-center">
        <div className="px-6 sm:px-12 max-w-3xl mx-auto flex flex-col items-center">
          {hero.title && (
            <span className="font-eurostile text-xs sm:text-sm tracking-widest uppercase text-accent mb-4 sm:mb-5 block select-none">
              {hero.title}
            </span>
          )}

          <h1 className="t-hero text-ink mb-4 sm:mb-6 whitespace-normal sm:whitespace-nowrap">
            {hero.headline}
          </h1>

          <p className="t-lead text-muted max-w-2xl mx-auto mb-8 sm:mb-12 text-pretty">
            {hero.subhead}
          </p>
        </div>

        {/* Hero Visual: MacBook CLI mockup */}
        {hero.heroAsset && (
          <div className="w-full max-w-full flex justify-center mt-2 sm:mt-6 overflow-hidden">
            <HeroAssetPreview
              asset={hero.heroAsset}
              className="w-full max-w-4xl lg:max-w-5xl"
            />
          </div>
        )}
      </section>

      {/* Intro Section: Plain-language summary with theme-adaptive alternating surface background */}
      <section className="w-full bg-surface-alt py-16 sm:py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="reveal-on-scroll max-w-4xl text-left">
            <p className="t-display text-ink text-left text-pretty !leading-[1.1]">
              <span className="text-ink">A forensic tool that does the paperwork.</span>{" "}
              <span className="text-muted">Trace opens the case, logs every action, and chains each record to the last, so your evidence stays provable without you stopping to write anything down.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Feature Sections: Cases -> Drives -> Audit -> AI Agent */}
      {sections.map((section, idx) => (
        <section
          key={typeof section.title === "string" ? section.title : idx}
          className={`w-full ${FEATURE_SECTION_SPACING}`}
        >
          <div className={CONTAINER}>
            <div className="reveal-on-scroll w-full">
              {/* Header: title with description stacked below, matching main website font size and weight */}
              <div className="mb-6 sm:mb-8">
                <h2 className="t-display text-ink text-left">
                  {section.title}
                </h2>
                {section.desc && (
                  <p className="t-body text-muted text-sm sm:text-base font-normal leading-relaxed mt-3 sm:mt-4 max-w-lg text-left text-pretty">
                    {section.desc}
                  </p>
                )}
              </div>

              {/* Visual preview: left-aligned, full container width, equal padding on all 4 sides */}
              {section.layeredAsset && (
                <div className="w-full text-left">
                  <LayeredPreview
                    {...section.layeredAsset}
                    maxWidthClass="w-full max-w-full"
                    frameClass="p-6 sm:p-10 md:p-12 lg:p-14"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA Section */}
      <section
        className="w-full bg-canvas pt-14 sm:pt-18 md:pt-24 pb-20 sm:pb-24 md:pb-28 text-center"
        aria-label={`View ${hero.title} on GitHub`}
      >
        <div className={CONTAINER}>
          <div className="reveal-on-scroll">
            <div className="max-w-2xl mx-auto">
              <h2 className="t-hero text-ink mb-4">
                {cta.headline}
              </h2>
              <p className="t-body text-muted text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                {cta.body}
              </p>
            </div>

            <ActionGroup className="mt-8">
              <ActionButtons
                actions={ctaActions}
                className="w-full min-[360px]:w-[195px] sm:w-[195px] h-[48px] px-6 py-3 text-center justify-center whitespace-nowrap"
              />
            </ActionGroup>

            {cta.installCommands && cta.installCommands.length > 0 && (
              <div className="hidden sm:flex mt-10 justify-center w-full">
                <InstallSnippet commands={cta.installCommands} />
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
