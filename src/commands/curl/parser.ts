import { CurlOptionsType } from "@/types";

export function parseCurlArgs(args: string[]): CurlOptionsType {
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

export function isValidPublicUrl(rawUrl: string): {
  ok: boolean;
  reason?: string;
} {
  let parsed: URL;

  try {
    parsed = new URL(rawUrl);
  } catch {
    return { ok: false, reason: "Invalid URL format." };
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return {
      ok: false,
      reason: "Only http and https protocols are supported.",
    };
  }

  const { hostname } = parsed;
  const isLocal =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.") ||
    hostname.startsWith("172.16.");

  if (isLocal) {
    return {
      ok: false,
      reason: "Local addresses are not reachable from the browser.",
    };
  }

  return { ok: true };
}
