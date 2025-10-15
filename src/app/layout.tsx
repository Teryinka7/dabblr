"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";                           // 👈 add this
import { usePathname, useSearchParams } from "next/navigation"; // 👈 for SPA page views
import "./globals.css";
import ClientHeaderWrapper from "@/components/ClientHeaderWrapper";
import SignupModal from "@/components/SignupModal";

// Optional: type the global
declare global {
  interface Window { 
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
const GA_ID = "G-M7WLH6S0D4"; // or process.env.NEXT_PUBLIC_GA_ID

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const htmlClass = `${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`;
  const [showSignupModal, setShowSignupModal] = useState(false);

  // open the signup modal from anywhere
  useEffect(() => {
    const handleOpenSignup = () => setShowSignupModal(true);
    window.addEventListener("open-signup", handleOpenSignup);
    return () => window.removeEventListener("open-signup", handleOpenSignup);
  }, []);

  // ---- GA4 SPA page-view tracking ----
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!window.gtag) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    window.gtag("config", GA_ID, { page_path: url });
  }, [pathname, searchParams]);

  return (
    <html lang="en" className={htmlClass}>
      <body className={`${poppins.className} bg-white text-gray-900`}>
        {/* GA4 base tag (loads once, after hydration) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            // send_page_view: false so we control pageviews on route change
            gtag('config', '${GA_ID}', { send_page_view: false, anonymize_ip: true });
          `}
        </Script>

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

        {/* Global Sign Up Modal */}
        <SignupModal open={showSignupModal} onClose={() => setShowSignupModal(false)} />
      </body>
    </html>
  );
}