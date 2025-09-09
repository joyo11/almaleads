"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, AlertTriangle } from "lucide-react";

export default function AdminSettingsPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const handleDeleteAllLeads = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsDeleting(true);
    setMessage("");

    try {
      const response = await fetch("/api/leads/clear", {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("✅ All leads have been deleted successfully!");
        setShowConfirm(false);
      } else {
        const error = await response.json();
        setMessage(`❌ Error: ${error.error || "Failed to delete leads"}`);
      }
    } catch (error) {
      setMessage("❌ Error: Failed to delete leads. Please try again.");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div
        className="flex min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, rgb(250, 255, 240) 0%, rgb(255, 255, 255) 100%)",
        }}
      >
        <AdminSidebar currentPage="settings" />
        <main className="flex-1 p-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

            {/* Data Management Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Data Management
              </h2>

              <div className="space-y-4">
                <div className="border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Delete All Leads
                      </h3>
                      <p className="text-gray-600 mb-4">
                        This will permanently delete all leads from the system.
                        This action cannot be undone.
                      </p>

                      {showConfirm && (
                        <Alert className="mb-4 border-red-200 bg-red-50">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <AlertDescription className="text-red-700">
                            Are you sure? This will permanently delete ALL
                            leads. Click "Delete All Leads" again to confirm.
                          </AlertDescription>
                        </Alert>
                      )}

                      {message && (
                        <Alert className="mb-4">
                          <AlertDescription>{message}</AlertDescription>
                        </Alert>
                      )}

                      <div className="flex gap-2">
                        <Button
                          onClick={handleDeleteAllLeads}
                          disabled={isDeleting}
                          variant="destructive"
                          className="cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {isDeleting
                            ? "Deleting..."
                            : showConfirm
                              ? "Confirm Delete All"
                              : "Delete All Leads"}
                        </Button>

                        {showConfirm && (
                          <Button
                            onClick={() => {
                              setShowConfirm(false);
                              setMessage("");
                            }}
                            variant="outline"
                            className="cursor-pointer"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Future Settings */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Application Settings
              </h2>
              <p className="text-gray-600">
                Additional settings coming soon...
              </p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
