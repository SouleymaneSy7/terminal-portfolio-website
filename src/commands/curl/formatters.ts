import { CurlServiceResponseType } from "@/types";

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formatRequestHeaders(
  url: string,
  method: string,
  headers: Record<string, string>,
): string {
  const parsed = (() => {
    try {
      return new URL(url);
    } catch {
      return null;
    }
  })();
  const host = parsed?.host ?? url;
  const path = parsed ? parsed.pathname + parsed.search || "/" : "/";
  const lines = [
    `> ${method} ${path} HTTP/1.1`,
    `> Host: ${host}`,
    `> User-Agent: curl/8.5.0`,
    `> Accept: */*`,
    ...Object.entries(headers).map(([k, v]) => `> ${k}: ${v}`),
    ">",
  ];
  return lines
    .map(
      (l) =>
        `<p class="text-text-clr opacity-sep whitespace-pre">${escHtml(l)}</p>`,
    )
    .join("\n");
}

export function formatResponseHeaders(resp: CurlServiceResponseType): string {
  const version = resp.status === 301 || resp.status === 302 ? "1.1" : "2";
  const lines = [
    `< HTTP/${version} ${resp.status} ${resp.statusText}`,
    ...Object.entries(resp.headers).map(([k, v]) => `< ${k}: ${v}`),
    "<",
  ];
  return lines
    .map((l) => `<p class="text-text-clr whitespace-pre">${escHtml(l)}</p>`)
    .join("\n");
}

export function prettyBody(raw: string, contentType: string): string {
  if (contentType.includes("json")) {
    try {
      return JSON.stringify(JSON.parse(raw), null, 2);
    } catch {
      /* not JSON */
    }
  }
  return raw;
}

export function escapeHtml(text: string): string {
  return escHtml(text);
}
