import {
  aboutMeCommandOutput,
  contactCommandOutput,
  createWeatherOutput,
  dateCommandOutput,
  emailCommandOutput,
  exitCommandOutput,
  helpCommandOutput,
  hostNameCommandOutput,
  neofetchCommandOutput,
  projectsCommandOutput,
  repoCommandOutput,
  rspCommand,
  sudoCommandOutput,
  themeCommandOutput,
  timeCommandOutput,
  weatherErrorOutput,
  weatherUsageOutput,
  welcomeCommandOutput,
  whoAmICommandOutput,
} from "@/constants";
import { handleGameCommand } from "@/commands/quiz-game-command";
import { jokeService } from "@/services/joke.service";
import { quoteService } from "@/services/quote.service";
import { weatherService } from "@/services/weather.service";

export const executeCommand = async (command: string) => {
  const parts = command.trim().split(" ");
  const cmd = parts[0].toLowerCase();

  switch (cmd) {
    case "help":
      return helpCommandOutput;

    case "clear":
      return [];

    case "contact":
      return contactCommandOutput;

    case "rps":
      const userChoice = parts.slice(1).join(" ").trim();

      if (!userChoice) {
        return [
          {
            id: crypto.randomUUID(),
            type: "text" as const,
            content: [
              "Pick 'rock', 'paper', or 'scissors' to battle it out!",
              "Usage: rps [rock|paper|scissors]",
              "Example: rps rock",
              "C'mon, let's throw some shapes!",
            ],
          },
        ];
      }

      return rspCommand(userChoice);

    case "game":
      const gameArgs = parts.slice(1);

      return handleGameCommand(gameArgs);

    case "cowsay":
      const message = parts.slice(1).join(" ").trim();

      if (!message) {
        return {
          id: crypto.randomUUID(),
          type: "text" as const,
          content: ["Usage: cowsay [message]", "Example: cowsay Hello World!"],
        };
      }

      const borderLength = message.length + 2;
      const topBorder = " " + "_".repeat(borderLength);
      const bottomBorder = " " + "-".repeat(borderLength);

      const cowMessage = [
        `${topBorder}`,
        `< ${message} >`,
        `${bottomBorder}`,
        "        \\   ^__^",
        "         \\  (oo)\\_______",
        "            (__)\\       )\\/\\",
        "                ||----w |",
        "                ||     ||",
      ];

      return {
        id: crypto.randomUUID(),
        type: "text" as const,
        content: cowMessage,
      };

    case "about":
      return aboutMeCommandOutput;

    case "date":
      return dateCommandOutput;

    case "time":
      return timeCommandOutput;

    case "joke":
      const joke = await jokeService.getRandomJoke();

      if (joke && joke.type === "twopart") {
        return {
          id: crypto.randomUUID(),
          type: "text" as const,
          content: [`${joke.setup}`, `${joke.delivery}`],
        };
      }

      return {
        id: crypto.randomUUID(),
        type: "text" as const,
        content: ["Could not fetch a joke."],
      };

    case "quote":
      const quote = await quoteService.getRandomQuote();

      if (quote) {
        return {
          id: crypto.randomUUID(),
          type: "text" as const,
          content: [`"${quote.slip.advice}"`],
        };
      } else {
        return {
          id: crypto.randomUUID(),
          type: "text" as const,
          content: ["Could not fetch a quote. Retry later..."],
        };
      }

    case "hostname":
      return hostNameCommandOutput;

    case "whoami":
      return whoAmICommandOutput;

    case "exit":
      return exitCommandOutput;

    case "email":
      return emailCommandOutput;

    case "projects":
      return projectsCommandOutput;

    case "theme":
      return themeCommandOutput;

    case "neofetch":
      return neofetchCommandOutput;

    case "repo":
      return repoCommandOutput;

    case "sudo":
      return sudoCommandOutput;

    case "weather":
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

    case "welcome":
      return welcomeCommandOutput;

    default:
      return [
        {
          id: crypto.randomUUID(),
          type: "text",
          content: [
            `"${cmd}" : command not found.`,
            "Type 'help' to see the list of available commands.",
          ],
        },
      ];
  }
};
