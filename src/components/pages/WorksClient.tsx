import { ProductionRail, ProjectsRail, SEO } from "../common"
import { Footer, Header, PageHero } from "../layout"
import { ScrollReveal } from "../providers"

export function WorksClient() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <SEO
        title="Works | Nirjar Goswami"
        description="Explore systems, infrastructure, and open-source tools built by Nirjar Goswami, including Bastion, Kost, and HookDrop."
        canonicalUrl="https://nirjar.me/works"
        includeDefaultSchemas={false}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Works", url: "/works" },
        ]}
      />
      <ScrollReveal />
      {/* Shared Global Nav */}
      <Header activePath="/works" />

      <main id="main-content">
        {/* Hero Header */}
        <PageHero
          title="Works."
          subhead="A record of what I've actually designed, built and shipped."
        />

        {/* Reusable Featured Works & More Works Carousels */}
        <ProjectsRail id="featured-works" bgClass="bg-surface-alt" cardBgClass="bg-card" />

        {/* Reusable What I bring to production Section */}
        <ProductionRail bgClass="bg-canvas" cardBgClass="bg-surface-alt" />
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  )
}
