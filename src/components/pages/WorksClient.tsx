import { ProductionRail, ProjectsRail, Seo } from "../common"
import { PageHero, PageShell } from "../layout"
import { ROUTE_META } from "@/data/routes"

export function WorksClient() {
  return (
    <PageShell
      headerPath="/works"
      seo={
        <Seo
          title={ROUTE_META["/works"].title}
          description={ROUTE_META["/works"].description}
          canonicalUrl={ROUTE_META["/works"].canonical}
          includeDefaultSchemas={false}
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Works", url: "/works" },
          ]}
        />
      }
    >
        {/* Hero Header */}
        <PageHero
          title="Works."
          subhead="A record of what I've actually designed, built and shipped."
          compact
        />

        {/* Reusable Featured Works & More Works Carousels */}
        <ProjectsRail id="featured-works" bgClass="bg-surface-alt" cardBgClass="bg-card" />

        {/* Reusable What I bring to production Section */}
        <ProductionRail bgClass="bg-canvas" cardBgClass="bg-surface-alt" />
    </PageShell>
  )
}
