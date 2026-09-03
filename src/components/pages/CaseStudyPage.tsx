import type { CaseStudyData } from "@/types"
import { FeatureCard, SEO } from "../common"
import { CarouselSection, CTASection, Footer, Header, PageHero } from "../layout"
import { ScrollReveal } from "../providers"

interface CaseStudyPageProps {
  data: CaseStudyData
}

export function CaseStudyPage({ data }: CaseStudyPageProps) {
  const { hero, sections, cta, seoTitle } = data
  const slug = hero.title.toLowerCase()
  const canonicalUrl = `https://nirjar.me/works/${slug}`
  const pageTitle = seoTitle || `${hero.title} | ${typeof hero.headline === "string" ? hero.headline : hero.subhead}`
  const isCtaSurfaceAlt = sections.length % 2 === 0
  const ctaBgClass = isCtaSurfaceAlt ? "bg-surface-alt" : "bg-canvas"
  const footerBgClass = isCtaSurfaceAlt ? "bg-canvas" : "bg-surface-alt"

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SEO
        title={pageTitle}
        description={hero.subhead}
        canonicalUrl={canonicalUrl}
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
      <ScrollReveal />
      {/* Shared Global Nav */}
      <Header activePath="/works" />

      <main id="main-content">
        {/* Hero Header */}
        <PageHero badge={hero.title} title={hero.headline} subhead={hero.subhead} />

        {/* Feature Sections */}
        {sections.map((section, idx) => {
          const isEven = idx % 2 === 0
          const sectionBgClass = isEven ? "bg-surface-alt" : "bg-canvas"
          const cardBgClass = isEven ? "bg-card" : "bg-surface-alt"

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
      </main>

      {/* Shared Footer */}
      <Footer bgClass={footerBgClass} />
    </div>
  )
}
