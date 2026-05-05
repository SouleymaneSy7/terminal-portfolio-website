/**
 * color — convert colors between hex, rgb, hsl, and oklch.
 *
 * Accepts: #hex, rgb(...), hsl(...), or color names
 * Outputs: all four representations
 */

import { COLOR_HELP } from "@/constants/help/utils";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";

// ─────────────────────────────────────────────────────────────────
// NAMED COLORS
// ─────────────────────────────────────────────────────────────────

const NAMED_COLORS: Record<string, [number, number, number]> = {
  red: [255, 0, 0],
  green: [0, 128, 0],
  blue: [0, 0, 255],
  white: [255, 255, 255],
  black: [0, 0, 0],
  gray: [128, 128, 128],
  grey: [128, 128, 128],
  yellow: [255, 255, 0],
  cyan: [0, 255, 255],
  magenta: [255, 0, 255],
  orange: [255, 165, 0],
  purple: [128, 0, 128],
  pink: [255, 192, 203],
  brown: [165, 42, 42],
  lime: [0, 255, 0],
  navy: [0, 0, 128],
  teal: [0, 128, 128],
  silver: [192, 192, 192],
  gold: [255, 215, 0],
  coral: [255, 127, 80],
  salmon: [250, 128, 114],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  indigo: [75, 0, 130],
  crimson: [220, 20, 60],
  lavender: [230, 230, 250],
  mint: [189, 252, 201],
  tomato: [255, 99, 71],
  orchid: [218, 112, 214],
  khaki: [240, 230, 140],
};

// ─────────────────────────────────────────────────────────────────
// PARSING
// ─────────────────────────────────────────────────────────────────

function parseInput(raw: string): [number, number, number] | null {
  const s = raw.trim().toLowerCase();

  if (NAMED_COLORS[s]) return NAMED_COLORS[s];

  const hexStr = s.startsWith("#") ? s.slice(1) : s;
  if (/^[0-9a-f]{3}$/.test(hexStr)) {
    const [r, g, b] = hexStr.split("").map((c) => parseInt(c + c, 16));
    return [r, g, b];
  }
  if (/^[0-9a-f]{6}$/.test(hexStr)) {
    return [
      parseInt(hexStr.slice(0, 2), 16),
      parseInt(hexStr.slice(2, 4), 16),
      parseInt(hexStr.slice(4, 6), 16),
    ];
  }

  const rgbMatch = s.match(/^rgba?\(\s*([\d.]+)[,\s]\s*([\d.]+)[,\s]\s*([\d.]+)/);
  if (rgbMatch) {
    return [
      Math.round(Number(rgbMatch[1])),
      Math.round(Number(rgbMatch[2])),
      Math.round(Number(rgbMatch[3])),
    ];
  }

  const hslMatch = s.match(/^hsla?\(\s*([\d.]+)[,\s]\s*([\d.]+)%?[,\s]\s*([\d.]+)%?/);
  if (hslMatch) {
    return hslToRgb(Number(hslMatch[1]), Number(hslMatch[2]), Number(hslMatch[3]));
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────
// CONVERSIONS
// ─────────────────────────────────────────────────────────────────

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const nr = r / 255,
    ng = g / 255,
    nb = b / 255;
  const max = Math.max(nr, ng, nb),
    min = Math.min(nr, ng, nb);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  switch (max) {
    case nr:
      h = ((ng - nb) / d + (ng < nb ? 6 : 0)) / 6;
      break;
    case ng:
      h = ((nb - nr) / d + 2) / 6;
      break;
    case nb:
      h = ((nr - ng) / d + 4) / 6;
      break;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function linearize(c: number): number {
  c = c / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  const lr = linearize(r),
    lg = linearize(g),
    lb = linearize(b);
  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb;
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.072175 * lb;
  const z = 0.0193339 * lr + 0.119192 * lg + 0.9503041 * lb;
  const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
  const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
  const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bVal = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(a * a + bVal * bVal);
  let H = (Math.atan2(bVal, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return [Math.round(L * 10000) / 10000, Math.round(C * 10000) / 10000, Math.round(H * 100) / 100];
}

function contrastColor(r: number, g: number, b: number): string {
  const lum = 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
  return lum > 0.179 ? "#000000" : "#ffffff";
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleColorCommand = (args: string[]) => {
  const { flags, positional } = parseArgs(args);

  if (flags.help) return COLOR_HELP;

  if (positional.length === 0) {
    return createErrorOutput(
      "No color provided.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">color &lt;#hex | rgb(...) | hsl(...) | name&gt;</span>`,
    );
  }

  const raw = positional.join(" ");
  const rgb = parseInput(raw);

  if (!rgb) {
    return createErrorOutput(
      `Could not parse color: <span class="text-tertiary-clr">"${raw}"</span>`,
      `Accepted formats: <span class="text-tertiary-clr">#hex</span> · <span class="text-tertiary-clr">rgb(r,g,b)</span> · <span class="text-tertiary-clr">hsl(h,s,l)</span> · named colors`,
    );
  }

  const [r, g, b] = rgb;
  const hex = rgbToHex(r, g, b);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [oklchL, oklchC, oklchH] = rgbToOklch(r, g, b);
  const textColor = contrastColor(r, g, b);

  const swatchStyle = `background-color:${hex};color:${textColor};padding:2px 12px;border-radius:3px;font-weight:bold;`;

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Color Converter</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Input:  <span class="text-tertiary-clr">${raw}</span></p>
        <p>Swatch: <span aria-hidden="true" style="${swatchStyle}">${hex}</span></p>
      </div>

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Representations</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">HEX     </span> - <span class="text-tertiary-clr font-bold">${hex}</span></p>
        <p><span class="text-secondary-clr">RGB     </span> - <span class="text-tertiary-clr font-bold">rgb(${r}, ${g}, ${b})</span></p>
        <p><span class="text-secondary-clr">HSL     </span> - <span class="text-tertiary-clr font-bold">hsl(${h}, ${s}%, ${l}%)</span></p>
        <p><span class="text-secondary-clr">OKLCH   </span> - <span class="text-tertiary-clr font-bold">oklch(${oklchL} ${oklchC} ${oklchH})</span></p>
      </div>

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Channels</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">R </span>  ${r}  <span class="text-text-clr opacity-sep">(${Math.round((r / 255) * 100)}%)</span></p>
        <p><span class="text-secondary-clr">G </span>  ${g}  <span class="text-text-clr opacity-sep">(${Math.round((g / 255) * 100)}%)</span></p>
        <p><span class="text-secondary-clr">B </span>  ${b}  <span class="text-text-clr opacity-sep">(${Math.round((b / 255) * 100)}%)</span></p>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">color --help</span>${DT.decorators.quote} for all options.</p>
      </div>
    </div>`,
  );
};
