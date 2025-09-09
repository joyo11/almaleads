import type { Lead } from "@/types/lead";

// Mock data store - in a real app this would be a database
const mockLeads: Lead[] = [
  {
    id: "1",
    firstName: "Jorge",
    lastName: "Ruiz",
    email: "jorge.ruiz@email.com",
    linkedin: "https://linkedin.com/in/jorge-ruiz",
    visasInterested: ["O-1"],
    additionalInfo: "Looking for visa assistance for tech role",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    country: "Mexico",
    resumeUrl: "/uploads/sample_jorge_resume.pdf",
  },
  {
    id: "2",
    firstName: "Bahar",
    lastName: "Zamir",
    email: "bahar.zamir@email.com",
    linkedin: "https://linkedin.com/in/bahar-zamir",
    visasInterested: ["H-1B"],
    additionalInfo: "Software engineer seeking visa sponsorship",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    country: "Mexico",
  },
  {
    id: "3",
    firstName: "Mary",
    lastName: "Lopez",
    email: "mary.lopez@email.com",
    linkedin: "https://linkedin.com/in/mary-lopez",
    visasInterested: ["EB-1"],
    additionalInfo: "Research scientist looking for permanent residency",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    country: "Brazil",
    resumeUrl: "/uploads/sample_mary_resume.pdf",
  },
  {
    id: "4",
    firstName: "Li",
    lastName: "Zijin",
    email: "li.zijin@email.com",
    linkedin: "https://linkedin.com/in/li-zijin",
    visasInterested: ["L-1"],
    additionalInfo: "Manager seeking intra-company transfer",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    country: "South Korea",
  },
  {
    id: "5",
    firstName: "Mark",
    lastName: "Antonov",
    email: "mark.antonov@email.com",
    linkedin: "https://linkedin.com/in/mark-antonov",
    visasInterested: ["O-1"],
    additionalInfo: "Artist seeking extraordinary ability visa",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    country: "Russia",
  },
  {
    id: "6",
    firstName: "Jane",
    lastName: "Ma",
    email: "jane.ma@email.com",
    linkedin: "https://linkedin.com/in/jane-ma",
    visasInterested: ["H-1B"],
    additionalInfo: "Data scientist looking for work authorization",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    country: "Mexico",
  },
  {
    id: "7",
    firstName: "Anand",
    lastName: "Jain",
    email: "anand.jain@email.com",
    linkedin: "https://linkedin.com/in/anand-jain",
    visasInterested: ["EB-2"],
    additionalInfo: "Senior developer seeking green card",
    status: "REACHED_OUT",
    submittedAt: "02/02/2024, 2:45 PM",
    country: "Mexico",
  },
  {
    id: "8",
    firstName: "Anna",
    lastName: "Voronova",
    email: "anna.voronova@email.com",
    linkedin: "https://linkedin.com/in/anna-voronova",
    visasInterested: ["O-1"],
    additionalInfo: "Designer with extraordinary abilities",
    status: "PENDING",
    submittedAt: "02/02/2024, 2:45 PM",
    country: "France",
  },
];

export const getLeads = (): Lead[] => {
  return mockLeads;
};

export const createLead = (
  leadData: Omit<Lead, "id" | "submittedAt">,
): Lead => {
  const newLead: Lead = {
    ...leadData,
    id: Date.now().toString(),
    submittedAt: new Date().toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
  console.log("Adding new lead to mockLeads:", newLead);
  console.log("MockLeads before adding:", mockLeads.length);
  mockLeads.push(newLead);
  console.log("MockLeads after adding:", mockLeads.length);
  console.log(
    "All leads now:",
    mockLeads.map((lead) => ({
      id: lead.id,
      firstName: lead.firstName,
      status: lead.status,
    })),
  );
  return newLead;
};

export const updateLeadStatus = (
  id: string,
  status: "PENDING" | "REACHED_OUT",
): Lead | null => {
  console.log("updateLeadStatus called with ID:", id, "Status:", status);
  console.log(
    "Current mockLeads:",
    mockLeads.map((lead) => ({
      id: lead.id,
      firstName: lead.firstName,
      status: lead.status,
    })),
  );

  const leadIndex = mockLeads.findIndex((lead) => lead.id === id);
  console.log("Lead index found:", leadIndex);

  if (leadIndex === -1) {
    console.log("Lead not found with ID:", id);
    return null;
  }

  mockLeads[leadIndex].status = status;
  console.log("Updated lead:", mockLeads[leadIndex]);
  return mockLeads[leadIndex];
};

export const getLeadById = (id: string): Lead | null => {
  return mockLeads.find((lead) => lead.id === id) || null;
};
