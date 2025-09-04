import { isAdmin } from "@/app/lib/adminConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  if (isAdmin(email, password)) {
    const response = NextResponse.json({ success: true, message: "Login successful" });

    response.cookies.set("authToken", "testing123", {
      path: "/",
      httpOnly: true,      
      sameSite: "lax",
      maxAge: 60 * 60 * 24, 
      secure: process.env.NODE_ENV === "production" 
    });

    return response;
  }

  return NextResponse.json({ success: false, message: "Access denied" }, { status: 401 });
}
