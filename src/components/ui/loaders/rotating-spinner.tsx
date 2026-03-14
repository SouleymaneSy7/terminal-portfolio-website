"use client";

import * as React from "react";
import { motion } from "framer-motion";
import TerminalPrompt from "@/components/TerminalPrompt";

const SPIN_FRAMES = ["/", "-", "\\", "|"];

interface RotatingSpinnerProps {
  label?: string;
}

const RotatingSpinner = ({ label = "executing" }: RotatingSpinnerProps) => {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % SPIN_FRAMES.length);
    }, 100);
    return () => clearInterval(interval);
  }, []);

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
        <span className="text-primary-clr">{SPIN_FRAMES[frame]}</span>
        <span className="text-secondary-clr opacity-70">{label}...</span>
      </div>
    </motion.div>
  );
};

export default RotatingSpinner;
