// src/app/join-studio/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Join as a studio — Dabble",
  description: "Partner with Dabble — free pilot to help fill classes and build community in London.",
};

export default function JoinStudioPage() {
  const faqs = [
    {
      q: "What is Dabble and why partner?",
      a:
        "Dabble is a small London pilot (MVP) that helps curious locals discover in-person hobby classes — pottery, cooking, dance, improv and more. For the pilot we’re offering partner studios free marketing and no commission so you can test whether Dabble drives bookings for you.",
    },
    {
      q: "Is there any cost or commission?",
      a:
        "No — during the MVP/pilot period there are no fees and no commission. You keep your full class income. We’ll be transparent about future pricing if/when we launch a paid model, but for the pilot it’s free for partners.",
    },
    {
      q: "How do bookings arrive at my studio?",
      a:
        "We’ll list your class with your contact/booking link or enable direct bookings. Initially we can forward bookings to your email or phone, or integrate with a simple calendar/CSV flow depending on what works for you. We’ll discuss operational preferences on the onboarding call.",
    },
    {
      q: "Who owns customer data?",
      a:
        "During the pilot we will share booking details you need to run the class (name, email, booking time). We do not keep this data private from you — we aim for a collaborative pilot. Longer-term policies (data ownership,export, GDPR) will be documented and agreed before any paid model.",
    },
    {
      q: "What about cancellations / no-shows?",
      a:
        "Your studio can keep your usual cancellation and no-show policies. We will display the studio’s policy on the listing. If you'd like, we can also include automated reminders to reduce no-shows.",
    },
    {
      q: "What do you need from us to get listed?",
      a:
        "A contact email, short class description, price, dates/times or recurring schedule, a photo or logo, and your cancellation policy. That’s it — we’ll create the listing for you and send a preview before it goes live.",
    },
    {
      q: "How long is the pilot and what happens after?",
      a:
        "The pilot will run until we have enough data and partner feedback (we’ll confirm timelines with partners). After the pilot we may introduce a commercial model; we’ll discuss and agree terms with partner studios before rolling out any paid features.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-pink-50 text-gray-900 font-sans">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Join Dabble as a studio</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Partner with us for a no-fee pilot to reach curious Londoners who want to try real, in-person classes and meet new people.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Quick benefits</h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="p-4 bg-white rounded-lg shadow-sm border">
              <strong>Free promotion</strong>
              <div className="text-sm">We’ll feature your classes to local users during the pilot — no fees.</div>
            </li>
            <li className="p-4 bg-white rounded-lg shadow-sm border">
              <strong>Fill spare spots</strong>
              <div className="text-sm">Reach new students and reduce empty seats without extra ad spend.</div>
            </li>
            <li className="p-4 bg-white rounded-lg shadow-sm border">
              <strong>Simple onboarding</strong>
              <div className="text-sm">Send your details and we’ll create the listing — quick and hands-off.</div>
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

        <section className="text-center">
          <h3 className="text-xl font-semibold mb-3">Ready to join the pilot?</h3>
          <p className="text-gray-600 mb-6">Click below to fill our short studio onboarding form — it only takes a minute.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/about#join-studio" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow">
              Fill onboarding form
            </Link>

            <a
              href="mailto:hello@dabblr.co.uk?subject=Join%20Dabble%20-%20Studio%20Signup"
              className="inline-block bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded shadow hover:bg-gray-50"
            >
              Email us directly
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-4">If you prefer, reply with a preferred time and we’ll book a 10–15 minute call.</p>
        </section>
      </main>
    </div>
  );
}
