import type { CaseStudyData } from "@/types"
import { SITE_URL } from "@/app/seo/site"
import { createBreadcrumbs } from "@/lib/helpers"
import { LayeredPreview, Seo } from "@/components"
import { TraceCommandLine } from "@/features/trace/components/TraceCommandLine"
import { CTASection, PageShell } from "@/components/layout"

interface TracePageProps {
  data: CaseStudyData
}

const CONTAINER = "w-full max-w-[1100px] mx-auto px-6 sm:px-8 md:px-10"
const INTER_FONT = "font-display"
const UNIVERS_FONT = "font-univers"

export function TracePage({ data }: Readonly<TracePageProps>) {
  const { hero, sections, cta, seoTitle } = data
  const canonicalUrl = `${SITE_URL}/works/trace`
  const ogImage = `${SITE_URL}/assets/og/trace_og.svg`
  const pageTitle = seoTitle || `${hero.title} | ${typeof hero.headline === "string" ? hero.headline : hero.subhead}`
  const renderSectionBlock = (
    section: (typeof sections)[number],
    key: string | number,
    className = "",
  ) => (
    <div key={key} className={`w-full ${className}`.trim()}>
      <div className="reveal-on-scroll w-full">
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

        {section.layeredAsset && (
          <div className="w-full text-left">
            <LayeredPreview
              {...section.layeredAsset}
              maxWidthClass="w-full max-w-full"
              frameClass="p-10 sm:p-16 md:p-20"
              mobilePaddingClass="inset-0"
              mobileFrameClass="absolute inset-0 flex w-full items-center justify-start pointer-events-none p-10 sm:p-16 md:p-20 sm:relative sm:inset-auto sm:justify-center"
            />
          </div>
        )}
      </div>
    </div>
  )

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
          ogImage={ogImage}
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
      <section className="py-24 sm:py-28 md:py-32 overflow-hidden flex flex-col items-center text-center">
        <div className="px-6 sm:px-12 max-w-3xl mx-auto flex flex-col items-center text-center">
          {hero.title && (
            <span className="font-inter-variable font-extrabold text-base sm:text-lg tracking-normal uppercase text-accent mb-4 sm:mb-5 block select-none reveal-on-scroll">
              {hero.title}
            </span>
          )}

          <h1 className={`text-[30px] sm:text-[clamp(34px,5.2vw,56px)] font-semibold ${UNIVERS_FONT} text-ink leading-[1.12] mb-4 sm:mb-6 whitespace-normal sm:whitespace-nowrap tracking-normal reveal-on-scroll`}>
            {hero.headline}
          </h1>

          <p className={`text-[17px] sm:text-[24px] font-medium ${UNIVERS_FONT} text-muted mx-auto sm:max-w-2xl mb-8 sm:mb-12 leading-[1.5] text-center text-pretty reveal-on-scroll`}>
            {hero.subhead}
          </p>
        </div>

        {/* Hero Visual: Trace TUI over landscape artwork */}
        {hero.heroLayeredAsset && (
          <div className="w-full max-w-full flex justify-center mt-2 sm:mt-6 px-6 sm:px-8 md:px-10">
            <LayeredPreview
              {...hero.heroLayeredAsset}
              priority
              maxWidthClass="max-w-4xl lg:max-w-[1152px]"
              mobileFrameClass="absolute inset-0 flex w-full items-center justify-start pointer-events-none p-10 sm:relative sm:inset-auto sm:justify-center lg:px-[max(40px,calc(50%_-_472px))]"
              className="animate-device-rise"
            />
          </div>
        )}
      </section>

      {/* Section 1: intro and command line */}
      <section className="w-full bg-surface-alt py-16 sm:py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="w-full text-left">
            <h2 className={`text-[24px] min-[375px]:text-[28px] sm:text-[clamp(30px,3.6vw,40px)] font-semibold ${INTER_FONT} text-ink text-left text-pretty leading-[1.2] sm:leading-[1.1] tracking-[-0.005em]`}>
              A forensic tool that does the paperwork.
            </h2>
            <p className={`mt-3 sm:mt-4 text-sm sm:text-[18px] font-normal ${UNIVERS_FONT} text-muted text-left text-pretty leading-[1.5] max-w-2xl`}>
              Trace opens the case, logs every action, and chains each record to the last, so your evidence stays provable without you stopping to write anything down.
            </p>
          </div>

          <div className="mt-8 sm:mt-10">
            <TraceCommandLine screenWidthClass="w-full sm:w-[70%]" replay />
          </div>
        </div>
      </section>

      {/* Section 2: cases, drives, audit and agents on pure black */}
      <section className="w-full bg-white dark:bg-black py-20 sm:py-24 md:py-28">
        <div className={CONTAINER}>
          {sections.map((section, idx) =>
            renderSectionBlock(section, typeof section.title === "string" ? section.title : idx, idx === 0 ? "" : "mt-20 sm:mt-28 md:mt-32"),
          )}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <CTASection
        headline={cta.headline}
        body={cta.body}
        action={typeof cta.action === "string" ? cta.action : "View on GitHub"}
        url={cta.url}
        secondaryAction={cta.secondaryAction}
        installCommands={cta.installCommands}
        bgClass="bg-surface-alt"
        paddingClass="py-16 sm:py-20 md:py-24"
        ariaLabel={`View ${hero.title} on GitHub`}
      />
    </PageShell>
  )
}
