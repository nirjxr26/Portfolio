import { PrimaryButton } from "../common"
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
      mainClassName="flex-1 flex flex-col items-center justify-center p-6 text-center select-none"
      seo={<RouteSeo meta={ROUTE_META["/404"]} breadcrumbs={[]} />}
    >
      <Container className="text-center max-w-2xl flex flex-col items-center justify-center">
        <div className="inline-flex items-center justify-center text-left">
          <h1 className="font-semibold text-2xl sm:text-3xl text-ink tracking-tight">
            404
          </h1>
          <span className="h-9 sm:h-11 w-px bg-hairline mx-4 sm:mx-5" aria-hidden="true" />
          <p className="text-sm sm:text-base font-normal text-ink leading-snug">
            This page could not be found.
          </p>
        </div>

        <div className="mt-8">
          <PrimaryButton href="/">
            Go to Home
          </PrimaryButton>
        </div>
      </Container>
    </PageShell>
  )
}

