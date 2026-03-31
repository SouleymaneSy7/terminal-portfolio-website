// ============================================
// CONFIGURATION
// ============================================

export const THEMES = {
  catppuccin: {
    label: "Catppuccin Macchiato",
    description: "Soothing pastel for the weary eye",
  },
  monokai: {
    label: "Monokai",
    description: "The timeless classic",
  },
  "tokyo-night": {
    label: "Tokyo Night",
    description: "For late-night coding sessions",
  },
  dracula: {
    label: "Dracula",
    description: "Dark and mysterious",
  },
} as const;

export const FONTS = {
  fira: {
    label: "Fira Code",
    description: "Ligatures that tell a story",
    variable: "--font-fira-code",
  },
  jetbrains: {
    label: "JetBrains Mono",
    description: "Engineered for developers",
    variable: "--font-jetbrains-mono",
  },
  cascadia: {
    label: "Cascadia Code",
    description: "Crafted by Microsoft, embraced by all",
    variable: "--font-cascadia-code",
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
  if (typeof document === "undefined") return "fira";
  return (
    (document.documentElement.getAttribute("data-font") as FontKey) || "fira"
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
    console.error(error);
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
      const labelCol = theme.label.padEnd(26);
      const activeTag = isActive
        ? `  <span class="text-tertiary-clr font-bold">← active</span>`
        : "";

      return `<p>
        <span class="${isActive ? "text-tertiary-clr font-bold" : "text-secondary-clr"}">${labelCol}</span><span class="text-text-clr">${theme.description}. </span>${activeTag}
      </p>`;
    })
    .join("");

  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="space-y-3 py-1">
          <div class="space-y-1">
            <p class="text-secondary-clr font-bold">Available Themes</p>
            <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
            <p> </p>
            ${rows}
            <p> </p>
            <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
          </div>
          <div class="space-y-0.5">
            <p>
              Type
              <span> '</span><span class="text-tertiary-clr font-bold">theme &lt;name&gt;</span><span>'</span>
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
        `<div class="space-y-3 py-1">
          <div class="space-y-1">
            <p class="text-tertiary-clr font-bold">✓  Theme switched → ${label}</p>
            <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
            <p class="text-text-clr">${description}</p>
            <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
            <p class="text-text-clr">Preference saved.</p>
          </div>
          <div class="space-y-0.5">
            <p>
              Type
              <span> '</span><span class="text-tertiary-clr font-bold">theme</span><span>'</span>
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
      `<div class="space-y-3 py-1">
        <div class="space-y-1">
          <p><span class="text-secondary-clr">⚠</span>  Unknown theme: <span class="text-tertiary-clr">"${name}"</span></p>
          <p class="text-text-clr">Available: catppuccin · monokai · tokyo-night · dracula</p>
        </div>
        <div class="space-y-0.5">
          <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
          <p>
            Type
            <span> '</span><span class="text-tertiary-clr font-bold">theme</span><span>'</span>
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
      const labelCol = font.label.padEnd(20);
      const activeTag = isActive
        ? `<span class="text-tertiary-clr font-bold">← active</span>`
        : "";

      return `<p>
        <span class="${isActive ? "text-tertiary-clr font-bold" : "text-secondary-clr"}">${labelCol}</span><span class="text-text-clr">${font.description}. </span>${activeTag}
      </p>`;
    })
    .join("");

  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="space-y-3 py-1">
          <div class="space-y-1">
            <p class="text-secondary-clr font-bold">Available Fonts</p>
            <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
            <p> </p>
            ${rows}
            <p> </p>
            <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
          </div>
          <div class="space-y-0.5">
            <p>
              Type
              <span> '</span><span class="text-tertiary-clr font-bold">typeface &lt;name&gt;</span><span>'</span>
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
        `<div class="space-y-3 py-1">
          <div class="space-y-1">
            <p class="text-tertiary-clr font-bold">✓  Font switched → ${label}</p>
            <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
            <p class="text-text-clr">${description}</p>
            <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
            <p class="text-text-clr">Preference saved. All text updated.</p>
          </div>
          <div class="space-y-0.5">
            <p>
              Type
              <span> '</span><span class="text-tertiary-clr font-bold">typeface</span><span>'</span>
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
      `<div class="space-y-3 py-1">
        <div class="space-y-1">
          <p><span class="text-secondary-clr">⚠</span>  Unknown font: <span class="text-tertiary-clr">"${name}"</span></p>
          <p class="text-text-clr">Available: fira · jetbrains · cascadia</p>
        </div>
        <div class="space-y-0.5">
          <p class="text-text-clr opacity-30">────────────────────────────────────────</p>
          <p>
            Type
            <span> '</span><span class="text-tertiary-clr font-bold">typeface</span><span>'</span>
            to see all available fonts.
          </p>
        </div>
      </div>`,
    ],
  },
];
