import packageJson from "../../package.json";
import { getDate, getTime } from "@/utils/date";

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

// ============================================
// COMMANDS LIST
// ============================================

export const commands = [
  "about",
  "clear",
  "cowsay",
  "contact",
  "date",
  "exit",
  "email",
  "game",
  "help",
  "hostname",
  "joke",
  "neofetch",
  "projects",
  "quote",
  "repo",
  "rps",
  "sudo",
  "theme",
  "time",
  "welcome",
  "weather",
  "whoami",
];

// ============================================
// HELP
// ============================================

export const helpCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      " ",
      "Available Commands:",
      "---------------------",
      " ",
      "Navigation & System:",
      " ",
      "  clear     - Clear the terminal screen.",
      "  exit      - Exit the terminal (close tab).",
      "  help      - List all available commands with descriptions.",
      "  hostname  - Display system information.",
      "  neofetch  - Display a Linux-style system summary.",
      "  theme     - Change the terminal color theme (coming soon...).",
      " ",
      "Information:",
      " ",
      "  about     - My story, my journey and my tech stack.",
      "  contact   - My social networks and contact details.",
      "  date      - Display current date.",
      "  time      - Display current time.",
      "  whoami    - Who is behind this terminal?",
      "  projects  - Browse my most notable projects.",
      "  repo      - View this portfolio's source code.",
      "  weather   - Get real-time weather for a city. (Example: weather Conakry)",
      "  email     - Display my email address.",
      " ",
      "Fun:",
      " ",
      "  cowsay    - Make a cow say your message in ASCII! (Try: cowsay Hello!)",
      "  game      - Interactive Frontend Quiz — test your knowledge! (Try: game)",
      "  joke      - Get a random programming joke.",
      "  quote     - Get an inspiring or funny quote.",
      "  rps       - Rock-paper-scissors against the terminal! (Usage: rps [rock|paper|scissors])",
      "  sudo      - Attempt to gain root access... (Good luck 😄)",
      "  welcome   - Display the welcome message again.",
      " ",
      "Keyboard Shortcuts:",
      " ",
      "  [Tab]         → Autocomplete commands.",
      "  [↑] [↓]       → Navigate the command history.",
      "  [Enter]       → Execute command.",
      "  [CTRL + L]    → Clear the terminal screen.",
      " ",
      "Type any command to get started!",
    ],
  },
];

// ============================================
// ABOUT
// ============================================

export const aboutMeCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      " ",
      ASCII_ART_ASTRONAUT,
      " ",
      " ",
      "👋 Hey, I'm Souleymane Sy!",
      " ",
      "Self-taught frontend web developer, based in Coyah, Guinea-Conakry.",
      "Since 2022, I've been learning web development online — no school,",
      "no bootcamp, just YouTube, curiosity and a whole lot of practice.",
      " ",
      "It all started with HTML and CSS, then JavaScript came along.",
      "That first programming language took me 8 months to truly get comfortable with.",
      "It was tough, but I kept going.",
      " ",
      "I then learned Vue.js, Sass, TypeScript, and React in 2024",
      "with Josh W. Comeau's 'Joy of React' course — one of the best",
      "courses I've ever taken. GSAP and Framer Motion followed,",
      "because web animation is what brings an interface to life.",
      " ",
      "In late 2024, I entered Enzo Ustariz's challenge with a website",
      "for my hometown Conakry — and I landed 3rd place. 🏆",
      "That moment confirmed that my sacrifices were paying off.",
      " ",
      "In 2025, I went deep into Next.js, then landed an internship",
      "at DevelopersHub Corporation — 6 weeks remote, certified",
      "with exceptional distinction.",
      " ",
      "My current stack:",
      "HTML · CSS · Sass · JavaScript · TypeScript · React · Next.js",
      "Vue.js · Tailwind CSS · GSAP · Framer Motion · Git · GitHub · Bun",
      " ",
      "What drives me? Building interfaces that make sense, move well,",
      "and stand the test of time. Coming from a country where tech resources",
      "are scarce, I learned to find solutions with what's available.",
      "And that shapes a very different kind of developer.",
      " ",
      "Type 'projects' to explore my work!",
    ],
  },
];

// ============================================
// DATE & TIME
// ============================================

export const getDateCommandOutput = () => {
  return [
    {
      id: crypto.randomUUID(),
      type: "text" as const,
      content: [getDate()],
    },
  ];
};

export const repoCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `
      <div class="space-y-3 whitespace-normal py-3">
        <p>
          The complete source code for this terminal portfolio is
          publicly available on GitHub:
        </p>

        <a
          href="https://github.com/SouleymaneSy7/terminal-portfolio-website"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/SouleymaneSy7/terminal-portfolio-website
        </a>

        <p>
          Built with Next.js 15, React 19, TypeScript and Tailwind CSS v4.
          Runtime: Bun. Color theme: Catppuccin Macchiato.
        </p>

        <p>
          If you like this project, a ⭐ on GitHub is always appreciated.
          Feel free to fork it and adapt it to your own style.
        </p>

        <p>Made with ❤️ by
          <a
            href="https://github.com/SouleymaneSy7"
            target="_blank"
            rel="noopener noreferrer"
          >
            Souleymane Sy
          </a>
          — self-taught developer from Coyah, Guinea-Conakry.
        </p>
      </div>
     `,
    ],
  },
];

export const getTimeCommandOutput = () => {
  return [
    {
      id: crypto.randomUUID(),
      type: "text" as const,
      content: [getTime()],
    },
  ];
};

// ============================================
// HOSTNAME
// ============================================

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

// ============================================
// WHOAMI
// ============================================

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

// ============================================
// EXIT
// ============================================

export const exitCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      "Goodbye! 👋",
      "Thank you for visiting my terminal portfolio.",
      "You can close this tab to exit.",
      " ",
      "Have a project idea or an opportunity?",
      "Reach out: souleymanesycodes@gmail.com",
      " ",
      "See you around.",
    ],
  },
];

// ============================================
// PROJECTS
// ============================================

export const projectsCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `
      <div class="space-y-3 whitespace-normal py-3">
        <h2 class="text-fs-subtitle font-bold text-primary-clr">
          Fyrre Magazine
        </h2>

        <p>
          My most ambitious project to date. Fyrre is a full-featured digital magazine website,
          designed for an immersive and elegant reading experience.
          Articles, covers, author profiles — everything is crafted to balance
          performance and editorial aesthetics.
        </p>

        <div>
          <h3 class="text-fs-subtitle font-semi-bold mb-2">
            Technologies Used:
          </h3>
          <div>
            <span class="text-tertiary-clr">Next.js</span>
            <span class="text-tertiary-clr">React</span>
            <span class="text-tertiary-clr">MDX</span>
            <span class="text-tertiary-clr">TypeScript</span>
            <span class="text-tertiary-clr">Tailwind CSS</span>
            <span class="text-tertiary-clr">Resend</span>
          </div>
        </div>

        <p>
          Built with Next.js for SSR and SEO optimization, MDX for rich content management,
          and Resend for the integrated newsletter. Result: a 95+ Lighthouse score
          and a 40% reduction in initial load time.
        </p>

        <div>
          <h3 class="text-fs-subtitle font-semi-bold mb-2">Key Highlights:</h3>
          <ul class="list-disc pl-8">
            <li>95+ Lighthouse performance score</li>
            <li>40% reduction in initial load time</li>
            <li>MDX content with embedded React components</li>
            <li>Fully functional newsletter via Resend</li>
            <li>Responsive, mobile-first design</li>
            <li>SEO-optimized with structured metadata</li>
          </ul>
        </div>

        <p>
          View the project live at:
          <a
            href="https://fyrre-magazine-website.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            fyrre-magazine-website.netlify.app
          </a>
          <br />
          And check the source code on:
          <a
            href="https://github.com/SouleymaneSy7/fyrre-magazine-website"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/SouleymaneSy7/fyrre-magazine-website
          </a>
        </p>
      </div>`,

      `<div class="space-y-3 whitespace-normal py-3">
        <h2 class="text-fs-subtitle font-bold text-primary-clr">
          Conakry Tourism Website 🏆
        </h2>

        <p>
          This project was built for a challenge organized by
          <a href="https://discord.gg/9WryX5zs">Le Repaire du Web</a>
          (Discord channel run by YouTuber
          <a href="https://www.youtube.com/@EcoleduWeb">Enzo Ustariz</a>),
          on the theme of creating a tourism website for a city.
          I chose Conakry — the capital of Guinea and my hometown. 🇬🇳
        </p>

        <p>
          <strong class="text-secondary-clr">Ranking achieved</strong>: 🥉 3rd place among 20+ participants.
          A moment I'm truly proud of, after two weeks of intense work.
        </p>

        <p>
          The site showcases Conakry's history, culture and attractions
          with advanced animations, smooth scrolling and an immersive design.
          This is the project that taught me the most about web animation and visual storytelling.
        </p>

        <div>
          <h3 class="text-fs-subtitle font-semi-bold mb-2">Technologies Used:</h3>
          <div>
            <span class="text-tertiary-clr">React</span>
            <span class="text-tertiary-clr">TypeScript</span>
            <span class="text-tertiary-clr">Sass</span>
            <span class="text-tertiary-clr">GSAP</span>
            <span class="text-tertiary-clr">Vite</span>
          </div>
        </div>

        <p>
          View the project live at:
          <a
            href="https://conakry-website-challenge-z4t7.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            conakry-website-challenge-z4t7.vercel.app
          </a>
          <br />
          And check the source code on:
          <a
            href="https://github.com/SouleymaneSy7/conakry-website-challenge"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/SouleymaneSy7/conakry-website-challenge
          </a>
        </p>
    </div>`,

      `<div class="space-y-3 whitespace-normal py-3">
      <h2 class="text-fs-subtitle font-bold text-primary-clr">
        Dictionary Web App
      </h2>

      <p>
        A web dictionary application that lets you search any word and get
        its definition, phonetics and usage examples.
        My first serious project with Vue.js — the one that convinced me
        the Composition API was a real step forward.
      </p>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">
          Technologies Used:
        </h3>
        <div>
          <span class="text-tertiary-clr">Vue.js</span>
          <span class="text-tertiary-clr">Composition API</span>
          <span class="text-tertiary-clr">TailwindCSS</span>
          <span class="text-tertiary-clr">Axios</span>
        </div>
      </div>

      <p>
        Built with Vue.js and the Composition API for modular code organization,
        Axios for API calls, and Tailwind CSS for a clean, responsive design.
      </p>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">Features:</h3>
        <ul class="list-disc pl-5">
          <li>Real-time word search via external API.</li>
          <li>Displays definitions, phonetics and usage examples.</li>
          <li>Responsive design for mobile and desktop.</li>
        </ul>
      </div>

      <p>
        View the project live at:
        <a
          href="https://dictionary-web-app-seven-olive.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          dictionary-web-app-seven-olive.vercel.app
        </a>
        <br />
        And check the source code on:
        <a
          href="https://github.com/SouleymaneSy7/dictionary-web-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/SouleymaneSy7/dictionary-web-app
        </a>
      </p>
    </div>`,

      `<div class="space-y-3 whitespace-normal py-3">
      <h2 class="text-fs-subtitle font-bold text-primary-clr">
        Password Generator
      </h2>

      <p>
        A secure password generator with customizable options:
        length, uppercase letters, special characters. Simple, fast and effective.
        A project I built to deepen my mastery of Vue.js
        and the reactivity of the Composition API.
      </p>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">
          Technologies Used:
        </h3>
        <div>
          <span class="text-tertiary-clr">Vue.js</span>
          <span class="text-tertiary-clr">Composition API</span>
          <span class="text-tertiary-clr">Sass</span>
        </div>
      </div>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">Features:</h3>
        <ul class="list-disc pl-8">
          <li>Customizable password length.</li>
          <li>Toggle uppercase / lowercase letters.</li>
          <li>Toggle special characters.</li>
          <li>Real-time password generation.</li>
          <li>One-click copy to clipboard.</li>
          <li>Responsive design.</li>
        </ul>
      </div>

      <p>
        View the project live at:
        <a
          href="https://vue-js-password-generator.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          vue-js-password-generator.vercel.app
        </a>
        <br />
        And check the source code on:
        <a
          href="https://github.com/SouleymaneSy7/vue-js-password-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/SouleymaneSy7/vue-js-password-generator
        </a>
      </p>
    </div>`,

      `<div class="space-y-3 whitespace-normal py-3">
      <h2 class="text-fs-subtitle font-bold text-primary-clr">
        GitHub User Search
      </h2>

      <p>
        A GitHub profile search tool. Enter any username and get their stats,
        repos, followers and info in real time via the GitHub API.
        A Frontend Mentor challenge I paid particular attention to.
      </p>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">
          Technologies Used:
        </h3>
        <div>
          <span class="text-tertiary-clr">React</span>
          <span class="text-tertiary-clr">TypeScript</span>
          <span class="text-tertiary-clr">Axios</span>
          <span class="text-tertiary-clr">Sass</span>
        </div>
      </div>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">Key Features:</h3>
        <ul class="list-disc pl-8">
          <li>Search GitHub profiles by username.</li>
          <li>Display stats: repos, followers, following.</li>
          <li>Light / dark theme toggle with persistence.</li>
          <li>Error handling and loading states.</li>
          <li>Accessible and responsive UI components.</li>
        </ul>
      </div>

      <p>
        View the project live at:
        <a
          href="https://github-user-search-app-self.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          github-user-search-app-self.vercel.app
        </a>
        <br />
        And check the source code on:
        <a
          href="https://github.com/SouleymaneSy7/github-user-search-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/SouleymaneSy7/github-user-search-app
        </a>
      </p>
    </div>`,
    ],
  },
];

// ============================================
// THEME
// ============================================

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

// ============================================
// NEOFETCH
// ============================================

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

// ============================================
// SUDO
// ============================================

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

// ============================================
// WELCOME
// ============================================

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
      "Type 'help' to see all available commands.",
      "Type 'about' to learn more about me.",
    ],
  },
];

// ============================================
// WEATHER
// ============================================

export const createWeatherOutput = (weather: string) => ({
  id: crypto.randomUUID(),
  type: "text" as const,
  content: weather.split("\n"),
});

export const weatherErrorOutput = (city: string, errorMessage?: string) => ({
  id: crypto.randomUUID(),
  type: "text" as const,
  content: [
    `Error: Could not fetch weather for "${city}"`,
    errorMessage || "Please check the city name and try again.",
    "",
    "Tip: Try with major cities (e.g., Conakry, Paris, New York, Tokyo)",
  ],
});

export const weatherUsageOutput = () => ({
  id: crypto.randomUUID(),
  type: "text" as const,
  content: [
    "Usage: weather <city>",
    "",
    "Examples:",
    "  weather Conakry",
    "  weather Coyah",
    "  weather Paris",
  ],
});

// ============================================
// EMAIL
// ============================================

export const emailCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `
      <div class="space-y-2 py-2">
        <p>You can reach me at:</p>
        <a href="mailto:souleymanesycodes@gmail.com" target="_blank" rel="noreferrer">
          souleymanesycodes@gmail.com
        </a>
        <p>An opportunity, a collaboration, or just saying hi — write to me. I always reply.</p>
      </div>
 `,
    ],
  },
];

// ============================================
// RPS (Rock Paper Scissors)
// ============================================

export const rspCommand = (userInput: string) => {
  const choices = ["rock", "paper", "scissors"];
  const userChoice = userInput.toLocaleLowerCase().trim().split(" ")[0];

  if (!choices.includes(userChoice)) {
    return [
      {
        id: crypto.randomUUID(),
        type: "text" as const,
        content: ["Pick 'rock', 'paper' or 'scissors'! Example: rps rock"],
      },
    ];
  }

  let result;
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  if (userChoice === computerChoice) {
    result = "It's a tie! We think alike. 🤝";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win! Well played, champion! 🏆";
  } else {
    result = "I win! The terminal is merciless. 😄 Try again!";
  }

  return [
    {
      id: crypto.randomUUID(),
      type: "text" as const,
      content: [
        `You chose: ${userChoice}`,
        `I chose: ${computerChoice}`,
        result,
        "Play again? Type 'rps' followed by your choice!",
      ],
    },
  ];
};

// ============================================
// CONTACT
// ============================================

export const contactCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `
      <div class="space-y-3">
        <div class="pt-2">
          <p class="pb-3">Find me across the web:</p>
          
          <div class="space-y-2">
            <div>
              <span class="text-tertiary-clr">Email:</span>
              <a 
                href="mailto:souleymanesycodes@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                souleymanesycodes@gmail.com
              </a>
            </div>
            
            <div>
              <span class="text-tertiary-clr">GitHub:</span>
              <a 
                href="https://github.com/SouleymaneSy7" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                github.com/SouleymaneSy7
              </a>
            </div>

            <div>
              <span class="text-tertiary-clr">LinkedIn:</span>
              <a 
                href="https://linkedin.com/in/souleymanesy7" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                linkedin.com/in/souleymanesy7
              </a>
            </div>
            
            <div>
              <span class="text-tertiary-clr">Twitter / X:</span>
              <a 
                href="https://twitter.com/Souleymanesy43" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                twitter.com/Souleymanesy43
              </a>
            </div>
            
            <div>
              <span class="text-tertiary-clr">Frontend Mentor:</span>
              <a 
                href="https://www.frontendmentor.io/profile/SouleymaneSy7" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                frontendmentor.io/profile/SouleymaneSy7
              </a>
            </div>
            
            <div>
              <span class="text-tertiary-clr">Dev Challenges:</span>
              <a 
                href="https://devchallenges.io/profile/534cd213-3165-4c16-bdcf-058e1f468da0" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                devchallenges.io/profile/SouleymaneSy7
              </a>
            </div>
          </div>
          
          <p class="pt-4">
            Available for freelance, collaboration, internship or remote position.
            Feel free to reach out — I always reply.
          </p>
        </div>
      </div>
      `,
    ],
  },
];
