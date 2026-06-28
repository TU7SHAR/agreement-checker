"use client";

import Link from "next/link";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="w-full border-b border-white/40 bg-white/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="group">
          <Logo size="small" />
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <Link
            href="/#features"
            className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            Pricing
          </Link>
          <Link
            href="/#faq"
            className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            FAQ
          </Link>
          <Link
            href="/upload"
            className="clay-button-primary px-5 py-2.5 text-sm"
          >
            Analyze Contract
          </Link>
        </nav>
        <Link
          href="/upload"
          className="sm:hidden clay-button-primary px-4 py-2 text-sm"
        >
          Start
        </Link>
      </div>
    </header>
  );
}
