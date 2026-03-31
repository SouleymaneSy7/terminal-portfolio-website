import {
  getThemeLabel,
  getCurrentTheme,
  getFontLabel,
  getCurrentFont,
} from "./theme-command";

export const getRepoCommandOutput = () => {
  const themeLabel = getThemeLabel(getCurrentTheme());
  const fontLabel = getFontLabel(getCurrentFont());

  return [
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
          Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.
          Runtime: Bun.
          Color theme: ${themeLabel}.
          Font theme: ${fontLabel}.
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
};

export const getProjectsCommandOutput = () => [
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
          I chose Conakry — the capital of Guinea and my hometown.
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
