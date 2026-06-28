import Link from "next/link";
import {
  Shield,
  FileText,
  Zap,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Upload,
  Star,
} from "lucide-react";

export const metadata = {
  title: "SignSafe - Understand Your Contracts Before You Sign",
  description:
    "Upload any contract and get instant, plain-English explanations of every clause. Identify hidden obligations, non-compete clauses, penalties, and more before you sign.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 clay-card-flat px-4 py-2 text-sm text-gray-600 mb-6">
            <Shield className="w-4 h-4 text-indigo-500" />
            <span>Trusted by 1,000+ professionals</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
            Before You Sign,{" "}
            <span className="gradient-text">Understand What You&apos;re Agreeing To</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload your contract and get plain-English explanations of every
            important clause in under a minute. No legal jargon. No confusion.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="clay-button-primary px-8 py-4 text-lg gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Contract
            </Link>
            <a
              href="#how-it-works"
              className="clay-button-secondary px-8 py-4 text-lg"
            >
              See How It Works
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Free analysis included. No sign-up required.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="clay-card p-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">4.8/5 rating</span>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">2,500+</span>{" "}
              contracts analyzed
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">Under 60s</span>{" "}
              average analysis time
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-white/40" id="problem">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Most People Sign Without Reading
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Contracts are long, complex, and full of legal language. Hidden
            clauses can cost you money, freedom, or opportunity.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: AlertTriangle, text: "Hidden Non-Compete Clauses", color: "text-red-500" },
              { icon: Clock, text: "90-Day Notice Periods", color: "text-orange-500" },
              { icon: Lock, text: "Automatic Renewals", color: "text-purple-500" },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="clay-card p-6 text-center">
                <Icon className={`w-8 h-8 ${color} mx-auto mb-3`} />
                <p className="font-medium text-gray-800">{text}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Often buried in page 12
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding" id="how-it-works">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            How SignSafe Works
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Three simple steps to understanding your contract
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Upload,
                title: "Upload",
                description: "Drop your PDF or DOCX contract. We accept offer letters, rental agreements, NDAs, and more.",
              },
              {
                step: "2",
                icon: Zap,
                title: "AI Analyzes",
                description: "Our AI reads every clause, identifies important sections, and translates legal language to plain English.",
              },
              {
                step: "3",
                icon: Eye,
                title: "Understand",
                description: "Get a clear report with risk levels, explanations, and questions to consider before signing.",
              },
            ].map(({ step, icon: Icon, title, description }) => (
              <div key={step} className="clay-card p-8 text-center relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-indigo-500 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  {step}
                </div>
                <div className="clay-icon-container mx-auto mb-4">
                  <Icon className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 mt-2">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white/40" id="features">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What You Get
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Everything you need to understand your contract
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: FileText,
                title: "Plain English Explanations",
                desc: "Every clause explained without legal jargon",
              },
              {
                icon: AlertTriangle,
                title: "Risk Assessment",
                desc: "Visual risk dashboard for each section",
              },
              {
                icon: CheckCircle,
                title: "Clause Detection",
                desc: "Automatically identifies non-compete, NDAs, penalties, and more",
              },
              {
                icon: Shield,
                title: "Questions to Consider",
                desc: "Smart prompts to help you make informed decisions",
              },
              {
                icon: Clock,
                title: "Under 60 Seconds",
                desc: "Full analysis in less than a minute",
              },
              {
                icon: Lock,
                title: "Private & Secure",
                desc: "Your documents are encrypted and never shared",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="clay-card p-6 text-left flex items-start gap-4"
              >
                <div className="clay-icon-container flex-shrink-0" style={{ width: 48, height: 48 }}>
                  <Icon className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract Types */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Works With Any Contract
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Offer Letters",
              "Employment Contracts",
              "Rental Agreements",
              "Freelance Contracts",
              "NDAs",
              "Service Agreements",
              "Vendor Contracts",
              "Partnership Agreements",
            ].map((type) => (
              <span
                key={type}
                className="clay-card-flat px-4 py-2 text-sm text-gray-700 font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-white/40" id="pricing">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Simple, Fair Pricing
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            One-time payment. No subscriptions. No hidden fees.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="clay-card p-8">
              <h3 className="text-lg font-bold text-gray-900">Free</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">&#8377;0</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-600 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Contract summary
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> 1 clause explained
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Risk overview
                </li>
              </ul>
              <Link
                href="/upload"
                className="clay-button-secondary w-full mt-6 py-3"
              >
                Try Free
              </Link>
            </div>

            {/* Pro */}
            <div className="clay-card p-8 relative ring-2 ring-indigo-200">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <h3 className="text-lg font-bold text-gray-900">Pro</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">&#8377;199</span>
                <span className="text-sm text-gray-500 ml-1">one-time</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-600 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Full clause analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> All explanations unlocked
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Download PDF report
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Risk dashboard
                </li>
              </ul>
              <Link
                href="/upload"
                className="clay-button-primary w-full mt-6 py-3"
              >
                Get Pro Report
              </Link>
            </div>

            {/* Premium */}
            <div className="clay-card p-8">
              <h3 className="text-lg font-bold text-gray-900">Premium</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">&#8377;499</span>
                <span className="text-sm text-gray-500 ml-1">one-time</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-600 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Everything in Pro
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Negotiation suggestions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Questions for employer/landlord
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Priority processing
                </li>
              </ul>
              <Link
                href="/upload"
                className="clay-button-secondary w-full mt-6 py-3"
              >
                Get Premium
              </Link>
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            All payments are one-time. No refunds. See our{" "}
            <Link href="/terms" className="underline hover:text-indigo-500">
              Terms & Conditions
            </Link>{" "}
            for details.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <div className="clay-card p-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Don&apos;t Sign Blind
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Understand your next contract in under a minute. It could save you
              from hidden obligations worth months of your time.
            </p>
            <Link
              href="/upload"
              className="clay-button-primary px-10 py-4 text-lg mt-8 gap-2"
            >
              <Upload className="w-5 h-5" />
              Analyze Your Contract Now
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ for SEO/AEO */}
      <section className="section-padding bg-white/40" id="faq">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is SignSafe legal advice?",
                a: "No. SignSafe helps you understand contracts by explaining clauses in plain English. It is not a substitute for professional legal counsel. For important decisions, we recommend consulting a qualified lawyer.",
              },
              {
                q: "What types of contracts can I upload?",
                a: "SignSafe works with offer letters, employment contracts, rental agreements, freelance contracts, NDAs, service agreements, vendor contracts, and more. We support PDF and DOCX formats.",
              },
              {
                q: "Is my contract data secure?",
                a: "Yes. Your documents are encrypted during transfer and processing. We do not store your contract text permanently and never share it with third parties.",
              },
              {
                q: "How accurate is the AI analysis?",
                a: "Our AI uses advanced language models to analyze contracts. Each clause includes a confidence level. For critical decisions, we always recommend professional review.",
              },
              {
                q: "Can I get a refund?",
                a: "Due to the instant digital nature of our service, all sales are final. No refunds are provided once a report is generated. Please review the free summary before purchasing.",
              },
              {
                q: "How long does analysis take?",
                a: "Most contracts are analyzed in under 60 seconds. Longer documents may take up to 2 minutes.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="clay-card p-5">
                <h3 className="font-semibold text-gray-900">{q}</h3>
                <p className="mt-2 text-sm text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
