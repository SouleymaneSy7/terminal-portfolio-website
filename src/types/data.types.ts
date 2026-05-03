// ─────────────────────────────────────────────────────────────────
// PERSISTENT DATA — note / todo / snippet
// ─────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────
// QUIZ GAME
// ─────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────
// API RESPONSES
// ─────────────────────────────────────────────────────────────────

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

export interface IpResponseType {
  ip: string;
  version: string; // "IPv4" or "IPv6"

  // Location
  city: string | null;
  region: string | null;
  region_code: string | null;
  country_code: string | null; // 2-letter ISO 3166-1 alpha-2, e.g. "US"
  country_code_iso3: string | null; // 3-letter, e.g. "USA"
  country_name: string | null;
  country_capital: string | null;
  country_tld: string | null;
  continent_code: string | null;
  in_eu: boolean;
  postal: string | null;
  latitude: number;
  longitude: number;

  // Time
  timezone: string | null; // IANA format, e.g. "America/Los_Angeles"
  utc_offset: string | null; // e.g. "-0700" or "+0530"

  // Network
  asn: string | null;
  org: string | null;
  hostname?: string | null;

  // Locale / currency
  country_calling_code: string | null;
  currency: string | null;
  currency_name: string | null;
  languages: string | null;

  // Country stats
  country_area: number | null;
  country_population: number | null;

  // Error shape — ipapi.co can return HTTP 200 with { error: true }
  error?: boolean;
  reason?: string;
  message?: string;
}

// ─────────────────────────────────────────────────────────────────
// GITHUB
// ─────────────────────────────────────────────────────────────────

export interface GithubUserType {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  created_at: string;
}

export interface GithubRepoType {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

// ─────────────────────────────────────────────────────────────────
// CURRENCY CONVERSION
// ─────────────────────────────────────────────────────────────────

export interface ConvertResultType {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export type ApiRatesResponseType = ConvertResultType[];

// ─────────────────────────────────────────────────────────────────
// CURL COMMAND
// ─────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────
//  UTILITIES
// ─────────────────────────────────────────────────────────────────

export interface UsageConfigType {
  command: string;
  usage: string;
  description?: string;
  hint?: string;
}

export interface HelpConfigType {
  name: string;
  usage: string;
  description: string;
  options?: Array<{ flag: string; description: string }>;
  examples?: Array<{ command: string; description: string }>;
  notes?: string;
  seeAlso?: string[];
}

// ─────────────────────────────────────────────────────────────────
//  FONTS
// ─────────────────────────────────────────────────────────────────

export type GoogleFontSourceType = {
  type: "google";
  googleFamily: string;
  cssName: string;
  cssVariable: string;
  weights: string;
};

export type LocalFontSourceType = {
  type: "local";
  cssName: string;
  cssVariable: string;
  files: { weight: number; path: string }[];
};

export type FontSourceType = GoogleFontSourceType | LocalFontSourceType;

// ─────────────────────────────────────────────────────────────────
// AUDIO TYPE
// ─────────────────────────────────────────────────────────────────

export type AudioEventType =
  | "keypress"
  | "enter"
  | "backspace"
  | "tab"
  | "escape"
  | "ctrl"
  | "error"
  | "success";

export interface AudioStateType {
  enabled: boolean;
  volume: number;
}
