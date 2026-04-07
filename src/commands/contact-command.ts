export const getEmailCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Email</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>You can reach me at:</p>
          <a href="mailto:souleymanesycodes@gmail.com" target="_blank" rel="noopener noreferrer">
            souleymanesycodes@gmail.com
          </a>
          <p>An opportunity, a collaboration, or just saying hi — write to me. I always reply.</p>
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
          <p class="text-secondary-clr font-bold">Find me across the web</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            <span class="text-primary-clr font-bold">Email</span>
            <span>-</span>
            <a href="mailto:souleymanesycodes@gmail.com" target="_blank" rel="noopener noreferrer">
              souleymanesycodes@gmail.com
            </a>
          </p>

          <p>
            <span class="text-primary-clr font-bold">GitHub</span>
            <span>-</span>
            <a href="https://github.com/SouleymaneSy7" target="_blank" rel="noopener noreferrer">
              github.com/SouleymaneSy7
            </a>
          </p>

          <p>
            <span class="text-primary-clr font-bold">LinkedIn</span>
            <span>-</span>
            <a href="https://linkedin.com/in/souleymanesy7" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/souleymanesy7
            </a>
          </p>

          <p>
            <span class="text-primary-clr font-bold">Twitter / X</span>
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
          <p>Available for freelance, collaboration, internship or remote position. I always reply.</p>
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
