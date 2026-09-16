import type { Article } from "@/types"
import {
  BaseCard,
  CARD_HEIGHT,
  CARD_PADDING,
  FEATURE_CARD_SIZE,
  PROJECT_CARD_HEIGHT,
  PROJECT_CARD_PADDING,
  PROJECT_CARD_SIZE,
} from "../BaseCard"
import { ArrowUpRight } from "../Icons"
import { CardReadTime } from "./atoms"

export function ArticleCard({
  article,
  cardBgClass = "bg-surface-alt",
  variant = "feature",
}: Readonly<{ article: Article; cardBgClass?: string; variant?: "feature" | "standard" }>) {
  const displayTime = article.readTime ?? article.date ?? ""

  if (variant === "standard") {
    return (
      <BaseCard
        as="a"
        href={article.link}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Read article: ${article.title}`}
        className={`${FEATURE_CARD_SIZE} ${CARD_PADDING} md:p-9 ${CARD_HEIGHT} ${cardBgClass}`}
      >
        <div>
          <h3 className="t-tagline mt-1 tracking-normal text-ink text-lg min-[375px]:text-xl sm:text-2xl leading-tight">
            {article.title}
          </h3>
        </div>

        <div className="mt-4 sm:mt-6 flex justify-start sm:justify-end">
          <ArrowUpRight className="shrink-0 text-accent" />
        </div>
      </BaseCard>
    )
  }

  return (
    <BaseCard
      as="a"
      href={article.link}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Read article: ${article.title}`}
      className={`${PROJECT_CARD_SIZE} ${PROJECT_CARD_PADDING} ${PROJECT_CARD_HEIGHT} ${cardBgClass}`}
    >
      <div>
        <h3 className="t-tagline mt-1 tracking-normal text-ink text-lg min-[375px]:text-xl sm:text-2xl leading-tight">
          {article.title}
        </h3>
        <p className="t-body card-desc text-muted text-sm sm:text-base leading-relaxed">
          {article.desc}
        </p>
      </div>

      <div className="mt-4 sm:mt-6 flex items-center justify-between">
        <CardReadTime timeText={displayTime} />
        <ArrowUpRight className="shrink-0 text-accent" />
      </div>
    </BaseCard>
  )
}
