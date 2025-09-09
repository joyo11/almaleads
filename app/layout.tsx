/**
 * Root Layout Component
 *
 * @author Mohammad Shafay Joyo @2025
 * @description Main layout wrapper for the entire application
 *
 * Provides global styling, font configuration, metadata, authentication context,
 * and analytics tracking. This layout wraps all pages in the application.
 */

import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/contexts/auth-context";
import { Suspense } from "react";
import "./globals.css";

// Application metadata for SEO and browser display
export const metadata: Metadata = {
  title: "Almă - Immigration Assessment Platform",
  description: "Get professional immigration case assessments",
  generator: "v0.app",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
};

/**
 * Root Layout Function
 * Wraps all pages with necessary providers and styling
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {/* Authentication context provider for the entire app */}
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
        {/* Vercel Analytics for tracking (optional) */}
        <Analytics />
      </body>
    </html>
  );
}
