import { articles, frames, hero, productionCapabilities, quote } from "@/data/home"
import { HOW_I_WORK_CARDS } from "@/data/services"
import {
  ActionButtons,
  ActionGroup,
  AgentMarkdownView,
  ArticlePosterCard,
  CarouselTrack,
  FeatureCard,
  LightButton,
  ProjectsRail,
  Seo,
} from "../common"
import { CarouselSection, Container, PageShell, Section, SectionHeader } from "../layout"
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
              <p className="t-lead font-medium mx-auto mt-6 max-w-2xl text-muted animate-hero-2">{hero.subheading}</p>
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
                <LightButton href="/services" arrow className="bg-card">
                  View all services
                </LightButton>
              </div>
            }
          >
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

          <ProjectsRail id="work" bgClass="bg-canvas" cardBgClass="bg-surface-alt" />

          <Section id="how-i-think" bgClass="bg-surface-alt">
            <SectionHeader title="How I think." />

            <div className="reveal-on-scroll">
              <CarouselTrack>
                {productionCapabilities.map((cap) => (
                  <FeatureCard
                    key={cap.title}
                    card={{
                      headline: cap.tagline,
                      body: cap.desc,
                      tag: cap.title,
                    }}
                    cardBgClass="bg-card"
                  />
                ))}
              </CarouselTrack>
            </div>

            <div id="how-i-work" className="mt-12 sm:mt-16 scroll-mt-12">
              <SectionHeader title="How I work." />

              <div className="reveal-on-scroll">
                <CarouselTrack>
                  {HOW_I_WORK_CARDS.map((card) => (
                    <FeatureCard
                      key={card.tag}
                      card={{
                        headline: card.title,
                        body: card.desc,
                        tag: card.tag,
                      }}
                      cardBgClass="bg-card"
                    />
                  ))}
                </CarouselTrack>
              </div>
            </div>
          </Section>

          <CarouselSection
            id="articles"
            title="Articles."
            bgClass="bg-canvas"
            headerClassName=""
            trackWrapperClassName="mt-6 sm:mt-10"
            afterCards={
              <div className="reveal-on-scroll mt-8 sm:mt-10 flex justify-center px-4">
                <LightButton href="/articles" arrow className="bg-surface-alt">
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

          <section className="bg-surface-alt py-16 text-ink sm:py-20">
            <Container size="wide" className="text-center text-pretty sm:text-balance reveal-on-scroll">
              <blockquote className="t-quote">&ldquo;{quote}&rdquo;</blockquote>
            </Container>
          </section>
        </div>
      )}
    </PageShell>
  )
}
