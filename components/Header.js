"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-100 bg-white/70 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="clay-logo">
            <Shield className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            SignSafe
          </span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <Link
            href="/#features"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/upload"
            className="clay-button-primary px-4 py-2 text-sm"
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
