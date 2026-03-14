"use client";

import * as React from "react";
import { motion } from "framer-motion";
import TerminalPrompt from "@/components/TerminalPrompt";

interface TypewriterCursorProps {
  label?: string;
}

const TypewriterCursor = ({
  label = "fetching data",
}: TypewriterCursorProps) => {
  const [displayed, setDisplayed] = React.useState("");
  const [cursorOn, setCursorOn] = React.useState(true);
  const phaseRef = React.useRef<"typing" | "waiting" | "erasing">("typing");
  const indexRef = React.useRef(0);

  React.useEffect(() => {
    const interval = setInterval(() => setCursorOn((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const tick = () => {
      if (phaseRef.current === "typing") {
        indexRef.current += 1;
        setDisplayed(label.slice(0, indexRef.current));
        if (indexRef.current >= label.length) {
          phaseRef.current = "waiting";
          return 1200;
        }
        return 60;
      }
      if (phaseRef.current === "waiting") {
        phaseRef.current = "erasing";
        return 0;
      }
      if (phaseRef.current === "erasing") {
        indexRef.current -= 1;
        setDisplayed(label.slice(0, indexRef.current));
        if (indexRef.current <= 0) {
          phaseRef.current = "typing";
          return 400;
        }
        return 40;
      }
      return 60;
    };

    let timeout: ReturnType<typeof setTimeout>;

    const run = () => {
      const delay = tick();
      timeout = setTimeout(run, delay ?? 60);
    };
    timeout = setTimeout(run, 60);
    return () => clearTimeout(timeout);
  }, [label]);

  return (
    <motion.div
      className="font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <TerminalPrompt />

      <div className="flex items-center py-1">
        <span className="text-primary-clr opacity-70">&gt;&nbsp;</span>
        <span className="text-secondary-clr">{displayed}</span>
        <span
          className="text-primary-clr"
          style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }}
        >
          _
        </span>
      </div>
    </motion.div>
  );
};

export default TypewriterCursor;
