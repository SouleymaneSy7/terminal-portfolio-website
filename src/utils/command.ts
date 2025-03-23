import {
  aboutMeCommandOutput,
  dateCommandOutput,
  exitCommandOutput,
  helpCommandOutput,
  hostNameCommandOutput,
  neofetchCommandOutput,
  projectsCommandOutput,
  sudoCommandOutput,
  themeCommandOutput,
  timeCommandOutput,
  welcomeCommandOutput,
  whoAmICommandOutput,
} from "@/constants";
import { CommandHistoryOutput } from "@/types";

export const executeCommand = async (
  command: string
): Promise<CommandHistoryOutput> => {
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
