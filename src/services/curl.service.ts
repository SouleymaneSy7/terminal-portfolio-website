/**
 * HTTP request logic for the curl terminal command.
 *
 */

import { CurlRequestOptionsType, CurlServiceResponseType } from "@/types";
import axios, { type AxiosRequestConfig, isAxiosError } from "axios";

function normalizeAxiosHeaders(
  raw: Record<string, unknown>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string") out[k] = v;
    else if (Array.isArray(v))
      out[k] = (v as string[]).filter(Boolean).join(", ");
  }
  return out;
}

export function curlStatusText(code: number): string {
  const map: Record<number, string> = {
    200: "OK",
    201: "Created",
    204: "No Content",
    301: "Moved Permanently",
    302: "Found",
    304: "Not Modified",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    422: "Unprocessable Entity",
    429: "Too Many Requests",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
  };
  return map[code] ?? "";
}

export const curlService = {
  request: async (
    opts: CurlRequestOptionsType,
  ): Promise<CurlServiceResponseType> => {
    const config: AxiosRequestConfig = {
      method: opts.headOnly ? "HEAD" : opts.method,
      url: opts.url,
      headers: {
        "User-Agent": "curl/8.5.0",
        Accept: "*/*",
        ...opts.headers,
      },
      data: opts.body ?? undefined,
      validateStatus: () => true,
      responseType: "text",
      maxRedirects: opts.follow ? 5 : 0,
      transformResponse: [(data: unknown) => data],
    };

    const response = await axios<string>(config);

    const headers = normalizeAxiosHeaders(
      response.headers as Record<string, unknown>,
    );

    const contentType = headers["content-type"] ?? "";
    const body =
      typeof response.data === "string"
        ? response.data
        : JSON.stringify(response.data, null, 2);
    const bodySize = new TextEncoder().encode(body).length;

    return {
      status: response.status,
      statusText: response.statusText || curlStatusText(response.status),
      headers,
      body,
      bodySize,
      contentType,
    };
  },
};

export { isAxiosError };
