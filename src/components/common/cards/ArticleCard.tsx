import type { Article } from "@/types"
import { BaseCard, CAROUSEL_CARD_SIZE, CARD_HEIGHT, CARD_PADDING } from "../BaseCard"
import { ArrowUpRight } from "../Icons"

export function ArticleCard({ article, cardBgClass = "bg-surface-alt" }: Readonly<{ article: Article; cardBgClass?: string }>) {
  return (
    <BaseCard
      as="a"
      href={article.link}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Read article: ${article.title}`}
      className={`${CAROUSEL_CARD_SIZE} ${cardBgClass} ${CARD_PADDING} ${CARD_HEIGHT}`}
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
