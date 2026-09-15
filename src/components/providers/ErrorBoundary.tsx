import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Readonly<Props>, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Silent in production — no console output
  }

  public componentDidMount() {
    // Global handlers kept silent — no console output
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
              <button type="button" onClick={this.handleReload} className="btn btn-primary">
                Reload Page
              </button>
              <a href="mailto:nirjargoswami2626@gmail.com?subject=Application%20Issue%20Report" className="btn btn-ghost">
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
