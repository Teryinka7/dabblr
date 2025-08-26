import { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`px-3 py-2 border border-gray-300 rounded-md w-full ${className}`}
      {...props}
    />
  );
}