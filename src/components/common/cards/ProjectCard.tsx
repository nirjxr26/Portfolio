import type { Project } from "@/data/home"
import { externalProps } from "@/utils/helpers"
import { BaseCard, PROJECT_CARD_HEIGHT, PROJECT_CARD_PADDING, PROJECT_CARD_SIZE } from "../BaseCard"
import { ArrowUpRight } from "../Icons"
import { CardEyebrow } from "./atoms"

export function ProjectCard({
  project,
  cardBgClass = "bg-surface-alt",
  isFeatured = Boolean(project.projectLink),
}: Readonly<{ project: Project; cardBgClass?: string; isFeatured?: boolean }>) {
  const url = project.projectLink ?? project.link

  const projectAction = isFeatured ? (
    <span className="inline-flex items-center justify-center rounded-full bg-accent text-white px-4 py-2 text-xs sm:text-[13px] font-normal leading-none border-0 border-none outline-none select-none">
      Learn more
    </span>
  ) : (
    <ArrowUpRight className="shrink-0 text-accent" />
  )

  const cardContent = (
    <>
      <div>
        <CardEyebrow tone="muted">{project.category}</CardEyebrow>
        <h3 className="t-tagline tracking-normal text-ink text-lg min-[375px]:text-xl sm:text-2xl leading-tight">
          {project.title}
        </h3>
        <p className="t-body card-desc text-muted text-sm sm:text-base leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className={`mt-4 sm:mt-6 flex items-center ${url ? "justify-between" : "justify-end"}`}>
        {url ? projectAction : null}
        {project.year && (
          <span className="text-[11px] min-[375px]:text-xs text-muted font-medium">
            {project.year}
          </span>
        )}
      </div>
    </>
  )

  if (url) {
    return (
      <BaseCard
        as="a"
        href={url}
        {...externalProps(url)}
        aria-label={`${project.title} — ${project.category}`}
        className={`${PROJECT_CARD_SIZE} ${PROJECT_CARD_PADDING} ${PROJECT_CARD_HEIGHT} border-0 ${cardBgClass}`}
      >
        {cardContent}
      </BaseCard>
    )
  }

  return (
    <BaseCard
      as="div"
      aria-label={`${project.title} — ${project.category}`}
      className={`${PROJECT_CARD_SIZE} ${PROJECT_CARD_PADDING} ${PROJECT_CARD_HEIGHT} border-0 ${cardBgClass} cursor-default`}
    >
      {cardContent}
    </BaseCard>
  )
}
