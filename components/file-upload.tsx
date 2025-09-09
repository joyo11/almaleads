"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, X, CheckCircle } from "lucide-react";

interface FileUploadProps {
  onFileUpload: (fileUrl: string, filename: string) => void;
  error?: string;
  accept?: string;
  maxSize?: number; // in MB
}

export function FileUpload({
  onFileUpload,
  error,
  accept = ".pdf,.doc,.docx",
  maxSize = 5,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setUploadError(`File too large. Maximum size is ${maxSize}MB.`);
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      setUploadedFile({
        name: result.filename,
        url: result.fileUrl,
      });

      onFileUpload(result.fileUrl, result.filename);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileUpload("", "");
  };

  const handleButtonClick = () => {
    console.log("Button clicked, file input ref:", fileInputRef.current);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input ref is null");
    }
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Upload className="w-4 h-4" />
        Resume / CV <span className="text-red-500">*</span>
      </Label>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        style={{ display: "none" }}
      />

      {!uploadedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer ${
            error ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          onClick={handleButtonClick}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 mb-4">
            PDF, DOC, DOCX up to {maxSize}MB
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick();
            }}
            disabled={isUploading}
            className="cursor-pointer disabled:cursor-not-allowed"
          >
            {isUploading ? "Uploading..." : "Choose File"}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <File className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <span
              className="text-sm text-gray-700 truncate"
              title={uploadedFile.name}
            >
              {uploadedFile.name}
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            className="cursor-pointer flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {(uploadError || error) && (
        <p className="text-red-500 text-sm">{uploadError || error}</p>
      )}
    </div>
  );
}
