import type * as React from "react";

// ─────────────────────────────────────────────────────────────────
// COMMON
// ─────────────────────────────────────────────────────────────────

export type VisuallyHiddenPropsType = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"span">;

// ─────────────────────────────────────────────────────────────────
// TERMINAL
// ─────────────────────────────────────────────────────────────────

export type TerminalPropsTypes = {
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export type CommandInputPropsType = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onArrowUp: () => string;
  onArrowDown: () => string;
  onCommandType: (command: string) => void;
  onClearTerminal: () => void;
  commandHistory: string[];
};

export type CommandOutputPropsType = {
  outputLines?: string[] | string[][];
  outputTypes: "text" | "link" | "html" | "component";
  component?: React.ReactNode;
  onComplete?: () => void;
};

// ─────────────────────────────────────────────────────────────────
// TERMINAL ERROR BOUNDARY
// ─────────────────────────────────────────────────────────────────

export interface TerminalErrorBoundaryPropsType {
  children: React.ReactNode;
}

export interface TerminalErrorBoundaryStateType {
  hasError: boolean;
  error: Error | null;
}
// ─────────────────────────────────────────────────────────────────
// LOADERS
// ─────────────────────────────────────────────────────────────────

export type LoadingVariant =
  | "ascii"
  | "spinner"
  | "typewriter"
  | "dots"
  | "braille";

export interface LoadingIndicatorPropsType {
  variant?: LoadingVariant;
  label?: string;
}

export interface AsciiProgressBarPropsType {
  label?: string;
}

export interface BrailleSpinnerPropsType {
  label?: string;
}

export interface DotsAccumulatorPropsType {
  label?: string;
}

export interface RotatingSpinnerPropsType {
  label?: string;
}

export interface TypewriterCursorPropsType {
  label?: string;
}

// ─────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────────────────────────

export interface MobileBannerPropsType {
  onClose: () => void;
}

export interface TimerWidgetPropsType {
  totalSeconds: number;
  label?: string;
}

// ─────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────

export interface VirtualizedListOptionsType {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export interface VirtualizedListResultType {
  visibleStart: number;
  visibleEnd: number;
  offsetY: number;
  totalHeight: number;
}
