import pdfParse from "pdf-parse";
import mammoth from "mammoth";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function parseDocument(file) {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error("File too large. Maximum size is 10MB.");
  }

  const fileName = file.name.toLowerCase();

  if (fileName.endsWith(".pdf")) {
    return parsePDF(buffer);
  } else if (fileName.endsWith(".docx") || fileName.endsWith(".doc")) {
    return parseDOCX(buffer);
  } else {
    throw new Error("Unsupported file format. Please upload a PDF or DOCX file.");
  }
}

async function parsePDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    const text = data.text?.trim();

    if (!text || text.length < 50) {
      throw new Error(
        "Could not extract meaningful text from this PDF. It may be scanned or image-based."
      );
    }

    return {
      text,
      pageCount: data.numpages || 1,
      metadata: data.info || {},
    };
  } catch (error) {
    if (error.message.includes("Could not extract")) {
      throw error;
    }
    throw new Error("Failed to parse PDF. The file may be corrupted or password-protected.");
  }
}

async function parseDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value?.trim();

    if (!text || text.length < 50) {
      throw new Error(
        "Could not extract meaningful text from this document."
      );
    }

    return {
      text,
      pageCount: Math.ceil(text.split(/\s+/).length / 300), // approximate
      metadata: {},
    };
  } catch (error) {
    if (error.message.includes("Could not extract")) {
      throw error;
    }
    throw new Error("Failed to parse DOCX. The file may be corrupted.");
  }
}
