import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const FALLBACK_API_KEY = process.env.GEMINI_FALLBACK_API_KEY;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createClient(apiKey) {
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

async function callWithRetry(genAI, prompt, retries = MAX_RETRIES) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      const is503 = error?.status === 503 || error?.message?.includes("503");
      const isRateLimit =
        error?.status === 429 || error?.message?.includes("429");

      if ((is503 || isRateLimit) && attempt < retries) {
        const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
        console.warn(
          `Gemini attempt ${attempt} failed (${error.status}). Retrying in ${delay}ms...`
        );
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
}

export async function analyzeContract(text) {
  const prompt = buildAnalysisPrompt(text);

  // Try primary key
  const primaryClient = createClient(GEMINI_API_KEY);
  if (primaryClient) {
    try {
      const result = await callWithRetry(primaryClient, prompt);
      return parseAnalysisResponse(result);
    } catch (error) {
      console.warn("Primary Gemini key failed:", error.message);
    }
  }

  // Try fallback key
  const fallbackClient = createClient(FALLBACK_API_KEY);
  if (fallbackClient) {
    try {
      const result = await callWithRetry(fallbackClient, prompt);
      return parseAnalysisResponse(result);
    } catch (error) {
      console.error("Fallback Gemini key also failed:", error.message);
    }
  }

  throw new Error(
    "AI analysis unavailable. All API keys exhausted or missing."
  );
}

function buildAnalysisPrompt(contractText) {
  return `You are a contract analysis assistant. Your job is to help users UNDERSTAND contracts by explaining clauses in plain language. You do NOT provide legal advice.

Analyze the following contract text and return a JSON response with this exact structure:

{
  "contractType": "string (e.g., Employment Agreement, Rental Agreement, NDA, Freelance Contract, etc.)",
  "estimatedReadingTime": "string (e.g., 12 minutes)",
  "summary": "string (2-3 sentence plain English summary of what this contract is about)",
  "parties": ["string array of identified parties"],
  "keyTerms": {
    "duration": "string or null",
    "compensation": "string or null",
    "noticePeriod": "string or null"
  },
  "clauses": [
    {
      "id": "string (unique identifier)",
      "title": "string (e.g., Non-Compete, Confidentiality, Termination, etc.)",
      "category": "string (one of: obligation, restriction, right, financial, termination, confidentiality, liability, other)",
      "riskLevel": "string (one of: low, medium, high, review_recommended)",
      "originalText": "string (relevant excerpt from the contract)",
      "plainEnglish": "string (explanation in simple language)",
      "whyItMatters": "string (practical impact on the signer)",
      "questionsToConsider": ["string array of questions the user might want to think about"],
      "confidence": "string (one of: high, medium, low)"
    }
  ],
  "overallRiskLevel": "string (one of: low, moderate, elevated, review_recommended)",
  "riskBreakdown": {
    "confidentiality": "string (low/medium/high/review_recommended)",
    "termination": "string (low/medium/high/review_recommended)",
    "financial": "string (low/medium/high/review_recommended)",
    "obligations": "string (low/medium/high/review_recommended)",
    "restrictions": "string (low/medium/high/review_recommended)"
  }
}

IMPORTANT RULES:
- Explain clauses in simple language a non-lawyer can understand.
- Never say "this is illegal" or "you should/shouldn't sign."
- Focus on explaining practical effects and obligations.
- Identify ALL important clauses, especially: non-compete, confidentiality, IP ownership, notice periods, automatic renewals, penalties, arbitration, termination, indemnification.
- If you're unsure about a clause, set confidence to "low".
- Return ONLY valid JSON, no markdown formatting or code blocks.

CONTRACT TEXT:
${contractText.substring(0, 30000)}`;
}

function parseAnalysisResponse(responseText) {
  // Clean response - remove markdown code blocks if present
  let cleaned = responseText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse AI response:", error.message);
    throw new Error("Failed to parse contract analysis. Please try again.");
  }
}
