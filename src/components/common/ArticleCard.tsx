import type { Article } from "@/types"
import { ArrowUpRight } from "./Icons"

interface ArticleCardProps {
  article: Article
  cardBgClass?: string
}

export function ArticleCard({ article, cardBgClass = "bg-surface-alt" }: ArticleCardProps) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Read article: ${article.title}`}
      className={`w-[270px] min-[375px]:w-[300px] min-[480px]:w-[340px] min-[577px]:w-[350px] md:w-[380px] lg:w-[400px] shrink-0 snap-start rounded-[20px] ${cardBgClass} p-5 min-[375px]:p-6 sm:p-8 h-[320px] sm:h-[350px] min-h-[320px] sm:min-h-[350px] flex flex-col justify-between apple-card-hover`}
    >
      <div>
        <h3 className="t-tagline mt-1 text-ink text-lg min-[375px]:text-xl sm:text-2xl leading-tight">
          {article.title}
        </h3>
        <p className="t-body mt-2 sm:mt-3 text-muted text-sm sm:text-base leading-relaxed">
          {article.desc}
        </p>
      </div>

      <div className="mt-4 sm:mt-6 flex justify-start sm:justify-end">
        <ArrowUpRight className="shrink-0 text-accent" />
      </div>
    </a>
  )
}
