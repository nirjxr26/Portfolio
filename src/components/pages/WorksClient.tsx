import { ProductionRail, ProjectsRail } from "../common"
import { RouteSeo } from "../common/SEO"
import { PageHero, PageShell } from "../layout"
import { ROUTE_META } from "@/data/routes"
import { createBreadcrumbs } from "@/utils/helpers"

export function WorksClient() {
  return (
    <PageShell
      headerPath="/works"
      seo={
        <RouteSeo
          meta={ROUTE_META["/works"]}
          breadcrumbs={createBreadcrumbs([{ name: "Works", url: "/works" }])}
        />
      }
    >
      <PageHero
        title="Works."
        subhead="A record of what I've actually designed, built and shipped."
        compact
      />

      <ProjectsRail id="featured-works" bgClass="bg-surface-alt" cardBgClass="bg-card" />

      <ProductionRail bgClass="bg-canvas" cardBgClass="bg-surface-alt" />
    </PageShell>
  )
}
