import { articles, frames, hero, quote } from "@/data/home"
import {
  ActionButtons,
  ActionGroup,
  AgentMarkdownView,
  ArticlePosterCard,
  FeatureCard,
  LightButton,
  ProductionRail,
  ProjectsRail,
  Seo,
} from "../common"
import { CarouselSection, Container, PageShell } from "../layout"
import { useAgentMode } from "@/utils/useAgentMode"

export function HomeClient() {
  const { isAgentMode } = useAgentMode()
  const homeArticles = articles.filter((a) => !a.hideFromHome && a.poster != null)

  return (
    <PageShell
      headerPath="/"
      footerBgClass="bg-canvas border-t border-hairline"
      seo={<Seo articles={articles} />}
      hideHeader={isAgentMode}
      hideFooter={isAgentMode}
    >
      {isAgentMode ? (
        <AgentMarkdownView />
      ) : (
        <div key="visual-view" className="animate-agent-enter">
          <section className="bg-canvas pt-28 pb-16 sm:pt-36 sm:pb-20">
            <Container className="text-center">
              <h1 className="t-hero animate-hero-1">
                {hero.headingPrimary}
                <br />
                {hero.headingSecondary}
              </h1>
              <p className="t-lead mx-auto mt-6 max-w-2xl text-muted animate-hero-2">{hero.subheading}</p>
              <ActionGroup className="mt-8 sm:mt-10 px-4 sm:px-0 animate-hero-3">
                <ActionButtons actions={hero.actions} />
              </ActionGroup>
            </Container>
          </section>

          <CarouselSection
            id="what-i-do"
            title="What I do."
            bgClass="bg-surface-alt"
            afterCards={
              <div className="reveal-on-scroll mt-10 sm:mt-12 flex flex-col items-center justify-center text-center px-4">
                <p className="text-base sm:text-lg text-muted font-normal max-w-xl mb-4 sm:mb-5">
                  <span className="text-ink font-semibold">Also working with:</span>{" "}
                  System Design · Backend Development · Code Quality
                </p>
                <LightButton href="/services" arrow className="bg-card">
                  View all services
                </LightButton>
              </div>
            }
          >
            {frames.map((frame) => (
              <FeatureCard
                key={frame.title}
                card={{
                  headline: frame.title,
                  body: frame.desc,
                  tag: frame.tag,
                }}
                cardBgClass="bg-card"
              />
            ))}
          </CarouselSection>

          <ProjectsRail id="work" bgClass="bg-canvas" cardBgClass="bg-surface-alt" />

          <ProductionRail bgClass="bg-surface-alt" cardBgClass="bg-card" />

          <CarouselSection
            id="articles"
            title="Articles."
            bgClass="bg-canvas"
            headerClassName=""
            trackWrapperClassName="mt-6 sm:mt-10"
          >
            {homeArticles.map((article) => (
              <ArticlePosterCard
                key={article.title}
                article={article}
                className="w-[280px] min-[375px]:w-[320px] sm:w-[380px] md:w-[400px] shrink-0 snap-start"
              />
            ))}
          </CarouselSection>
          <div className="flex justify-center bg-canvas pb-12 sm:pb-16 reveal-on-scroll">
            <LightButton href="/articles" arrow>
              View other articles
            </LightButton>
          </div>

          <section className="bg-surface-alt py-16 text-ink sm:py-20 reveal-on-scroll">
            <Container size="wide" className="text-center text-pretty sm:text-balance">
              <blockquote className="t-quote">&ldquo;{quote}&rdquo;</blockquote>
            </Container>
          </section>
        </div>
      )}
    </PageShell>
  )
}
