import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");
  const url = req.nextUrl.clone();

  const protectedRoutes = ["/", "/generator", "/pending", "/recent"];

  if (protectedRoutes.some(route => url.pathname.startsWith(route))) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/generator/:path*", "/pending/:path*", "/recent/:path*"]
};
