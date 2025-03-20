export type CommandHistory = {
  command: string;
  output: string[];
};

export type CommandHistoryTypes = CommandHistory[];

export interface ProjectTypes {
  name: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface CommandInputPropsType {
  onCommandType: (command: string) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export interface CommandOutputPropsType {
  outputLines: string[];
}
