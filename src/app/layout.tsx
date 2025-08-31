// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// load Poppins globally via next/font (avoids page-level font warning)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dabble — Try a New Activity in London",
  description: "Discover pottery, cooking, improv and more — local classes and communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // apply poppins.className for global font and keep geist variables available for CSS
  const htmlClass = `${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`;

  return (
    <html lang="en" className={htmlClass}>
      <body>{children}</body>
    </html>
  );
}
