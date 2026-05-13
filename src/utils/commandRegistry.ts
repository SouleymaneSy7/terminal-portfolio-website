/**
 * Command registry — maps every command name to its async handler.
 *
 * Adding a command  → add one entry here.
 * Removing a command → delete one entry here.
 * No other file needs to change.
 */

"use client";

import {
  curlCommand,
  curlUsageOutput,
  handleAboutCommand,
  handleAgeCommand,
  handleAliasCommand,
  handleAudioCommand,
  handleCalcCommand,
  handleColorCommand,
  handleContactCommand,
  handleConvertCommand,
  handleCowsayCommand,
  handleDateCommand,
  handleDecodeCommand,
  handleEchoCommand,
  handleEmailCommand,
  handleEncodeCommand,
  handleExitCommand,
  handleGameCommand,
  handleGithubCommand,
  handleHashCommand,
  handleHelpCommand,
  handleHistoryCommand,
  handleHostnameCommand,
  handleIpCommand,
  handleJokeCommand,
  handleLoaderCommand,
  handleManCommand,
  handleNeofetchCommand,
  handleNoteCommand,
  handleProjectsCommand,
  handleQuoteCommand,
  handleRepoCommand,
  handleResumeCommand,
  handleRpsCommand,
  handleSnippetCommand,
  handleSudoCommand,
  handleThemeCommand,
  handleTimeCommand,
  handleTimerCommand,
  handleTodoCommand,
  handleTypefaceCommand,
  handleUnaliasCommand,
  handleUUIDCommand,
  handleWelcomeCommand,
  handleWhoamiCommand,
} from "@/commands";
import type { CommandHandlerType } from "@/types";

import { handleWeatherCommand } from "@/commands/weather-command";

// ─────────────────────────────────────────────────────────────────
// REGISTRY
// ─────────────────────────────────────────────────────────────────

export const COMMAND_REGISTRY: Record<string, CommandHandlerType> = {
  // ── Meta ──────────────────────────────────────────────────────
  help: () => handleHelpCommand(),

  welcome: (args) => handleWelcomeCommand(args),

  // ── Portfolio info ─────────────────────────────────────────────
  about: (args) => handleAboutCommand(args),

  contact: (args) => handleContactCommand(args),

  email: (args) => handleEmailCommand(args),

  projects: (args) => handleProjectsCommand(args),

  repo: (args) => handleRepoCommand(args),

  resume: (args) => handleResumeCommand(args),

  // ── System ────────────────────────────────────────────────────
  alias: (args) => handleAliasCommand(args),

  unalias: (args) => handleUnaliasCommand(args),

  audio: (args) => handleAudioCommand(args),

  hostname: (args) => handleHostnameCommand(args),

  loader: (args) => handleLoaderCommand(args),

  neofetch: (args) => handleNeofetchCommand(args),

  whoami: (args) => handleWhoamiCommand(args),

  sudo: (args) => handleSudoCommand(args),

  exit: (args) => handleExitCommand(args),

  // ── Date & Time ───────────────────────────────────────────────
  date: () => handleDateCommand(),

  time: () => handleTimeCommand(),

  // ── Theming ───────────────────────────────────────────────────
  theme: (args) => handleThemeCommand(args),

  typeface: (args) => handleTypefaceCommand(args),

  // ── Network ───────────────────────────────────────────────────
  curl: (args) => {
    if (args.length === 0) return curlUsageOutput();
    return curlCommand(args);
  },

  weather: (args) => handleWeatherCommand(args),

  // ── Fun & Games ───────────────────────────────────────────────
  cowsay: (args) => handleCowsayCommand(args),

  rps: (args) => handleRpsCommand(args),

  game: (args) => handleGameCommand(args),

  joke: async (args) => handleJokeCommand(args),

  quote: async (args) => handleQuoteCommand(args),

  // ── Utilities ─────────────────────────────────────────────────
  note: (args) => handleNoteCommand(args),

  todo: (args) => handleTodoCommand(args),

  snippet: (args) => handleSnippetCommand(args),

  uuid: (args) => handleUUIDCommand(args),

  convert: async (args) => handleConvertCommand(args),

  age: (args) => handleAgeCommand(args),

  echo: (args) => handleEchoCommand(args),

  hash: (args) => handleHashCommand(args),

  ip: (args) => handleIpCommand(args),

  timer: (args) => handleTimerCommand(args),

  history: (args) => handleHistoryCommand(args),

  color: (args) => handleColorCommand(args),

  github: (args) => handleGithubCommand(args),

  man: (args) => handleManCommand(args),

  encode: (args) => handleEncodeCommand(args),

  decode: (args) => handleDecodeCommand(args),

  calc: (args) => handleCalcCommand(args),
};
