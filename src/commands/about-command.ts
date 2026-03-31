export const getAboutMeCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-3 py-1">

        <div class="space-y-1">
          <p>👋 Hey, I'm Souleymane Sy!</p>
          <p> </p>
          <p>Self-taught frontend web developer, based in Coyah, Guinea-Conakry.</p>
          <p>Since 2022, I've been learning web development online — no school,</p>
          <p>no bootcamp, just YouTube, curiosity and a whole lot of practice.</p>
          <p> </p>
          <p>It all started with HTML and CSS, then JavaScript came along.</p>
          <p>That first programming language took me 8 months to truly get comfortable with.</p>
          <p>It was tough, but I kept going.</p>
          <p> </p>
          <p>I then learned Vue.js, Sass, TypeScript, and React in 2024</p>
          <p>with Josh W. Comeau's 'Joy of React' course — one of the best</p>
          <p>courses I've ever taken. GSAP and Framer Motion followed,</p>
          <p>because web animation is what brings an interface to life.</p>
          <p> </p>
          <p>In late 2024, I entered Enzo Ustariz's challenge with a website</p>
          <p>for my hometown Conakry — and I landed 3rd place. 🏆</p>
          <p>That moment confirmed that my sacrifices were paying off.</p>
          <p> </p>
          <p>In 2025, I went deep into Next.js, then landed an internship</p>
          <p>at DevelopersHub Corporation — 6 weeks remote, certified</p>
          <p>with exceptional distinction.</p>
          <p> </p>
          <p>My current stack:</p>
          <p>HTML · CSS · Sass · JavaScript · TypeScript · React · Next.js</p>
          <p>Vue.js · Tailwind CSS · GSAP · Framer Motion · Git · GitHub · Bun</p>
          <p> </p>
          <p>What drives me? Building interfaces that make sense, move well,</p>
          <p>and stand the test of time. Coming from a country where tech resources</p>
          <p>are scarce, I learned to find solutions with what's available.</p>
          <p>And that shapes a very different kind of developer.</p>
        </div>

        <div class="space-y-0.5">
          <p>
            Type
            <span> '</span><span class="text-tertiary-clr font-bold">projects</span><span>'</span>
            to explore my work!
          </p>
        </div>

      </div>`,
    ],
  },
];
