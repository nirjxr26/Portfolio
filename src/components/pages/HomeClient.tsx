import { articles, frames, hero, quote } from "@/data/home"
import { AppButton, ArticleCard, ArrowRight, FeatureCard, ProductionRail, ProjectsRail, Seo } from "../common"
import { CarouselSection, Container, PageShell } from "../layout"

const HIDDEN_HOME_TITLES = new Set([
  "Bastion's Path from Docker to Kubernetes",
  "DeployLens: Finding My Deployment Blind Spots",
])

export function HomeClient() {
  const homeArticles = articles.filter((a) => !HIDDEN_HOME_TITLES.has(a.title))

  return (
    <PageShell headerPath="/" footerBgClass="bg-canvas border-t border-hairline" seo={<Seo articles={articles} />}>
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
                  <AppButton key={action.label} href={action.url} variant="primary" className="w-full min-[360px]:w-auto">
                    {action.label}
                  </AppButton>
                ) : (
                  <AppButton key={action.label} href={action.url} variant="ghost" className="w-full min-[360px]:w-auto">
                    <span>{action.label}</span>
                    <ArrowRight width={14} height={14} />
                  </AppButton>
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

        {/* Articles Section (Above Quote) — Bastion + DeployLens hidden here, still in /article bento */}
        <CarouselSection
          id="articles"
          title="Articles."
          bgClass="bg-canvas"
          headerClassName=""
          trackWrapperClassName="mt-6 sm:mt-10"
        >
          {homeArticles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </CarouselSection>
        <div className="flex justify-center bg-canvas pb-12 sm:pb-16 reveal-on-scroll">
          <AppButton href="/articles" variant="ghost">
            <span>View articles</span>
            <ArrowRight width={14} height={14} />
          </AppButton>
        </div>

        {/* Quote Section (bg-surface-alt) */}
        <section className="bg-surface-alt py-16 text-ink sm:py-20 reveal-on-scroll">
          <Container className="max-w-3xl text-center">
            <blockquote className="t-quote">&ldquo;{quote}&rdquo;</blockquote>
          </Container>
        </section>
    </PageShell>
  )
}
