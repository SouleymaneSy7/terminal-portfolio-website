import { getDate, getTime } from "@/utils/date";
import packageJson from "../../package.json";

const packages = Object.keys(packageJson.dependencies);

const resolutionWidth = global.window && window.screen.availWidth;
const resolutionHeight = global.window && window.screen.availHeight;

const resolution = `${resolutionWidth}x${resolutionHeight}`;

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

export const commands = [
  "about",
  "clear",
  "date",
  "exit",
  "help",
  "hostname",
  "neofetch",
  "projects",
  "sudo",
  "theme",
  "time",
  "welcome",
  "whoami",
];

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
      "  hostname  - Display the system hostname.",
      "  neofetch  - Display system and user information.",
      "  theme     - Change the terminal color theme (Coming soon...).",
      " ",
      "Information:",
      " ",
      "  about     - Learn more about me and my background.",
      "  date      - Display current date.",
      "  time      - Display current time.",
      "  whoami    - Display current user identity.",
      "  projects  - Browse my portfolio projects.",
      " ",
      "Fun:",
      " ",
      "  sudo      - Attempt to gain admin access (Try it!)",
      "  welcome   - Display the welcome message and banner.",
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
      "Type 'projects' to explore my work!",
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
    type: "html" as const,
    content: [
      `<div class="space-y-3 whitespace-normal py-3">
        <h2 class="text-fs-subtitle font-bold text-primary-clr">
          Conakry Website Challenge
        </h2>

        <p>
          This project was created as part of a contest organized by
          <a
            href="https://discord.gg/9WryX5zs"
          >
            Le Repaire du Web
          </a>
          (Discord channel run by YouTuber
          <a
            href="https://www.youtube.com/@EcoleduWeb"
          >
            Enzo Ustariz
          </a>) with the theme of creating a website for a city. I chose to highlight
          Conakry, the capital of Guinea and my hometown. <br />
        </p>

        <p>
          <strong class="text-secondary-clr">Ranking obtained</strong>: 🥉 3rd
          place among a dozen participants.
        </p>

        <p>
          The website is a single-page application (SPA) that provides information
          about Conakry, including its history, culture, and attractions. It
          features a responsive design, ensuring a seamless user experience across
          devices.
        </p>

        <div>
          <h3 class="text-fs-subtitle font-semi-bold mb-2">Technologies Used:</h3>
          <div>
            <span class="text-tertiary-clr">React</span>
            <span class="text-tertiary-clr">TypeScript</span>
            <span class="text-tertiary-clr">Sass</span>
            <span class="text-tertiary-clr">Vite</span>
          </div>
        </div>

        <p>
          The project was developed using React and TypeScript, with a focus on
          clean code and best practices. I utilized Vite as the build tool for its
          fast development experience and efficient bundling. The styling was done
          using Sass, allowing for modular and maintainable CSS. The website is
          hosted on Vercel, making it easily accessible to users.
        </p>

        <p>
          You can view the project live on:
          <a
            href="https://conakry-website-challenge-z4t7.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            conakry-website-challenge-z4t7.vercel.app
          </a> <br />
          And check the source code on:
          <a
            href="https://github.com/SouleymaneSy7/conakry-website-challenge"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
    </div>`,
      `<div class="space-y-3 whitespace-normal py-3">
      <h2 class="text-fs-subtitle font-bold text-primary-clr">
        Dictionary Web App
      </h2>

      <p>
        This project is a dictionary web app that allows users to search for
        words and view their definitions. The app provides a simple and
        intuitive interface for users to explore the meanings of various words.
        It is designed to be fast and responsive, ensuring a smooth user
        experience. The app fetches data from an external API, providing
        accurate and up-to-date information about words and their meanings.
      </p>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">
          Technologies Used:
        </h3>
        <div>
          <span class="text-tertiary-clr">Vue.js</span>
          <span class="text-tertiary-clr">Composition-API</span>
          <span class="text-tertiary-clr">TailwindCSS</span>
          <span class="text-tertiary-clr">Axios</span>
        </div>
      </div>

      <p>
        The project was developed using Vue.js, a progressive JavaScript
        framework, and Tailwind CSS, a utility-first CSS framework. It utilizes
        the Composition API for better organization and reusability of code. The
        app fetches data from an external API using Axios, a promise-based HTTP
        client for the browser and Node.js.
      </p>
      
      <p>
        The app is designed to be user-friendly and visually appealing, with a
        focus on providing a smooth experience for users. The responsive design
        ensures that the app looks great on both mobile and desktop devices.
      </p>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">Key Features:</h3>
        <ul class="list-disc pl-5">
          <li>Responsive design for mobile and desktop devices.</li>
          <li>Dynamic content loading using Axios.</li>
          <li>Interactive user interface with Vue.js.</li>
        </ul>
      </div>

      <p>
        You can view the project live on:
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
          GitHub
        </a>
      </p>
    </div>`,
      `<div class="space-y-3 whitespace-normal py-3">
      <h2 class="text-fs-subtitle font-bold text-primary-clr">
        Password Generator
      </h2>

      <p>
        The Password Generator is a web application that generates secure
        passwords based on user-defined criteria. Users can specify the length
        of the password and choose whether to include uppercase and special characters. The
        application provides a simple and intuitive interface for generating and
        copying passwords.
      </p>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">
          Technologies Used:
        </h3>
        <div>
          <span class="text-tertiary-clr">Vue.js</span>
          <span class="text-tertiary-clr">Composition-API</span>
          <span class="text-tertiary-clr">Sass</span>
        </div>
      </div>

      <p>
        The project was developed using Vue.js and the Composition API, with a
        focus on clean code and best practices. The styling was done using Sass,
        allowing for modular and maintainable CSS. The application is hosted on
        Vercel, making it easily accessible to users.
      </p>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">Features:</h3>
        <ul class="list-disc pl-8">
          <li>Customizable password length.</li>
          <li>Option to include/exclude uppercase letters.</li>
          <li>Option to include/exclude special characters.</li>
          <li>Real-time password generation.</li>
          <li>Responsive design for mobile and desktop.</li>
          <li>Copy to clipboard functionality.</li>
        </ul>
      </div>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">How to Use:</h3>
        <ol class="list-decimal pl-11">
          <li>Select the desired password length.</li>
          <li>Choose whether to include uppercase letters.</li>
          <li>Choose whether to include special characters.</li>
          <li>Click the "Generate Password" button.</li>
          <li>Copy the generated password to your clipboard.</li>
        </ol>
      </div>

      <p>
        You can view the project live on:
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
          GitHub
        </a>
      </p>
    </div>`,
      `<div class="space-y-3 whitespace-normal py-3">
      <h2 class="text-fs-subtitle font-bold text-primary-clr">
        Github User Search
      </h2>

      <p>
        This is a simple application that allows you to search for Github users
        and view their profile information. It uses the Github API to fetch user
        data and display it in a user-friendly interface. It allows you to search for users by their username, and displays their profile information, including their name, bio, location,
        and number of followers. The application is designed to be simple and easy to use, with a clean
        and modern interface.
      </p>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">
          Technologies Used:
        </h3>
        <div>
          <span class="text-tertiary-clr">React</span>
          <span class="text-tertiary-clr">Typescript</span>
          <span class="text-tertiary-clr">Axios</span>
          <span class="text-tertiary-clr">Sass</span>
        </div>
      </div>

      <p>
        The application is built using React and Typescript, and uses Axios for
        making API requests. The user interface is styled with Sass, and the
        application is responsive and works well on both desktop and mobile
        devices. There is a theme toggler that allows you to switch between
        light and dark modes, and the application is designed to be accessible
        and easy to use for all users. It is a great example of how to use these
        technologies to build a simple application that can be used to search
        for and view user information.
      </p>

      <div>
        <h3 class="text-fs-subtitle font-semi-bold mb-2">Key Features:</h3>
        <ul class="list-disc pl-8">
          <li>Search for Github users by username.</li>
          <li>View user profile information.</li>
          <li>Real-time search functionality.</li>
          <li>Dark/Light theme toggle with persistent settings</li>
          <li>Accessible UI components</li>
          <li>Responsive design for mobile and desktop.</li>
          <li>Error handling and loading states</li>
        </ul>
      </div>

      <p>
        You can view the project live on:
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
          GitHub
        </a>
      </p>
    </div>`,
    ],
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
      `                  .:::.                     OS:  Browser`,
      "                 .:::::.                    Host: Vercel Platform",
      "             ***.:::::::.***                Kernel: Latest V8 Engine",
      "        *******.:::::::::.*******           Shell: NextJS Terminal v1.0",
      "      ********.:::::::::::.********         DE: Next.js 15.2.3",
      "     ********.:::::::::::::.********        Theme: Dark Mode (Monokai Pro Theme)",
      "     *******.::::::'***`::::.*******        Resolution: " + resolution,
      "     ******.::::'*********`::.******        Packages: " +
        (packages.length + 1) +
        " (Dependencies)," +
        (packages.length + 1) +
        " (Dev Dependencies)",
      "      ****.:::'*************`:.****         ",
      "        *.::'*****************`.*           Technologies:",
      "        .:'  ***************    .           • Framework: Next.js 15, React 19, ",
      "       .                                    • Language: TypeScript",
      "                                            • Styling: TailwindCSS V4",
      "                                            • Package Manager: Bun",
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
