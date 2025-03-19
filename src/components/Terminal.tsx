"use client";

import * as React from "react";

import CommandInput from "./CommandInput";
import CommandOutput from "./CommandOutput";

import { executeCommand } from "@/utils/command";
import { CommandHistory, CommandHistoryTypes } from "@/types";

const Terminal: React.FC = () => {
  const [history, setHistory] = React.useState<CommandHistoryTypes>([
    {
      command: "welcome",
      output: [
        "Welcome on my terminal portfolio.",
        "Type 'help' to see available commands.",
      ],
    },
  ]);

  // Ref
  const outputRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (command: string) => {
    const output = await executeCommand(command);

    setHistory((prevState) => [...prevState, { command, output }]);
  };

  return (
    <div ref={outputRef}>
      <div>
        {history.map((item: CommandHistory, index: number) => (
          <div key={index}>
            <span style={{ color: "green" }}>
              guest@souleymane-sy-portfolio
            </span>
            <span style={{ color: "white" }}>:~$</span>
            <span style={{ color: "white" }}> {item.command}</span>
            <br />
            <CommandOutput outputLines={item.output} />
          </div>
        ))}
      </div>

      <CommandInput onCommandType={handleCommand} />
    </div>
  );
};

export default Terminal;
