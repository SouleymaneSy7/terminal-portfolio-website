import { ManPageType } from "@/types";

export const INFO_PAGES: Record<string, ManPageType> = {
  about: {
    name: "about",
    synopsis: "about",
    description:
      "Displays a multi-section narrative about Souleymane Sy — his self-taught origin story, the eight months it took to master JavaScript, the Vue.js and React progression, the 2024 Enzo Ustariz contest podium, and the DevelopersHub internship. Output is split across three rendered blocks to keep each chapter readable without overwhelming the screen.",
    notes:
      "Read-only — no arguments are accepted. For a condensed one-paragraph summary, use whoami. For contact links, use contact. For featured work, use projects.",
    seeAlso: ["whoami", "contact", "projects", "resume"],
  },

  contact: {
    name: "contact",
    synopsis: "contact",
    description:
      "Displays all social network links and contact details for Souleymane Sy, including email, GitHub, LinkedIn, Twitter/X, Frontend Mentor, and Dev Challenges profiles. Also communicates availability for freelance, remote positions, collaboration, and internships.",
    notes:
      "All links open in a new tab. For the email address alone, use the email command. For the CV, use resume.",
    seeAlso: ["email", "resume", "about"],
  },

  email: {
    name: "email",
    synopsis: "email",
    description:
      "Displays Souleymane Sy's email address as a clickable mailto link, accompanied by a short personal invitation to reach out. The link opens in a new tab.",
    notes: "For all social links together, use contact. For the CV, use resume.",
    seeAlso: ["contact", "resume"],
  },

  projects: {
    name: "projects",
    synopsis: "projects",
    description:
      "Browsable showcase of five featured projects: Fyrre Magazine (Next.js + MDX), the Conakry Tourism Website (🥉 Enzo Ustariz 2024 contest), a Vue.js Dictionary Web App, a Vue.js Password Generator, and a GitHub User Search App. Each entry includes a description, technology stack, and live + source links.",
    notes:
      "For the terminal portfolio source code specifically, use repo. For a broader professional overview, use about.",
    seeAlso: ["repo", "about", "github"],
  },

  repo: {
    name: "repo",
    synopsis: "repo",
    description:
      "Displays the GitHub source code link for this terminal portfolio along with a brief description and a note that a ⭐ is appreciated. A focused shortcut — for the full list of projects, use the projects command.",
    seeAlso: ["projects", "github"],
  },

  resume: {
    name: "resume",
    synopsis: "resume",
    description:
      "Provides view and download links for the CV in both English and French (PDF format). The English version is titled 'Souleymane_Sy_Resume_EN.pdf' and the French 'Souleymane_Sy_CV_FR.pdf'. PDFs are served as static assets from /resume/.",
    notes:
      "The download attribute on the anchor element triggers a browser download dialog rather than opening the PDF in a new tab. Both are offered — 'Open in browser' uses target='_blank', 'Download' uses the download attribute.",
    seeAlso: ["contact", "email", "about"],
  },
};
