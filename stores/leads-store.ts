/**
 * Leads Store (Zustand)
 *
 * @author Mohammad Shafay Joyo @2025
 * @description Global state management for leads data
 *
 * Manages leads data, filtering, pagination, and API interactions.
 * Uses Zustand for lightweight, performant state management.
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Lead } from "@/types/lead";

interface LeadsState {
  leads: Lead[];
  filteredLeads: Lead[];
  searchTerm: string;
  statusFilter: string;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

interface LeadsActions {
  setLeads: (leads: Lead[]) => void;
  addLead: (lead: Lead) => void;
  updateLeadStatus: (leadId: string, status: "PENDING" | "REACHED_OUT") => void;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: string) => void;
  setCurrentPage: (page: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  filterLeads: (shouldResetPage?: boolean) => void;
  fetchLeads: () => Promise<void>;
}

type LeadsStore = LeadsState & LeadsActions;

export const useLeadsStore = create<LeadsStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      leads: [],
      filteredLeads: [],
      searchTerm: "",
      statusFilter: "all",
      currentPage: 1,
      isLoading: false,
      error: null,

      // Actions
      setLeads: (leads) => set({ leads }, false, "setLeads"),

      addLead: (lead) =>
        set(
          (state) => ({
            leads: [...state.leads, lead],
          }),
          false,
          "addLead",
        ),

      updateLeadStatus: (leadId, status) =>
        set(
          (state) => ({
            leads: state.leads.map((lead) =>
              lead.id === leadId ? { ...lead, status } : lead,
            ),
          }),
          false,
          "updateLeadStatus",
        ),

      setSearchTerm: (searchTerm) =>
        set({ searchTerm }, false, "setSearchTerm"),

      setStatusFilter: (statusFilter) =>
        set({ statusFilter }, false, "setStatusFilter"),

      setCurrentPage: (currentPage) =>
        set({ currentPage }, false, "setCurrentPage"),

      setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

      setError: (error) => set({ error }, false, "setError"),

      filterLeads: (shouldResetPage = true) => {
        const { leads, searchTerm, statusFilter } = get();
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

        const updateData: any = { filteredLeads: filtered };
        if (shouldResetPage) {
          updateData.currentPage = 1;
        }

        set(updateData, false, "filterLeads");
      },

      fetchLeads: async () => {
        set({ isLoading: true, error: null }, false, "fetchLeads/start");

        try {
          const response = await fetch("/api/leads");
          if (response.ok) {
            const data = await response.json();
            set({ leads: data.leads }, false, "fetchLeads/success");
            get().filterLeads();
          } else {
            set({ error: "Failed to fetch leads" }, false, "fetchLeads/error");
          }
        } catch (error) {
          set(
            {
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch leads",
            },
            false,
            "fetchLeads/error",
          );
        } finally {
          set({ isLoading: false }, false, "fetchLeads/end");
        }
      },
    }),
    {
      name: "leads-store",
    },
  ),
);
