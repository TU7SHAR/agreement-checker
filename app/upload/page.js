"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";
import AnalysisOptions from "@/components/AnalysisOptions";
import { Shield, Lock, Zap, Loader2 } from "lucide-react";

export default function UploadPage() {
  const [step, setStep] = useState(1); // 1=upload, 2=options, 3=analyzing
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Step 1: File selected
  function handleFileSelected(uploadedFile) {
    setFile(uploadedFile);
    setError(null);
    setStep(2);
  }

  // Step 2: Options submitted → start analysis
  async function handleOptionsSubmit({ country, feedback }) {
    setStep(3);
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("country", country);
      if (feedback) {
        formData.append("feedback", feedback);
      }

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
      setStep(2); // Go back to options so they can retry
    } finally {
      setIsLoading(false);
    }
  }

  // Go back to step 1
  function handleBack() {
    setFile(null);
    setStep(1);
    setError(null);
  }

  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto text-center">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step >= s
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-8 h-0.5 rounded ${
                    step > s ? "bg-indigo-400" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Upload */}
        {step === 1 && (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Upload Your Contract
            </h1>
            <p className="mt-4 text-gray-600 text-lg max-w-lg mx-auto">
              Drop your contract below. We support PDF and DOCX files up to 10MB.
            </p>

            <div className="mt-10">
              <FileUpload onUpload={handleFileSelected} isLoading={false} />
            </div>

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
          </>
        )}

        {/* Step 2: Country & Feedback */}
        {step === 2 && (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              A Few Quick Questions
            </h1>
            <p className="mt-4 text-gray-600 text-lg max-w-lg mx-auto">
              Help us tailor the analysis to your specific situation.
            </p>

            <div className="mt-10">
              <AnalysisOptions
                file={file}
                onSubmit={handleOptionsSubmit}
                onBack={handleBack}
              />
            </div>

            {error && (
              <div className="mt-6 clay-card p-4 text-red-600 text-sm bg-red-50/50 max-w-xl mx-auto">
                {error}
              </div>
            )}
          </>
        )}

        {/* Step 3: Analyzing */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center min-h-[40vh] gap-6">
            <div className="clay-card p-10 text-center max-w-md w-full">
              <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto" />
              <h2 className="text-xl font-bold text-gray-900 mt-6">
                Analyzing Your Contract
              </h2>
              <p className="text-gray-600 mt-2">
                Our AI is reading every clause and preparing your report...
              </p>
              <div className="mt-6 space-y-2 text-left max-w-xs mx-auto">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>Extracting text from document</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span>Identifying clauses & obligations</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span>Generating plain-English explanations</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-6">
                This usually takes 30-60 seconds
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
