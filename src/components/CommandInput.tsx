"use client";

import * as React from "react";
import { CommandInputPropsType } from "@/types";

const CommandInput: React.FC<CommandInputPropsType> = ({ onCommandType, input, setInput }) => {

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
    <div className="flex items-baseline gap-2 flex-wrap">
      <div>
        <p className="text-[var(--secondary-clr)] inline-block">
          <span className="text-[var(--primary-clr)]">guest</span>@
          <span className="text-[var(--tertiary-clr)]">
            souleymane-sy-portfolio
          </span>
        </p>
        <span className="text-[var(--secondary-clr)]">:~$</span>
      </div>

      <form onSubmit={handleCommandSubmit} className="flex-grow">
        <input
          ref={commandInputRef}
          type="text"
          value={input}
          onChange={handleChange}
          autoFocus
          className="w-full h-full outline-none border-none text-[var(--secondary-clr)] font-semibold"
        />
      </form>
    </div>
  );
};

export default CommandInput;
