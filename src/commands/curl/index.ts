/**
 * curl — browser-based HTTP client
 *
 */

import { curlService } from "@/services";
import { CommandHistoryOutputType, CurlServiceResponseType } from "@/types";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createHtmlOutput } from "@/utils/output/output";
import { isAxiosError } from "axios";

import { escapeHtml, formatRequestHeaders, formatResponseHeaders, prettyBody } from "./formatters";
import { curlHelpOutput, curlUsageOutput } from "./outputs";
import { isValidPublicUrl, normalizeUrl, parseCurlArgs } from "./parser";

export { curlUsageOutput, isValidPublicUrl };

export async function curlCommand(rawArgs: string[]): Promise<CommandHistoryOutputType> {
  const opts = parseCurlArgs(rawArgs);

  if (opts.parseError) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
          <p>${DT.icons.warning} ${escapeHtml(opts.parseError)}</p>
          <div class="space-y-t-footer">
            <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
            <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">curl --help</span>${DT.decorators.quote} for usage.</p>
          </div>
        </div>`,
    );
  }

  if (opts.help) return curlHelpOutput();

  if (!opts.url) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
          <p>${DT.icons.warning} curl: no URL specified!</p>
          <div class="space-y-t-footer">
            <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
            <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">curl --help</span>${DT.decorators.quote} for usage.</p>
          </div>
        </div>`,
    );
  }

  const url = normalizeUrl(opts.url);
  const blocks: CommandHistoryOutputType = [];

  if (opts.verbose) {
    blocks.push(
      ...createHtmlOutput(
        `<div class="space-y-0">${formatRequestHeaders(
          url,
          opts.headOnly ? "HEAD" : opts.method,
          opts.headers,
        )}</div>`,
      ),
    );
  }

  let resp: CurlServiceResponseType;

  try {
    resp = await curlService.request({
      url,
      method: opts.method,
      headers: opts.headers,
      body: opts.body,
      headOnly: opts.headOnly,
      follow: opts.follow,
    });
  } catch (err) {
    const isCors =
      isAxiosError(err) &&
      (err.code === "ERR_NETWORK" || (err.message?.toLowerCase().includes("network") ?? false));

    if (isCors) {
      return createHtmlOutput(
        `<div class="space-y-t-section py-t-outer">
            <div class="space-y-t-group">
              <p>${DT.icons.warning} curl: (7) Failed to connect — CORS restriction.</p>
              <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
              <p>The server did not send the required <span class="text-tertiary-clr">Access-Control-Allow-Origin</span> headers.</p>
            </div>
            <div class="space-y-t-group">
              <p class="text-secondary-clr font-bold">CORS-friendly APIs to try:</p>
              <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl https://wttr.in/Paris?format=3</p>
              <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl https://httpbin.org/get</p>
              <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl https://api.adviceslip.com/advice</p>
              <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl https://v2.jokeapi.dev/joke/Programming?type=single</p>
            </div>
          </div>`,
      );
    }

    const msg = err instanceof Error ? err.message : String(err);
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
          <p>${DT.icons.warning} curl: Could not connect to <span class="text-tertiary-clr">${escapeHtml(
            url,
          )}</span></p>
          <p class="text-text-clr opacity-sep">${escapeHtml(msg)}</p>
        </div>`,
    );
  }

  if (opts.verbose || opts.headOnly) {
    blocks.push(...createHtmlOutput(`<div class="space-y-0">${formatResponseHeaders(resp)}</div>`));
  }

  if (opts.headOnly) return blocks;

  if (!opts.silent && !opts.verbose) {
    const kb = (resp.bodySize / 1024).toFixed(1);
    blocks.push(
      ...createHtmlOutput(
        `<div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep">
            <span class="text-tertiary-clr">HTTP ${resp.status}</span>
            <span> ${resp.statusText}</span>
            <span class="text-text-clr opacity-sep"> · </span>
            <span>${kb} KB received</span>
          </p>
        </div>`,
      ),
    );
  }

  const body = prettyBody(resp.body, resp.contentType);

  if (resp.contentType.includes("json")) {
    blocks.push(
      ...createHtmlOutput(
        `<pre class="whitespace-pre-wrap text-tertiary-clr text-fs-body">${escapeHtml(body)}</pre>`,
      ),
    );
  } else {
    const lines = body.split("\n");
    const truncated = lines.length > 2000;
    const display = truncated ? lines.slice(0, 2000) : lines;
    const bodyHtml = display
      .map((l) => `<p class="whitespace-pre">${escapeHtml(l)}</p>`)
      .join("\n");
    const note = truncated
      ? `<p class="text-secondary-clr opacity-sep">… output truncated at 2 000 lines</p>`
      : "";

    blocks.push(
      ...createHtmlOutput(`<div class="space-y-0 text-text-clr">${bodyHtml}${note}</div>`),
    );
  }

  if (opts.outputNote) {
    blocks.push(
      ...createHtmlOutput(
        `<p class="text-text-clr opacity-sep">${escapeHtml(opts.outputNote)}</p>`,
      ),
    );
  }

  return blocks;
}
