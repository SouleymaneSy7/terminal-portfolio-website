import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

// ── DEFAULT FONT (loaded statically) ───────────────
const CascadiaCode = localFont({
  src: [
    {
      path: "../../public/fonts/cascadia-code-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/cascadia-code-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cascadia-code",
  display: "swap",
  fallback: ["monospace"],
  adjustFontFallback: false,
});

// ── METADATA ───────────────
const SITE_URL = "https://terminal-portfolio-website-xi.vercel.app";
const SITE_TITLE = "Souleymane Sy | Frontend Developer Terminal Portfolio";
const SITE_DESCRIPTION =
  "Terminal-style portfolio of Souleymane Sy — self-taught frontend developer from Guinea-Conakry. Specializing in React, Next.js and TypeScript. Explore my projects, skills and journey through an interactive terminal interface.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | Souleymane Sy`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Souleymane Sy",
    "frontend developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "portfolio",
    "terminal portfolio",
    "Guinea-Conakry",
    "self-taught developer",
    "JavaScript",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
  ],
  authors: [{ name: "Souleymane Sy", url: SITE_URL }],
  creator: "Souleymane Sy",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Souleymane Sy Terminal Portfolio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Souleymane Sy — Frontend Developer Terminal Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Souleymanesy43",
    creator: "@Souleymanesy43",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Souleymane Sy",
  url: "https://terminal-portfolio-website-xi.vercel.app",
  sameAs: [
    "https://github.com/SouleymaneSy7",
    "https://linkedin.com/in/souleymanesy7",
  ],
  jobTitle: "Frontend Developer",
  knowsAbout: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="dns-prefetch"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className={[CascadiaCode.variable, "antialiased"].join(" ")}>
        {children}
      </body>
    </html>
  );
}
