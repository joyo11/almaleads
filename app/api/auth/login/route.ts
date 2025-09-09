import { type NextRequest, NextResponse } from "next/server";

// Mock authentication - in a real app this would use proper auth
const MOCK_ADMIN_EMAIL = "admin@alma.com";
const MOCK_ADMIN_PASSWORD = "admin123";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Mock authentication check
    if (email === MOCK_ADMIN_EMAIL && password === MOCK_ADMIN_PASSWORD) {
      // In a real app, you'd generate a proper JWT token
      const mockToken = "mock-jwt-token-" + Date.now();

      const response = NextResponse.json({
        success: true,
        user: { email, role: "admin" },
      });

      // Set httpOnly cookie for authentication
      response.cookies.set("auth-token", mockToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}
