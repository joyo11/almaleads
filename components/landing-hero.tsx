"use client";

import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import Poppins font
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export function LandingHero() {
  return (
    <div className={`w-full ${poppins.variable} font-sans`}>
      {/* Hero Section with Figma Sage Green Background - Full Width */}
      <div
        className="relative py-36 w-full"
        style={{
          background:
            "linear-gradient(135deg, rgb(230, 240, 160) 0%, rgb(200, 220, 130) 100%)",
        }}
      >
        {/* Back to Homepage Button - Inside Banner */}
        <div className="absolute top-8 right-8 z-20">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 cursor-pointer bg-white/20 hover:bg-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homepage
            </Button>
          </Link>
        </div>

        {/* Decorative Circles - New SVG Design */}
        <div className="absolute inset-0 pointer-events-none ">
          <svg
            width="400"
            height="500"
            viewBox="0 0 400 500"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0"
          >
            <defs>
              {/* Green gradient for the disks (from your first palette) */}
              <linearGradient
                id="diskGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgb(200, 210, 120)" />
                <stop offset="100%" stopColor="rgb(170, 190, 90)" />
              </linearGradient>

              {/* Subtle drop shadow */}
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx="4"
                  dy="6"
                  stdDeviation="6"
                  floodColor="rgba(0,0,0,0.3)"
                />
              </filter>
            </defs>

            {/* Top 3 disks (forward, unchanged) */}
            <circle
              cx="120"
              cy="65"
              r="100"
              fill="url(#diskGradient)"
              filter="url(#shadow)"
            />
            <circle
              cx="160"
              cy="160"
              r="100"
              fill="url(#diskGradient)"
              filter="url(#shadow)"
            />
            <circle
              cx="150"
              cy="260"
              r="90"
              fill="url(#diskGradient)"
              filter="url(#shadow)"
            />

            {/* Last disk (pushed further back) */}
            <circle
              cx="130"
              cy="380"
              r="75"
              fill="url(#diskGradient)"
              filter="url(#shadow)"
            />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col">
          {/* Header with Logo */}
          <header className="pt-0 px-8 md:px-16 lg:px-24 -mt-8">
            <div className="max-w-2xl mx-auto ">
              <img
                src="https://cdn.prod.website-files.com/67167e56b8481bdcc6627a23/67851a3fb28810b531b768a8_Group%20995.svg"
                loading="lazy"
                width="100"
                height="100"
                alt="almă"
                className="mb-10"
              />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center px-8 md:px-16 lg:px-24">
            <div className="max-w-2xl mx-auto w-full">
              <div className="max-w-2xl">
                <h1
                  className="text-zinc-900 mb-8 mt-0"
                  style={{
                    letterSpacing: "-0.02em",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: "600",
                    lineHeight: "1.1",
                  }}
                >
                  Get An Assessment
                  <br />
                  Of Your Immigration Case
                </h1>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Content Section - Landing page style - Full Width */}
      <div className="px-8 py-6 text-center w-full">
        <div className="flex items-center justify-center mb-6">
          <div
            className="icon-container"
            style={{
              position: "relative",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
        </div>
        <h3 className="text-[1.75rem] font-bold text-black mb-4">
          Want to understand your visa options?
        </h3>
        <p className="text-gray-900 max-w-2xl mx-auto text-lg leading-relaxed font-bold">
          Submit the form below and our team of experienced attorneys will
          review your information and send a preliminary assessment of your case
          based on your goals.
        </p>
      </div>
    </div>
  );
}
