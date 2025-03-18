import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
