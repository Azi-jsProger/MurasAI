import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const text = await res.text();
    return text !== "Not logged in";
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/login" || pathname.startsWith("/login/");

  const authenticated = await isAuthenticated(request);

  if (!authenticated && !isLoginPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (authenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/schedule",
    "/schedule/:path*",
    "/chat",
    "/chat/:path*",
    "/personal",
    "/personal/:path*",
    "/analytics",
    "/analytics/:path*",
    "/tests",
    "/tests/:path*",
    "/webtest",
    "/webtest/:path*",
    "/plan",
    "/plan/:path*",
    "/login",
    "/login/:path*",
  ],
};
