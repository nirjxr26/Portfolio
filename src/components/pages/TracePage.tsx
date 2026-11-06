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
const INTER_FONT = "font-['Inter_Variable',Inter,sans-serif]"
const TITLE_TRACKING = "tracking-[0.015em]"
const DESC_COLOR = "text-[#6E6E73] dark:text-[#B8B8BD]"

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
      outerClassName={`min-h-screen bg-canvas text-ink ${INTER_FONT} selection:bg-accent selection:text-white`}
      footerBgClass="bg-canvas"
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

          <h1 className={`text-[28px] min-[400px]:text-[32px] sm:text-[clamp(32px,4.5vw,52px)] font-semibold ${INTER_FONT} ${TITLE_TRACKING} text-ink leading-[1.12] mb-4 sm:mb-6 whitespace-normal sm:whitespace-nowrap`}>
            {hero.headline}
          </h1>

          <p className={`text-base sm:text-lg md:text-xl font-normal ${INTER_FONT} ${DESC_COLOR} max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed tracking-[0.015em] text-pretty`}>
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
            <p className={`text-[26px] sm:text-[32px] md:text-[38px] font-semibold ${INTER_FONT} ${TITLE_TRACKING} leading-[1.2] text-left text-pretty`}>
              <span className="text-ink">A forensic tool that does the paperwork.</span>{" "}
              <span className={DESC_COLOR}>Trace opens the case, logs every action, and chains each record to the last, so your evidence stays provable without you stopping to write anything down.</span>
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
              {/* Header: title with description stacked below, left-aligned */}
              <div className="mb-8 sm:mb-10 md:mb-12">
                <h2 className={`text-[30px] sm:text-4xl md:text-[46px] lg:text-[50px] font-semibold ${INTER_FONT} ${TITLE_TRACKING} text-ink text-left leading-[1.12]`}>
                  {section.title}
                </h2>
                {section.desc && (
                  <p className={`mt-4 sm:mt-5 max-w-2xl text-[17px] sm:text-[18px] lg:text-[20px] font-normal tracking-normal ${INTER_FONT} ${DESC_COLOR} text-left leading-[1.45] text-pretty`}>
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
        className="w-full pt-14 sm:pt-18 md:pt-24 pb-20 sm:pb-24 md:pb-28 text-center"
        aria-label={`View ${hero.title} on GitHub`}
      >
        <div className={CONTAINER}>
          <div className="reveal-on-scroll">
            <div className="max-w-2xl mx-auto">
              <h2 className={`text-[34px] sm:text-[clamp(34px,5.2vw,56px)] font-semibold ${INTER_FONT} ${TITLE_TRACKING} text-ink leading-[1.12] mb-4`}>
                {cta.headline}
              </h2>
              <p className={`text-base sm:text-lg md:text-xl font-normal ${INTER_FONT} ${DESC_COLOR} max-w-xl mx-auto mb-8 leading-relaxed`}>
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
          </div>
        </div>
      </section>
    </PageShell>
  )
}
