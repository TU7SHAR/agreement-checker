"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, AlertCircle, Loader2 } from "lucide-react";

const ACCEPTED_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

export default function FileUpload({ onUpload, isLoading }) {
  const [error, setError] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          setError("File is too large. Maximum size is 10MB.");
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Invalid file type. Please upload a PDF or DOCX file.");
        } else {
          setError("Invalid file. Please try again.");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          clay-card cursor-pointer transition-all duration-300 p-10 text-center
          ${isDragActive ? "clay-card-active scale-[1.02]" : ""}
          ${isLoading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.01]"}
        `}
      >
        <input {...getInputProps()} />

        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
            <p className="text-lg font-medium text-gray-700">
              Analyzing your contract...
            </p>
            <p className="text-sm text-gray-500">
              This usually takes 15-30 seconds
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="clay-icon-container">
              {isDragActive ? (
                <FileText className="w-10 h-10 text-indigo-500" />
              ) : (
                <Upload className="w-10 h-10 text-indigo-500" />
              )}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {isDragActive
                  ? "Drop your contract here"
                  : "Upload Your Contract"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Supports PDF and DOCX (max 10MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
