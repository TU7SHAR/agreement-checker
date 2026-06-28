import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { checkRateLimit, getClientIP } from "@/lib/rate-limiter";

export async function GET(request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(`report:${clientIP}`, {
      windowMs: 60 * 1000,
      maxRequests: 20,
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before trying again." },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Report ID is required." },
        { status: 400 }
      );
    }

    // Validate UUID format
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: "Invalid report ID format." },
        { status: 400 }
      );
    }

    const supabase = getServiceClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured." },
        { status: 503 }
      );
    }

    const { data: report, error } = await supabase
      .from("reports")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !report) {
      return NextResponse.json(
        { error: "Report not found." },
        { status: 404 }
      );
    }

    // Format response
    const formattedReport = {
      contractType: report.contract_type,
      estimatedReadingTime: report.estimated_reading_time,
      summary: report.summary,
      parties: report.parties,
      keyTerms: report.key_terms,
      clauses: report.clauses,
      overallRiskLevel: report.overall_risk_level,
      riskBreakdown: report.risk_breakdown,
    };

    return NextResponse.json({
      report: formattedReport,
      isPaid: report.is_paid,
    });
  } catch (error) {
    console.error("Report fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load report." },
      { status: 500 }
    );
  }
}
