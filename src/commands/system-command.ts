import packageJson from "../../package.json";
import {
  getCurrentTheme,
  getCurrentFont,
  getThemeLabel,
  getFontLabel,
} from "./theme-command";

const packages = Object.keys(packageJson.dependencies);
const packagesDev = Object.keys(packageJson.devDependencies);

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
      `<div class="space-y-t-section py-t-outer">

        <pre class="text-primary-clr leading-snug select-none" aria-hidden="true">${ASCII_NAME}</pre>

        <div class="space-y-t-group">
          <p class="text-text-clr opacity-sep" aria-hidden="true">──────────────────────────────────────────────────────</p>
          <p class="font-bold">  Welcome to my terminal portfolio</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">──────────────────────────────────────────────────────</p>
        </div>

        <div class="space-y-t-group">
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">about</span><span aria-hidden="true">'</span>
            to learn more about me.
          </p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">help</span><span aria-hidden="true">'</span>
            to see all available commands.
          </p>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">──────────────────────────────────────────────────────</p>
          <p>
            <span aria-hidden="true" class="text-secondary-clr">#</span>
            This terminal runs best on a real keyboard.
          </p>
          <p>
            <span aria-hidden="true" class="text-secondary-clr">#</span>
            Mobile works, but desktop is home.
          </p>
        </div>

      </div>`,
    ],
  },
];

export const getNeofetchCommandOutput = () => {
  const themeLabel = getThemeLabel(getCurrentTheme());
  const fontLabel = getFontLabel(getCurrentFont());

  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="py-t-outer">
  <div class="flex gap-4 md:gap-20 items-start flex-nowrap">

    <pre class="text-primary-clr shrink-0 m-0 leading-snug select-none" aria-hidden="true">${NEOFETCH_ASCII}</pre>

    <div class="space-y-t-section">

      <div class="space-y-t-group">
        <p>
          <span class="text-primary-clr font-bold">guest</span><span aria-hidden="true" class="text-secondary-clr">@</span><span class="text-tertiary-clr font-bold">souleymane-sy-portfolio</span>
        </p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      </div>

      <div class="space-y-t-group">
        <p><span class="text-secondary-clr">OS:          </span>  Portfolio OS v2025.1</p>
        <p><span class="text-secondary-clr">Host:        </span>  Vercel Platform</p>
        <p><span class="text-secondary-clr">Kernel:      </span>  Next.js 16 · React 19</p>
        <p><span class="text-secondary-clr">Shell:       </span>  TypeScript 5.x</p>
        <p><span class="text-secondary-clr">DE:          </span>  Terminal Portfolio v1.0</p>
        <p><span class="text-secondary-clr">Theme:       </span>  ${themeLabel}</p>
        <p><span class="text-secondary-clr">Font:        </span>  ${fontLabel}</p>
        <p><span class="text-secondary-clr">Resolution:  </span>  ${getResolution()}</p>
        <p><span class="text-secondary-clr">Uptime:      </span>  Online since 2025, no interruptions</p>
        <p><span class="text-secondary-clr">Packages:    </span>  ${packages.length} (prod) · ${packagesDev.length} (dev)</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">Stack</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  React · Next.js · Vue.js</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  TypeScript · Tailwind CSS v4</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  GSAP · Framer Motion</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Git · GitHub · Bun · Vercel</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">Journey</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Self-taught since 2022</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  89+ GitHub repos</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  50+ Frontend Mentor challenges</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  🏆 Enzo Ustariz 2024 — Top 3</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  DevelopersHub Corp — Certified</p>
        <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Coyah, Guinea-Conakry 🇬🇳</p>
      </div>

      <div class="space-y-0.5" aria-hidden="true">
        <div class="flex gap-0.5 items-baseline leading-none">
          <span class="text-primary-clr">████</span>
          <span class="text-secondary-clr">████</span>
          <span class="text-tertiary-clr">████</span>
          <span class="text-text-clr">████</span>
        </div>
        <div class="flex gap-0.5 items-baseline leading-none">
          <span class="text-primary-clr opacity-sep">████</span>
          <span class="text-secondary-clr opacity-sep">████</span>
          <span class="text-tertiary-clr opacity-sep">████</span>
          <span class="text-text-clr opacity-sep">████</span>
        </div>
      </div>

    </div>
  </div>
</div>`,
      ],
    },
  ];
};

export const getHostNameCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Hostname</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-secondary-clr">Hostname  </span>  souleymane-sy-portfolio</p>
          <p><span class="text-secondary-clr">Owner     </span>  Souleymane Sy</p>
          <p><span class="text-secondary-clr">Location  </span>  Coyah, Guinea-Conakry 🇬🇳</p>
          <p><span class="text-secondary-clr">Uptime    </span>  Online since 2025, no interruptions</p>
        </div>
      </div>`,
    ],
  },
];

export const getWhoAmICommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p>&gt; Identifying user...</p>
          <p>root@system</p>
          <p>...Just kidding! 😄</p>
          <p>You're exploring the terminal portfolio of <span class="text-secondary-clr font-bold">Souleymane Sy</span> —</p>
          <p>self-taught frontend web developer since 2022.</p>
          <p>Based in Coyah, Guinea-Conakry. React / Next.js / TypeScript specialist.</p>
          <p>89+ repos on GitHub. 50+ Frontend Mentor challenges.</p>
          <p><span class="text-tertiary-clr font-bold">🏆 3rd place</span> — Enzo Ustariz Web Contest 2024.</p>
          <p><span class="text-tertiary-clr font-bold">⭐ Certified with exceptional distinction</span> — DevelopersHub Corporation.</p>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">about</span><span aria-hidden="true">'</span>
            for my full story.
          </p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">projects</span><span aria-hidden="true">'</span>
            to see what I've built.
          </p>
        </div>

      </div>`,
    ],
  },
];

export const getSudoCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p>[sudo] Password for guest:</p>
          <p class="text-secondary-clr">Access Denied.</p>
          <p>Did you really think that would work? 😄</p>
          <p>The superpowers here are CSS and TypeScript.</p>
          <p>You don't need root access to build great things.</p>
        </div>
      </div>`,
    ],
  },
];
