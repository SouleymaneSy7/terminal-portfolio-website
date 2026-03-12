export const resumeCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `
      <div class="space-y-4 whitespace-normal py-3">
        <p>My resume is available in two languages:</p>

        <div class="space-y-3">

          <div class="space-y-1">
            <p class="text-secondary-clr font-bold">🇬🇧 English Version</p>
            <div class="space-y-1 pl-4">
              <div>
                <span class="text-tertiary-clr">View  → </span>
                <a href="/resume/resume-en.pdf" target="_blank" rel="noopener noreferrer">
                  Open PDF in browser
                </a>
              </div>

              <div>
                <span class="text-tertiary-clr">Download  → </span>
                <a href="/resume/resume-en.pdf" download="Souleymane_Sy_Resume_EN.pdf">
                  Download PDF
                </a>
              </div>
            </div>
          </div>




          <div class="space-y-1">
            <p class="text-secondary-clr font-bold">🇫🇷 Version Française</p>
            <div class="space-y-1 pl-4">
              <div>
                <span class="text-tertiary-clr">View  → </span>
                <a href="/resume/resume-fr.pdf" target="_blank" rel="noopener noreferrer">
                  Open PDF in browser
                </a>
              </div>

              <div>
                <span class="text-tertiary-clr">Download  → </span>
                <a href="/resume/resume-fr.pdf" download="Souleymane_Sy_CV_FR.pdf">
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      `,
    ],
  },
];
