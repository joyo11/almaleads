"use client";

import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import {
  assessmentFormSchema,
  assessmentFormUISchema,
} from "@/lib/form-schema";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visasInterested: string[];
  additionalInfo: string;
  resumeUrl: string;
  resumeFilename: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

export function JsonFormsAssessmentForm() {
  const router = useRouter();
  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    linkedin: "",
    visasInterested: [],
    additionalInfo: "",
    resumeUrl: "",
    resumeFilename: "",
    country: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!data.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!data.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!data.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!data.linkedin?.trim()) {
      newErrors.linkedin = "LinkedIn profile is required";
    }

    if (!data.visasInterested || data.visasInterested.length === 0) {
      newErrors.visasInterested = "Please select at least one visa category";
    }

    if (!data.additionalInfo?.trim()) {
      newErrors.additionalInfo = "Please tell us how we can help you";
    }

    if (!data.country?.trim()) {
      newErrors.country = "Country is required";
    }

    if (!data.resumeUrl?.trim()) {
      newErrors.resume = "Resume/CV upload is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting form data:", data);
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit form");
      }

      // Redirect to thank you page
      router.push("/assessment/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (fileUrl: string, filename: string) => {
    setData((prev) => ({
      ...prev,
      resumeUrl: fileUrl,
      resumeFilename: filename,
    }));
  };

  return (
    <div
      className={`max-w-lg mx-auto px-8 py-12 ${poppins.variable} font-sans`}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* JsonForms Section */}
        <div className="space-y-4">
          <JsonForms
            schema={assessmentFormSchema}
            uischema={assessmentFormUISchema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
          />

          {/* Display validation errors */}
          {Object.keys(errors).map(
            (key) =>
              key !== "submit" &&
              key !== "resume" && (
                <p key={key} className="text-red-500 text-sm">
                  {errors[key]}
                </p>
              ),
          )}
        </div>

        {/* Dice Icon Separator */}
        <div className="flex justify-center my-8">
          <svg
            width="48"
            height="48"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="4" width="56" height="56" rx="12" fill="#c7b9ff" />
            <circle cx="20" cy="20" r="5" fill="#7a4cff" />
            <circle cx="44" cy="20" r="5" fill="#7a4cff" />
            <circle cx="32" cy="32" r="5" fill="#7a4cff" />
            <circle cx="20" cy="44" r="5" fill="#7a4cff" />
            <circle cx="44" cy="44" r="5" fill="#7a4cff" />
          </svg>
        </div>

        {/* Resume Upload Section */}
        <div className="text-center">
          <h4 className="text-[1.75rem] font-semibold text-gray-900 mb-4">
            Resume / CV
          </h4>
          <FileUpload onFileUpload={handleFileUpload} error={errors.resume} />
        </div>

        {errors.submit && (
          <p className="text-red-500 text-sm text-center">{errors.submit}</p>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
