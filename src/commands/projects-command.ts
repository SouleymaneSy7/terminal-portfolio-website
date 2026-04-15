export const getRepoCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">This Portfolio</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>A terminal that tells a story — mine.</p>
          <p>31 themes, 4 fonts, tab completion, a quiz, API integrations,</p>
          <p>and every command written with care. Built to show, not just say.</p>
          <a
            href="https://github.com/SouleymaneSy7/terminal-portfolio-website"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/SouleymaneSy7/terminal-portfolio-website
          </a>
          <p>If it resonates, a ⭐ on GitHub means a lot.</p>
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
      // ── Fyrre Magazine ───────────────────────────────────────
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">Fyrre Magazine</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>My most ambitious project. A full digital magazine — articles,</p>
          <p>author profiles, categories, newsletter. Every detail deliberate.</p>
          <p>This is where Next.js finally clicked at the architecture level.</p>
          <p>I wasn't just using the framework anymore. I was thinking in it.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Technologies used</p>
          <p>
            <span class="text-tertiary-clr">Next.js</span> ·
            <span class="text-tertiary-clr">React</span> ·
            <span class="text-tertiary-clr">TypeScript</span> ·
            <span class="text-tertiary-clr">MDX</span> ·
            <span class="text-tertiary-clr">Tailwind CSS</span> ·
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

      // ── Conakry Tourism Website ──────────────────────────────
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">Conakry Tourism Website  🏆</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>This one is personal. Enzo Ustariz's contest — September 2024.</p>
          <p>Theme: build a tourism website for any city.</p>
          <p>I chose Conakry without hesitation. My capital. My home.</p>
          <p>A city I wanted the world to see with different eyes.</p>
          <p>Two weeks. Long nights. Every animation chosen with intent.</p>
          <p>Culture, history, landmarks — a love letter written in code.</p>
          <p>
            <span class="text-tertiary-clr font-bold">🥉 3rd place</span>
            out of 20+ participants — Le Repaire du Web.
          </p>
          <p>The moment I saw those results, three years of sacrifice made sense.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Technologies used</p>
          <p>
            <span class="text-tertiary-clr">React</span> ·
            <span class="text-tertiary-clr">TypeScript</span> ·
            <span class="text-tertiary-clr">Sass</span> ·
            <span class="text-tertiary-clr">GSAP</span> ·
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

      // ── Dictionary Web App ───────────────────────────────────
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">Dictionary Web App</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>My first serious project with Vue.js — and the one that made me</p>
          <p>fall in love with the Composition API.</p>
          <p>Search any word. Get its definition, phonetics, usage examples.</p>
          <p>Simple on the surface. But this is where async patterns,</p>
          <p>state management, and API integration finally clicked — for real.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Technologies used</p>
          <p>
            <span class="text-tertiary-clr">Vue.js</span> ·
            <span class="text-tertiary-clr">Composition API</span> ·
            <span class="text-tertiary-clr">Tailwind CSS</span> ·
            <span class="text-tertiary-clr">Axios</span>
          </p>
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

      // ── Password Generator ───────────────────────────────────
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">Password Generator</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Built to deepen my Vue.js mastery — deliberately kept small.</p>
          <p>Frontend Mentor taught me that scope doesn't equal quality.</p>
          <p>A clean utility: custom length, character sets, one-click copy.</p>
          <p>Every option reactive, every state handled properly.</p>
          <p>Small scope, real craft — that became my standard.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Technologies used</p>
          <p>
            <span class="text-tertiary-clr">Vue.js</span> ·
            <span class="text-tertiary-clr">Composition API</span> ·
            <span class="text-tertiary-clr">Sass</span>
          </p>
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

      // ── GitHub User Search ───────────────────────────────────
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">GitHub User Search</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>A Frontend Mentor challenge I treated like a production app.</p>
          <p>Enter any GitHub username. Repos, followers, bio, location —</p>
          <p>all from the GitHub API, in real time.</p>
          <p>I paid attention to what beginners skip: empty states, loading states,</p>
          <p>error handling, dark mode with localStorage persistence.</p>
          <p>The details are what separate a challenge from a product.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Technologies used</p>
          <p>
            <span class="text-tertiary-clr">React</span> ·
            <span class="text-tertiary-clr">TypeScript</span> ·
            <span class="text-tertiary-clr">Axios</span> ·
            <span class="text-tertiary-clr">Sass</span>
          </p>
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

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>89+ repos on GitHub. Each one a step forward, none of them faked.</p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">repo</span><span aria-hidden="true">'</span>
            to see the source for this portfolio.
          </p>
        </div>

      </div>`,
    ],
  },
];
