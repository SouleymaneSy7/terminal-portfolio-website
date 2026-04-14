# Terminal Portfolio Website

## ![Preview](./preview/preview.png)

> A terminal-style portfolio you actually use like a terminal. Type commands, explore projects, switch themes, play a quiz — all from the command line.

**[Live Demo](https://terminal-portfolio-website-xi.vercel.app)** · **[Source Code](https://github.com/SouleymaneSy7/terminal-portfolio-website)**

Total time spent on this project: [![wakatime](https://wakatime.com/badge/user/018cb534-87bb-4814-975b-ca5e3cb8572b/project/86de76f6-9a37-458f-b8dd-2975978d2205.svg)](https://wakatime.com/badge/user/018cb534-87bb-4814-975b-ca5e3cb8572b/project/86de76f6-9a37-458f-b8dd-2975978d2205)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Commands Reference](#commands-reference)
- [Theme & Font Switching](#theme--font-switching)
- [Design System](#design-system)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Development Status](#development-status)
- [Inspiration](#inspiration)
- [Author](#author)

---

## Overview

This is a fully interactive browser-based terminal built as a portfolio. Visitors navigate the experience entirely through typed commands — no buttons, no menus, just a keyboard and a prompt.

Built from the ground up with Next.js 16, React 19, TypeScript and Tailwind CSS v4, with a focus on performance, accessibility and design consistency.

---

## Features

- **Real terminal emulation** — command parsing, history navigation (↑↓), tab completion.
- **31 color themes** — all OKLCH-based with localStorage persistence.
- **4 monospace fonts** — all loaded via `next/font/local` for zero-CLS font switching.
- **Smart suggestions panel** — live completion panel with keyboard navigation as you type.
- **Tab autocomplete** — completes commands and arguments (theme names, font names, game subcommands, rps choices).
- **Command history** — navigate with arrow keys, persisted across sessions via localStorage.
- **Loading indicators** — 5 animated variants (braille spinner, ASCII progress bar, dots accumulator, typewriter cursor, rotating spinner).
- **Live clock** — real-time date, time and timezone display with box-drawing characters.
- **API integrations** — live weather (wttr.in), programming jokes (JokeAPI), inspirational quotes (Advice Slip API), currency rates (Frankfurter/ECB).
- **Interactive quiz** — 40-question Frontend quiz with XP system, accuracy tracking and rank progression.
- **Persistent utilities** — in-terminal note manager, todo list, and code snippet vault — all backed by localStorage.
- **UUID generator** — v1 (time-based) and v4 (random) with validation.
- **Currency converter** — real-time rates for 31 currencies via the European Central Bank.
- **Age calculator** — exact age from any birth date with next-birthday countdown.
- **curl simulator** — browser-based HTTP client with verbose mode, headers, POST data and Basic Auth.
- **ASCII art** — cowsay, neofetch banner, welcome screen, quiz results.
- **Accessibility** — ARIA live regions, `aria-hidden` on decorative ASCII art, full focus management.
- **Security** — DOMPurify XSS sanitization on all HTML output, strict HTTP security headers.
- **Responsive** — works on mobile with a keyboard, optimized for desktop.
- **SEO** — full OpenGraph, Twitter Card, sitemap, robots.txt, canonical URL.

---

## Commands Reference

Type `help` in the terminal to see the full list. Here's a quick overview:

### Navigation & System

| Command        | Description                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| `clear`        | Clear the terminal screen                                                   |
| `exit`         | Display goodbye message (close the browser tab to actually exit)            |
| `help`         | List all available commands                                                 |
| `hostname`     | Display system hostname and portfolio information                           |
| `neofetch`     | Linux-style system summary with live theme and font                         |
| `theme <n>`    | Switch color theme — see [Theme & Font Switching](#theme--font-switching)   |
| `typeface <n>` | Switch terminal font — see [Theme & Font Switching](#theme--font-switching) |
| `welcome`      | Display the welcome banner again                                            |

### Information

| Command          | Description                                       |
| ---------------- | ------------------------------------------------- |
| `about`          | My story, journey and tech stack                  |
| `contact`        | All social networks and contact details           |
| `date`           | Live clock with date, time and timezone           |
| `time`           | Alias for `date`                                  |
| `email`          | Display my email address with mailto link         |
| `projects`       | Browse my most notable projects                   |
| `repo`           | This portfolio's source code on GitHub            |
| `resume`         | View or download my CV in French or English (PDF) |
| `weather <city>` | Real-time weather for any city via wttr.in        |
| `whoami`         | Who is behind this terminal?                      |

### Utilities

| Command                            | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| `age <date>`                       | Calculate exact age from a birthdate with next-birthday info |
| `convert <amount> <from> <to>`     | Real-time currency conversion via European Central Bank      |
| `convert list`                     | List all 31 supported currencies                             |
| `curl [options] <url>`             | Browser HTTP client — GET, POST, HEAD, verbose mode, auth    |
| `note`                             | List all saved notes                                         |
| `note add <text>`                  | Add a note (spaces allowed)                                  |
| `note rm <id>`                     | Delete a note by its short ID                                |
| `note edit <id> <text>`            | Update a note                                                |
| `note clear`                       | Delete all notes                                             |
| `snippet`                          | List all saved code snippets                                 |
| `snippet add <name> <lang> <code>` | Save a code snippet                                          |
| `snippet show <id>`                | Display snippet code                                         |
| `snippet rm <id>`                  | Delete a snippet                                             |
| `todo`                             | List all tasks (pending and done)                            |
| `todo add <text>`                  | Add a new task                                               |
| `todo done <id>`                   | Mark a task as completed                                     |
| `todo undone <id>`                 | Mark a task as pending                                       |
| `todo rm <id>`                     | Delete a task                                                |
| `uuid`                             | Generate one v4 UUID                                         |
| `uuid v1 [n]`                      | Generate n time-based v1 UUIDs (max 20)                      |
| `uuid v4 [n]`                      | Generate n random v4 UUIDs (max 20)                          |
| `uuid validate <string>`           | Validate a UUID string                                       |

### Fun & Games

| Command                       | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| `cowsay <message>`            | Make a cow say your message in ASCII                     |
| `game`                        | Start the Frontend Quiz — 40 questions, XP system, ranks |
| `game [1-3]`                  | Submit your answer                                       |
| `game stats`                  | View your performance and current rank                   |
| `game reset`                  | Clear all progress and start fresh                       |
| `game help`                   | Show all game commands                                   |
| `joke`                        | Random programming joke (JokeAPI)                        |
| `quote`                       | Random advice quote (Advice Slip API)                    |
| `rps <rock\|paper\|scissors>` | Play rock-paper-scissors against the terminal            |
| `sudo`                        | Attempt to gain root access... 😄                        |

> **Tip:** every command accepts `--help` for detailed usage — e.g. `weather --help`

### Keyboard Shortcuts

| Shortcut   | Action                                      |
| ---------- | ------------------------------------------- |
| `Tab`      | Autocomplete command or argument            |
| `↑` / `↓`  | Navigate history (or suggestions when open) |
| `Esc`      | Dismiss suggestions panel, keep focus       |
| `Enter`    | Execute command                             |
| `Ctrl + L` | Clear the terminal screen                   |

---

## Theme & Font Switching

Preferences are saved to localStorage and restored automatically on every visit. The `neofetch` command always reflects the currently active theme and font.

### Available Themes (31)

```
── Catppuccin ────────────────────────────────────────────────
theme catppuccin                → Catppuccin Macchiato (default)
theme catppuccin-latte          → Catppuccin Latte — warm light theme
theme catppuccin-frappe         → Catppuccin Frappé — medium depth
theme catppuccin-mocha          → Catppuccin Mocha — darkest variant

── Popular Dark ──────────────────────────────────────────────
theme monokai                   → Monokai
theme tokyo-night               → Tokyo Night
theme dracula                   → Dracula
theme nord                      → Nord
theme gruvbox                   → Gruvbox Dark
theme everforest                → Everforest Dark
theme rose-pine                 → Rosé Pine

── Editor Classics ───────────────────────────────────────────
theme solarized-dark            → Solarized Dark
theme oceanic                   → Oceanic Next
theme cobalt2                   → Cobalt2
theme github                    → GitHub Dark
theme one-dark                  → One Dark
theme atom-one-dark             → Atom One Dark

── Material ──────────────────────────────────────────────────
theme material-default          → Material Default — teal on blue-grey
theme material-lighter          → Material Lighter — light variant
theme material-oceanic          → Material Oceanic — ocean-blue accent
theme material-palenight        → Material Palenight — deep purple, neon accents
theme material-deep-ocean       → Material Deep Ocean — near-black, electric blue
theme material-high-contrast    → Material High Contrast — pure black, max contrast

── Others ────────────────────────────────────────────────────
theme ayu-dark                  → Ayu Dark — warm amber on near-black
theme night-owl                 → Night Owl — cyan primary, yellow highlights
theme synthwave                 → Synthwave '84 — neon pink and cyan retro-futurism
theme kanagawa                  → Kanagawa — samurai red and ocean blue
theme horizon                   → Horizon — coral and pink on dark indigo
theme poimandres                → Poimandres — teal and purple on near-black
theme vesper                    → Vesper — pure black, amber gold — ultra minimal
theme hack-the-box              → Hack The Box — matrix green on deep navy
```

### Available Fonts (4)

All fonts are bundled locally via `next/font/local` — no external font requests, no layout shift, zero FOUT.

```
typeface cascadia          → Cascadia Code (default) — Microsoft's gift to devs
typeface fira              → Fira Code — stunning ligatures
typeface geist             → Geist Mono — sharp, elegant, minimal
typeface recursive-casual  → Recursive Casual Mono — hand-drawn expressiveness
```

### Tab Completion

The `Tab` key completes both commands and their arguments:

```bash
# Command completion
th[Tab]             → theme (unique match, completes immediately)
t[Tab]              → cycles: theme → time → typeface → todo → ...

# Argument completion
theme cat[Tab]      → catppuccin (unique match)
theme [Tab]         → cycles through all 31 theme names
typeface [Tab]      → cycles through all 4 font names
rps [Tab]           → rock → paper → scissors
game [Tab]          → stats → reset → help → --help
note [Tab]          → add → rm → edit → clear → list → help
todo [Tab]          → add → done → undone → rm → clear → list → help
snippet [Tab]       → add → show → rm → clear → list → help
uuid [Tab]          → v1 → v4 → validate → help
convert [Tab]       → list → help
curl [Tab]          → --help → -v → -I → -s → -X → -H → -d → -u → -L
```

### Suggestions Panel

As you type, a panel appears listing all matching completions:

```
guest@souleymane-sy-portfolio:~$ theme cat_

Suggestions ─── 4 matches
  catppuccin        catppuccin-latte
  catppuccin-frappe catppuccin-mocha

[Tab] cycle  ·  [↑↓] navigate  ·  [Esc] dismiss
```

Navigate with `↑↓` or `Tab` to cycle. `Esc` dismisses and restores your original input.

For `theme` and `typeface`, suggestions are **grouped by category** — exactly mirroring the `theme` command's own output. The description of the currently highlighted item appears in the header.

```
guest@souleymane-sy-portfolio:~$ theme material_

Suggestions ─── 6 matches  ·  The original — teal green on deep blue-grey.
Material
▶ material-default        material-lighter
  material-oceanic        material-palenight
  material-deep-ocean     material-high-contrast

[Tab] cycle  ·  [↑↓] navigate  ·  [Esc] dismiss
```

### Theme Previews

<details>
<summary><strong>Catppuccin Macchiato</strong> — default</summary>
<br>

![Catppuccin Macchiato](./preview/themes/theme-catppuccin.png)

Soothing pastel palette with a deep blue-purple background. Easy on the eyes during long sessions.

</details>

<details>
<summary><strong>Catppuccin Latte</strong> — light</summary>
<br>

![Catppuccin Latte](./preview/themes/theme-catppuccin-latte.png)

The only light theme in the collection. Warm cream background with Catppuccin accent palette.

</details>

<details>
<summary><strong>Catppuccin Frappé</strong></summary>
<br>

![Catppuccin Frappé](./preview/themes/theme-catppuccin-frappe.png)

Mid-depth dark with soft contrast. Between Macchiato and Mocha.

</details>

<details>
<summary><strong>Catppuccin Mocha</strong></summary>
<br>

![Catppuccin Mocha](./preview/themes/theme-catppuccin-mocha.png)

The darkest sip of the Catppuccin collection. Deep background with rich pastel accents.

</details>

<details>
<summary><strong>Monokai</strong></summary>
<br>

![Monokai](./preview/themes/theme-monokai.png)

The timeless classic. Warm dark background with vibrant yellow, orange and green.

</details>

<details>
<summary><strong>Tokyo Night</strong></summary>
<br>

![Tokyo Night](./preview/themes/theme-tokyo-night.png)

Deep blue-black with soft blue and red accents. Made for late-night coding sessions.

</details>

<details>
<summary><strong>Dracula</strong></summary>
<br>

![Dracula](./preview/themes/theme-dracula.png)

Dark and mysterious. Purple, pink and mint on near-black. One of the most iconic dark themes.

</details>

<details>
<summary><strong>Nord</strong></summary>
<br>

![Nord](./preview/themes/theme-nord.png)

Icy Arctic blue palette. Cool, restrained and incredibly readable.

</details>

<details>
<summary><strong>Gruvbox Dark</strong></summary>
<br>

![Gruvbox Dark](./preview/themes/theme-gruvbox.png)

Warm earthy tones on near-black. Feels like an old CRT monitor — in the best way.

</details>

<details>
<summary><strong>Everforest Dark</strong></summary>
<br>

![Everforest Dark](./preview/themes/theme-everforest.png)

Deep forest greens with warm beige text. Calm and natural.

</details>

<details>
<summary><strong>Rosé Pine</strong></summary>
<br>

![Rosé Pine](./preview/themes/theme-rose-pine.png)

Soft and dreamy. Deep purple with rose and sky accents.

</details>

<details>
<summary><strong>Solarized Dark</strong></summary>
<br>

![Solarized Dark](./preview/themes/theme-solarized-dark.png)

Ethan Schoonover's precision palette. Scientific color relationships, unmatched readability.

</details>

<details>
<summary><strong>Oceanic Next</strong></summary>
<br>

![Oceanic Next](./preview/themes/theme-oceanic.png)

Deep ocean blues with vibrant teal and red accents.

</details>

<details>
<summary><strong>Cobalt2</strong></summary>
<br>

![Cobalt2](./preview/themes/theme-cobalt2.png)

Wes Bos's high-contrast cobalt blue. Bold, vivid, immediately recognizable.

</details>

<details>
<summary><strong>GitHub Dark</strong></summary>
<br>

![GitHub Dark](./preview/themes/theme-github.png)

The dark theme you already know from GitHub. Familiar and clean.

</details>

<details>
<summary><strong>One Dark</strong></summary>
<br>

![One Dark](./preview/themes/theme-one-dark.png)

Atom's iconic dark UI. Muted blue primary with warm accents.

</details>

<details>
<summary><strong>Atom One Dark</strong></summary>
<br>

![Atom One Dark](./preview/themes/theme-atom-one-dark.png)

Same base as One Dark, purple primary with cyan tertiary.

</details>

<details>
<summary><strong>Material Default</strong></summary>
<br>

![Material Default](./preview/themes/theme-material-default.png)

The original Material theme. Teal-green accents on a classic blue-grey dark background.

</details>

<details>
<summary><strong>Material Lighter</strong></summary>
<br>

![Material Lighter](./preview/themes/theme-material-lighter.png)

The light variant of the Material family. Clean white background with vibrant accents.

</details>

<details>
<summary><strong>Material Oceanic</strong></summary>
<br>

![Material Oceanic](./preview/themes/theme-material-oceanic.png)

Same classic Material base, ocean-blue accent variant. Calm and deeply readable.

</details>

<details>
<summary><strong>Material Palenight</strong></summary>
<br>

![Material Palenight](./preview/themes/theme-material-palenight.png)

Deep purple background with vivid pink and green neon accents. Instantly recognizable.

</details>

<details>
<summary><strong>Material Deep Ocean</strong></summary>
<br>

![Material Deep Ocean](./preview/themes/theme-material-deep-ocean.png)

Near-black background with electric blue and violet accents. The darkest of the Material family.

</details>

<details>
<summary><strong>Material High Contrast</strong></summary>
<br>

![Material High Contrast](./preview/themes/theme-material-high-contrast.png)

Pure black background, maximum contrast. Nothing distracts — only the code matters.

</details>

<details>
<summary><strong>Ayu Dark</strong></summary>
<br>

![Ayu Dark](./preview/themes/theme-ayu-dark.png)

Warm amber and orange on a near-black background. Minimal and sharp.

</details>

<details>
<summary><strong>Night Owl</strong></summary>
<br>

![Night Owl](./preview/themes/theme-night-owl.png)

Designed for low-light conditions — cyan primary with warm yellow highlights.

</details>

<details>
<summary><strong>Synthwave '84</strong></summary>
<br>

![Synthwave '84](./preview/themes/theme-synthwave.png)

Neon pink and electric cyan on deep purple. Pure 80s retro-futurism.

</details>

<details>
<summary><strong>Kanagawa</strong></summary>
<br>

![Kanagawa](./preview/themes/theme-kanagawa.png)

Inspired by Hokusai's Great Wave. Samurai red primary, ocean blue secondary.

</details>

<details>
<summary><strong>Horizon</strong></summary>
<br>

![Horizon](./preview/themes/theme-horizon.png)

Warm coral and pink on dark indigo. Sunset colors, very aesthetic.

</details>

<details>
<summary><strong>Poimandres</strong></summary>
<br>

![Poimandres](./preview/themes/theme-poimandres.png)

Teal and purple on near-black. Calm, focused and distinctly modern.

</details>

<details>
<summary><strong>Vesper</strong></summary>
<br>

![Vesper](./preview/themes/theme-vesper.png)

Pure black background with amber gold accents. Ultra minimal and elegant.

</details>

<details>
<summary><strong>Hack The Box</strong></summary>
<br>

![Hack The Box](./preview/themes/theme-hack-the-box.png)

Matrix green on deep navy. For the hacker in you.

</details>

---

## Design System

All visual output across every command is driven by a single source of truth in `src/app/globals.css`. Changing a token once propagates to every command output automatically.

### CSS Tokens (in `@theme`)

#### Colors

```css
/* Six semantic roles — overridden per theme via html[data-theme] */
--color-background-clr: oklch(...); /* Page background                  */
--color-foreground-clr: oklch(...); /* Terminal panel surface            */
--color-text-clr: oklch(...); /* All body text                     */
--color-primary-clr: oklch(...); /* ASCII art, strong accent, borders */
--color-secondary-clr: oklch(...); /* Keys, labels, warnings ⚠          */
--color-tertiary-clr: oklch(...); /* Commands, bullets •, success ✓    */
```

All 31 theme overrides use `html[data-theme="<name>"]` attribute selectors at specificity (0,1,1), which beats `:root` (0,1,0) with no `!important` needed. Font switching follows the same pattern at (0,1,2) via `html[data-font="<name>"] body`.

#### Typography

```css
--font-weight-regular: 400;
--font-weight-bold: 700;

--text-fs-body: clamp(0.9375rem, 0.9196rem + 0.0893vw, 1rem); /* 15px → 16px */
--text-fs-subtitle: clamp(
  1.125rem,
  1.0893rem + 0.1786vw,
  1.25rem
); /* 18px → 20px */
--text-fs-title: clamp(1.25rem, 1.1786rem + 0.3571vw, 1.5rem); /* 20px → 24px */
--leading-base: 1.5;
```

#### Spacing

```css
--spacing-t-outer: 0.25rem; /* py  — outer padding on each output block  */
--spacing-t-section: 0.75rem; /* space-y — between major sections           */
--spacing-t-group: 0.25rem; /* space-y — between lines within a group     */
--spacing-t-footer: 0.125rem; /* space-y — between hint and footer lines    */
```

#### Opacity

```css
--opacity-sep: 0.3; /* separator lines only — nothing else uses opacity */
```

### Color Roles

| Token                              | Tailwind class              | Role                                                     |
| ---------------------------------- | --------------------------- | -------------------------------------------------------- |
| `--color-primary-clr`              | `text-primary-clr`          | ASCII art, neofetch heading, strong accent, border color |
| `--color-secondary-clr`            | `text-secondary-clr`        | Key labels, section headers, warning `⚠` icon            |
| `--color-tertiary-clr`             | `text-tertiary-clr`         | Command names in hints, bullet points `•`, success `✓`   |
| `--color-text-clr`                 | `text-text-clr`             | All regular body text                                    |
| `--color-text-clr` + `opacity-sep` | `text-text-clr opacity-sep` | Separator lines `────` — and nothing else                |
| `--color-foreground-clr`           | `bg-foreground-clr`         | Terminal panel surface                                   |
| `--color-background-clr`           | `bg-background-clr`         | Page background                                          |

### Spacing Classes

| Tailwind class      | Token                 | Applied on                           |
| ------------------- | --------------------- | ------------------------------------ |
| `py-t-outer`        | `--spacing-t-outer`   | Root `<div>` of every command output |
| `space-y-t-section` | `--spacing-t-section` | Between major content sections       |
| `space-y-t-group`   | `--spacing-t-group`   | Between lines within a related group |
| `space-y-t-footer`  | `--spacing-t-footer`  | Between hint and footer lines        |

### Command Output Convention

Every command output is a `type: "html"` block wrapping a consistent root structure:

```html
<div class="space-y-t-section py-t-outer">
  <!-- Major section -->
  <div class="space-y-t-group">
    <p class="text-secondary-clr font-bold">Section Title</p>
    <p class="text-text-clr opacity-sep" aria-hidden="true">
      ────────────────────────────────────────
    </p>
    <p>
      Body text using <span class="text-tertiary-clr">accent</span> where
      relevant.
    </p>
  </div>

  <!-- Hint / footer -->
  <div class="space-y-t-footer">
    <p class="text-text-clr opacity-sep" aria-hidden="true">
      ────────────────────────────────────────
    </p>
    <p>
      Type '<span class="text-tertiary-clr font-bold">next-command</span>' to
      continue.
    </p>
  </div>
</div>
```

This structure is applied directly in each command file as plain HTML strings — no helper abstraction — so every command is self-contained and readable without indirection.

### Accessibility Practices

- All ASCII art blocks carry `aria-hidden="true"` — screen readers skip decorative characters
- All decorative separators `────`, bullets `•`, arrows `→` and quote marks `'` carry `aria-hidden="true"`
- Terminal output uses `role="log"` with `aria-live="polite"`, `aria-relevant="additions"` and `aria-atomic="false"`
- The terminal wrapper uses `role="application"` with a descriptive `aria-label`
- Suggestions panel uses `role="listbox"` / `role="option"` / `aria-activedescendant`
- All external links include `rel="noopener noreferrer"` and `target="_blank"` (enforced via DOMPurify hook)
- `:focus-visible` styles on all interactive elements
- Full `prefers-reduced-motion` support — all CSS transitions and Framer Motion animations disabled

---

## Technologies Used

### Core

- [Next.js 16](https://nextjs.org/) — React framework, SSR, routing, `next/font/local` for zero-CLS font loading
- [React 19](https://react.dev/) — UI library
- [TypeScript 6](https://www.typescriptlang.org/) — strict type safety throughout
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling driven entirely by CSS custom properties in `@theme`
- [Bun](https://bun.sh/) — runtime and package manager

### UI & Animation

- [Framer Motion 12](https://www.framer.com/motion/) — terminal entry animations, staggered output, loading states, AnimatePresence

### Fonts

- [Cascadia Code](https://github.com/microsoft/cascadia-code) — default, loaded via `next/font/local`
- [Fira Code](https://github.com/tonsky/FiraCode) — loaded via `next/font/local`
- [Geist Mono](https://vercel.com/font) — loaded via the `geist` npm package
- [Recursive Casual Mono](https://www.recursive.design/) — loaded via `next/font/local`

### Security

- [DOMPurify](https://github.com/cure53/DOMPurify) — XSS sanitization on all HTML command outputs; custom hook enforces `target="_blank"` and `rel="noopener noreferrer"` on every link post-sanitization
- Strict HTTP headers — `X-Frame-Options: DENY`, `HSTS`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-XSS-Protection`

### Data & APIs

| Library / API                                  | Used for                                                                   |
| ---------------------------------------------- | -------------------------------------------------------------------------- |
| [Axios](https://axios-http.com/)               | HTTP client for all API calls                                              |
| [date-fns](https://date-fns.org/)              | Date parsing, formatting and arithmetic for the age command and live clock |
| [uuid](https://github.com/uuidjs/uuid)         | v1 and v4 UUID generation and validation                                   |
| [wttr.in](https://wttr.in/)                    | Real-time weather data                                                     |
| [JokeAPI v2](https://v2.jokeapi.dev/)          | Programming jokes                                                          |
| [Advice Slip API](https://api.adviceslip.com/) | Inspirational quotes                                                       |
| [Frankfurter / ECB](https://frankfurter.dev/)  | Real-time currency exchange rates — no API key required                    |

---

## Installation

```bash
# Clone the repository
git clone https://github.com/SouleymaneSy7/terminal-portfolio-website.git

# Navigate to project directory
cd terminal-portfolio-website

# Install dependencies
bun install

# Start the development server
bun dev
```

---

## Project Structure

```
src/
├── app/
│   ├── globals.css           # Design tokens, 31 theme overrides, 4 font rules, animations
│   ├── layout.tsx            # Root layout, localFont loading (all 4 fonts), full SEO metadata
│   ├── page.tsx              # Home page — terminal container with mobile banner
│   └── not-found.tsx         # 404 page with ASCII art and theme init
│
├── commands/                 # One file per command — pure functions, HTML string output
│   ├── about-command.ts
│   ├── age-command.ts        # Date parsing (5 formats) + exact age + birthday countdown
│   ├── contact-command.ts
│   ├── convert-command.ts    # Currency conversion via Frankfurter/ECB
│   ├── curl-command.ts       # Full argument parser + HTTP request + formatted output
│   ├── fun-command.ts        # exit, rps, rps help
│   ├── note-command.ts       # CRUD notes — localStorage via commandStorage
│   ├── projects-command.ts   # projects, repo
│   ├── quiz-game-command.ts  # 40-question quiz, XP, ranks, localStorage persistence
│   ├── resume-command.ts
│   ├── snippet-command.ts    # CRUD code snippets — localStorage
│   ├── system-command.ts     # welcome, neofetch, hostname, whoami, sudo
│   ├── theme-command.ts      # THEMES + FONTS objects, apply/init/list/switch, all labels
│   ├── todo-command.ts       # CRUD todos with done/undone — localStorage
│   ├── uuid-command.ts       # v1/v4 generation (max 20) and validation
│   ├── weather-command.ts    # Output formatters (success, error, usage)
│   └── index.ts              # Re-exports all commands
│
├── components/
│   ├── Terminal.tsx           # Main shell — history, localStorage, loading state machine
│   ├── CommandInput.tsx       # Input, Tab completion, grouped suggestions panel
│   ├── CommandOutput.tsx      # Renders text / html / component / link output blocks
│   ├── TerminalPrompt.tsx     # guest@souleymane-sy-portfolio:~$ prompt
│   ├── LiveClock.tsx          # Real-time clock with box-drawing frame characters
│   ├── MobileBanner.tsx       # Mobile experience notice with dismiss
│   ├── Custom404.tsx          # Animated 404 page component with theme init
│   └── ui/
│       └── loaders/
│           ├── ascii-progress-bar.tsx   # Bouncing ASCII progress bar
│           ├── braille-spinner.tsx      # Braille character spinner (default)
│           ├── dots-accumulator.tsx     # Accumulating dots animation
│           ├── loading-indicator.tsx    # Variant selector component
│           ├── rotating-spinner.tsx     # Classic / | \ — spinner
│           ├── typewritter-cursor.tsx   # Typewriter effect with erase cycle
│           └── index.ts
│
├── constants/
│   └── index.ts              # commands[], COMPLETIONS map, all --help blocks, ASCII art,
│                             #   createHtmlOutput(), getHelpCommandOutput(), date/time outputs
│
├── hooks/
│   └── useLocalStorage.ts    # SSR-safe localStorage hook with hydration guard
│
├── services/
│   ├── convert.service.ts    # Frankfurter API client
│   ├── curl.service.ts       # Axios HTTP wrapper with header normalisation
│   ├── joke.service.ts       # JokeAPI client
│   ├── quote.service.ts      # Advice Slip API client
│   └── weather.service.ts    # wttr.in API client
│
├── types/
│   └── index.ts              # All shared TypeScript interfaces and types
│
└── utils/
    ├── command.ts            # executeCommand() — central command router (switch/case)
    ├── commandStorage.ts     # Thin localStorage wrapper (get/set/remove) with SSR guard
    └── date.ts               # getTimezone(), getGreeting()
```

---

## Development Status

### Core Terminal

- [x] Terminal interface with full command processing
- [x] Command history — navigation (↑↓) and localStorage persistence (max 50 entries)
- [x] Tab autocomplete — commands and arguments (themes, fonts, game, rps, note, todo, snippet, uuid, convert, curl)
- [x] Smart suggestions panel — grouped display for theme/typeface, keyboard navigation, cycling, Esc dismiss with input restoration
- [x] Command safety timer — 10s fallback to restore input if a command hangs

### Theming & Fonts

- [x] Theme switching — 31 OKLCH themes with localStorage persistence
- [x] Font switching — 4 fonts via `next/font/local` with persistence
- [x] Design system — unified CSS tokens in `globals.css`, consistent command output structure
- [x] Grouped suggestions for theme/typeface with live description in panel header

### Information Commands

- [x] `about` — personal story and tech stack
- [x] `contact` — all social links
- [x] `email` — mailto link
- [x] `projects` — 5 featured projects with live + source links
- [x] `repo` — portfolio source code
- [x] `resume` — EN and FR PDF (view + download)
- [x] `whoami` — short bio
- [x] `hostname` — system info
- [x] `neofetch` — full system overview with live theme/font
- [x] `sudo` — easter egg
- [x] `welcome` — animated ASCII banner

### Utilities

- [x] `age` — exact age calculator with 5 date format parsers and birthday countdown
- [x] `convert` — real-time currency conversion for 31 currencies (ECB/Frankfurter)
- [x] `curl` — browser HTTP client with full flag parser (`-v`, `-I`, `-s`, `-X`, `-H`, `-d`, `-u`, `-L`, `-o`)
- [x] `note` — persistent note CRUD (add / list / edit / rm / clear) with short IDs
- [x] `snippet` — persistent code snippet CRUD (add / show / rm / clear) with short IDs
- [x] `todo` — persistent task list with done/undone states (add / done / undone / rm / clear)
- [x] `uuid` — v1 and v4 UUID generation (batch up to 20) and validation
- [x] `date` / `time` — live clock with box-drawing frame
- [x] `weather` — real-time city weather via wttr.in

### Fun & Games

- [x] `joke` — random programming joke (JokeAPI)
- [x] `quote` — random advice (Advice Slip API)
- [x] `rps` — rock-paper-scissors
- [x] `cowsay` — ASCII cow
- [x] `game` — 40-question Frontend quiz with XP, accuracy tracking, 4 ranks, localStorage persistence

### Loading Indicators

- [x] 5 animated variants — braille spinner, ASCII progress bar, dots accumulator, typewriter cursor, rotating spinner

### Quality

- [x] Accessibility — ARIA roles, `aria-hidden` on ASCII art, focus management, `prefers-reduced-motion`
- [x] API integrations — weather, jokes, quotes, currency conversion
- [x] Security headers and DOMPurify XSS sanitization
- [x] Full SEO — OpenGraph, Twitter Card, sitemap, robots.txt, canonical URL
- [x] Mobile banner with responsive experience
- [x] Custom animated 404 page
- [ ] Easter eggs and hidden features

---

## Inspiration

This project draws inspiration from these developers and their work:

- [M4tt72's Terminal](https://term.fathi.me/) — clean terminal design and command architecture
- [Forrest's Portfolio](https://fkcodes.com/) — creative terminal-based portfolio execution

---

## Author

**Souleymane Sy** — Self-taught frontend developer from Coyah, Guinea-Conakry 🇬🇳

- [GitHub](https://github.com/SouleymaneSy7)
- [LinkedIn](https://linkedin.com/in/souleymanesy7)
- [Frontend Mentor](https://www.frontendmentor.io/profile/SouleymaneSy7)
- [Dev Challenges](https://devchallenges.io/profile/534cd213-3165-4c16-bdcf-058e1f468da0)
- [Twitter / X](https://twitter.com/Souleymanesy43)
- [Email](mailto:souleymanesycodes@gmail.com)

---

> Built with curiosity, persistence, and a deep love for web and the command line.
