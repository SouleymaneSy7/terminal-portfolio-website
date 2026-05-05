"use client";

import { LoadingIndicatorPropsType } from "@/types";
import * as React from "react";
import AsciiProgressBar from "./AsciiProgressBar";
import BrailleSpinner from "./BrailleSpinner";
import DotsAccumulator from "./DotsAccumulator";
import RotatingSpinner from "./RotatingSpinner";
import TypewriterCursor from "./TypewriterCursor";

const LoadingIndicator: React.FC<LoadingIndicatorPropsType> = ({ variant = "braille", label }) => {
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
