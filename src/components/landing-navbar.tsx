"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Component from "@/components/ui/floating-glassmorphic-navbar-with-morphing-pill-indicator";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
];

export function LandingNavbar() {
  const router = useRouter();
  return <Component brandName="Grwolyx" brandIcon={<Image src="/logo.png" alt="" width={114} height={36} className="h-8 w-[100px] rounded-md object-contain" priority />} navItems={navItems} ctaLabel="Get started" brandHref="/" trackSections onCtaClick={() => router.push("/register")} />;
}
