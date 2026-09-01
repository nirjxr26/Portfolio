import type { CaseStudyData } from "@/types"
import { ArrowUpRight, CarouselTrack, FeatureCard, SEO } from "../common"
import { Container, Footer, Header, PageHero } from "../layout"
import { ScrollReveal } from "../providers"

interface CaseStudyPageProps {
  data: CaseStudyData
}

export function CaseStudyPage({ data }: CaseStudyPageProps) {
  const { hero, sections, cta, seoTitle } = data
  const slug = hero.title.toLowerCase()
  const canonicalUrl = `https://nirjar.me/works/${slug}`
  const pageTitle = seoTitle || `${hero.title} | ${typeof hero.headline === "string" ? hero.headline : hero.subhead}`

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
        }}
      />
      <ScrollReveal />
      {/* Shared Global Nav */}
      <Header activePath="/works" />

      {/* Hero Header */}
      <PageHero badge={hero.title} title={hero.headline} subhead={hero.subhead} />

      {/* Feature Sections */}
      {sections.map((section, idx) => {
        const isEven = idx % 2 === 0
        const sectionBgClass = isEven ? "bg-surface-alt" : "bg-canvas"
        const cardBgClass = isEven ? "bg-card" : "bg-surface-alt"

        return (
          <section
            key={section.title}
            className={`overflow-hidden py-14 sm:py-18 ${sectionBgClass}`}
          >
            <Container className="mb-6 sm:mb-8 reveal-on-scroll">
              <h2 className="t-display">{section.title}</h2>
            </Container>

            <div className="reveal-on-scroll">
              <CarouselTrack>
                {section.cards.map((card) => (
                  <FeatureCard key={card.headline} card={card} cardBgClass={cardBgClass} />
                ))}
              </CarouselTrack>
            </div>
          </section>
        )
      })}

      {/* CTA Section */}
      {(() => {
        const isCtaSurfaceAlt = sections.length % 2 === 0
        const ctaBgClass = isCtaSurfaceAlt ? "bg-surface-alt" : "bg-canvas"
        const footerBgClass = isCtaSurfaceAlt ? "bg-canvas" : "bg-surface-alt"

        return (
          <>
            <section className={`${ctaBgClass} py-18 sm:py-24 reveal-on-scroll`}>
              <Container className="text-center max-w-3xl">
                <h2 className="t-hero text-ink">{cta.headline}</h2>
                <p className="t-lead mt-4 text-muted">{cta.body}</p>
                <div className="mt-8 flex justify-center">
                  <a
                    href={cta.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    <span>{cta.action}</span>
                    <ArrowUpRight className="shrink-0" />
                  </a>
                </div>
              </Container>
            </section>

            {/* Shared Footer */}
            <Footer bgClass={footerBgClass} />
          </>
        )
      })()}
    </div>
  )
}
