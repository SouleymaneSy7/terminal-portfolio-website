export const getEmailCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `
      <div class="space-y-2 py-2">
        <p>You can reach me at:</p>
        <a href="mailto:souleymanesycodes@gmail.com" target="_blank" rel="noreferrer">
          souleymanesycodes@gmail.com
        </a>
        <p>An opportunity, a collaboration, or just saying hi — write to me. I always reply.</p>
      </div>
 `,
    ],
  },
];

export const getContactCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `
      <div class="space-y-3">
        <div class="pt-2">
          <p class="pb-3">Find me across the web:</p>
          
          <div class="space-y-2">
            <div>
              <span class="text-tertiary-clr">Email:</span>
              <a 
                href="mailto:souleymanesycodes@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                souleymanesycodes@gmail.com
              </a>
            </div>
            
            <div>
              <span class="text-tertiary-clr">GitHub:</span>
              <a 
                href="https://github.com/SouleymaneSy7" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                github.com/SouleymaneSy7
              </a>
            </div>

            <div>
              <span class="text-tertiary-clr">LinkedIn:</span>
              <a 
                href="https://linkedin.com/in/souleymanesy7" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                linkedin.com/in/souleymanesy7
              </a>
            </div>
            
            <div>
              <span class="text-tertiary-clr">Twitter / X:</span>
              <a 
                href="https://twitter.com/Souleymanesy43" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                twitter.com/Souleymanesy43
              </a>
            </div>
            
            <div>
              <span class="text-tertiary-clr">Frontend Mentor:</span>
              <a 
                href="https://www.frontendmentor.io/profile/SouleymaneSy7" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                frontendmentor.io/profile/SouleymaneSy7
              </a>
            </div>
            
            <div>
              <span class="text-tertiary-clr">Dev Challenges:</span>
              <a 
                href="https://devchallenges.io/profile/534cd213-3165-4c16-bdcf-058e1f468da0" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                devchallenges.io/profile/SouleymaneSy7
              </a>
            </div>
          </div>
          
          <p class="pt-4">
            Available for freelance, collaboration, internship or remote position.
            Feel free to reach out — I always reply.
          </p>
        </div>
      </div>
      `,
    ],
  },
];
