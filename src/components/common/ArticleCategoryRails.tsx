import { ARTICLE_CATEGORIES, BLOG_ARTICLES } from "@/data/blogArticles"
import { toCardArticle } from "@/data/home"
import { byNewestFirst } from "@/utils/helpers"
import { Section } from "../layout/Section"
import { ArticleCard } from "./cards/ArticleCard"
import { RailGroup } from "./RailGroup"

interface ArticleCategoryRailsProps {
  id?: string
  bgClass?: string
  cardBgClass?: string
}

export function ArticleCategoryRails({
  id = "articles",
  bgClass = "bg-surface-alt",
  cardBgClass = "bg-card",
}: Readonly<ArticleCategoryRailsProps>) {
  const groups = ARTICLE_CATEGORIES.map((category) => ({
    category,
    items: BLOG_ARTICLES.filter((article) => article.category === category)
      .map(toCardArticle)
      .sort(byNewestFirst),
  })).filter((group) => group.items.length > 0)

  if (groups.length === 0) return null

  return (
    <Section id={id} bgClass={bgClass}>
      {groups.map((group, idx) => (
        <RailGroup key={group.category} title={group.category} spaced={idx > 0}>
          {group.items.map((article) => (
            <ArticleCard key={article.title} article={article} cardBgClass={cardBgClass} />
          ))}
        </RailGroup>
      ))}
    </Section>
  )
}
