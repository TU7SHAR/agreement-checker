import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://signsafe.app"),
  title: {
    default: "SignSafe - Understand Your Contracts Before You Sign",
    template: "%s | SignSafe",
  },
  description:
    "Upload any contract and get instant, plain-English explanations of every clause. Identify hidden obligations, non-compete clauses, penalties, and more before you sign.",
  keywords: [
    "contract analyzer",
    "contract review",
    "agreement checker",
    "clause analysis",
    "employment contract",
    "rental agreement",
    "NDA review",
    "freelance contract",
    "offer letter review",
    "non-compete clause",
    "plain English contract",
    "understand contracts",
    "before you sign",
    "SignSafe",
  ],
  authors: [{ name: "SignSafe" }],
  creator: "SignSafe",
  publisher: "SignSafe",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SignSafe",
    title: "SignSafe - Understand Your Contracts Before You Sign",
    description:
      "Upload any contract and get instant, plain-English explanations of every clause. Find hidden obligations before signing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SignSafe - Contract Analysis Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SignSafe - Understand Your Contracts Before You Sign",
    description:
      "Upload any contract and get instant, plain-English explanations of every clause.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SignSafe",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI-powered contract analysis tool that explains contract clauses in plain English.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://signsafe.app",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "INR",
        description: "Basic summary and one free clause explanation",
      },
      {
        "@type": "Offer",
        name: "Pro Report",
        price: "199",
        priceCurrency: "INR",
        description: "Full report with all clause explanations",
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "499",
        priceCurrency: "INR",
        description: "Full report plus negotiation suggestions and priority processing",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
