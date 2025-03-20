import { getDate, getTime } from "@/utils/date";

export const helpCommandOutput = [
  "Here are all the available commands:",
  "   ",
  "about       - Learn more about me and my background.",
  "clear       - Clear the terminal screen.",
  "date        - Display current date.",
  "exit        - Exit the terminal (close tab).",
  "help        - List all available commands with descriptions.",
  "hostname    - Show the system hostname.",
  "neofetch    - Display system and user information(Currently working on it...).",
  "projects    - Browse my projects.",
  "sudo        - Try to gain admin privileges (Easter egg).",
  "theme       - Change the terminal color theme.",
  "time        - Display current time.",
  "welcome     - Display the welcome message and banner.",
  "whoami      - Show current user identity.",
];

export const aboutMeCommandOutput = ["About Me..."];

export const dateCommandOutput = [getDate()];

export const timeCommandOutput = [getTime()];

export const hostNameCommandOutput = ["souleymane-sy-portfolio"];

export const whoAmICommandOutput = ["guest"];

export const exitCommandOutput = ["Please close the tab to exit."];

export const projectsCommandOutput = ["List of Projects"];

export const themeCommandOutput = [
  "Change the theme. Features comming soon...",
];

export const neofetchCommandOutput = ["User information"];

export const sudoCommandOutput = [
  "You're not the admin of this website;",
  "Please contact the admin.",
];

export const welcomeCommandOutput = [
  `
███████  ██████  ██    ██ ██      ███████ ██    ██ ███    ███  █████  ███    ██ ███████     ███████ ██    ██
██      ██    ██ ██    ██ ██      ██       ██  ██  ████  ████ ██   ██ ████   ██ ██          ██       ██  ██
███████ ██    ██ ██    ██ ██      █████     ████   ██ ████ ██ ███████ ██ ██  ██ █████       ███████   ████
     ██ ██    ██ ██    ██ ██      ██         ██    ██  ██  ██ ██   ██ ██  ██ ██ ██               ██    ██
███████  ██████   ██████  ███████ ███████    ██    ██      ██ ██   ██ ██   ████ ███████     ███████    ██    
        `.trim(),
  "--------------------------------",
  "Welcome on my terminal portfolio.",
  "--------------------------------",
  "Type 'help' to see available commands.",
];
