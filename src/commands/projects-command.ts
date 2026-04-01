export const getRepoCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">This Portfolio</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>The complete source code is publicly available on GitHub:</p>
          <a
            href="https://github.com/SouleymaneSy7/terminal-portfolio-website"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/SouleymaneSy7/terminal-portfolio-website
          </a>
          <p>Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.</p>
          <p>Runtime: Bun.</p>
          <p>If you like this project, a ⭐ on GitHub is always appreciated.</p>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">projects</span><span aria-hidden="true">'</span>
            to browse my other work.
          </p>
        </div>

      </div>`,
    ],
  },
];

export const getProjectsCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">Fyrre Magazine</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>My most ambitious project to date. A full-featured digital magazine website</p>
          <p>designed for an immersive and elegant reading experience. Articles, covers,</p>
          <p>author profiles — crafted to balance performance and editorial aesthetics.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Technologies Used</p>
          <p>
            <span class="text-tertiary-clr">Next.js</span>  ·
            <span class="text-tertiary-clr">React</span>  ·
            <span class="text-tertiary-clr">MDX</span>  ·
            <span class="text-tertiary-clr">TypeScript</span>  ·
            <span class="text-tertiary-clr">Tailwind CSS</span>  ·
            <span class="text-tertiary-clr">Resend</span>
          </p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Highlights</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  95+ Lighthouse performance score</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  40% reduction in initial load time</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  MDX content with embedded React components</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Fully functional newsletter via Resend</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Responsive, mobile-first design</p>
        </div>

        <div class="space-y-t-group">
          <p>
            <span class="text-secondary-clr">Live    <span aria-hidden="true">→</span> </span>
            <a href="https://fyrre-magazine-website.netlify.app/" target="_blank" rel="noopener noreferrer">
              fyrre-magazine-website.netlify.app
            </a>
          </p>
          <p>
            <span class="text-secondary-clr">Source  <span aria-hidden="true">→</span> </span>
            <a href="https://github.com/SouleymaneSy7/fyrre-magazine-website" target="_blank" rel="noopener noreferrer">
              github.com/SouleymaneSy7/fyrre-magazine-website
            </a>
          </p>
        </div>

      </div>`,

      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">Conakry Tourism Website  🏆</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Built for a challenge by Le Repaire du Web (Enzo Ustariz's Discord).</p>
          <p>Theme: create a tourism website for a city. I chose Conakry — the capital</p>
          <p>of Guinea and my hometown.</p>
          <p>
            <span class="text-tertiary-clr font-bold">🥉 3rd place</span>
            among 20+ participants — a moment I'm truly proud of.
          </p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Technologies Used</p>
          <p>
            <span class="text-tertiary-clr">React</span>  ·
            <span class="text-tertiary-clr">TypeScript</span>  ·
            <span class="text-tertiary-clr">Sass</span>  ·
            <span class="text-tertiary-clr">GSAP</span>  ·
            <span class="text-tertiary-clr">Vite</span>
          </p>
        </div>

        <div class="space-y-t-group">
          <p>
            <span class="text-secondary-clr">Live    <span aria-hidden="true">→</span> </span>
            <a href="https://conakry-website-challenge-z4t7.vercel.app/" target="_blank" rel="noopener noreferrer">
              conakry-website-challenge-z4t7.vercel.app
            </a>
          </p>
          <p>
            <span class="text-secondary-clr">Source  <span aria-hidden="true">→</span> </span>
            <a href="https://github.com/SouleymaneSy7/conakry-website-challenge" target="_blank" rel="noopener noreferrer">
              github.com/SouleymaneSy7/conakry-website-challenge
            </a>
          </p>
        </div>

      </div>`,

      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">Dictionary Web App</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Search any word and get its definition, phonetics and usage examples.</p>
          <p>My first serious project with Vue.js — the one that convinced me the</p>
          <p>Composition API was a real step forward.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Technologies Used</p>
          <p>
            <span class="text-tertiary-clr">Vue.js</span>  ·
            <span class="text-tertiary-clr">Composition API</span>  ·
            <span class="text-tertiary-clr">Tailwind CSS</span>  ·
            <span class="text-tertiary-clr">Axios</span>
          </p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Features</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Real-time word search via external API</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Definitions, phonetics and usage examples</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Responsive design for mobile and desktop</p>
        </div>

        <div class="space-y-t-group">
          <p>
            <span class="text-secondary-clr">Live    <span aria-hidden="true">→</span> </span>
            <a href="https://dictionary-web-app-seven-olive.vercel.app/" target="_blank" rel="noopener noreferrer">
              dictionary-web-app-seven-olive.vercel.app
            </a>
          </p>
          <p>
            <span class="text-secondary-clr">Source  <span aria-hidden="true">→</span> </span>
            <a href="https://github.com/SouleymaneSy7/dictionary-web-app" target="_blank" rel="noopener noreferrer">
              github.com/SouleymaneSy7/dictionary-web-app
            </a>
          </p>
        </div>

      </div>`,

      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">Password Generator</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Secure password generator with customizable options — length, uppercase,</p>
          <p>special characters. Built to deepen my Vue.js Composition API mastery.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Technologies Used</p>
          <p>
            <span class="text-tertiary-clr">Vue.js</span>  ·
            <span class="text-tertiary-clr">Composition API</span>  ·
            <span class="text-tertiary-clr">Sass</span>
          </p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Features</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Customizable length and character sets</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Real-time password generation</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  One-click copy to clipboard</p>
        </div>

        <div class="space-y-t-group">
          <p>
            <span class="text-secondary-clr">Live    <span aria-hidden="true">→</span> </span>
            <a href="https://vue-js-password-generator.vercel.app/" target="_blank" rel="noopener noreferrer">
              vue-js-password-generator.vercel.app
            </a>
          </p>
          <p>
            <span class="text-secondary-clr">Source  <span aria-hidden="true">→</span> </span>
            <a href="https://github.com/SouleymaneSy7/vue-js-password-generator" target="_blank" rel="noopener noreferrer">
              github.com/SouleymaneSy7/vue-js-password-generator
            </a>
          </p>
        </div>

      </div>`,

      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">GitHub User Search</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Enter any GitHub username and get their stats, repos, followers</p>
          <p>and info in real time. A Frontend Mentor challenge I paid particular attention to.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Technologies Used</p>
          <p>
            <span class="text-tertiary-clr">React</span>  ·
            <span class="text-tertiary-clr">TypeScript</span>  ·
            <span class="text-tertiary-clr">Axios</span>  ·
            <span class="text-tertiary-clr">Sass</span>
          </p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Features</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Search GitHub profiles by username</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Stats: repos, followers, following</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Light / dark theme toggle with persistence</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  Error handling and loading states</p>
        </div>

        <div class="space-y-t-group">
          <p>
            <span class="text-secondary-clr">Live    <span aria-hidden="true">→</span> </span>
            <a href="https://github-user-search-app-self.vercel.app/" target="_blank" rel="noopener noreferrer">
              github-user-search-app-self.vercel.app
            </a>
          </p>
          <p>
            <span class="text-secondary-clr">Source  <span aria-hidden="true">→</span> </span>
            <a href="https://github.com/SouleymaneSy7/github-user-search-app" target="_blank" rel="noopener noreferrer">
              github.com/SouleymaneSy7/github-user-search-app
            </a>
          </p>
        </div>

      </div>`,
    ],
  },
];
