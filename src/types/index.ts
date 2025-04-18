import * as React from "react";

export type CommandHistoryOutput = {
  id: string;
  type: "text" | "link" | "html";
  content: string[];
}[];

export type CommandHistory = {
  command: string;
  output: CommandHistoryOutput;
};

export type CommandHistoryTypes = CommandHistory[];

export type ProjectTypes = {
  name: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
};

export type TerminalPropsTypes = {
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export type CommandInputPropsType = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onArrowUp: () => string;
  onArrowDown: () => string;
  onCommandType: (command: string) => void;
  onClearTerminal: () => void;
};

export type CommandOutputPropsType = {
  outputLines: string[];
  outputTypes: "text" | "link" | "html";
  speed?: number;
  setAnimationIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
};
