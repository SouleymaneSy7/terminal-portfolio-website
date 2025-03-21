"use client";

import * as React from "react";

import CommandInput from "./CommandInput";
import CommandOutput from "./CommandOutput";

import { executeCommand } from "@/utils/command";
import {
  CommandHistory,
  CommandHistoryTypes,
  TerminalPropsTypes,
} from "@/types";

const Terminal: React.FC<TerminalPropsTypes> = ({ containerRef }) => {
  const [input, setInput] = React.useState("");
  const [animationIsComplete, setAnimationIsComplete] = React.useState(false);
  const [history, setHistory] = React.useState<CommandHistoryTypes>([
    {
      command: "welcome",
      output: [
        " ",
        `
░██████╗░█████╗░██╗░░░██╗██╗░░░░░███████╗██╗░░░██╗███╗░░░███╗░█████╗░███╗░░██╗███████╗  ░██████╗██╗░░░██╗
██╔════╝██╔══██╗██║░░░██║██║░░░░░██╔════╝╚██╗░██╔╝████╗░████║██╔══██╗████╗░██║██╔════╝  ██╔════╝╚██╗░██╔╝
╚█████╗░██║░░██║██║░░░██║██║░░░░░█████╗░░░╚████╔╝░██╔████╔██║███████║██╔██╗██║█████╗░░  ╚█████╗░░╚████╔╝░
░╚═══██╗██║░░██║██║░░░██║██║░░░░░██╔══╝░░░░╚██╔╝░░██║╚██╔╝██║██╔══██║██║╚████║██╔══╝░░  ░╚═══██╗░░╚██╔╝░░
██████╔╝╚█████╔╝╚██████╔╝███████╗███████╗░░░██║░░░██║░╚═╝░██║██║░░██║██║░╚███║███████╗  ██████╔╝░░░██║░░░
╚═════╝░░╚════╝░░╚═════╝░╚══════╝╚══════╝░░░╚═╝░░░╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚══════╝  ╚═════╝░░░░╚═╝░░░
        `.trim(),
        " ",
        "--------------------------------",
        "Welcome on my terminal portfolio.",
        "-------------------------------------",
        "Type 'help' to see available commands.",
      ],
    },
  ]);

  const handleCommand = async (command: string) => {
    const output = await executeCommand(command);

    if (input.trim().toLowerCase() === "clear") {
      setHistory([]);
    } else {
      setHistory((prevState) => [...prevState, { command, output }]);
    }
  };

  return (
    <div>
      <div>
        {history.map((item: CommandHistory, index: number) => (
          <div key={index} className="opacity-85 whitespace-pre">
            <p className="text-secondary-clr inline-block">
              <span className="text-primary-clr">guest</span>@
              <span className="text-tertiary-clr">
                souleymane-sy-portfolio
              </span>
            </p>
            <span className="text-secondary-clr">:~$</span>
            <span className="text-secondary-clr"> {item.command}</span>
            <br />
            <CommandOutput
              outputLines={item.output}
              setAnimationIsComplete={setAnimationIsComplete}
              containerRef={containerRef}
            />
          </div>
        ))}
      </div>

      {animationIsComplete && (
        <CommandInput
          onCommandType={handleCommand}
          input={input}
          setInput={setInput}
        />
      )}
    </div>
  );
};

export default Terminal;
