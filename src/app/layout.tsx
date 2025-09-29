// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dabble — Try a New Activity in London",
  description:
    "Discover pottery, cooking, improv and more — local classes and communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const htmlClass = `${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`;

  return (
    <html lang="en" className={htmlClass}>
      <body className="bg-white text-gray-900">
        {/* Shared white header (single nav across site) */}
        <header className="sticky top-0 z-50 bg-white border-b">
          {/* Using grid to get left / center / right layout and keep center truly centered */}
          <div className="max-w-6xl mx-auto h-16 px-6 grid grid-cols-3 items-center">
            {/* Left: logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold tracking-tight text-blue-700">
                Dabble
              </Link>
            </div>

            {/* Center: nav (centered) */}
            <nav className="hidden md:flex items-center justify-center space-x-8 text-sm text-gray-700">
              <Link href="/#explore" className="hover:text-blue-700">
                Explore
              </Link>
              <Link href="/#membership" className="hover:text-blue-700">
                Membership
              </Link>
              <Link href="/about" className="hover:text-blue-700">
                About
              </Link>
              <Link href="/join-studio" className="hover:text-blue-700">
                Join as a studio
              </Link>
            </nav>

{/* Right: actions */}
<div className="flex items-center justify-end gap-3">
  {/* Sign up now opens the modal on the homepage */}
  <Link
    href="/#signup"
    id="open-signup"
    data-open-signup
    role="button"
    className="hidden sm:inline-block bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-50"
  >
    Sign up
  </Link>

  {/* Mobile fallback */}
  <div className="md:hidden">
    <Link href="/" className="text-sm text-gray-700">
      Menu
    </Link>
  </div>
</div>

          </div>
        </header>

        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t mt-12">
          <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Dabble</p>
            <div className="flex gap-4">
              <Link href="/about">About</Link>
              <Link href="/#signup">Get updates</Link>
              <Link href="/join-studio#studio-form">Join as a studio</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}