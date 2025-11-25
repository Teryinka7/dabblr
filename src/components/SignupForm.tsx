"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzzgglav"; // change if you use a different form ID

export default function SignupForm({
  brandPrimary = "#2563eb", // Tailwind blue-600
  brandPrimaryHover = "#1d4ed8", // Tailwind blue-700
  onSuccess = () => {},
}: {
  layout?: "modal" | "inline";
  brandPrimary?: string;
  brandPrimaryHover?: string;
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
    return <p className="text-gray-800">Thanks! You’re on the list.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 w-full"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
      />

      {error && (
        <p className="text-sm text-red-600 w-full text-left">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-4 py-3 rounded-md text-white text-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          backgroundColor: brandPrimary,
        }}
        onMouseOver={(e) => {
          if (!submitting) e.currentTarget.style.backgroundColor = brandPrimaryHover;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = brandPrimary;
        }}
      >
        {submitting ? "Submitting..." : "Sign Me Up!"}
      </button>
    </form>
  );
}