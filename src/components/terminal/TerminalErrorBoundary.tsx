/**
 * TerminalErrorBoundary — catches render errors inside the terminal.
 * Shows a recovery UI instead of a blank screen.
 * Error details are visible only in development mode.
 */

"use client";

import { TerminalErrorBoundaryPropsType, TerminalErrorBoundaryStateType } from "@/types";
import * as React from "react";

export class TerminalErrorBoundary extends React.Component<
  TerminalErrorBoundaryPropsType,
  TerminalErrorBoundaryStateType
> {
  constructor(props: TerminalErrorBoundaryPropsType) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): TerminalErrorBoundaryStateType {
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
          <p className="font-bold text-secondary-clr">⚠ Terminal Error</p>
<p className="text-text-clr opacity-dim" aria-hidden="true">
              ────────────────────────────────────────
            </p>
            <p>An unexpected error occurred inside the terminal.</p>
        </div>

        {process.env.NODE_ENV === "development" && this.state.error && (
          <div className="space-y-t-group">
            <p className="font-bold text-secondary-clr">Details (dev only)</p>
            <p className="text-text-clr opacity-dim" aria-hidden="true">
              ────────────────────────────────────────
            </p>
            <pre
              className="break-all whitespace-pre-wrap text-text-clr opacity-dim"
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
            className="cursor-pointer text-tertiary-clr underline transition-colors hover:text-secondary-clr"
          >
            ↺ Try to recover
          </button>

          <p className="text-text-clr opacity-dim">If the error persists, refresh the page.</p>
        </div>
      </div>
    );
  }
}
