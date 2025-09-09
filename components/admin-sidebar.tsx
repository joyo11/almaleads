/**
 * Admin Sidebar Component
 *
 * @author Mohammad Shafay Joyo @2025
 * @description Navigation sidebar for admin dashboard
 *
 * Provides navigation menu for admin pages including leads management,
 * settings, and logout functionality. Features gradient background,
 * active page highlighting, and responsive design.
 */

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { LogOut, Users, Settings, ArrowLeft } from "lucide-react";

// TypeScript interface for component props
interface AdminSidebarProps {
  currentPage?: string; // Current active page for navigation highlighting
}

/**
 * Admin Sidebar Component
 * Renders the navigation sidebar with logo, menu items, and logout functionality
 */
export function AdminSidebar({ currentPage = "leads" }: AdminSidebarProps) {
  const { logout } = useAuth(); // Authentication context for logout functionality
  const router = useRouter(); // Next.js router for navigation

  /**
   * Logout Handler
   * Calls the logout function and redirects to login page
   */
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="w-64 bg-white border-r border-yellow-100 min-h-screen flex flex-col">
      {/* Header */}
      <div
        className="p-6 border-b border-yellow-100"
        style={{
          background:
            "linear-gradient(135deg, rgb(240, 250, 180) 0%, rgb(255, 255, 255) 100%)",
        }}
      >
        <img
          src="https://cdn.prod.website-files.com/67167e56b8481bdcc6627a23/67851a3fb28810b531b768a8_Group%20995.svg"
          loading="lazy"
          width="120"
          height="120"
          alt="almă"
          className="mb-4"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/assessment")}
          className="w-full justify-start text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Assessment
        </Button>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 p-4"
        style={{
          background:
            "linear-gradient(to bottom, rgb(250, 255, 240) 0%, rgb(255, 255, 255) 60%)",
        }}
      >
        <div className="space-y-2">
          <Button
            variant={currentPage === "leads" ? "secondary" : "ghost"}
            className={`w-full justify-start cursor-pointer ${
              currentPage === "leads"
                ? "bg-yellow-100 text-gray-900"
                : "text-gray-600 hover:text-gray-900 hover:bg-yellow-100"
            }`}
            onClick={() => router.push("/admin/leads")}
          >
            <Users className="w-4 h-4 mr-2" />
            Leads
          </Button>

          <Button
            variant={currentPage === "settings" ? "secondary" : "ghost"}
            className={`w-full justify-start cursor-pointer ${
              currentPage === "settings"
                ? "bg-yellow-100 text-gray-900"
                : "text-gray-600 hover:text-gray-900 hover:bg-yellow-100"
            }`}
            onClick={() => router.push("/admin/settings")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-yellow-100">
        <div className="flex items-center justify-between mb-3 ml-2">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-sm text-gray-600">Admin</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
