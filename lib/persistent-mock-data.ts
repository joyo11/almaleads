/**
 * Persistent Mock Data Storage
 *
 * @author Mohammad Shafay Joyo @2025
 * @description File-based persistent storage for leads data
 *
 * Provides CRUD operations for leads using JSON file storage.
 * This is a development/demo solution that persists data between server restarts.
 * In production, this would be replaced with a proper database.
 */

import { promises as fs } from "fs";
import path from "path";
import type { Lead } from "@/types/lead";

// Path to the JSON file that stores leads data
const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

/**
 * Ensure Data Directory Exists
 * Creates the data directory if it doesn't exist
 */
async function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    // Directory doesn't exist, create it
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read leads from file
async function readLeads(): Promise<Lead[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // Return default mock data if file doesn't exist
    return [
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
  }
}

// Write leads to file
async function writeLeads(leads: Lead[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2));
}

export const getLeads = async (): Promise<Lead[]> => {
  return await readLeads();
};

export const createLead = async (
  leadData: Omit<Lead, "id" | "submittedAt">,
): Promise<Lead> => {
  const leads = await readLeads();
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

  console.log("Adding new lead to persistent storage:", newLead);
  leads.push(newLead);
  await writeLeads(leads);
  console.log("Total leads now:", leads.length);
  console.log(
    "All leads now:",
    leads.map((lead) => ({
      id: lead.id,
      firstName: lead.firstName,
      status: lead.status,
    })),
  );
  return newLead;
};

export const updateLeadStatus = async (
  id: string,
  status: "PENDING" | "REACHED_OUT",
): Promise<Lead | null> => {
  const leads = await readLeads();
  console.log("updateLeadStatus called with ID:", id, "Status:", status);
  console.log(
    "Current leads:",
    leads.map((lead) => ({
      id: lead.id,
      firstName: lead.firstName,
      status: lead.status,
    })),
  );

  const leadIndex = leads.findIndex((lead) => lead.id === id);
  console.log("Lead index found:", leadIndex);

  if (leadIndex === -1) {
    console.log("Lead not found with ID:", id);
    return null;
  }

  leads[leadIndex].status = status;
  await writeLeads(leads);
  console.log("Updated lead:", leads[leadIndex]);
  return leads[leadIndex];
};

export const getLeadById = async (id: string): Promise<Lead | null> => {
  const leads = await readLeads();
  return leads.find((lead) => lead.id === id) || null;
};
