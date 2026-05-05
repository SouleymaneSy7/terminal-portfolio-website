import { ManPageType } from "@/types";

export const NETWORK_PAGES: Record<string, ManPageType> = {
  curl: {
    name: "curl",
    synopsis: "curl [options] <url>",
    description:
      "A browser-based HTTP client that simulates curl behavior. Supports GET, POST, HEAD, and custom methods. JSON responses are pretty-printed, plain-text responses are paginated to 2 000 lines. Browser CORS restrictions apply — cross-origin requests succeed only if the server sends the appropriate Access-Control-Allow-Origin headers. Local/private addresses are blocked at the registry level.",
    options: `
      <p><span class="text-tertiary-clr font-bold">-v, --verbose        </span> - Show full request and response headers.</p>
      <p><span class="text-tertiary-clr font-bold">-I, --head           </span> - Perform a HEAD request — headers only, no body.</p>
      <p><span class="text-tertiary-clr font-bold">-s, --silent         </span> - Suppress the progress/status line.</p>
      <p><span class="text-tertiary-clr font-bold">-X &lt;method&gt;         </span> - Specify HTTP method (GET, POST, PUT, PATCH, DELETE…).</p>
      <p><span class="text-tertiary-clr font-bold">-H &lt;header&gt;         </span> - Add a custom request header. Repeatable.</p>
      <p><span class="text-tertiary-clr font-bold">-d &lt;data&gt;           </span> - Send request body. Implies -X POST when no method is set.</p>
      <p><span class="text-tertiary-clr font-bold">-u user:pass         </span> - Basic Auth, encoded as an Authorization: Basic header.</p>
      <p><span class="text-tertiary-clr font-bold">-L, --location       </span> - Follow redirects (default: on, max 5).</p>
      <p><span class="text-tertiary-clr font-bold">-o &lt;file&gt;           </span> - Ignored — output is always shown inline in the terminal.</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  curl https://httpbin.org/get</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  curl -v https://httpbin.org/get</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  curl -I https://httpbin.org/get</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  curl -X POST https://httpbin.org/post -d 'key=value'</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  curl -H 'Accept: application/json' https://httpbin.org/get</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  curl https://wttr.in/Conakry?format=3</p>`,
    notes:
      "CORS-friendly public APIs to try: httpbin.org · api.adviceslip.com · v2.jokeapi.dev · wttr.in. Local addresses (localhost, 127.0.0.1, 192.168.x.x, 10.x.x.x) are rejected before the request is dispatched.",
    seeAlso: ["ip", "github", "weather"],
  },

  github: {
    name: "github",
    synopsis: "github <username>",
    description:
      "Fetches a GitHub user's public profile via the GitHub REST API v3 and displays their bio, location, company, stats (repos, followers, following), account age, and their top 5 most-starred public repositories. The profile link and repo URLs are rendered as clickable anchor elements.",
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  github SouleymaneSy7</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  github torvalds</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  github gaearon</p>`,
    notes:
      "The public GitHub API allows 60 unauthenticated requests per hour per IP. 404 → user not found. 403 → rate limited; wait a few minutes. Usernames are validated against the pattern [a-zA-Z0-9-]{1,39} before the request is dispatched. Private repositories and organization secrets are not accessible.",
    seeAlso: ["ip", "curl"],
  },

  ip: {
    name: "ip",
    synopsis: "ip",
    description:
      "Displays your public IP address and geolocation data fetched from ipapi.co: country (with flag emoji), region, city, postal code, coordinates, ISP organization, ASN, and local timezone with UTC offset. If you are behind a VPN or proxy, the detected IP is that of your exit node.",
    notes:
      "Data is fetched from ipapi.co — a free, privacy-respecting geolocation API. No data is stored by this terminal. The fetch is triggered only when you run this command, not on page load. Rate limit: the free tier allows ~1 000 requests per day per IP.",
    seeAlso: ["curl", "github"],
  },

  weather: {
    name: "weather",
    synopsis: "weather <city>",
    description:
      "Fetches real-time weather for any city using wttr.in, a console-oriented weather service that returns pre-formatted ANSI/ASCII weather reports. Multi-word city names are supported by joining all tokens after the command name. The response is split on newlines and rendered as a plain-text block.",
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  weather Conakry</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  weather New York</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  weather Paris</p>`,
    notes:
      "Uses the ATm format query (?ATm) which returns a 3-day forecast in ASCII. If wttr.in returns a 404, the city was not recognized. The service is free and public — no API key required.",
    seeAlso: ["ip", "date"],
  },
};
