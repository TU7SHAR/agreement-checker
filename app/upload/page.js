"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";
import { Shield, Lock, Zap } from "lucide-react";

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleUpload(file) {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Analysis failed. Please try again.");
      }

      const data = await response.json();

      if (data.reportId) {
        router.push(`/report/${data.reportId}`);
      } else {
        // Fallback: store in sessionStorage for demo mode
        sessionStorage.setItem("signsafe_report", JSON.stringify(data.report));
        router.push("/report/demo");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Upload Your Contract
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-lg mx-auto">
          Drop your contract below and we&apos;ll analyze it in under a minute.
          Supports PDF and DOCX files.
        </p>

        <div className="mt-10">
          <FileUpload onUpload={handleUpload} isLoading={isLoading} />
        </div>

        {error && (
          <div className="mt-6 clay-card p-4 text-red-600 text-sm bg-red-50/50 max-w-xl mx-auto">
            {error}
          </div>
        )}

        {/* Trust Signals */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>Encrypted & Secure</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Results in 60 seconds</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>No sign-up required</span>
          </div>
        </div>

        {/* Supported Types */}
        <div className="mt-8">
          <p className="text-xs text-gray-400 mb-2">Supported contract types:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Offer Letter",
              "Employment Contract",
              "Rental Agreement",
              "Freelance Contract",
              "NDA",
              "Service Agreement",
            ].map((type) => (
              <span
                key={type}
                className="text-xs px-3 py-1 bg-white/60 rounded-full text-gray-500 border border-gray-100"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
