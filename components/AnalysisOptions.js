"use client";

import { useState, useMemo } from "react";
import {
  Globe,
  MessageSquare,
  ArrowRight,
  FileText,
  Search,
  X,
} from "lucide-react";
import { COUNTRIES } from "@/lib/countries";

export default function AnalysisOptions({ file, onSubmit, onBack }) {
  const [country, setCountry] = useState("");
  const [feedback, setFeedback] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;
    const q = searchQuery.toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const selectedCountry = COUNTRIES.find((c) => c.code === country);

  function handleSubmit(e) {
    e.preventDefault();
    if (!country) return;
    onSubmit({ country, feedback: feedback.trim() || null });
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* File Preview */}
      <div className="clay-card-flat p-4 flex items-center gap-3 mb-8">
        <div className="clay-icon-container flex-shrink-0" style={{ width: 44, height: 44, borderRadius: 12 }}>
          <FileText className="w-5 h-5 text-indigo-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray-400">
            {(file.size / 1024).toFixed(0)} KB · Ready for analysis
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Remove file"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Country Selection - Required */}
        <div className="clay-card p-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1">
            <Globe className="w-4 h-4 text-indigo-500" />
            Which country is this contract for?
            <span className="text-red-400 text-xs ml-1">*required</span>
          </label>
          <p className="text-xs text-gray-500 mb-4">
            Different countries have different laws. This helps us provide
            relevant context for your jurisdiction.
          </p>

          {/* Custom Searchable Dropdown */}
          <div className="relative">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="clay-input w-full cursor-pointer flex items-center justify-between"
            >
              {selectedCountry ? (
                <span className="flex items-center gap-2">
                  <span className="text-lg">{selectedCountry.flag}</span>
                  <span>{selectedCountry.name}</span>
                </span>
              ) : (
                <span className="text-gray-400">Select country...</span>
              )}
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {isDropdownOpen && (
              <div className="absolute z-50 top-full left-0 right-0 mt-2 clay-card p-2 max-h-64 overflow-hidden flex flex-col">
                {/* Search */}
                <div className="relative mb-2">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search countries..."
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    autoFocus
                  />
                </div>
                {/* List */}
                <div className="overflow-y-auto flex-1 space-y-0.5">
                  {filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setCountry(c.code);
                        setIsDropdownOpen(false);
                        setSearchQuery("");
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors ${
                        country === c.code
                          ? "bg-indigo-50 text-indigo-700"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span className="text-base">{c.flag}</span>
                      <span className="flex-1">{c.name}</span>
                      <span className="text-xs text-gray-400">{c.legalSystem}</span>
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">
                      No countries found. Try a different search.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Feedback / Focus - Optional */}
        <div className="clay-card p-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            Anything specific you want us to look at?
            <span className="text-xs text-gray-400 font-normal ml-1">optional</span>
          </label>
          <p className="text-xs text-gray-500 mb-4">
            Tell us if you have specific concerns or want us to focus on a
            particular section, clause, or paragraph.
          </p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="e.g., I'm worried about the non-compete clause in section 4... / Is the termination notice period reasonable? / Focus on IP ownership and confidentiality clauses..."
            className="clay-input w-full min-h-[100px] resize-y text-sm"
            maxLength={1000}
          />
          <div className="flex justify-between mt-2">
            <p className="text-xs text-gray-400">
              This helps our AI give you more relevant insights.
            </p>
            <span className="text-xs text-gray-400">
              {feedback.length}/1000
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!country}
          className={`clay-button-primary w-full py-4 text-lg gap-2 ${
            !country ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Analyze My Contract
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs text-gray-400 text-center">
          Analysis takes 30-60 seconds. Your document is processed securely.
        </p>
      </form>
    </div>
  );
}
