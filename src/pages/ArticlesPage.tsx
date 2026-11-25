import { ArticlePosterCard } from "@/components"
import { RouteSeo } from "@/components/ui/SEO"
import { Container, PageHero, PageShell, Section } from "@/components/layout"
import { ARTICLE_META } from "@/features/articles/data/articleMeta"
import { ROUTE_META } from "@/app/router/routes"
import { createBreadcrumbs } from "@/lib/helpers"

export function ArticlesPage() {
  const articlesWithPosters = ARTICLE_META.filter((article) => article.poster != null)

  return (
    <PageShell
      headerPath="/articles"
      footerBgClass="bg-canvas"
      seo={
        <RouteSeo
          meta={ROUTE_META["/articles"]}
          breadcrumbs={createBreadcrumbs([{ name: "Articles", url: "/articles" }])}
        />
      }
    >
      <PageHero
        title="Articles."
        subhead="Writing about things I’ve experienced and worked on, not just ideas I’ve read about."
        compact
      />
      <Section id="articles" bgClass="bg-surface-alt" padClass="py-16 sm:py-20 md:py-24">
        <Container className="max-w-[1360px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-8 sm:gap-y-10 lg:gap-y-12 justify-items-center reveal-on-scroll">
            {articlesWithPosters.map((article) => (
              <ArticlePosterCard key={article.slug} article={article} className="w-full max-w-[400px]" />
            ))}
          </div>
        </Container>
      </Section>
    </PageShell>
  )
}
