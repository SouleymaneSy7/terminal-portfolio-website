/**
 * github.service.ts — fetch a GitHub user's public profile, pinned repos, and top starred repos.
 *
 * Uses GitHub REST API (v3) for user profile and GraphQL API for pinned repos.
 * Rate limit: 60 unauthenticated requests per hour per IP.
 *
 * Throws AxiosErrors as-is so command handlers can discriminate on HTTP status
 * (404 → user not found, 403 → rate limited).
 *
 * Docs: https://docs.github.com/en/rest | https://docs.github.com/en/graphql
 */

import axios from "axios";

import { GithubUserType, GithubRepoType } from "@/types";

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

const GITHUB_API_BASE_URL = "https://api.github.com";
const TIMEOUT_MS = 8_000;
const ACCEPT_HEADER = { Accept: "application/vnd.github.v3+json" };

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

export interface GithubProfileData {
  user: GithubUserType;
  /** Pinned repositories (up to 6) */
  pinnedRepos: GithubRepoType[];
  /** Top starred repos (excluding pinned ones) */
  topRepos: GithubRepoType[];
}

// ─────────────────────────────────────────────────────────────────
// SERVICE
// ─────────────────────────────────────────────────────────────────

/**
 * Fetch pinned repositories using GitHub GraphQL API
 */
async function fetchPinnedRepos(username: string): Promise<GithubRepoType[]> {
  const query = `
    query {
      user(login: "${username}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              primaryLanguage {
                name
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await axios.post(
      `${GITHUB_API_BASE_URL}/graphql`,
      { query },
      {
        timeout: TIMEOUT_MS,
        headers: ACCEPT_HEADER,
      },
    );

    const nodes = res.data?.data?.user?.pinnedItems?.nodes || [];
    return nodes.map((node: any) => ({
      name: node.name,
      description: node.description,
      html_url: node.url,
      stargazers_count: node.stargazerCount,
      language: node.primaryLanguage?.name || null,
    }));
  } catch {
    // If GraphQL fails, return empty array (fallback to top repos only)
    return [];
  }
}

/**
 * Fetch a GitHub user's profile, pinned repos, and top starred repositories.
 *
 * @param username - A valid GitHub username (1–39 chars, alphanumeric + hyphens)
 * @throws {AxiosError} 404 if user not found, 403 if rate limited, others on network failure
 */
export async function fetchGithubProfile(
  username: string,
): Promise<GithubProfileData> {
  const [userRes, pinnedRepos, reposRes] = await Promise.all([
    axios.get<GithubUserType>(`${GITHUB_API_BASE_URL}/users/${username}`, {
      timeout: TIMEOUT_MS,
      headers: ACCEPT_HEADER,
    }),
    fetchPinnedRepos(username),
    axios.get<GithubRepoType[]>(
      `${GITHUB_API_BASE_URL}/users/${username}/repos?sort=stars&per_page=10`,
      {
        timeout: TIMEOUT_MS,
        headers: ACCEPT_HEADER,
      },
    ),
  ]);

  // Filter out pinned repos from top repos to avoid duplicates
  const pinnedNames = new Set(pinnedRepos.map((r) => r.name));
  const topRepos = reposRes.data
    .filter((r) => !pinnedNames.has(r.name))
    .slice(0, 5);

  return {
    user: userRes.data,
    pinnedRepos,
    topRepos,
  };
}
