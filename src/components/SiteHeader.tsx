"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href))
      ? "text-teal-700"
      : "";

  const openSignupModal = () => {
    // Dispatch global event that your landing page popup listens for
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-signup"));
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            aria-label="Dabble Home"
            className="text-2xl font-semibold tracking-tight text-gray-900"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Dabble
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/#explore" className="hover:text-teal-600 transition-colors">Explore</Link>
            <Link href="/#membership" className="hover:text-teal-600 transition-colors">Membership</Link>
            <Link href="/about" className={`hover:text-teal-600 transition-colors ${active("/about")}`}>About</Link>
            <Link href="/join-studio" className={`hover:text-teal-600 transition-colors ${active("/join-studio")}`}>For Studios</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openSignupModal}
              className="hidden sm:inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 text-sm font-medium transition-colors"
            >
              Sign up
            </button>

            {/* Mobile toggle */}
            <button
              aria-label="Open menu"
              className="md:hidden p-2 rounded-md -mr-2"
              onClick={() => setOpen(true)}
            >
              <MenuIcon className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85%] bg-white shadow-xl p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <span
                className="text-2xl font-semibold tracking-tight text-gray-900"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Dabble
              </span>
              <button
                className="rounded-full w-9 h-9 inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-8 space-y-4 text-lg font-medium text-gray-900">
              <Link href="/#explore" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100">Explore Classes</Link>
              <Link href="/#membership" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100">Membership</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100">About</Link>
              <Link href="/join-studio" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100">For Studios</Link>
            </nav>

            <div className="mt-auto pt-4 border-t">
              <button
                onClick={() => {
                  setOpen(false);
                  openSignupModal();
                }}
                className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}