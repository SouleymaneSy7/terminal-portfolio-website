"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { format, getHours } from "date-fns";
import { getTimezone, getGreeting } from "@/utils/date";

const LiveClock: React.FC = () => {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const longDate = format(now, "EEEE, MMMM dd, yyyy");
  const hhmm = format(now, "hh:mm");
  const ss = format(now, ":ss");
  const ampm = format(now, " a");
  const fullTime = `${hhmm}${ss}${ampm}`;
  const timezone = getTimezone();
  const greeting = getGreeting(getHours(now));

  const LABEL = "  DATE  ·  ";

  const W =
    Math.max(
      "  ● LIVE".length,
      `${LABEL}${longDate}`.length,
      `${LABEL}${fullTime}`.length,
      `${LABEL}${timezone}`.length,
    ) + 4;

  const top = `╭${"─".repeat(W)}╮`;
  const sep = `├${"─".repeat(W)}┤`;
  const bot = `╰${"─".repeat(W)}╯`;
  const empty = `│${" ".repeat(W)}│`;

  const liveSpaces = " ".repeat(W - "  ● LIVE".length);
  const dateSpaces = " ".repeat(W - `${LABEL}${longDate}`.length);
  const timeSpaces = " ".repeat(W - `${LABEL}${fullTime}`.length);
  const zoneSpaces = " ".repeat(W - `${LABEL}${timezone}`.length);

  return (
    <motion.div
      className="py-1 space-y-3"
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <div className="space-y-0">
        <p className="whitespace-pre text-text-clr opacity-70">{top}</p>

        <p className="whitespace-pre">
          <span className="text-text-clr opacity-70">│</span>
          {"  "}
          <span className="text-tertiary-clr animate-pulse-live">●</span>{" "}
          <span className="text-tertiary-clr font-bold">LIVE</span>
          {liveSpaces}
          <span className="text-text-clr opacity-70">│</span>
        </p>

        <p className="whitespace-pre text-text-clr opacity-70">{sep}</p>

        <p className="whitespace-pre text-text-clr opacity-70">{empty}</p>

        <p className="whitespace-pre">
          <span className="text-text-clr opacity-70">│</span>
          {"  "}
          <span className="text-secondary-clr">DATE</span>
          {"  "}
          <span className="text-text-clr opacity-40">·</span>
          {"  "}
          <span className="text-text-clr font-bold">{longDate}</span>
          {dateSpaces}
          <span className="text-text-clr opacity-70">│</span>
        </p>

        <p className="whitespace-pre">
          <span className="text-text-clr opacity-70">│</span>
          {"  "}
          <span className="text-secondary-clr">TIME</span>
          {"  "}
          <span className="text-text-clr opacity-40">·</span>
          {"  "}
          <span className="text-primary-clr font-bold">{hhmm}</span>
          <span className="text-primary-clr opacity-50">{ss}</span>
          <span className="text-tertiary-clr">{ampm}</span>
          {timeSpaces}
          <span className="text-text-clr opacity-70">│</span>
        </p>

        <p className="whitespace-pre">
          <span className="text-text-clr opacity-70">│</span>
          {"  "}
          <span className="text-secondary-clr">ZONE</span>
          {"  "}
          <span className="text-text-clr opacity-40">·</span>
          {"  "}
          <span className="text-tertiary-clr">{timezone}</span>
          {zoneSpaces}
          <span className="text-text-clr opacity-70">│</span>
        </p>

        <p className="whitespace-pre text-text-clr opacity-70">{empty}</p>

        <p className="whitespace-pre text-text-clr opacity-70">{bot}</p>
      </div>

      <p>
        <span className="text-tertiary-clr">→</span>
        {"  "}
        <span className="text-secondary-clr">{greeting}</span>
      </p>
    </motion.div>
  );
};

export default LiveClock;
