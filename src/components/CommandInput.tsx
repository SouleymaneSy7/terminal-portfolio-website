"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { commands } from "@/constants";
import { CommandInputPropsType } from "@/types";

const CommandInput: React.FC<CommandInputPropsType> = ({
  input,
  setInput,
  onArrowUp,
  onArrowDown,
  onCommandType,
  onClearTerminal,
}) => {
  const commandInputRef = React.useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = React.useState(true);

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

  const handleCommandSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim()) {
      onCommandType(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      onClearTerminal();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      const command = onArrowUp();
      if (command) setInput(command);
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

      <div className="grow flex items-center relative">
        <form onSubmit={handleCommandSubmit} className="grow">
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full h-full outline-none border-none text-secondary-clr font-semi-bold"
            style={{ caretColor: "transparent" }}
          />
        </form>

        {isFocused && (
          <motion.span
            className="inline-block w-2 h-full bg-secondary-clr absolute top-2 -translate-y-1/2   pointer-events-none"
            style={{
              left: `calc(${input.length}ch)`,
            }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>
    </div>
  );
};

export default CommandInput;
