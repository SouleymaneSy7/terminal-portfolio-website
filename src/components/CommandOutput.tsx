"use client";

import * as React from "react";
import { CommandOutputPropsType } from "@/types";

const CommandOutput: React.FC<CommandOutputPropsType> = ({
  speed = 100,
  outputLines,
  containerRef,
  setAnimationIsComplete,
}) => {
  const [displayText, setDisplayText] = React.useState<
    {
      id: string;
      type: "text" | "link" | "html";
      content: string[];
    }[]
  >([]);
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
      const currentId = outputLines[currentIndex].id;
      const currentType = outputLines[currentIndex].type;
      const currentWord = outputLines[currentIndex].content;

      const timeout = setTimeout(() => {
        setDisplayText((prevState) => [
          ...prevState,
          { id: currentId, type: currentType, content: currentWord },
        ]);
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
      {displayText.map((item) => {
        if (item.type === "text") {
          return (
            <div key={item.id} className="terminal-ouput">
              {item.content.map((text, index) => {
                return <p key={index}>{text}</p>;
              })}
            </div>
          );
        } else if (item.type === "html") {
          return (
            <div
              key={item.id}
              className="terminal-ouput"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          );
        } else if (item.type === "link") {
          return (
            <div className="terminal-ouput" key={item.id}>
              <a href={item.content[0]} target="_blank" rel="noreferrer">
                {item.content[1]}
              </a>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CommandOutput;
