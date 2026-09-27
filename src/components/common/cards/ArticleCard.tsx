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
import { articleAriaLabel, CardBody, CardHeadline, CardReadTime } from "./atoms"

export function ArticleCard({
  article,
  cardBgClass = "bg-surface-alt",
  variant = "feature",
}: Readonly<{ article: Article; cardBgClass?: string; variant?: "feature" | "standard" }>) {
  const displayTime = article.readTime ?? article.date ?? ""
  const feature = variant !== "standard"

  return (
    <BaseCard
      as="a"
      href={article.link}
      aria-label={articleAriaLabel(article.title)}
      className={
        feature
          ? `${PROJECT_CARD_SIZE} ${PROJECT_CARD_PADDING} ${PROJECT_CARD_HEIGHT} ${cardBgClass}`
          : `${FEATURE_CARD_SIZE} ${CARD_PADDING} md:p-9 ${CARD_HEIGHT} ${cardBgClass}`
      }
    >
      <div>
        <CardHeadline className="mt-1">{article.title}</CardHeadline>
        {feature && <CardBody>{article.desc}</CardBody>}
      </div>

      {feature ? (
        <div className="mt-4 sm:mt-6 flex items-center justify-between">
          <CardReadTime timeText={displayTime} />
          <ArrowUpRight className="shrink-0 text-accent" />
        </div>
      ) : (
        <div className="mt-4 sm:mt-6 flex justify-start sm:justify-end">
          <ArrowUpRight className="shrink-0 text-accent" />
        </div>
      )}
    </BaseCard>
  )
}
