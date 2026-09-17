import { articles } from "@/data/home"
import { Section } from "../layout/Section"
import { ArticleCard } from "./cards/ArticleCard"
import { RailGroup } from "./RailGroup"

export const ARTICLE_CATEGORIES = ["Artificial Intelligence", "DevOps", "Practice", "Security"] as const

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
    items: articles.filter((article) => article.category === category),
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
