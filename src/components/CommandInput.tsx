"use client";

import * as React from "react";

import { commands } from "@/constants";
import { CommandInputPropsType } from "@/types";

const CommandInput: React.FC<CommandInputPropsType> = ({
  input,
  setInput,
  onArrowUp,
  onArrowDown,
  onCommandType,
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      const command = onArrowUp();
      if (command) {
        setInput(command);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();

      const command = onArrowDown();
      setInput(command);
    }

    if (event.key === "Tab") {
      event.preventDefault();

      const inputWords = input.split(" ");
      const lastWord = inputWords[inputWords.length - 1];

      if (inputWords.length === 1) {
        const matches = commands.filter((cmd) => cmd.startsWith(lastWord));
        if (matches.length === 1) {
          setInput(matches[0]);
        }
      }
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
          onKeyDown={handleKeyDown}
          className="w-full h-full outline-none border-none text-secondary-clr font-semi-bold"
        />
      </form>
    </div>
  );
};

export default CommandInput;
