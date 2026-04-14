// ─────────────────────────────────────────────────────────────────
//
// Simulates curl behaviour in the browser terminal.
// HTTP logic lives in curl.service.ts.
// All output is rendered as HTML via createHtmlOutput.
//
// Supported flags:
//   -v / --verbose      show request + response headers
//   -I / --head         HEAD request only
//   -s / --silent       suppress progress line
//   -X / --request      HTTP method  (default: GET)
//   -H / --header       add request header  (repeatable)
//   -d / --data         request body (implies POST if no -X)
//   -u / --user         Basic Auth  user:password
//   -L / --location     follow redirects
//   -o / --output       ignored (noted in output)
//   --help / -h         show help
// ─────────────────────────────────────────────────────────────────

import { createHtmlOutput } from "@/constants";
import { curlService, isAxiosError } from "@/services/curl.service";
import { CurlOptionsType, CurlServiceResponseType } from "@/types";

// ─────────────────────────────────────────────────────────────────
// ARGUMENT PARSER  (pure function — no side effects)
// ─────────────────────────────────────────────────────────────────

function parseCurlArgs(args: string[]): CurlOptionsType {
  const opts: CurlOptionsType = {
    url: null,
    method: "GET",
    headers: {},
    body: null,
    verbose: false,
    headOnly: false,
    silent: false,
    follow: true,
    outputNote: null,
    help: false,
    parseError: null,
  };

  let bodyExplicit = false;
  let methodExplicit = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--help" || arg === "-h") {
      opts.help = true;
      return opts;
    }
    if (arg === "-v" || arg === "--verbose") {
      opts.verbose = true;
      continue;
    }
    if (arg === "-s" || arg === "--silent") {
      opts.silent = true;
      continue;
    }
    if (arg === "-L" || arg === "--location") {
      opts.follow = true;
      continue;
    }

    if (arg === "-I" || arg === "--head") {
      opts.headOnly = true;
      opts.method = "HEAD";
      methodExplicit = true;
      continue;
    }

    if (arg === "-X" || arg === "--request") {
      const method = args[++i];
      if (!method) {
        opts.parseError = `option ${arg}: requires argument`;
        return opts;
      }
      opts.method = method.toUpperCase();
      methodExplicit = true;
      continue;
    }

    if (/^-X.+$/.test(arg)) {
      opts.method = arg.slice(2).toUpperCase();
      methodExplicit = true;
      continue;
    }

    if (arg === "-H" || arg === "--header") {
      const hdr = args[++i];
      if (!hdr) {
        opts.parseError = `option ${arg}: requires argument`;
        return opts;
      }
      const colonIdx = hdr.indexOf(":");
      if (colonIdx < 0) {
        opts.parseError = `invalid header: ${hdr}`;
        return opts;
      }
      opts.headers[hdr.slice(0, colonIdx).trim()] = hdr
        .slice(colonIdx + 1)
        .trim();
      continue;
    }

    if (
      arg === "-d" ||
      arg === "--data" ||
      arg === "--data-raw" ||
      arg === "--data-binary"
    ) {
      const data = args[++i];
      if (!data) {
        opts.parseError = `option ${arg}: requires argument`;
        return opts;
      }
      opts.body = data;
      bodyExplicit = true;
      if (!methodExplicit) opts.method = "POST";
      continue;
    }

    if (arg === "-u" || arg === "--user") {
      const creds = args[++i];
      if (!creds) {
        opts.parseError = `option ${arg}: requires argument`;
        return opts;
      }
      opts.headers["Authorization"] = `Basic ${btoa(creds)}`;
      continue;
    }

    if (arg === "-o" || arg === "--output") {
      const out = args[++i] ?? "<file>";
      opts.outputNote = `Note: -o ignored — output displayed in terminal (target was: ${out})`;
      continue;
    }

    if (arg === "-w" || arg === "--write-out") {
      i++;
      continue;
    }

    if (
      [
        "-k",
        "--insecure",
        "--compressed",
        "--no-buffer",
        "--http1.1",
        "--http2",
      ].includes(arg)
    )
      continue;

    if (arg.startsWith("-")) {
      opts.parseError = `curl: (3) unrecognized option '${arg}'`;
      return opts;
    }

    if (!opts.url) opts.url = arg;
  }

  if (bodyExplicit && !opts.headers["Content-Type"]) {
    opts.headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  return opts;
}

// ─────────────────────────────────────────────────────────────────
// FORMATTING HELPERS
// ─────────────────────────────────────────────────────────────────

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatRequestHeaders(
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

function formatResponseHeaders(resp: CurlServiceResponseType): string {
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

function prettyBody(raw: string, contentType: string): string {
  if (contentType.includes("json")) {
    try {
      return JSON.stringify(JSON.parse(raw), null, 2);
    } catch {
      /* not JSON */
    }
  }
  return raw;
}

// ─────────────────────────────────────────────────────────────────
// HELP OUTPUT
// ─────────────────────────────────────────────────────────────────

function curlHelpOutput() {
  return [
    createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">curl — Usage</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-secondary-clr">Usage:</span>  curl [options...] &lt;url&gt;</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Options  <span class="text-text-clr opacity-sep">(browser subset)</span></p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-tertiary-clr font-bold">-v, --verbose        </span> Make the operation more talkative</p>
          <p><span class="text-tertiary-clr font-bold">-I, --head           </span> Show document info only (HEAD request)</p>
          <p><span class="text-tertiary-clr font-bold">-s, --silent         </span> Silent mode — suppress progress line</p>
          <p><span class="text-tertiary-clr font-bold">-X, --request &lt;cmd&gt; </span> Specify request method</p>
          <p><span class="text-tertiary-clr font-bold">-H, --header &lt;hdr&gt;  </span> Pass custom header  e.g. -H 'Accept: application/json'</p>
          <p><span class="text-tertiary-clr font-bold">-d, --data &lt;data&gt;   </span> HTTP POST data  (implies -X POST)</p>
          <p><span class="text-tertiary-clr font-bold">-u, --user &lt;u:p&gt;    </span> Server user and password (Basic Auth)</p>
          <p><span class="text-tertiary-clr font-bold">-L, --location       </span> Follow redirects  (default: on)</p>
          <p><span class="text-tertiary-clr font-bold">-o, --output &lt;file&gt; </span> Ignored — output always shown in terminal</p>
          <p><span class="text-tertiary-clr font-bold">-h, --help           </span> This help text</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Note</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Browser CORS restrictions apply. Cross-origin requests succeed only</p>
          <p>when the server sends appropriate <span class="text-tertiary-clr">Access-Control-Allow-Origin</span> headers.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Examples</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl https://wttr.in/Paris?format=3</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl -I https://httpbin.org/get</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl -v https://httpbin.org/get</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl -X POST https://httpbin.org/post -d 'key=value'</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl -H 'Accept: application/json' https://httpbin.org/get</p>
        </div>

      </div>`,
    ),
  ];
}

// ─────────────────────────────────────────────────────────────────
// MAIN EXECUTOR
// ─────────────────────────────────────────────────────────────────

export async function curlCommand(rawArgs: string[]) {
  const opts = parseCurlArgs(rawArgs);

  if (opts.parseError) {
    return [
      createHtmlOutput(
        `<div class="space-y-t-section py-t-outer">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> ${escHtml(opts.parseError)}</p>
          <div class="space-y-t-footer">
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">curl --help</span><span aria-hidden="true">'</span> for usage.</p>
          </div>
        </div>`,
      ),
    ];
  }

  if (opts.help) return curlHelpOutput();

  if (!opts.url) {
    return [
      createHtmlOutput(
        `<div class="space-y-t-section py-t-outer">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> curl: no URL specified!</p>
          <div class="space-y-t-footer">
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">curl --help</span><span aria-hidden="true">'</span> for usage.</p>
          </div>
        </div>`,
      ),
    ];
  }

  // Normalise URL
  const url = /^https?:\/\//i.test(opts.url) ? opts.url : "https://" + opts.url;

  const blocks: ReturnType<typeof createHtmlOutput>[] = [];

  // ── Verbose: request headers ──────────────────────────────────
  if (opts.verbose) {
    blocks.push(
      createHtmlOutput(
        `<div class="space-y-0">${formatRequestHeaders(url, opts.headOnly ? "HEAD" : opts.method, opts.headers)}</div>`,
      ),
    );
  }

  // ── HTTP request (via curlService / axios) ────────────────────
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
      (err.code === "ERR_NETWORK" ||
        (err.message?.toLowerCase().includes("network") ?? false));

    if (isCors) {
      return [
        createHtmlOutput(
          `<div class="space-y-t-section py-t-outer">
            <div class="space-y-t-group">
              <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> curl: (7) Failed to connect — CORS restriction.</p>
              <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
              <p>The server did not send the required <span class="text-tertiary-clr">Access-Control-Allow-Origin</span> headers.</p>
            </div>
            <div class="space-y-t-group">
              <p class="text-secondary-clr font-bold">CORS-friendly APIs to try:</p>
              <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl https://wttr.in/Paris?format=3</p>
              <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl https://httpbin.org/get</p>
              <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl https://api.adviceslip.com/advice</p>
              <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl https://v2.jokeapi.dev/joke/Programming?type=single</p>
            </div>
          </div>`,
        ),
      ];
    }

    const msg = err instanceof Error ? err.message : String(err);
    return [
      createHtmlOutput(
        `<div class="space-y-t-section py-t-outer">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> curl: Could not connect to <span class="text-tertiary-clr">${escHtml(url)}</span></p>
          <p class="text-text-clr opacity-sep">${escHtml(msg)}</p>
        </div>`,
      ),
    ];
  }

  // ── Verbose / HEAD: response headers ─────────────────────────
  if (opts.verbose || opts.headOnly) {
    blocks.push(
      createHtmlOutput(
        `<div class="space-y-0">${formatResponseHeaders(resp)}</div>`,
      ),
    );
  }

  if (opts.headOnly) return blocks;

  // ── Progress line (unless silent) ────────────────────────────
  if (!opts.silent && !opts.verbose) {
    const kb = (resp.bodySize / 1024).toFixed(1);
    blocks.push(
      createHtmlOutput(
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

  // ── Body ──────────────────────────────────────────────────────
  const body = prettyBody(resp.body, resp.contentType);

  if (resp.contentType.includes("json")) {
    blocks.push(
      createHtmlOutput(
        `<pre class="whitespace-pre-wrap text-tertiary-clr text-fs-body">${escHtml(body)}</pre>`,
      ),
    );
  } else {
    // Plain text / HTML — truncate to avoid freezing on huge pages
    const lines = body.split("\n");
    const truncated = lines.length > 2000;
    const display = truncated ? lines.slice(0, 2000) : lines;
    const bodyHtml = display
      .map((l) => `<p class="whitespace-pre">${escHtml(l)}</p>`)
      .join("\n");
    const note = truncated
      ? `<p class="text-secondary-clr opacity-sep">… output truncated at 2 000 lines</p>`
      : "";

    blocks.push(
      createHtmlOutput(
        `<div class="space-y-0 text-text-clr">${bodyHtml}${note}</div>`,
      ),
    );
  }

  // ── -o note ──────────────────────────────────────────────────
  if (opts.outputNote) {
    blocks.push(
      createHtmlOutput(
        `<p class="text-text-clr opacity-sep">${escHtml(opts.outputNote)}</p>`,
      ),
    );
  }

  return blocks;
}

// ─────────────────────────────────────────────────────────────────
// USAGE (bare "curl" with no args)
// ─────────────────────────────────────────────────────────────────

export function curlUsageOutput() {
  return [
    {
      id: crypto.randomUUID(),
      type: "html" as const,
      content: [
        `<div class="space-y-t-section py-t-outer">

          <div class="space-y-t-group">
            <p class="text-secondary-clr font-bold">curl</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>Transfer data from or to a server using supported protocols.</p>
            <p><span class="text-secondary-clr">Usage:</span>  curl [options] &lt;url&gt;</p>
          </div>

          <div class="space-y-t-group">
            <p class="text-secondary-clr font-bold">Common flags</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p><span class="text-tertiary-clr font-bold">-v</span>          verbose — show request &amp; response headers</p>
            <p><span class="text-tertiary-clr font-bold">-I</span>          HEAD only — headers, no body</p>
            <p><span class="text-tertiary-clr font-bold">-s</span>          silent — no progress output</p>
            <p><span class="text-tertiary-clr font-bold">-X &lt;method&gt;</span>  specify HTTP method</p>
            <p><span class="text-tertiary-clr font-bold">-H &lt;header&gt;</span>  add request header</p>
            <p><span class="text-tertiary-clr font-bold">-d &lt;data&gt;</span>   send POST data</p>
            <p><span class="text-tertiary-clr font-bold">-u user:pass</span> Basic Auth</p>
          </div>

          <div class="space-y-t-group">
            <p class="text-secondary-clr font-bold">Try these</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl https://wttr.in/Paris?format=3</p>
            <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl -I https://httpbin.org/get</p>
            <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl -v https://httpbin.org/get</p>
            <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl -X POST https://httpbin.org/post -d 'key=value'</p>
            <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  curl https://api.adviceslip.com/advice</p>
          </div>

          <div class="space-y-t-footer">
            <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
            <p>
              Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">curl --help</span><span aria-hidden="true">'</span>
              for full options.
            </p>
          </div>

        </div>`,
      ],
    },
  ];
}
