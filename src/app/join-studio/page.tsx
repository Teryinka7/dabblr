// src/app/join-studio.tsx
"use client";

import { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Updated icons for the new benefits list
import { TrendingUp, Plus, Minus, Map, Clock, Star } from "lucide-react"; 
import Script from "next/script";

// Assuming these are available globally or defined here for this page
declare global {
  interface Window {
    turnstile?: {
     reset?: (el: Element) => void;
    };
  }
}

// ====== ENV (site key is safe to expose) ======
// Note: You must ensure this variable is set in your .env.local file
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "YOUR_TURNSTILE_SITE_KEY"; 

// Simple brand wordmark
const Brand = () => (
  <span
    className="text-2xl font-semibold tracking-tight"
    style={{ fontFamily: "'Poppins', sans-serif" }}
  >
    Dabble
  </span>
);

// Form Component
type StudioSignupFormProps = {
  brandPrimary: string;
  brandPrimaryHover: string;
};

function StudioSignupForm({ brandPrimary, brandPrimaryHover }: StudioSignupFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  
  // State for all seven form fields
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bookingSoftware, setBookingSoftware] = useState("");
  const [message, setMessage] = useState("");

  const getToken = () => {
    const el = formRef.current?.querySelector(
      'input[name="cf-turnstile-response"]'
    ) as HTMLInputElement | null;
    return el?.value || "";
  };

  interface StudioSignupFormData {
    businessName: string;
    contactName: string;
    email: string;
    phone: string;
    location: string;
    bookingSoftware: string;
    message: string;
    token: string;
  }

  interface StudioSignupFormMsg {
    type: "ok" | "err";
    text: string;
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setMsg(null);

    const token = getToken();
    if (!token) {
      setMsg({ type: "err", text: "Please complete the captcha." });
      return;
    }

    try {
      setSubmitting(true);

      // === Placeholder API Call (Replace with your actual endpoint) ===
      // This is where you would post the form data
      // Data to send: { businessName, contactName, email, phone, location, bookingSoftware, message, token }
      const formData: StudioSignupFormData = {
        businessName,
        contactName,
        email,
        phone,
        location,
        bookingSoftware,
        message,
        token,
      };

      await new Promise<void>((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      const successMsg: StudioSignupFormMsg = {
        type: "ok",
        text: "Application submitted! We will be in touch soon to discuss next steps.",
      };
      setMsg(successMsg);

      // Clear form fields after successful submission
      setBusinessName("");
      setContactName("");
      setEmail("");
      setPhone("");
      setLocation("");
      setBookingSoftware("");
      setMessage("");
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      const errorMsg: StudioSignupFormMsg = { type: "err", text };
      setMsg(errorMsg);
    } finally {
      setSubmitting(false);
      // Reset Turnstile widget
      if (formRef.current) {
        const widget = formRef.current.querySelector(".cf-turnstile");
        if (widget && window.turnstile?.reset) {
          window.turnstile.reset(widget);
        }
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="source" value="join-studio" />
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Business name</label>
        <Input 
          name="business-name"
          placeholder="Studio or business name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required 
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Contact name</label>
        <Input 
          name="contact-name"
          placeholder="Your full name"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          required 
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Contact email</label>
        <Input 
          type="email"
          name="email"
          placeholder="studio@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Contact number (optional)</label>
        <Input 
          type="tel"
          name="phone"
          placeholder="+44 7123 456789 (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <Input 
          name="location"
          placeholder="London area (e.g., Peckham)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required 
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Booking software (if any)</label>
        <Input 
          name="booking-software"
          placeholder="Mindbody, WellnessLiving, None, etc."
          value={bookingSoftware}
          onChange={(e) => setBookingSoftware(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Tell us about your classes</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Example classes, days and times, typical capacity"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-opacity-50 resize-none"
          style={{ borderColor: brandPrimary, outlineColor: brandPrimary }}
        />
      </div>

      {/* Turnstile widget */}
      <div className="pt-2">
        <div
          className="cf-turnstile"
          data-sitekey={TURNSTILE_SITE_KEY}
          data-theme="light"
          data-size="normal" // Changed from 'flexible' for better rendering control
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="w-full text-white px-6 py-3 rounded-lg text-lg shadow hover:opacity-95 flex items-center justify-center gap-2"
          style={{ backgroundColor: brandPrimary }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brandPrimaryHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = brandPrimary)}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
      
      {msg && (
        <p className={msg.type === "ok" ? "text-green-600 text-sm font-semibold text-center" : "text-red-600 text-sm font-semibold text-center"}>
          {msg.text}
        </p>
      )}

      <p className="text-sm text-gray-500 mt-2 text-center">
        After you submit we will contact you to help set up listings and promotion. Thank you for supporting local creative businesses.
      </p>
    </form>
  );
}

// FAQ Accordion Item Component
type FAQItemProps = {
  question: string;
  answer: string;
  brandPrimary: string;
};

const FAQItem = ({ question, answer, brandPrimary }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left font-semibold text-gray-900 hover:text-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        {isOpen ? (
          <Minus size={20} style={{ color: brandPrimary }} />
        ) : (
          <Plus size={20} style={{ color: brandPrimary }} />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 pb-4 pr-8">{answer}</p>
      </div>
    </div>
  );
};


export default function JoinStudio() {
  // Use the established brand colors from page.tsx
  const brandPrimary = "#2F7A80"; // Teal
  const brandPrimaryHover = "#2A6C71";
  const heroBg = "/background_arts.jpg"; // Consistent hero image

  // New Benefits Data
  const benefitsData = [
    { icon: <Star size={32} style={{ color: brandPrimary }} />, title: "Free Promotion", description: "We will feature your classes to local users during the pilot — no fees." },
    { icon: <TrendingUp size={32} style={{ color: brandPrimary }} />, title: "Fill Spare Spots", description: "Reach new students and reduce empty seats without extra ad spend." },
    { icon: <Clock size={32} style={{ color: brandPrimary }} />, title: "Simple Onboarding", description: "Send your details and we will create the listing — quick and hands-off." },
    { icon: <Map size={32} style={{ color: brandPrimary }} />, title: "Community Focus", description: "We prioritise real-life connection and long-term community building." },
  ];

  // New FAQ Data
  const faqData = [
    {
      q: "What is Dabble and why partner?",
      a:
        "Dabble is a small London pilot (MVP) that helps curious locals discover in-person hobby classes — pottery, cooking, dance, improv and more. For the pilot we are offering partner studios free marketing and no commission so you can test whether Dabble drives bookings for you.",
    },
    {
      q: "Is there any cost or commission?",
      a:
        "No — during the MVP/pilot period there are no fees and no commission. You keep your full class income. We will be transparent about future pricing if and when we launch a paid model, but for the pilot it is free for partners.",
    },
    {
      q: "How do bookings arrive at my studio?",
      a:
        "We will list your class with your contact or booking link or enable direct bookings. Initially we can forward bookings to your email or phone, or integrate with a simple calendar or CSV flow depending on what works for you. We will discuss operational preferences during onboarding.",
    },
    {
      q: "Who owns customer data?",
      a:
        "During the pilot we will share booking details you need to run the class (name, email, booking time). We do not keep this data private from you — we aim for a collaborative pilot. Longer-term policies (data ownership, export, GDPR) will be documented and agreed before any paid model.",
    },
    {
      q: "What about cancellations or no-shows?",
      a:
        "Your studio can keep your usual cancellation and no-show policies. We will display the studio policy on the listing. If you would like, we can also include automated reminders to reduce no-shows.",
    },
    {
      q: "What do you need from us to get listed?",
      a:
        "A contact email, short class description, price, dates and times or recurring schedule, a photo or logo, and your cancellation policy. That is it — we will create the listing for you and send a preview before it goes live.",
    },
    {
      q: "How long is the pilot and what happens after?",
      a:
        "The pilot will run until we have enough data and partner feedback. We will confirm timelines with partners. After the pilot we may introduce a commercial model; we will discuss and agree terms with partner studios before rolling out any paid features.",
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-pink-50 text-gray-900 font-sans">
      <Head>
        <title>Partner with Dabble: Join as a Studio</title>
      </Head>
      
      {/* Load Turnstile script once */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-white">
              <Brand />
            </Link>
            <Link href="/" passHref>
              <Button
                type="button"
                className="text-white shadow-md"
                style={{ backgroundColor: brandPrimary }}
              >
                Back to Classes
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative mt-0 h-[60vh] min-h-[400px]">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 text-center">
          <h1
            className="text-white text-4xl md:text-5xl font-bold max-w-4xl mx-auto drop-shadow-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Partner with Dabble:
            <br />
            Fill Your Classes, Hassle-Free.
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-4 max-w-2xl mx-auto drop-shadow-md">
            We connect you with a new audience of curious Londoners ready to book.
          </p>
          <Button
            onClick={() => document.getElementById("studio-form")?.scrollIntoView({ behavior: "smooth" })}
            type="button"
            className="mt-6 text-white text-lg px-8 py-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            style={{ backgroundColor: brandPrimary }}
          >
            Apply to Partner
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-16 space-y-20">
        {/* BENEFITS SECTION */}
        <section className="bg-white py-12 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold" style={{ color: brandPrimary }}>
              Pilot Benefits: Why Join Now?
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Grow your studio with pre-paid, engaged new customers.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-4 gap-8 px-8">
            {benefitsData.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center p-4">
                <div className="h-16 w-16 flex items-center justify-center rounded-full" style={{ backgroundColor: brandPrimary + '1A' }}>
                    {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-4">{benefit.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* APPLICATION FORM SECTION */}
        <section id="studio-form" className="py-12">
          <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center">
              <h2 className="text-3xl font-bold" style={{ color: brandPrimary }}>
                Start Your Partnership
              </h2>
              <p className="mt-2 text-lg text-gray-600 mb-6">
                Complete this short form and we will contact you to help get your first listings live.
              </p>
            </div>
            <StudioSignupForm brandPrimary={brandPrimary} brandPrimaryHover={brandPrimaryHover} />
          </div>
        </section>
        
        {/* FAQ SECTION */}
        <section className="py-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold" style={{ color: brandPrimary }}>
                    Frequently Asked Questions
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                    Find quick answers to common partner questions about the pilot.
                </p>
            </div>
            <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 divide-y divide-gray-200 p-6">
                {faqData.map((item, index) => (
                    <FAQItem
                        key={index}
                        question={item.q}
                        answer={item.a}
                        brandPrimary={brandPrimary}
                    />
                ))}
            </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Dabble</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-gray-900">About</Link>
            <Link href="/newsletter-signup" className="hover:text-gray-900">
              Get updates
            </Link>
            <Link href="/join-studio" className="hover:text-gray-900">Join as a studio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}