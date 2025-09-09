"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { AdminSidebar } from "@/components/admin-sidebar";
import { LeadsTable } from "@/components/leads-table";

export default function AdminLeadsPage() {
  return (
    <ProtectedRoute>
      <div
        className="flex min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, rgb(250, 255, 240) 0%, rgb(255, 255, 255) 100%)",
        }}
      >
        <AdminSidebar currentPage="leads" />
        <main className="flex-1 p-8">
          <LeadsTable />
        </main>
      </div>
    </ProtectedRoute>
  );
}
