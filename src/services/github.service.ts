import type {
  GithubProfileDataType,
  GithubRepoType,
  GithubUserType,
  GraphQLResponseType,
} from "@/types";
import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";
const TIMEOUT_MS = 8_000;

const REST_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

async function fetchPinnedRepos(username: string): Promise<GithubRepoType[]> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (!token) return [];

  const query = `
    query GetPinnedRepos($login: String!) {
      user(login: $login) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
               forkCount
              primaryLanguage { name }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await axios.post<GraphQLResponseType>(
      `${GITHUB_API_BASE_URL}/graphql`,
      { query, variables: { login: username } },
      {
        timeout: TIMEOUT_MS,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (res.data?.errors?.length) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[github.service] GraphQL errors:", res.data.errors);
      }
      return [];
    }

    const nodes = res.data?.data?.user?.pinnedItems?.nodes ?? [];
    return nodes.map((node) => ({
      name: node.name,
      description: node.description,
      html_url: node.url,
      stargazers_count: node.stargazerCount,
      forks_count: node.forkCount,
      language: node.primaryLanguage?.name ?? null,
    }));
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[github.service] fetchPinnedRepos failed:", err);
    }
    return [];
  }
}

export async function fetchGithubProfile(username: string): Promise<GithubProfileDataType> {
  const results = await Promise.allSettled([
    axios.get<GithubUserType>(`${GITHUB_API_BASE_URL}/users/${username}`, {
      timeout: TIMEOUT_MS,
      headers: REST_HEADERS,
    }),
    fetchPinnedRepos(username),
    axios.get<GithubRepoType[]>(`${GITHUB_API_BASE_URL}/users/${username}/repos`, {
      timeout: TIMEOUT_MS,
      headers: REST_HEADERS,
      params: { sort: "stars", per_page: 10 },
    }),
  ]);

  // The main user profile is MANDATORY
  const userResult = results[0];
  if (userResult.status === "rejected") {
    throw userResult.reason;
  }

  const user = userResult.value.data;

  // Pinned repos are optional
  const pinnedReposResult = results[1];
  const pinnedRepos = pinnedReposResult.status === "fulfilled" ? pinnedReposResult.value : [];

  // Top repos are optional
  const reposResResult = results[2];
  const reposData = reposResResult.status === "fulfilled" ? reposResResult.value.data : [];

  const pinnedNames = new Set(pinnedRepos.map((r) => r.name));
  const topRepos = reposData.filter((r) => !pinnedNames.has(r.name)).slice(0, 5);

  return {
    user,
    pinnedRepos,
    topRepos,
  };
}
