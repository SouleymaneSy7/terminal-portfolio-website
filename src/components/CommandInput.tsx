"use client";

import * as React from "react";
import { CommandInputPropsType } from "@/types";

const CommandInput: React.FC<CommandInputPropsType> = ({ onCommandType }) => {
  const [input, setInput] = React.useState("");
  const commandInputRef = React.useRef<HTMLInputElement>(null);

  // Focus when terminal is mount
  React.useEffect(() => {
    focusTerminalInput();
  }, []);

  const focusTerminalInput = () => {
    if (commandInputRef.current) {
      commandInputRef.current.focus();
    }
  };

  // Focus when terminal is clicked
  React.useEffect(() => {
    document.addEventListener("click", focusTerminalInput);
    return () => {
      document.removeEventListener("click", focusTerminalInput);
    };
  }, [commandInputRef]);

  // Handle Input Change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleCommandSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim()) {
      onCommandType(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-green-500">guest@souleymane-sy-portfolio:~$</span>
      <form onSubmit={handleCommandSubmit} className="flex-grow ml-2">
        <input
          ref={commandInputRef}
          type="text"
          value={input}
          onChange={handleChange}
          autoFocus
        />
      </form>
    </div>
  );
};

export default CommandInput;
