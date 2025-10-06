# Terminal Portfolio Website

![Preview](./preview/preview.png)

> ⚠️ **Note**: This project is currently under active development and construction. Features and documentation may change frequently.

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Current Development Status](#current-development-status)
- [Design & Functionality Inspiration](#design-and-functionality-inspiration)
- [Author](#author)

## Overview

A modern terminal-style portfolio website that offers an immersive command-line experience. Built with Next.js and TypeScript, it provides an interactive way to explore my projects, skills, and background through familiar terminal commands and ASCII-based interfaces.

## Features

- Real terminal emulation with command processing
- Interactive command-line interface with custom prompt
- Responsive design that works on desktop and mobile
- Command history navigation (up/down arrows)
- Tab completion for commands and arguments
- Custom ASCII art and animations
- Multiple built-in commands and utilities
- Real-time API integrations for jokes, quotes, and weather data
- Interactive games and fun features

## Technologies Used

### Core Technologies

- [Next.js 15.2.3](https://nextjs.org/) - React framework for production.
- [React 19](https://react.dev/) - JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [TailwindCSS V4](https://tailwindcss.com/) - Utility-first CSS framework.
- [Bun](https://bun.sh/) - Modern JavaScript runtime and package manager.

### Additional Dependencies

- [DOMPurify](https://github.com/cure53/DOMPurify) - XSS sanitizer for HTML and MathML.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for API requests.
- [ESLint](https://eslint.org/) - Code linting tool.
- [PostCSS](https://postcss.org/) - CSS transformation tool.
- [Prettier](https://prettier.io/) - Code formatting tool.
- [ascii-silhouettify](https://meatfighter.com/ascii-silhouettify/) - Generate custom ASCII art from any image.

### These technologies enable

- **Server-side Rendering & Static Generation:**
  - Optimized page loads and SEO performance.
  - Pre-rendered content for faster initial loads.

- **Type-Safe Development:**
  - Robust code with TypeScript integration.
  - Early error detection and better IDE support.

- **Modern Styling Architecture:**
  - Responsive layouts with TailwindCSS V4.
  - Maintainable and scalable CSS structure.

- **Enhanced Security:**
  - XSS protection with DOMPurify.
  - Sanitized user inputs and content rendering.

- **Development Excellence:**
  - Automated code formatting.
  - Consistent code style enforcement.
  - Comprehensive linting rules.

## Installation

```bash
# Clone the repository
git clone https://github.com/souleymanesy7/terminal-portfolio-website.git

# Navigate to project directory
cd terminal-portfolio-website

# Install dependencies
bun install

# Start the development server
bun dev
```

## Usage

Type `help` in the terminal interface to see available commands. Here are all the available commands:

### Navigation & System Commands

- `clear` - Clear the terminal screen
- `exit` - Exit the terminal (close tab)
- `help` - List all available commands with descriptions
- `hostname` - Display the system hostname
- `neofetch` - Display system and user information in a stylized format
- `theme` - Change the terminal color theme (Coming soon...)
- `welcome` - Display the welcome message and banner

### Information Commands

- `about` - Learn more about me and my background
- `whoami` - Display current user identity
- `date` - Display current date
- `time` - Display current time
- `projects` - Browse my portfolio projects
- `repo` - View this project source code and details
- `email` - Display my email address with a fun message

### Utility Commands

- `weather [city]` - Get current weather information for any city (fetched from API)
  - Example: `weather Paris`

### Fun & Interactive Commands

- `cowsay [message]` - Make a cow say your message with ASCII art
  - Example: `cowsay Hello World!`
- `rps [rock|paper|scissors]` - Play a rock-paper-scissors game against the terminal
  - Example: `rps rock`
- `joke` - Get a random programming joke (fetched from API)
- `quote` - Get an inspiring or funny quote (fetched from API)
- `sudo` - Attempt to gain admin access (just for fun!)

### Keyboard Shortcuts

- `[Tab]` - Autocomplete commands
- `[↑] [↓]` - Navigate the command history
- `[Enter]` - Execute command
- `[CTRL + L]` - Clear the terminal screen

## Current Development Status

- [x] Basic terminal interface
- [x] Core command functionality
- [x] Mobile responsiveness
- [x] Basic animations and transitions
- [x] Custom typing animations and effects
- [x] Advanced features and animations
- [x] Command history navigation
- [x] Command auto-completion
- [x] Complete project showcase
- [x] API integrations (jokes, quotes, weather)
- [x] Interactive games (rock-paper-scissors)
- [x] ASCII art features (cowsay, welcome banner, neofetch)
- [ ] Persistent storage for settings
- [ ] Easter eggs and hidden features
- [ ] Multiple themes support

## Design And Functionality Inspiration

This project draws inspiration from these amazing developers and their work:

- [M4tt72's Terminal](https://term.m4tt72.com/) - Clean terminal design and functionality.
- [Forrest's Portfolio](https://fkcodes.com/) - Creative terminal-based portfolio implementation.

## Author

- [GitHub](https://github.com/SouleymaneSy7) - Check out my Github & projects.
- [Frontend Mentor](https://www.frontendmentor.io/profile/SouleymaneSy7) - See my frontend challenges.
- [Dev Challenges](https://devchallenges.io/profile/534cd213-3165-4c16-bdcf-058e1f468da0) - View my coding solutions.
- [Twitter](https://twitter.com/Souleymanesy43) - Follow me for updates.

Connect with me to discuss web development, collaboration opportunities, or just to say hi!

---

> ⚡️ **Note**: This README will be updated as the project evolves.
