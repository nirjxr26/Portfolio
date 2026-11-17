import type { BlogArticle } from "@/data/blogArticles"
import { ArticlePosterCard } from "./ArticlePosterCard"

export function ArticleMoreCard({
  article,
  eyebrow,
  className = "",
}: Readonly<{ article: BlogArticle; eyebrow?: string; className?: string }>) {
  return (
    <ArticlePosterCard
      article={article}
      eyebrow={eyebrow}
      className={`w-[280px] min-[375px]:w-[320px] sm:w-[380px] md:w-[400px] shrink-0 snap-start ${className}`.trim()}
    />
  )
}
