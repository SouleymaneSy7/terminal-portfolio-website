export const getAboutMeCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">👋 Hey, I'm Souleymane Sy!</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Self-taught frontend web developer, based in Coyah, Guinea-Conakry.</p>
          <p>Since 2022, I've been learning web development online — no school,</p>
          <p>no bootcamp, just YouTube, online platform (Udemy, FreeCodeCamp, Scrimba...),</p>
          <p>curiosity and a whole lot of practice.</p>
          <p>It all started with HTML and CSS, then JavaScript came along.</p>
          <p>That first language took me 8 months to truly get comfortable with.</p>
          <p>It was tough, but I kept going.</p>
          <p>I then learned Vue.js, Sass, TypeScript, and React in 2024</p>
          <p>with Josh W. Comeau's Joy of React course — one of the best I've ever taken.</p>
          <p>GSAP and Framer Motion followed, because animation brings interfaces to life.</p>
          <p>In late 2024, I entered Enzo Ustariz's challenge with a site for my hometown</p>
          <p>Conakry — and I landed <span class="text-tertiary-clr font-bold">3rd place</span>. 🏆 That confirmed my sacrifices were paying off.</p>
          <p>In 2025, I landed an internship at DevelopersHub Corporation — 6 weeks</p>
          <p>remote, certified with <span class="text-tertiary-clr font-bold">exceptional distinction</span>. ⭐</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Current Stack</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            <span class="text-tertiary-clr">HTML</span> ·
            <span class="text-tertiary-clr">CSS</span> ·
            <span class="text-tertiary-clr">Sass</span> ·
            <span class="text-tertiary-clr">JavaScript</span> ·
            <span class="text-tertiary-clr">TypeScript</span> ·
            <span class="text-tertiary-clr">React</span> ·
            <span class="text-tertiary-clr">Next.js</span>
          </p>
          <p>
            <span class="text-tertiary-clr">Vue.js</span> ·
            <span class="text-tertiary-clr">Tailwind CSS</span> ·
            <span class="text-tertiary-clr">GSAP</span> ·
            <span class="text-tertiary-clr">Framer Motion</span> ·
            <span class="text-tertiary-clr">Git</span> ·
            <span class="text-tertiary-clr">Bun</span>
          </p>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">projects</span><span aria-hidden="true">'</span>
            to explore my work.
          </p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">contact</span><span aria-hidden="true">'</span>
            to get in touch.
          </p>
        </div>

      </div>`,
    ],
  },
];
