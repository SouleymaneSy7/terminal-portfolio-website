/**
 * TimerWidget — animated countdown timer component.
 * Rendered as a "component" block in the terminal output.
 */

"use client";

import { TimerWidgetPropsType } from "@/types";
import { motion } from "framer-motion";
import * as React from "react";
import VisuallyHidden from "../common/VisuallyHidden";

const BAR_WIDTH = 32;

const TimerWidget: React.FC<TimerWidgetPropsType> = ({ totalSeconds, label }) => {
  const [remaining, setRemaining] = React.useState(totalSeconds);
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    if (remaining <= 0) {
      setFinished(true);
      return;
    }
    const timeout = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timeout);
  }, [remaining]);

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;

  const parts: string[] = [];
  if (h > 0) parts.push(String(h).padStart(2, "0"));
  parts.push(String(m).padStart(2, "0"));
  parts.push(String(s).padStart(2, "0"));
  const display = parts.join(":");

  const progress = totalSeconds > 0 ? (totalSeconds - remaining) / totalSeconds : 1;
  const filled = Math.round(progress * BAR_WIDTH);
  const bar = "█".repeat(filled) + "░".repeat(BAR_WIDTH - filled);

  if (finished) {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="space-y-t-group py-t-outer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div role="alert" aria-live="assertive">
          <VisuallyHidden>Timer done! {label ? ` — ${label}` : ""}.</VisuallyHidden>

          <p className="font-bold text-tertiary-clr">🔔 Timer done! {label ? ` — ${label}` : ""}</p>
        </div>

        <p className="text-text-clr opacity-dim">
          Duration:{" "}
          {totalSeconds >= 3600
            ? `${Math.floor(totalSeconds / 3600)}h ${Math.floor((totalSeconds % 3600) / 60)}m`
            : totalSeconds >= 60
              ? `${Math.floor(totalSeconds / 60)}m ${totalSeconds % 60}s`
              : `${totalSeconds}s`}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-t-group py-t-outer"
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <p>
        <span className="animate-pulse-live text-primary-clr">⏱</span>
        {"  "}
        <span
          className="font-bold text-tertiary-clr"
          style={{ fontSize: "var(--text-fs-subtitle)" }}
        >
          {display}
        </span>
        {label && <span className="text-text-clr opacity-dim"> — {label}</span>}
      </p>

      <p className="text-primary-clr" aria-hidden="true">
        [{bar}] {Math.round(progress * 100)}%
      </p>

      <p className="text-text-clr opacity-dim" aria-hidden="true">
        {remaining}s remaining
      </p>
    </motion.div>
  );
};

export default TimerWidget;
