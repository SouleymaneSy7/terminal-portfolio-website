import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const JetbrainsMono = localFont({
  src: [
    {
      path: "../..//public/fonts/jetbrains-mono-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../..//public/fonts/jetbrains-mono-semi-bold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["monospace"],
});

const CascadiaCode = localFont({
  src: [
    {
      path: "../..//public/fonts/cascadia-code-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../..//public/fonts/cascadia-code-semi-bold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-cascadia-code",
  display: "swap",
  fallback: ["monospace"],
});

const FiraCode = localFont({
  src: [
    {
      path: "../..//public/fonts/fira-code-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../..//public/fonts/fira-code-semi-bold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-fira-code",
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Souleymane Sy | terminal portfolio",
  description:
    "A terminal like portfolio website for the developper 'Souleymane Sy', Made with Next.js, Typescript and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${JetbrainsMono.variable} ${FiraCode.variable} ${CascadiaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
