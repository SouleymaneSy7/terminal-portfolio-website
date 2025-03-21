"use client";

import * as React from "react";
import { CommandOutputPropsType } from "@/types";

const CommandOutput: React.FC<CommandOutputPropsType> = ({
  speed = 100,
  outputLines,
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

  return (
    <div>
      {displayText.map((output: string, index: number) => (
        <React.Fragment key={index}>
          <p>{output}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CommandOutput;
