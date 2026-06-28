import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100/50 bg-white/30 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Logo size="small" />
            <p className="text-sm text-gray-500 max-w-xs mt-4">
              Understand your contracts before you sign. AI-powered clause
              analysis in plain English.
            </p>
            <p className="text-xs text-gray-400 mt-4">
              SignSafe does not provide legal advice. For important decisions,
              consult a qualified professional.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>
                <Link
                  href="/upload"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Analyze Contract
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="hover:text-indigo-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Legal</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SignSafe. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Prices shown in your local currency. Base price USD.
          </p>
        </div>
      </div>
    </footer>
  );
}
