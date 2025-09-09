import { renderHook, act } from "@testing-library/react";
import { useLeadsStore } from "@/stores/leads-store";
import type { Lead } from "@/types/lead";

// Mock fetch
global.fetch = jest.fn();

const mockLead: Lead = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  linkedin: "https://linkedin.com/in/johndoe",
  visasInterested: ["O-1"],
  additionalInfo: "Looking for visa assistance",
  status: "PENDING",
  submittedAt: "02/02/2024, 2:45 PM",
  country: "United States",
  resumeUrl: "/uploads/resume.pdf",
};

describe("LeadsStore", () => {
  beforeEach(() => {
    // Reset store state
    useLeadsStore.setState({
      leads: [],
      filteredLeads: [],
      searchTerm: "",
      statusFilter: "all",
      currentPage: 1,
      isLoading: false,
      error: null,
    });
    (fetch as jest.Mock).mockClear();
  });

  it("should set leads correctly", () => {
    const { result } = renderHook(() => useLeadsStore());

    act(() => {
      result.current.setLeads([mockLead]);
    });

    expect(result.current.leads).toEqual([mockLead]);
  });

  it("should add a new lead", () => {
    const { result } = renderHook(() => useLeadsStore());

    act(() => {
      result.current.addLead(mockLead);
    });

    expect(result.current.leads).toContain(mockLead);
  });

  it("should update lead status", () => {
    const { result } = renderHook(() => useLeadsStore());

    act(() => {
      result.current.setLeads([mockLead]);
      result.current.updateLeadStatus("1", "REACHED_OUT");
    });

    expect(result.current.leads[0].status).toBe("REACHED_OUT");
  });

  it("should filter leads by search term", () => {
    const { result } = renderHook(() => useLeadsStore());

    act(() => {
      result.current.setLeads([mockLead]);
      result.current.setSearchTerm("John");
      result.current.filterLeads();
    });

    expect(result.current.filteredLeads).toEqual([mockLead]);
  });

  it("should filter leads by status", () => {
    const { result } = renderHook(() => useLeadsStore());

    act(() => {
      result.current.setLeads([mockLead]);
      result.current.setStatusFilter("PENDING");
      result.current.filterLeads();
    });

    expect(result.current.filteredLeads).toEqual([mockLead]);
  });

  it("should fetch leads successfully", async () => {
    const mockResponse = { leads: [mockLead] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useLeadsStore());

    await act(async () => {
      await result.current.fetchLeads();
    });

    expect(result.current.leads).toEqual([mockLead]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should handle fetch error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useLeadsStore());

    await act(async () => {
      await result.current.fetchLeads();
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.isLoading).toBe(false);
  });

  it("should set loading state during fetch", async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    (fetch as jest.Mock).mockReturnValueOnce(promise);

    const { result } = renderHook(() => useLeadsStore());

    act(() => {
      result.current.fetchLeads();
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolvePromise!({
        ok: true,
        json: async () => ({ leads: [] }),
      });
      await promise;
    });

    expect(result.current.isLoading).toBe(false);
  });
});
