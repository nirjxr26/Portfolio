import { articles } from "@/data/home"
import { ArticlesBento, Seo } from "../common"
import { PageHero, PageShell } from "../layout"
import { ROUTE_META } from "@/data/routes"

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
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Article", url: "/articles" },
          ]}
        />
      }
    >
        <PageHero title="Article." subhead="Notes on systems, security, and the craft of building." compact />
        <ArticlesBento articles={articles} bgClass="bg-surface-alt" cardBgClass="bg-card" />
    </PageShell>
  )
}
