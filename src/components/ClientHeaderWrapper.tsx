"use client";
import { usePathname } from "next/navigation";
import SiteHeader from "./SiteHeader";

export default function ClientHeaderWrapper() {
  const pathname = usePathname();
  return pathname !== "/" ? <SiteHeader /> : null;
}