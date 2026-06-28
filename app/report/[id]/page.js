"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ContractReport from "@/components/ContractReport";
import { Loader2, AlertCircle } from "lucide-react";

export default function ReportPage() {
  const params = useParams();
  const { id } = params;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        // Demo mode - read from sessionStorage
        if (id === "demo") {
          const stored = sessionStorage.getItem("signsafe_report");
          if (stored) {
            setReport(JSON.parse(stored));
          } else {
            setError("No report found. Please upload a contract first.");
          }
          setLoading(false);
          return;
        }

        // Fetch from API
        const response = await fetch(`/api/report?id=${id}`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to load report.");
        }

        const data = await response.json();
        setReport(data.report);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="section-padding flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="mt-4 text-gray-600">Loading your report...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="mt-4 text-gray-700 font-medium">{error}</p>
        <a
          href="/upload"
          className="clay-button-primary mt-6 px-6 py-3"
        >
          Upload New Contract
        </a>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <ContractReport report={report} isPaid={false} />
    </div>
  );
}
