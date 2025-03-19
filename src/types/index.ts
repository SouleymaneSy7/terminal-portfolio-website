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
}

export interface CommandOutputPropsType {
  outputLines: string[];
}
