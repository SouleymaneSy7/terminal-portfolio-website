"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import DOMPurify from "dompurify";

import { CommandOutputPropsType } from "@/types";

if (typeof window !== "undefined") {
  DOMPurify.addHook("afterSanitizeAttributes", function (node) {
    if ("target" in node) {
      node.setAttribute("target", "_blank");
    }
    if ("rel" in node) {
      node.setAttribute("rel", "noopener noreferrer");
    }
    if (
      !node.hasAttribute("target") &&
      (node.hasAttribute("xlink:href") || node.hasAttribute("href"))
    ) {
      node.setAttribute("xlink:show", "new");
    }
  });
}

const STAGGER = 0.04;
const LINE_DURATION = 0.1;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER,
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, x: -4 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: LINE_DURATION, ease: "easeOut" },
  },
};

const CommandOutput: React.FC<CommandOutputPropsType> = ({
  outputLines = [],
  outputTypes,
  component,
  onComplete,
}) => {
  React.useEffect(() => {
    if (!onComplete) return;

    if (outputTypes === "component") {
      const timer = setTimeout(onComplete, 50);
      return () => clearTimeout(timer);
    }

    const lineCount = (outputLines as string[]).length;
    const totalMs =
      lineCount > 0
        ? ((lineCount - 1) * STAGGER + LINE_DURATION) * 1000 + 50
        : 50;

    const timer = setTimeout(onComplete, totalMs);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputLines.length, outputTypes]);

  if (outputTypes === "text") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {(outputLines as string[]).map((text, index) => (
          <motion.div
            key={index}
            className="terminal-output whitespace-pre"
            variants={lineVariants}
          >
            <p>{text}</p>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (outputTypes === "html") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {(outputLines as string[]).map((text, index) => {
          const cleanText = DOMPurify.sanitize(text, {
            USE_PROFILES: { html: true },
          });
          return (
            <motion.div
              key={index}
              className="terminal-output space-y-8"
              variants={lineVariants}
              dangerouslySetInnerHTML={{ __html: cleanText }}
            />
          );
        })}
      </motion.div>
    );
  }

  if (outputTypes === "link") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {(outputLines as string[][]).map((text, index) => (
          <motion.div
            key={index}
            className="terminal-output"
            variants={lineVariants}
          >
            <a href={text[0]} target="_blank" rel="noreferrer">
              {text[1]}
            </a>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (outputTypes === "component") {
    return <React.Fragment>{component}</React.Fragment>;
  }

  return null;
};

export default CommandOutput;
