import { FeatureCard, ProductionRail } from "../common"
import { RouteSeo } from "../common/SEO"
import { CarouselSection, Container, PageHero, PageShell } from "../layout"
import { ROUTE_META } from "@/data/routes"
import { createBreadcrumbs } from "@/utils/helpers"
import {
  CORE_SERVICES,
  HOW_I_WORK_CARDS,
  WORKING_KNOWLEDGE_SERVICES,
  type ServiceSection,
} from "@/data/services"

interface ServiceCardProps {
  section: ServiceSection
}

function ServiceCard({ section }: Readonly<ServiceCardProps>) {
  return (
    <div
      id={section.id}
      className="rounded-2xl sm:rounded-3xl bg-card p-7 sm:p-9 md:p-10 transition-colors reveal-on-scroll"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 lg:gap-12 items-start">
        {/* Left column: 40% (2 of 5) */}
        <div className="md:col-span-2 reveal-on-scroll">
          <h3 className="text-2xl sm:text-3xl font-semibold text-ink tracking-normal mb-2">
            {section.title}
          </h3>
          <p className="text-base sm:text-lg font-medium text-accent">
            {section.tagline}
          </p>
        </div>

        {/* Right column: 60% (3 of 5) */}
        <div className="md:col-span-3">
          <ul className="space-y-3.5 text-[15px] sm:text-base text-ink/90 leading-relaxed">
            {section.items.map((item) => (
              <li key={item} className="flex items-start gap-3 reveal-on-scroll">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent shrink-0 mt-1"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function ServicesClient() {
  return (
    <PageShell
      headerPath="/services"
      footerBgClass="bg-surface-alt border-t border-hairline"
      seo={
        <RouteSeo
          meta={ROUTE_META["/services"]}
          breadcrumbs={createBreadcrumbs([{ name: "Services", url: "/services" }])}
        />
      }
    >
      <PageHero
        title="Services."
        subhead="The areas I work in, with the skills behind them."
        compact
      />

      <section className="py-12 pb-20 sm:py-16 sm:pb-28 bg-surface-alt text-left">
        <Container size="wide">
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Core Services */}
            {CORE_SERVICES.map((section) => (
              <ServiceCard key={section.id} section={section} />
            ))}

            {/* Working Knowledge Section Header */}
            <div className="pt-8 sm:pt-12 pb-2 reveal-on-scroll">
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-normal mb-2">
                Working knowledge
              </h2>
              <p className="text-base sm:text-lg font-medium text-muted">
                Foundations I understand and have put into practice.
              </p>
            </div>

            {/* Working Knowledge Services */}
            {WORKING_KNOWLEDGE_SERVICES.map((section) => (
              <ServiceCard key={section.id} section={section} />
            ))}
          </div>
        </Container>
      </section>

      {/* Perspective */}
      <section className="py-14 sm:py-20 bg-canvas text-left">
        <Container>
          <div className="max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-normal mb-4 sm:mb-6 reveal-on-scroll">
              Why I work across domains.
            </h2>
            <div className="space-y-4 sm:space-y-5 text-lg sm:text-xl md:text-[22px] font-normal text-ink/85 leading-relaxed">
              <p className="reveal-on-scroll">
                Real systems don&apos;t live in silos. I work across software engineering, DevOps, cloud, and cybersecurity to see how the pieces connect, and how a decision in one area affects the others.
              </p>
              <p className="reveal-on-scroll">
                What I know comes from applying these technologies across my projects. I&apos;m still building depth in each area, and I focus on how they work together to make systems secure and reliable.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How I work */}
      <CarouselSection id="how-i-work" title="How I work." bgClass="bg-surface-alt">
        {HOW_I_WORK_CARDS.map((card) => (
          <FeatureCard
            key={card.tag}
            card={{
              headline: card.title,
              body: card.desc,
              tag: card.tag,
            }}
            cardBgClass="bg-card"
          />
        ))}
      </CarouselSection>

      {/* How I think */}
      <ProductionRail bgClass="bg-canvas" cardBgClass="bg-surface-alt" />
    </PageShell>
  )
}
