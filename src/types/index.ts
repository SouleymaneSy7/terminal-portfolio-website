import * as React from "react";

// ====================== TERMINAL CORE TYPES ======================
export type CommandHistoryOutput = (
  | { id: string; type: "text" | "html"; content: string[] }
  | { id: string; type: "link"; content: string[][] }
  | { id: string; type: "component"; component: React.ReactNode }
)[];

export type CommandHistory = {
  command: string;
  output: CommandHistoryOutput;
};

export type CommandHistoryTypes = CommandHistory[];

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
  outputLines?: string[] | string[][];
  outputTypes: "text" | "link" | "html" | "component";
  component?: React.ReactNode;
  onComplete?: () => void;
};

// ====================== PROJECT TYPES ======================
export type ProjectTypes = {
  name: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
};

// ====================== API & GAME TYPES ======================
export interface JokeResponseType {
  error: boolean;
  category: string;
  type: string;
  setup: string;
  delivery: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

export interface AdviceSlip {
  id: number;
  advice: string;
}

export interface QuoteResponseType {
  slip: AdviceSlip;
}

export interface QuizQuestionType {
  question: string;
  options: string[];
  answer: number;
  correctMsg: string;
  wrongMsg: string;
  explanation?: string;
}

export interface PersistedGameStateType {
  score: number;
  questionsAnswered: number;
  askedQuestions: number[];
  currentQuestionIndex: number | null;
}

export interface GameStateType {
  currentQuestion: QuizQuestionType | null;
  score: number;
  questionsAnswered: number;
  askedQuestions: number[];
}

export interface QuizCommandResponseType {
  id: string;
  type: "text" | "html";
  content: string[];
}

// ====================== SUGGESTION TYPES ======================
export type SuggestionGroupType = { label: string; items: string[] };

// ====================== CURRENCY CONVERSION TYPES ======================
export interface ConvertResultType {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export type ApiRatesResponseType = ConvertResultType[];

// ====================== CURL COMMAND TYPES ======================
export interface CurlRequestOptionsType {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
  headOnly: boolean;
  follow: boolean;
}

export interface CurlServiceResponseType {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  bodySize: number;
  contentType: string;
}

export interface CurlOptionsType {
  url: string | null;
  method: string;
  headers: Record<string, string>;
  body: string | null;
  verbose: boolean;
  headOnly: boolean;
  silent: boolean;
  follow: boolean;
  outputNote: string | null;
  help: boolean;
  parseError: string | null;
}

// ====================== PERSISTENT DATA TYPES ======================
export interface NoteType {
  id: string;
  shortId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoItemType {
  id: string;
  shortId: string;
  text: string;
  done: boolean;
  createdAt: string;
  completedAt: string | null;
}

export interface SnippetType {
  id: string;
  shortId: string;
  name: string;
  lang: string;
  code: string;
  createdAt: string;
}

export interface ParsedDateType {
  date: Date;
  originalFormat: string;
}
