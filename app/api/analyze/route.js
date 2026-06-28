import { NextResponse } from "next/server";
import { parseDocument } from "@/lib/document-parser";
import { analyzeContract } from "@/lib/gemini";
import { checkRateLimit, getClientIP } from "@/lib/rate-limiter";
import { getServiceClient } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

// Rate limit: 5 analysis requests per minute per IP
const RATE_LIMIT_OPTIONS = {
  windowMs: 60 * 1000,
  maxRequests: 5,
};

export async function POST(request) {
  try {
    // 1. Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(
      `analyze:${clientIP}`,
      RATE_LIMIT_OPTIONS
    );

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait before trying again.",
          retryAfter: Math.ceil(rateLimitResult.resetIn / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateLimitResult.resetIn / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 2. Parse the uploaded file
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    // Validate file type
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".pdf") && !fileName.endsWith(".docx")) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF or DOCX file." },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // 3. Extract text from document
    const { text, pageCount } = await parseDocument(file);

    if (!text || text.length < 50) {
      return NextResponse.json(
        {
          error:
            "Could not extract enough text from this document. It may be scanned or image-based.",
        },
        { status: 422 }
      );
    }

    // 4. Analyze with AI
    const analysis = await analyzeContract(text);

    // 5. Store in Supabase (if available)
    const supabase = getServiceClient();
    let reportId = null;

    if (supabase) {
      const sessionId = uuidv4();

      // Store contract metadata
      const { data: contract, error: contractError } = await supabase
        .from("contracts")
        .insert({
          session_id: sessionId,
          file_name: file.name,
          file_type: fileName.endsWith(".pdf") ? "pdf" : "docx",
          file_size: file.size,
          page_count: pageCount,
          contract_type: analysis.contractType,
          status: "completed",
          ip_address: clientIP,
          user_agent: request.headers.get("user-agent") || "",
        })
        .select("id")
        .single();

      if (!contractError && contract) {
        // Store report
        const { data: report, error: reportError } = await supabase
          .from("reports")
          .insert({
            contract_id: contract.id,
            summary: analysis.summary,
            contract_type: analysis.contractType,
            estimated_reading_time: analysis.estimatedReadingTime,
            parties: analysis.parties,
            key_terms: analysis.keyTerms,
            clauses: analysis.clauses,
            overall_risk_level: analysis.overallRiskLevel,
            risk_breakdown: analysis.riskBreakdown,
          })
          .select("id")
          .single();

        if (!reportError && report) {
          reportId = report.id;
        }

        // Track analytics event
        await supabase.from("analytics_events").insert({
          event_type: "contract_analyzed",
          session_id: sessionId,
          contract_id: contract.id,
          metadata: {
            contractType: analysis.contractType,
            clauseCount: analysis.clauses?.length || 0,
            riskLevel: analysis.overallRiskLevel,
          },
          ip_address: clientIP,
          user_agent: request.headers.get("user-agent") || "",
        });
      }
    }

    // 6. Return response
    return NextResponse.json(
      {
        success: true,
        reportId,
        report: analysis,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error("Analysis error:", error);

    const statusCode = error.message.includes("too large")
      ? 413
      : error.message.includes("Unsupported")
      ? 415
      : error.message.includes("unavailable")
      ? 503
      : 500;

    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred. Please try again.",
      },
      { status: statusCode }
    );
  }
}
