import { projects } from "@/data/home"
import { Container } from "../layout/Container"
import { Section, SectionHeader } from "../layout/Section"
import { CarouselTrack } from "./CarouselTrack"
import { ProjectCard } from "./ProjectCard"

interface ProjectsRailProps {
  bgClass?: string
  cardBgClass?: string
  id?: string
  featuredCount?: number
}

export function ProjectsRail({
  bgClass = "bg-canvas",
  cardBgClass = "bg-surface-alt",
  id = "work",
  featuredCount = 4,
}: Readonly<ProjectsRailProps>) {
  const featured = projects.slice(0, featuredCount)
  const more = projects.slice(featuredCount)

  return (
    <Section id={id} bgClass={bgClass}>
      <SectionHeader title="Featured Work." />

      {/* Featured Projects — Apple-style Horizontal Carousel */}
      <div className="reveal-on-scroll">
        <CarouselTrack>
          {featured.map((project) => (
            <ProjectCard key={project.title} project={project} cardBgClass={cardBgClass} isFeatured />
          ))}
        </CarouselTrack>
      </div>

      {/* More Works Carousel */}
      {more.length > 0 && (
        <div className="mt-12 sm:mt-16 w-full reveal-on-scroll">
          <Container className="mb-6 sm:mb-8">
            <h3 className="t-caption-strong text-ink tracking-normal text-lg min-[375px]:text-xl sm:text-2xl font-medium">
              More works
            </h3>
          </Container>
          <CarouselTrack>
            {more.map((project) => (
              <ProjectCard key={project.title} project={project} cardBgClass={cardBgClass} isFeatured={false} />
            ))}
          </CarouselTrack>
        </div>
      )}
    </Section>
  )
}
