import { type NextRequest, NextResponse } from "next/server";
import { updateLeadStatus, getLeadById } from "@/lib/persistent-mock-data";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await request.json();

    console.log("API PUT request - ID:", id, "Status:", body.status);

    if (!body.status || !["PENDING", "REACHED_OUT"].includes(body.status)) {
      console.log("Invalid status provided:", body.status);
      return NextResponse.json(
        { error: "Invalid status. Must be PENDING or REACHED_OUT" },
        { status: 400 },
      );
    }

    const updatedLead = await updateLeadStatus(id, body.status);

    if (!updatedLead) {
      console.log("Lead not found with ID:", id);
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    console.log("Successfully updated lead:", updatedLead);
    return NextResponse.json({ lead: updatedLead });
  } catch (error) {
    console.error("Error in PUT /api/leads/[id]:", error);
    return NextResponse.json(
      { error: "Failed to update lead status" },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const lead = await getLeadById(id);

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch lead" },
      { status: 500 },
    );
  }
}
