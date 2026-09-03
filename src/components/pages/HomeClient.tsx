import { articles, frames, hero, quote } from "@/data/home"
import { externalProps } from "@/utils/helpers"
import { ArticleCard, ArrowRight, FeatureCard, ProductionRail, ProjectsRail, SEO } from "../common"
import { CarouselSection, Container, Footer, Header } from "../layout"
import { ScrollReveal } from "../providers"

export function HomeClient() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SEO articles={articles} />
      <ScrollReveal />
      {/* Global nav */}
      <Header activePath="/" />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-canvas pt-28 pb-16 sm:pt-36 sm:pb-20">
          <Container className="text-center">
            <h1 className="t-hero animate-hero-1">
              {hero.headingPrimary}
              <br />
              {hero.headingSecondary}
            </h1>
            <p className="t-lead mx-auto mt-6 max-w-2xl text-muted animate-hero-2">{hero.subheading}</p>
            <div className="mt-8 sm:mt-10 flex flex-col min-[360px]:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0 animate-hero-3">
              {hero.actions.map((action) =>
                action.type === "primary" ? (
                  <a key={action.label} href={action.url} className="btn btn-primary w-full min-[360px]:w-auto" {...externalProps(action.url)}>
                    {action.label}
                  </a>
                ) : (
                  <a key={action.label} href={action.url} className="btn btn-ghost w-full min-[360px]:w-auto">
                    <span>{action.label}</span>
                    <ArrowRight width={14} height={14} />
                  </a>
                ),
              )}
            </div>
          </Container>
        </section>

        {/* What I do */}
        <CarouselSection id="what-i-do" title="What I do." bgClass="bg-surface-alt">
          {frames.map((frame) => (
            <FeatureCard
              key={frame.tag}
              card={{
                headline: frame.title,
                body: frame.desc,
                tag: frame.tag,
              }}
              cardBgClass="bg-card"
            />
          ))}
        </CarouselSection>

        {/* Reusable Work Section (Featured Work + More Works) */}
        <ProjectsRail id="work" bgClass="bg-canvas" cardBgClass="bg-surface-alt" />

        {/* Reusable What I bring to production Section */}
        <ProductionRail bgClass="bg-surface-alt" cardBgClass="bg-card" />

        {/* Articles Section (Above Quote) */}
        <CarouselSection
          id="articles"
          title="Articles."
          bgClass="bg-canvas"
          headerClassName=""
          trackWrapperClassName="mt-6 sm:mt-10"
        >
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </CarouselSection>

        {/* Quote Section (bg-surface-alt) */}
        <section className="bg-surface-alt py-16 text-ink sm:py-20 reveal-on-scroll">
          <Container className="max-w-3xl text-center">
            <blockquote className="t-quote">&ldquo;{quote}&rdquo;</blockquote>
          </Container>
        </section>
      </main>

      {/* Footer (bg-canvas) */}
      <Footer bgClass="bg-canvas border-t border-hairline" />
    </div>
  )
}
