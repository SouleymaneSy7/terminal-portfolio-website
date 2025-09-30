import {
  aboutMeCommandOutput,
  dateCommandOutput,
  exitCommandOutput,
  helpCommandOutput,
  hostNameCommandOutput,
  neofetchCommandOutput,
  projectsCommandOutput,
  repoCommandOutput,
  sudoCommandOutput,
  themeCommandOutput,
  timeCommandOutput,
  welcomeCommandOutput,
  whoAmICommandOutput,
} from "@/constants";
// import { CommandHistoryOutput } from "@/types";
import { jokeService } from "./services/joke.service";

export const executeCommand = async (command: string) => {
  const [cmd] = command.toLowerCase().split(" ");

  switch (cmd) {
    case "help":
      return helpCommandOutput;

    case "clear":
      return [];

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

    case "hostname":
      return hostNameCommandOutput;

    case "whoami":
      return whoAmICommandOutput;

    case "exit":
      return exitCommandOutput;

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
