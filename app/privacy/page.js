import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "SignSafe Privacy Policy - Learn how we handle your data, documents, and personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="clay-card p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Last updated: June 2026
          </p>

          <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                1. Overview
              </h2>
              <p>
                At SignSafe, we take your privacy seriously. This policy
                describes what data we collect, how we use it, and your rights
                regarding your information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                2. Data We Collect
              </h2>
              <h3 className="font-medium text-gray-800 mt-3 mb-1">
                Documents You Upload
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Contract files (PDF/DOCX) are processed in memory for analysis.
                </li>
                <li>
                  We do NOT permanently store the full text of your uploaded
                  contracts.
                </li>
                <li>
                  Document text is sent to our AI provider (Google Gemini) for
                  analysis and is subject to their data processing policies.
                </li>
              </ul>

              <h3 className="font-medium text-gray-800 mt-3 mb-1">
                Metadata We Store
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>File name, type, and size</li>
                <li>Contract type (auto-detected)</li>
                <li>AI analysis results (the report)</li>
                <li>Anonymized usage analytics</li>
              </ul>

              <h3 className="font-medium text-gray-800 mt-3 mb-1">
                Technical Data
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>IP address (for rate limiting and abuse prevention)</li>
                <li>Browser user agent</li>
                <li>Timestamps</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                3. How We Use Your Data
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>To process and analyze your uploaded contracts.</li>
                <li>To generate and deliver your analysis reports.</li>
                <li>To prevent abuse and enforce rate limits.</li>
                <li>To improve our service quality and accuracy.</li>
                <li>To comply with applicable legal requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                4. Third-Party Services
              </h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>
                  <strong>Google Gemini AI</strong> - For contract text analysis.
                  Document text is sent to Google&apos;s API for processing.
                </li>
                <li>
                  <strong>Supabase</strong> - For database storage and
                  authentication infrastructure.
                </li>
                <li>
                  <strong>Vercel</strong> - For hosting and content delivery.
                </li>
              </ul>
              <p className="mt-2">
                Each of these services has their own privacy policies that
                govern their handling of data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                5. Data Retention
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Uploaded document text: Not permanently stored. Processed in
                  memory only.
                </li>
                <li>
                  Analysis reports: Retained for 90 days to allow you to access
                  your report.
                </li>
                <li>
                  Analytics data: Retained for 12 months in anonymized form.
                </li>
                <li>
                  Rate limiting data: Automatically cleared after the rate limit
                  window expires.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                6. Data Security
              </h2>
              <p>We implement reasonable security measures including:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>HTTPS encryption for all data in transit.</li>
                <li>
                  Encrypted database storage via Supabase&apos;s security
                  infrastructure.
                </li>
                <li>Rate limiting to prevent abuse.</li>
                <li>No permanent storage of sensitive contract text.</li>
              </ul>
              <p className="mt-2">
                However, no method of electronic transmission or storage is 100%
                secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                7. Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Know what data we hold about you.</li>
                <li>Request deletion of your data.</li>
                <li>Opt out of non-essential data collection.</li>
                <li>Not use the service if you disagree with this policy.</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, contact us at
                privacy@signsafe.app.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                8. Cookies
              </h2>
              <p>
                We use minimal cookies solely for functionality (session
                management). We do not use advertising cookies or third-party
                tracking cookies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                9. Children&apos;s Privacy
              </h2>
              <p>
                The Service is not intended for users under the age of 18. We do
                not knowingly collect data from minors.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically. Changes will be
                posted on this page with an updated date. Continued use of the
                Service constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                11. Contact
              </h2>
              <p>
                For privacy-related inquiries, contact us at
                privacy@signsafe.app.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/terms"
              className="text-sm text-indigo-600 hover:underline"
            >
              &larr; View Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
