export const exitCommandOutput = [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      "Goodbye! 👋",
      "Thank you for visiting my terminal portfolio.",
      "You can close this tab to exit.",
      " ",
      "Have a project idea or an opportunity?",
      "Reach out: souleymanesycodes@gmail.com",
      " ",
      "See you around.",
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
        type: "text" as const,
        content: ["Pick 'rock', 'paper' or 'scissors'! Example: rps rock"],
      },
    ];
  }

  let result;
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  if (userChoice === computerChoice) {
    result = "It's a tie! We think alike. 🤝";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win! Well played, champion! 🏆";
  } else {
    result = "I win! The terminal is merciless. 😄 Try again!";
  }

  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="space-y-3 py-1">

          <div class="space-y-1">
            <p>You chose: ${userChoice}</p>
            <p>I chose: ${computerChoice}</p>
            <p>${result}</p>
          </div>

          <div class="space-y-0.5">
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
