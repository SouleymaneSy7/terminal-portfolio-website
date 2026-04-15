export const getResumeCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Resume</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Three years of self-teaching, 89+ public repos, 50+ Frontend Mentor</p>
          <p>challenges, a contest podium, and a certified internship — condensed</p>
          <p>into two pages. Available in English and French.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">🇬🇧  English Version</p>
          <div class="pl-4 space-y-t-group">
            <div>
              <span class="text-secondary-clr">View      <span aria-hidden="true">→</span> </span>
              <a href="/resume/resume-en.pdf" target="_blank" rel="noopener noreferrer">
                Open PDF in browser
              </a>
            </div>
            <div>
              <span class="text-secondary-clr">Download  <span aria-hidden="true">→</span> </span>
              <a href="/resume/resume-en.pdf" download="Souleymane_Sy_Resume_EN.pdf">
                Download PDF
              </a>
            </div>
          </div>
        </div>

        <div class="space-y-t-group">
          <p class="text-primary-clr font-bold">🇫🇷  Version Française</p>
          <div class="pl-4 space-y-t-group">
            <div>
              <span class="text-secondary-clr">Voir        <span aria-hidden="true">→</span> </span>
              <a href="/resume/resume-fr.pdf" target="_blank" rel="noopener noreferrer">
                Ouvrir le PDF dans le navigateur
              </a>
            </div>
            <div>
              <span class="text-secondary-clr">Télécharger <span aria-hidden="true">→</span> </span>
              <a href="/resume/resume-fr.pdf" download="Souleymane_Sy_CV_FR.pdf">
                Télécharger le PDF
              </a>
            </div>
          </div>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            Prefer to talk first? Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">contact</span><span aria-hidden="true">'</span>
            — I always reply.
          </p>
        </div>

      </div>`,
    ],
  },
];
