// ============================================
// CONFIGURATION
// ============================================
export const THEMES = {
  // ── Catppuccin family ──────────────────────
  catppuccin: {
    label: "Catppuccin Macchiato",
    description: "Soft, soothing pastels perfect for long coding sessions",
  },
  "catppuccin-latte": {
    label: "Catppuccin Latte",
    description: "Warm and bright tones, like a sunny morning coffee",
  },
  "catppuccin-frappe": {
    label: "Catppuccin Frappé",
    description: "Subtle contrast with medium depth, very comfortable",
  },
  "catppuccin-mocha": {
    label: "Catppuccin Mocha",
    description: "The richest and darkest of the family, deep and elegant",
  },

  // ── Popular dark themes ────────────────────
  monokai: {
    label: "Monokai",
    description: "The timeless classic loved by generations of developers",
  },
  "tokyo-night": {
    label: "Tokyo Night",
    description: "Neon nights of Tokyo, perfect for late-night coding",
  },
  dracula: {
    label: "Dracula",
    description: "Rich, mysterious, and slightly gothic",
  },
  nord: {
    label: "Nord",
    description: "Icy blues and Nordic minimalism, clean and calming",
  },
  gruvbox: {
    label: "Gruvbox Dark",
    description: "Warm retro tones with organic colors and great comfort",
  },
  everforest: {
    label: "Everforest Dark",
    description: "Deep forest atmosphere with soothing green tones",
  },
  "rose-pine": {
    label: "Rosé Pine",
    description: "Romantic and dreamy, soft pinks and warm woods",
  },

  // ── Editor classics ────────────────────────
  "solarized-dark": {
    label: "Solarized Dark",
    description: "Scientifically precise colors with legendary harmony",
  },
  oceanic: {
    label: "Oceanic Next",
    description: "Deep ocean blues with vibrant and modern accents",
  },
  cobalt2: {
    label: "Cobalt2",
    description: "Striking cobalt blue, powerful contrast and high energy",
  },
  github: {
    label: "GitHub Dark",
    description: "The familiar dark theme you already know and trust",
  },
  "one-dark": {
    label: "One Dark",
    description: "The iconic Atom/VS Code theme, refined for terminals",
  },
  "atom-one-dark": {
    label: "Atom One Dark",
    description: "Signature purple and cyan accents with bold elegance",
  },
} as const;

export const FONTS = {
  cascadia: {
    label: "Cascadia Code",
    description:
      "Clean, modern, and incredibly polished — Microsoft's gift to developers",
    variable: "--font-cascadia-code",
  },
  fira: {
    label: "Fira Code",
    description: "Code that breathes — famous for its stunning ligatures",
    variable: "--font-fira-code",
  },
  geist: {
    label: "Geist Mono",
    description:
      "Sharp, elegant, and minimal — designed for the modern developer",
    variable: "--font-geist-mono",
  },
  "recursive-casual": {
    label: "Recursive Casual Mono",
    description: "Artistic and expressive, like handwriting meets monospace",
    variable: "--font-recursive-casual",
  },
} as const;

export type ThemeKey = keyof typeof THEMES;
export type FontKey = keyof typeof FONTS;

export const THEME_STORAGE_KEY = "terminal:theme";
export const FONT_STORAGE_KEY = "terminal:font";

// ============================================
// HELPERS
// ============================================
export const getCurrentTheme = (): ThemeKey => {
  if (typeof document === "undefined") return "catppuccin";
  return (
    (document.documentElement.getAttribute("data-theme") as ThemeKey) ||
    "catppuccin"
  );
};

export const getCurrentFont = (): FontKey => {
  if (typeof document === "undefined") return "cascadia"; // changé en cascadia (nouveau default)
  return (
    (document.documentElement.getAttribute("data-font") as FontKey) ||
    "cascadia"
  );
};

export const getThemeLabel = (key: ThemeKey): string =>
  THEMES[key]?.label ?? key;

export const getFontLabel = (key: FontKey): string => FONTS[key]?.label ?? key;

// ============================================
// APPLY / INIT
// ============================================
export const applyTheme = (theme: ThemeKey): void => {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    console.error("[Theme - apply] failed to set:", err);
  }
};

export const applyFont = (font: FontKey): void => {
  document.documentElement.setAttribute("data-font", font);
  try {
    localStorage.setItem(FONT_STORAGE_KEY, font);
  } catch (err) {
    console.error("[Font - apply] failed to set:", err);
  }
};

export const initThemeAndFont = (): void => {
  try {
    const savedTheme = localStorage.getItem(
      THEME_STORAGE_KEY,
    ) as ThemeKey | null;
    const savedFont = localStorage.getItem(FONT_STORAGE_KEY) as FontKey | null;

    if (savedTheme && savedTheme in THEMES) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
    if (savedFont && savedFont in FONTS) {
      document.documentElement.setAttribute("data-font", savedFont);
    }
  } catch (error) {
    console.error("[initThemeAndFont]", error);
  }
};

// ============================================
// THEME COMMAND OUTPUTS
// ============================================
export const getThemeListOutput = () => {
  const current = getCurrentTheme();

  const rows = (
    Object.entries(THEMES) as [ThemeKey, (typeof THEMES)[ThemeKey]][]
  )
    .map(([key, theme]) => {
      const isActive = key === current;
      const label = theme.label.padEnd(28);
      const description = theme.description;

      const nameClass = isActive
        ? "text-primary-clr font-bold"
        : "text-tertiary-clr";
      const activeTag = isActive
        ? ` <span class="text-primary-clr font-bold"> ← active</span>`
        : "";

      return `<p>
        <span class="${nameClass}">${label}</span>
        <span class="text-text-clr">- ${description}.</span>${activeTag}
      </p>`;
    })
    .join("");

  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="space-y-t-section py-t-outer">
          <div class="space-y-t-group">
            <p class="text-secondary-clr font-bold">Available Themes</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            ${rows}
          </div>
          <div class="space-y-t-footer">
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>
              Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">theme &lt;name&gt;</span><span aria-hidden="true">'</span>
              to switch.
            </p>
          </div>
        </div>`,
      ],
    },
  ];
};

export const getThemeSwitchOutput = (theme: ThemeKey) => {
  applyTheme(theme);
  const { label, description } = THEMES[theme];

  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="space-y-t-section py-t-outer">
          <div class="space-y-t-group">
            <p class="text-tertiary-clr font-bold">✓ Theme switched <span aria-hidden="true">→</span> ${label}</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>${description}</p>
            <p>Preference saved.</p>
          </div>
          <div class="space-y-t-footer">
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>
              Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">theme</span><span aria-hidden="true">'</span>
              to see all themes.
            </p>
          </div>
        </div>`,
      ],
    },
  ];
};

export const getThemeInvalidOutput = (name: string) => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Unknown theme: <span class="text-tertiary-clr">"${name}"</span></p>
          <p>Available: <span class="text-secondary-clr font-bold">catppuccin · catppuccin-latte · catppuccin-frappe · catppuccin-mocha · monokai · tokyo-night · dracula · nord · gruvbox · everforest · rose-pine · solarized-dark · oceanic · cobalt2 · github · one-dark · atom-one-dark</span></p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">theme</span><span aria-hidden="true">'</span>
            to see all available themes.
          </p>
        </div>
      </div>`,
    ],
  },
];

// ============================================
// FONT COMMAND OUTPUTS
// ============================================
export const getFontListOutput = () => {
  const current = getCurrentFont();

  const rows = (Object.entries(FONTS) as [FontKey, (typeof FONTS)[FontKey]][])
    .map(([key, font]) => {
      const isActive = key === current;
      const label = font.label.padEnd(24);
      const description = font.description;

      const nameClass = isActive
        ? "text-primary-clr font-bold"
        : "text-tertiary-clr";
      const activeTag = isActive
        ? `<span class="text-primary-clr font-bold"> ← active</span>`
        : "";

      return `<p>
        <span class="${nameClass}">${label}</span>
        <span class="text-text-clr">- ${description}.</span>${activeTag}
      </p>`;
    })
    .join("");

  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="space-y-t-section py-t-outer">
          <div class="space-y-t-group">
            <p class="text-secondary-clr font-bold">Available Fonts</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            ${rows}
          </div>
          <div class="space-y-t-footer">
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>
              Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">typeface &lt;name&gt;</span><span aria-hidden="true">'</span>
              to switch.
            </p>
          </div>
        </div>`,
      ],
    },
  ];
};

export const getFontSwitchOutput = (font: FontKey) => {
  applyFont(font);
  const { label, description } = FONTS[font];

  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="space-y-t-section py-t-outer">
          <div class="space-y-t-group">
            <p class="text-tertiary-clr font-bold">✓ Font switched <span aria-hidden="true">→</span> ${label}</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>${description}</p>
            <p>Preference saved. All text updated instantly.</p>
          </div>
          <div class="space-y-t-footer">
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>
              Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">typeface</span><span aria-hidden="true">'</span>
              to see all fonts.
            </p>
          </div>
        </div>`,
      ],
    },
  ];
};

export const getFontInvalidOutput = (name: string) => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Unknown font: <span class="text-tertiary-clr">"${name}"</span></p>
          <p>Available: <span class="text-secondary-clr font-bold">cascadia · fira · geist · recursive-casual</span></p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>
            Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">typeface</span><span aria-hidden="true">'</span>
            to see all available fonts.
          </p>
        </div>
      </div>`,
    ],
  },
];
