import packageJson from "../../package.json";
import { getDate, getTime } from "@/utils/date";

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
  "email",
  "help",
  "hostname",
  "joke",
  "neofetch",
  "projects",
  "quote",
  "repo",
  "sudo",
  "theme",
  "time",
  "welcome",
  "weather",
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
      "  repo      - View source code and project details.",
      "  weather   - Get current weather for a given city (Example: weather Paris)",
      "  email     - Display my email address with a fun message.",
      " ",
      "Fun:",
      " ",
      "  sudo      - Attempt to gain admin access (Try it!)",
      "  welcome   - Display the welcome message and banner.",
      "  joke      - Get a random programming joke.",
      "  quote     - Get an inspiring or funny quote.",
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
          https://github.com/souleymanesy7/terminal-portfolio-website
        </a>

        <p>Star this project if you like it!</p>
        <p>Feel free to fork and customize for your own use.</p>
        <p>Made with ❤️ by
          <a
            href="https://github.com/SouleymaneSy7"
            target="_blank"
            rel="noopener noreferrer"
          >
            Souleymane Sy
          </a>
        </p>
      </div>
     `,
    ],
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
      `
      <div class="space-y-3 whitespace-normal py-3">
        <h2 class="text-fs-subtitle font-bold text-primary-clr">
          Fyrre Magazine
        </h2>

        <p>
          Fyrre - A modern digital magazine, blog and podcast platform built with Next.js, React, MDX, Typescript and TailwindCSS. Delivering an immersive reading experience with an elegant interface, optimized performance, and responsive design. Perfect for digital content.
        </p>

        <p>
          The website showcases editorial content in an elegant and immersive way, featuring a clean, minimalist design with a focus on typography and visual storytelling. It presents articles, magazine covers, and author profiles in a sophisticated layout that emphasizes readability and user engagement.
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
          </div>
        </div>

        <p>
          The project was built using Next.js for server-side rendering and optimal performance, React for building interactive UI components, MDX for writing content with embedded components, TypeScript for type-safe development, and Tailwind CSS for modern, utility-first styling. The website utilizes Next.js Image optimization for fast loading times and improved user experience. The responsive design ensures perfect display on mobile, tablet, and desktop devices.
        </p>

        <div>
          <h3 class="text-fs-subtitle font-semi-bold mb-2">Key Features:</h3>
          <ul class="list-disc pl-8">
            <li>Modern magazine-style layout with editorial focus</li>
            <li>MDX-powered content management for rich text and components</li>
            <li>Optimized image loading with Next.js Image component</li>
            <li>Responsive design for all screen sizes</li>
            <li>Clean typography and minimalist aesthetic</li>
            <li>Author profiles and article showcase</li>
            <li>Smooth page transitions and animations</li>
            <li>SEO-optimized with meta tags and structured data</li>
            <li>Blog and podcast platform integration</li>
          </ul>
        </div>

        <p>
          The website provides an immersive reading experience with articles like "Hope Dies Last" that explore deep, reflective topics. Each article is presented with beautiful imagery and thoughtful design that enhances the content, making it perfect for digital magazines, blogs, and podcast platforms.
        </p>

        <p>
          You can view the project live on:
          
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
            github.com/SouleymaneSy7/conakry-website-challenge
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
          github.com/SouleymaneSy7/dictionary-web-app
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
          github.com/SouleymaneSy7/vue-js-password-generator
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
          github.com/SouleymaneSy7/github-user-search-app
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
    "Tip: Try with major cities (e.g., Paris, London, Tokyo)",
  ],
});

export const weatherUsageOutput = () => ({
  id: crypto.randomUUID(),
  type: "text" as const,
  content: [
    "Usage: weather <city>",
    "",
    "Examples:",
    "  weather Paris",
    "  weather New York",
  ],
});

export const emailCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `
      <div class="space-y-2 py-2">
        <p>You can reach me at:</p>
        <a href="mailto:souleymanesydeveloppers@gmail.com" target="_blank" rel="noreferrer">
          souleymanesydeveloppers@gmail.com
        </a>
        <p>Write me a message — just to say hi or make a new friend.</p>
      </div>
 `,
    ],
  },
];
