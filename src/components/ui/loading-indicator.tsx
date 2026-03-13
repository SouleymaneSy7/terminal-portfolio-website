"use client";

import {
  AsciiProgressBar,
  BrailleSpinner,
  DotsAccumulator,
  RotatingSpinner,
  TypewriterCursor,
} from "@/components/ui/loaders";

type LoadingVariant = "ascii" | "spinner" | "typewriter" | "dots" | "braille";

interface LoadingIndicatorProps {
  variant?: LoadingVariant;
  label?: string;
}

const LoadingIndicator = ({
  variant = "braille",
  label,
}: LoadingIndicatorProps) => {
  switch (variant) {
    case "ascii":
      return <AsciiProgressBar label={label} />;

    case "spinner":
      return <RotatingSpinner label={label} />;

    case "typewriter":
      return <TypewriterCursor label={label} />;

    case "dots":
      return <DotsAccumulator label={label} />;

    case "braille":
      return <BrailleSpinner label={label} />;

    default:
      return <BrailleSpinner label={label} />;
  }
};

export default LoadingIndicator;
