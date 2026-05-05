# Terminal Portfolio — Souleymane Sy

![Preview](./preview/preview.png)

> A terminal-style portfolio you actually _use_ like a terminal.
> Type commands. Explore my work. Switch themes. Play a quiz. All from the prompt.

**[→ Live Demo](https://terminal-portfolio-website-xi.vercel.app)** · **[→ Source Code](https://github.com/SouleymaneSy7/terminal-portfolio-website)**

Total time spent on this project: [![wakatime](https://wakatime.com/badge/user/018cb534-87bb-4814-975b-ca5e3cb8572b/project/86de76f6-9a37-458f-b8dd-2975978d2205.svg)](https://wakatime.com/badge/user/018cb534-87bb-4814-975b-ca5e3cb8572b/project/86de76f6-9a37-458f-b8dd-2975978d2205)

---

## Why a terminal?

I started coding in 2022 — no school, no bootcamp, no mentor. Just a laptop and an obsession with understanding how the web actually works.

After learning JavaScript, 50+ Frontend Mentor challenges, a contest podium, and a certified internship — I wanted a portfolio that reflected the way I think. Not a landing page. Not a scroll-heavy site. A **terminal**.

This project is both a technical showcase and a personal statement. Every command, every theme, every line of code is intentional.

---

## Table of Contents

- [Features](#features)
- [Commands Reference](#commands-reference)
- [Theme & Font System](#theme--font-system)
- [Architecture](#architecture)
- [Design System](#design-system)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Author](#author)

---

## Features

- **43 commands** — portfolio info, utilities, network tools, games, all with `--help` support
- **Audio system** — keyboard clicks, success/error sounds, Web Audio API synthesis, on/off/volume control
- **31 color themes** — OKLCH-based, persisted in localStorage, switchable instantly
- **15 monospace fonts** — dynamic loading system (1 static + 8 Google Fonts + 1 npm + 5 local)
- **Tab autocomplete** — completes commands and arguments, with cycling support
- **Suggestions panel** — grouped live completions with descriptions and keyboard navigation
- **Ctrl+R reverse search** — search through history incrementally, real terminal-style
- **Command history** — navigate with ↑↓, persisted across sessions
- **Manual pages** — `man <command>` for all 43 commands
- **5 loading variants** — braille spinner, ASCII progress bar, typewriter, dots, rotating spinner
- **Live clock** — real-time clock with box-drawing characters and timezone detection
- **Interactive quiz** — 40-question Frontend quiz, XP system, rank progression, localStorage persistence
- **Persistent utilities** — note manager, todo list, code snippet vault — all localStorage-backed
- **API integrations** — weather, jokes, quotes, currency rates, IP geolocation, GitHub profiles
- **curl simulator** — browser HTTP client with full flag parser and SSRF protection
- **Cryptographic tools** — hashes (SHA-1/256/384/512), Base64/URL/hex encode-decode
- **Color converter** — HEX → RGB → HSL → OKLCH with 30+ named colors and live swatch
- **Math calculator** — full expression evaluator via mathjs (algebra, trig, units, matrices)
- **DOMPurify sanitization** — every HTML output block is sanitized before render
- **Error boundary** — graceful recovery UI with dev-mode error details
- **Accessibility** — ARIA live regions, `aria-hidden` on decorative elements, `VisuallyHidden` component, `prefers-reduced-motion`, screen reader support for timers
- **Security** — strict HTTP headers, SSRF protection, XSS prevention
- **SEO** — full OpenGraph, Twitter Card, canonical URL, sitemap, robots.txt, JSON-LD Person schema, custom 404 metadata with noindex

---

## Commands Reference

Type `help` in the terminal to see the full list. Every command accepts `--help` for detailed usage.

### Navigation & System

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `audio`              | Toggle terminal sounds on/off, adjust volume      |
| `audio on`           | Enable keyboard and feedback sounds               |
| `audio off`          | Disable all sounds                                |
| `audio volume <0-1>` | Set sound volume (0 = mute, 1 = max)              |
| `clear`              | Clear the terminal screen (also `Ctrl+L`)         |
| `exit`               | Display goodbye message                           |
| `help`               | List all available commands                       |
| `hostname`           | Portfolio hostname and uptime info                |
| `neofetch`           | Linux-style system summary with live theme & font |
| `theme [name]`       | Switch color theme — 31 available                 |
| `typeface [name]`    | Switch terminal font — 15 available               |
| `welcome`            | Display the welcome banner again                  |
| `whoami`             | Short bio                                         |

### Information

| Command          | Description                                        |
| ---------------- | -------------------------------------------------- |
| `about`          | My story, journey, and tech stack                  |
| `contact`        | All social networks and contact details            |
| `date` / `time`  | Live clock with date, time and timezone            |
| `email`          | Email address with mailto link                     |
| `projects`       | Featured projects with live demos and source links |
| `repo`           | This portfolio's source code on GitHub             |
| `resume`         | View or download my CV in French or English (PDF)  |
| `weather <city>` | Real-time weather for any city via wttr.in         |

### Network

| Command                | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| `curl [options] <url>` | Browser HTTP client — GET, POST, HEAD, verbose mode, auth, SSRF protection |
| `github <username>`    | GitHub user profile, pinned repos, and top starred repositories            |
| `ip`                   | Public IP address and geolocation info                                     |

### Utilities

| Command                            | Description                                                    |
| ---------------------------------- | -------------------------------------------------------------- |
| `age <date>`                       | Exact age calculator with next-birthday countdown              |
| `calc <expression>`                | Math calculator — algebra, trig, units, constants (mathjs)     |
| `color <value>`                    | Convert colors between HEX, RGB, HSL, OKLCH                    |
| `convert <amount> <from> <to>`     | Real-time currency conversion (168+ currencies via ECB)        |
| `convert list`                     | List all supported currencies with names and symbols           |
| `decode [format] <text>`           | Decode base64, url, or hex — runs locally                      |
| `echo <text>`                      | Output text with `\n` newline support                          |
| `encode [format] <text>`           | Encode base64, url, or hex — runs locally                      |
| `hash [algo] <text>`               | Cryptographic hashes — sha256 (default), sha512, sha384, sha1  |
| `history [n]`                      | Display recent command history (default 20, in-memory cap 200) |
| `man <command>`                    | Full manual page for any command                               |
| `note`                             | List all saved notes                                           |
| `note add <text>`                  | Add a note (spaces supported)                                  |
| `note rm <id>`                     | Delete a note by short ID                                      |
| `note edit <id> <text>`            | Update a note in place                                         |
| `note clear`                       | Delete all notes                                               |
| `snippet`                          | List all saved code snippets                                   |
| `snippet add <name> <lang> <code>` | Save a code snippet                                            |
| `snippet show <id>`                | Display snippet code with syntax highlighting                  |
| `snippet rm <id>`                  | Delete a snippet                                               |
| `timer <duration> [label]`         | Countdown timer — supports `25m`, `1h`, `1h30m`, `90s`         |
| `todo`                             | List all tasks (pending and done)                              |
| `todo add <text>`                  | Add a task                                                     |
| `todo done <id>`                   | Mark a task as completed                                       |
| `todo undone <id>`                 | Revert a task to pending                                       |
| `todo rm <id>`                     | Delete a task                                                  |
| `uuid`                             | Generate one v4 UUID                                           |
| `uuid v1 [n]`                      | Generate n time-based v1 UUIDs (max 20)                        |
| `uuid v4 [n]`                      | Generate n random v4 UUIDs (max 20)                            |
| `uuid validate <string>`           | Validate any UUID string                                       |

### Fun & Games

| Command                       | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| `cowsay <message>`            | ASCII cow says your message                              |
| `game`                        | Start the Frontend Quiz — 40 questions, XP system, ranks |
| `game [1-3]`                  | Submit your answer                                       |
| `game stats`                  | View score, accuracy, and current rank                   |
| `game reset`                  | Wipe all progress and start fresh                        |
| `joke`                        | Random programming joke (JokeAPI)                        |
| `quote`                       | Random advice quote (Advice Slip API)                    |
| `rps <rock\|paper\|scissors>` | Rock-paper-scissors against the terminal                 |
| `sudo`                        | Attempt to gain root access… 😄                          |

### Keyboard Shortcuts

| Shortcut  | Action                                               |
| --------- | ---------------------------------------------------- |
| `Tab`     | Autocomplete command or argument                     |
| `↑` / `↓` | Navigate history (or suggestions when panel is open) |
| `Esc`     | Dismiss suggestions panel, keep input focus          |
| `Enter`   | Execute command                                      |
| `Ctrl+L`  | Clear the terminal screen                            |
| `Ctrl+R`  | Enter reverse search — cycle through history matches |
| `Ctrl+C`  | Cancel a running command (only active while loading) |

---

## Theme & Font System

### Themes (31)

Switch with `theme <name>`. All themes use **OKLCH** color values for perceptually uniform contrast. Your preference is saved in localStorage and restored on every page load.

```bash
theme dracula
theme catppuccin-mocha
theme tokyo-night
theme hack-the-box
```

| Group               | Themes                                                                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Catppuccin**      | `catppuccin` · `catppuccin-latte` · `catppuccin-frappe` · `catppuccin-mocha`                                                           |
| **Popular Dark**    | `monokai` · `tokyo-night` · `dracula` · `nord` · `gruvbox` · `everforest` · `rose-pine`                                                |
| **Editor Classics** | `solarized-dark` · `oceanic` · `cobalt2` · `github` · `one-dark` · `atom-one-dark`                                                     |
| **Material**        | `material-default` · `material-lighter` · `material-oceanic` · `material-palenight` · `material-deep-ocean` · `material-high-contrast` |
| **Others**          | `ayu-dark` · `night-owl` · `synthwave` · `kanagawa` · `horizon` · `poimandres` · `vesper` · `hack-the-box`                             |

> Tab completion is available — `theme [Tab]` cycles all 31 themes with grouped suggestions and inline descriptions.

### Fonts (15)

Switch with `typeface <name>`. Fonts load on demand to keep the initial bundle lean. Once loaded, switching is instant.

```bash
typeface fira          # Fira Code — ligatures
typeface jetbrains     # JetBrains Mono — clean readability
typeface victor        # Victor Mono — cursive italics
typeface geist         # Geist Mono — modern & sharp
```

| Category                            | Key → Label                                                                                        |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Static** (always loaded)          | `recursive-casual` → Recursive Casual Mono                                                         |
| **Google Fonts** (loaded on demand) | `fira` · `jetbrains` · `ibm-plex` · `source-code` · `ubuntu` · `space` · `inconsolata` · `cousine` |
| **npm package**                     | `geist` → Geist Mono                                                                               |
| **Local fonts**                     | `cascadia` · `recursive-linear` · `hack` · `victor` · `meslo`                                      |

**Loading strategy:**
Recursive Casual Mono is bundled statically at build time (~150 KB) — zero latency on first render. All other fonts load via `useDynamicFont` on first request: Google Fonts through a CDN `<link>` injection, Geist Mono via the official npm package, and local fonts through the `FontFace` API from `/public/fonts/`. Every font is cached after first load.

This reduces the initial bundle by ~75% compared to loading all fonts upfront.

---

## Architecture

### Command Registry

Every command maps to a handler in a single file (`src/utils/commandRegistry.ts`). Adding or removing a command requires editing exactly one line:

```typescript
export const COMMAND_REGISTRY: Record<string, CommandHandlerType> = {
  calc: (args) => handleCalcCommand(args),
  color: (args) => handleColorCommand(args),
  github: (args) => handleGithubCommand(args),
  // ... 43 entries total
}
```

The dispatcher (`executeCommand`) does a single registry lookup — no switch statements, no if-chains. `clear` is the only exception: it bypasses the registry entirely and calls `clearHistory()` directly in `Terminal.tsx`.

### Unified Argument Parser

Every command uses `parseArgs()` from `src/utils/argParser.ts`:

```typescript
parseArgs(["add", "--verbose", "-f", "file.txt"])
// → { subcommand: "add", flags: { verbose: true, f: true }, positional: ["file.txt"] }
```

Handles long flags (`--flag`), short flags (`-f`), options with values (`--option value`), positional arguments, and automatic `--help`/`-h` detection.

### Output Factories

All command output is created through typed factories. No command writes raw blocks manually:

```typescript
createHtmlOutput(html)          // HTML block — DOMPurify sanitized at render time
createTextOutput(lines)         // Plain text, whitespace-pre preserved
createErrorOutput(msg, hint?)   // Standardized error with optional guidance
createSuccessOutput(msg)        // Standardized success feedback
createHelpOutput(config)        // Full help block — name, usage, options, examples
```

Help outputs are built from composable section builders (`createOptionsSection`, `createExamplesSection`, etc.) extracted for reusability across all `--help` and `man` pages.

### Utility Helpers

Common utilities shared across commands:

| Helper         | Purpose                                         | Used by         |
| -------------- | ----------------------------------------------- | --------------- |
| `normalizeUrl` | Sanitize and validate URLs, strip fragments     | `curl`, `audio` |
| `isPrivateIP`  | Detect loopback, link-local, and private ranges | `curl`          |

### Service Layer

Every external API call is isolated in `src/services/`. Commands never make HTTP requests directly.

| Service              | API                   | Used by   |
| -------------------- | --------------------- | --------- |
| `weather.service.ts` | wttr.in               | `weather` |
| `joke.service.ts`    | JokeAPI v2            | `joke`    |
| `quote.service.ts`   | Advice Slip API       | `quote`   |
| `convert.service.ts` | Frankfurter / ECB     | `convert` |
| `ip.service.ts`      | ipapi.co              | `ip`      |
| `github.service.ts`  | GitHub REST + GraphQL | `github`  |
| `curl.service.ts`    | axios (browser)       | `curl`    |
| `audio.service.ts`   | Web Audio API         | `audio`   |

### Custom Hooks

| Hook                | Purpose                                                             |
| ------------------- | ------------------------------------------------------------------- |
| `useCommandHistory` | Terminal history state with localStorage persistence                |
| `useLocalStorage`   | SSR-safe generic localStorage hook with JSON serialization          |
| `useThemeFont`      | Restore saved theme and font preferences on mount                   |
| `useDynamicFont`    | Lazy-load and cache fonts on demand                                 |
| `useDebounce`       | Debounce any value — used in suggestion computation                 |
| `useReverseSearch`  | Incremental reverse search through history (Ctrl+R)                 |
| `useSuggestions`    | Live suggestions panel — completions, grouping, keyboard nav        |
| `useAudio`          | Audio system — keyboard sounds, success/error feedback, persistence |

### Domain-Split Types

```
src/types/
├── terminal.types.ts   — Block, CommandHistory, SerializableHistory
├── command.types.ts    — CommandHandlerType, ParsedArgsType, HelpConfigType, ManPageType
├── ui.types.ts         — Component prop types (Timer, ErrorBoundary, Loaders…)
└── data.types.ts       — API response shapes (GitHub, IP, currency, curl…)
```

### Security

- **DOMPurify** sanitizes every HTML output block before it reaches the DOM — enforced in `CommandOutput.tsx` via `dangerouslySetInnerHTML` + `afterSanitizeAttributes` hook that adds `target="_blank" rel="noopener noreferrer"` to all links
- **SSRF protection** in the curl command — local/private addresses are rejected before dispatch
- **HTTP security headers** set in `next.config.ts`: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `X-XSS-Protection`, `Strict-Transport-Security`, `Permissions-Policy`

---

## Design System

The visual language is built on centralized tokens used consistently across all 43 commands.

### Semantic Color Roles

| CSS Variable             | Role                                      |
| ------------------------ | ----------------------------------------- |
| `--color-primary-clr`    | Prompt, accents, interactive elements     |
| `--color-secondary-clr`  | Section headers, labels, error indicators |
| `--color-tertiary-clr`   | Command names, highlighted values, code   |
| `--color-text-clr`       | Body text                                 |
| `--color-background-clr` | Terminal background                       |
| `--color-foreground-clr` | Input bar, card surfaces                  |

All values are in OKLCH — consistent perceptual lightness and chroma across all 31 themes.

### Spacing Scale

| Token               | Usage                                    |
| ------------------- | ---------------------------------------- |
| `space-y-t-section` | Between major output sections            |
| `space-y-t-group`   | Between lines within a section           |
| `space-y-t-footer`  | Footer / hint area                       |
| `py-t-outer`        | Vertical padding on the output container |

### Design Tokens

All decorative elements are centralized in `src/utils/designTokens.ts` — no inline strings in command files:

```typescript
DT.separators.short // ────────────────────────────────────────
DT.separators.long // ──────────────────────────────────────────────────────
DT.icons.success // ✓  (aria-hidden)
DT.icons.warning // ⚠  (aria-hidden)
DT.icons.error // ✗  (aria-hidden)
DT.decorators.bullet // •  (aria-hidden)
DT.decorators.arrow // →  (aria-hidden)
DT.decorators.quote // '  (aria-hidden)
```

---

## Tech Stack

### Core

| Technology   | Version | Role                                    |
| ------------ | ------- | --------------------------------------- |
| Next.js      | 16.2.4  | Framework, routing, headers, SSR        |
| React        | 19.2.5  | UI rendering, hooks, error boundary     |
| TypeScript   | 6.0.3   | Static typing, domain-split type system |
| Tailwind CSS | 4.2.4   | Utility-first styling                   |
| Bun          | latest  | Runtime and package manager             |

### Libraries

| Package       | Version | Role                                  |
| ------------- | ------- | ------------------------------------- |
| framer-motion | 12.38.0 | Animations and transitions            |
| dompurify     | 3.4.1   | XSS sanitization                      |
| axios         | 1.15.2  | HTTP client for all API calls         |
| mathjs        | 15.2.0  | Math expression evaluator             |
| uuid          | 14.0.0  | UUID v1 / v4 generation               |
| date-fns      | 4.1.0   | Date parsing and arithmetic           |
| highlight.js  | 11.11.1 | Syntax highlighting in `snippet show` |
| geist         | 1.7.0   | Geist Mono font package               |

### External APIs

| API                   | Command   | Notes                       |
| --------------------- | --------- | --------------------------- |
| wttr.in               | `weather` | Free, no auth               |
| JokeAPI v2            | `joke`    | Free, safe-mode enabled     |
| Advice Slip API       | `quote`   | Free, no auth               |
| Frankfurter (ECB)     | `convert` | Free, in-memory cache       |
| ipapi.co              | `ip`      | 1,000 req/day free tier     |
| GitHub REST + GraphQL | `github`  | 60 req/hour unauthenticated |

---

## Installation

### Requirements

- Node.js 18+ or Bun 1.0+

### Quick Start

```bash
git clone https://github.com/SouleymaneSy7/terminal-portfolio-website.git
cd terminal-portfolio-website

bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
bun dev      # Dev server with Turbopack
bun build    # Production build
bun start    # Production server
bun lint     # ESLint
```

---

## Project Structure

```
terminal-portfolio-website/
├── public/
│   ├── fonts/                    # Local font files (woff2)
│   ├── resume/                   # CV PDFs — EN and FR
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── globals.css           # Design tokens, 31 themes, 15 font rules
│   │   ├── layout.tsx            # Root layout, SEO metadata, static font
│   │   ├── page.tsx              # Home — Terminal + MobileBanner
│   │   ├── not-found.tsx         # Custom 404
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── commands/
│   │   ├── curl/                 # curl — index, parser, formatters, outputs
│   │   ├── man/                  # man — index + pages (system, info, network, utils, fun)
│   │   ├── _template-command.ts  # Template for new commands
│   │   └── *.ts                  # One file per command
│   ├── components/
│   │   ├── common/               # Custom404, VisuallyHidden
│   │   ├── terminal/             # Terminal, CommandInput, CommandOutput, TerminalPrompt
│   │   └── ui/                   # LiveClock, TimerWidget, MobileBanner, loaders/
│   ├── constants/
│   │   ├── help/                 # Help outputs organized by category
│   │   ├── quiz-game/            # 40 questions + XP / rank config
│   │   ├── ascii.ts              # All ASCII art constants
│   │   ├── commands.ts           # Command list + COMPLETIONS map
│   │   ├── storageKeys.ts        # Centralized localStorage key names
│   │   └── suggestions.ts        # Grouped suggestion data
│   ├── hooks/                    # 7 custom hooks
│   ├── services/                 # 7 service files — one per API
│   ├── types/                    # 4 domain-split type files
│   └── utils/
│       ├── output/               # output.ts + outputBuilders.ts
│       ├── argParser.ts          # Unified argument parser
│       ├── command.ts            # executeCommand dispatcher
│       ├── commandRegistry.ts    # Central command registry
│       ├── commandStorage.ts     # localStorage wrapper
│       ├── date.ts               # Date utilities
│       └── designTokens.ts       # Centralized design tokens
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Adding a Command

The codebase is designed to make this as frictionless as possible:

1. Copy `src/commands/_template-command.ts` and rename it
2. Write your handler — use `parseArgs`, `createHtmlOutput`, `createErrorOutput`
3. Register it in `src/utils/commandRegistry.ts` — one line
4. Add it to the `commands` array in `src/constants/commands.ts`
5. Add tab completions in `COMPLETIONS` if applicable
6. Write a `--help` entry in `src/constants/help/`
7. (Optional) Write a `man` page entry in `src/commands/man/pages/`

That's it. No switch statements to update, no global imports to hunt down.

---

## Contributing

Found a bug, have a command idea, or want to improve the design system? Contributions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-command`)
3. Make your changes
4. Run `bun lint` to check for issues
5. Open a pull request

When adding a new command, follow the steps in [Adding a Command](#adding-a-command) above.

---

## Author

If something here caught your attention — reach out.

- **GitHub** — [github.com/SouleymaneSy7](https://github.com/SouleymaneSy7)
- **LinkedIn** — [linkedin.com/in/souleymanesy7](https://linkedin.com/in/souleymanesy7)
- **Email** — [souleymanesycodes@gmail.com](mailto:souleymanesycodes@gmail.com)

---

<p align="center">Built with ❤️ and too many terminal commands</p>
