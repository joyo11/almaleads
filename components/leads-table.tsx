"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
} from "lucide-react";
import type { Lead } from "@/types/lead";

interface LeadsTableProps {
  onStatusUpdate?: (
    leadId: string,
    newStatus: "PENDING" | "REACHED_OUT",
  ) => void;
}

export function LeadsTable({ onStatusUpdate }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const leadsPerPage = 8;
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const endIndex = startIndex + leadsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    // Only reset page when search term or status filter changes, not when leads data changes
    filterLeads(true); // Always reset page when user changes search/filter
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    // When leads data changes (like status updates), re-filter without resetting page
    filterLeads(false);
  }, [leads]);

  const fetchLeads = async () => {
    try {
      console.log("Fetching leads...");
      const response = await fetch("/api/leads");
      console.log("Leads response status:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched leads data:", data);
        setLeads(data.leads);
        console.log("Set leads:", data.leads);
      } else {
        console.error("Failed to fetch leads, status:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterLeads = (shouldResetPage = true) => {
    let filtered = leads;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);

    // Only reset page when explicitly filtering (search/status change), not when updating data
    if (shouldResetPage) {
      setCurrentPage(1);
    }
  };

  const handleStatusChange = async (
    leadId: string,
    newStatus: "PENDING" | "REACHED_OUT",
  ) => {
    console.log(
      "Frontend: Attempting to change status for lead ID:",
      leadId,
      "to:",
      newStatus,
    );

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      console.log("Frontend: API response status:", response.status);

      if (response.ok) {
        // Update local state immediately
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead,
          ),
        );

        // Also update filtered leads to ensure UI consistency
        setFilteredLeads((prevFiltered) =>
          prevFiltered.map((lead) =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead,
          ),
        );

        // Re-filter leads without resetting the page
        filterLeads(false);

        // Call parent callback if provided
        onStatusUpdate?.(leadId, newStatus);

        console.log(
          `Frontend: Status updated for lead ${leadId} to ${newStatus}`,
        );
      } else {
        const errorData = await response.json();
        console.error(
          "Frontend: Failed to update lead status:",
          response.status,
          errorData,
        );
      }
    } catch (error) {
      console.error("Frontend: Failed to update lead status:", error);
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {lead.firstName} {lead.lastName}
                  </div>
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
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
