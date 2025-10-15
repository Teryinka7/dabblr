"use client";

import { useState } from "react";

export default function SignupForm({
  brandPrimary = "#2563eb", // Default to Tailwind's blue-600
  brandPrimaryHover = "#1d4ed8", // Default to Tailwind's blue-700
  onSuccess = () => {},
}: {
  layout?: "modal" | "inline";
  brandPrimary?: string;
  brandPrimaryHover?: string;
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace this with real submission logic (e.g. API call)
    console.log("Submitted email:", email);
    setSubmitted(true);
    onSuccess();
  };

  return submitted ? (
    <p className="text-gray-800">Thanks! You’re on the list.</p>
  ) : (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
      />
      <button
        type="submit"
        className="w-full px-4 py-3 rounded-md text-white text-lg font-semibold transition-colors"
        style={{
          backgroundColor: brandPrimary,
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = brandPrimaryHover)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = brandPrimary)}
      >
        Sign Me Up!
      </button>
    </form>
  );
}