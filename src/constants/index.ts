import { getDate, getTime } from "@/utils/date";

const ASCII_NAME = `
░██████╗░█████╗░██╗░░░██╗██╗░░░░░███████╗██╗░░░██╗███╗░░░███╗░█████╗░███╗░░██╗███████╗  ░██████╗██╗░░░██╗
██╔════╝██╔══██╗██║░░░██║██║░░░░░██╔════╝╚██╗░██╔╝████╗░████║██╔══██╗████╗░██║██╔════╝  ██╔════╝╚██╗░██╔╝
╚█████╗░██║░░██║██║░░░██║██║░░░░░█████╗░░░╚████╔╝░██╔████╔██║███████║██╔██╗██║█████╗░░  ╚█████╗░░╚████╔╝░
░╚═══██╗██║░░██║██║░░░██║██║░░░░░██╔══╝░░░░╚██╔╝░░██║╚██╔╝██║██╔══██║██║╚████║██╔══╝░░  ░╚═══██╗░░╚██╔╝░░
██████╔╝╚█████╔╝╚██████╔╝███████╗███████╗░░░██║░░░██║░╚═╝░██║██║░░██║██║░╚███║███████╗  ██████╔╝░░░██║░░░
╚═════╝░░╚════╝░░╚═════╝░╚══════╝╚══════╝░░░╚═╝░░░╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚══════╝  ╚═════╝░░░░╚═╝░░░
        `.trim();

const ASCII_ART_ASTRONAUT = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣤⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠛⠉⠙⠛⠛⠛⠛⠻⢿⣿⣷⣤⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠋⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠈⢻⣿⣿⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣸⣿⡏⠀⠀⠀⣠⣶⣾⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿⣄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠁⠀⠀⢰⣿⣿⣯⠁⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣷⡄⠀
⠀⠀⣀⣤⣴⣶⣶⣿⡟⠀⠀⠀⢸⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⠀
⠀⢰⣿⡟⠋⠉⣹⣿⡇⠀⠀⠀⠘⣿⣿⣿⣿⣷⣦⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⠀
⠀⣸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠉⠻⠿⣿⣿⣿⣿⡿⠿⠿⠛⢻⣿⡇⠀⠀
⠀⣿⣿⠁⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣧⠀⠀
⠀⢿⣿⡆⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡇⠀⠀
⠀⠸⣿⣧⡀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠃⠀⠀
⠀⠀⠛⢿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⣰⣿⣿⣷⣶⣶⣶⣶⠶⠀⢠⣿⣿⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⣽⣿⡏⠁⠀⠀⢸⣿⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⢹⣿⡆⠀⠀⠀⣸⣿⠇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢿⣿⣦⣄⣀⣠⣴⣿⣿⠁⠀⠈⠻⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠛⠻⠿⠿⠿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`.trim();

export const helpCommandOutput = [
  "Here are all the available commands:",
  " ",
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

export const aboutMeCommandOutput = [
  " ",
  ASCII_ART_ASTRONAUT,
  " ",
  " ",
  "👋 Hey There, I'm Souleymane Sy!",
  " ",
  "I'm a passionate self-taught web developer with over three years of experience in crafting digital solutions.",
  "My journey into web development began with curiosity and has evolved into a deep commitment to creating",
  "exceptional web experiences.",
  " ",
  "Throughout my self-learning journey, I've developed expertise in a wide range of technologies including",
  "HTML, CSS, JavaScript, TypeScript, React, Vue.js, Next.js, Sass, and TailwindCSS.",
  "Each of these tools has become an integral part of my development arsenal,",
  "allowing me to build robust and scalable applications.",
  " ",
  "What truly excites me about web development is the perfect blend of creativity and technical problem-solving.",
  "I believe in writing clean, maintainable code that not only works efficiently but is also easily understood by others.",
  " ",
  "Every project I undertake is an opportunity to push boundaries and implement innovative solutions.",
  "I'm constantly learning and staying updated with the latest web technologies and best practices",
  "to deliver the best possible results.",
  " ",
  "I'm always eager to take on new challenges and contribute to meaningful projects",
  "that make a difference in the digital world.",
];

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
  " ",
  ASCII_NAME,
  " ",
  " ",
  "--------------------------------",
  "Welcome on my terminal portfolio.",
  "-------------------------------------",
  "Type 'help' to see available commands.",
];
