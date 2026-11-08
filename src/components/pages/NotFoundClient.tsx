import { ActionButtons, ActionGroup } from "../common"
import { RouteSeo } from "../common/SEO"
import { Container, PageShell } from "../layout"
import { ROUTE_META } from "@/data/routes"

export function NotFoundClient() {
  return (
    <PageShell
      headerPath="/404"
      hideHeader
      hideFooter
      outerClassName="min-h-screen bg-canvas text-ink flex flex-col"
      mainClassName="flex-1 flex flex-col items-center justify-center p-6 text-center"
      seo={<RouteSeo meta={ROUTE_META["/404"]} breadcrumbs={[]} />}
    >
      <Container className="text-center max-w-2xl flex flex-col items-center justify-center">
        <h1 className="font-display font-semibold text-[clamp(8rem,28vw,16rem)] leading-none tracking-tighter text-ink select-none">
          404
        </h1>
        <p className="text-muted text-base sm:text-lg mt-2 sm:mt-3">
          Page was not found
        </p>

        <ActionGroup className="mt-8 sm:mt-10">
          <ActionButtons
            actions={[
              { label: "Go to Home", url: "/", type: "primary" },
              { label: "Explore the Works", url: "/works", type: "secondary" },
            ]}
          />
        </ActionGroup>
      </Container>
    </PageShell>
  )
}

