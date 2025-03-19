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
  welcomeCommandOutput,
  whoAmICommandOutput,
} from "@/constants";

export const executeCommand = async (command: string): Promise<string[]> => {
  const [cmd] = command.toLowerCase().split(" ");

  switch (cmd) {
    case "help":
      return helpCommandOutput;

    case "about":
      return aboutMeCommandOutput;

    case "date":
      return dateCommandOutput;

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
      return sudoCommandOutput

    case "welcome":
      return welcomeCommandOutput

    default:
      return [
        `"${cmd}" : command not found.`,
        "Type 'help' to see the list of available commands.",
      ];
  }
};
