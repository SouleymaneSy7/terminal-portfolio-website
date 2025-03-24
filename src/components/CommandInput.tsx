"use client";

import * as React from "react";
import { CommandInputPropsType } from "@/types";

const CommandInput: React.FC<CommandInputPropsType> = ({
  onCommandType,
  input,
  setInput,
}) => {
  const commandInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    focusTerminalInput();
  }, []);

  const focusTerminalInput = () => {
    if (commandInputRef.current) {
      commandInputRef.current.focus();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", focusTerminalInput);
    return () => {
      document.removeEventListener("click", focusTerminalInput);
    };
  }, [commandInputRef]);

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
      <label htmlFor="command-input">
        <div>
          <p className="text-secondary-clr inline-block">
            <span className="text-primary-clr">guest</span>@
            <span className="text-tertiary-clr">souleymane-sy-portfolio</span>
          </p>
          <span className="text-secondary-clr">:~$</span>
        </div>
      </label>

      <form onSubmit={handleCommandSubmit} className="flex-grow">
        <input
          id="command-input"
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          type="text"
          value={input}
          ref={commandInputRef}
          onChange={handleChange}
          className="w-full h-full outline-none border-none text-secondary-clr font-semi-bold"
        />
      </form>
    </div>
  );
};

export default CommandInput;
