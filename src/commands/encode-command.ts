/**
 * encode / decode — text encoding and decoding utilities.
 *
 * Modes: base64 (default), url, hex
 * All operations run in the browser — no network requests.
 */

import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";
import { ENCODE_HELP, DECODE_HELP } from "@/constants/help/utils";

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function decodeBase64(text: string): string {
  try {
    const binary = atob(text.trim());
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error("Invalid Base64 string.");
  }
}

function encodeHex(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function decodeHex(text: string): string {
  const clean = text.trim().replace(/\s/g, "");
  if (!/^[0-9a-fA-F]+$/.test(clean) || clean.length % 2 !== 0) {
    throw new Error("Invalid hex string.");
  }
  const bytes = clean.match(/.{2}/g)!.map((h) => parseInt(h, 16));
  return new TextDecoder().decode(new Uint8Array(bytes));
}

// ─────────────────────────────────────────────────────────────────
// OUTPUT BLOCK
// ─────────────────────────────────────────────────────────────────

function renderResult(mode: "encode" | "decode", format: string, input: string, output: string) {
  const inputPreview = input.length > 80 ? input.slice(0, 77) + "..." : input;
  const outputPreview = output.length > 80 ? output.slice(0, 77) + "..." : output;

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">${mode === "encode" ? "Encoded" : "Decoded"} · ${format.toUpperCase()}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Input   </span>${DT.decorators.arrow}<span class="text-text-clr">${inputPreview}</span></p>
        <p><span class="text-secondary-clr">Output  </span>${DT.decorators.arrow}<span class="text-tertiary-clr font-bold break-all">${outputPreview}</span></p>
      </div>
      ${
        output.length > 80
          ? `<div class="space-y-t-group">
              <p class="text-secondary-clr font-bold">Full output</p>
              <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
              <p class="text-tertiary-clr font-bold whitespace-pre-wrap break-all">${output}</p>
            </div>`
          : ""
      }
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p class="text-text-clr opacity-dim">All operations run locally — nothing is sent over the network.</p>
      </div>
    </div>`,
  );
}

// ─────────────────────────────────────────────────────────────────
// SHARED LOGIC
// ─────────────────────────────────────────────────────────────────

const FORMATS = new Set(["base64", "url", "hex"]);

function resolveFormatAndText(positional: string[]): {
  format: string;
  textArgs: string[];
} {
  if (positional.length > 0 && FORMATS.has(positional[0].toLowerCase())) {
    return {
      format: positional[0].toLowerCase(),
      textArgs: positional.slice(1),
    };
  }
  return { format: "base64", textArgs: positional };
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLERS
// ─────────────────────────────────────────────────────────────────

export const handleEncodeCommand = (args: string[]) => {
  const { flags, positional } = parseArgs(args);

  if (flags.help) return ENCODE_HELP;

  if (positional.length === 0) {
    return createErrorOutput(
      "No text provided.",
      `Usage: <span class="text-tertiary-clr font-bold">encode [format] &lt;text&gt;</span>`,
    );
  }

  const { format, textArgs } = resolveFormatAndText(positional);

  if (textArgs.length === 0) {
    return createErrorOutput(
      "No text provided after format.",
      `Usage: <span class="text-tertiary-clr font-bold">encode ${format} &lt;text&gt;</span>`,
    );
  }

  const input = textArgs.join(" ");

  try {
    let output: string;
    if (format === "base64") output = encodeBase64(input);
    else if (format === "url") output = encodeURIComponent(input);
    else output = encodeHex(input);
    return renderResult("encode", format, input, output);
  } catch (err) {
    return createErrorOutput(
      `Encoding failed: ${err instanceof Error ? err.message : "Unknown error"}`,
    );
  }
};

export const handleDecodeCommand = (args: string[]) => {
  const { flags, positional } = parseArgs(args);

  if (flags.help) return DECODE_HELP;

  if (positional.length === 0) {
    return createErrorOutput(
      "No text provided.",
      `Usage: <span class="text-tertiary-clr font-bold">decode [format] &lt;text&gt;</span>`,
    );
  }

  const { format, textArgs } = resolveFormatAndText(positional);

  if (textArgs.length === 0) {
    return createErrorOutput(
      "No text provided after format.",
      `Usage: <span class="text-tertiary-clr font-bold">decode ${format} &lt;text&gt;</span>`,
    );
  }

  const input = textArgs.join(" ");

  try {
    let output: string;
    if (format === "base64") output = decodeBase64(input);
    else if (format === "url") {
      try {
        output = decodeURIComponent(input);
      } catch {
        throw new Error("Invalid URL-encoded string.");
      }
    } else {
      output = decodeHex(input);
    }
    return renderResult("decode", format, input, output);
  } catch (err) {
    return createErrorOutput(
      `Decoding failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      `Make sure your input is valid <span class="text-tertiary-clr">${format}</span> text.`,
    );
  }
};
