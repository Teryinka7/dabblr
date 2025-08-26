"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Head from "next/head";
import Link from "next/link";

export default function Dabble() {
  const [showPopup, setShowPopup] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const openSignup = () => setShowPopup(true);

  // Muted, sophisticated palette inspired by the background image
  const accents = [
    { name: "terracotta", accent: "#C45E49", bg: "#F7F2EE" },
    { name: "teal", accent: "#2F7A80", bg: "#EEF6F6" },
    { name: "slate", accent: "#3B5566", bg: "#F1F4F6" },
    { name: "saffron", accent: "#D99136", bg: "#FEF6E9" },
    { name: "plum", accent: "#4A3B55", bg: "#F5F2F7" },
    { name: "forest", accent: "#2E584E", bg: "#EEF5F3" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-pink-50 text-gray-900 font-sans">
      <Head>
        <title>Dabble: Try a New Activity in London</title>
        {/* Font-loading handled globally in src/app/layout.tsx via next/font */}
      </Head>

      {/* Top navigation with section links */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-blue-700">Dabble</Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <button onClick={() => scrollTo("explore")} className="hover:text-blue-700">Explore</button>
            <button onClick={() => scrollTo("membership")} className="hover:text-blue-700">Membership</button>
            <Link href="/about" className="hover:text-blue-700">About</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50" onClick={openSignup}>Sign up</Button>
          </div>
        </div>
      </nav>

      <header className="mt-0">
        {/* Full-bleed hero with centered content */}
        <div
          className="relative w-full h-[calc(100vh-64px)] bg-cover bg-center"
          style={{ backgroundImage: "url('/background_arts.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-12 text-center">
            <h1
              className="text-white text-4xl md:text-5xl font-bold max-w-4xl mx-auto"
            >
              Leave the apps at home. Try a new activity in London this week.
            </h1>

            {/* Search filters */}
            <form className="mt-6 w-full max-w-4xl bg-white/95 rounded-2xl shadow-md p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input placeholder="Location (e.g., Peckham)" />
              <select className="px-3 py-2 border border-gray-300 rounded-md w-full bg-white">
                <option value="">Category</option>
                <option>Pottery</option>
                <option>Dance</option>
                <option>Cooking</option>
                <option>Art</option>
                <option>Improv</option>
                <option>Mindfulness</option>
              </select>
              <Input type="date" />
              <Button className="w-full bg-blue-600 hover:bg-blue-700" type="button" onClick={() => scrollTo("explore")}>Search</Button>
            </form>
          </div>
        </div>
      </header>

      {/* Popup for email capture */}
      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/70 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Join Our Beta</h2>
            <p className="text-gray-600 mb-4">Be the first to access early classes and offers.</p>
            <form action="https://formspree.io/f/mzzgglav" method="POST" className="flex gap-3">
              <input type="email" name="email" required placeholder="Your email" className="px-3 py-2 border border-gray-300 rounded-md w-full" />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded whitespace-nowrap">Sign Up</button>
            </form>
            <button onClick={() => setShowPopup(false)} className="mt-4 text-sm text-blue-500 underline">Close</button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 mt-12 space-y-16">
        {/* Explore classes cards */}
        <section id="explore">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Explore classes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Salsa Night – Brixton", d: "Thursdays 7pm • £12" },
              { t: "Beginner Watercolours – Peckham", d: "Saturdays 11am • £18" },
              { t: "Mindfulness & Breathwork – Deptford", d: "Sundays 10am • £15" },
              { t: "Stand-up Improv – London Bridge", d: "Weds 6:30pm • £20" },
              { t: "Wheel Throwing Taster – Camberwell", d: "Fridays 7pm • £22" },
              { t: "Vietnamese Street Food – Lewisham", d: "Sat 5pm • £28" },
            ].map((x, i) => {
              const a = accents[i % accents.length];
              return (
                <div
                  key={x.t}
                  className="rounded-2xl overflow-hidden p-6 shadow border"
                  style={{ backgroundColor: a.bg, borderLeft: `4px solid ${a.accent}` }}
                >
                  <h3 className="font-semibold text-lg text-gray-900">{x.t}</h3>
                  <p className="text-sm text-gray-600">{x.d}</p>
                  <button
                    onClick={openSignup}
                    className="mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-white shadow hover:opacity-95"
                    style={{ backgroundColor: a.accent }}
                  >
                    Book this class
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Membership plans */}
        <section id="membership">
          <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">Membership plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "£29", desc: "2 classes/month" },
              { name: "Explorer", price: "£55", desc: "4 classes/month" },
              { name: "Unlimited", price: "£99", desc: "8+ classes/month" },
            ].map((plan) => (
              <Card key={plan.name}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{plan.price}/month</p>
                  <p className="text-sm text-gray-700">{plan.desc}</p>
                  <Button className="mt-4 bg-pink-500 hover:bg-pink-600" onClick={openSignup}>Choose {plan.name}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Email signup */}
        <section id="signup" className="text-center space-y-3 pb-12">
          <h2 className="text-2xl font-semibold text-blue-800">Join our beta</h2>
          <p className="text-gray-600">Be the first to access early classes and offers.</p>
          <form action="https://formspree.io/f/mzzgglav" method="POST" className="flex flex-col md:flex-row items-center justify-center gap-3">
            <input type="email" name="email" required placeholder="Your email" className="px-3 py-2 border border-gray-300 rounded-md w-full md:w-1/3" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded whitespace-nowrap">Sign Up</button>
          </form>
        </section>
      </main>

      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Dabble</p>
          <div className="flex gap-4">
            <Link href="/about">About</Link>
            <a href="#" onClick={(e)=>{e.preventDefault(); openSignup();}}>Get updates</a>
            <Link href="/about#join-studio">Join as a studio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
