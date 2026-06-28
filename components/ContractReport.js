"use client";

import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Users,
} from "lucide-react";

const riskColors = {
  low: "text-green-600 bg-green-50",
  medium: "text-yellow-600 bg-yellow-50",
  high: "text-red-600 bg-red-50",
  review_recommended: "text-orange-600 bg-orange-50",
  moderate: "text-yellow-600 bg-yellow-50",
  elevated: "text-orange-600 bg-orange-50",
};

const riskIcons = {
  low: CheckCircle,
  medium: AlertTriangle,
  high: AlertTriangle,
  review_recommended: Shield,
  moderate: AlertTriangle,
  elevated: AlertTriangle,
};

function RiskBadge({ level }) {
  const colorClass = riskColors[level] || "text-gray-600 bg-gray-50";
  const Icon = riskIcons[level] || Shield;
  const label = level?.replace("_", " ") || "unknown";

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${colorClass}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function ClauseCard({ clause, index, isFree, isLocked }) {
  const [isExpanded, setIsExpanded] = useState(isFree);

  if (isLocked) {
    return (
      <div className="clay-card p-5 opacity-75 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RiskBadge level={clause.riskLevel} />
            <h4 className="font-semibold text-gray-800">{clause.title}</h4>
          </div>
          <Lock className="w-4 h-4 text-gray-400" />
        </div>
        <div className="mt-3 blur-sm select-none pointer-events-none">
          <p className="text-sm text-gray-600">
            This clause contains important information about your obligations and rights.
            Unlock the full report to read the detailed explanation.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 flex items-end justify-center pb-4">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Unlock Full Report
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="clay-card p-5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <RiskBadge level={clause.riskLevel} />
          <h4 className="font-semibold text-gray-800">{clause.title}</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {clause.originalText && (
            <div className="bg-gray-50 border-l-4 border-indigo-200 p-3 rounded-r-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Original Text
              </p>
              <p className="text-sm text-gray-700 italic">
                &ldquo;{clause.originalText}&rdquo;
              </p>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Plain English
            </p>
            <p className="text-sm text-gray-700">{clause.plainEnglish}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Why It Matters
            </p>
            <p className="text-sm text-gray-700">{clause.whyItMatters}</p>
          </div>

          {clause.questionsToConsider?.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Questions to Consider
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {clause.questionsToConsider.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Confidence: {clause.confidence}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContractReport({ report, isPaid = false }) {
  const freeClauseLimit = 1; // Show 1 full clause for free

  if (!report) return null;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Header Summary */}
      <div className="clay-card p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Contract Summary
            </h2>
            <p className="text-lg text-indigo-600 font-medium mt-1">
              {report.contractType}
            </p>
          </div>
          <RiskBadge level={report.overallRiskLevel} />
        </div>

        <p className="mt-4 text-gray-700">{report.summary}</p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>{report.estimatedReadingTime} to read</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>{report.clauses?.length || 0} clauses found</span>
          </div>
          {report.parties?.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>{report.parties.length} parties</span>
            </div>
          )}
        </div>
      </div>

      {/* Risk Dashboard */}
      {report.riskBreakdown && (
        <div className="clay-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Risk Overview
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(report.riskBreakdown).map(([category, level]) => (
              <div
                key={category}
                className="flex flex-col items-center p-3 rounded-xl bg-white/50"
              >
                <RiskBadge level={level} />
                <span className="text-xs text-gray-500 mt-2 capitalize">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Terms */}
      {report.keyTerms && (
        <div className="clay-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Key Terms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {report.keyTerms.duration && (
              <div className="p-3 bg-white/50 rounded-xl">
                <p className="text-xs text-gray-500">Duration</p>
                <p className="text-sm font-medium text-gray-800">
                  {report.keyTerms.duration}
                </p>
              </div>
            )}
            {report.keyTerms.compensation && (
              <div className="p-3 bg-white/50 rounded-xl">
                <p className="text-xs text-gray-500">Compensation</p>
                <p className="text-sm font-medium text-gray-800">
                  {report.keyTerms.compensation}
                </p>
              </div>
            )}
            {report.keyTerms.noticePeriod && (
              <div className="p-3 bg-white/50 rounded-xl">
                <p className="text-xs text-gray-500">Notice Period</p>
                <p className="text-sm font-medium text-gray-800">
                  {report.keyTerms.noticePeriod}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Clause Analysis */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Clause Analysis
        </h3>
        <div className="space-y-4">
          {report.clauses?.map((clause, index) => (
            <ClauseCard
              key={clause.id || index}
              clause={clause}
              index={index}
              isFree={index < freeClauseLimit}
              isLocked={!isPaid && index >= freeClauseLimit}
            />
          ))}
        </div>
      </div>

      {/* Upgrade CTA */}
      {!isPaid && report.clauses?.length > freeClauseLimit && (
        <div className="clay-card p-8 text-center bg-gradient-to-br from-indigo-50 to-purple-50">
          <Lock className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900">
            Unlock Full Report
          </h3>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            Get detailed explanations for all {report.clauses.length} clauses,
            risk analysis, and questions to ask before signing.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button className="clay-button-primary px-6 py-3">
              Pro Report - &#8377;199
            </button>
            <button className="clay-button-secondary px-6 py-3">
              Premium - &#8377;499
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            One-time payment. No subscription. No refunds.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-400 max-w-lg mx-auto">
          SignSafe helps you understand contracts. This is not legal advice. For
          important decisions, consider consulting a qualified legal
          professional.
        </p>
      </div>
    </div>
  );
}
