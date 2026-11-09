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
const INTER_FONT = "font-display"
const UNIVERS_FONT = "font-univers"

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
      {/* Hero Section: Centered header, MacBook CLI mockup attached to the bottom */}
      <section className="pt-32 min-[480px]:pt-36 sm:pt-40 md:pt-44 pb-0 overflow-hidden flex flex-col items-center text-center">
        <div className="px-6 sm:px-12 max-w-3xl mx-auto flex flex-col items-center">
          {hero.title && (
            <span className="font-inter-variable font-extrabold text-base sm:text-lg tracking-normal uppercase text-accent mb-4 sm:mb-5 block select-none">
              {hero.title}
            </span>
          )}

          <h1 className={`text-[30px] sm:text-[clamp(34px,5.2vw,56px)] font-semibold ${INTER_FONT} text-ink leading-[1.12] mb-4 sm:mb-6 whitespace-normal sm:whitespace-nowrap tracking-[-0.005em]`}>
            {hero.headline}
          </h1>

          <p className={`text-[15px] sm:text-[24px] font-normal ${UNIVERS_FONT} text-muted max-w-2xl mx-auto mb-8 sm:mb-12 leading-[1.5] text-pretty`}>
            {hero.subhead}
          </p>
        </div>

        {/* Hero Visual: MacBook CLI mockup */}
        {hero.heroAsset && (
          <div className="w-full max-w-full flex justify-center mt-2 sm:mt-6 px-4 min-[414px]:px-6 sm:px-8 md:px-10 lg:px-12 overflow-hidden">
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
          <div className="reveal-on-scroll w-full text-left">
            <h2 className={`text-[24px] min-[375px]:text-[28px] sm:text-[clamp(30px,3.6vw,40px)] font-semibold ${INTER_FONT} text-ink text-left text-pretty leading-[1.2] sm:leading-[1.1] tracking-[-0.005em]`}>
              A forensic tool that does the paperwork.
            </h2>
            <p className={`mt-3 sm:mt-4 text-base min-[375px]:text-[17px] sm:text-[19px] md:text-[20px] font-normal ${UNIVERS_FONT} text-muted text-left text-pretty leading-[1.5] max-w-2xl`}>
              Trace opens the case, logs every action, and chains each record to the last, so your evidence stays provable without you stopping to write anything down.
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
              {/* Header: title with description stacked below, Inter font with main site font size and weight */}
              <div className="mb-6 sm:mb-8">
                <h2 className={`text-[30px] sm:text-[clamp(30px,3.6vw,40px)] font-semibold ${INTER_FONT} text-ink text-left leading-[1.1] tracking-[-0.005em]`}>
                  {section.title}
                </h2>
                {section.desc && (
                  <p className={`text-sm sm:text-[18px] font-normal ${UNIVERS_FONT} text-muted leading-[1.5] mt-3 sm:mt-4 max-w-lg text-left text-pretty`}>
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

      {/* Bottom CTA Section: with theme-adaptive alternating surface background */}
      <section
        className="w-full bg-surface-alt pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 text-center"
        aria-label={`View ${hero.title} on GitHub`}
      >
        <div className={CONTAINER}>
          <div className="reveal-on-scroll">
            <div className="max-w-2xl mx-auto">
              <h2 className={`text-[30px] sm:text-[clamp(34px,5.2vw,56px)] font-semibold ${INTER_FONT} text-ink leading-[1.12] mb-4 tracking-[-0.005em]`}>
                {cta.headline}
              </h2>
              <p className={`text-sm sm:text-[18px] font-normal ${UNIVERS_FONT} text-muted max-w-xl mx-auto mb-8 leading-[1.5]`}>
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
