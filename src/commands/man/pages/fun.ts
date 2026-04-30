import { ManPageType } from "@/types";

export const FUN_PAGES: Record<string, ManPageType> = {
  cowsay: {
    name: "cowsay",
    synopsis: "cowsay <message>",
    description:
      "Renders an ASCII cow delivering a speech bubble containing the provided message. A direct homage to the classic Unix cowsay utility. Output is a 'text' block (whitespace-pre rendered) rather than HTML, preserving alignment regardless of the active font.",
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  cowsay Hello, World!</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  cowsay I love TypeScript</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  cowsay The terminal awaits</p>`,
    notes:
      "The border length is computed from the message length, so any character count works. No arguments beyond the message are supported (no -e eye options, no -T tongue options — this is a browser terminal, not bash).",
    seeAlso: ["echo", "sudo"],
  },

  echo: {
    name: "echo",
    synopsis: "echo [text]",
    description:
      "Outputs the given text to the terminal as a plain-text block. Supports the \\n escape sequence to produce multi-line output. Called with no arguments, it emits a single blank line. All output is rendered whitespace-pre, so spacing and indentation are preserved exactly.",
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  echo Hello, World!</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  echo Line 1\\nLine 2\\nLine 3</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  echo</p>`,
    notes:
      "Unlike real bash echo, there is no -e or -n flag support. The \\n → newline replacement is applied to the full joined argument string before splitting into lines, so newlines work anywhere in the input.",
    seeAlso: ["cowsay"],
  },

  game: {
    name: "game",
    synopsis: "game\ngame [1|2|3]\ngame stats\ngame reset",
    description:
      "An interactive 40-question Frontend development quiz. Each session loads questions randomly without repeating until all 40 are exhausted, then the pool resets. Correct answers earn +10 XP, wrong ones deduct 5. Accuracy across all answered questions determines the rank tier. All progress persists in localStorage.",
    options: `
      <p><span class="text-tertiary-clr font-bold">game          </span> - Load the next random question.</p>
      <p><span class="text-tertiary-clr font-bold">game [1-3]    </span> - Submit answer 1, 2, or 3 for the active question.</p>
      <p><span class="text-tertiary-clr font-bold">game stats    </span> - View score, accuracy percentage, and current rank with ASCII art.</p>
      <p><span class="text-tertiary-clr font-bold">game reset    </span> - Wipe all stored progress and statistics.</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  game           (loads first question)</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  game 2         (submits answer 2)</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  game stats</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  game reset</p>`,
    notes:
      "Ranks: NOOB (&lt;60%), ADVANCED (≥60%), PRO (≥75%), LEGEND (≥90%). ASCII art is displayed for LEGEND and PRO ranks in the stats view. Game state is serialized to 'terminal:quiz-game' in localStorage as { score, questionsAnswered, askedQuestions[], currentQuestionIndex }.",
    seeAlso: ["rps"],
  },

  joke: {
    name: "joke",
    synopsis: "joke",
    description:
      "Fetches a random two-part programming joke from the JokeAPI v2. The setup is displayed first, followed by a separator line and the punchline in a bold accent color. Requires an active internet connection. Safe-mode filtering is applied (no explicit/NSFW content).",
    notes:
      "Endpoint: v2.jokeapi.dev/joke/Programming?type=twopart. Only two-part jokes (setup + delivery) are requested. If the API is unavailable or returns an error response, a 'could not fetch' message is shown instead.",
    seeAlso: ["quote"],
  },

  quote: {
    name: "quote",
    synopsis: "quote",
    description:
      "Fetches a random piece of practical advice from the Advice Slip API and displays it between separator lines in a secondary accent color. Requires an active internet connection. The API returns a different slip on every call.",
    notes:
      "Endpoint: api.adviceslip.com/advice. The API returns JSON { slip: { id, advice } }. Cache headers from the API are ignored — each command invocation makes a fresh request.",
    seeAlso: ["joke"],
  },

  rps: {
    name: "rps",
    synopsis: "rps <rock|paper|scissors>",
    description:
      "Plays Rock-Paper-Scissors against the terminal. The computer chooses randomly using Math.random(). Win/loss/tie is computed with standard rules, displayed with color-coded result text. Each game is independent — there is no persistent score tracking.",
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  rps rock</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  rps paper</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  rps scissors</p>`,
    notes:
      "Tab completion is available — rps [Tab] cycles through rock → paper → scissors. Input is case-insensitive and only the first token is read (extra words are ignored).",
    seeAlso: ["game"],
  },

  sudo: {
    name: "sudo",
    synopsis: "sudo",
    description:
      "Simulates an access denied response, as if superuser privileges were requested in a real shell. An intentional easter egg — the 'superpowers' in this terminal are CSS and TypeScript, not root access.",
    notes:
      "No actual privilege escalation occurs. No system calls are made. The entire command is a single HTML block output with a denial message and a 😄 emoji.",
    seeAlso: ["exit", "cowsay"],
  },
};
