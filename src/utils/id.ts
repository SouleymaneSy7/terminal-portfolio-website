/**
 * Unified ID generator for terminal entities (notes, todos, snippets).
 * Standardizes on 8-character hex strings.
 */

export const generateShortId = (): string => {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
};
