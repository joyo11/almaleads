/**
 * Assessment Form Component
 *
 * @author Mohammad Shafay Joyo @2025
 * @description Main public form for immigration assessment submissions
 *
 * This component provides a comprehensive form for prospective immigration clients
 * to submit their information including personal details, visa interests, and resume upload.
 * Features include client-side validation, file upload, and form submission with redirect.
 */

"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Import Poppins font for consistent typography
import { Poppins } from "next/font/google";

// Configure Poppins font with multiple weights for design flexibility
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
// UI Component imports from Shadcn/ui library
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Custom components
import { FileUpload } from "@/components/file-upload";

// Icon imports from Lucide React (not all used, kept for future flexibility)
import {
  Heart,
  User,
  Mail,
  Globe,
  FileText,
  MessageSquare,
  Dice6,
} from "lucide-react";

// TypeScript interface for form data structure
interface FormData {
  firstName: string; // User's first name
  lastName: string; // User's last name
  email: string; // User's email address
  linkedin: string; // LinkedIn profile or personal website URL
  visasInterested: string[]; // Array of visa types user is interested in
  additionalInfo: string; // User's detailed immigration inquiry
  resumeUrl: string; // URL path to uploaded resume file
  resumeFilename: string; // Original filename of uploaded resume
  country: string; // User's country of citizenship
}

// TypeScript interface for form validation errors
interface FormErrors {
  [key: string]: string; // Dynamic key-value pairs for field-specific error messages
}

// Available visa options for user selection
const VISA_OPTIONS = ["O-1", "EB-1", "EB-2 NIW", "I don't know"];

/**
 * Main Assessment Form Component
 * Handles the complete immigration assessment form workflow
 */
export function AssessmentForm() {
  const router = useRouter(); // Next.js router for navigation after form submission

  // Form state management - holds all form field values
  const [formData, setFormData] = useState<FormData>({
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

  // Error state management - holds validation error messages
  const [errors, setErrors] = useState<FormErrors>({});

  // Loading state - prevents double submission and shows loading UI
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Form Validation Function
   * Validates all form fields and returns true if valid, false if errors exist
   * Updates the errors state with specific validation messages
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation - required and format check
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // LinkedIn/Website URL validation - ensures professional networking context
    if (!formData.linkedin.trim()) {
      newErrors.linkedin = "LinkedIn profile or personal website is required";
    } else {
      // Validate that it's either a LinkedIn URL or a personal website
      const url = formData.linkedin.trim().toLowerCase();
      const isLinkedIn =
        url.includes("linkedin.com/in/") ||
        url.includes("linkedin.com/company/");
      const isPersonalWebsite =
        url.startsWith("http://") || url.startsWith("https://");

      if (!isLinkedIn && !isPersonalWebsite) {
        newErrors.linkedin =
          "Please enter a valid LinkedIn profile URL or personal website URL";
      }
    }

    // Visa interest validation - at least one selection required
    if (formData.visasInterested.length === 0) {
      newErrors.visasInterested = "Please select at least one visa category";
    }

    // Additional info validation - detailed inquiry required
    if (!formData.additionalInfo.trim()) {
      newErrors.additionalInfo = "Please tell us how we can help you";
    }

    // Country validation - citizenship information required
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    // Resume upload validation - document is mandatory
    if (!formData.resumeUrl.trim()) {
      newErrors.resume = "Resume/CV upload is required";
    }

    // Update error state and return validation result
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Form Submission Handler
   * Handles the async form submission process including validation,
   * API call, error handling, and navigation on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true); // Set loading state

    try {
      // Log form data for debugging (remove in production)
      console.log("Submitting form data:", formData);

      // Submit form data to API endpoint
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Log API response for debugging
      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      // Handle API errors
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit form");
      }

      // Redirect to thank you page on successful submission
      router.push("/assessment/thank-you");
    } catch (error) {
      // Handle submission errors
      console.error("Error submitting form:", error);
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  /**
   * Visa Checkbox Change Handler
   * Manages the visa interest selections by adding/removing items from the array
   */
  const handleVisaChange = (visa: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      visasInterested: checked
        ? [...prev.visasInterested, visa] // Add visa if checked
        : prev.visasInterested.filter((v) => v !== visa), // Remove visa if unchecked
    }));
  };

  /**
   * File Upload Success Handler
   * Updates form data with uploaded file information from FileUpload component
   */
  const handleFileUpload = (fileUrl: string, filename: string) => {
    setFormData((prev) => ({
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
        {/* Personal Information - Vertical Layout */}
        <div className="space-y-4">
          {/* First Name */}
          <div>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.firstName ? "border-red-500" : ""}`}
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
              }
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.lastName ? "border-red-500" : ""}`}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.email ? "border-red-500" : ""}`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <select
              id="country"
              value={formData.country}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, country: e.target.value }))
              }
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500 text-[0.9rem] font-sans ${errors.country ? "border-red-500" : ""}`}
            >
              <option value="" disabled className="text-gray-100">
                Country of Citizenship
              </option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="India">India</option>
              <option value="China">China</option>
              <option value="Brazil">Brazil</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* LinkedIn */}
          <div>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, linkedin: e.target.value }))
              }
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.linkedin ? "border-red-500" : ""}`}
              placeholder="LinkedIn / Personal website URL"
            />
            {errors.linkedin && (
              <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>
            )}
          </div>
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

        {/* Visa Categories Section */}
        <div className="text-center">
          <h4 className="text-[1.75rem] font-semibold text-gray-900 mb-6">
            Visa categories of interest?
          </h4>
          <div className="space-y-3 text-left max-w-xs ml-8">
            {VISA_OPTIONS.map((visa) => (
              <div key={visa} className="flex items-center space-x-3">
                <Checkbox
                  id={visa}
                  checked={formData.visasInterested.includes(visa)}
                  onCheckedChange={(checked) =>
                    handleVisaChange(visa, checked as boolean)
                  }
                  className="w-4 h-4 cursor-pointer"
                />
                <Label
                  htmlFor={visa}
                  className="text-sm font-normal cursor-pointer"
                >
                  {visa}
                </Label>
              </div>
            ))}
          </div>
          {errors.visasInterested && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {errors.visasInterested}
            </p>
          )}
        </div>

        {/* 3D Heart Icon Separator */}
        <div className="flex justify-center my-8">
          <svg
            width="48"
            height="48"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="purpleGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#b8a2ff" />
                <stop offset="50%" stopColor="#8a63ff" />
                <stop offset="100%" stopColor="#5b3dbf" />
              </linearGradient>
            </defs>
            <path
              d="M32 58s-18-11-26-23C-2 21 6 6 20 6c7 0 12 5 12 5s5-5 12-5c14 0 22 15 14 29-8 12-26 23-26 23z"
              fill="url(#purpleGradient)"
            />
          </svg>
        </div>

        {/* How can we help you Section */}
        <div className="text-center">
          <h4 className="text-[1.75rem] font-semibold text-gray-900 mb-6">
            How can we help you?
          </h4>
          <Textarea
            id="additionalInfo"
            placeholder="What is your current status and when does it expire? What is your goal - temporary status or green card? What field are you in and what have you achieved? Any timeline considerations?"
            value={formData.additionalInfo}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                additionalInfo: e.target.value,
              }))
            }
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px] ${errors.additionalInfo ? "border-red-500" : ""}`}
          />
          {errors.additionalInfo && (
            <p className="text-red-500 text-sm mt-1">{errors.additionalInfo}</p>
          )}
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
