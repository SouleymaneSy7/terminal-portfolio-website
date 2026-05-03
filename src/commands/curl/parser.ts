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

function isPrivateIP(hostname: string): boolean {
  const normalized = hostname.toLowerCase();

  // localhost variants
  if (normalized === "localhost" || normalized === "0.0.0.0") return true;

  // IPv6 loopback
  if (normalized === "::1" || normalized === "[::1]") return true;

  // 127.0.0.0/8
  if (/^127\./.test(normalized)) return true;

  // 0.0.0.0/8
  if (/^0\./.test(normalized)) return true;

  // 10.0.0.0/8
  if (/^10\./.test(normalized)) return true;

  // 192.168.0.0/16
  if (/^192\.168\./.test(normalized)) return true;

  // 172.16.0.0/12 (172.16.x.x through 172.31.x.x)
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(normalized)) return true;

  // 169.254.0.0/16 (link-local)
  if (/^169\.254\./.test(normalized)) return true;

  return false;
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
  const isLocal = isPrivateIP(hostname);

  if (isLocal) {
    return {
      ok: false,
      reason: "Local addresses are not reachable from the browser.",
    };
  }

  return { ok: true };
}

export function normalizeUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : "https://" + url;
}
