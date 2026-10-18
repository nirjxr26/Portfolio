import type { CaseStudyData } from "@/types"
import { SITE_URL } from "@/data/site"
import { alternateSurfaces, createBreadcrumbs } from "@/utils/helpers"
import { CaseStudyHeroMedia, FeatureCard, Seo } from "../common"
import { CarouselSection, CTASection, PageHero, PageShell } from "../layout"

interface CaseStudyPageProps {
  slug: string
  data: CaseStudyData
}

/** One flat surface for the whole page: canvas behind, surface-alt in front. */
const MONO_SURFACES = { section: "bg-canvas", card: "bg-surface-alt" }

export function CaseStudyPage({ slug, data }: Readonly<CaseStudyPageProps>) {
  const { hero, sections, cta, seoTitle } = data
  const canonicalUrl = `${SITE_URL}/works/${slug}`
  const pageTitle = seoTitle || `${hero.title} | ${typeof hero.headline === "string" ? hero.headline : hero.subhead}`
  // The first section keeps the alternating rhythm so the page still opens on a
  // contrast band; `mono` flattens everything after it.
  const surfaces = (index: number) =>
    data.surfaceMode === "mono" && index > 0 ? MONO_SURFACES : alternateSurfaces(index)
  // A mono page runs flat all the way down, so the CTA takes the contrasting
  // surface instead. Ending on the same band the rest of the page sits on makes
  // the close read as an accident rather than a decision.
  const ctaBgClass = data.surfaceMode === "mono" ? MONO_SURFACES.card : surfaces(sections.length).section
  const footerBgClass = surfaces(sections.length + 1).section
  const hasHeroContent = Boolean(
    (hero.installCommands && hero.installCommands.length > 0) || hero.heroAsset
  )

  return (
    <PageShell
      headerPath="/works"
      footerBgClass={footerBgClass}
      seo={
        <Seo
          title={pageTitle}
          description={hero.subhead}
          canonicalUrl={canonicalUrl}
          includeDefaultSchemas={false}
          breadcrumbs={createBreadcrumbs([
            { name: "Works", url: "/works" },
            { name: hero.title, url: `/works/${slug}` },
          ])}
          softwareSchema={{
            name: hero.title,
            description: hero.subhead,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Kubernetes / Linux",
            url: cta.url,
            codeRepository: cta.url,
            programmingLanguage: "Go",
            license: "https://opensource.org/licenses/MIT",
            runtimePlatform: "Kubernetes, Linux, Docker",
            ...data.softwareSchema,
          }}
        />
      }
    >
        {/* Hero Header */}
        <PageHero
          badge={hero.title}
          title={hero.headline}
          subhead={hero.subhead}
          bottomFlush={Boolean(hero.heroAsset)}
          childrenClassName={hasHeroContent ? "flex flex-col items-center w-full" : undefined}
        >
          <CaseStudyHeroMedia
            installCommands={hero.installCommands}
            heroAsset={hero.heroAsset}
          />
        </PageHero>

        {/* Feature Sections */}
        {sections.map((section, idx) => {
          const { section: sectionBgClass, card: cardBgClass } = surfaces(idx)

          return (
            <CarouselSection
              key={typeof section.title === "string" ? section.title : idx}
              tag={section.tag}
              tagClassName={section.tagClassName}
              title={section.title}
              titleClassName={section.titleClassName}
              desc={section.desc}
              descClassName={section.descClassName}
              media={section.media}
              layeredAsset={section.layeredAsset}
              bgClass={sectionBgClass}
              // The final section is followed by the CTA, which carries its own
              // padding. Matching it keeps the band change centred in the gap;
              // every other mockup keeps the tighter default from
              // CarouselSection so it sits close to the content beneath it.
              padClass={
                idx === sections.length - 1 && (section.layeredAsset || section.media)
                  ? "pt-14 sm:pt-18 pb-17"
                  : undefined
              }
              centeredHeader={Boolean(section.centeredHeader)}
              afterCards={section.afterCards}
            >
              {section.cards?.map((card) => (
                <FeatureCard
                  key={card.headline}
                  card={card}
                  cardBgClass={cardBgClass}
                  wide={Boolean(section.wideCards || card.wide)}
                  centered={Boolean(section.centeredCards || card.centered)}
                />
              ))}
            </CarouselSection>
          )
        })}

        {/* CTA Section */}
        <CTASection
          headline={cta.headline}
          body={cta.body}
          action={cta.action}
          url={cta.url}
          secondaryAction={cta.secondaryAction}
          installCommands={cta.installCommands}
          bgClass={ctaBgClass}
          ariaLabel={`View ${hero.title} on GitHub`}
        />
    </PageShell>
  )
}
