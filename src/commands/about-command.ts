/**
 * About Command
 *
 * Displays personal story, background, journey and tech stack.
 *
 * @example
 * ```bash
 * about
 * about --help
 * ```
 */

import type { CommandHistoryOutputType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createHtmlOutput } from "@/utils/output";
import { ABOUT_HELP } from "@/constants/help/info";

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function buildAboutOutput(): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">👋 Hey, I'm Souleymane Sy</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Self-taught frontend developer from Coyah, Guinea-Conakry 🇬🇳</p>
        <p>I started in 2022 with no school, no bootcamp, no mentor in the room.</p>
        <p>Just a laptop, a connection that cut out more than it held,</p>
        <p>and an obsession with understanding how the web actually works.</p>
        <p>That's still exactly how I operate today.</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">The beginning — HTML, CSS, and 8 months of JavaScript</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>I started where everyone does. HTML felt logical.</p>
        <p>CSS hooked me — Kevin Powell taught me to think in layouts,</p>
        <p>Grafikart made the French-speaking web feel like a place I belonged.</p>
        <p>Then came JavaScript. My first real programming language.</p>
        <p>It took me <span class="text-tertiary-clr font-bold">8 months</span> to feel truly comfortable with it.</p>
        <p>8 months of confusion, errors I couldn't explain, sessions</p>
        <p>that ended with more questions than answers. And I kept going.</p>
        <p>Brad Traversy, Net Ninja, FreeCodeCamp, Scrimba — I consumed everything.</p>
        <p>Then Frontend Mentor became my training ground: real designs,</p>
        <p>real constraints, no hand-holding. Over <span class="text-tertiary-clr font-bold">50 challenges</span>.</p>
      </div>
    </div>

    <div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Vue.js, TypeScript, React — building the real stack</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>After JavaScript clicked, I moved into frameworks.</p>
        <p>Vue.js first — beginner-friendly, but serious under the hood.</p>
        <p>Its Composition API changed how I think about reactive UI entirely.</p>
        <p>Then TypeScript. Discovering static typing felt like turning on the lights</p>
        <p>in a dark room. Safer code, fewer surprises, more intentional craft.</p>
        <p>In 2024, I learned React — through Josh W. Comeau's <span class="text-tertiary-clr font-bold">Joy of React</span>,</p>
        <p>one of the finest courses I've ever followed.</p>
        <p>It didn't just teach React. It taught me to think like a developer.</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">GSAP, Framer Motion — because static interfaces bore me</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Animation is the layer between code and emotion.</p>
        <p>Framer Motion made React feel alive. GSAP gave me precision</p>
        <p>over every frame, every transition, every scroll interaction.</p>
        <p>That combination is now part of everything I build.</p>
      </div>
    </div>

    <div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">The milestone — 3rd place, Le Repaire du Web 2024 🏆</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>September 2024. Enzo Ustariz's contest. Theme: build a tourism site.</p>
        <p>I didn't hesitate. I chose Conakry — my capital, my home.</p>
        <p>Three weeks of intense work. Long nights. Every section thought through.</p>
        <p>React, TypeScript, Sass, GSAP — pride baked into every commit.</p>
        <p><span class="text-tertiary-clr font-bold">3rd place</span> out of 20+ participants. 🥉</p>
        <p>That result confirmed what I needed to hear:</p>
        <p>geography is not destiny. Effort compounds. Results follow.</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">First professional experience — DevelopersHub Corp. ⭐</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>May 2025. My first internship at DevelopersHub Corporation — fully remote.</p>
        <p>6 to 7 weeks. Real projects, real clients, real deadlines.</p>
        <p>I built components, fixed bugs, integrated APIs, worked across time zones.</p>
        <p>I left with a certificate of <span class="text-tertiary-clr font-bold">exceptional distinction</span>.</p>
        <p>Not given lightly. Earned.</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">By the numbers</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          <span class="text-tertiary-clr font-bold">3</span><span> years of self-teaching</span>
          <span class="text-text-clr opacity-sep"> · </span>
          <span class="text-tertiary-clr font-bold">89+</span><span> GitHub repos</span>
          <span class="text-text-clr opacity-sep"> · </span>
          <span class="text-tertiary-clr font-bold">50+</span><span> challenges</span>
        </p>
        <p>
          <span class="text-tertiary-clr font-bold">1</span><span> contest podium</span>
          <span class="text-text-clr opacity-sep"> · </span>
          <span class="text-tertiary-clr font-bold">1</span><span> certified internship</span>
          <span class="text-text-clr opacity-sep"> · </span>
          <span class="text-tertiary-clr font-bold">0</span><span> shortcuts taken</span>
        </p>
      </div>

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Current stack</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          <span class="text-tertiary-clr">HTML</span> ·
          <span class="text-tertiary-clr">CSS</span> ·
          <span class="text-tertiary-clr">Sass</span> ·
          <span class="text-tertiary-clr">JavaScript</span> ·
          <span class="text-tertiary-clr">TypeScript</span>
        </p>
        <p>
          <span class="text-tertiary-clr">React</span> ·
          <span class="text-tertiary-clr">Next.js</span> ·
          <span class="text-tertiary-clr">Vue.js</span> ·
          <span class="text-tertiary-clr">Tailwind CSS</span>
        </p>
        <p>
          <span class="text-tertiary-clr">GSAP</span> ·
          <span class="text-tertiary-clr">Framer Motion</span> ·
          <span class="text-tertiary-clr">Git</span> ·
          <span class="text-tertiary-clr">Bun</span>
        </p>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">projects</span>${DT.decorators.quote}
          to see what I've built.
        </p>
        <p>
          Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">contact</span>${DT.decorators.quote}
          to reach me directly.
        </p>
      </div>
    </div>`,
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER (exported)
// ─────────────────────────────────────────────────────────────────

export const handleAboutCommand = (args: string[]): CommandHistoryOutputType => {
  const { flags } = parseArgs(args);
  if (flags.help) return ABOUT_HELP;

  return buildAboutOutput();
};
