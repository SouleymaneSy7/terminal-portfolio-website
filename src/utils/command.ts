import {
  getAboutMeCommandOutput,
  getContactCommandOutput,
  createWeatherOutput,
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
  weatherErrorOutput,
  weatherUsageOutput,
  getWelcomeCommandOutput,
  getWhoAmICommandOutput,
  // Theme & font
  THEMES,
  FONTS,
  getThemeListOutput,
  getThemeSwitchOutput,
  getThemeInvalidOutput,
  getFontListOutput,
  getFontSwitchOutput,
  getFontInvalidOutput,
} from "@/commands";
import type { ThemeKey, FontKey } from "@/commands";
import {
  getDateCommandOutput,
  getTimeCommandOutput,
  getHelpCommandOutput,
} from "@/constants";
import { jokeService } from "@/services/joke.service";
import { quoteService } from "@/services/quote.service";
import { weatherService } from "@/services/weather.service";

export const executeCommand = async (command: string) => {
  const parts = command.trim().split(" ");
  const cmd = parts[0].toLowerCase();

  switch (cmd) {
    case "help":
      return getHelpCommandOutput();

    case "clear":
      return [];

    case "contact":
      return getContactCommandOutput();

    // ──────────────────────────────────────
    // THEME
    // ──────────────────────────────────────
    case "theme": {
      const themeName = parts.slice(1).join(" ").trim().toLowerCase();

      if (!themeName) return getThemeListOutput();

      if (themeName in THEMES) {
        return getThemeSwitchOutput(themeName as ThemeKey);
      }

      return getThemeInvalidOutput(themeName);
    }

    // ──────────────────────────────────────
    // TYPEFACE
    // ──────────────────────────────────────
    case "typeface": {
      const fontName = parts.slice(1).join("").trim().toLowerCase();

      if (!fontName) return getFontListOutput();

      if (fontName in FONTS) {
        return getFontSwitchOutput(fontName as FontKey);
      }

      return getFontInvalidOutput(fontName);
    }

    case "rps": {
      const userChoice = parts.slice(1).join(" ").trim();

      if (!userChoice) {
        return [
          {
            id: crypto.randomUUID(),
            type: "html" as const,
            content: [
              `<div class="space-y-3 py-1">
                <div class="space-y-1">
                  <p>Pick <span class="text-tertiary-clr">rock</span>, <span class="text-tertiary-clr">paper</span> or <span class="text-tertiary-clr">scissors</span> to battle it out!</p>
                </div>
                <div class="space-y-0.5">
                  <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
                  <p>
                    Example: Type
                    <span> '</span><span class="text-tertiary-clr font-bold">rps rock</span><span>'</span>
                  </p>
                </div>
              </div>`,
            ],
          },
        ];
      }

      return rspCommand(userChoice);
    }

    case "game": {
      const gameArgs = parts.slice(1);
      return [handleGameCommand(gameArgs)];
    }

    case "cowsay": {
      const message = parts.slice(1).join(" ").trim();

      if (!message) {
        return [
          {
            id: crypto.randomUUID(),
            type: "html" as const,
            content: [
              `<div class="space-y-3 py-1">
                <div class="space-y-1">
                  <p>Make a cow say something!</p>
                </div>
                <div class="space-y-0.5">
                  <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
                  <p>
                    Example: Type
                    <span> '</span><span class="text-tertiary-clr font-bold">cowsay Hello World!</span><span>'</span>
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

    case "about":
      return getAboutMeCommandOutput();

    case "date":
      return getDateCommandOutput();

    case "time":
      return getTimeCommandOutput();

    case "joke": {
      const joke = await jokeService.getRandomJoke();

      if (joke && joke.type === "twopart") {
        return [
          {
            id: crypto.randomUUID(),
            type: "html" as const,
            content: [
              `<div class="space-y-3 py-1">
                <div class="space-y-1">
                  <p>${joke.setup}</p>
                  <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
                  <p class="text-secondary-clr font-bold">${joke.delivery}</p>
                </div>
                <div class="space-y-0.5">
                  <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
                  <p>
                    Type
                    <span> '</span><span class="text-tertiary-clr font-bold">joke</span><span>'</span>
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
            `<div class="space-y-1 py-1">
              <p><span class="text-secondary-clr">⚠</span>  Could not fetch a joke. Try again later.</p>
            </div>`,
          ],
        },
      ];
    }

    case "quote": {
      const quote = await quoteService.getRandomQuote();

      if (quote) {
        return [
          {
            id: crypto.randomUUID(),
            type: "html" as const,
            content: [
              `<div class="space-y-3 py-1">
                <div class="space-y-1">
                  <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
                  <p class="text-secondary-clr">"${quote.slip.advice}"</p>
                  <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
                </div>
                <div class="space-y-0.5">
                  <p>
                    Type
                    <span> '</span><span class="text-tertiary-clr font-bold">quote</span><span>'</span>
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
            `<div class="space-y-1 py-1">
              <p><span class="text-secondary-clr">⚠</span>  Could not fetch a quote. Try again later.</p>
            </div>`,
          ],
        },
      ];
    }

    case "hostname":
      return getHostNameCommandOutput();

    case "whoami":
      return getWhoAmICommandOutput();

    case "exit":
      return getExitCommandOutput();

    case "resume":
      return getResumeCommandOutput();

    case "email":
      return getEmailCommandOutput();

    case "projects":
      return getProjectsCommandOutput();

    case "neofetch":
      return getNeofetchCommandOutput();

    case "repo":
      return getRepoCommandOutput();

    case "sudo":
      return getSudoCommandOutput();

    case "weather": {
      const city = parts.slice(1).join(" ").trim();

      if (!city) {
        return weatherUsageOutput();
      }

      try {
        const weather = await weatherService.getWeather(city);
        return createWeatherOutput(weather);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : undefined;
        return weatherErrorOutput(city, errorMessage);
      }
    }

    case "welcome":
      return getWelcomeCommandOutput();

    default:
      return [
        {
          id: crypto.randomUUID(),
          type: "html" as const,
          content: [
            `<div class="space-y-3 py-1">
              <div class="space-y-1">
                <p><span class="text-secondary-clr">'${cmd}'</span>  command not found.</p>
              </div>
              <div class="space-y-0.5">
                <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
                <p>
                  Type
                  <span> '</span><span class="text-tertiary-clr font-bold">help</span><span>'</span>
                  to see all available commands.
                </p>
              </div>
            </div>`,
          ],
        },
      ];
  }
};
