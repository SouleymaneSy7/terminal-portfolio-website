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

  // ── Material family ───────────────────────
  "material-default": {
    label: "Material Default",
    description: "The original — teal green on deep blue-grey",
  },
  "material-lighter": {
    label: "Material Lighter",
    description: "Light and airy — the Material light variant",
  },
  "material-oceanic": {
    label: "Material Oceanic",
    description: "Ocean-blue accent, same classic Material base",
  },
  "material-palenight": {
    label: "Material Palenight",
    description: "Deep purple background with vivid neon accents",
  },
  "material-deep-ocean": {
    label: "Material Deep Ocean",
    description: "Near-black depths with electric blue and violet",
  },
  "material-high-contrast": {
    label: "Material High Contrast",
    description: "Pure black, maximum contrast — nothing distracts",
  },

  // ── Others ───────────────────────────────
  "ayu-dark": {
    label: "Ayu Dark",
    description: "Dark background, warm amber and orange — minimal and sharp",
  },
  "night-owl": {
    label: "Night Owl",
    description: "Designed for low-light — cyan primary, yellow highlights",
  },
  synthwave: {
    label: "Synthwave '84",
    description: "Neon pink and cyan on deep purple — pure retro-futurism",
  },
  kanagawa: {
    label: "Kanagawa",
    description: "Inspired by the Great Wave — samurai red, ocean blue",
  },
  horizon: {
    label: "Horizon",
    description: "Warm coral and pink on dark indigo — sunset aesthetic",
  },
  poimandres: {
    label: "Poimandres",
    description: "Teal and purple on near-black — calm, focused, modern",
  },
  vesper: {
    label: "Vesper",
    description: "Pure black background, amber gold — minimal and elegant",
  },
  "hack-the-box": {
    label: "Hack The Box",
    description: "Matrix green on deep navy — for the hacker in you",
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
  if (typeof document === "undefined") return "cascadia";
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

  const groups: { label: string; keys: ThemeKey[] }[] = [
    {
      label: "Catppuccin",
      keys: [
        "catppuccin",
        "catppuccin-latte",
        "catppuccin-frappe",
        "catppuccin-mocha",
      ],
    },
    {
      label: "Popular Dark",
      keys: [
        "monokai",
        "tokyo-night",
        "dracula",
        "nord",
        "gruvbox",
        "everforest",
        "rose-pine",
      ],
    },
    {
      label: "Editor Classics",
      keys: [
        "solarized-dark",
        "oceanic",
        "cobalt2",
        "github",
        "one-dark",
        "atom-one-dark",
      ],
    },
    {
      label: "Material",
      keys: [
        "material-default",
        "material-lighter",
        "material-oceanic",
        "material-palenight",
        "material-deep-ocean",
        "material-high-contrast",
      ],
    },
    {
      label: "Others",
      keys: [
        "ayu-dark",
        "night-owl",
        "synthwave",
        "kanagawa",
        "horizon",
        "poimandres",
        "vesper",
        "hack-the-box",
      ],
    },
  ];

  const renderGroup = ({
    label,
    keys,
  }: {
    label: string;
    keys: ThemeKey[];
  }) => {
    const rows = keys
      .map((key) => {
        const theme = THEMES[key];
        const isActive = key === current;
        const displayLabel = theme.label.padEnd(28);
        const nameClass = isActive
          ? "text-primary-clr font-bold"
          : "text-tertiary-clr";
        const activeTag = isActive
          ? ` <span class="text-primary-clr font-bold"> ← active</span>`
          : "";

        return `<p>
          <span class="${nameClass}">${displayLabel}</span>
          <span class="text-text-clr">- ${theme.description}.</span>${activeTag}
        </p>`;
      })
      .join("");

    return `<div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">${label}</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      ${rows}
    </div>`;
  };

  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="space-y-t-section py-t-outer">

          ${groups.map(renderGroup).join("\n")}

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
            <p>${description}.</p>
            <p><span class="text-primary-clr font-bold">✓ Preference saved.</span> All text updated instantly.</p>
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
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Unknown theme: <span class="text-tertiary-clr">"${name}"</span></p>
          
          <div class="space-y-t-group">
            <p>Available theme:</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────</p>
          </div>

          <div class="space-y-t-group">
          <p class="text-secondary-clr"><span class="text-primary-clr font-bold">Catppuccin:</span>  catppuccin · catppuccin-latte · catppuccin-frappe · catppuccin-mocha</p>
          <p class="text-secondary-clr"><span class="text-primary-clr font-bold">Dark:</span>   monokai · tokyo-night · dracula · nord · gruvbox · everforest · rose-pine</p>
          <p class="text-secondary-clr"><span class="text-primary-clr font-bold">Classics:</span>   solarized-dark · oceanic · cobalt2 · github · one-dark · atom-one-dark</p>
          <p class="text-secondary-clr"><span class="text-primary-clr font-bold">Material:</span>   material-default · material-lighter · material-oceanic · material-palenight · material-deep-ocean · material-high-contrast</p>
          <p class="text-secondary-clr"><span class="text-primary-clr font-bold">Others:</span>   ayu-dark · night-owl · synthwave · kanagawa · horizon · poimandres · vesper · hack-the-box</p>
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
      const displayLabel = font.label.padEnd(24);
      const nameClass = isActive
        ? "text-primary-clr font-bold"
        : "text-tertiary-clr";
      const activeTag = isActive
        ? `<span class="text-primary-clr font-bold"> ← active</span>`
        : "";

      return `<p>
        <span class="${nameClass}">${displayLabel}</span>
        <span class="text-text-clr">- ${font.description}.</span>${activeTag}
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
            <p class="text-secondary-clr font-bold">✓ Font switched <span aria-hidden="true">→</span> ${label}</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>${description}.</p>
            <p><span class="text-primary-clr font-bold">✓ Preference saved.</span> All text updated instantly.</p>
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
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Unknown font: <span class="text-tertiary-clr">"${name}"</span></p>

          <div class="space-y-t-group">
            <p>Available font:</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────</p>
          </div>

          <div class="space-y-t-group">
            <p class="text-secondary-clr font-bold">cascadia · fira · geist · recursive-casual</p>
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
