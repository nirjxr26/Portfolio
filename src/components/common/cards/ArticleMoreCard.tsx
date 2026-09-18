import type { BlogArticle } from "@/data/blogArticles"
import { BaseCard, CAROUSEL_CARD_SIZE, CARD_HEIGHT, CARD_PADDING } from "../BaseCard"
import { articleAriaLabel, CardReadTime } from "./atoms"

export function ArticleMoreCard({ article, eyebrow }: Readonly<{ article: BlogArticle; eyebrow?: string }>) {
  const href = `/articles/${article.slug}`
  return (
    <BaseCard
      as="a"
      href={href}
      aria-label={articleAriaLabel(article.title)}
      className={`group ${CAROUSEL_CARD_SIZE} ${CARD_HEIGHT} bg-card ${CARD_PADDING}`}
    >
      <div>
        {eyebrow && <p className="t-fine text-muted mb-2">{eyebrow}</p>}
        <h3 className="t-tagline tracking-normal text-ink line-clamp-3">{article.title}</h3>
      </div>
      <div className="mt-6 flex items-center gap-1.5">
        <CardReadTime timeText={article.readTime} />
      </div>
    </BaseCard>
  )
}
