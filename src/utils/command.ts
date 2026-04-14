import {
  getAboutMeCommandOutput,
  getContactCommandOutput,
  getEmailCommandOutput,
  getExitCommandOutput,
  handleGameCommand,
  getHostNameCommandOutput,
  getNeofetchCommandOutput,
  getProjectsCommandOutput,
  getRepoCommandOutput,
  getResumeCommandOutput,
  rspCommand,
  getSudoCommandOutput,
  getWelcomeCommandOutput,
  getWhoAmICommandOutput,
  THEMES,
  FONTS,
  getThemeListOutput,
  getThemeSwitchOutput,
  getThemeInvalidOutput,
  getFontListOutput,
  getFontSwitchOutput,
  getFontInvalidOutput,
  curlCommand,
  curlUsageOutput,
  handleNoteCommand,
  handleTodoCommand,
  handleSnippetCommand,
  handleUUIDCommand,
  handleConvertCommand,
  handleAgeCommand,
  createWeatherOutput,
  weatherErrorOutput,
  weatherUsageOutput,
  rpsCommandHelp,
} from "@/commands";
import type { ThemeKey, FontKey } from "@/commands";
import {
  getDateCommandOutput,
  getTimeCommandOutput,
  getHelpCommandOutput,
  ABOUT_HELP,
  CONTACT_HELP,
  COWSAY_HELP,
  DATE_HELP,
  EMAIL_HELP,
  EXIT_HELP,
  HOSTNAME_HELP,
  JOKE_HELP,
  NEOFETCH_HELP,
  PROJECTS_HELP,
  QUOTE_HELP,
  REPO_HELP,
  RESUME_HELP,
  RPS_HELP,
  SUDO_HELP,
  THEME_HELP,
  TYPEFACE_HELP,
  WEATHER_HELP,
  WELCOME_HELP,
  WHOAMI_HELP,
} from "@/constants";

import { jokeService } from "@/services/joke.service";
import { quoteService } from "@/services/quote.service";
import { weatherService } from "@/services/weather.service";

export const executeCommand = async (command: string) => {
  const parts = command.trim().split(" ");
  const cmd = parts[0].toLowerCase();
  const isHelp = parts[1] === "--help";

  switch (cmd) {
    // ── Meta ────────────────────────────────────────────────────
    case "help":
      return getHelpCommandOutput();

    case "clear":
      return [];

    case "welcome":
      if (isHelp) return WELCOME_HELP;
      return getWelcomeCommandOutput();

    // ── Portfolio info ───────────────────────────────────────────
    case "about":
      if (isHelp) return ABOUT_HELP;
      return getAboutMeCommandOutput();

    case "contact":
      if (isHelp) return CONTACT_HELP;
      return getContactCommandOutput();

    case "email":
      if (isHelp) return EMAIL_HELP;
      return getEmailCommandOutput();

    case "projects":
      if (isHelp) return PROJECTS_HELP;
      return getProjectsCommandOutput();

    case "repo":
      if (isHelp) return REPO_HELP;
      return getRepoCommandOutput();

    case "resume":
      if (isHelp) return RESUME_HELP;
      return getResumeCommandOutput();

    // ── System ───────────────────────────────────────────────────
    case "hostname":
      if (isHelp) return HOSTNAME_HELP;
      return getHostNameCommandOutput();

    case "neofetch":
      if (isHelp) return NEOFETCH_HELP;
      return getNeofetchCommandOutput();

    case "whoami":
      if (isHelp) return WHOAMI_HELP;
      return getWhoAmICommandOutput();

    case "sudo":
      if (isHelp) return SUDO_HELP;
      return getSudoCommandOutput();

    case "exit":
      if (isHelp) return EXIT_HELP;
      return getExitCommandOutput();

    // ── Date & Time ──────────────────────────────────────────────
    case "date":
      if (isHelp) return DATE_HELP;
      return getDateCommandOutput();

    case "time":
      if (isHelp) return DATE_HELP;
      return getTimeCommandOutput();

    // ── Theming ──────────────────────────────────────────────────
    case "theme": {
      if (isHelp) return THEME_HELP;
      const themeName = parts.slice(1).join(" ").trim().toLowerCase();
      if (!themeName) return getThemeListOutput();
      if (themeName in THEMES)
        return getThemeSwitchOutput(themeName as ThemeKey);
      return getThemeInvalidOutput(themeName);
    }

    case "typeface": {
      if (isHelp) return TYPEFACE_HELP;
      const fontName = parts.slice(1).join("").trim().toLowerCase();
      if (!fontName) return getFontListOutput();
      if (fontName in FONTS) return getFontSwitchOutput(fontName as FontKey);
      return getFontInvalidOutput(fontName);
    }

    // ── Network ──────────────────────────────────────────────────
    case "curl": {
      const curlArgs = parts.slice(1);
      if (curlArgs.length === 0) return curlUsageOutput();
      return curlCommand(curlArgs);
    }

    case "weather": {
      if (isHelp) return WEATHER_HELP;
      const city = parts.slice(1).join(" ").trim();
      if (!city) return weatherUsageOutput();

      try {
        const weather = await weatherService.getWeather(city);
        return createWeatherOutput(weather);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : undefined;
        return weatherErrorOutput(city, errorMessage);
      }
    }

    // ── Fun & Games ──────────────────────────────────────────────
    case "cowsay": {
      if (isHelp) return COWSAY_HELP;
      const message = parts.slice(1).join(" ").trim();

      if (!message) {
        return [
          {
            id: crypto.randomUUID(),
            type: "html" as const,
            content: [
              `<div class="space-y-t-section py-t-outer">
                <div class="space-y-t-group">
                  <p>Make a cow say something!</p>
                </div>
                <div class="space-y-t-footer">
                  <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
                  <p>
                    <span class="text-secondary-clr font-bold">Usage:</span> cowsay &lt;message&gt;
                    — or type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">cowsay --help</span><span aria-hidden="true">'</span>
                  </p>
                </div>
              </div>`,
            ],
          },
        ];
      }

      const borderLength = message.length + 2;
      const topBorder = " " + "_".repeat(borderLength);
      const bottomBorder = " " + "-".repeat(borderLength);

      return [
        {
          id: crypto.randomUUID(),
          type: "text" as const,
          content: [
            topBorder,
            `< ${message} >`,
            bottomBorder,
            "        \\   ^__^",
            "         \\  (oo)\\_______",
            "            (__)\\       )\\/\\",
            "                ||----w |",
            "                ||     ||",
          ],
        },
      ];
    }

    case "rps": {
      if (isHelp) return RPS_HELP;
      const userChoice = parts.slice(1).join(" ").trim();

      if (!userChoice) {
        return rpsCommandHelp();
      }

      return rspCommand(userChoice);
    }

    case "game": {
      const gameArgs = parts.slice(1);
      return [handleGameCommand(gameArgs)];
    }

    case "joke": {
      if (isHelp) return JOKE_HELP;
      const joke = await jokeService.getRandomJoke();

      if (joke && joke.type === "twopart") {
        return [
          {
            id: crypto.randomUUID(),
            type: "html" as const,
            content: [
              `<div class="space-y-t-section py-t-outer">
                <div class="space-y-t-group">
                  <p>${joke.setup}</p>
                  <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
                  <p class="text-secondary-clr font-bold">${joke.delivery}</p>
                </div>
                <div class="space-y-t-footer">
                  <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
                  <p>
                    Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">joke</span><span aria-hidden="true">'</span>
                    for another one.
                  </p>
                </div>
              </div>`,
            ],
          },
        ];
      }

      return [
        {
          id: crypto.randomUUID(),
          type: "html" as const,
          content: [
            `<div class="space-y-t-section py-t-outer">
              <p><span class="text-secondary-clr">⚠</span>  Could not fetch a joke. Try again later.</p>
            </div>`,
          ],
        },
      ];
    }

    case "quote": {
      if (isHelp) return QUOTE_HELP;
      const quote = await quoteService.getRandomQuote();

      if (quote) {
        return [
          {
            id: crypto.randomUUID(),
            type: "html" as const,
            content: [
              `<div class="space-y-t-section py-t-outer">
                <div class="space-y-t-group">
                  <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
                  <p class="text-secondary-clr">"${quote.slip.advice}"</p>
                  <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
                </div>
                <div class="space-y-t-footer">
                  <p>
                    Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">quote</span><span aria-hidden="true">'</span>
                    for another one.
                  </p>
                </div>
              </div>`,
            ],
          },
        ];
      }

      return [
        {
          id: crypto.randomUUID(),
          type: "html" as const,
          content: [
            `<div class="space-y-t-section py-t-outer">
              <p><span class="text-secondary-clr">⚠</span>  Could not fetch a quote. Try again later.</p>
            </div>`,
          ],
        },
      ];
    }

    // ── Utilities (subcommand-based — each has own `help` sub) ───
    case "note": {
      const noteArgs = parts.slice(1);
      // Accept both `note --help` and `note help` (handled inside the handler)
      if (isHelp) noteArgs[0] = "help";
      return [handleNoteCommand(noteArgs)];
    }

    case "todo": {
      const todoArgs = parts.slice(1);
      if (isHelp) todoArgs[0] = "help";
      return [handleTodoCommand(todoArgs)];
    }

    case "snippet": {
      const snippetArgs = parts.slice(1);
      if (isHelp) snippetArgs[0] = "help";
      return [handleSnippetCommand(snippetArgs)];
    }

    case "uuid": {
      const uuidArgs = parts.slice(1);
      if (isHelp) uuidArgs[0] = "help";
      return [handleUUIDCommand(uuidArgs)];
    }

    case "convert": {
      const convertArgs = parts.slice(1);
      if (isHelp) convertArgs[0] = "help";
      return [await handleConvertCommand(convertArgs)];
    }

    case "age": {
      const ageArgs = parts.slice(1);
      if (isHelp) ageArgs[0] = "help";
      return [handleAgeCommand(ageArgs)];
    }

    // ── Unknown ──────────────────────────────────────────────────
    default:
      return [
        {
          id: crypto.randomUUID(),
          type: "html" as const,
          content: [
            `<div class="space-y-t-section py-t-outer">
              <div class="space-y-t-group">
                <p><span class="text-secondary-clr">'${cmd}'</span>  command not found.</p>
              </div>
              <div class="space-y-t-footer">
                <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
                <p>
                  Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">help</span><span aria-hidden="true">'</span>
                  to see all available commands.
                </p>
              </div>
            </div>`,
          ],
        },
      ];
  }
};
