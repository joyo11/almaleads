import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

export async function DELETE() {
  try {
    // Clear all leads by writing an empty array
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));

    console.log("All leads cleared successfully");

    return NextResponse.json({
      message: "All leads have been deleted successfully",
      count: 0,
    });
  } catch (error) {
    console.error("Error clearing leads:", error);
    return NextResponse.json(
      { error: "Failed to clear leads" },
      { status: 500 },
    );
  }
}
