"use client";

import * as React from "react";
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

const CommandOutput: React.FC<CommandOutputPropsType> = ({
  speed,
  outputLines = [],
  outputTypes,
  containerRef,
  setAnimationIsComplete,
}) => {
  const [displayText, setDisplayText] = React.useState<string[] | string[][]>(
    [],
  );
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);

  const effectiveSpeed = React.useMemo(() => {
    if (speed !== undefined) return speed;
    const lineCount = outputLines.length;
    if (lineCount > 30) return 20;
    if (lineCount > 15) return 40;
    return 100;
  }, [speed, outputLines.length]);

  const handleComplete = React.useCallback(() => {
    setIsComplete(true);
    setAnimationIsComplete(true);
  }, [setAnimationIsComplete]);

  React.useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayText]);

  React.useEffect(() => {
    if (!Array.isArray(outputLines) || outputLines.length === 0) {
      handleComplete();
      return;
    }

    if (isComplete) return;
    setAnimationIsComplete(false);

    if (currentIndex < outputLines.length) {
      const currentLine = outputLines[currentIndex];

      const timeout = setTimeout(() => {
        setDisplayText(
          (prev) => [...prev, currentLine] as string[] | string[][],
        );
        setCurrentIndex((prev) => prev + 1);
      }, effectiveSpeed);

      return () => clearTimeout(timeout);
    } else {
      handleComplete();
    }
  }, [
    displayText,
    currentIndex,
    effectiveSpeed,
    outputLines,
    isComplete,
    handleComplete,
    setAnimationIsComplete,
  ]);

  if (outputTypes === "text") {
    return (
      <React.Fragment>
        {(displayText as string[]).map((text, index) => (
          <div key={index} className="terminal-output whitespace-pre">
            <p>{text}</p>
          </div>
        ))}
      </React.Fragment>
    );
  }

  if (outputTypes === "html") {
    return (
      <React.Fragment>
        {(displayText as string[]).map((text, index) => {
          const cleanText = DOMPurify.sanitize(text, {
            USE_PROFILES: { html: true },
          });

          return (
            <div
              key={index}
              className="terminal-output space-y-8"
              dangerouslySetInnerHTML={{ __html: cleanText }}
            />
          );
        })}
      </React.Fragment>
    );
  }

  if (outputTypes === "link") {
    return (
      <React.Fragment>
        {(displayText as string[][]).map((text, index) => (
          <div className="terminal-output" key={index}>
            <a href={text[0]} target="_blank" rel="noreferrer">
              {text[1]}
            </a>
          </div>
        ))}
      </React.Fragment>
    );
  }

  return null;
};

export default CommandOutput;
