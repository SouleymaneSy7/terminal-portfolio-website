export type CommandHistory = {
  command: string;
  output: string[];
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
  onCommandType: (command: string) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

export type CommandOutputPropsType = {
  outputLines: string[];
};
