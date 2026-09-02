import { articles, frames, hero, productionCapabilities, projects, quote } from "@/data/home"
import { externalProps } from "@/utils/helpers"
import { ArrowUpRight, CarouselTrack, FeatureCard, ProjectCard, SEO } from "../common"
import { Container, Footer, Header } from "../layout"
import { ScrollReveal } from "../providers"

export function HomeClient() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SEO />
      <ScrollReveal />
      {/* Global nav */}
      <Header activePath="/" />

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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* What I do */}
      <section id="what-i-do" className="scroll-mt-12 overflow-hidden bg-surface-alt py-14 sm:py-18">
        <Container className="mb-6 sm:mb-8 reveal-on-scroll">
          <h2 className="t-display">What I do.</h2>
        </Container>

        {/* Apple-style horizontal scrolling card rail */}
        <div className="reveal-on-scroll">
          <CarouselTrack>
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
          </CarouselTrack>
        </div>
      </section>

      {/* Work Section (Featured Work + More Works) */}
      <section id="work" className="scroll-mt-12 overflow-hidden bg-canvas py-14 sm:py-18">
        <Container className="mb-6 sm:mb-8 reveal-on-scroll">
          <h2 className="t-display">Featured Work.</h2>
        </Container>

        {/* Top 3 Featured Projects — Apple-style Horizontal Carousel */}
        <div className="reveal-on-scroll">
          <CarouselTrack>
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.title} project={project} cardBgClass="bg-surface-alt" />
            ))}
          </CarouselTrack>
        </div>

        {/* More Works Carousel */}
        {projects.length > 3 && (
          <div className="mt-12 sm:mt-16 w-full reveal-on-scroll">
            <Container className="mb-6 sm:mb-8">
              <h3 className="t-caption-strong text-ink tracking-normal text-lg min-[375px]:text-xl sm:text-2xl font-medium">More works</h3>
            </Container>
            <CarouselTrack>
              {projects.slice(3).map((project) => (
                <ProjectCard key={project.title} project={project} cardBgClass="bg-surface-alt" />
              ))}
            </CarouselTrack>
          </div>
        )}
      </section>

      {/* What I bring to production Section (Below Works Section) */}
      <section id="bring-to-production" className="overflow-hidden bg-surface-alt py-14 sm:py-18">
        <Container className="mb-6 sm:mb-8 reveal-on-scroll">
          <h2 className="t-display">What I bring to production.</h2>
        </Container>

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
      </section>

      {/* Articles Section (Above Quote) */}
      <section id="articles" className="scroll-mt-12 overflow-hidden bg-canvas py-14 sm:py-18">
        <Container className="reveal-on-scroll">
          <h2 className="t-display">Articles.</h2>
        </Container>

        <div className="mt-6 sm:mt-10 reveal-on-scroll">
          <CarouselTrack>
            {articles.map((article) => (
              <a
                key={article.title}
                href={article.link}
                target="_blank"
                rel="noreferrer"
                className="w-[270px] min-[375px]:w-[300px] min-[480px]:w-[340px] min-[577px]:w-[350px] md:w-[380px] lg:w-[400px] shrink-0 snap-start rounded-[20px] bg-surface-alt p-5 min-[375px]:p-6 sm:p-8 h-[320px] sm:h-[350px] min-h-[320px] sm:min-h-[350px] flex flex-col justify-between apple-card-hover"
              >
                <div>
                  <h3 className="t-tagline mt-1 text-ink text-lg min-[375px]:text-xl sm:text-2xl leading-tight">
                    {article.title}
                  </h3>
                  <p className="t-body mt-2 sm:mt-3 text-muted text-sm sm:text-base leading-relaxed">{article.desc}</p>
                </div>

                <div className="mt-4 sm:mt-6 flex justify-start sm:justify-end">
                  <ArrowUpRight className="shrink-0 text-accent" />
                </div>
              </a>
            ))}
          </CarouselTrack>
        </div>
      </section>

      {/* Quote Section (bg-surface-alt) */}
      <section className="bg-surface-alt py-16 text-ink sm:py-20 reveal-on-scroll">
        <Container className="max-w-3xl text-center">
          <blockquote className="t-quote">&ldquo;{quote}&rdquo;</blockquote>
        </Container>
      </section>

      {/* Footer (bg-canvas) */}
      <Footer bgClass="bg-canvas border-t border-hairline" />
    </div>
  )
}
