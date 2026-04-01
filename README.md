# Terminal Portfolio Website

## ![Preview](./preview/preview.png)

> A terminal-style portfolio you actually use like a terminal. Type commands, explore projects, switch themes, play a quiz — all from the command line.

**[Live Demo](https://terminal-portfolio-website-xi.vercel.app)** · **[Source Code](https://github.com/SouleymaneSy7/terminal-portfolio-website)**

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

- **Real terminal emulation** — command parsing, history navigation, tab completion
- **Theme switching** — 4 color themes with localStorage persistence
- **Font switching** — 3 monospace fonts switchable at runtime
- **Command history** — navigate with arrow keys, persisted across sessions via localStorage
- **Tab autocomplete** — complete any command with a single keystroke
- **Loading indicators** — 5 variants (braille spinner, ASCII progress bar, dots, typewriter, rotating)
- **Live clock** — real-time date, time and timezone display
- **API integrations** — live weather, programming jokes, inspirational quotes
- **Interactive quiz** — 40-question Frontend quiz with XP system and rank progression
- **ASCII art** — cowsay, neofetch banner, welcome screen, quiz results
- **Accessibility** — ARIA live regions, aria-hidden on decorative ASCII art, focus management
- **Security** — DOMPurify XSS sanitization, strict HTTP security headers
- **Responsive** — works on mobile with a keyboard, optimized for desktop
- **SEO** — full OpenGraph, Twitter Card, sitemap, robots.txt, canonical URL

---

## Commands Reference

Type `help` in the terminal to see the full list. Here's a quick overview:

### Navigation & System

| Command           | Description                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| `clear`           | Clear the terminal screen                                                  |
| `exit`            | Exit the terminal (close tab)                                              |
| `help`            | List all available commands                                                |
| `hostname`        | Display system information                                                 |
| `neofetch`        | Linux-style system summary with live theme and font                        |
| `theme <name>`    | Switch color theme — see [Theme & Font Switching](#theme-font-switching)   |
| `typeface <name>` | Switch terminal font — see [Theme & Font Switching](#theme-font-switching) |
| `welcome`         | Display the welcome banner again                                           |

### Information

| Command          | Description                                       |
| ---------------- | ------------------------------------------------- |
| `about`          | My story, journey and tech stack                  |
| `contact`        | All social networks and contact details           |
| `date`           | Live clock with date, time and timezone           |
| `time`           | Alias for `date`                                  |
| `email`          | Display my email address                          |
| `projects`       | Browse my most notable projects                   |
| `repo`           | This portfolio's source code                      |
| `resume`         | View or download my CV in French or English (PDF) |
| `weather <city>` | Real-time weather for any city                    |
| `whoami`         | Who is behind this terminal?                      |

### Fun & Games

| Command                       | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| `cowsay <message>`            | Make a cow say your message in ASCII                     |
| `game`                        | Start the Frontend Quiz — 40 questions, XP system, ranks |
| `game [1-3]`                  | Submit your answer                                       |
| `game stats`                  | View your performance and current rank                   |
| `game reset`                  | Clear all progress and start fresh                       |
| `game help`                   | Show all game commands                                   |
| `joke`                        | Random programming joke (live API)                       |
| `quote`                       | Inspiring or funny quote (live API)                      |
| `rps <rock\|paper\|scissors>` | Play rock-paper-scissors against the terminal            |
| `sudo`                        | Attempt to gain root access... 😄                        |

### Keyboard Shortcuts

| Shortcut   | Action                           |
| ---------- | -------------------------------- |
| `Tab`      | Autocomplete the current command |
| `↑` / `↓`  | Navigate command history         |
| `Enter`    | Execute command                  |
| `Ctrl + L` | Clear the terminal screen        |

---

## Theme & Font Switching

Preferences are saved to localStorage and restored automatically on every visit.

### Available Themes

```
theme catppuccin    → Catppuccin Macchiato (default) — soothing pastel
theme monokai       → Monokai — the timeless classic
theme tokyo-night   → Tokyo Night — for late-night coding sessions
theme dracula       → Dracula — dark and mysterious
```

### Available Fonts

```
typeface cascadia   → Cascadia Code (default) — crafted by Microsoft, embraced by all
typeface fira       → Fira Code — ligatures that tell a story
typeface jetbrains  → JetBrains Mono — engineered for developers
```

The `neofetch` command always reflects the currently active theme and font.

---

## Design System

All command outputs share a unified visual language defined in `globals.css`.

### CSS Tokens (in `@theme`)

```css
/* Spacing — controls every command output */
--spacing-t-outer: 0.25rem; /* py on each output block     */
--spacing-t-section: 0.75rem; /* gap between major sections  */
--spacing-t-group: 0.25rem; /* gap between lines in groups */
--spacing-t-footer: 0.125rem; /* gap between hint lines      */

/* Opacity — separator lines only */
--opacity-sep: 0.3; /* ──── decorative separators  */
```

Edit a token once → it applies across every command output automatically.

### Color Roles

| Class                       | Role                               |
| --------------------------- | ---------------------------------- |
| `text-primary-clr`          | ASCII art, strong accent, headings |
| `text-secondary-clr`        | Keys, labels, warnings             |
| `text-tertiary-clr`         | Commands, bullets, success states  |
| `text-text-clr`             | Body text                          |
| `text-text-clr opacity-sep` | Separator lines `────` only        |

### Accessibility

- All ASCII art blocks carry `aria-hidden="true"` — screen readers skip decorative characters
- All decorative separators (`────`), bullets (`•`), arrows (`→`) and quote marks carry `aria-hidden="true"`
- Terminal output area uses `role="log"` with `aria-live="polite"`
- All links include `rel="noopener noreferrer"` and proper `target="_blank"`
- `:focus-visible` styles on all interactive elements

---

## Technologies Used

### Core

- [Next.js 16](https://nextjs.org/) — React framework, SSR, routing
- [React 19](https://react.dev/) — UI library
- [TypeScript 5](https://www.typescriptlang.org/) — type safety throughout
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling with CSS custom properties
- [Bun](https://bun.sh/) — runtime and package manager

### UI & Animation

- [Framer Motion](https://www.framer.com/motion/) — terminal entry animations, staggered output, loading states

### Security

- [DOMPurify](https://github.com/cure53/DOMPurify) — XSS sanitization on all HTML command outputs
- Strict HTTP headers — `X-Frame-Options`, `HSTS`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`

### Data & APIs

- [Axios](https://axios-http.com/) — HTTP client for weather, jokes, quotes APIs
- [date-fns](https://date-fns.org/) — date formatting for the live clock

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
│   ├── globals.css          # Design tokens, theme overrides, font switching
│   ├── layout.tsx           # Root layout, font loading, SEO metadata
│   ├── page.tsx             # Home page
│   └── not-found.tsx        # 404 page
├── commands/
│   ├── about-command.ts
│   ├── contact-command.ts
│   ├── fun-command.ts       # exit, rps
│   ├── projects-command.ts  # projects, repo
│   ├── quiz-game-command.ts # 40-question frontend quiz
│   ├── resume-command.ts
│   ├── system-command.ts    # welcome, neofetch, hostname, whoami, sudo
│   ├── theme-command.ts     # theme & typeface switching + persistence
│   ├── weather-command.ts
│   └── index.ts
├── components/
│   ├── Terminal.tsx          # Main terminal shell, history, localStorage
│   ├── CommandInput.tsx      # Input field, tab completion, keyboard shortcuts
│   ├── CommandOutput.tsx     # Renders text / html / component / link blocks
│   ├── TerminalPrompt.tsx    # The guest@portfolio:~$ prompt
│   ├── LiveClock.tsx         # Real-time clock with box-drawing characters
│   ├── MobileBanner.tsx      # Mobile experience notice
│   └── ui/
│       └── loaders/          # 5 loading indicator variants
├── constants/
│   └── index.ts             # Command list, help output, date/time outputs
├── hooks/
│   └── useLocalStorage.ts   # SSR-safe localStorage hook with hydration guard
├── services/
│   ├── joke.service.ts
│   ├── quote.service.ts
│   └── weather.service.ts
├── types/
│   └── index.ts
└── utils/
    ├── command.ts           # executeCommand() — central command router
    └── date.ts              # Timezone and greeting helpers
```

---

## Development Status

- [x] Terminal interface with full command processing
- [x] Command history — navigation and localStorage persistence
- [x] Tab autocomplete
- [x] Theme switching — 4 themes with persistence
- [x] Font switching — 3 fonts with persistence
- [x] Design system — shared CSS tokens and consistent command output structure
- [x] Accessibility — ARIA roles, aria-hidden on ASCII art, focus management
- [x] API integrations — weather, jokes, quotes
- [x] Interactive Frontend Quiz — 40 questions, XP, ranks, session stats
- [x] ASCII art features — cowsay, welcome banner, neofetch
- [x] Resume download — French and English PDF
- [x] Security headers and XSS sanitization
- [x] Full SEO — OpenGraph, Twitter Card, sitemap, robots.txt
- [x] Mobile banner with responsive experience
- [ ] Easter eggs and hidden features

---

## Inspiration

This project draws inspiration from these developers and their work:

- [M4tt72's Terminal](https://term.m4tt72.com/) — clean terminal design and command architecture
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
