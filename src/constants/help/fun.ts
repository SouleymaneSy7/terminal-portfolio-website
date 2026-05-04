/**
 * Help outputs for fun commands
 */

import { POINTS, RANKS } from "@/constants/quiz-game"
import { DESIGN_TOKENS as DT } from "@/utils/designTokens"
import { createHelpOutput } from "@/utils/output"

export const COWSAY_HELP = createHelpOutput({
  name: "cowsay",
  usage: "cowsay <message>",
  description: "Make a cow say your message in ASCII art.",
  examples: [
    { command: "cowsay Hello World", description: "Cow says 'Hello World'" },
    { command: "cowsay I love coding", description: "Express yourself" },
  ],
})

export const JOKE_HELP = createHelpOutput({
  name: "joke",
  usage: "joke",
  description: "Get a random programming joke from JokeAPI.",
  examples: [{ command: "joke", description: "Fetch a random joke" }],
})

export const QUOTE_HELP = createHelpOutput({
  name: "quote",
  usage: "quote",
  description: "Get a random inspirational quote from Advice Slip API.",
  examples: [{ command: "quote", description: "Fetch a random quote" }],
})

export const RPS_HELP = createHelpOutput({
  name: "rps",
  usage: "rps <rock|paper|scissors>",
  description: "Play rock-paper-scissors against the terminal.",
  examples: [
    { command: "rps rock", description: "Play with rock" },
    { command: "rps paper", description: "Play with paper" },
    { command: "rps scissors", description: "Play with scissors" },
  ],
})

export const EXIT_HELP = createHelpOutput({
  name: "exit",
  usage: "exit [--help]",
  description: "exit",
  options: [{ flag: "--help, -h", description: "Show this help message" }],
})

export const GAME_HELP = createHelpOutput({
  name: "game — Frontend Quiz",
  usage: `<span class="text-tertiary-clr font-bold">game [subcommand | 1-3]</span>`,
  description: "Frontend quiz game. Answer questions, earn XP, climb the ranks.",
  options: [
    { flag: "game", description: "Load a new question" },
    { flag: "game [1-3]", description: "Submit your answer" },
    { flag: "game stats", description: "View your performance" },
    { flag: "game reset", description: "Clear all progress" },
    { flag: "game help, --help", description: "Show this guide" },
  ],
  notes: `<span class="text-tertiary-clr">+${POINTS.CORRECT} XP</span> correct ${DT.decorators.bullet} <span class="text-secondary-clr">${POINTS.WRONG} XP</span> wrong ${DT.decorators.bullet} Ranks: LEGEND ≥${RANKS.LEGEND.min}% ${DT.decorators.bullet} PRO ≥${RANKS.PRO.min}% ${DT.decorators.bullet} ADVANCED ≥${RANKS.ADVANCED.min}% ${DT.decorators.bullet} NOOB &lt;${RANKS.ADVANCED.min}%`,
  seeAlso: ["game stats", "game reset"],
})
