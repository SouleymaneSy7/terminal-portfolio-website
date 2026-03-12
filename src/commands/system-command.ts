import packageJson from "../../package.json";

const packages = Object.keys(packageJson.dependencies);

const resolutionWidth = global.window && window.screen.availWidth;
const resolutionHeight = global.window && window.screen.availHeight;
const resolution = `${resolutionWidth}x${resolutionHeight}`;

const ASCII_NAME = `
░██████╗░█████╗░██╗░░░██╗██╗░░░░░███████╗██╗░░░██╗███╗░░░███╗░█████╗░███╗░░██╗███████╗  ░██████╗██╗░░░██╗
██╔════╝██╔══██╗██║░░░██║██║░░░░░██╔════╝╚██╗░██╔╝████╗░████║██╔══██╗████╗░██║██╔════╝  ██╔════╝╚██╗░██╔╝
╚█████╗░██║░░██║██║░░░██║██║░░░░░█████╗░░░╚████╔╝░██╔████╔██║███████║██╔██╗██║█████╗░░  ╚█████╗░░╚████╔╝░
░╚═══██╗██║░░██║██║░░░██║██║░░░░░██╔══╝░░░░╚██╔╝░░██║╚██╔╝██║██╔══██║██║╚████║██╔══╝░░  ░╚═══██╗░░╚██╔╝░░
██████╔╝╚█████╔╝╚██████╔╝███████╗███████╗░░░██║░░░██║░╚═╝░██║██║░░██║██║░╚███║███████╗  ██████╔╝░░░██║░░░
╚═════╝░░╚════╝░░╚═════╝░╚══════╝╚══════╝░░░╚═╝░░░╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚══════╝  ╚═════╝░░░░╚═╝░░░
        `.trim();

export const welcomeCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      " ",
      ASCII_NAME,
      " ",
      " ",
      "──────────────────────────────────",
      "  Welcome to my terminal portfolio",
      "─────────────────────────────────────────",
      "Type 'about' to learn more about me.",
      "Type 'help' to see all available commands.",
    ],
  },
];

export const hostNameCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      "souleymane-sy-portfolio",
      " ",
      "Hostname  →  souleymane-sy-portfolio",
      "Owner     →  Souleymane Sy",
      "Location  →  Coyah, Guinea-Conakry 🇬🇳",
      "Uptime    →  Online since 2025, no interruptions.",
    ],
  },
];

export const whoAmICommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      "> Identifying user...",
      "root@system",
      " ",
      "...Just kidding! 😄",
      " ",
      "You're exploring the terminal portfolio of Souleymane Sy —",
      "self-taught frontend web developer since 2022.",
      "Based in Coyah, Guinea-Conakry. React / Next.js / TypeScript specialist.",
      " ",
      "89+ repos on GitHub. 50+ Frontend Mentor challenges.",
      "3rd place — Enzo Ustariz Web Contest 2024. 🏆",
      "Certified with exceptional distinction — DevelopersHub Corporation. ⭐",
      " ",
      "Type 'about' for my full story.",
      "Type 'projects' to see what I've built.",
      "Type 'help' to see all available commands.",
    ],
  },
];

export const themeCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      "Available themes:",
      " ",
      "  [active] Catppuccin Macchiato  →  the current choice, elegant and easy on the eyes",
      "  [soon]   Monokai               →  the timeless classic",
      "  [soon]   Tokyo Night           →  for late-night coding sessions",
      "  [soon]   Dracula               →  dark and mysterious",
      " ",
      "⚠ Theme switching is currently under development. Check back soon!",
    ],
  },
];

export const neofetchCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      "                    .                       guest@souleymane-sy-portfolio",
      "                   .:.                      -------------------------------",
      `                  .:::.                     OS:  SyOS v2025.1 (Coyah Linux) 🇬🇳`,
      "                 .:::::.                    Host: Vercel Platform",
      "             ***.:::::::.***                Kernel: Next.js 16 · React 19",
      "        *******.:::::::::.*******           Shell: TypeScript 5.x",
      "      ********.:::::::::::.********         DE: Terminal Portfolio v1.0",
      "     ********.:::::::::::::.********        Theme: Catppuccin Macchiato 🎨",
      "     *******.::::::'***`::::.*******        Resolution: " + resolution,
      "     ******.::::'*********`::.******        Packages: " +
        (packages.length + 1) +
        " (Dependencies), " +
        (packages.length + 1) +
        " (Dev Dependencies)",
      "      ****.:::'*************`:.****         ",
      "        *.::'*****************`.*           Stack:",
      "        .:'  ***************    .           • React · Next.js · Vue.js",
      "       .                                    • TypeScript · Tailwind CSS v4",
      "                                            • GSAP · Framer Motion",
      "                                            • Git · GitHub · Bun · Vercel",
      "                                            ",
      "                                            Journey:",
      "                                            • Self-taught since 2022",
      "                                            • 89+ GitHub repos",
      "                                            • 50+ Frontend Mentor challenges",
      "                                            • 🏆 Enzo Ustariz 2024 — Top 3",
      "                                            • ⭐ DevelopersHub Corp — Certified",
      "                                            • 📍 Coyah, Guinea-Conakry",
    ],
  },
];

export const sudoCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      "[sudo] Password for guest:",
      " ",
      "Access Denied. ❌",
      " ",
      "Did you really think that would work? 😄",
      "The superpowers here are CSS and TypeScript.",
      "You don't need root access to build great things.",
    ],
  },
];
