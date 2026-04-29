/**
 * TerminalErrorBoundary — catches render errors inside the terminal.
 * Shows a recovery UI instead of a blank screen.
 * Error details are visible only in development mode.
 */

"use client";

import {
  TerminalErrorBoundaryPropsType,
  TerminalErrorBoundaryStateType,
} from "@/types";
import * as React from "react";

export class TerminalErrorBoundary extends React.Component<
  TerminalErrorBoundaryPropsType,
  TerminalErrorBoundaryStateType
> {
  constructor(props: TerminalErrorBoundaryPropsType) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(
    error: Error,
  ): TerminalErrorBoundaryStateType {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console in production too — important for debugging
    console.error("[TerminalErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="space-y-t-section py-t-outer">
        <div className="space-y-t-group">
          <p className="text-secondary-clr font-bold">⚠ Terminal Error</p>
          <p className="text-text-clr opacity-sep" aria-hidden="true">
            ────────────────────────────────────────
          </p>
          <p>An unexpected error occurred inside the terminal.</p>
        </div>

        {process.env.NODE_ENV === "development" && this.state.error && (
          <div className="space-y-t-group">
            <p className="text-secondary-clr font-bold">Details (dev only)</p>
            <p className="text-text-clr opacity-sep" aria-hidden="true">
              ────────────────────────────────────────
            </p>
            <pre
              className="text-text-clr opacity-sep whitespace-pre-wrap break-all"
              style={{ fontSize: "0.8em" }}
            >
              {this.state.error.message}
            </pre>
          </div>
        )}

        <div className="space-y-t-group">
          <button
            type="button"
            onClick={this.handleReset}
            className="text-tertiary-clr underline cursor-pointer hover:text-secondary-clr transition-colors"
          >
            ↺ Try to recover
          </button>

          <p className="text-text-clr opacity-sep">
            If the error persists, refresh the page.
          </p>
        </div>
      </div>
    );
  }
}
