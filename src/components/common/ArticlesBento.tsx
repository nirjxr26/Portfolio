import type { Article } from "@/types"
import { byNewestFirst } from "@/utils/helpers"
import { BentoCard } from "./cards"

interface ArticlesBentoProps {
  articles: Article[]
  id?: string
  bgClass?: string
  cardBgClass?: string
}

export function ArticlesBento({
  articles,
  id = "articles-bento",
  bgClass = "bg-surface-alt",
  cardBgClass = "bg-card",
}: Readonly<ArticlesBentoProps>) {
  if (!articles || articles.length === 0) return null

  // Strict newest-first by card date. Deterministic: no pinning, no shuffling,
  // so the order is stable across loads and matches the dates shown.
  const ordered = [...articles].sort(byNewestFirst)

  const rows = [ordered.slice(0, 2), ordered.slice(2, 4)]
  if (ordered.length > 4) rows.push(ordered.slice(4))

  return (
    <section id={id} className={`scroll-mt-12 py-14 sm:py-18 ${bgClass}`}>
      <div className="mx-auto w-full max-w-[980px] px-4 min-[414px]:px-6 sm:px-8 lg:px-0 space-y-6 sm:space-y-8">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="grid w-full max-w-[980px] mx-auto grid-cols-1 gap-4 min-[414px]:gap-5 sm:grid-cols-2 sm:gap-6 reveal-on-scroll"
          >
            {row.map((article) => (
              <BentoCard key={article.title} article={article} cardBgClass={cardBgClass} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
