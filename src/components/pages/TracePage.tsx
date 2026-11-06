import type { CaseStudyData, HeroAction } from "@/types"
import { SITE_URL } from "@/data/site"
import { createBreadcrumbs } from "@/utils/helpers"
import { ActionButtons, ActionGroup, HeroAssetPreview, InstallSnippet, LayeredPreview, Seo } from "../common"
import { PageShell } from "../layout"

interface TracePageProps {
  data: CaseStudyData
}

/**
 * Grid dividers and vertical guides are painted on the full-width row via
 * linear gradients in background-image. This ensures both horizontal lines
 * and vertical guides share the exact same rendering pipeline, pixel alignment,
 * and opacity with zero border-image antialiasing loss.
 */
const ROW_DIVIDER =
  "relative w-full [background-image:linear-gradient(var(--trace-line),var(--trace-line))] [background-size:100%_1px] [background-position:0_100%] [background-repeat:no-repeat] [--trace-gutter:1.5rem] lg:[--trace-gutter:2rem] [background-image:linear-gradient(var(--trace-line),var(--trace-line)),linear-gradient(var(--trace-line),var(--trace-line)),linear-gradient(var(--trace-line),var(--trace-line))] [background-size:100%_1px,1px_100%,1px_100%] [background-position:0_100%,max(var(--trace-gutter),calc((100%_-_1240px)_/_2))_0,min(calc(100%_-_var(--trace-gutter)_-_1px),calc((100%_+_1240px)_/_2_-_1px))_0]"
const COLUMN_CONTAINER = "relative w-full max-w-[1240px] mx-auto px-6 lg:px-0"
const INTER_FONT = "font-['Inter_Variable',Inter,sans-serif]"
const TITLE_TRACKING = "tracking-[0.015em]"
const DESC_COLOR = "text-[#6E6E73] dark:text-[#B8B8BD]"
/** Equal padding on all 4 sides, uniform below 1024 down to mobile. */
const SECTION_PADDING = "p-6 lg:p-12"

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
        Each row is full-width with a 1px border-image divider, which stays on
        one device pixel and matches the vertical guides exactly. The guides are
        painted on the row background, inset from the screen edges above `sm`.
        Both directions read from the same --trace-line token, so they stay
        identical in color and opacity in light and dark themes.
      */}

      {/* Hero Row: Top installation script removed; visual half visible and bottom attached */}
      <div className={ROW_DIVIDER}>
        <div className={COLUMN_CONTAINER}>
          <section className="pt-16 sm:pt-24 md:pt-28 pb-0 overflow-hidden flex flex-col items-center text-center">
            <div className="px-6 sm:px-12 max-w-3xl mx-auto flex flex-col items-center">
              {hero.title && (
                <span className="font-eurostile text-xs sm:text-sm tracking-widest uppercase text-accent mb-4 sm:mb-5 block select-none">
                  {hero.title}
                </span>
              )}

              <h1 className={`text-[28px] min-[400px]:text-[32px] sm:text-[clamp(32px,4.5vw,52px)] font-semibold ${INTER_FONT} ${TITLE_TRACKING} text-black dark:text-white leading-[1.12] mb-4 sm:mb-6 whitespace-normal sm:whitespace-nowrap`}>
                {hero.headline}
              </h1>

              <p className={`text-base sm:text-lg md:text-xl font-normal ${INTER_FONT} ${DESC_COLOR} max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed tracking-[0.015em] text-pretty`}>
                {hero.subhead}
              </p>
            </div>

            {/* Hero Visual: MacBook CLI mockup, half visible and attached to the bottom border */}
            {hero.heroAsset && (
              <div className="w-full max-w-full flex justify-center mt-2 sm:mt-6 overflow-hidden">
                <HeroAssetPreview
                  asset={hero.heroAsset}
                  className="w-full max-w-4xl lg:max-w-5xl"
                />
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Intro Row: plain-language summary directly below the hero */}
      <div className={ROW_DIVIDER}>
        <div className={COLUMN_CONTAINER}>
          <section className={SECTION_PADDING}>
            <div className="reveal-on-scroll w-full">
              <p className={`text-[30px] font-semibold ${INTER_FONT} ${TITLE_TRACKING} leading-[1.1] text-left text-pretty`}>
                <span className="text-ink">A forensic tool that does the paperwork.</span>{" "}
                <span className={DESC_COLOR}>Trace opens the case, logs every action, and chains each record to the last, so your evidence stays provable without you stopping to write anything down.</span>
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* The 4 Feature Sections: Cases -> Drives -> Audit -> AI Agent */}
      {sections.map((section, idx) => (
        <div
          key={typeof section.title === "string" ? section.title : idx}
          className={ROW_DIVIDER}
        >
          <div className={COLUMN_CONTAINER}>
            <section className={SECTION_PADDING}>
              <div className="reveal-on-scroll w-full">
                {/* Header: title with the description stacked below, both left aligned */}
                <div className="mb-8 sm:mb-12 md:mb-14">
                  <h2 className={`text-[30px] sm:text-4xl md:text-[46px] lg:text-[50px] font-semibold ${INTER_FONT} ${TITLE_TRACKING} text-black dark:text-white text-left leading-[1.12]`}>
                    {section.title}
                  </h2>
                  {section.desc && (
                    <p className={`mt-4 sm:mt-5 max-w-2xl text-[17px] sm:text-[18px] lg:text-[20px] font-normal tracking-normal ${INTER_FONT} ${DESC_COLOR} text-left leading-[1.4] text-pretty`}>
                      {section.desc}
                    </p>
                  )}
                </div>

                {/* Visual below: background covers full width and aligns to the content with added height */}
                {section.layeredAsset && (
                  <div className="w-full text-left">
                    <LayeredPreview
                      {...section.layeredAsset}
                      maxWidthClass="w-full max-w-full"
                      frameClass="p-6 lg:p-12"
                    />
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      ))}

      {/* Bottom CTA Section with Full-Width Horizontal Dividers */}
      <div className={ROW_DIVIDER}>
        <div className={COLUMN_CONTAINER}>
          <section
            className={`${SECTION_PADDING} text-center`}
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
