/**
 * Output factory utilities for terminal command responses.
 * All command handlers return one of these block types.
 *
 * Content inside "html" blocks is sanitised by DOMPurify
 * at render time inside <CommandOutput />.
 */

import { CommandHistoryOutputType } from "@/types";

// ─────────────────────────────────────────────────────────────────
// BLOCK FACTORIES
// ─────────────────────────────────────────────────────────────────

/**
 * Creates a single HTML output block.
 * Content is sanitised by DOMPurify in <CommandOutput />.
 */
export const createHtmlOutput = (content: string): CommandHistoryOutputType => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [content],
  },
];

/**
 * Creates a plain-text output block (whitespace-pre rendered, no HTML).
 */
export const createTextOutput = (lines: string[]): CommandHistoryOutputType => [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: lines,
  },
];

/**
 * Creates a link block that renders one or more <a> tags.
 * Each entry is a [href, label] tuple.
 */
export const createLinkOutput = (
  links: [href: string, label: string][],
): CommandHistoryOutputType => [
  {
    id: crypto.randomUUID(),
    type: "link" as const,
    content: links,
  },
];

/**
 * Creates a help block — semantically identical to createHtmlOutput,
 * kept as a named alias so call-sites are self-documenting.
 */
export const createHelpBlock = (content: string): CommandHistoryOutputType => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [content],
  },
];
