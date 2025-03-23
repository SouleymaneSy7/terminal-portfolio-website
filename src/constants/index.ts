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
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
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
    ],
  },
];

export const aboutMeCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
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
      " ",
      "Type 'projects' to see my work!",
    ],
  },
];

export const dateCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [getDate()],
  },
];

export const timeCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [getTime()],
  },
];

export const hostNameCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: ["souleymane-sy-portfolio"],
  },
];
export const whoAmICommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: ["guest"],
  },
];

export const exitCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      "Goodbye! 👋",
      "Thank you for visiting my terminal portfolio.",
      "You can close this tab or window to exit.",
      "Feel free to come back anytime!",
    ],
  },
];

export const projectsCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: ["Here are some of my projects:"],
  },
];

export const themeCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: ["Theme changing (feature coming soon...)"],
  },
];

export const neofetchCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      "                    .                       guest@souleymane-sy-portfolio",
      "                   .:.                      -------------------------------",
      "                  .:::.                     OS: Browser",
      "                 .:::::.                    Host: Vercel Platform",
      "             ***.:::::::.***                Kernel: Latest V8 Engine",
      "        *******.:::::::::.*******           Shell: NextJS Terminal v1.0",
      "      ********.:::::::::::.********         DE: Next.js 15.2.3",
      "     ********.:::::::::::::.********        Theme: Dark Mode (Monokai Pro Theme)",
      "     *******.::::::'***`::::.*******        ",
      "     ******.::::'*********`::.******        Technologies:",
      "      ****.:::'*************`:.****         • Framework: Next.js 15, React 19, ",
      "        *.::'*****************`.*           • Language: TypeScript",
      "        .:'  ***************    .           • Styling: TailwindCSS V4",
      "       .                                    • Package Manager: Bun",
      "                                            • Version Control: Git",
      "                                            • Deployment: Vercel",
      "                                            • Linting: ESLint, Prettier",
    ],
  },
];

export const sudoCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      "Access Denied: You're not the admin of this website",
      "Please contact the administrator for access.",
    ],
  },
];

export const welcomeCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      " ",
      ASCII_NAME,
      " ",
      " ",
      "--------------------------------",
      "Welcome to my terminal portfolio",
      "-------------------------------------",
      "Type 'help' to see available commands.",
    ],
  },
];
