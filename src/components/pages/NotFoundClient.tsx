import { Container, Footer, Header } from "../layout"

export function NotFoundClient() {
  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col justify-between">
      {/* Shared Global Nav */}
      <Header activePath="/404" />

      {/* 404 Hero Header Section */}
      <main className="flex-1 flex flex-col justify-center py-16 min-[414px]:py-20 sm:py-32 lg:py-36">
        <Container className="text-center max-w-2xl px-4 sm:px-6">
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
            <a href="/" className="btn btn-primary w-full min-[360px]:w-auto">
              Go to Home
            </a>
            <a href="/works" className="btn btn-ghost w-full min-[360px]:w-auto">
              <span>Explore Works</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </Container>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  )
}
