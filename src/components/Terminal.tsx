"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

import CommandInput from "./CommandInput";
import CommandOutput from "./CommandOutput";
import LoadingIndicator from "./ui/loading-indicator";

import {
  CommandHistory,
  CommandHistoryOutput,
  CommandHistoryTypes,
  TerminalPropsTypes,
} from "@/types";
import { executeCommand } from "@/utils/command";
import { welcomeCommandOutput } from "@/constants";
import TerminalPrompt from "./TerminalPrompt";

const Terminal: React.FC<TerminalPropsTypes> = ({ containerRef }) => {
  const [input, setInput] = React.useState("");
  const [commandIndex, setCommandIndex] = React.useState(-1);
  const [inputReady, setInputReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const currentCommandId = React.useRef(0);
  const safetyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSafetyTimer = () => {
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
  };
  const [history, setHistory] = React.useState<CommandHistoryTypes>([
    {
      command: "welcome",
      output: welcomeCommandOutput,
    },
  ]);

  React.useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history, containerRef]);

  const handleCommand = async (command: string) => {
    if (command.trim().toLowerCase() === "clear") {
      setHistory([]);
      setInputReady(true);
      setCommandIndex(-1);
      return;
    }

    const commandId = ++currentCommandId.current;

    setInputReady(false);
    setIsLoading(true);
    clearSafetyTimer();

    safetyTimer.current = setTimeout(() => {
      if (currentCommandId.current === commandId) {
        setIsLoading(false);
        setInputReady(true);
      }
    }, 10000);

    try {
      const commandOutput = await executeCommand(command);

      if (currentCommandId.current !== commandId) return;

      const normalizedOutput = Array.isArray(commandOutput)
        ? commandOutput
        : [commandOutput];

      setHistory((prevState) => [
        ...prevState,
        {
          command,
          output: normalizedOutput as CommandHistoryOutput,
        },
      ]);
    } catch {
      if (currentCommandId.current !== commandId) return;
      setHistory((prevState) => [
        ...prevState,
        {
          command,
          output: [
            {
              id: "error",
              type: "text" as const,
              content: ["Error: command failed. Please try again."],
            },
          ],
        },
      ]);
      setInputReady(true);
    } finally {
      if (currentCommandId.current === commandId) {
        clearSafetyTimer();
        setIsLoading(false);
      }
    }

    setCommandIndex(-1);
  };

  const handleClearTerminal = () => {
    setHistory([]);
    setInputReady(true);
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
        <AnimatePresence>
          {history.map((item: CommandHistory, index: number) => {
            const isLastEntry = index === history.length - 1;

            return (
              <motion.div
                key={`${item.command}-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <TerminalPrompt />
                <span className="text-secondary-clr"> {item.command}</span>

                <br />

                {item.output.map((block, i) => {
                  const isLastBlock = i === item.output.length - 1;
                  const handleComplete =
                    isLastEntry && isLastBlock
                      ? () => setInputReady(true)
                      : undefined;

                  return (
                    <CommandOutput
                      key={i}
                      outputTypes={block.type}
                      outputLines={"content" in block ? block.content : []}
                      component={
                        "component" in block ? block.component : undefined
                      }
                      onComplete={handleComplete}
                    />
                  );
                })}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <LoadingIndicator variant="braille" />
          </motion.div>
        )}

        {inputReady && !isLoading && (
          <motion.div
            key="command-input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <CommandInput
              input={input}
              setInput={setInput}
              onCommandType={handleCommand}
              onArrowUp={handleArrowUp}
              onArrowDown={handleArrowDown}
              onClearTerminal={handleClearTerminal}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div aria-hidden="true" style={{ height: "8rem" }} />
    </div>
  );
};

export default Terminal;
