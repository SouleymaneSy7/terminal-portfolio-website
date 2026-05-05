"use client";

/**
 * Custom404 — terminal-style 404 error page.
 *
 */

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import * as React from "react";

import { ASCII_404, ASCII_ERROR } from "@/constants/ascii";
import TerminalPrompt from "../terminal/TerminalPrompt";
import { useThemeFont } from "@/hooks";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const Custom404: React.FC = () => {
  useThemeFont();

  return (
    <motion.div
      aria-label="Page not found — error 404"
      className="space-y-t-section py-t-outer"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-t-group">
        <TerminalPrompt />
        <span className="text-secondary-clr"> 404 - error page not found</span>
      </motion.div>

      <div className="terminal-output my-3 whitespace-pre" aria-hidden="true">
        <motion.pre
          variants={itemVariants}
          className="leading-snug text-primary-clr select-none"
          aria-hidden="true"
        >
          {ASCII_404}
        </motion.pre>

        <motion.pre
          variants={itemVariants}
          className="leading-snug text-primary-clr select-none"
          aria-hidden="true"
        >
          {ASCII_ERROR}
        </motion.pre>
      </div>

      <motion.p variants={itemVariants} className="text-text-clr opacity-sep" aria-hidden="true">
        ────────────────────────────────────────
      </motion.p>

      <motion.div variants={itemVariants} className="space-y-t-group" role="alert">
        <p>The requested path could not be located in this system.</p>
        <p>It may have been moved, deleted, or never existed.</p>
        <p>Please verify the URL or return to the main directory.</p>
      </motion.div>

      <motion.p variants={itemVariants} className="pt-2">
        Click{" "}
        <Link
          href="/"
          aria-label="Return to homepage"
          className="px-1 text-secondary-clr transition-colors hover:bg-primary-clr hover:text-text-clr"
        >
          home
        </Link>{" "}
        to return to safety.
      </motion.p>
    </motion.div>
  );
};

export default Custom404;
