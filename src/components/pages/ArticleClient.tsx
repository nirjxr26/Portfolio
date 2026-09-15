import { articles } from "@/data/home"
import { ArticlesBento, Seo } from "../common"
import { PageHero, PageShell } from "../layout"

export function ArticleClient() {
  return (
    <PageShell
      headerPath="/article"
      footerBgClass="bg-canvas"
      seo={
        <Seo
          title="Article | Nirjar Goswami"
          description="Notes on systems, security, and the craft of building by Nirjar Goswami."
          canonicalUrl="https://nirjar.me/articles"
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
