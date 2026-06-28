import { NextResponse } from "next/server";
import { getCurrencyFromCountry, getPricing } from "@/lib/pricing";

/**
 * Detect user's country from request headers and return localized pricing.
 * Uses Vercel/Cloudflare geo headers, or falls back to free IP geolocation.
 */
export async function GET(request) {
  try {
    // Method 1: Vercel geo headers (automatic on Vercel deployment)
    let country = request.headers.get("x-vercel-ip-country");

    // Method 2: Cloudflare geo header
    if (!country) {
      country = request.headers.get("cf-ipcountry");
    }

    // Method 3: Check custom header (for testing)
    if (!country) {
      country = request.headers.get("x-country-code");
    }

    // Default to US if geo detection fails
    if (!country || country === "XX") {
      country = "US";
    }

    const pricing = getPricing(country);

    return NextResponse.json({
      country,
      ...pricing,
    }, {
      headers: {
        // Cache for 1 hour - geo doesn't change often
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Geo detection error:", error);
    // Fallback to USD
    return NextResponse.json({
      country: "US",
      ...getPricing("US"),
    });
  }
}
