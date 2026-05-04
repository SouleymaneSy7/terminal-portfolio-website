/**
 * Help outputs for information commands
 */

import { createHelpOutput } from "@/utils/output"

export const ABOUT_HELP = createHelpOutput({
  name: "about",
  usage: "about [--help]",
  description: "Display my story, background, journey and tech stack.",
  options: [{ flag: "--help, -h", description: "Show this help message" }],
  seeAlso: ["whoami", "projects", "contact"],
})

export const CONTACT_HELP = createHelpOutput({
  name: "contact",
  usage: "contact",
  description: "Display all contact information and social media links.",
  examples: [
    { command: "contact", description: "Show all social links" },
    { command: "email", description: "Show email address only" },
  ],
  seeAlso: ["resume", "about"],
})

export const EMAIL_HELP = createHelpOutput({
  name: "email",
  usage: "email",
  description: "Display email address with mailto link.",
  examples: [{ command: "email", description: "Show email address" }],
  seeAlso: ["contact"],
})

export const PROJECTS_HELP = createHelpOutput({
  name: "projects",
  usage: "projects [--help]",
  description: "Browse my most notable projects with links and tech stack.",
  options: [{ flag: "--help, -h", description: "Show this help message" }],
  seeAlso: ["repo", "about", "contact"],
})

export const REPO_HELP = createHelpOutput({
  name: "repo",
  usage: "repo [--help]",
  description: "View the source code for this portfolio on GitHub.",
  options: [{ flag: "--help, -h", description: "Show this help message" }],
  seeAlso: ["projects", "about"],
})

export const RESUME_HELP = createHelpOutput({
  name: "resume",
  usage: "resume",
  description: "View or download my CV in English or French (PDF format).",
  examples: [{ command: "resume", description: "Show resume links" }],
  notes: "Resume is available in both English (EN) and French (FR) versions.",
  seeAlso: ["contact", "about"],
})

export const WEATHER_HELP = createHelpOutput({
  name: "weather",
  usage: "weather &lt;city&gt;",
  description: "Fetch real-time weather for any city via wttr.in.",
  examples: [
    { command: "weather Conakry", description: "Weather in Conakry" },
    { command: "weather Paris", description: "Weather in Paris" },
    { command: "weather New York", description: "Weather in New York" },
  ],
  notes: "Requires an internet connection.",
})
