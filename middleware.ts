import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";
import { Role } from "./lib/type";

export default async function middleware(req: NextRequest) {
  const session = await getSession();
  
  // If no session, redirect to login
  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Check if trying to access admin route
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Verify user has admin role
    if (session.user.role !== Role.ADMIN) {
      // You can redirect to home or show unauthorized page
      return NextResponse.redirect(new URL("/user", req.nextUrl));
      // Or return 403 Forbidden:
      // return new NextResponse("Forbidden", { status: 403 });
    }
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};