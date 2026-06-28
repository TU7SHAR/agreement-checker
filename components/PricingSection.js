"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Sparkles, Zap } from "lucide-react";

export default function PricingSection() {
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch("/api/geo");
        if (res.ok) {
          const data = await res.json();
          setPricing(data);
        }
      } catch {
        // Fallback handled by default state
      } finally {
        setLoading(false);
      }
    }
    fetchPricing();
  }, []);

  const proPrice = pricing?.pro?.formatted || "$19.90";
  const premiumPrice = pricing?.premium?.formatted || "$49.90";
  const currencyNote = pricing?.currency && pricing.currency !== "USD"
    ? `≈ $${19.9} USD`
    : null;

  return (
    <section className="section-padding bg-white/30" id="pricing">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 clay-card-flat px-4 py-2 text-sm text-gray-600 mb-4">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>One-time payment. No subscriptions.</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Simple, Fair Pricing
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Pay once. Understand your contract forever.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Free */}
          <div className="clay-card p-8 h-full flex flex-col">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">Free</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">$0</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">No card required</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Contract summary</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>1 clause explained in detail</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Risk overview dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Key terms extraction</span>
                </li>
              </ul>
            </div>
            <Link
              href="/upload"
              className="clay-button-secondary w-full mt-8 py-3"
            >
              Try Free
            </Link>
          </div>

          {/* Pro - Featured */}
          <div className="clay-card p-8 relative ring-2 ring-indigo-300 shadow-lg shadow-indigo-100 h-full flex flex-col scale-[1.02]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
              MOST POPULAR
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">Pro</h3>
              <div className="mt-4">
                <span className={`text-4xl font-bold text-gray-900 ${loading ? "animate-pulse" : ""}`}>
                  {loading ? "..." : proPrice}
                </span>
                <span className="text-sm text-gray-500 ml-2">one-time</span>
              </div>
              {currencyNote && (
                <p className="text-xs text-gray-400 mt-1">{currencyNote}</p>
              )}
              <ul className="mt-6 space-y-3 text-sm text-gray-600 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span><strong>All clauses</strong> explained in detail</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Full risk assessment dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Download PDF report</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Questions to consider per clause</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Confidence ratings</span>
                </li>
              </ul>
            </div>
            <Link
              href="/upload"
              className="clay-button-primary w-full mt-8 py-3 gap-2"
            >
              <Zap className="w-4 h-4" />
              Get Pro Report
            </Link>
          </div>

          {/* Premium */}
          <div className="clay-card p-8 h-full flex flex-col">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">Premium</h3>
              <div className="mt-4">
                <span className={`text-4xl font-bold text-gray-900 ${loading ? "animate-pulse" : ""}`}>
                  {loading ? "..." : premiumPrice}
                </span>
                <span className="text-sm text-gray-500 ml-2">one-time</span>
              </div>
              {pricing?.currency && pricing.currency !== "USD" && (
                <p className="text-xs text-gray-400 mt-1">≈ $49.90 USD</p>
              )}
              <ul className="mt-6 space-y-3 text-sm text-gray-600 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span><strong>Negotiation suggestions</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Questions to ask employer/landlord</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Priority processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Compare contract versions</span>
                </li>
              </ul>
            </div>
            <Link
              href="/upload"
              className="clay-button-secondary w-full mt-8 py-3"
            >
              Get Premium
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs text-gray-400 max-w-lg mx-auto">
          All payments are one-time. No refunds — reports are delivered instantly.
          Prices shown in your local currency.{" "}
          <Link href="/terms" className="underline hover:text-indigo-500">
            Terms & Conditions
          </Link>
        </p>
      </div>
    </section>
  );
}
