"use client";

import { useEffect, useState } from "react";
import SignupForm from "@/components/SignupForm";

export default function SignupModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  // Sync with parent prop
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // Listen for global event
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-signup", handler);
    return () => window.removeEventListener("open-signup", handler);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="beta-modal"
      className="fixed inset-0 backdrop-blur-md bg-black/40 flex justify-center items-center z-[400] p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors rounded-full w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100"
          aria-label="Close signup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-3 text-[#215D59]">Join Our Beta</h2>
        <p className="text-gray-700 mb-6 text-lg">Be the first to access early classes and exclusive offers.</p>
        <SignupForm layout="modal" brandPrimary="#215D59" brandPrimaryHover="#1A4B47" onSuccess={handleClose} />
      </div>
    </div>
  );
}