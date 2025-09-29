// src/app/join-studio/page.tsx
import Link from "next/link";
import Script from "next/script";

export const metadata = {
title: "Join as a studio — Dabble",
description: "Partner with Dabble — free pilot to help fill classes and build community in London.",
};

export default function JoinStudioPage() {
const faqs = [
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
<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
<main className="max-w-4xl mx-auto px-6 py-16">
<header className="text-center mb-8">
<h1 className="text-4xl font-bold text-blue-700 mb-4">Join Dabble as a studio for free</h1>
<p className="text-gray-600 max-w-2xl mx-auto">
Partner with us for a no-fee pilot to reach curious. Londoners who want to try real, in-person classes and meet new people.
</p>
</header>
<section className="text-center mb-10">
<div className="flex flex-col sm:flex-row gap-3 justify-center">
{/* anchor link to the form at the bottom */}
<a href="#studio-form" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow">
Fill onboarding form
</a>

<a
href="mailto:hello@dabblr.co.uk?subject=Join%20Dabble%20-%20Studio%20Signup"
className="inline-block bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded shadow hover:bg-gray-50"
>
Email us directly
</a>
</div>

<p className="text-sm text-gray-500 mt-4">If you prefer, reply with a preferred time and we will book a 10–15 minute call.</p>
</section>

<section className="mb-10">
<h2 className="text-2xl font-semibold text-pink-600 mb-4">Benefits</h2>
<ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
<li className="p-4 bg-white rounded-lg shadow-sm border">
<strong>Free promotion</strong>
<div className="text-sm">We will feature your classes to local users during the pilot — no fees.</div>
</li>
<li className="p-4 bg-white rounded-lg shadow-sm border">
<strong>Fill spare spots</strong>
<div className="text-sm">Reach new students and reduce empty seats without extra ad spend.</div>
</li>
<li className="p-4 bg-white rounded-lg shadow-sm border">
<strong>Simple onboarding</strong>
<div className="text-sm">Send your details and we will create the listing — quick and hands-off.</div>
</li>
<li className="p-4 bg-white rounded-lg shadow-sm border">
<strong>Community focus</strong>
<div className="text-sm">We prioritise real-life connection and long-term community building.</div>
</li>
</ul>
</section>

<section className="mb-12">
<h2 className="text-2xl font-semibold text-blue-700 mb-6">Studio FAQ</h2>
<div className="space-y-4">
{faqs.map((f) => (
<details key={f.q} className="bg-white p-4 rounded-lg shadow-sm border">
<summary className="font-semibold text-gray-900 cursor-pointer">{f.q}</summary>
<div className="mt-2 text-gray-700">{f.a}</div>
</details>
))}
</div>
</section>

{/* =========================
FORM (unchanged content) - add id for anchor
========================= */}
<section id="studio-form" className="mt-12 bg-white shadow rounded p-6">
<h2 className="text-2xl font-semibold mb-4">Studio onboarding form</h2>
<p className="text-gray-700 mb-4">
Complete this short form and we will contact you to help get your first listings live.
</p>

<form action="/api/subscribe" method="POST" className="space-y-4">
<input type="hidden" name="source" value="join-studio" />
<div>
<label className="block text-sm font-medium text-gray-700">Business name</label>
<input
name="business-name"
required
className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
placeholder="Studio or business name"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700">Contact name</label>
<input
name="contact-name"
required
className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
placeholder="Your full name"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700">Contact email</label>
<input
type="email"
name="email"
required
className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
placeholder="studio@example.com"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700">Contact number (optional)</label>
<input
type="tel"
name="phone"
className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
placeholder="+44 7123 456789 (optional)"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700">Location</label>
<input
name="location"
required
className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
placeholder="London area (e.g., Peckham)"
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700">Booking software (if any)</label>
<input
name="booking-software"
className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
placeholder="Mindbody, WellnessLiving, None, etc."
/>
</div>

<div>
<label className="block text-sm font-medium text-gray-700">Tell us about your classes</label>
<textarea
name="message"
rows={4}
required
className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
placeholder="Example classes, days and times, typical capacity"
/>
</div>
<div className="pt-2">
<div
className="cf-turnstile"
data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
data-theme="light"
data-size="flexible"
/>
</div>

<div className="flex items-center gap-3">
<button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
Submit
</button>

<Link href="/about" className="text-gray-600 underline">
</Link>
</div>

<p className="text-sm text-gray-500 mt-2">
After you submit we will contact you to help set up listings and promotion. Thank you for supporting local creative businesses.
</p>
</form>
</section>
</main>
</div>
);
}