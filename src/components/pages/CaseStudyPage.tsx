import type { CaseStudyData } from "@/types"
import { SITE_URL } from "@/data/site"
import { alternateSurfaces } from "@/utils/helpers"
import { FeatureCard, Seo } from "../common"
import { CarouselSection, CTASection, PageHero, PageShell } from "../layout"

interface CaseStudyPageProps {
  slug: string
  data: CaseStudyData
}

export function CaseStudyPage({ slug, data }: Readonly<CaseStudyPageProps>) {
  const { hero, sections, cta, seoTitle } = data
  const canonicalUrl = `${SITE_URL}/works/${slug}`
  const pageTitle = seoTitle || `${hero.title} | ${typeof hero.headline === "string" ? hero.headline : hero.subhead}`
  const ctaBgClass = alternateSurfaces(sections.length).section
  const footerBgClass = alternateSurfaces(sections.length + 1).section

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
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Works", url: "/works" },
            { name: hero.title, url: `/works/${slug}` },
          ]}
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
        <PageHero badge={hero.title} title={hero.headline} subhead={hero.subhead} />

        {/* Feature Sections */}
        {sections.map((section, idx) => {
          const { section: sectionBgClass, card: cardBgClass } = alternateSurfaces(idx)

          return (
            <CarouselSection
              key={section.title}
              title={section.title}
              bgClass={sectionBgClass}
            >
              {section.cards.map((card) => (
                <FeatureCard key={card.headline} card={card} cardBgClass={cardBgClass} />
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
          bgClass={ctaBgClass}
          ariaLabel={`View ${hero.title} on GitHub`}
        />
    </PageShell>
  )
}
