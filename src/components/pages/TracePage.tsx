import type { CaseStudyData, HeroAction } from "@/types"
import { SITE_URL } from "@/data/site"
import { createBreadcrumbs } from "@/utils/helpers"
import { ActionButtons, ActionGroup, HeroAssetPreview, InstallSnippet, LayeredPreview, Seo } from "../common"
import { PageShell } from "../layout"

interface TracePageProps {
  data: CaseStudyData
}

const DIVIDER_COLOR = "border-[#d0d0d0] dark:border-[#3a3a3e]"
const COLUMN_CONTAINER = `w-full max-w-[1240px] mx-auto border-x ${DIVIDER_COLOR}`
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
      outerClassName={`min-h-screen bg-white dark:bg-black text-black dark:text-white ${INTER_FONT} selection:bg-accent selection:text-white`}
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
        Each row is full-width with a horizontal divider (border-b) extending 
        across the screen. The central column has vertical guide lines (border-x).
        Horizontal and vertical lines share identical color in both light and dark themes (border-[#e0e0e0] dark:border-[#333336]).
      */}

      {/* Hero Row: Top installation script removed; visual half visible and bottom attached */}
      <div className={`w-full border-b ${DIVIDER_COLOR}`}>
        <div className={COLUMN_CONTAINER}>
          <section className="pt-16 sm:pt-24 md:pt-28 pb-0 overflow-hidden flex flex-col items-center text-center">
            <div className="px-6 sm:px-12 max-w-3xl mx-auto flex flex-col items-center">
              {hero.title && (
                <span className="font-eurostile text-xs sm:text-sm tracking-widest uppercase text-accent mb-4 sm:mb-5 block select-none">
                  {hero.title}
                </span>
              )}

              <h1 className={`text-[28px] min-[400px]:text-[32px] sm:text-[clamp(32px,4.5vw,52px)] font-semibold ${INTER_FONT} ${TITLE_TRACKING} text-black dark:text-white leading-[1.12] mb-4 sm:mb-6 whitespace-nowrap`}>
                {hero.headline}
              </h1>

              <p className={`text-base sm:text-lg md:text-xl font-normal ${INTER_FONT} ${DESC_COLOR} max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed tracking-normal text-pretty`}>
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
      </div>

      {/* The 4 Feature Sections: Cases -> Drives -> Audit -> AI Agent */}
      {sections.map((section, idx) => (
        <div
          key={typeof section.title === "string" ? section.title : idx}
          className={`w-full border-b ${DIVIDER_COLOR}`}
        >
          <div className={COLUMN_CONTAINER}>
            <section className="p-6 sm:p-10 md:p-12 lg:p-14">
              <div className="reveal-on-scroll max-w-[1028px] mx-auto">
                {/* Two-Column Header: Title on Left, Description on Right (vertically centered along horizontal axis) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12 md:mb-14">
                  {/* Left Column: Title vertically centered */}
                  <div className="flex flex-col justify-center text-left">
                    <h2 className={`text-[30px] sm:text-4xl md:text-[46px] lg:text-[50px] font-semibold ${INTER_FONT} ${TITLE_TRACKING} text-black dark:text-white text-left leading-[1.12]`}>
                      {section.title}
                    </h2>
                  </div>

                  {/* Right Column: Description aligned with the title, 20px font size, tightened leading, normal tracking */}
                  <div className="flex flex-col justify-center text-left">
                    {section.desc && (
                      <p className={`text-[17px] sm:text-[18px] lg:text-[20px] font-normal tracking-normal ${INTER_FONT} ${DESC_COLOR} text-left leading-[1.4] text-pretty`}>
                        {section.desc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Visual below: background covers full width and aligns to the content with added height */}
                {section.layeredAsset && (
                  <div className="w-full text-left">
                    <LayeredPreview
                      {...section.layeredAsset}
                      maxWidthClass="w-full max-w-full"
                      frameClass="py-10 sm:py-14 md:py-18 lg:py-20 px-4 sm:px-8 md:px-12"
                      className="shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
                    />
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      ))}

      {/* Bottom CTA Section with Full-Width Horizontal Dividers */}
      <div className={`w-full border-b ${DIVIDER_COLOR}`}>
        <div className={COLUMN_CONTAINER}>
          <section
            className="py-16 sm:py-24 md:py-28 px-6 sm:px-12 text-center"
            aria-label={`View ${hero.title} on GitHub`}
          >
            <div className="reveal-on-scroll">
              <div className="max-w-2xl mx-auto">
                <h2 className={`text-[34px] sm:text-[clamp(34px,5.2vw,56px)] font-semibold ${INTER_FONT} ${TITLE_TRACKING} text-black dark:text-white leading-[1.12] mb-4`}>
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
          </section>
        </div>
      </div>
    </PageShell>
  )
}
