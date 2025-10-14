"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import ClientHeaderWrapper from "@/components/ClientHeaderWrapper";
import SignupModal from "@/components/SignupModal";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const htmlClass = `${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`;
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    const open = () => setShowSignupModal(true);

    // Expose an imperative opener for any component (header/mobile drawer) to call.
    (window as any).__openSignupModal = open;

    // Still support a custom event as a fallback.
    window.addEventListener("open-signup", open as EventListener);

    // And support click delegation for data-open-signup.
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest("[data-open-signup]")) {
        e.preventDefault();
        open();
      }
    };
    document.addEventListener("click", onDocClick);

    return () => {
      delete (window as any).__openSignupModal;
      window.removeEventListener("open-signup", open as EventListener);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <html lang="en" className={htmlClass}>
      <body className={`${poppins.className} bg-white text-gray-900`}>
        <ClientHeaderWrapper />
        <main>{children}</main>

        <footer className="border-t mt-12">
          <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Dabble</p>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-gray-900">About</Link>
              <Link href="/#signup" className="hover:text-gray-900">Get updates</Link>
              <Link href="/join-studio#studio-form" className="hover:text-gray-900">Join as a studio</Link>
            </div>
          </div>
        </footer>

        {/* Global Sign Up Modal — ensure this sits above the drawer */}
        <div className="relative z-[500]">
          <SignupModal open={showSignupModal} onClose={() => setShowSignupModal(false)} />
        </div>
      </body>
    </html>
  );
}