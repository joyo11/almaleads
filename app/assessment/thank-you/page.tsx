import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-4 pt-32">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="8" y="4" width="48" height="56" rx="8" fill="#c7b9ff" />
            <polygon points="40,4 56,4 56,20" fill="#9a73ff" />
            <circle cx="32" cy="28" r="3" fill="#7a4cff" />
            <rect x="30" y="34" width="4" height="14" rx="2" fill="#7a4cff" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">Thank You</h1>

        {/* Confirmation Message */}
        <p className="text-gray-700 font-bold leading-relaxed">
          Your information was submitted to our immigration attorneys. Expect an
          email from hello@tryalma.ai.
        </p>

        {/* Call to Action Button */}
        <Link href="/">
          <Button className="w-full bg-gray-800 text-white hover:bg-gray-900 cursor-pointer">
            Go Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
