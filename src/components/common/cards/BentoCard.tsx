import type { Article } from "@/types"
import { BaseCard, CARD_HEIGHT, CARD_PADDING } from "../BaseCard"
import { ArrowUpRight } from "../Icons"
import { CardReadTime } from "./atoms"

export function BentoCard({
  article,
  cardBgClass = "bg-card",
}: Readonly<{ article: Article; cardBgClass?: string }>) {
  const displayTime = article.readTime ?? article.date ?? ""
  const isExternal = article.link.startsWith("http")
  return (
    <BaseCard
      as="a"
      href={article.link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      aria-label={`Read article: ${article.title}`}
      className={`group ${CARD_HEIGHT} ${cardBgClass} ${CARD_PADDING}`}
    >
      <div>
        <h3 className="t-tagline tracking-normal text-ink line-clamp-4">{article.title}</h3>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <CardReadTime timeText={displayTime} />
        <ArrowUpRight width={16} height={16} className="shrink-0 text-accent" />
      </div>
    </BaseCard>
  )
}
