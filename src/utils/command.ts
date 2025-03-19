export const executeCommand = async (command: string): Promise<string[]> => {
  const [cmd] = command.toLowerCase().split(" ");

  switch (cmd) {
    case "help":
      return [
        "Here are all the available commands :",
        "",
        "about     - About me.",
        "date      - Show the current date.",
        "exit      - Close the windows.",
        "hostname  - Display the host name.",
        "help      - Show available command list",
        "projects  - Show projects list.",
        "theme     - Change the themes.",
        "neofetch  - Show User Personal informations.",
        "sudo      - An Easter eggs for the Admin.",
        "whoami    - Display the guest name.",
        "welcome   - Display the welcome banner.",
      ];

    case "about":
      return ["About Me..."];

    case "date":
      return ["Current Date"];

    case "hostname":
      return ["souleymane-sy-portfolio"];

    case "whoami":
      return ["guest"];

    case "exit":
      return ["Please close the tab to exit."];

    case "projects":
      return ["List of Projects"];

    case "theme":
      return ["Change the theme. Features comming soon..."];

    case "neofetch":
      return ["User information"];

    case "sudo":
      return ["You're not the admin; please contact the admin "];

    case "welcome":
      return [
        "Welcome on my terminal portfolio.",
        "Type 'help' to see available commands.",
      ];

    default:
      return [
        `"${cmd}" : command not found.`,
        "Type 'help' to see the list of available commands.",
      ];
  }
};
