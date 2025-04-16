"use client";

import * as React from "react";

import CommandInput from "./CommandInput";
import CommandOutput from "./CommandOutput";

import {
  CommandHistory,
  CommandHistoryTypes,
  TerminalPropsTypes,
} from "@/types";
import { executeCommand } from "@/utils/command";
import { welcomeCommandOutput } from "@/constants";

const Terminal: React.FC<TerminalPropsTypes> = ({ containerRef }) => {
  const [input, setInput] = React.useState("");
  const [animationIsComplete, setAnimationIsComplete] = React.useState(false);
  const [commandIndex, setCommandIndex] = React.useState(-1);
  const [history, setHistory] = React.useState<CommandHistoryTypes>([
    {
      command: "welcome",
      output: welcomeCommandOutput,
    },
  ]);

  const handleCommand = async (command: string) => {
    const commandOutput = await executeCommand(command);

    if (input.trim().toLowerCase() === "clear") {
      setHistory([]);
    } else {
      setHistory((prevState) => [
        ...prevState,
        {
          command,
          output: commandOutput.map(({ id, type, content }) => ({
            id: id,
            type: type as "text" | "link" | "html",
            content: content,
          })),
        },
      ]);
    }
    setCommandIndex(-1);
  };

  const handleArrowUp = () => {
    if (commandIndex < history.length - 1) {
      const newCommandIndex = commandIndex + 1;
      const historyIndex = history.length - 1 - newCommandIndex;
      setCommandIndex(newCommandIndex);

      if (historyIndex >= 0 && historyIndex < history.length) {
        return history[historyIndex].command;
      }
    }
    return "";
  };

  const handleArrowDown = () => {
    if (commandIndex > 0) {
      const newCommandIndex = commandIndex - 1;
      const historyIndex = history.length - 1 - newCommandIndex;
      setCommandIndex(newCommandIndex);

      if (historyIndex >= 0 && historyIndex < history.length) {
        return history[historyIndex].command;
      }
    } else if (commandIndex === 0) {
      setCommandIndex(-1);
      return "";
    }
    return "";
  };

  return (
    <div>
      <div>
        {history.map((item: CommandHistory, index: number) => (
          <div key={index} className="opacity-85">
            <p className="text-secondary-clr inline-block">
              <span className="text-primary-clr">guest</span>@
              <span className="text-tertiary-clr">souleymane-sy-portfolio</span>
            </p>
            <span className="text-secondary-clr">:~$</span>
            <span className="text-secondary-clr"> {item.command}</span>
            
            <br />

            <CommandOutput
              speed={100}
              containerRef={containerRef}
              outputTypes={item.output[0].type}
              outputLines={item.output[0].content}
              setAnimationIsComplete={setAnimationIsComplete}
            />
          </div>
        ))}
      </div>

      {animationIsComplete === true ? (
        <CommandInput
          input={input}
          setInput={setInput}
          onCommandType={handleCommand}
          onArrowUp={handleArrowUp}
          onArrowDown={handleArrowDown}
        />
      ) : null}
    </div>
  );
};

export default Terminal;
