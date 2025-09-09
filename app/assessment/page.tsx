import { AssessmentForm } from "@/components/assessment-form";
import { LandingHero } from "@/components/landing-hero";

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Landing Page Hero Section */}
      <LandingHero />

      {/* Form Section - Separate and Spaced */}
      <div className="max-w-3xl mx-auto px-6 py-6">
        <AssessmentForm />
      </div>
    </div>
  );
}
