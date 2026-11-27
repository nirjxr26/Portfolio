import { Component, ErrorInfo, ReactNode } from "react"
import { ErrorPage } from "@/pages/ErrorPage"

interface Props {
  children: ReactNode
  code?: string | number
  desc?: string
}

interface State {
  hasError: boolean
  code: string | number
  desc: string
}

export class ErrorBoundary extends Component<Readonly<Props>, State> {
  public constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      code: props.code ?? 500,
      desc: props.desc ?? "An unexpected error occurred.",
    }
  }

  public static getDerivedStateFromError(): Partial<State> {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught", error, errorInfo.componentStack)
    }
  }

  public componentDidMount() {
    // Global handlers kept silent — no console output
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          code={this.state.code}
          desc={this.state.desc}
          actionLabel="Go to Home"
          actionHref="/"
          onAction={() => {
            this.setState({ hasError: false })
          }}
        />
      )
    }

    return this.props.children
  }
}

