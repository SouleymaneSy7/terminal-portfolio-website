# Terminal Portfolio — Souleymane Sy

<div align="center">

![Preview](./preview/preview.png)

</div>

---

## Before anything else

I don't have a CS degree.
No bootcamp. No mentor. No industry connections.

I started in 2022 from Coyah, Guinea-Conakry, with a laptop, a spotty internet connection, and an obsession with understanding how the web actually works — not just how to copy it.

This portfolio is the result of 130+ hours on this single project. Not 130 hours of following tutorials. 130 hours of designing, implementing, debugging, refactoring, documenting, and pushing every detail past what any recruiter would expect. Every command, every animation, every design token was deliberate.

This is not a template. This is not a generic showcase.
This is a statement.

<div align="center">

**A terminal you actually use like a terminal.**
Type commands. Explore my work. Switch themes. Play a quiz. All from the prompt.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-terminal--portfolio--website--xi.vercel.app-6e40c9?style=flat-square&logo=vercel)](https://terminal-portfolio-website-xi.vercel.app)
[![Source Code](https://img.shields.io/badge/Source-GitHub-24292e?style=flat-square&logo=github)](https://github.com/SouleymaneSy7/terminal-portfolio-website)
[![WakaTime](https://wakatime.com/badge/user/018cb534-87bb-4814-975b-ca5e3cb8572b/project/86de76f6-9a37-458f-b8dd-2975978d2205.svg?style=flat-square)](https://wakatime.com/badge/user/018cb534-87bb-4814-975b-ca5e3cb8572b/project/86de76f6-9a37-458f-b8dd-2975978d2205)

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)

</div>

---

## What you can do

46 commands packed into this terminal. Every single one accepts `--help` for details and `man <command>` for a full manual page. Type `help` to see them all.

| Category          | Features |
| ----------------- | -------- |
| **Commands**      | 46 — portfolio info, utilities, network tools, games, all with man pages |
| **Theming**       | 31 OKLCH color themes, 15 monospace fonts, both persisted in localStorage |
| **Completion**    | Tab autocomplete with grouped suggestions and keyboard navigation |
| **History**       | Arrow key navigation, Ctrl+R incremental reverse search, persisted across sessions |
| **Audio**         | Web Audio API keyboard sounds — click, chime, buzz. Zero audio files shipped |
| **Loading**       | 5 variants: braille spinner, ASCII progress bar, typewriter cursor, dots accumulator, rotating spinner |
| **Utilities**     | Note manager, todo list, code snippet vault — all localStorage-backed with full CRUD |
| **Network**       | curl simulator with SSRF protection, GitHub profile viewer (REST + GraphQL), IP geolocation |
| **Crypto**        | SHA-1/256/384/512 hashes, Base64/URL/hex encode-decode — all local via Web Crypto API, nothing hits a server |
| **Games**         | 40-question Frontend quiz with XP system, 4 rank tiers, and localStorage persistence |
| **Accessibility** | ARIA live regions, combobox pattern, `aria-hidden` on decorative elements, `prefers-reduced-motion`, screen reader support |
| **Security**      | DOMPurify sanitization, strict HTTP security headers, SSRF protection on the curl command |
| **SEO**           | Full OpenGraph, Twitter Card, canonical URL, sitemap, robots.txt, JSON-LD Person schema |

---

## Commands

### Navigation & System

| Command                       | Description |
| ----------------------------- | ----------- |
| `audio [on\|off\|volume <n>]` | Toggle keyboard sounds, adjust volume (0-100) |
| `alias [name="value"]`        | Create or list persistent command shortcuts |
| `unalias <name>`              | Remove an alias |
| `clear` / `Ctrl+L`            | Clear the terminal screen |
| `exit`                        | Display goodbye message |
| `help`                        | List all available commands |
| `hostname`                    | Portfolio hostname and uptime info |
| `loader [name\|--random]`     | Switch loading indicator style — 5 available |
| `neofetch`                    | Linux-style system summary with live theme and font |
| `theme [name\|--random]`      | Switch color theme — 31 available |
| `typeface [name\|--random]`   | Switch terminal font — 15 available |
| `welcome`                     | Display the welcome banner again |
| `whoami`                      | Short bio |

### Information

| Command          | Description |
| ---------------- | ----------- |
| `about`          | My story, journey, and tech stack |
| `contact`        | All social networks and contact details |
| `date` / `time`  | Live clock with date, time, and timezone |
| `email`          | Email address with mailto link |
| `projects`       | Featured projects with live demos and source links |
| `repo`           | This portfolio's source code on GitHub |
| `resume`         | View or download my CV in English or French (PDF) |
| `weather <city>` | Real-time weather for any city via wttr.in |

### Network

| Command                | Description |
| ---------------------- | ----------- |
| `curl [options] <url>` | Browser HTTP client — GET, POST, HEAD, verbose mode, auth, SSRF protection |
| `github <username>`    | GitHub user profile, pinned repos, and top starred repos |
| `ip`                   | Public IP address and geolocation info |

### Utilities

| Command                               | Description |
| ------------------------------------- | ----------- |
| `age <date>`                          | Exact age calculator with next-birthday countdown |
| `calc <expression>`                   | Math calculator — algebra, trig, units, constants (mathjs) |
| `color <value>`                       | Convert colors between HEX, RGB, HSL, OKLCH |
| `convert <amount> <from> <to>`        | Real-time currency conversion (168+ currencies via ECB) |
| `convert list`                        | List all supported currencies with names and symbols |
| `decode [format] <text>`              | Decode base64, url, or hex — runs locally |
| `echo <text>`                         | Output text with `\n` newline support |
| `encode [format] <text>`              | Encode to base64, url, or hex — runs locally |
| `hash [algo] <text>`                  | Cryptographic hashes — sha256 (default), sha512, sha384, sha1 |
| `history [n]`                         | Display recent command history (default 20, max 50) |
| `man <command>`                       | Full manual page for any command |
| `note [add\|rm\|edit\|clear]`         | Persistent note manager |
| `snippet [add\|show\|rm\|clear]`      | Code snippet vault with syntax highlighting |
| `timer <duration> [label]`            | Countdown timer — supports `25m`, `1h`, `1h30m`, `90s` |
| `todo [add\|done\|undone\|rm\|clear]` | Task list with done/pending states |
| `uuid [v1\|v4] [n]` / `uuid validate` | Generate or validate UUIDs |

### Fun & Games

| Command                       | Description |
| ----------------------------- | ----------- |
| `cowsay <message>`            | ASCII cow says your message |
| `game` / `game [1-3]`         | Frontend quiz — 40 questions, XP system, 4 ranks |
| `game stats` / `game reset`   | View or reset quiz progress |
| `joke`                        | Random programming joke (JokeAPI) |
| `quote`                       | Random advice quote (Advice Slip API) |
| `rps <rock\|paper\|scissors>` | Rock-paper-scissors against the terminal |
| `sudo`                        | Attempt to gain root access |

### Keyboard Shortcuts

| Shortcut  | Action |
| --------- | ------ |
| `Tab`     | Autocomplete command or argument — cycles through matches |
| `↑` / `↓` | Navigate history, or move through suggestions when panel is open |
| `Esc`     | Dismiss suggestions panel, keep input focus |
| `Enter`   | Execute command |
| `Ctrl+L`  | Clear the terminal screen |
| `Ctrl+R`  | Enter reverse search — cycle through history matches |
| `Ctrl+C`  | Cancel a running command (only active while loading) |

---

## Look & feel

### Themes (31)

Switch with `theme <name>`. All themes use OKLCH color values, which gives perceptually uniform contrast across hue and lightness. Your preference is saved in localStorage and restored on every page load.

```bash
theme dracula
theme catppuccin-mocha
theme tokyo-night
theme hack-the-box
theme --random    # Roll the dice
theme random      # Same result, positional form
```

| Group               | Themes |
| ------------------- | ------ |
| **Catppuccin**      | `catppuccin` / `catppuccin-latte` / `catppuccin-frappe` / `catppuccin-mocha` |
| **Popular Dark**    | `monokai` / `tokyo-night` / `dracula` / `nord` / `gruvbox` / `everforest` / `rose-pine` |
| **Editor Classics** | `solarized-dark` / `oceanic` / `cobalt2` / `github` / `one-dark` / `atom-one-dark` |
| **Material**        | `material-default` / `material-lighter` / `material-oceanic` / `material-palenight` / `material-deep-ocean` / `material-high-contrast` |
| **Others**          | `ayu-dark` / `night-owl` / `synthwave` / `kanagawa` / `horizon` / `poimandres` / `vesper` / `hack-the-box` |

Hit `theme [Tab]` to cycle all 31 with grouped suggestions and inline descriptions.

### Fonts (15)

Switch with `typeface <name>`. Fonts load on demand. The initial bundle only ships Recursive Casual Mono. Everything else loads when you first request it — after that, switching is instant.

```bash
typeface fira          # Fira Code with ligatures
typeface jetbrains     # JetBrains Mono
typeface victor        # Victor Mono — cursive italics
typeface geist         # Geist Mono
typeface --random      # Roll the dice
```

| Category                     | Fonts |
| ---------------------------- | ----- |
| **Static** (always loaded)   | `recursive-casual` (Recursive Casual Mono) |
| **Google Fonts** (on demand) | `fira` / `jetbrains` / `ibm-plex` / `source-code` / `ubuntu` / `space` / `inconsolata` / `cousine` |
| **npm package**              | `geist` (Geist Mono) |
| **Local fonts**              | `cascadia` / `recursive-linear` / `hack` / `victor` / `meslo` |

**How loading works:** Recursive Casual Mono is bundled statically at build time (~150 KB) — zero latency on first render. All other fonts load through `useDynamicFont` on first request: Google Fonts via CDN `<link>` injection, Geist Mono through the official npm package, and local fonts through the `FontFace` API from `/public/fonts/`. Every font is cached after first load. This cuts the initial bundle by roughly 75% compared to loading all 15 upfront.

---

## How it works

### Command Registry

Every command maps to a handler in a single file (`src/utils/commandRegistry.ts`). Adding or removing a command requires editing exactly one line.

```typescript
export const COMMAND_REGISTRY: Record<string, CommandHandlerType> = {
  calc: (args) => handleCalcCommand(args),
  color: (args) => handleColorCommand(args),
  github: (args) => handleGithubCommand(args),
  // 45 entries + clear (built-in)
};
```

The dispatcher (`executeCommand`) does a single registry lookup with alias resolution built in. No switch statements. No if-chains. `clear` is the only exception — it bypasses the registry entirely.

**Resolution order (first match wins):**

1. `clear` — built-in, bypasses everything
2. Alias expansion — transparently replace with stored expansion (single-level, no loops)
3. `COMMAND_REGISTRY` — normal command handlers
4. Not-found output — friendly error message

### Argument Parser

Every command uses `parseArgs()` from `src/utils/argParser.ts`.

```typescript
parseArgs(["add", "--verbose", "-f", "file.txt"]);
// => { subcommand: "add", flags: { verbose: true, f: true }, positional: ["file.txt"] }
```

It handles long flags (`--flag`), short flags (`-f`), options with values (`--option value`), positional arguments, and automatic `--help`/`-h` detection.

### Output Factories

Every command returns output through typed factories. I wanted to avoid commands writing raw HTML by hand.

```typescript
createHtmlOutput(html)         // HTML block — DOMPurify sanitized at render time
createTextOutput(lines)        // Plain text, whitespace preserved
createErrorOutput(msg, hint?)  // Standardized error with optional guidance
createSuccessOutput(msg)       // Standardized success feedback
createHelpOutput(config)       // Full help block
```

### Service Layer

Every external API call is isolated in `src/services/`. Command handlers never touch HTTP directly — they call a service and get back data.

| Service              | API                   | Used by |
| -------------------- | --------------------- | ------- |
| `weather.service.ts` | wttr.in               | `weather` |
| `joke.service.ts`    | JokeAPI v2            | `joke` |
| `quote.service.ts`   | Advice Slip API       | `quote` |
| `convert.service.ts` | Frankfurter / ECB     | `convert` |
| `ip.service.ts`      | ipapi.co              | `ip` |
| `github.service.ts`  | GitHub REST + GraphQL | `github` |
| `curl.service.ts`    | axios (browser)       | `curl` |
| `audio.service.ts`   | Web Audio API         | `audio` |

### Custom Hooks

| Hook                | Purpose |
| ------------------- | ------- |
| `useCommandHistory` | Terminal history state with localStorage persistence |
| `useLocalStorage`   | SSR-safe generic localStorage hook with JSON serialization |
| `useThemeFont`      | Restore saved theme and font preferences on mount |
| `useDynamicFont`    | Lazy-load and cache fonts on demand |
| `useDebounce`       | Debounce any value — used in suggestion computation |
| `useReverseSearch`  | Incremental reverse search through history (Ctrl+R) |
| `useSuggestions`    | Live suggestions panel — completions, grouping, keyboard nav |
| `useAudio`          | Audio system — keyboard sounds, success/error feedback, persistence |

### Domain-Split Type System

```
src/types/
  terminal.types.ts   — Block, CommandHistory, SerializableHistory
  command.types.ts    — CommandHandlerType, ParsedArgsType, HelpConfigType, ManPageType
  ui.types.ts         — Component prop types (Timer, ErrorBoundary, Loaders...)
  data.types.ts       — API response shapes (GitHub, IP, currency, curl...)
```

---

## Design Tokens

Every decorative element and spacing value comes from `src/utils/designTokens.ts`. I keep them centralized to avoid scattered inline strings across command files.

### Semantic Colors

| CSS Variable             | Role |
| ------------------------ | ---- |
| `--color-primary-clr`    | Prompt, accents, interactive elements |
| `--color-secondary-clr`  | Section headers, labels, error indicators |
| `--color-tertiary-clr`   | Command names, highlighted values, code |
| `--color-text-clr`       | Body text |
| `--color-background-clr` | Terminal background |
| `--color-foreground-clr` | Input bar, card surfaces |

Every value uses OKLCH. Consistent perceptual lightness across all 31 themes.

### Spacing Scale

| Token               | Usage |
| ------------------- | ----- |
| `space-y-t-section` | Between major output sections |
| `space-y-t-group`   | Between lines within a section |
| `space-y-t-footer`  | Footer / hint area |
| `py-t-outer`        | Vertical padding on the output container |

### Decorative Elements

```typescript
DT.separators.short; // ────────────────────────────────────────
DT.separators.long;  // ──────────────────────────────────────────────────────
DT.icons.success;    // ✓  (aria-hidden)
DT.icons.warning;    // ⚠  (aria-hidden)
DT.icons.error;      // ✗  (aria-hidden)
DT.decorators.bullet;// •  (aria-hidden)
DT.decorators.arrow; // →  (aria-hidden)
```

---

## Performance (and what it cost me)

| Metric             | Strategy |
| ------------------ | -------- |
| **Initial bundle** | One static font (Recursive Casual Mono, ~150 KB). All others lazy-loaded via `useDynamicFont` — roughly 75% less CSS than loading all 15 upfront |
| **Code splitting** | `mathjs` tree-shaken via `optimizePackageImports`. `highlight.js` dynamically imported only when you run `snippet show` |
| **API responses**  | Currency list cached in memory after first fetch. Fonts cached after first load — subsequent switches are instant |
| **Rendering**      | `React.memo` on `HistoryEntry`. Output animations staggered with configurable delays to avoid layout thrashing |
| **Compression**    | HTTP response compression enabled in `next.config.ts` |
| **Animations**     | All animations respect `prefers-reduced-motion` — durations collapse to 0.01ms globally when the media query fires. The audio engine also checks this before playing sound |

The font loading strategy was the hardest piece to get right. Balancing rich visual customization against first-load performance meant writing a custom hook instead of using any off-the-shelf solution. Every font loads through the `FontFace` API, Google Fonts `<link>` injection, or the npm `geist` package — and every one caches after first use.

---

## Accessibility (the hard parts)

This project targets WCAG 2.1 Level AA for the interactive terminal interface. Some of it was straightforward. Some of it was not.

| Feature                 | Implementation |
| ----------------------- | -------------- |
| **ARIA live region**    | `role="log"` with `aria-live="polite"` wraps command history — screen readers announce new output without losing focus |
| **Combobox pattern**    | The command input uses `role="combobox"` with `aria-haspopup`, `aria-expanded`, `aria-controls`, and `aria-activedescendant` |
| **Decorative elements** | All ASCII art, separators, and icon spans carry `aria-hidden="true"` |
| **VisuallyHidden**      | A `<VisuallyHidden>` component wraps screen-reader-only context (keyboard hint, timer announcements, copy status) |
| **Focus management**    | ESC dismisses the suggestions panel and immediately restores focus to the input |
| **Reduced motion**      | `@media (prefers-reduced-motion: reduce)` collapses all animation durations to 0.01ms globally. The audio system also checks this |
| **Keyboard-first**      | Every feature works by keyboard alone. No mouse dependency |
| **Semantic HTML**       | `<main>`, `<label>` + `<input>`, `role="application"`, `role="log"`, `role="status"`, `role="alert"` used contextually |
| **Color contrast**      | All 31 themes use OKLCH values tuned for 4.5:1 minimum contrast ratio between text and background |

**The honest limitation:** A terminal interface is inherently challenging for screen readers. The character-by-character output animation can be verbose. The `aria-atomic="false"` on the log region is intentional — setting it to `true` would make screen readers re-read the entire history on every new command, which is a terrible experience.

---

## Security

| Measure                    | Details |
| -------------------------- | ------- |
| **XSS prevention**         | Every HTML output block passes through DOMPurify before reaching `dangerouslySetInnerHTML`. A post-sanitization hook adds `target="_blank" rel="noopener noreferrer"` to all links |
| **SSRF protection**        | The `curl` command rejects local/private addresses (localhost, 127.x, 10.x, 192.168.x, 169.254.x, ::1) before dispatch |
| **HTTP security headers**  | Set in `next.config.ts` on all routes: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-XSS-Protection: 1; mode=block`, `Strict-Transport-Security` (HSTS), `Permissions-Policy` (camera/microphone/geolocation blocked) |
| **No server-side secrets** | All cryptographic operations (hashing, encoding, UUID generation) run locally in the browser via the Web Crypto API. Nothing sent to a server |
| **Alias safety**           | Alias resolution is single-level. Alias names validated against a strict POSIX regex. Protected built-ins (`clear`) cannot be aliased |

---

## SEO & Metadata

| Feature           | Implementation |
| ----------------- | -------------- |
| **OpenGraph**     | Full `og:title`, `og:description`, `og:image` (1200x630), `og:type`, `og:url`, `og:locale` |
| **Twitter Card**  | `summary_large_image` with `@Souleymanesy43` creator tag |
| **Canonical URL** | Declared in Next.js metadata — prevents duplicate indexing |
| **JSON-LD**       | `Person` schema with `name`, `url`, `sameAs` (GitHub, LinkedIn), `jobTitle`, `knowsAbout` |
| **Sitemap**       | Generated at `/sitemap.xml` via `src/app/sitemap.ts` with monthly change frequency |
| **robots.txt**    | Generated at `/robots.txt` via `src/app/robots.ts` — allows all crawlers, links to sitemap |
| **DNS prefetch**  | `<link rel="dns-prefetch">` for `fonts.googleapis.com` and `fonts.gstatic.com` in the root layout |
| **404 page**      | Custom terminal-style 404 with `robots: { index: false }` |

---

## Tech Stack

### Core

| Technology   | Version | Role |
| ------------ | ------- | ---- |
| Next.js      | 16.2.4  | Framework, routing, headers, SSR |
| React        | 19.2.5  | UI rendering, hooks, error boundary |
| TypeScript   | 6.0.3   | Static typing, domain-split type system |
| Tailwind CSS | 4.2.4   | Utility-first styling |
| Bun          | latest  | Runtime and package manager |

### Libraries

| Package       | Version | Role |
| ------------- | ------- | ---- |
| framer-motion | 12.38.0 | Animations and transitions |
| dompurify     | 3.4.1   | XSS sanitization |
| axios         | 1.15.2  | HTTP client for all API calls |
| mathjs        | 15.2.0  | Math expression evaluator |
| uuid          | 14.0.0  | UUID v1 / v4 generation |
| date-fns      | 4.1.0   | Date parsing and arithmetic |
| highlight.js  | 11.11.1 | Syntax highlighting in `snippet show` |
| geist         | 1.7.0   | Geist Mono font package |

### External APIs

| API                   | Command   | Auth           | Rate limit |
| --------------------- | --------- | -------------- | ---------- |
| wttr.in               | `weather` | None           | Generous |
| JokeAPI v2            | `joke`    | None           | 120 req/min |
| Advice Slip API       | `quote`   | None           | Generous |
| Frankfurter (ECB)     | `convert` | None           | Generous |
| ipapi.co              | `ip`      | None           | 1,000 req/day |
| GitHub REST + GraphQL | `github`  | Optional token | 60 req/hr (unauthenticated) |

---

## Browser Support

| Browser                | Support |
| ---------------------- | ------- |
| Chrome / Edge 88+      | Full |
| Firefox 78+            | Full |
| Safari 14+             | Full |
| Mobile Chrome / Safari | Functional (keyboard UX degraded by design) |

The terminal relies on: `Web Crypto API`, `FontFace API`, `AudioContext`, `ResizeObserver`, `Intl.DateTimeFormat`, `localStorage`. All available in modern browsers without polyfills.

Mobile browsers work, but the experience is built for a physical keyboard. A banner communicates this to mobile visitors.

---

## Getting Started

### Requirements

- **Node.js** 18+ or **Bun** 1.0+

### Quick Start

```bash
git clone https://github.com/SouleymaneSy7/terminal-portfolio-website.git
cd terminal-portfolio-website

bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) and type `help`.

### Environment Variables (optional)

```bash
# .env.local
# Enables pinned repos via GitHub GraphQL API (60 req/hr without token)
NEXT_PUBLIC_GITHUB_TOKEN=ghp_yourTokenHere
```

Without the token, `github <username>` still works. Pinned repos are skipped — top starred repos are shown instead.

### Scripts

```bash
bun dev      # Dev server with Turbopack
bun build    # Production build
bun start    # Production server
bun lint     # ESLint
bun format   # Prettier
```

---

## Project Structure

```
terminal-portfolio-website/
  public/
    fonts/                    # Local font files (.woff2)
    resume/                   # CV PDFs — EN and FR
    og-image.png
  src/
    app/
      globals.css             # Design tokens, 31 themes, 15 font rules
      layout.tsx              # Root layout, SEO metadata, static font
      page.tsx                # Home — Terminal + MobileBanner
      not-found.tsx           # Custom 404
      robots.ts
      sitemap.ts
    commands/
      curl/                   # curl — index, parser, formatters, outputs
      man/                    # man — index + page handlers
        pages/                # Man pages split by category
      _template-command.ts    # Template for new commands (4 patterns)
      *.ts                    # One file per command
    components/
      common/                 # Custom404, VisuallyHidden
      terminal/               # Terminal, CommandInput, CommandOutput, TerminalPrompt
      ui/                     # LiveClock, TimerWidget, JsonOutput, MobileBanner, loaders/
    constants/
      help/                   # Help outputs by category
      quiz-game/              # 40 questions + XP / rank config
      ascii.ts                # All ASCII art constants
      commands.ts             # Command list + COMPLETIONS map
      storageKeys.ts          # Centralized localStorage key names
      suggestions.ts          # Grouped suggestion data
    hooks/                    # 8 custom hooks
    services/                 # 8 service files
    types/                    # 4 domain-split type files
    utils/
      output/                 # output.ts + outputBuilders.ts + createJsonOutput.ts
      argParser.ts            # Unified argument parser
      command.ts              # executeCommand dispatcher with alias resolution
      commandRegistry.ts      # Central command-to-handler map
      commandStorage.ts       # SSR-safe localStorage wrapper
      date.ts                 # Date utilities
      designTokens.ts         # Centralized design tokens (DT)
      id.ts                   # Short ID generator
```

---

## Adding a Command

I designed the codebase so adding a command takes minimal effort. Copy `src/commands/_template-command.ts` — it documents four implementation patterns:

| Pattern              | Use case              | Examples |
| -------------------- | --------------------- | -------- |
| **Synchronous**      | Single-action, no I/O | `color`, `echo`, `cowsay`, `uuid` |
| **Asynchronous**     | API call via service  | `github`, `weather`, `ip`, `joke` |
| **Subcommand-based** | CRUD with storage     | `note`, `todo`, `snippet` |
| **React component**  | Live widget           | `timer`, `date`, `time` |

**Checklist:**

1. Copy `_template-command.ts` to `src/commands/mycommand-command.ts`
2. Write your handler using `parseArgs`, `createHtmlOutput`, `createErrorOutput`
3. Register it in `src/utils/commandRegistry.ts` — one line
4. Add it to `commands[]` in `src/constants/commands.ts` (alphabetical)
5. Add tab completions in `COMPLETIONS` if applicable
6. Write a `--help` entry in `src/constants/help/`
7. (Optional) Write a `man` page entry in `src/commands/man/pages/`

No switch statements. No global imports to hunt down.

---

## Design Decisions (and Regrets)

A few things worth knowing before digging into the source.

**What's intentional:**

HTML output blocks use inline template literals rather than JSX components. This is deliberate — commands need to be composable and serializable to localStorage. JSX would require full React rendering for what are essentially static string templates. DOMPurify handles sanitization at render time.

`aria-atomic="false"` on the history log region is intentional. Setting it to `true` would cause screen readers to re-read the entire history on every new command. That would be unusable.

Alias resolution is single-level by design. Multi-level expansion could loop indefinitely.

The `VisuallyHidden` component exposes itself in development mode (hold `Alt`) — useful for debugging accessibility markup without toggling a screen reader.

**Trade-offs I live with:**

The `gameState` in `quiz-game-command.ts` is module-level mutable state. Pragmatic choice for a game that persists across multiple command invocations within the same session without re-reading localStorage on every call. A reducer would be cleaner. A future refactor should fix this.

`SanitizedHtmlLine` uses `dangerouslySetInnerHTML`. Unavoidable given the HTML-string output model. This is the entire reason DOMPurify is in the dependency tree.

---

## Contributing

Found a bug? Have a command idea? Want to improve the design system? Contributions are welcome.

### Before You Start

- Check [open issues](https://github.com/SouleymaneSy7/terminal-portfolio-website/issues) to avoid duplicates.
- For significant changes, open an issue first to discuss direction.

### Workflow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/terminal-portfolio-website.git

# 2. Create a feature branch
git checkout -b feat/my-command
# or
git checkout -b fix/issue-description

# 3. Make your changes, run lint
bun lint

# 4. Commit with a clear message
git commit -m "feat(commands): add mycommand with --help support"

# 5. Open a pull request
```

### Guidelines

- New commands must follow the checklist in [Adding a Command](#adding-a-command).
- HTML in command outputs should use plain strings — no helper abstraction layers.
- Decorative elements (icons, separators, bullets) must come from `DT` in `designTokens.ts`.
- localStorage keys must go in `STORAGE_KEYS` in `storageKeys.ts` — no inline strings.
- API calls belong in `src/services/` — command handlers receive data, not HTTP responses.
- Accessibility: decorative spans need `aria-hidden="true"`. Interactive elements need accessible labels.

---

## Author

If something here caught your attention, reach out.

|                 | |
| --------------- | - |
| **GitHub**      | [github.com/SouleymaneSy7](https://github.com/SouleymaneSy7) |
| **LinkedIn**    | [linkedin.com/in/souleymanesy7](https://linkedin.com/in/souleymanesy7) |
| **Email**       | [souleymanesycodes@gmail.com](mailto:souleymanesycodes@gmail.com) |
| **Twitter / X** | [@Souleymanesy43](https://twitter.com/Souleymanesy43) |

---

<p align="center">130+ hours. 46 commands. 31 themes. 15 fonts. Zero shortcuts.<br>Built from Coyah, Guinea-Conakry</p>
