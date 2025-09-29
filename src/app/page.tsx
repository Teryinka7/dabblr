// src/app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPinIcon,
  CalendarIcon,
  SearchIcon,
  LayoutGridIcon,
  Package,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

// ====== ENV (site key is safe to expose) ======
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

// Simple brand wordmark
const Brand = () => (
  <span
    className="text-2xl font-semibold tracking-tight"
    style={{ fontFamily: "'Poppins', sans-serif" }}
  >
    Dabble
  </span>
);

const UsersIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const BarChartIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
);
const ClockIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

// Types
type Accent = { name: string; accent: string; bg: string };
type CardItem = {
  title: string;
  details: string;
  image: string;
  link: string;
  long: string;
  meta: { size: string; level: string; duration: string };
  instructor: { name: string; bio: string };
  extras: { location: string; bring: string; included: string };
};

// ========= Reusable Signup Form with Turnstile =========
function SignupForm({
  layout = "modal", // "modal" | "inline"
  brandPrimary,
  brandPrimaryHover,
  onSuccess,
}: {
  layout?: "modal" | "inline";
  brandPrimary: string;
  brandPrimaryHover: string;
  onSuccess?: () => void;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<null | { type: "ok" | "err"; text: string }>(
    null
  );

  // Helper to extract token Turnstile injects into the form
  const getToken = () => {
    const el = formRef.current?.querySelector(
      'input[name="cf-turnstile-response"]'
    ) as HTMLInputElement | null;
    return el?.value || "";
    // Note: Turnstile auto-injects that hidden input once the widget is rendered
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const token = getToken();
    if (!token) {
      setMsg({ type: "err", text: "Please complete the captcha." });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to sign up");
      }
      setMsg({ type: "ok", text: "Thanks! Please check your inbox." });
      setEmail("");
      onSuccess?.();
    } catch (err: any) {
      setMsg({
        type: "err",
        text: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
      // reset widget
      // @ts-ignore
      if (window.turnstile && formRef.current) {
        // @ts-ignore
        const widget = formRef.current.querySelector(".cf-turnstile");
        // @ts-ignore
        if (widget && window.turnstile.reset) window.turnstile.reset(widget);
      }
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={
        layout === "modal"
          ? "flex flex-col gap-4"
          : "flex w-full max-w-md mx-auto md:ml-auto md:mr-0 gap-2"
      }
    >
      <Input
        type="email"
        name="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={
          layout === "modal"
            ? "w-full border-gray-300 shadow-sm text-center py-3 text-base"
            : "w-full border-gray-300 shadow-sm"
        }
      />

      {/* Turnstile widget */}
      <div
        className="cf-turnstile"
        data-sitekey={TURNSTILE_SITE_KEY}
        data-theme="light"
        // For the narrow modal we use 'compact' size
        data-size={layout === "modal" ? "compact" : "normal"}
      />

      <Button
        type="submit"
        disabled={submitting}
        className={
          layout === "modal"
            ? "w-full text-white px-6 py-3 rounded-lg text-lg shadow hover:opacity-95"
            : "text-white whitespace-nowrap shadow hover:opacity-95"
        }
        style={{ backgroundColor: brandPrimary }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = brandPrimaryHover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = brandPrimary)
        }
      >
        {submitting ? "Submitting…" : "Sign Me Up!"}
      </Button>

      {msg && (
        <p
          className={
            msg.type === "ok" ? "text-green-600 text-sm" : "text-red-600 text-sm"
          }
        >
          {msg.text}
        </p>
      )}
    </form>
  );
}

export default function Dabble() {
  const [showPopup, setShowPopup] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{
    open: boolean;
    item: CardItem | null;
    accent: Accent | null;
  }>({ open: false, item: null, accent: null });

  const accents: Accent[] = [
    { name: "terracotta", accent: "#C45E49", bg: "#F7F2EE" },
    { name: "teal", accent: "#2F7A80", bg: "#EEF6F6" },
    { name: "slate", accent: "#3B5566", bg: "#F1F4F6" },
    { name: "saffron", accent: "#D99136", bg: "#FEF6E9" },
    { name: "plum", accent: "#4A3B55", bg: "#F5F2F7" },
    { name: "forest", accent: "#2E584E", bg: "#EEF5F3" },
  ];
  const brandPrimary = accents[1].accent;
  const brandPrimaryHover = "#2A6C71";

  const openSignup = () => setShowPopup(true);
  const closeSignup = () => setShowPopup(false);

  // Allow global header button to open modal if it has data-open-signup
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const opener = target.closest("[data-open-signup], #open-signup");
      if (opener) {
        e.preventDefault();
        e.stopPropagation();
        setShowPopup(true);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowPopup(false);
        setDetailsModal({ open: false, item: null, accent: null });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cardData: CardItem[] = [
    {
      title: "Salsa Night – Brixton",
      details: "Thursdays 7pm • £12",
      image: "/salsa_class.jpg",
      link: "/class/salsa-brixton",
      long:
        "A lively, beginner-friendly salsa session focusing on timing, basic footwork, partner turns and shine patterns. Expect a warm, welcoming vibe and social practice at the end. No partner needed.",
      meta: { size: "Up to 16 people", level: "Beginner-friendly", duration: "75 mins" },
      instructor: { name: "Camila R.", bio: "8+ years teaching Cuban & LA style salsa across London. Known for clear breakdowns and friendly energy." },
      extras: { location: "Brixton Community Centre", bring: "Comfortable shoes (non-grip if possible), water", included: "Music, warm-up, guided practice" },
    },
    {
      title: "Beginner Watercolours – Peckham",
      details: "Saturdays 11am • £18",
      image: "/watercolours.jpg",
      link: "/class/watercolours-peckham",
      long:
        "Learn foundational watercolour techniques: wet-on-wet, layering, colour mixing and simple composition. Create a small piece to take home.",
      meta: { size: "Up to 10 people", level: "Beginner", duration: "2 hours" },
      instructor: { name: "Arjun P.", bio: "South-London artist specialising in urban landscapes and colour studies; exhibited locally in Peckham & Dulwich." },
      extras: { location: "Peckham Makers Studio", bring: "Optional reference photo", included: "Paper, paints, brushes, palettes" },
    },
    {
      title: "Mindfulness & Breathwork – Deptford",
      details: "Sundays 10am • £15",
      image: "/mindfulness.jpg",
      link: "/class/mindfulness-deptford",
      long:
        "A calm session combining guided breathwork with short mindfulness practices (body-scan, mindful walking). Great for easing stress and starting the week grounded.",
      meta: { size: "Up to 14 people", level: "Open to all", duration: "60 mins" },
      instructor: { name: "Maya L.", bio: "Qualified breath coach and meditation guide; focuses on practical tools for busy people." },
      extras: { location: "Deptford Community Hall", bring: "Yoga mat (limited spares), light jumper", included: "Cushions, gentle playlists" },
    },
    {
      title: "Stand-up Improv – London Bridge",
      details: "Weds 6:30pm • £20",
      image: "/improv.jpg",
      link: "/class/improv-londonbridge",
      long:
        "Fun, supportive improv class covering warm-ups, status games and short-form scenes. Build confidence, listening skills and quick thinking—no experience required.",
      meta: { size: "Up to 12 people", level: "Beginner-friendly", duration: "90 mins" },
      instructor: { name: "Alex G.", bio: "Performer and coach with credits at Hoopla & The Free Association; known for inclusive, high-energy sessions." },
      extras: { location: "Studio 3, London Bridge", bring: "Comfortable clothes, water", included: "All exercises and scene prompts" },
    },
    {
      title: "Wheel Throwing Taster – Camberwell",
      details: "Fridays 7pm • £22",
      image: "/pottery.jpg",
      link: "/class/pottery-camberwell",
      long:
        "Hands-on taster on the wheel. Learn centering, pulling walls and simple shaping. Ideal first try at wheel throwing; pieces can be trimmed and fired (optional).",
      meta: { size: "Up to 8 people", level: "Beginner", duration: "2 hours" },
      instructor: { name: "Jess H.", bio: "Studio owner and ceramicist; specialises in functional stoneware and relaxed, step-by-step teaching." },
      extras: { location: "Camberwell Clay Studio", bring: "Clothes you don’t mind getting clay on", included: "Clay, tools, aprons; firing available for a small fee" },
    },
    {
      title: "Vietnamese Street Food – Lewisham",
      details: "Sat 5pm • £28",
      image: "/cooking.jpg",
      link: "/class/cooking-lewisham",
      long:
        "Cook flavour-packed favourites like bánh xèo, fresh spring rolls and classic nước chấm. Learn knife skills, balancing sweet-salty-sour-spicy, and plating.",
      meta: { size: "Up to 12 people", level: "Beginner to improver", duration: "2 hours" },
      instructor: { name: "Linh N.", bio: "Self-taught cook with family recipes from Hà Nội; passionate about seasonal produce and approachable techniques." },
      extras: { location: "Lewisham Cook Lab", bring: "Hair tie if needed, takeaway box", included: "All ingredients & recipes; veggie options available" },
    },
  ];

  const openDetails = (item: CardItem, accent: Accent) =>
    setDetailsModal({ open: true, item, accent });
  const closeDetails = () =>
    setDetailsModal({ open: false, item: null, accent: null });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-pink-50 text-gray-900 font-sans">
      <Head>
        <title>Dabble: Your Membership for Real-World Classes in London</title>
      </Head>

      {/* Load Turnstile script once */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />

      {/* NAV (leave whatever global header you use; the page also has this one) */}
      <nav className="fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-white">
              <Brand />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollTo("explore")}
                className="font-medium text-white/80 hover:text-white transition-colors"
              >
                Explore Classes
              </button>
              <button
                onClick={() => scrollTo("membership")}
                className="font-medium text-white/80 hover:text-white transition-colors"
              >
                Membership
              </button>
            </div>
            <Button
              type="button"
              data-open-signup
              className="text-white shadow-md"
              style={{ backgroundColor: brandPrimary }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = brandPrimaryHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = brandPrimary)
              }
            >
              Join Dabble
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative mt-0 h-screen">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/background_arts.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 text-center">
          <h1
            className="text-white text-4xl md:text-6xl font-bold max-w-4xl mx-auto drop-shadow-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Leave the apps at home.
            <br />
            Try something new in London.
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-4 max-w-2xl mx-auto drop-shadow-md">
            One membership for endless creativity. Try pottery, cooking, dance,
            and more with your monthly included classes.
          </p>

          {/* Search bar */}
          <form
            className="relative mt-8 w-full max-w-4xl bg-white/18 backdrop-blur-md rounded-full shadow-lg p-2 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              scrollTo("explore");
            }}
          >
            <div className="flex items-center flex-[1.25] min-w-0 pl-3">
              <MapPinIcon className="h-5 w-5 text-white mr-2 flex-shrink-0" />
              <Input
                placeholder="Location (e.g., Peckham)"
                className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/70 w-full p-0"
              />
            </div>

            <div className="w-[1px] h-6 bg-white/30" />

            <div className="relative flex items-center flex-[1] min-w-0 px-3">
              <LayoutGridIcon className="h-5 w-5 text-white mr-2 flex-shrink-0" />
              <select className="appearance-none bg-transparent border-none focus:ring-0 text-white w-full p-0 pr-6 [&>option]:text-black">
                <option value="">Category</option>
                <option>Pottery</option>
                <option>Dance</option>
                <option>Cooking</option>
                <option>Art</option>
                <option>Improv</option>
                <option>Mindfulness</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 h-4 w-4 text-white/80"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="w-[1px] h-6 bg-white/30" />

            <label className="flex items-center flex-[0.9] min-w-0 px-3 cursor-pointer">
              <CalendarIcon className="h-5 w-5 text-white mr-2 flex-shrink-0" />
              <Input
                type="date"
                className="bg-transparent border-none focus:ring-0 text-white w-full p-0 appearance-none"
              />
            </label>

            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
              style={{ backgroundColor: brandPrimary }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = brandPrimaryHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = brandPrimary)
              }
            >
              <SearchIcon className="h-5 w-5 text-white" />
            </button>
          </form>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section className="bg-teal-50/50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold" style={{ color: brandPrimary }}>
              Your Curiosity, Unboxed
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              A simple membership to unlock your city's best creative classes.
            </p>
          </div>
          <div className="relative mt-12 grid md:grid-cols-3 gap-8">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 hidden md:block" />
            {[
              {
                icon: <Package size={32} />,
                title: "Pick Your Plan",
                description:
                  "Choose a monthly plan that fits how often you want to get out and try something new.",
              },
              {
                icon: <CalendarCheck size={32} />,
                title: "Book Your Classes",
                description:
                  "Use your monthly credits to book any class included in your plan. It's all managed in one place.",
              },
              {
                icon: <Sparkles size={32} />,
                title: "Enjoy & Repeat",
                description:
                  "Show up, have fun, and discover a new hobby. Your credits reset every month.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg border"
              >
                <div
                  className="absolute -top-10 flex items-center justify-center h-20 w-20 rounded-full border-4 border-white"
                  style={{ backgroundColor: accents[1].bg }}
                >
                  <div
                    className="flex items-center justify-center h-16 w-16 rounded-full text-white"
                    style={{ backgroundColor: brandPrimary }}
                  >
                    {step.icon}
                  </div>
                </div>
                <div className="mt-10">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPUP (Sign up) */}
      {showPopup && (
        <div
          id="beta-modal"
          className="fixed inset-0 backdrop-blur-md bg-black/40 flex justify-center items-center z-[200] p-4"
          onClick={closeSignup}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeSignup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-full w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100"
              aria-label="Close signup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <h2 className="text-3xl font-bold mb-3" style={{ color: brandPrimary }}>
              Join Our Beta
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Be the first to access early classes and exclusive offers.
            </p>

            <SignupForm
              layout="modal"
              brandPrimary={brandPrimary}
              brandPrimaryHover={brandPrimaryHover}
              onSuccess={() => {}}
            />
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {detailsModal.open && detailsModal.item && detailsModal.accent && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex justify-center items-center z-[200] p-4" onClick={closeDetails}>
          <div className="rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row max-h-[90vh]" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: detailsModal.accent.bg }}>
            <div className="w-full md:w-2/5 relative min-h-[250px] md:min-h-0">
              <Image src={detailsModal.item.image} alt={detailsModal.item.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 40vw" priority />
            </div>
            <div className="w-full md:w-3/5 flex flex-col">
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: detailsModal.accent.accent }}>{detailsModal.item.title}</h3>
                    <p className="text-md text-gray-700">{detailsModal.item.details}</p>
                  </div>
                  <button onClick={closeDetails} className="text-gray-500 hover:text-gray-900 transition-colors rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 bg-black/5 hover:bg-black/10" aria-label="Close details">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center border-t border-b py-4" style={{ borderColor: `${detailsModal.accent.accent}40` }}>
                  {[
                    { icon: <UsersIcon className="h-5 w-5 mx-auto" />, label: "Class Size", value: detailsModal.item.meta.size },
                    { icon: <BarChartIcon className="h-5 w-5 mx-auto" />, label: "Level", value: detailsModal.item.meta.level },
                    { icon: <ClockIcon className="h-5 w-5 mx-auto" />, label: "Duration", value: detailsModal.item.meta.duration },
                  ].map((m) => (
                    <div key={m.label} className="flex flex-col items-center justify-start" style={{ color: detailsModal.accent.accent }}>
                      {m.icon}
                      <div className="font-semibold text-sm mt-1 text-gray-800">{m.value}</div>
                      <div className="text-xs text-gray-600">{m.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-800 leading-relaxed">{detailsModal.item.long}</p>

                <div>
                  <h4 className="font-semibold text-lg" style={{ color: detailsModal.accent.accent }}>Your Instructor</h4>
                  <div className="mt-2 p-4 rounded-lg" style={{ backgroundColor: `${detailsModal.accent.accent}1A` }}>
                    <div className="font-bold text-gray-900">{detailsModal.item.instructor.name}</div>
                    <p className="text-gray-700 text-sm mt-1">{detailsModal.item.instructor.bio}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg" style={{ color: detailsModal.accent.accent }}>Good to know</h4>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm mt-2">
                    <div>
                      <div className="font-medium text-gray-800">📍 Location</div>
                      <div className="text-gray-600">{detailsModal.item.extras.location}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">🎒 Bring</div>
                      <div className="text-gray-600">{detailsModal.item.extras.bring}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">✅ Included</div>
                      <div className="text-gray-600">{detailsModal.item.extras.included}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:px-8 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: `${detailsModal.accent.accent}40` }}>
                <Button onClick={() => { setShowPopup(true); closeDetails(); }} className="w-full text-white shadow hover:opacity-95" style={{ backgroundColor: detailsModal.accent.accent }}>
                  Join & Book
                </Button>
                <Button variant="outline" className="w-full bg-white" style={{ borderColor: detailsModal.accent.accent, color: detailsModal.accent.accent }} onClick={closeDetails}>
                  Keep Browsing
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 mt-16 space-y-16">
        <section id="explore">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: brandPrimary }}>
            Explore classes
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardData.map((x, i) => {
              const a = accents[i % accents.length];
              return (
                <div key={x.title} className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105 flex flex-col bg-white">
                  <div className="relative w-full h-48">
                    <Image src={x.image} alt={x.title} fill style={{ objectFit: "cover" }} className="rounded-t-2xl" sizes="(max-width: 768px) 100vw, 600px" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow" style={{ backgroundColor: a.bg }}>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg text-gray-900">{x.title}</h3>
                      <p className="text-xs inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full border" style={{ borderColor: a.accent, color: a.accent }}>
                        Included with Explorer+
                      </p>
                      <p className="text-sm text-gray-600 mt-2">{x.details}</p>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                      <Button variant="outline" className="w-full bg-white transition-colors" style={{ color: a.accent, borderColor: a.accent }} onClick={() => openDetails(x, a)}>
                        View details
                      </Button>
                      <Button onClick={openSignup} className="w-full text-white shadow hover:opacity-95" style={{ backgroundColor: a.accent }}>
                        Join & book
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="membership">
          <h2 className="text-3xl font-bold text-center" style={{ color: brandPrimary }}>
            Choose your membership
          </h2>
          <p className="text-center text-gray-600 mt-2">Cancel anytime • No hidden fees</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { name: "Dabbler", price: "29", desc: "Perfect for trying something new.", features: ["2 classes per month"] },
              { name: "Explorer", price: "55", desc: "For the curious — more variety, better value.", features: ["4 classes per month", "Priority booking"], isPopular: true },
              { name: "Adventurer", price: "99", desc: "For regulars who love to mix it up.", features: ["8+ classes per month", "Priority booking", "Bring-a-friend pass"] },
            ].map((plan, i) => {
              const a = accents[i % accents.length];
              return (
                <div key={plan.name} className={`relative flex flex-col rounded-2xl overflow-hidden shadow-lg border transition-transform duration-300 hover:scale-105 ${plan.isPopular ? "border-4" : "border-gray-100"}`} style={{ borderColor: plan.isPopular ? a.accent : undefined }}>
                  {plan.isPopular && (
                    <div className="absolute top-4 right-4 bg-white text-xs font-bold py-1 px-3 rounded-full shadow" style={{ color: a.accent }}>
                      Most Popular
                    </div>
                  )}

                  <div className="p-6 text-center text-white" style={{ backgroundColor: a.accent }}>
                    <h3 className="text-2xl font-semibold">{plan.name}</h3>
                    <p className="text-sm opacity-80">{plan.desc}</p>
                  </div>

                  <div className="p-6 flex flex-col flex-grow text-center" style={{ backgroundColor: a.bg }}>
                    <div className="flex-grow">
                      <div className="my-4">
                        <span className="text-5xl font-bold text-gray-900">£{plan.price}</span>
                        <span className="text-lg text-gray-600">/month</span>
                      </div>
                      <ul className="space-y-2 text-gray-700">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" style={{ color: a.accent }} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="mt-6 w-full text-white shadow hover:opacity-95" style={{ backgroundColor: a.accent }} onClick={openSignup}>
                      Choose {plan.name}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="signup" className="pb-12">
          <div className="rounded-2xl p-8 md:p-12 grid gap-8 md:grid-cols-2 md:items-center" style={{ backgroundColor: accents[1].bg }}>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold" style={{ color: brandPrimary }}>
                Ready to Dabble?
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Join our beta and be the first to access new classes and exclusive offers.
              </p>
            </div>

            {/* Inline signup with Turnstile */}
            <SignupForm
              layout="inline"
              brandPrimary={brandPrimary}
              brandPrimaryHover={brandPrimaryHover}
              onSuccess={() => {}}
            />
          </div>
        </section>
      </main>

      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Dabble</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-gray-900">About</Link>
            <Link href="/newsletter-signup" className="hover:text-gray-900">Get membership updates</Link>
            <Link href="/join-studio" className="hover:text-gray-900">Join as a studio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}