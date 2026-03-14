"use client";

import * as React from "react";
import { motion } from "framer-motion";
import TerminalPrompt from "@/components/TerminalPrompt";

const BAR_WIDTH = 20;

interface AsciiProgressBarProps {
  label?: string;
}

const AsciiProgressBar = ({ label = "processing" }: AsciiProgressBarProps) => {
  const [progress, setProgress] = React.useState(0);
  const directionRef = React.useRef<1 | -1>(1);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + directionRef.current * 4;
        if (next >= 100) {
          directionRef.current = -1;
          return 100;
        }
        if (next <= 0) {
          directionRef.current = 1;
          return 0;
        }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const filled = Math.round((progress / 100) * BAR_WIDTH);
  const bar = "█".repeat(filled) + "░".repeat(BAR_WIDTH - filled);

  return (
    <motion.div
      className="font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <TerminalPrompt />

      <div className="flex items-center gap-2 py-1">
        <span className="text-secondary-clr opacity-70">{label}</span>
        <span className="text-primary-clr">[{bar}]</span>
        <span className="text-secondary-clr opacity-50">
          {String(progress).padStart(3, " ")}%
        </span>
      </div>
    </motion.div>
  );
};

export default AsciiProgressBar;
