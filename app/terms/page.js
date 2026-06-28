import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "SignSafe Terms & Conditions - Read our terms of service, refund policy, and usage guidelines.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="clay-card p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Terms & Conditions
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Last updated: June 2026
          </p>

          <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using SignSafe (&quot;the Service&quot;), you agree to be
                bound by these Terms & Conditions. If you do not agree to these
                terms, do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                2. Service Description
              </h2>
              <p>
                SignSafe is an AI-powered tool that helps users understand
                contracts by analyzing document text and providing plain-language
                explanations of clauses. The Service uses artificial intelligence
                and is designed to aid comprehension only.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                3. NOT Legal Advice
              </h2>
              <p className="font-medium text-gray-900">
                IMPORTANT: SignSafe does NOT provide legal advice. The analysis
                provided is for informational and educational purposes only.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  We do not replace the role of a licensed attorney or legal
                  professional.
                </li>
                <li>
                  Our AI analysis may contain errors or miss important nuances.
                </li>
                <li>
                  You should always consult a qualified legal professional for
                  important contract decisions.
                </li>
                <li>
                  We make no guarantees about the accuracy, completeness, or
                  reliability of any analysis.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                4. Payment & Pricing
              </h2>
              <p>
                SignSafe offers both free and paid tiers. Paid reports are
                available as one-time purchases at $19.90 USD (Pro) and $49.90
                USD (Premium). Prices are displayed in your local currency based
                on your geographic location at approximate exchange rates. Final
                charges are in USD and are subject to change without notice.
                Payment is processed through secure third-party payment
                processors.
              </p>
            </section>

            <section id="refund-policy">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                5. NO REFUND POLICY
              </h2>
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <p className="font-semibold text-red-800">
                  All sales are final. No refunds will be issued under any
                  circumstances.
                </p>
                <p className="mt-2 text-red-700">
                  Due to the instant digital nature of our service, once an AI
                  analysis report is generated, the service has been fully
                  delivered. We encourage users to review the free summary before
                  making a purchase to ensure the service meets their
                  expectations.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-red-700">
                  <li>No refunds for generated reports.</li>
                  <li>No refunds for dissatisfaction with AI analysis quality.</li>
                  <li>No refunds for duplicate purchases.</li>
                  <li>No partial refunds.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                6. User Responsibilities
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  You are responsible for ensuring you have the right to upload
                  any document to our Service.
                </li>
                <li>
                  You must not upload documents containing malware or harmful
                  content.
                </li>
                <li>
                  You must not attempt to reverse-engineer, abuse, or exploit
                  the Service.
                </li>
                <li>
                  You agree not to use automated tools to excessively access the
                  Service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                7. Data & Privacy
              </h2>
              <p>
                Uploaded documents are processed for analysis purposes only. We
                do not permanently store the full text of your contracts. Please
                refer to our{" "}
                <Link href="/privacy" className="text-indigo-600 underline">
                  Privacy Policy
                </Link>{" "}
                for detailed information about how we handle your data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                8. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, SignSafe and
                its operators shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, including but not
                limited to loss of profits, data, or other intangible losses,
                resulting from:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your use of or inability to use the Service.</li>
                <li>
                  Any errors, inaccuracies, or omissions in the AI-generated
                  analysis.
                </li>
                <li>
                  Any decisions made based on the Service&apos;s output.
                </li>
                <li>Unauthorized access to your data.</li>
              </ul>
              <p className="mt-2">
                Our total liability for any claims shall not exceed the amount
                paid by you for the specific report in question.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                9. Intellectual Property
              </h2>
              <p>
                The Service, its design, features, and underlying technology are
                owned by SignSafe. You retain ownership of any documents you
                upload. By uploading, you grant us a temporary, limited license
                to process your document solely for the purpose of generating
                your analysis report.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                10. Service Availability
              </h2>
              <p>
                We strive to maintain continuous availability but do not
                guarantee uninterrupted access. The Service may be temporarily
                unavailable due to maintenance, updates, or technical issues. We
                are not liable for any downtime.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                11. Modifications to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time.
                Continued use of the Service after changes constitutes acceptance
                of the modified terms. Material changes will be communicated
                through the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                12. Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance
                with the laws of India. Any disputes arising from these terms
                shall be subject to the exclusive jurisdiction of the courts in
                India.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                13. Contact
              </h2>
              <p>
                For questions about these Terms & Conditions, please contact us
                at support@signsafe.app.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
