import { ProductionRail, ProjectsRail, Seo } from "../common"
import { PageHero, PageShell } from "../layout"

export function WorksClient() {
  return (
    <PageShell
      headerPath="/works"
      seo={
        <Seo
          title="Works | Nirjar Goswami"
          description="Explore systems, infrastructure, and open-source tools built by Nirjar Goswami, including Bastion, Kost, and HookDrop."
          canonicalUrl="https://nirjar.me/works"
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
