import { PrimaryButton } from "@/components"
import { RouteSeo } from "@/components/ui/SEO"
import { Container, PageShell } from "@/components/layout"
import { ROUTE_META } from "@/app/router/routes"

export interface ErrorPageProps {
  code?: string | number
  desc?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export function ErrorPage({
  code = 500,
  desc = "An unexpected error occurred.",
  actionLabel = "Go to Home",
  actionHref = "/",
  onAction,
}: Readonly<ErrorPageProps>) {
  const meta = ROUTE_META[`/${code}`] ?? ROUTE_META["/500"] ?? {
    title: `${code} - Internal Server Error | Nirjar Goswami`,
    description: desc,
  }

  return (
    <PageShell
      headerPath="/500"
      hideHeader
      hideFooter
      outerClassName="min-h-screen bg-canvas text-ink flex flex-col"
      mainClassName="flex-1 flex flex-col items-center justify-center p-6 text-center select-none"
      seo={<RouteSeo meta={meta} breadcrumbs={[]} />}
    >
      <Container className="text-center max-w-2xl flex flex-col items-center justify-center">
        <div className="inline-flex items-center justify-center text-left">
          <h1 className="font-semibold text-2xl sm:text-3xl text-ink tracking-tight">
            {code}
          </h1>
          <span className="h-9 sm:h-11 w-px bg-hairline mx-4 sm:mx-5" aria-hidden="true" />
          <p className="text-sm sm:text-base font-normal text-ink leading-snug">
            {desc}
          </p>
        </div>

        <div className="mt-8">
          <PrimaryButton href={actionHref} onClick={onAction}>
            {actionLabel}
          </PrimaryButton>
        </div>
      </Container>
    </PageShell>
  )
}
