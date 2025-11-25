"use client";

import { useEffect, useState, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MenuIcon,
  XIcon,
  MapPinIcon,
  CalendarIcon,
  SearchIcon,
  LayoutGridIcon,
} from "lucide-react";

// Brand wordmark
const Brand = () => (
  <span className="text-2xl font-semibold tracking-tight text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
    Dabblr
  </span>
);

const UsersIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const BarChartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
);
const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
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

// ========= Reusable Signup Form (no captcha) =========

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzzgglav"; // update if you change form ID

function SignupForm({
  layout = "modal",
  brandPrimary,
  brandPrimaryHover,
  onSuccess = () => {},
}: {
  layout?: "modal" | "inline";
  brandPrimary: string;
  brandPrimaryHover: string;
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Formspree error:", text);
        setError("Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <p className="text-gray-800">
        Thanks! You’re on the list.
      </p>
    );
  }

  return (
    <form
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

      {error && (
        <p className="text-sm text-red-600 w-full">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className={
          layout === "modal"
            ? "w-full text-white px-6 py-3 rounded-lg text-lg shadow hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
            : "text-white whitespace-nowrap shadow hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
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
    </form>
  );
}
export default function Dabble() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{ open: boolean; item: CardItem | null; accent: Accent | null }>({
    open: false,
    item: null,
    accent: null,
  });

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

  const openSignup = () => {
    window.dispatchEvent(new Event("open-signup"));
  };

  // Close with ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDetailsModal({ open: false, item: null, accent: null });
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock background scroll when the mobile drawer or details modal is open
  useEffect(() => {
    const anyOpen = mobileOpen || detailsModal.open;

    if (anyOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      const scrollY = window.scrollY;
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      const scrollY = document.body.style.top;
      
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      
      if (scrollY) {
        const scrollPosition = Math.abs(parseInt(scrollY));
        window.scrollTo(0, scrollPosition);
      }
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      
      if (scrollY) {
        const scrollPosition = Math.abs(parseInt(scrollY));
        window.scrollTo(0, scrollPosition);
      }
    };
  }, [mobileOpen, detailsModal.open]);

  const cardData: CardItem[] = [
    {
      title: "WINTRY LANDSCAPES – the Castle in Dulwich",
      details: "Thu 27th Nov, 7.45 - 9.45 pm​ • £35",
      image: "/wintery_landscapes.jpg",
      link: "/class/wintery_landscapes",
      long: "Whether you’re returning to build on your collection or joining us for the very first time, this workshop is the perfect creative escape! Inspired by the bold textures and dramatic contrasts of David Barnes, we’ll be creating expressive wintry landscapes in acrylics. You’ll explore palette knife techniques, layering, and colour blending to capture the atmosphere of rolling hills, striking skies, and rustic rural scenes.",
      meta: { size: "Medium", level: "Beginner-friendly", duration: "2 hrs" },
      instructor: { name: "Lynn.", bio: "Lynn has 20 years of experience of working in education as an art  teacher and as a lecturer.  Lynn has  taught art extensively in London schools and collaborated with a vast range of artists, art organisations and galleries." },
      extras: { location: "The Castle, 280 Crystal Palace Rd, London SE22 9JJ", bring: "Good mood", included: "Art supplies" },
    },
    {
      title: "MONOPRINTS & WATERCOLOURS – the Castle in Dulwich",
      details: "Thu 4th Dec, 7.45 - 9.45 pm • £35",
      image: "/monoprints_watercolours.jpg",
      link: "/class/monoprints_watercolours",
      long: "Join us for a relaxing and creative workshop inspired by the stunning nature-based prints of Angela Harding. Using a simple mono printing technique with carbon copy paper, you’ll create beautiful layered prints enhanced with delicate watercolour washes. No drawing skills are required—you can trace your chosen image, making this a perfect workshop for beginners and experienced artists alike.",
      meta: { size: "Medium", level: "Beginner", duration: "2 hours" },
      instructor: { name: "Lynn.", bio: "Lynn has 20 years of experience of working in education as an art  teacher and as a lecturer.  Lynn has  taught art extensively in London schools and collaborated with a vast range of artists, art organisations and galleries." },
      extras: { location: "The Castle, 280 Crystal Palace Rd, London SE22 9JJ", bring: "Good mood", included: "Art supplies" },
    },
    {
      title: "Stand-up Improv – London Bridge",
      details: "Weds 6:30pm • £20",
      image: "/improv.jpg",
      link: "/class/improv-londonbridge",
      long: "Fun, supportive improv class covering warm-ups, status games and short-form scenes. Build confidence, listening skills and quick thinking—no experience required.",
      meta: { size: "Up to 12 people", level: "Beginner-friendly", duration: "90 mins" },
      instructor: { name: "Alex G.", bio: "Performer and coach with credits at Hoopla & The Free Association; known for inclusive, high-energy sessions." },
      extras: { location: "Studio 3, London Bridge", bring: "Comfortable clothes, water", included: "All exercises and scene prompts" },
    },
    {
      title: "Wheel Throwing Taster – Camberwell",
      details: "Fridays 7pm • £22",
      image: "/pottery.jpg",
      link: "/class/pottery-camberwell",
      long: "Hands-on taster on the wheel. Learn centering, pulling walls and simple shaping. Ideal first try at wheel throwing; pieces can be trimmed and fired (optional).",
      meta: { size: "Up to 8 people", level: "Beginner", duration: "2 hours" },
      instructor: { name: "Jess H.", bio: "Studio owner and ceramicist; specialises in functional stoneware and relaxed, step-by-step teaching." },
      extras: { location: "Camberwell Clay Studio", bring: "Clothes you don't mind getting clay on", included: "Clay, tools, aprons; firing available for a small fee" },
    },
    {
      title: "Vietnamese Street Food – Lewisham",
      details: "Sat 5pm • £28",
      image: "/cooking.jpg",
      link: "/class/cooking-lewisham",
      long: "Cook flavour-packed favourites like bánh xèo, fresh spring rolls and classic nước chấm. Learn knife skills, balancing sweet-salty-sour-spicy, and plating.",
      meta: { size: "Up to 12 people", level: "Beginner to improver", duration: "2 hours" },
      instructor: { name: "Linh N.", bio: "Self-taught cook with family recipes from Hà Nội; passionate about seasonal produce and approachable techniques." },
      extras: { location: "Lewisham Cook Lab", bring: "Hair tie if needed, takeaway box", included: "All ingredients & recipes; veggie options available" },
    },
  ];

  const openDetails = (item: CardItem, accent: Accent) => setDetailsModal({ open: true, item, accent });
  const closeDetails = () => setDetailsModal({ open: false, item: null, accent: null });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-pink-50 text-gray-900 font-poppins">
      
      {/* ========== SINGLE STICKY HEADER ========== */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" aria-label="Dabblr Home">
              <Brand />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <button onClick={() => scrollTo("explore")} className="hover:text-teal-600 transition-colors">Explore classes</button>
              <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
              <Link href="/join-studio" className="hover:text-teal-600 transition-colors">For Studios</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button onClick={openSignup} variant="outline" className="hidden md:inline-flex">
                Sign Up
              </Button>
              <button
                className="md:hidden p-2 rounded-md -mr-2"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon className="h-6 w-6 text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85%] bg-white shadow-xl p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold tracking-tight text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>Dabblr</span>
              <button
                className="rounded-full w-9 h-9 inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <nav className="mt-8 space-y-2">
              <button onClick={() => scrollTo("explore")} className="block w-full text-left px-3 py-2 rounded text-lg hover:bg-gray-100">Explore Classes</button>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded text-lg hover:bg-gray-100">About</Link>
              <Link href="/join-studio" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded text-lg hover:bg-gray-100">For Studios</Link>
            </nav>
            <div className="mt-auto pt-4 border-t">
              <Button onClick={openSignup} className="w-full">Sign Up</Button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-4rem)]">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/background_arts.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 w-full h-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold max-w-4xl mx-auto drop-shadow-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Leave the apps at home.
            <br />
            Try something new in London.
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-4 max-w-2xl mx-auto drop-shadow-md">
            Browse classes near you, try pottery, cooking, dance,
            and more.
          </p>

          <form
            className="relative mt-8 w-full max-w-4xl bg-white/18 backdrop-blur-md rounded-full shadow-lg p-2 flex items-center gap-2"
            onSubmit={(e) => { e.preventDefault(); scrollTo("explore"); }}
          >
            <div className="flex items-center flex-[1.25] min-w-0 pl-3">
              <MapPinIcon className="h-5 w-5 text-white mr-2 flex-shrink-0" />
              <Input placeholder="Location (e.g., Peckham)" className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/70 w-full p-0" />
            </div>
            <div className="w-[1px] h-6 bg-white/30 hidden sm:block" />
            <div className="relative items-center flex-[1] min-w-0 px-3 hidden sm:flex">
              <LayoutGridIcon className="h-5 w-5 text-white mr-2 flex-shrink-0" />
              <select className="appearance-none bg-transparent border-none focus:ring-0 text-white w-full p-0 pr-6 [&>option]:text-black">
                <option value="">Category</option>
                <option>Pottery</option><option>Dance</option><option>Cooking</option><option>Art</option><option>Improv</option><option>Mindfulness</option>
              </select>
              <svg className="pointer-events-none absolute right-3 h-4 w-4 text-white/80" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" /></svg>
            </div>
            <div className="w-[1px] h-6 bg-white/30 hidden md:block" />
            <label className="items-center flex-[0.9] min-w-0 px-3 cursor-pointer hidden md:flex">
              <CalendarIcon className="h-5 w-5 text-white mr-2 flex-shrink-0" />
              <Input type="date" className="bg-transparent border-none focus:ring-0 text-white w-full p-0 appearance-none" />
            </label>
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
              style={{ backgroundColor: brandPrimary }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brandPrimaryHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = brandPrimary)}
            ><SearchIcon className="h-5 w-5 text-white" /></button>
          </form>
        </div>
      </section>

      {/* DETAILS MODAL */}
      {detailsModal.open && detailsModal.item && detailsModal.accent && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/40 flex justify-center items-center z-[400] p-4"
          onClick={closeDetails}
        >
          <div
            className="rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-auto md:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: detailsModal.accent.bg }}
          >
            <div className="w-full md:w-2/5 relative min-h-[220px] md:min-h-0">
              <Image
                src={detailsModal.item.image}
                alt={detailsModal.item.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>

            <div className="w-full md:w-3/5 flex flex-col min-h-0">
              <div
                className="p-6 md:p-8 flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-6"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: detailsModal.accent.accent }}>{detailsModal.item.title}</h3>
                    <p className="text-md text-gray-700">{detailsModal.item.details}</p>
                  </div>
                  <button onClick={closeDetails} className="text-gray-500 hover:text-gray-900 transition-colors rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 bg-black/5 hover:bg-black/10" aria-label="Close details">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center border-t border-b py-4" style={{ borderColor: `${detailsModal.accent.accent}40` }}>
                  {[
                    { icon: <UsersIcon className="h-5 w-5 mx-auto" />, label: "Class Size", value: detailsModal.item.meta.size },
                    { icon: <BarChartIcon className="h-5 w-5 mx-auto" />, label: "Level", value: detailsModal.item.meta.level },
                    { icon: <ClockIcon className="h-5 w-5 mx-auto" />, label: "Duration", value: detailsModal.item.meta.duration },
                  ].map((m) => (
                    <div key={m.label} className="flex flex-col items-center justify-start" style={{ color: detailsModal.accent?.accent }}>
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
                    <div><div className="font-medium text-gray-800">📍 Location</div><div className="text-gray-600">{detailsModal.item.extras.location}</div></div>
                    <div><div className="font-medium text-gray-800">🎒 Bring</div><div className="text-gray-600">{detailsModal.item.extras.bring}</div></div>
                    <div><div className="font-medium text-gray-800">✅ Included</div><div className="text-gray-600">{detailsModal.item.extras.included}</div></div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:px-8 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: `${detailsModal.accent.accent}40` }}>
                <Button onClick={() => { openSignup(); closeDetails(); }} className="w-full text-white shadow hover:opacity-95" style={{ backgroundColor: detailsModal.accent.accent }}>Book class</Button>
                <Button variant="outline" className="w-full bg-white" style={{ borderColor: detailsModal.accent.accent, color: detailsModal.accent.accent }} onClick={closeDetails}>Keep Browsing</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 mt-16 space-y-16">
        <section id="explore">
          <h2 className="text-2xl font-semibold mb-4 text-center" style={{ color: brandPrimary }}>Explore classes</h2>
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
                      <p className="text-xs inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full border" style={{ borderColor: a.accent, color: a.accent }}>Included with Explorer+</p>
                      <p className="text-sm text-gray-600 mt-2">{x.details}</p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <Button variant="outline" className="w-full bg-white transition-colors" style={{ color: a.accent, borderColor: a.accent }} onClick={() => openDetails(x, a)}>View details</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2"><h3 className="text-xl font-semibold">Ready to start dabbling?</h3><p className="mt-2 text-gray-600">Sign up for our beta to be the first to know when we launch.</p></div>
            <div className="md:col-span-2"><SignupForm layout="inline" brandPrimary={brandPrimary} brandPrimaryHover={brandPrimaryHover} /></div>
          </div>
          <div className="mt-10 border-t pt-8 text-center text-sm text-gray-500"><p>© {new Date().getFullYear()} Dabblr Inc. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  );
}