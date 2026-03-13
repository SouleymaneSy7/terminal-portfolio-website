"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface DotsAccumulatorPropsType {
  label?: string;
}

const DotsAccumulator = ({
  label = "processing",
}: DotsAccumulatorPropsType) => {
  const [dots, setDots] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 400);
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
      <p className="text-secondary-clr">
        <span className="text-primary-clr">guest</span>@
        <span className="text-tertiary-clr">souleymane-sy-portfolio</span>
        <span>:~$</span>
      </p>
      <div className="flex items-center py-1">
        <span className="text-secondary-clr opacity-70">
          {label}
          <span className="inline-block w-[1.8ch] text-left">
            {".".repeat(dots)}
          </span>
        </span>
      </div>
    </motion.div>
  );
};

export default DotsAccumulator;
