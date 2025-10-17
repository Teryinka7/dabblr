"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Script from "next/script";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import ClientHeaderWrapper from "@/components/ClientHeaderWrapper";
import SignupModal from "@/components/SignupModal";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

const GTM_ID = "GTM-WS5THKS8";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const htmlClass = `${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`;
  const [showSignupModal, setShowSignupModal] = useState(false);

  // open the signup modal from anywhere
  useEffect(() => {
    const handleOpenSignup = () => setShowSignupModal(true);
    window.addEventListener("open-signup", handleOpenSignup);
    return () => window.removeEventListener("open-signup", handleOpenSignup);
  }, []);

  return (
    <html lang="en" className={htmlClass}>
      {/* GTM head snippet (as high as possible) */}
      <head>
        <Script id="gtm-base" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>

      <body className={`${poppins.className} bg-white text-gray-900`}>
        {/* GTM noscript (immediately after opening body) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>

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