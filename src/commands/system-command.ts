import packageJson from "../../package.json";
import {
  getCurrentTheme,
  getCurrentFont,
  getThemeLabel,
  getFontLabel,
} from "./theme-command";

const packages = Object.keys(packageJson.dependencies);
const packagesDevs = Object.keys(packageJson.devDependencies);

const getResolution = (): string => {
  if (typeof window === "undefined") return "N/A";
  return `${window.screen.availWidth}x${window.screen.availHeight}`;
};

const ASCII_NAME = `
░██████╗░█████╗░██╗░░░██╗██╗░░░░░███████╗██╗░░░██╗███╗░░░███╗░█████╗░███╗░░██╗███████╗  ░██████╗██╗░░░██╗
██╔════╝██╔══██╗██║░░░██║██║░░░░░██╔════╝╚██╗░██╔╝████╗░████║██╔══██╗████╗░██║██╔════╝  ██╔════╝╚██╗░██╔╝
╚█████╗░██║░░██║██║░░░██║██║░░░░░█████╗░░░╚████╔╝░██╔████╔██║███████║██╔██╗██║█████╗░░  ╚█████╗░░╚████╔╝░
░╚═══██╗██║░░██║██║░░░██║██║░░░░░██╔══╝░░░░╚██╔╝░░██║╚██╔╝██║██╔══██║██║╚████║██╔══╝░░  ░╚═══██╗░░╚██╔╝░░
██████╔╝╚█████╔╝╚██████╔╝███████╗███████╗░░░██║░░░██║░╚═╝░██║██║░░██║██║░╚███║███████╗  ██████╔╝░░░██║░░░
╚═════╝░░╚════╝░░╚═════╝░╚══════╝╚══════╝░░░╚═╝░░░╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚══════╝  ╚═════╝░░░░╚═╝░░░
        `.trim();

const NEOFETCH_ASCII = `                    .
                   .:.
                  .:::.
                 .:::::.
             ***.:::::::.***
        *******.:::::::::.*******
      ********.:::::::::::.********
     ********.:::::::::::::.********
     *******.::::::'***\`::::.*******
     ******.::::'*********\`::.*****
      ****.:::'*************\`:.****
        *.::'*****************\`.*
        .:'  ***************    .
       .`;

export const getWelcomeCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-3 py-1">

        <pre class="text-primary-clr leading-snug select-none">${ASCII_NAME}</pre>

        <div class="space-y-0.5">
          <p>──────────────────────────────────</p>
          <p>
            <span>  </span>
            <span class="font-bold">Welcome to my terminal portfolio</span>
          </p>
          <p>─────────────────────────────────────────</p>
        </div>

        <div class="space-y-0.5">
          <p>
            Type
            <span> '</span><span class="text-tertiary-clr font-bold">about</span><span>'</span>
            to learn more about me.
          </p>
          <p>
            Type
            <span> '</span><span class="text-tertiary-clr font-bold">help</span><span>'</span>
            to see all available commands.
          </p>
        </div>

        <div class="space-y-0.5">
          <p>─────────────────────────────────────────────</p>
          <p>
            <span class="text-secondary-clr">#</span>
            This terminal runs best on a real keyboard.
          </p>
          <p>
            <span class="text-secondary-clr">#</span>
            Mobile works, but desktop is home. <span class="text-primary-clr text-fs-title">⌨</span>
          </p>
        </div>

      </div>`,
    ],
  },
];

export const getHostNameCommandOutput = () => [
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

export const getWhoAmICommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-3 py-1">
        <div class="space-y-3">
          <div>
            <p>&gt; Identifying user...</p>
            <p>root@system</p>
            <p> </p>

          </div>

          <div>
            <p>...Just kidding! 😄</p>
            <p> </p>
            <p>You're exploring the terminal portfolio of Souleymane Sy —</p>
            <p>self-taught frontend web developer since 2022.</p>
            <p>Based in Coyah, Guinea-Conakry. React / Next.js / TypeScript specialist.</p>
            <p> </p>
            <p>89+ repos on GitHub. 50+ Frontend Mentor challenges.</p>
            <p>3rd place — Enzo Ustariz Web Contest 2024. 🏆</p>
            <p>Certified with exceptional distinction — DevelopersHub Corporation. ⭐</p>
          </div>
        </div>

        <div class="space-y-0.5">
          <p>
            Type
            <span> '</span><span class="text-tertiary-clr font-bold">about</span><span>'</span>
            for my full story.
          </p>
          <p>
            Type
            <span> '</span><span class="text-tertiary-clr font-bold">projects</span><span>'</span>
            to see what I've built.
          </p>
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

export const getNeofetchCommandOutput = () => {
  // Read current theme and font from DOM at call time (always client-side)
  const themeLabel = getThemeLabel(getCurrentTheme());
  const fontLabel = getFontLabel(getCurrentFont());

  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="py-2">
  <div class="flex gap-4 md:gap-20 items-start flex-nowrap">

    <pre class="text-primary-clr shrink-0 m-0 leading-snug select-none">${NEOFETCH_ASCII}</pre>

    <div class="space-y-3">
      <div class="space-y-0.5">
        <p>
          <span class="text-primary-clr font-bold">guest</span><span class="text-secondary-clr">@</span><span class="text-tertiary-clr font-bold">souleymane-sy-portfolio</span>
        </p>
        <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
      </div>

      <div class="space-y-0.5">
        <p><span class="text-secondary-clr">OS:          </span>  Portfolio OS v2025.1</p>
        <p><span class="text-secondary-clr">Host:        </span>  Vercel Platform</p>
        <p><span class="text-secondary-clr">Kernel:      </span>  Next.js 16 · React 19</p>
        <p><span class="text-secondary-clr">Shell:       </span>  TypeScript 5.x</p>
        <p><span class="text-secondary-clr">DE:          </span>  Terminal Portfolio v1.0</p>
        <p><span class="text-secondary-clr">Theme:       </span>  ${themeLabel}</p>
        <p><span class="text-secondary-clr">Font:        </span>  ${fontLabel}</p>
        <p><span class="text-secondary-clr">Resolution:  </span>  ${getResolution()}</p>
        <p><span class="text-secondary-clr">Uptime:      </span>  Online since 2025, no interruptions</p>
        <p><span class="text-secondary-clr">Packages:    </span>  ${packages.length} (Dependencies) · ${packagesDevs.length} (Dev Dependencies)</p>
      </div>


      <div class="space-y-0.5">
        <p class="pt-1"><span class="text-tertiary-clr font-bold">Stack: </span></p>
        <p><span class="text-tertiary-clr"> •</span>  React · Next.js · Vue.js</p>
        <p><span class="text-tertiary-clr"> •</span>  TypeScript · Tailwind CSS v4</p>
        <p><span class="text-tertiary-clr"> •</span>  GSAP · Framer Motion</p>
        <p><span class="text-tertiary-clr"> •</span>  Git · GitHub · Bun · Vercel</p>
      </div>


      <div class="space-y-0.5">
        <p class="pt-1"><span class="text-tertiary-clr font-bold">Journey: </span></p>
        <p><span class="text-tertiary-clr"> •</span>  Self-taught since 2022</p>
        <p><span class="text-tertiary-clr"> •</span>  89+ GitHub repos</p>
        <p><span class="text-tertiary-clr"> •</span>  50+ Frontend Mentor challenges</p>
        <p><span class="text-tertiary-clr"> •</span>  🏆 Enzo Ustariz 2024 — Top 3</p>
        <p><span class="text-tertiary-clr"> •</span>  DevelopersHub Corp — Certified</p>
        <p><span class="text-tertiary-clr"> •</span>  Coyah, Guinea-Conakry 🇬🇳</p>
      </div>

      <div class="space-y-0.5" aria-hidden="true">
        <div class="flex gap-0.5 items-baseline leading-none">
          <span class="text-primary-clr">████</span>
          <span class="text-secondary-clr">████</span>
          <span class="text-tertiary-clr">████</span>
          <span class="text-text-clr">████</span>
        </div>
        <div class="flex gap-0.5 items-baseline leading-none">
          <span class="text-primary-clr opacity-40">████</span>
          <span class="text-secondary-clr opacity-40">████</span>
          <span class="text-tertiary-clr opacity-40">████</span>
          <span class="text-text-clr opacity-40">████</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
      ],
    },
  ];
};

export const getSudoCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      "[sudo] Password for guest:",
      " ",
      "Access Denied.",
      " ",
      "Did you really think that would work? 😄",
      "The superpowers here are CSS and TypeScript.",
      "You don't need root access to build great things.",
    ],
  },
];
