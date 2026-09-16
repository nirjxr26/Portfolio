import { ActionButtons, Seo } from "../common"
import { Container, PageShell } from "../layout"
import { ROUTE_META } from "@/data/routes"

export function NotFoundClient() {
  return (
    <PageShell
      headerPath="/404"
      outerClassName="min-h-screen bg-canvas text-ink flex flex-col justify-between"
      mainClassName="flex-1 flex flex-col justify-center py-16 min-[414px]:py-20 sm:py-32 lg:py-36"
      seo={
        <Seo
          title={ROUTE_META["/404"].title}
          description={ROUTE_META["/404"].description}
          includeDefaultSchemas={false}
        />
      }
    >
      {/* 404 Hero Header Section */}
        <Container className="text-center max-w-2xl">
          <p className="t-caption-strong text-accent uppercase tracking-wider text-[11px] min-[375px]:text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
            404 // Error
          </p>
          <h1 className="t-hero text-ink leading-tight text-3xl min-[375px]:text-4xl sm:text-5xl lg:text-6xl">
            Page not found.
          </h1>
          <p className="t-lead mx-auto mt-3 text-muted max-w-md text-sm sm:text-base leading-relaxed">
            The page you are looking for doesn’t exist or has been moved.
          </p>

          {/* Responsive Action CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-col min-[360px]:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <ActionButtons
              actions={[
                { label: "Go to Home", url: "/", type: "primary" },
                { label: "Explore Works", url: "/works", type: "secondary" },
              ]}
            />
          </div>
        </Container>
    </PageShell>
  )
}
