import { articles } from "@/data/home"
import { Container } from "../layout/Container"
import { Section } from "../layout/Section"
import { CarouselTrack } from "./CarouselTrack"
import { ArticleCard } from "./cards/ArticleCard"

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
        <div key={group.category} className={idx === 0 ? "w-full reveal-on-scroll" : "mt-12 sm:mt-16 w-full reveal-on-scroll"}>
          <Container className="mb-6 sm:mb-8">
            <h3 className="t-caption-strong text-ink tracking-normal text-lg min-[375px]:text-xl sm:text-2xl font-medium">
              {group.category}
            </h3>
          </Container>
          <CarouselTrack>
            {group.items.map((article) => (
              <ArticleCard key={article.title} article={article} cardBgClass={cardBgClass} />
            ))}
          </CarouselTrack>
        </div>
      ))}
    </Section>
  )
}
