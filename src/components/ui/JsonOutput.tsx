"use client";

/**
 * JsonOutput — renders raw JSON with syntax-aware coloring and a
 * one-click copy-to-clipboard button.
 *
 * Used by commands that expose a --json / -j flag:
 *   github <user> --json
 *   ip --json
 *   convert 100 USD EUR --json
 *
 * Deliberately a React component (not a static HTML string) so the
 * copy action and its transient "Copied ✓" state can live in React
 * state instead of inline `onclick` attributes — which DOMPurify strips.
 *
 */

import { JsonOutputPropsType } from "@/types";
import { motion } from "framer-motion";
import * as React from "react";
import VisuallyHidden from "../common/VisuallyHidden";

// ─────────────────────────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────────────────────────

const COPY_RESET_MS = 2_000;

// ─────────────────────────────────────────────────────────────────
// SYNTAX HIGHLIGHTER  (runs locally, zero dependencies)
// ─────────────────────────────────────────────────────────────────

/**
 * Colorizes JSON tokens with themed CSS variables.
 * Runs entirely in the browser — no external lib needed for this scale.
 *
 * Token → CSS class mapping:
 *   String values  → text-tertiary-clr  (green-ish in most themes)
 *   Keys           → text-primary-clr   (blue-ish)
 *   Numbers        → text-secondary-clr (red / pink)
 *   Booleans/null  → text-secondary-clr
 *   Punctuation    → text-text-clr (muted)
 */
function highlightJson(json: string): string {
  // Regex covers: keys, strings, numbers, booleans, null, punctuation
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[{}[\],:])/g,
    (match) => {
      let cls = "text-text-clr opacity-50";

      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-primary-clr font-bold";
        } else {
          cls = "text-tertiary-clr";
        }
      } else if (/true|false/.test(match)) {
        cls = "text-secondary-clr font-bold";
      } else if (/null/.test(match)) {
        cls = "text-secondary-clr opacity-70";
      } else if (/^-?\d/.test(match)) {
        cls = "text-secondary-clr";
      }

      return `<span class="${cls}">${match}</span>`;
    },
  );
}

const JsonOutput: React.FC<JsonOutputPropsType> = ({ data, label }) => {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Memoized so it doesn't re-serialize on every render
  const json = React.useMemo(() => JSON.stringify(data, null, 2), [data]);
  const highlighted = React.useMemo(() => highlightJson(json), [json]);
  const lineCount = React.useMemo(() => json.split("\n").length, [json]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(json);
    } catch {
      // Fallback for environments without Clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = json;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), COPY_RESET_MS);
  }, [json]);

  const rawJsonLength = (new TextEncoder().encode(json).length / 1024).toFixed(1);

  return (
    <motion.div
      className="space-y-t-group py-t-outer"
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {label && (
            <p className="font-bold text-secondary-clr" aria-label={`JSON output for ${label}`}>
              {label}
            </p>
          )}
          <p className="text-fs-body font-bold text-text-clr opacity-sep">— ({lineCount} lines)</p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "JSON copied to clipboard" : "Copy JSON to clipboard"}
          aria-pressed={copied}
          className={[
            "cursor-pointer text-fs-body font-bold transition-colors duration-150",
            "focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-clr",
            copied
              ? "text-tertiary-clr"
              : "text-text-clr opacity-50 hover:text-tertiary-clr hover:opacity-100",
          ].join(" ")}
        >
          {copied ? "✓ copied" : "[ copy ]"}
        </button>
      </div>

      <p className="text-text-clr opacity-sep" aria-hidden="true">
        ────────────────────────────────────────
      </p>

      {/* ── JSON block ─────────────────────────────────────────── */}
      <pre
        className="text-fs-body leading-relaxed break-all whitespace-pre-wrap"
        role="region"
        aria-label="JSON data"
        tabIndex={0}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />

      <VisuallyHidden role="status" aria-live="polite" aria-atomic="true">
        {copied ? "JSON copied to clipboard." : ""}
      </VisuallyHidden>

      <p className="text-text-clr opacity-sep" aria-hidden="true">
        ────────────────────────────────────────
      </p>

      <p className="text-text-clr opacity-sep">
        Raw JSON — <span className="font-bold text-tertiary-clr">{rawJsonLength} KB</span>
      </p>
    </motion.div>
  );
};

export default JsonOutput;
