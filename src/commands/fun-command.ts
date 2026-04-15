export const getExitCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Goodbye 👋</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Thanks for visiting. This terminal is my story —</p>
          <p>built line by line, from Coyah, Guinea-Conakry,</p>
          <p>without a school, without a bootcamp, without shortcuts.</p>
          <p>Just code, persistence, and the refusal to quit.</p>
        </div>

        <div class="space-y-t-group">
          <p>If something here caught your eye — reach out.</p>
          <p>An opportunity, a collaboration, a project, or just a conversation —</p>
          <p>
            <span aria-hidden="true" class="text-tertiary-clr">→</span>
            <a href="mailto:souleymanesycodes@gmail.com" target="_blank" rel="noopener noreferrer">
              souleymanesycodes@gmail.com
            </a>
          </p>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Close this tab to exit. See you around. 🌍</p>
        </div>

      </div>`,
    ],
  },
];

export const rspCommand = (userInput: string) => {
  const choices = ["rock", "paper", "scissors"] as const;
  const userChoice = userInput.toLocaleLowerCase().trim().split(" ")[0];

  if (!choices.includes(userChoice as (typeof choices)[number])) {
    return [
      {
        id: crypto.randomUUID(),
        type: "html" as const,
        content: [
          `<div class="space-y-t-section py-t-outer">
            <div class="space-y-t-group">
              <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Invalid choice.</p>
              <p>Pick <span class="text-tertiary-clr">rock</span>, <span class="text-tertiary-clr">paper</span> or <span class="text-tertiary-clr">scissors</span>.</p>
            </div>

            <div class="space-y-t-footer">
              <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
              <p>
                <span class="text-secondary-clr font-bold">Example:</span> Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">rps rock</span><span aria-hidden="true">'</span>
              </p>
            </div>
          </div>`,
        ],
      },
    ];
  }

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  let result: string;
  let resultColor: string;

  if (userChoice === computerChoice) {
    result = "It's a tie! We think alike. 🤝";
    resultColor = "text-primary-clr";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win! Well played, champion! 🏆";
    resultColor = "text-tertiary-clr";
  } else {
    result = "I win! The terminal is merciless. 😄";
    resultColor = "text-secondary-clr";
  }

  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="space-y-t-section py-t-outer">

          <div class="space-y-t-group">
            <p><span class="text-secondary-clr">You  →</span>  ${userChoice}</p>
            <p><span class="text-secondary-clr">Me   →</span>  ${computerChoice}</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p class="${resultColor} font-bold">${result}</p>
          </div>

          <div class="space-y-t-footer">
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>
              Play again? Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">rps</span><span aria-hidden="true">'</span>
              followed by your choice.
            </p>
          </div>

        </div>`,
      ],
    },
  ];
};

export const rpsCommandHelp = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">
                <div class="space-y-t-group">
                  <p>Pick <span class="text-tertiary-clr">rock</span>, <span class="text-tertiary-clr">paper</span> or <span class="text-tertiary-clr">scissors</span> to battle it out!</p>
                </div>
                <div class="space-y-t-footer">
                  <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
                  <p>
                    <span class="text-secondary-clr font-bold">Usage:</span> rps &lt;rock|paper|scissors&gt;
                    — or type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">rps --help</span><span aria-hidden="true">'</span>
                  </p>
                </div>
              </div>`,
    ],
  },
];
