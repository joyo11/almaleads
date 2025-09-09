import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get("auth-token");

  if (!authToken || !authToken.value.startsWith("mock-jwt-token-")) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Mock user data - in a real app you'd decode the JWT
  return NextResponse.json({
    user: {
      email: "admin@alma.com",
      role: "admin",
    },
  });
}
