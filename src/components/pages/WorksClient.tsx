import { productionCapabilities, projects } from "@/data/home"
import { CarouselTrack, FeatureCard, ProjectCard, SEO } from "../common"
import { Container, Footer, Header, PageHero } from "../layout"
import { ScrollReveal } from "../providers"

export function WorksClient() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SEO
        title="Works | Nirjar Goswami"
        description="Explore systems, infrastructure, and open-source tools built by Nirjar Goswami, including Bastion, Kost, and HookDrop."
        canonicalUrl="https://nirjar.me/works"
      />
      <ScrollReveal />
      {/* Shared Global Nav */}
      <Header activePath="/works" />

      {/* Hero Header */}
      <PageHero
        title="Works."
        subhead="Systems, pipelines, and infrastructure built the way production actually demands it."
      />

      {/* Featured Works Carousel */}
      <section id="featured-works" className="overflow-hidden bg-surface-alt py-14 sm:py-18">
        <Container className="mb-6 sm:mb-8 reveal-on-scroll">
          <h2 className="t-display">Featured Work.</h2>
        </Container>

        <div className="reveal-on-scroll">
          <CarouselTrack>
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.title} project={project} cardBgClass="bg-card" />
            ))}
          </CarouselTrack>
        </div>

        {/* More Works Carousel */}
        {projects.length > 3 && (
          <div className="mt-12 sm:mt-16 w-full reveal-on-scroll">
            <Container className="mb-4">
              <h3 className="t-caption-strong text-ink tracking-normal text-lg min-[375px]:text-xl sm:text-2xl font-bold">More works</h3>
            </Container>
            <CarouselTrack>
              {projects.slice(3).map((project) => (
                <ProjectCard key={project.title} project={project} cardBgClass="bg-card" />
              ))}
            </CarouselTrack>
          </div>
        )}
      </section>

      {/* What I bring to production Section */}
      <section id="bring-to-production" className="overflow-hidden bg-canvas py-14 sm:py-18">
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
                cardBgClass="bg-surface-alt"
              />
            ))}
          </CarouselTrack>
        </div>
      </section>

      {/* Shared Footer */}
      <Footer />
    </div>
  )
}
