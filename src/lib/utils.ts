import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Safer than importing a `type` in environments that mis-parse TS:
type ClassValue = Parameters<typeof clsx>[number];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}