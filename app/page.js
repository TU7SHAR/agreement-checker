import Link from "next/link";
import {
  FileText,
  Zap,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Upload,
  Star,
  Shield,
  Sparkles,
} from "lucide-react";
import PricingSection from "@/components/PricingSection";
import Logo from "@/components/Logo";

export const metadata = {
  title: "SignSafe - Understand Your Contracts Before You Sign",
  description:
    "Upload any contract and get instant, plain-English explanations of every clause. Identify hidden obligations, non-compete clauses, penalties, and more.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 clay-card-flat px-4 py-2 text-sm text-gray-600 mb-8">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Trusted by 1,000+ professionals worldwide</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] max-w-4xl mx-auto tracking-tight">
            Before You Sign,{" "}
            <span className="gradient-text">Understand What You&apos;re Agreeing To</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload your contract and get plain-English explanations of every
            important clause in under a minute. No legal jargon. No confusion.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload" className="clay-button-primary px-8 py-4 text-lg gap-2">
              <Upload className="w-5 h-5" />
              Upload Contract
            </Link>
            <a href="#how-it-works" className="clay-button-secondary px-8 py-4 text-lg">
              See How It Works
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Free analysis included · No sign-up required
          </p>
        </div>
      </section>


      {/* Social Proof */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="clay-card p-6 flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-gray-600">4.8/5 rating</span>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">2,500+</span> contracts analyzed
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">&lt; 60s</span> average time
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section-padding bg-white/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Most People Sign Without Reading
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Contracts are long, complex, and full of legal language. Hidden clauses
            can cost you money, freedom, or opportunity.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: AlertTriangle, text: "Hidden Non-Compete Clauses", sub: "Limits your next career move", color: "text-red-500" },
              { icon: Clock, text: "Long Notice Periods", sub: "Locks you in for months", color: "text-orange-500" },
              { icon: Lock, text: "Automatic Renewals", sub: "Charges you without asking", color: "text-purple-500" },
            ].map(({ icon: Icon, text, sub, color }) => (
              <div key={text} className="clay-card p-6 text-center">
                <Icon className={`w-8 h-8 ${color} mx-auto mb-3`} />
                <p className="font-semibold text-gray-800">{text}</p>
                <p className="text-sm text-gray-500 mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="section-padding" id="how-it-works">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-gray-600 text-lg">Three steps. Under a minute.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", icon: Upload, title: "Upload", desc: "Drop your PDF or DOCX contract. Offer letters, rental agreements, NDAs, and more." },
              { step: "2", icon: Zap, title: "AI Analyzes", desc: "Our AI reads every clause and translates legal language into plain English instantly." },
              { step: "3", icon: Eye, title: "Understand", desc: "Get a clear report with risk levels, explanations, and questions to consider." },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="clay-card p-8 text-center relative">
                <div className="absolute -top-3 -left-3 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                  {step}
                </div>
                <div className="clay-icon-container mx-auto mb-5">
                  <Icon className="w-7 h-7 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white/30" id="features">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What You Get</h2>
          <p className="mt-4 text-gray-600 text-lg">Everything you need to understand your contract</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: FileText, title: "Plain English Explanations", desc: "Every clause explained without legal jargon" },
              { icon: AlertTriangle, title: "Risk Assessment", desc: "Visual risk dashboard for each section" },
              { icon: CheckCircle, title: "Clause Detection", desc: "Identifies non-compete, NDAs, penalties, and more" },
              { icon: Shield, title: "Questions to Consider", desc: "Smart prompts to help informed decisions" },
              { icon: Clock, title: "Under 60 Seconds", desc: "Full analysis in less than a minute" },
              { icon: Lock, title: "Private & Secure", desc: "Documents encrypted and never shared" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="clay-card p-6 text-left flex items-start gap-4">
                <div className="clay-icon-container flex-shrink-0" style={{ width: 52, height: 52, borderRadius: 16 }}>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Works With Any Contract</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Offer Letters", "Employment Contracts", "Rental Agreements", "Freelance Contracts", "NDAs", "Service Agreements", "Vendor Contracts", "Partnership Agreements"].map((type) => (
              <span key={type} className="clay-card-flat px-4 py-2.5 text-sm text-gray-700 font-medium">{type}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Dynamic with Geo */}
      <PricingSection />

      {/* Final CTA */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <div className="clay-card p-12 bg-gradient-to-br from-indigo-50/50 to-violet-50/50">
            <h2 className="text-3xl font-bold text-gray-900">Don&apos;t Sign Blind</h2>
            <p className="mt-4 text-gray-600 text-lg max-w-lg mx-auto">
              Understand your next contract in under a minute. It could save you from
              hidden obligations worth months of your time.
            </p>
            <Link href="/upload" className="clay-button-primary px-10 py-4 text-lg mt-8 gap-2">
              <Upload className="w-5 h-5" />
              Analyze Your Contract Now
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white/30" id="faq">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is SignSafe legal advice?", a: "No. SignSafe helps you understand contracts by explaining clauses in plain English. It is not a substitute for professional legal counsel. For important decisions, we recommend consulting a qualified lawyer." },
              { q: "What types of contracts can I upload?", a: "SignSafe works with offer letters, employment contracts, rental agreements, freelance contracts, NDAs, service agreements, vendor contracts, and more. We support PDF and DOCX formats." },
              { q: "Is my contract data secure?", a: "Yes. Your documents are encrypted during transfer and processing. We do not store your contract text permanently and never share it with third parties." },
              { q: "How accurate is the AI analysis?", a: "Our AI uses advanced language models to analyze contracts. Each clause includes a confidence level. For critical decisions, we always recommend professional review." },
              { q: "Can I get a refund?", a: "Due to the instant digital nature of our service, all sales are final. No refunds are provided once a report is generated. Please review the free summary before purchasing." },
              { q: "How long does analysis take?", a: "Most contracts are analyzed in under 60 seconds. Longer documents may take up to 2 minutes." },
              { q: "What currency will I be charged in?", a: "Prices are displayed in your local currency based on your location. The base price is in USD and converted at current approximate rates." },
            ].map(({ q, a }) => (
              <div key={q} className="clay-card p-6">
                <h3 className="font-semibold text-gray-900">{q}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
