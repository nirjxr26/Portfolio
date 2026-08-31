import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error internally for debugging without exposing stack traces or internal paths to users
    console.error("Uncaught application error:", error.message, errorInfo.componentStack)
  }

  public componentDidMount() {
    // Global safety handlers for unhandled rejections and window errors
    window.addEventListener("error", (event) => {
      console.error("Global window error intercepted:", event.message)
    })
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection intercepted:", event.reason)
    })
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-canvas text-ink flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-3xl space-y-5 sm:space-y-6">
            <h1 className="t-hero text-3xl min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-accent whitespace-nowrap">
              Something went wrong.
            </h1>
            <p className="t-lead text-muted max-w-xl mx-auto">
              An unexpected error occurred. No internal details or sensitive data were exposed.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={this.handleReload}
                className="btn btn-primary"
              >
                Reload Page
              </button>
              <a
                href="mailto:nirjargoswami2626@gmail.com?subject=Application%20Issue%20Report"
                className="btn btn-ghost"
              >
                Report Issue
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
