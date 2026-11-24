import { ProductionRail, ProjectsRail } from "@/components"
import { RouteSeo } from "@/components/ui/SEO"
import { PageHero, PageShell } from "@/components/layout"
import { ROUTE_META } from "@/app/router/routes"
import { createBreadcrumbs } from "@/lib/helpers"

export function WorksPage() {
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

      <ProjectsRail
        id="featured-works"
        bgClass="bg-surface-alt"
        cardBgClass="bg-card"
        padClass="py-16 sm:py-20 md:py-24"
      />

      <ProductionRail bgClass="bg-canvas" cardBgClass="bg-surface-alt" />
    </PageShell>
  )
}
