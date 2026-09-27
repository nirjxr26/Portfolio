import { ArticleCategoryRails, Seo } from "../common"
import { PageHero, PageShell } from "../layout"
import { ROUTE_META } from "@/data/routes"
import { createBreadcrumbs } from "@/utils/helpers"

export function ArticleClient() {
  return (
    <PageShell
      headerPath="/article"
      footerBgClass="bg-canvas"
      seo={
        <Seo
          title={ROUTE_META["/articles"].title}
          description={ROUTE_META["/articles"].description}
          canonicalUrl={ROUTE_META["/articles"].canonical}
          includeDefaultSchemas={false}
          breadcrumbs={createBreadcrumbs([
            { name: "Article", url: "/articles" },
          ])}
        />
      }
    >
        <PageHero title="Article." subhead="Writing about things I’ve experienced and worked on, not just ideas I’ve read about." compact />
        <ArticleCategoryRails bgClass="bg-surface-alt" cardBgClass="bg-card" />
    </PageShell>
  )
}
