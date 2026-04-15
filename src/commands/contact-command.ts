export const getEmailCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Email</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Three years of late nights and stubborn learning have brought me here.</p>
          <p>If you have a project, an opportunity, or just want to talk code —</p>
          <p>my inbox is always open. I reply to every message.</p>
          <a href="mailto:souleymanesycodes@gmail.com" target="_blank" rel="noopener noreferrer">
            souleymanesycodes@gmail.com
          </a>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">contact</span><span aria-hidden="true">'</span>
            to see all my social links.
          </p>
        </div>

      </div>`,
    ],
  },
];

export const getContactCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Let's connect</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>I'm a self-taught developer from Coyah, Guinea-Conakry.</p>
          <p>I've been building in public since 2022 — every repo, every challenge,</p>
          <p>every project is documented. Come see the work, not just the resume.</p>
        </div>

        <div class="space-y-t-group">
          <p>
            <span class="text-primary-clr font-bold">Email          </span>
            <span>-</span>
            <a href="mailto:souleymanesycodes@gmail.com" target="_blank" rel="noopener noreferrer">
              souleymanesycodes@gmail.com
            </a>
          </p>

          <p>
            <span class="text-primary-clr font-bold">GitHub         </span>
            <span>-</span>
            <a href="https://github.com/SouleymaneSy7" target="_blank" rel="noopener noreferrer">
              github.com/SouleymaneSy7
            </a>
          </p>

          <p>
            <span class="text-primary-clr font-bold">LinkedIn       </span>
            <span>-</span>
            <a href="https://linkedin.com/in/souleymanesy7" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/souleymanesy7
            </a>
          </p>

          <p>
            <span class="text-primary-clr font-bold">Twitter / X    </span>
            <span>-</span>
            <a href="https://twitter.com/Souleymanesy43" target="_blank" rel="noopener noreferrer">
              twitter.com/Souleymanesy43
            </a>
          </p>

          <p>
            <span class="text-primary-clr font-bold">Frontend Mentor</span>
            <span>-</span>
            <a href="https://www.frontendmentor.io/profile/SouleymaneSy7" target="_blank" rel="noopener noreferrer">
              frontendmentor.io/profile/SouleymaneSy7
            </a>
          </p>

          <p>
            <span class="text-primary-clr font-bold">Dev Challenges </span>
            <span>-</span>
            <a href="https://devchallenges.io/profile/534cd213-3165-4c16-bdcf-058e1f468da0" target="_blank" rel="noopener noreferrer">
              devchallenges.io/profile/SouleymaneSy7
            </a>
          </p>
        </div>

        <div class="space-y-t-group">
          <p>Open to <span class="text-tertiary-clr font-bold">freelance</span>, <span class="text-tertiary-clr font-bold">remote positions</span>, <span class="text-tertiary-clr font-bold">collaboration</span> and <span class="text-tertiary-clr font-bold">internships</span>.</p>
          <p>Geography is not an obstacle. I work remote, async, and I deliver.</p>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">resume</span><span aria-hidden="true">'</span>
            to view or download my CV.
          </p>
        </div>

      </div>`,
    ],
  },
];
