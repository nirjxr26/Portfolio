import { ArticlePosterCard } from "../common"
import { RouteSeo } from "../common/SEO"
import { Container, PageHero, PageShell, Section } from "../layout"
import { BLOG_ARTICLES } from "@/data/blogArticles"
import { ROUTE_META } from "@/data/routes"
import { createBreadcrumbs } from "@/utils/helpers"

export function ArticleClient() {
  const articlesWithPosters = BLOG_ARTICLES.filter((article) => article.poster != null)

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
        title="Article."
        subhead="Writing about things I’ve experienced and worked on, not just ideas I’ve read about."
        compact
      />
      <Section id="articles" bgClass="bg-surface-alt" padClass="pt-2.5 pb-14 sm:pt-4 sm:pb-18 md:pt-5 md:pb-24">
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
