import { projects } from "@/data/home"
import { Section, SectionHeader } from "../layout/Section"
import { CarouselTrack } from "./CarouselTrack"
import { RailGroup } from "./RailGroup"
import { ProjectCard } from "./cards"

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
        <RailGroup title="More works">
          {more.map((project) => (
            <ProjectCard key={project.title} project={project} cardBgClass={cardBgClass} isFeatured={false} />
          ))}
        </RailGroup>
      )}
    </Section>
  )
}
