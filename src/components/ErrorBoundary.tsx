"use client";

import { Component, type ReactNode } from "react";
import { MAILTO } from "@/lib/email";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
          <span className="text-[4rem] sm:text-[5rem] font-sans font-normal leading-none text-secondary select-none">!</span>
          <h1 className="text-xl sm:text-2xl font-sans font-normal text-foreground mt-4 text-center">Something went wrong</h1>
          <p className="text-secondary text-sm sm:text-base mt-2 text-center max-w-md font-normal">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.href = "/"; }}
              className="btn-outlined px-5 py-2 rounded-full text-xs font-medium tracking-wide inline-flex items-center gap-2 cursor-pointer"
            >
              Back to homepage
            </button>
            <a href={MAILTO} className="text-xs text-secondary hover:text-foreground transition-colors tracking-wide">
              Report issue
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
