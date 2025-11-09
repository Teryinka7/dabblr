"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const handleSignupClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    // Call the global opener set by layout (most reliable), then also dispatch event as a fallback
    (window as Window & { __openSignupModal?: () => void }).__openSignupModal?.();
    window.dispatchEvent(new Event("open-signup"));
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            aria-label="Dabblr Home"
            className="text-2xl font-semibold tracking-tight text-gray-900"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Dabblr
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/#explore" className="hover:text-teal-600 text-gray-800 transition-colors">Explore</Link>
            <Link href="/about" className={`hover:text-teal-600 transition-colors ${isActive("/about") ? "text-teal-700" : "text-gray-800"}`}>About</Link>
            <Link href="/join-studio" className={`hover:text-teal-600 transition-colors ${isActive("/join-studio") ? "text-teal-700" : "text-gray-800"}`}>For Studios</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              data-open-signup
              onClick={handleSignupClick}
              className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
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
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85%] bg-white text-gray-900 shadow-xl p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <span
                className="text-2xl font-semibold tracking-tight text-gray-900"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Dabblr
              </span>
              <button
                className="rounded-full w-9 h-9 inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-8 space-y-2">
              <Link href="/#explore" onClick={() => setOpen(false)} className="block px-3 py-2 rounded text-lg hover:bg-gray-100 text-gray-900">Explore Classes</Link>
              <Link href="/#membership" onClick={() => setOpen(false)} className="block px-3 py-2 rounded text-lg hover:bg-gray-100 text-gray-900">Membership</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="block px-3 py-2 rounded text-lg hover:bg-gray-100 text-gray-900">About</Link>
              <Link href="/join-studio" onClick={() => setOpen(false)} className="block px-3 py-2 rounded text-lg hover:bg-gray-100 text-gray-900">For Studios</Link>
            </nav>

            <div className="mt-auto pt-4 border-t">
              <button
                type="button"
                data-open-signup
                onClick={handleSignupClick}
                className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow"
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