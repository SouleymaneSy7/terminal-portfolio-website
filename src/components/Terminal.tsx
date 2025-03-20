"use client";

import * as React from "react";

import CommandInput from "./CommandInput";
import CommandOutput from "./CommandOutput";

import { executeCommand } from "@/utils/command";
import { CommandHistory, CommandHistoryTypes, TerminalPropsTypes } from "@/types";

const Terminal: React.FC<TerminalPropsTypes> = ({ containerRef }) => {
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<CommandHistoryTypes>([
    {
      command: "welcome",
      output: [
        " ",
        `
███████╗ ██████╗ ██╗   ██╗██╗     ███████╗██╗   ██╗███╗   ███╗ █████╗ ███╗   ██╗███████╗    ███████╗██╗   ██╗
██╔════╝██╔═══██╗██║   ██║██║     ██╔════╝╚██╗ ██╔╝████╗ ████║██╔══██╗████╗  ██║██╔════╝    ██╔════╝╚██╗ ██╔╝
███████╗██║   ██║██║   ██║██║     █████╗   ╚████╔╝ ██╔████╔██║███████║██╔██╗ ██║█████╗      ███████╗ ╚████╔╝ 
╚════██║██║   ██║██║   ██║██║     ██╔══╝    ╚██╔╝  ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══╝      ╚════██║  ╚██╔╝  
███████║╚██████╔╝╚██████╔╝███████╗███████╗   ██║   ██║ ╚═╝ ██║██║  ██║██║ ╚████║███████╗    ███████║   ██║   
╚══════╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝    ╚══════╝   ╚═╝  
        `.trim(),
        " ",
        "--------------------------------",
        "Welcome on my terminal portfolio.",
        "-------------------------------------",
        "Type 'help' to see available commands.",
      ],
    },
  ]);

  React.useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [history]);

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

      <CommandInput
        onCommandType={handleCommand}
        input={input}
        setInput={setInput}
      />
    </div>
  );
};

export default Terminal;
