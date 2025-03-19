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
        `
███████  ██████  ██    ██ ██      ███████ ██    ██ ███    ███  █████  ███    ██ ███████     ███████ ██    ██
██      ██    ██ ██    ██ ██      ██       ██  ██  ████  ████ ██   ██ ████   ██ ██          ██       ██  ██
███████ ██    ██ ██    ██ ██      █████     ████   ██ ████ ██ ███████ ██ ██  ██ █████       ███████   ████
     ██ ██    ██ ██    ██ ██      ██         ██    ██  ██  ██ ██   ██ ██  ██ ██ ██               ██    ██
███████  ██████   ██████  ███████ ███████    ██    ██      ██ ██   ██ ██   ████ ███████     ███████    ██    
        `.trim(),
        "--------------------------------",
        "Welcome on my terminal portfolio.",
        "--------------------------------",
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
          <div key={index} className="opacity-90 whitespace-pre">
            <p className="text-[var(--secondary-clr)] inline-block">
              <span className="text-[var(--primary-clr)]">guest</span>@
              <span className="text-[var(--tertiary-clr)]">
                souleymane-sy-portfolio
              </span>
            </p>
            <span className="text-[var(--secondary-clr)]">:~$</span>
            <span className="text-[var(--secondary-clr)]"> {item.command}</span>
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
