"use client";

import * as React from "react";

import DOMPurify from "dompurify";

import { CommandOutputPropsType } from "@/types";

const CommandOutput: React.FC<CommandOutputPropsType> = ({
  speed,
  outputLines = [],
  outputTypes,
  containerRef,
  setAnimationIsComplete,
}) => {
  const [displayText, setDisplayText] = React.useState<string[]>([]);
  const [currentIndex, setCurrrentIndex] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);

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
      const currentWord = outputLines[currentIndex];

      const timeout = setTimeout(() => {
        setDisplayText((prevState) => [...prevState, currentWord]);
        setCurrrentIndex((prevState) => prevState + 1);
      }, speed);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      handleComplete();
    }
  }, [
    displayText,
    currentIndex,
    speed,
    outputLines,
    isComplete,
    handleComplete,
    setAnimationIsComplete,
  ]);

  if (outputTypes === "text") {
    return (
      <React.Fragment>
        {displayText.map((text, index) => {
          return (
            <div key={index} className="terminal-output  whitespace-pre">
              <p key={index}>{text}</p>
            </div>
          );
        })}
      </React.Fragment>
    );
  } else if (outputTypes === "html") {
    return (
      <React.Fragment>
        {displayText.map((text, index) => {
          DOMPurify.addHook("afterSanitizeAttributes", function (node) {
            if ("target" in node) {
              node.setAttribute("target", "_blank");
            }

            if ("rel" in node && node.getAttribute("rel") !== "noreferrer") {
              node.setAttribute("rel", "noopener noreferrer");
            }

            if ("rel" in node) {
              node.setAttribute("rel", "noreferrer");
            }

            if (
              !node.hasAttribute("target") &&
              (node.hasAttribute("xlink:href") || node.hasAttribute("href"))
            ) {
              node.setAttribute("xlink:show", "new");
            }
          });

          const cleanText = DOMPurify.sanitize(text, {
            USE_PROFILES: { html: true },
          });

          return (
            <div
              key={index}
              className="terminal-ouput space-y-8"
              dangerouslySetInnerHTML={{ __html: cleanText }}
            />
          );
        })}
      </React.Fragment>
    );
  } else if (outputTypes === "link") {
    return (
      <React.Fragment>
        {displayText.map((text, index) => {
          return (
            <div className="terminal-ouput" key={index}>
              <a href={text[0]} target="_blank" rel="noreferrer">
                {text[1]}
              </a>
            </div>
          );
        })}
      </React.Fragment>
    );
  }

  return null;
};

export default CommandOutput;
