/**
 * Leads API Route Handler
 *
 * @author Mohammad Shafay Joyo @2025
 * @description RESTful API endpoints for lead management
 *
 * Handles GET requests to fetch all leads and POST requests to create new leads.
 * Uses persistent file-based storage for demo purposes.
 */

import { type NextRequest, NextResponse } from "next/server";
import { getLeads, createLead } from "@/lib/persistent-mock-data";
import type { Lead } from "@/types/lead";

/**
 * GET Handler - Fetch All Leads
 * Returns all leads from persistent storage
 */
export async function GET() {
  try {
    const leads = await getLeads();
    console.log("GET /api/leads - returning leads:", leads.length);
    console.log(
      "Lead IDs:",
      leads.map((lead) => lead.id),
    );
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Error in GET /api/leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 },
    );
  }
}

/**
 * POST Handler - Create New Lead
 * Creates a new lead from form submission data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("API received body:", body);

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "linkedin",
      "visasInterested",
      "additionalInfo",
      "country",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        console.log(`Missing required field: ${field}`);
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    const leadData: Omit<Lead, "id" | "submittedAt"> = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      linkedin: body.linkedin,
      visasInterested: Array.isArray(body.visasInterested)
        ? body.visasInterested
        : [body.visasInterested],
      resumeUrl: body.resumeUrl,
      additionalInfo: body.additionalInfo,
      status: "PENDING",
      country: body.country,
    };

    console.log("Creating lead with data:", leadData);
    const newLead = await createLead(leadData);
    console.log("Created new lead:", newLead);

    return NextResponse.json({ lead: newLead }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/leads:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 },
    );
  }
}
