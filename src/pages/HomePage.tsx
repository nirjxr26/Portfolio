import { articles, frames, hero, quote } from "@/features/home/data/home"
import {
  ActionButtons,
  ActionGroup,
  AgentMarkdownView,
  ArticlePosterCard,
  FeatureCard,
  LightButton,
  ProjectsRail,
  Seo,
  ThinkingAndWorkingSection,
} from "@/components"
import { CarouselSection, Container, PageShell, Section } from "@/components/layout"
import { useAgentMode } from "@/hooks/useAgentMode"

const SERVICE_FRAME_CARDS = frames.map((frame) => ({
  headline: frame.title,
  body: frame.desc,
  tag: frame.tag,
}))

export function HomePage() {
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
              <p className="t-lead text-[17px] sm:text-[clamp(15px,2.2vw,24px)] font-medium mx-auto mt-6 max-w-2xl text-muted animate-hero-2">{hero.subheading}</p>
              <ActionGroup className="mt-8 sm:mt-10 px-4 sm:px-0 animate-hero-3">
                <ActionButtons actions={hero.actions} />
              </ActionGroup>
            </Container>
          </section>

          <CarouselSection
            id="services"
            title="Services."
            bgClass="bg-surface-alt"
            afterCards={
              <div className="reveal-on-scroll mt-8 sm:mt-10 flex justify-center px-4">
                <LightButton href="/services" arrow>
                  View all services
                </LightButton>
              </div>
            }
          >
            {SERVICE_FRAME_CARDS.map((card) => (
              <FeatureCard key={card.tag} card={card} cardBgClass="bg-card" />
            ))}
          </CarouselSection>

          <ProjectsRail id="work" bgClass="bg-canvas" cardBgClass="bg-surface-alt" />

          <ThinkingAndWorkingSection id="how-i-think" bgClass="bg-surface-alt" cardBgClass="bg-card" />

          <CarouselSection
            id="articles"
            title="Articles."
            bgClass="bg-canvas"
            headerClassName=""
            trackWrapperClassName="mt-6 sm:mt-10"
            afterCards={
              <div className="reveal-on-scroll mt-8 sm:mt-10 flex justify-center px-4">
                <LightButton href="/articles" arrow>
                  View other articles
                </LightButton>
              </div>
            }
          >
            {homeArticles.map((article) => (
              <ArticlePosterCard
                key={article.title}
                article={article}
                className="w-[280px] min-[375px]:w-[320px] sm:w-[380px] md:w-[400px] shrink-0 snap-start"
              />
            ))}
          </CarouselSection>

          <Section bgClass="bg-surface-alt" padClass="py-16 sm:py-20 text-ink">
            <Container size="wide" className="text-center text-pretty sm:text-balance reveal-on-scroll">
              <blockquote className="t-quote font-univers">{quote}</blockquote>
            </Container>
          </Section>
        </div>
      )}
    </PageShell>
  )
}
