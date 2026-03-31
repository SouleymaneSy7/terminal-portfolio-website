export const getExitCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-3 py-1">
        <div class="space-y-1">
          <p>Goodbye! 👋</p>
          <p>Thank you for visiting my terminal portfolio.</p>
          <p>You can close this tab to exit.</p>
        </div>

        <div class="space-y-1">
          <p>Have a project idea or an opportunity?</p>
          <p>
            <span>Reach out: </span>
            <span class="text-tertiary-clr">→</span>
            <a href="mailto:souleymanesycodes@gmail.com" target="_blank" rel="noopener noreferrer">
              souleymanesycodes@gmail.com
            </a>
          </p>
        </div>

        <div class="space-y-0.5">
          <p>See you around. 🌍</p>
        </div>
      </div>`,
    ],
  },
];

export const rspCommand = (userInput: string) => {
  const choices = ["rock", "paper", "scissors"];
  const userChoice = userInput.toLocaleLowerCase().trim().split(" ")[0];

  if (!choices.includes(userChoice)) {
    return [
      {
        id: crypto.randomUUID(),
        type: "html" as const,
        content: [
          `<div class="space-y-3 py-1">
            <div class="space-y-1">
              <p><span class="text-secondary-clr">⚠</span>  Invalid choice.</p>
              <p>Pick <span class="text-tertiary-clr">rock</span>, <span class="text-tertiary-clr">paper</span> or <span class="text-tertiary-clr">scissors</span>.</p>
            </div>
            <div class="space-y-0.5">
              <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
              <p>
                Example: Type
                <span> '</span><span class="text-tertiary-clr font-bold">rps rock</span><span>'</span>
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
        `<div class="space-y-3 py-1">

          <div class="space-y-1">
            <p><span class="text-secondary-clr">You  →</span>  ${userChoice}</p>
            <p><span class="text-secondary-clr">Me   →</span>  ${computerChoice}</p>
            <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
            <p class="${resultColor} font-bold">${result}</p>
          </div>

          <div class="space-y-0.5">
            <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
            <p>
              Play again? Type
              <span> '</span><span class="text-tertiary-clr font-bold">rps</span><span>'</span>
              followed by your choice!
            </p>
          </div>

        </div>`,
      ],
    },
  ];
};
