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
      type: "text" as const,
      content: [
        `You chose: ${userChoice}`,
        `I chose: ${computerChoice}`,
        result,
        "Play again? Type 'rps' followed by your choice!",
      ],
    },
  ];
};
