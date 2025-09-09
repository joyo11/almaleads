/**
 * Enhanced Leads Table Component
 *
 * @author Mohammad Shafay Joyo @2025
 * @description Advanced leads management table with Zustand state management
 *
 * This component provides an enhanced version of the leads table that uses
 * Zustand for global state management. It includes advanced features like:
 * - Real-time search and filtering
 * - Status management with persistent state
 * - Pagination with preserved context
 * - Resume download functionality
 * - Error handling and loading states
 * - Responsive design and optimized performance
 */

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
} from "lucide-react";
import { useLeadsStore } from "@/stores/leads-store";

// TypeScript interface for component props
interface EnhancedLeadsTableProps {
  onStatusUpdate?: (
    leadId: string,
    newStatus: "PENDING" | "REACHED_OUT",
  ) => void; // Optional callback when lead status is updated
}

/**
 * Enhanced Leads Table Component
 *
 * Uses Zustand store for state management and provides advanced functionality
 * beyond the basic leads table component.
 */
export function EnhancedLeadsTable({
  onStatusUpdate,
}: EnhancedLeadsTableProps) {
  // Extract state and actions from Zustand store
  const {
    leads, // All leads data
    filteredLeads, // Leads after search/filter applied
    searchTerm, // Current search term
    statusFilter, // Current status filter
    currentPage, // Current pagination page
    isLoading, // Loading state for async operations
    error, // Error state for failed operations
    setSearchTerm, // Update search term
    setStatusFilter, // Update status filter
    setCurrentPage, // Update current page
    updateLeadStatus, // Update lead status in store
    filterLeads, // Apply filters to leads
    fetchLeads, // Fetch leads from API
  } = useLeadsStore();

  // Pagination configuration
  const leadsPerPage = 8;
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const endIndex = startIndex + leadsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Re-filter leads when search term, status filter, or leads data changes
  useEffect(() => {
    filterLeads();
  }, [searchTerm, statusFilter, leads, filterLeads]);

  /**
   * Handle Lead Status Change
   * Updates lead status via API and updates the Zustand store
   */
  const handleStatusChange = async (
    leadId: string,
    newStatus: "PENDING" | "REACHED_OUT",
  ) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update Zustand store with new status
        updateLeadStatus(leadId, newStatus);

        // Re-filter leads without resetting the page (preserves pagination)
        filterLeads(false);

        // Call parent callback if provided
        onStatusUpdate?.(leadId, newStatus);

        console.log(`Status updated for lead ${leadId} to ${newStatus}`);
      } else {
        console.error("Failed to update lead status:", response.status);
      }
    } catch (error) {
      console.error("Failed to update lead status:", error);
    }
  };

  /**
   * Handle Resume Download
   * Creates a download link for the lead's resume file
   */
  const handleResumeDownload = (resumeUrl: string, leadName: string) => {
    if (resumeUrl) {
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = `${leadName}_resume`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error loading leads</p>
          <p className="text-sm">{error}</p>
          <Button onClick={() => fetchLeads()} className="mt-4 cursor-pointer">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        <div className="text-sm text-gray-500">
          Total: {leads.length} | Filtered: {filteredLeads.length}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32 cursor-pointer">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="REACHED_OUT">Reached Out</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {lead.firstName} {lead.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {lead.submittedAt}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select
                    value={lead.status}
                    onValueChange={(value) =>
                      handleStatusChange(
                        lead.id,
                        value as "PENDING" | "REACHED_OUT",
                      )
                    }
                  >
                    <SelectTrigger className="w-32 cursor-pointer">
                      <span className="text-sm text-gray-900">
                        {lead.status === "PENDING" ? "Pending" : "Reached Out"}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="REACHED_OUT">Reached Out</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{lead.country}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    {lead.resumeUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleResumeDownload(
                            lead.resumeUrl!,
                            `${lead.firstName}_${lead.lastName}`,
                          )
                        }
                        className="cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className={`cursor-pointer ${currentPage === page ? "bg-gray-900 text-white" : ""}`}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
