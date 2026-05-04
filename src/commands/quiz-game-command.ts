/**
 * Quiz Game Command - Interactive Frontend Quiz
 *
 * @description
 * 40-question Frontend quiz with XP system, accuracy tracking, and rank progression.
 * Questions cover HTML, CSS, JavaScript, TypeScript, React, and web development.
 * Progress is saved to localStorage.
 *
 * @param args - Command arguments (answer number, stats, reset, help)
 * @returns Command output blocks
 *
 * @example
 * ```bash
 * game              # Start or continue the quiz
 * game 1            # Submit answer 1
 * game stats        # View your performance
 * game reset        # Clear all progress
 * game help         # Show help
 * ```
 */

import { ASCII } from "@/constants";
import { GAME_HELP } from "@/constants/help/fun";
import { quizQuestions, RANKS } from "@/constants/quiz-game";
import type {
  GameStateType,
  PersistedGameStateType,
  QuizQuestionType,
} from "@/types";
import { parseArgs } from "@/utils/argParser";
import { storageGet, storageRemove, storageSet } from "@/utils/commandStorage";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";
import { STORAGE_KEYS } from "@/constants/storageKeys";

// ============================================
// PERSISTENCE
// ============================================

const GAME_KEY = STORAGE_KEYS.QUIZ_GAME;

function hydrateState(): GameStateType {
  const saved = storageGet<PersistedGameStateType | null>(GAME_KEY, null);
  if (!saved)
    return {
      currentQuestion: null,
      score: 0,
      questionsAnswered: 0,
      askedQuestions: [],
    };

  const currentQuestion =
    saved.currentQuestionIndex !== null
      ? (quizQuestions[saved.currentQuestionIndex] ?? null)
      : null;

  return {
    currentQuestion,
    score: saved.score,
    questionsAnswered: saved.questionsAnswered,
    askedQuestions: saved.askedQuestions,
  };
}

function persistState(): void {
  const currentQuestionIndex =
    gameState.currentQuestion !== null
      ? quizQuestions.indexOf(gameState.currentQuestion)
      : null;

  storageSet<PersistedGameStateType>(GAME_KEY, {
    score: gameState.score,
    questionsAnswered: gameState.questionsAnswered,
    askedQuestions: gameState.askedQuestions,
    currentQuestionIndex:
      currentQuestionIndex === -1 ? null : currentQuestionIndex,
  });
}

let gameState: GameStateType = hydrateState();

// ============================================
// HELPERS
// ============================================

const calculateAccuracy = (): number => {
  if (gameState.questionsAnswered === 0) return 0;
  return Math.round((gameState.score / gameState.questionsAnswered) * 100);
};

const getRank = (accuracy: number): { name: string; art: string } => {
  if (accuracy >= RANKS.LEGEND.min)
    return { name: RANKS.LEGEND.name, art: ASCII.LEGEND };
  if (accuracy >= RANKS.PRO.min)
    return { name: RANKS.PRO.name, art: ASCII.PRO };
  if (accuracy >= RANKS.ADVANCED.min)
    return { name: RANKS.ADVANCED.name, art: "" };
  return { name: RANKS.NOOB.name, art: "" };
};

const getRandomQuestion = (): QuizQuestionType => {
  let available = quizQuestions
    .map((_, i) => i)
    .filter((i) => !gameState.askedQuestions.includes(i));
  if (available.length === 0) {
    gameState.askedQuestions = [];
    available = quizQuestions.map((_, i) => i);
  }
  const idx = available[Math.floor(Math.random() * available.length)];
  gameState.askedQuestions.push(idx);
  return quizQuestions[idx];
};

const resetGame = (): void => {
  gameState = {
    currentQuestion: null,
    score: 0,
    questionsAnswered: 0,
    askedQuestions: [],
  };
  storageRemove(GAME_KEY);
};

// ============================================
// COMMAND HANDLERS
// ============================================

const showHelp = () => GAME_HELP;

const showStats = () => {
  const accuracy = calculateAccuracy();
  const rank = getRank(accuracy);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <pre class="text-primary-clr leading-snug select-none" aria-hidden="true">${ASCII.STATS}</pre>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p class="text-secondary-clr font-bold">  Quiz Performance</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Questions Solved</span>${DT.decorators.arrow}${gameState.questionsAnswered}</p>
        <p><span class="text-secondary-clr">Correct Answers </span>${DT.decorators.arrow}${gameState.score}</p>
        <p><span class="text-secondary-clr">Accuracy        </span>${DT.decorators.arrow}${accuracy}%</p>
        <p><span class="text-secondary-clr">Current Rank    </span>${DT.decorators.arrow}${rank.name}</p>
        ${rank.art ? `<pre class="text-primary-clr leading-snug select-none" aria-hidden="true">${rank.art}</pre>` : ""}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">game</span>${DT.decorators.quote} to continue ${DT.decorators.bullet} ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">game reset</span>${DT.decorators.quote} to start fresh.</p>
      </div>
    </div>`,
  );
};

const handleReset = () => {
  resetGame();
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p>${DT.icons.success}  Progress wiped clean</p>
        <p>${DT.icons.success}  Statistics reset to zero</p>
        <p>${DT.icons.success}  Saved data cleared</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">game</span>${DT.decorators.quote} to begin a new session.</p>
      </div>
    </div>`,
  );
};

const handleAnswer = (answer: number) => {
  if (!gameState.currentQuestion) {
    return createErrorOutput(
      "No active question.",
      `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">game</span>${DT.decorators.quote} to start.`,
    );
  }

  if (isNaN(answer) || answer < 1 || answer > 3) {
    return createErrorOutput(
      "Invalid input — enter 1, 2, or 3.",
      `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">game [number]</span>${DT.decorators.quote} to answer.`,
    );
  }

  const isCorrect = answer === gameState.currentQuestion.answer;
  gameState.questionsAnswered++;
  if (isCorrect) gameState.score++;

  const accuracy = calculateAccuracy();
  const resultArt = isCorrect ? ASCII.CORRECT : ASCII.WRONG;
  const resultMsg = isCorrect
    ? gameState.currentQuestion.correctMsg
    : gameState.currentQuestion.wrongMsg;
  const resultColor = isCorrect ? "text-tertiary-clr" : "text-secondary-clr";
  const explanation = gameState.currentQuestion.explanation ?? "";

  gameState.currentQuestion = null;
  persistState();

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <pre class="text-primary-clr leading-snug select-none" aria-hidden="true">${resultArt}</pre>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p class="${resultColor} font-bold">${resultMsg}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>${explanation}</p>
        <p><span class="text-secondary-clr">Score   </span>${DT.decorators.arrow}${gameState.score} / ${gameState.questionsAnswered}</p>
        <p><span class="text-secondary-clr">Accuracy</span>${DT.decorators.arrow}${accuracy}%</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">game</span>${DT.decorators.quote} for your next challenge ${DT.decorators.bullet} ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">game stats</span>${DT.decorators.quote} for a breakdown.</p>
      </div>
    </div>`,
  );
};

const showQuestion = () => {
  const question = getRandomQuestion();
  gameState.currentQuestion = question;
  persistState();

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <pre class="text-primary-clr leading-snug select-none" aria-hidden="true">${ASCII.QUIZ}</pre>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p class="text-secondary-clr font-bold">  Frontend Quiz Challenge</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Question ${gameState.questionsAnswered + 1}:</p>
        <p>${question.question}</p>
        ${question.options.map((o) => `<p>${o}</p>`).join("\n        ")}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">game [1-3]</span>${DT.decorators.quote} to answer ${DT.decorators.bullet} ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">game help</span>${DT.decorators.quote} for all commands.</p>
      </div>
    </div>`,
  );
};

// ============================================
// MAIN COMMAND HANDLER
// ============================================

export const handleGameCommand = (args: string[]) => {
  const parsed = parseArgs(args);
  const sub = parsed.subcommand?.toLowerCase();

  if (parsed.flags.help) return showHelp();
  if (sub === "stats") return showStats();
  if (sub === "reset") return handleReset();

  if (args[0] && gameState.currentQuestion) {
    return handleAnswer(parseInt(args[0]));
  }

  return showQuestion();
};
