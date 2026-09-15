import { useEffect, useState } from "react"
import type { Article } from "@/types"
import { BaseCard } from "./BaseCard"
import { ArrowUpRight, ClockIcon } from "./Icons"

interface ArticlesBentoProps {
  articles: Article[]
  id?: string
  bgClass?: string
  cardBgClass?: string
}

export function BentoCard({
  article,
  timeText,
  cardBgClass = "bg-card",
}: Readonly<{ article: Article; timeText?: string; cardBgClass?: string }>) {
  const displayTime = timeText ?? article.readTime ?? article.date ?? ""
  const isExternal = article.link.startsWith("http")
  return (
    <BaseCard
      as="a"
      href={article.link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      aria-label={`Read article: ${article.title}`}
      className={`group h-[320px] min-h-[320px] ${cardBgClass} p-5 min-[375px]:p-6 sm:h-[350px] sm:min-h-[350px] sm:p-8`}
    >
      <div>
        <h3 className="t-tagline tracking-normal text-ink line-clamp-4">{article.title}</h3>
        <p className="t-body mt-3 line-clamp-3 text-muted">{article.desc}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ClockIcon width={12} height={12} className="shrink-0 text-muted" />
          <span className="t-fine text-muted">{displayTime}</span>
        </div>
        <ArrowUpRight width={16} height={16} className="shrink-0 text-accent" />
      </div>
    </BaseCard>
  )
}

export function ArticlesBento({
  articles,
  id = "articles-bento",
  bgClass = "bg-surface-alt",
  cardBgClass = "bg-card",
}: Readonly<ArticlesBentoProps>) {
  if (!articles || articles.length === 0) return null

  const sorted = [...articles].sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0
    const db = b.date ? Date.parse(b.date) : 0
    return db - da
  })

  const orderedInitial = (() => {
    const o = [...sorted]
    const rethinkingIdx = o.findIndex((a) => a.title === "Rethinking My Git Workflow")
    if (rethinkingIdx > 1) {
      const [rethinking] = o.splice(rethinkingIdx, 1)
      o.splice(1, 0, rethinking)
    }
    return o
  })()

  const [ordered, setOrdered] = useState<Article[]>(orderedInitial)

  useEffect(() => {
    const base = [...sorted]
    const rethinkingIdx2 = base.findIndex((a) => a.title === "Rethinking My Git Workflow")
    if (rethinkingIdx2 > 1) {
      const [rethinking] = base.splice(rethinkingIdx2, 1)
      base.splice(1, 0, rethinking)
    }
    const head = base.slice(0, 2)
    const tail = base.slice(2)
    for (let i = tail.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[tail[i]!, tail[j]!] = [tail[j]!, tail[i]!]
    }
    setOrdered([...head, ...tail])
  }, [articles])

  const row1 = ordered.slice(0, 2)
  const row2 = ordered.slice(2, 4)
  const row3 = ordered.slice(4)

  const row1Times = ["4 min ago", "3 min ago"]
  const row2Times = ["7 min ago", "6 min ago"]
  const row3Times = ["8 min ago", "9 min ago"]

  return (
    <section id={id} className={`scroll-mt-12 py-14 sm:py-18 ${bgClass}`}>
      <div className="mx-auto w-full max-w-[980px] px-4 min-[414px]:px-6 sm:px-8 lg:px-0 space-y-6 sm:space-y-8">
        <div className="grid w-full max-w-[980px] mx-auto grid-cols-1 gap-4 min-[414px]:gap-5 sm:grid-cols-2 sm:gap-6 reveal-on-scroll">
          {row1.map((article, i) => (
            <BentoCard key={article.title} article={article} timeText={row1Times[i]} cardBgClass={cardBgClass} />
          ))}
        </div>

        <div className="grid w-full max-w-[980px] mx-auto grid-cols-1 gap-4 min-[414px]:gap-5 sm:grid-cols-2 sm:gap-6 reveal-on-scroll">
          {row2.map((article, i) => (
            <BentoCard key={article.title} article={article} timeText={row2Times[i]} cardBgClass={cardBgClass} />
          ))}
        </div>

        {row3.length > 0 && (
          <div className="grid w-full max-w-[980px] mx-auto grid-cols-1 gap-4 min-[414px]:gap-5 sm:grid-cols-2 sm:gap-6 reveal-on-scroll">
            {row3.map((article, i) => (
              <BentoCard key={article.title} article={article} timeText={row3Times[i]} cardBgClass={cardBgClass} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
