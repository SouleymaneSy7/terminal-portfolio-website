/**
 * GitHub Command - Display a GitHub user's profile and stats.
 *
 * Flags:
 *   --json / -j   Output raw JSON (user + pinnedRepos + topRepos)
 *
 * Delegates all HTTP logic to github.service.ts.
 * Uses the public GitHub REST API (60 req/hr unauthenticated).
 *
 * @example
 * ```bash
 * github <username>
 * github <username> --json
 * github --help
 * ```
 */

import { GITHUB_HELP } from "@/constants/help/utils";
import { fetchGithubProfile } from "@/services";
import type { CommandHistoryOutputType, GithubRepoType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";
import { createJsonOutput } from "@/utils/output/createJsonOutput";
import axios from "axios";

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function accountAge(iso: string): string {
  const years = (Date.now() - new Date(iso).getTime()) / (365.25 * 24 * 3600 * 1000);
  if (years < 1) return "less than a year";
  if (years < 2) return "1 year";
  return `${Math.floor(years)} years`;
}

function normalizeUrl(url: string | null): string | null {
  if (!url) return null;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function buildRepoRow(repo: GithubRepoType): string {
  return `<p>
    <span class="text-tertiary-clr font-bold">★ ${String(repo.stargazers_count).padEnd(5)}</span> -
    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
    ${repo.language ? `<span class="text-text-clr opacity-sep"> · ${repo.language}</span>` : ""}
  </p>`;
}

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function createProfileOutput(
  user: Awaited<ReturnType<typeof fetchGithubProfile>>["user"],
  pinnedRepos: GithubRepoType[],
  topRepos: GithubRepoType[],
): CommandHistoryOutputType {
  const pinnedRows = pinnedRepos.map(buildRepoRow).join("\n");
  const topRows = topRepos.map(buildRepoRow).join("\n");

  const bio = user.bio ? `<p>${user.bio}</p>` : "";
  const location = user.location
    ? `<p><span class="text-secondary-clr">Location   </span>${DT.decorators.arrow}${user.location}</p>`
    : "";
  const blogUrl = normalizeUrl(user.blog);
  const blog = blogUrl
    ? `<p><span class="text-secondary-clr">Website    </span>${DT.decorators.arrow}<a href="${blogUrl}" target="_blank" rel="noopener noreferrer">${user.blog}</a></p>`
    : "";
  const company = user.company
    ? `<p><span class="text-secondary-clr">Company    </span>${DT.decorators.arrow}${user.company}</p>`
    : "";
  const twitter = user.twitter_username
    ? `<p><span class="text-secondary-clr">Twitter    </span>${DT.decorators.arrow}<a href="https://twitter.com/${user.twitter_username}" target="_blank" rel="noopener noreferrer">@${user.twitter_username}</a></p>`
    : "";

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-primary-clr font-bold" style="font-size: var(--text-fs-subtitle);">${user.name ?? user.login}</p>
        <p class="text-text-clr opacity-sep">@${user.login}</p>
        ${bio}
        <a href="${user.html_url}" target="_blank" rel="noopener noreferrer">${user.html_url}</a>
      </div>
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Stats</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          <span class="text-tertiary-clr font-bold">${user.public_repos}</span><span class="text-text-clr opacity-sep"> repos · </span>
          <span class="text-tertiary-clr font-bold">${user.followers}</span><span class="text-text-clr opacity-sep"> followers · </span>
          <span class="text-tertiary-clr font-bold">${user.following}</span><span class="text-text-clr opacity-sep"> following</span>
        </p>
        <p><span class="text-secondary-clr">Member since </span>${DT.decorators.arrow}${formatDate(user.created_at)} <span class="text-text-clr opacity-sep">(${accountAge(user.created_at)})</span></p>
        ${location}${company}${blog}${twitter}
      </div>
      ${
        pinnedRepos.length > 0
          ? `<div class="space-y-t-group">
              <p class="text-secondary-clr font-bold">Pinned Repos</p>
              <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
              ${pinnedRows}
            </div>`
          : ""
      }
      ${
        topRepos.length > 0
          ? `<div class="space-y-t-group">
              <p class="text-secondary-clr font-bold">Top Repos <span class="text-text-clr opacity-sep">(by stars)</span></p>
              <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
              ${topRows}
            </div>`
          : ""
      }
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>View full profile ${DT.decorators.arrow}<a href="${user.html_url}" target="_blank" rel="noopener noreferrer">github.com/${user.login}</a></p>
        <p class="text-text-clr"><span class="text-primary-clr">Tip:</span> type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">github ${user.login} --json</span>${DT.decorators.quote} for raw JSON.</p>
        <p class="text-text-clr opacity-sep"><span class="text-primary-clr">Source:</span> <span class="font-bold text-tertiary-clr">api.github.com</span> · Official GitHub REST & GraphQL API</p>
      </div>
    </div>`,
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleGithubCommand = async (args: string[]): Promise<CommandHistoryOutputType> => {
  const { flags, positional } = parseArgs(args);

  if (flags.help) return GITHUB_HELP;

  const username = positional[0]?.trim();

  if (!username) {
    return createErrorOutput(
      `Usage: <span class="text-tertiary-clr font-bold">github &lt;username&gt;</span>`,
      `Try ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">github --help</span>${DT.decorators.quote} for more information.`,
    );
  }

  if (!/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    return createErrorOutput(
      `Invalid GitHub username: <span class="text-tertiary-clr">"${username}"</span>`,
    );
  }

  try {
    const { user, pinnedRepos, topRepos } = await fetchGithubProfile(username);

    // ── JSON mode ──────────────────────────────────────────────
    if (flags.json || flags.j) {
      return createJsonOutput({ user, pinnedRepos, topRepos }, `github ${username} --json`);
    }

    // ── Formatted output (default) ─────────────────────────────
    return createProfileOutput(user, pinnedRepos, topRepos);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        return createErrorOutput(
          `User <span class="text-tertiary-clr">"${username}"</span> not found on GitHub.`,
        );
      }
      if (err.response?.status === 403) {
        return createErrorOutput(
          "GitHub API rate limit reached (60 req/hr). Try again in a few minutes.",
        );
      }
      if (err.code === "ECONNABORTED") {
        return createErrorOutput("Request timed out. Check your connection.");
      }
    }
    return createErrorOutput("Could not fetch GitHub profile. Check your connection.");
  }
};
