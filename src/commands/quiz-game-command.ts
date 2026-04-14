import { createHtmlOutput } from "@/constants";
import {
  QuizQuestionType,
  GameStateType,
  PersistedGameStateType,
} from "@/types";
import { storageGet, storageSet, storageRemove } from "@/utils/commandStorage";

// ============================================
// CONSTANTS
// ============================================

const POINTS = { CORRECT: 10, WRONG: -5 } as const;

const RANKS = {
  LEGEND: { min: 90, name: "LEGEND" },
  PRO: { min: 75, name: "PRO" },
  ADVANCED: { min: 60, name: "ADVANCED" },
  NOOB: { min: 0, name: "NOOB" },
} as const;

// ============================================
// PERSISTENCE
// ============================================

const GAME_KEY = "terminal:quiz-game";

// ============================================
// ASCII ART
// ============================================

const ASCII = {
  CORRECT: `
░█████╗░░█████╗░██████╗░██████╗░███████╗░█████╗░████████╗
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗╚══██╔══╝
██║░░╚═╝██║░░██║██████╔╝██████╔╝█████╗░░██║░░╚═╝░░░██║░░░
██║░░██╗██║░░██║██╔══██╗██╔══██╗██╔══╝░░██║░░██╗░░░██║░░░
╚█████╔╝╚█████╔╝██║░░██║██║░░██║███████╗╚█████╔╝░░░██║░░░
░╚════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝░╚════╝░░░░╚═╝░░░`.trim(),

  WRONG: `
░██╗░░░░░░░██╗██████╗░░█████╗░███╗░░██╗░██████╗░
░██║░░██╗░░██║██╔══██╗██╔══██╗████╗░██║██╔════╝░
░╚██╗████╗██╔╝██████╔╝██║░░██║██╔██╗██║██║░░██╗░
░░████╔═████║░██╔══██╗██║░░██║██║╚████║██║░░╚██╗
░░╚██╔╝░╚██╔╝░██║░░██║╚█████╔╝██║░╚███║╚██████╔╝
░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝░╚════╝░╚═╝░░╚══╝░╚═════╝░`.trim(),

  QUIZ: `
░██████╗░██╗░░░██╗██╗███████╗
██╔═══██╗██║░░░██║██║╚════██║
██║██╗██║██║░░░██║██║░░███╔═╝
╚██████╔╝██║░░░██║██║██╔══╝░░
░╚═██╔═╝░╚██████╔╝██║███████╗
░░░╚═╝░░░░╚═════╝░╚═╝╚══════╝`.trim(),

  STATS: `
░██████╗████████╗░█████╗░████████╗░██████╗
██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
╚█████╗░░░░██║░░░███████║░░░██║░░░╚█████╗░
░╚═══██╗░░░██║░░░██╔══██║░░░██║░░░░╚═══██╗
██████╔╝░░░██║░░░██║░░██║░░░██║░░░██████╔╝
╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░`.trim(),

  LEGEND: `
██╗░░░░░███████╗░██████╗░███████╗███╗░░██╗██████╗░
██║░░░░░██╔════╝██╔════╝░██╔════╝████╗░██║██╔══██╗
██║░░░░░█████╗░░██║░░██╗░█████╗░░██╔██╗██║██║░░██║
██║░░░░░██╔══╝░░██║░░╚██╗██╔══╝░░██║╚████║██║░░██║
███████╗███████╗╚██████╔╝███████╗██║░╚███║██████╔╝
╚══════╝╚══════╝░╚═════╝░╚══════╝╚═╝░░╚══╝╚═════╝░`.trim(),

  PRO: `
██████╗░██████╗░░█████╗░
██╔══██╗██╔══██╗██╔══██╗
██████╔╝██████╔╝██║░░██║
██╔═══╝░██╔══██╗██║░░██║
██║░░░░░██║░░██║╚█████╔╝
╚═╝░░░░░╚═╝░░╚═╝░╚════╝░`.trim(),
} as const;

// ============================================
// QUIZ QUESTIONS
// ============================================

const quizQuestions: QuizQuestionType[] = [
  {
    question: "What does HTML stand for?",
    options: [
      "1. Hyper Trainer Marking Language",
      "2. Hyper Text Markup Language",
      "3. Highlevel Transfer Machine Logic",
    ],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | HTML is the backbone of web development`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | HTML = Hyper Text Markup Language`,
    explanation: "HTML structures web pages. Every website starts with HTML.",
  },
  {
    question: "Which CSS property controls text size?",
    options: ["1. font-weight", "2. text-size", "3. font-size"],
    answer: 3,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | You know your CSS properties!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | The correct property is font-size`,
    explanation:
      "Use font-size to control text dimensions. Example: font-size: 16px",
  },
  {
    question: "Which of these is NOT a JavaScript framework?",
    options: ["1. React", "2. Vue", "3. Django"],
    answer: 3,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Django is a Python framework`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Django is for Python, not JavaScript`,
    explanation:
      "React & Vue are JavaScript. Django is a Python web framework.",
  },
  {
    question: "What does 'flex' in flexbox stand for?",
    options: [
      "1. Flexible box layout",
      "2. Floating layout experiment",
      "3. Flux linear execution",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Flexbox is your layout superpower`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Flex = Flexible Box Layout`,
    explanation: "display: flex; is essential for modern responsive layouts.",
  },
  {
    question: "Which HTML tag creates the largest heading?",
    options: ["1. <heading>", "2. <h6>", "3. <h1>"],
    answer: 3,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | h1 dominates the heading hierarchy`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | h1 is largest, h6 is smallest`,
    explanation: "Headings range from h1 (largest) to h6 (smallest).",
  },
  {
    question: "What does API stand for?",
    options: [
      "1. Application Programming Interface",
      "2. Applied Program Interaction",
      "3. Advanced Processing Instruction",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | APIs connect systems together`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | API = Application Programming Interface`,
    explanation:
      "APIs enable communication between different software systems.",
  },
  {
    question: "What is the correct JavaScript function syntax?",
    options: [
      "1. function myFunc() {}",
      "2. func myFunc() {}",
      "3. def myFunc() {}",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Perfect function declaration!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | JavaScript uses the function keyword`,
    explanation: "Syntax: function name() {} or const name = () => {}",
  },
  {
    question: "Which company created React?",
    options: ["1. Google", "2. Facebook (Meta)", "3. Microsoft"],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | React was born at Facebook in 2013`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | React was developed by Facebook (Meta)`,
    explanation:
      "Jordan Walke created React at Facebook, now used by Instagram.",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "1. Cascading Style Sheets",
      "2. Creative Style System",
      "3. Computer Style Sheets",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | CSS brings style to the web`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | CSS = Cascading Style Sheets`,
    explanation: "CSS styles and beautifies HTML elements.",
  },
  {
    question: "Which symbol creates single-line comments in JavaScript?",
    options: ["1. //", "2. #", "3. --"],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Double slash comments are essential`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Use // for single-line comments`,
    explanation: "Single line: // — Multi-line: /* comment */",
  },
  {
    question: "What is the purpose of Git?",
    options: [
      "1. Version control system",
      "2. Code compiler",
      "3. Database manager",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Git is essential for team collaboration`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Git tracks code changes, not compilation`,
    explanation: "Git saves project snapshots with full commit history.",
  },
  {
    question: "Which keyword declares a constant in JavaScript?",
    options: ["1. var", "2. let", "3. const"],
    answer: 3,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Constants prevent reassignment`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Use const for values that won't change`,
    explanation: "const PI = 3.14; creates an immutable binding.",
  },
  {
    question: "What does JSON stand for?",
    options: [
      "1. JavaScript Object Notation",
      "2. Java Syntax Object Network",
      "3. Just Simple Object Names",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | JSON is the universal data format`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | JSON = JavaScript Object Notation`,
    explanation: "JSON is lightweight and human-readable data interchange.",
  },
  {
    question: "Which HTTP method retrieves data from a server?",
    options: ["1. POST", "2. GET", "3. PUT"],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | GET is for reading resources`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | GET reads, POST creates, PUT updates`,
    explanation: "GET requests fetch data without modifying it.",
  },
  {
    question: "What is npm?",
    options: [
      "1. Node Package Manager",
      "2. New Programming Method",
      "3. Network Protocol Module",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | npm is the JavaScript package registry`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | npm = Node Package Manager`,
    explanation: "npm install downloads and manages project dependencies.",
  },
  {
    question: "Which CSS property changes background color?",
    options: ["1. color", "2. bg-color", "3. background-color"],
    answer: 3,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Background styling mastered!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Use background-color, not bg-color`,
    explanation: "background-color accepts color names, hex, or rgb values.",
  },
  {
    question: "What does DOM stand for?",
    options: [
      "1. Document Object Model",
      "2. Data Operation Method",
      "3. Dynamic Output Manager",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | The DOM is JavaScript's playground`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | DOM = Document Object Model`,
    explanation: "The DOM is a tree structure of all page elements.",
  },
  {
    question: "Which operator checks for strict equality in JS?",
    options: ["1. ==", "2. ===", "3. ="],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Triple equals prevents type coercion`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | === checks value AND type`,
    explanation: "5 === '5' is false — number vs string.",
  },
  {
    question: "What is Webpack used for?",
    options: [
      "1. Module bundler",
      "2. Testing framework",
      "3. Database system",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Webpack optimizes your code`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Webpack bundles modules, not tests`,
    explanation: "Webpack combines files into optimized production bundles.",
  },
  {
    question: "Which attribute makes an HTML input required?",
    options: ["1. mandatory", "2. required", "3. necessary"],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Form validation understood!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | The required attribute enforces input`,
    explanation:
      "input required prevents form submission when the field is empty.",
  },
  {
    question: "What is TypeScript?",
    options: [
      "1. JavaScript with static typing",
      "2. A new programming language",
      "3. A CSS preprocessor",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | TypeScript catches errors early`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | TypeScript = JavaScript + type safety`,
    explanation: "TypeScript compiles to JavaScript with type checking.",
  },
  {
    question: "Which loop iterates over object properties?",
    options: ["1. for...in", "2. for...of", "3. forEach"],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Object iteration mastered!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | for...in for objects, for...of for arrays`,
    explanation: "for...in loops through enumerable property keys.",
  },
  {
    question: "What does async/await do?",
    options: [
      "1. Handles asynchronous operations",
      "2. Creates parallel threads",
      "3. Speeds up code execution",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Async code just got cleaner!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | async/await simplifies promise handling`,
    explanation: "await pauses execution until a promise resolves.",
  },
  {
    question: "Which CSS unit is relative to the viewport width?",
    options: ["1. px", "2. vw", "3. em"],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Responsive design pro!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | vw = viewport width, vh = viewport height`,
    explanation: "50vw equals 50% of the browser window width.",
  },
  {
    question: "What is REST in web APIs?",
    options: [
      "1. Representational State Transfer",
      "2. Remote Execution Service Tool",
      "3. Response Status Template",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | RESTful architecture understood!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | REST = Representational State Transfer`,
    explanation: "REST uses HTTP methods for stateless API operations.",
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["1. append()", "2. push()", "3. add()"],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Array manipulation on point!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Use push() to add to array end`,
    explanation:
      "push() modifies the original array and returns the new length.",
  },
  {
    question: "What is localhost typically bound to?",
    options: ["1. 192.168.1.1", "2. 127.0.0.1", "3. 0.0.0.0"],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Network fundamentals mastered!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | localhost resolves to 127.0.0.1`,
    explanation: "127.0.0.1 is the loopback address for local development.",
  },
  {
    question: "Which CSS property controls element positioning?",
    options: ["1. display", "2. position", "3. float"],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Layout control mastered!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | position property manages element flow`,
    explanation: "Values: static, relative, absolute, fixed, sticky.",
  },
  {
    question: "What does CORS stand for?",
    options: [
      "1. Cross-Origin Resource Sharing",
      "2. Common Object Request System",
      "3. Client-Origin Response Service",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Web security understood!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | CORS = Cross-Origin Resource Sharing`,
    explanation: "CORS headers control cross-domain HTTP requests.",
  },
  {
    question: "Which hook manages state in React?",
    options: ["1. useEffect", "2. useState", "3. useContext"],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | React hooks mastered!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | useState creates component state`,
    explanation: "const [state, setState] = useState(initialValue)",
  },
  {
    question: "What is the default port for HTTP?",
    options: ["1. 8080", "2. 443", "3. 80"],
    answer: 3,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Network protocols understood!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | HTTP uses port 80, HTTPS uses 443`,
    explanation: "Port 80 is usually omitted from URLs.",
  },
  {
    question: "Which method removes the last element from an array?",
    options: ["1. pop()", "2. shift()", "3. remove()"],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Array methods mastered!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | pop() removes from end, shift() from start`,
    explanation: "pop() returns the removed element.",
  },
  {
    question: "What is Node.js?",
    options: [
      "1. JavaScript runtime for servers",
      "2. A frontend framework",
      "3. A database engine",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Backend JavaScript understood!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Node.js runs JavaScript on servers`,
    explanation: "Node.js uses Chrome's V8 engine outside browsers.",
  },
  {
    question: "Which CSS preprocessor uses .scss files?",
    options: ["1. LESS", "2. Sass", "3. Stylus"],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | CSS preprocessing mastered!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Sass uses .scss or .sass extensions`,
    explanation: "SCSS adds variables, nesting, and mixins to CSS.",
  },
  {
    question: "What does SPA stand for in web development?",
    options: [
      "1. Single Page Application",
      "2. Server Processing Architecture",
      "3. Simple Protocol Access",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Modern web architecture understood!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | SPA = Single Page Application`,
    explanation: "SPAs dynamically update content without page reloads.",
  },
  {
    question: "Which keyword creates a class in JavaScript?",
    options: ["1. function", "2. class", "3. object"],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Object-oriented JS mastered!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Use the class keyword for class definitions`,
    explanation: "ES6 introduced class syntax for cleaner OOP.",
  },
  {
    question: "What is MongoDB?",
    options: [
      "1. NoSQL database",
      "2. SQL database",
      "3. JavaScript framework",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Database types understood!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | MongoDB is a NoSQL document database`,
    explanation: "MongoDB stores data in flexible JSON-like documents.",
  },
  {
    question: "Which CSS property controls text alignment?",
    options: ["1. align", "2. text-align", "3. alignment"],
    answer: 2,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Text styling mastered!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | text-align positions text horizontally`,
    explanation: "Values: left, right, center, justify.",
  },
  {
    question: "What is Express.js?",
    options: [
      "1. Node.js web framework",
      "2. Frontend library",
      "3. Database ORM",
    ],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Backend frameworks understood!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | Express is a minimal Node.js framework`,
    explanation: "Express simplifies building Node.js web servers.",
  },
  {
    question: "Which method converts JSON string to object?",
    options: ["1. JSON.parse()", "2. JSON.stringify()", "3. JSON.decode()"],
    answer: 1,
    correctMsg: `✓ CORRECT | +${POINTS.CORRECT} XP | Data parsing mastered!`,
    wrongMsg: `✗ INCORRECT | ${POINTS.WRONG} XP | parse() deserializes, stringify() serializes`,
    explanation: "JSON.parse() converts a string to a JavaScript object.",
  },
];

// ============================================
// GAME STATE  (hydrated from localStorage on module load)
// ============================================

/**
 * Restore state from localStorage.
 * currentQuestion is stored as its index in quizQuestions[] so the
 * full question object can be recovered after a page refresh.
 * storageGet() returns the fallback when window is undefined (SSR),
 * so this is safe to call at module level.
 */
function hydrateState(): GameStateType {
  const saved = storageGet<PersistedGameStateType | null>(GAME_KEY, null);

  if (!saved) {
    return {
      currentQuestion: null,
      score: 0,
      questionsAnswered: 0,
      askedQuestions: [],
    };
  }

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

/**
 * Write current state to localStorage.
 * currentQuestion is serialized as its index (or null).
 */
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

const showHelp = () =>
  createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">game — Command Reference</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Frontend quiz game. Answer questions, earn XP, climb the ranks.</p>
        <p><span class="text-secondary-clr">Usage:</span>  game [subcommand]</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Subcommands</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-tertiary-clr font-bold">game          </span> - Load a new question</p>
        <p><span class="text-tertiary-clr font-bold">game [1-3]    </span> - Submit your answer</p>
        <p><span class="text-tertiary-clr font-bold">game stats    </span> - View your performance</p>
        <p><span class="text-tertiary-clr font-bold">game reset    </span> - Clear all progress</p>
        <p><span class="text-tertiary-clr font-bold">game help     </span> - Show this guide</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Scoring</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-tertiary-clr">+${POINTS.CORRECT} XP</span>  for a correct answer</p>
        <p><span class="text-secondary-clr">${POINTS.WRONG} XP</span>  for a wrong answer</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Ranks</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-tertiary-clr">LEGEND   </span>  ≥ ${RANKS.LEGEND.min}% accuracy</p>
        <p><span class="text-tertiary-clr">PRO      </span>  ≥ ${RANKS.PRO.min}% accuracy</p>
        <p><span class="text-tertiary-clr">ADVANCED </span>  ≥ ${RANKS.ADVANCED.min}% accuracy</p>
        <p><span class="text-tertiary-clr">NOOB     </span>  &lt; ${RANKS.ADVANCED.min}% accuracy</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Workflow example</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-primary-clr">$</span> game</p>
        <p><span class="text-text-clr opacity-sep">  → question appears</span></p>
        <p><span class="text-primary-clr">$</span> game 2</p>
        <p><span class="text-text-clr opacity-sep">  → answer evaluated, score updated</span></p>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Progress is <span class="text-tertiary-clr font-bold">saved automatically</span> — pick up where you left off.</p>
      </div>

    </div>`,
  );

const showStats = () => {
  const accuracy = calculateAccuracy();
  const rank = getRank(accuracy);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

      <div class="space-y-t-group">
        <pre class="text-primary-clr leading-snug select-none" aria-hidden="true">${ASCII.STATS}</pre>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p class="text-secondary-clr font-bold">  Quiz Performance</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-secondary-clr">Questions Solved </span>  ${gameState.questionsAnswered}</p>
        <p><span class="text-secondary-clr">Correct Answers  </span>  ${gameState.score}</p>
        <p><span class="text-secondary-clr">Accuracy         </span>  ${accuracy}%</p>
        <p><span class="text-secondary-clr">Current Rank     </span>  ${rank.name}</p>
        ${rank.art ? `<pre class="text-primary-clr leading-snug select-none" aria-hidden="true">${rank.art}</pre>` : ""}
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>
          Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">game</span><span aria-hidden="true">'</span>
          to continue your journey.
        </p>
        <p>
          Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">game reset</span><span aria-hidden="true">'</span>
          to start fresh.
        </p>
      </div>

    </div>`,
  );
};

const handleReset = () => {
  resetGame();

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">✓  Progress wiped clean</p>
        <p class="text-tertiary-clr font-bold">✓  Statistics reset to zero</p>
        <p class="text-tertiary-clr font-bold">✓  Saved data cleared</p>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>
          Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">game</span><span aria-hidden="true">'</span>
          to begin a new session.
        </p>
      </div>

    </div>`,
  );
};

const handleAnswer = (answer: number) => {
  if (!gameState.currentQuestion) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span>  No active question.</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">game</span><span aria-hidden="true">'</span>
            to start.
          </p>
        </div>
      </div>`,
    );
  }

  if (isNaN(answer) || answer < 1 || answer > 3) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span>  Invalid input — enter 1, 2, or 3.</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">game [number]</span><span aria-hidden="true">'</span>
            to answer.
          </p>
        </div>
      </div>`,
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

  // Clear current question BEFORE persisting
  gameState.currentQuestion = null;
  persistState();

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

      <div class="space-y-t-group">
        <pre class="text-primary-clr leading-snug select-none" aria-hidden="true">${resultArt}</pre>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p class="${resultColor} font-bold">${resultMsg}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>${explanation}</p>
        <p><span class="text-secondary-clr">Score     </span>  ${gameState.score} / ${gameState.questionsAnswered}</p>
        <p><span class="text-secondary-clr">Accuracy  </span>  ${accuracy}%</p>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>
          Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">game</span><span aria-hidden="true">'</span>
          for your next challenge.
        </p>
        <p>
          Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">game stats</span><span aria-hidden="true">'</span>
          for a detailed breakdown.
        </p>
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
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p class="text-secondary-clr font-bold">  Frontend Quiz Challenge</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Question ${gameState.questionsAnswered + 1}:</p>
        <p>${question.question}</p>
        ${question.options.map((o) => `<p>${o}</p>`).join("\n        ")}
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>
          Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">game [1-3]</span><span aria-hidden="true">'</span>
          to answer.
        </p>
        <p>
          Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">game help</span><span aria-hidden="true">'</span>
          for all commands.
        </p>
      </div>

    </div>`,
  );
};

// ============================================
// MAIN COMMAND HANDLER
// ============================================

export const handleGameCommand = (args: string[]) => {
  const sub = args[0]?.toLowerCase();

  if (sub === "stats") return showStats();
  if (sub === "reset") return handleReset();
  if (sub === "help" || sub === "--help") return showHelp();

  if (args[0] && gameState.currentQuestion) {
    return handleAnswer(parseInt(args[0]));
  }

  return showQuestion();
};
